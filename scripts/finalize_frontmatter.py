#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
from pathlib import Path

FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

# Tags permitidos (para limpiar ruido)
ALLOWED_TAGS = {
    "inspire": {
        "Sobre el internet",
        "Te ha pasado",
        "Historias potentes",
        "De Voltaje a SOLE",
        "Preguntas incómodas",
        "Vamos a romper",
        "Curiosidades",
        "Metodologías",
    },
    "glossary": {
        "Dispositivos",
        "Términos del mundo virtual",
        "Seguridad e identificación",
        "Redes y conexiones",
        "Programas y aplicaciones",
        "Almacenamiento",
        "Funcionamiento del computador",
    },
}

# Normalizaciones suaves (por si en TSV vienen variantes)
TAG_CANON = {
    # Inspire
    "Sobre internet": "Sobre el internet",
    "Sobre el Internet": "Sobre el internet",
    "Preguntas incomodas": "Preguntas incómodas",
    "Preguntas incómodas ": "Preguntas incómodas",
    "Vamos a romper ": "Vamos a romper",
    "De Voltaje a Sole": "De Voltaje a SOLE",
    # Glossary (por si hay comillas raras)
    "Seguridad e identificacion": "Seguridad e identificación",
    "Terminos del mundo virtual": "Términos del mundo virtual",
    "Funcionamiento del computador ": "Funcionamiento del computador",
}

DROP_KEYS = {
    "lang", "slug", "traduccion", "formato", "aspectos", "categories",
    "fecha", "author", "pie", "reacción", "reaccion", "widget"
}

def split_md(md: str) -> tuple[str, str]:
    m = FM_RE.match(md)
    if not m:
        return "", md
    fm = m.group(1)
    body = md[m.end():]
    return fm, body

def strip_quotes(s: str) -> str:
    s = (s or "").strip()
    if s.startswith('"""') and s.endswith('"""') and len(s) >= 6:
        s = s[3:-3].strip()
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        s = s[1:-1].strip()
    return s

def get_scalar(fm: str, key: str) -> str:
    m = re.search(rf"(?m)^{re.escape(key)}\s*:\s*(.*?)\s*$", fm)
    return strip_quotes(m.group(1)) if m else ""

def parse_date_from_created(body: str) -> str:
    # busca "Created: 24 de febrero de 2025 ..." y lo deja como 2025-02-24 si puede.
    # Si no puede, devuelve "".
    m = re.search(r"(?mi)^Created:\s*([0-9]{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+([0-9]{4})", body)
    if not m:
        return ""
    d = int(m.group(1))
    month_name = m.group(2).lower()
    y = int(m.group(3))
    months = {
        "enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6,
        "julio": 7, "agosto": 8, "septiembre": 9, "setiembre": 9, "octubre": 10,
        "noviembre": 11, "diciembre": 12,
    }
    if month_name not in months:
        return ""
    mm = months[month_name]
    return f"{y:04d}-{mm:02d}-{d:02d}"

def read_tsv(tsv_path: Path) -> dict[str, dict]:
    mapping = {}
    with tsv_path.open(encoding="utf-8") as f:
        r = csv.DictReader(f, delimiter="\t")
        if not r.fieldnames:
            raise SystemExit(f"TSV sin headers: {tsv_path}")

        # requerimos mínimo nombre git + tags + autor (autor puede venir vacío)
        if "nombre git" not in r.fieldnames or "tags" not in r.fieldnames or "autor" not in r.fieldnames:
            raise SystemExit("TSV debe tener columnas: nombre git, tags, autor")

        for row in r:
            slug = (row.get("nombre git") or "").strip()
            if not slug:
                continue
            autor = (row.get("autor") or "").strip() or "SOLE Colombia"

            tags_raw = (row.get("tags") or "").strip()
            tags = []
            if tags_raw:
                tags = [t.strip() for t in tags_raw.split(",") if t.strip()]

            mapping[slug] = {"autor": autor, "tags": tags}
    return mapping

def canon_tag(t: str) -> str:
    t = (t or "").strip().strip('"').strip("'")
    return TAG_CANON.get(t, t)

def filter_tags(section: str, tags: list[str]) -> list[str]:
    allowed = ALLOWED_TAGS.get(section, set())
    clean = []
    for t in tags:
        ct = canon_tag(t)
        if ct in allowed:
            clean.append(ct)
    # dedupe preserve order
    out = []
    seen = set()
    for t in clean:
        if t not in seen:
            seen.add(t)
            out.append(t)
    return out

def to_frontmatter(title: str, date: str, tags: list[str], autor: str, draft: bool) -> str:
    # siempre escribimos con quotes en title/autor/tags para evitar caracteres raros
    lines = [
        "---",
        f'title: "{title}"',
        f"date: {date}",
        "tags:",
    ]
    for t in tags:
        lines.append(f'  - "{t}"')
    lines += [
        f'autor: "{autor}"',
        f"draft: {'true' if draft else 'false'}",
        "---",
        "",
    ]
    return "\n".join(lines)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--section", choices=["inspire", "glossary"], required=True)
    ap.add_argument("--tsv", required=True)
    ap.add_argument("--dir", required=True)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    section = args.section
    tsv_path = Path(args.tsv)
    base_dir = Path(args.dir)

    mapping = read_tsv(tsv_path)

    changed = 0
    skipped = 0
    missing = 0

    for md_path in sorted(base_dir.glob("*.md")):
        if md_path.name == "index.md":
            continue

        slug = md_path.stem
        if slug not in mapping:
            missing += 1
            continue

        md_text = md_path.read_text(encoding="utf-8", errors="replace")
        fm, body = split_md(md_text)

        # title
        title = get_scalar(fm, "title") or slug

        # draft (default false)
        draft_str = get_scalar(fm, "draft").lower()
        draft = True if draft_str == "true" else False

        # date: prefer date, else fecha, else parse Created: from body, else 2024-01-01 fallback
        date = get_scalar(fm, "date") or get_scalar(fm, "fecha") or parse_date_from_created(body) or "2024-01-01"
        date = strip_quotes(date)

        # from TSV
        autor = mapping[slug]["autor"] or "SOLE Colombia"
        tags = filter_tags(section, mapping[slug]["tags"])

        # if for some reason tags become empty, we keep empty list (still valid YAML)
        new_fm = to_frontmatter(title=title, date=date, tags=tags, autor=autor, draft=draft)
        new_text = new_fm + body.lstrip("\n")

        if new_text != md_text:
            changed += 1
            if not args.dry_run:
                md_path.write_text(new_text, encoding="utf-8")
        else:
            skipped += 1

    print("✅ finalize_frontmatter.py")
    print("section:", section)
    print("changed:", changed)
    print("skipped:", skipped)
    print("missing_in_tsv_not_touched:", missing)

if __name__ == "__main__":
    main()
