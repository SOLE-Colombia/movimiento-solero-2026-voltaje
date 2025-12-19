#!/usr/bin/env python3
from __future__ import annotations

import csv
import re
from pathlib import Path

INSPIRE_DIR = Path("content/es/inspire")
TSV_PATH = Path("inspire.tsv")

FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

def split_frontmatter(md_text: str) -> tuple[str, str, str]:
    """
    Returns: (frontmatter_content_without_delims, body, original_delimiter_block)
    If no frontmatter, frontmatter_content is "" and delimiter_block is "".
    """
    m = FM_RE.match(md_text)
    if not m:
        return "", md_text, ""
    fm = m.group(1)
    body = md_text[m.end():]
    return fm, body, md_text[:m.end()]

def strip_quotes(s: str) -> str:
    s = s.strip()
    # remove triple quotes first
    if s.startswith('"""') and s.endswith('"""') and len(s) >= 6:
        s = s[3:-3].strip()
    # then single/double
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        s = s[1:-1].strip()
    return s

def parse_tsv() -> dict[str, dict]:
    """
    Reads inspire.tsv with columns: nombre git, autor, tags
    tags are comma-separated in the TSV.
    """
    if not TSV_PATH.exists():
        raise SystemExit(f"ERROR: No existe {TSV_PATH}")

    mapping: dict[str, dict] = {}
    with TSV_PATH.open(encoding="utf-8") as f:
        r = csv.DictReader(f, delimiter="\t")
        required = {"nombre git", "autor", "tags"}
        if not r.fieldnames or not required.issubset(set(r.fieldnames)):
            raise SystemExit(f"ERROR: {TSV_PATH} debe tener columnas: {sorted(required)}")

        for row in r:
            slug = (row.get("nombre git") or "").strip()
            if not slug:
                continue

            autor = (row.get("autor") or "").strip()
            if not autor:
                autor = "Voltaje"

            tags_raw = (row.get("tags") or "").strip()
            tags = []
            if tags_raw:
                tags = [t.strip() for t in tags_raw.split(",") if t.strip()]

            mapping[slug] = {"autor": autor, "tags": tags}
    return mapping

def remove_key_block(lines: list[str], key: str) -> list[str]:
    """
    Removes:
      - key: value (single line)
      - key: (block) followed by indented list items
    """
    out = []
    i = 0
    key_re = re.compile(rf"^{re.escape(key)}\s*:\s*(.*)$")
    while i < len(lines):
        m = key_re.match(lines[i])
        if not m:
            out.append(lines[i])
            i += 1
            continue

        # Skip this line
        i += 1

        # If it was a block (key: then list lines), remove subsequent indented/list lines
        # until a non-indented, non-empty line that looks like a new key.
        while i < len(lines):
            ln = lines[i]
            if ln.strip() == "":
                # keep blank lines? better drop consecutive blanks created by removal
                i += 1
                continue
            if ln.startswith(" ") or ln.startswith("\t") or ln.lstrip().startswith("-"):
                i += 1
                continue
            # next key reached
            break

    # Trim leading/trailing blank lines
    while out and out[0].strip() == "":
        out.pop(0)
    while out and out[-1].strip() == "":
        out.pop()
    return out

def upsert_scalar(lines: list[str], key: str, value: str, after_keys: list[str] | None = None) -> list[str]:
    """
    Sets key: value. If key exists (single-line OR block), it is replaced by single-line.
    If missing, inserted after the first found key in after_keys, else appended.
    """
    lines = remove_key_block(lines, key)

    insert_at = len(lines)
    if after_keys:
        for idx, ln in enumerate(lines):
            for ak in after_keys:
                if re.match(rf"^{re.escape(ak)}\s*:", ln):
                    insert_at = idx + 1

    lines.insert(insert_at, f"{key}: {value}")
    return lines

def upsert_list(lines: list[str], key: str, items: list[str], after_keys: list[str] | None = None) -> list[str]:
    """
    Writes:
      key:
        - a
        - b
    If items is empty, removes the key entirely.
    """
    lines = remove_key_block(lines, key)
    if not items:
        return lines

    block = [f"{key}:"]
    for it in items:
        block.append(f"  - {it}")

    insert_at = len(lines)
    if after_keys:
        for idx, ln in enumerate(lines):
            for ak in after_keys:
                if re.match(rf"^{re.escape(ak)}\s*:", ln):
                    insert_at = idx + 1

    lines[insert_at:insert_at] = block
    return lines

def normalize_fecha(lines: list[str]) -> list[str]:
    out = []
    fecha_re = re.compile(r"^fecha\s*:\s*(.*)$")
    for ln in lines:
        m = fecha_re.match(ln)
        if not m:
            out.append(ln)
            continue
        val = strip_quotes(m.group(1))
        out.append(f"fecha: {val}")
    return out

def main():
    mapping = parse_tsv()

    changed = 0
    skipped = 0
    missing_in_tsv = 0

    for md_path in sorted(INSPIRE_DIR.glob("*.md")):
        if md_path.name == "index.md":
            continue

        slug = md_path.stem
        if slug not in mapping:
            # existe .md pero no está en inspire.tsv
            missing_in_tsv += 1
            continue

        md_text = md_path.read_text(encoding="utf-8", errors="replace")
        fm, body, _ = split_frontmatter(md_text)
        if not fm:
            # si no hay frontmatter, lo creamos mínimo
            fm_lines = []
        else:
            fm_lines = fm.splitlines()

        # 1) borrar categories
        fm_lines = remove_key_block(fm_lines, "categories")

        # 2) autor (si vacío => Voltaje)
        autor = mapping[slug]["autor"] or "Voltaje"
        fm_lines = upsert_scalar(
            fm_lines,
            "autor",
            autor,
            after_keys=["slug", "lang", "title"]
        )

        # 3) tags desde TSV
        tags = mapping[slug]["tags"]
        fm_lines = upsert_list(
            fm_lines,
            "tags",
            tags,
            after_keys=["autor"]
        )

        # 4) normalizar fecha (si existe)
        fm_lines = normalize_fecha(fm_lines)

        new_fm = "---\n" + "\n".join(fm_lines).rstrip() + "\n---\n"
        new_text = new_fm + body.lstrip("\n")

        if new_text != md_text:
            md_path.write_text(new_text, encoding="utf-8")
            changed += 1
        else:
            skipped += 1

    print("✅ Listo.")
    print(f"Archivos modificados: {changed}")
    print(f"Sin cambios: {skipped}")
    print(f"MD que NO están en inspire.tsv (no tocados): {missing_in_tsv}")

if __name__ == "__main__":
    main()
