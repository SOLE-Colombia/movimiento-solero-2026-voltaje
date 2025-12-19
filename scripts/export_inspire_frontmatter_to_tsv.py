#!/usr/bin/env python3
import csv
import re
from pathlib import Path

INSPIRE_DIR = Path("content/es/inspire")
OUT_PATH = Path("inspire_frontmatter.tsv")

FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

def parse_frontmatter(text: str) -> str:
    m = FM_RE.match(text)
    return m.group(1) if m else ""

def get_scalar(fm: str, key: str) -> str:
    m = re.search(rf"(?m)^{re.escape(key)}\s*:\s*(.*?)\s*$", fm)
    return m.group(1).strip() if m else ""

def get_list(fm: str, key: str) -> str:
    m = re.search(
        rf"(?ms)^{re.escape(key)}\s*:\s*\n(.*?)(\n[a-zA-Z_][\w-]*\s*:|\Z)",
        fm,
    )
    if not m:
        return ""
    items = []
    for line in m.group(1).splitlines():
        line = line.strip()
        if line.startswith("-"):
            items.append(line[1:].strip())
    return ", ".join(items)

def main():
    headers = [
        "nombre git",
        "has_frontmatter",
        "title",
        "lang",
        "slug",
        "fecha",
        "estado",
        "tipo",
        "autor",
        "author",
        "tags",
        "categories",
        "aspectos",
        "formato",
        "draft",
        "traduccion",
    ]

    rows = []

    for md in sorted(INSPIRE_DIR.glob("*.md")):
        if md.name == "index.md":
            continue

        text = md.read_text(encoding="utf-8", errors="replace")
        fm = parse_frontmatter(text)

        rows.append({
            "nombre git": md.stem,
            "has_frontmatter": "1" if fm else "0",
            "title": get_scalar(fm, "title"),
            "lang": get_scalar(fm, "lang"),
            "slug": get_scalar(fm, "slug"),
            "fecha": get_scalar(fm, "fecha"),
            "estado": get_scalar(fm, "estado"),
            "tipo": get_scalar(fm, "tipo"),
            "autor": get_scalar(fm, "autor"),
            "author": get_scalar(fm, "author"),
            "tags": get_list(fm, "tags"),
            "categories": get_list(fm, "categories"),
            "aspectos": get_list(fm, "aspectos"),
            "formato": get_list(fm, "formato"),
            "draft": get_scalar(fm, "draft"),
            "traduccion": get_scalar(fm, "traduccion"),
        })

    with OUT_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers, delimiter="\t")
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅ Generado {OUT_PATH} con {len(rows)} filas")

if __name__ == "__main__":
    main()
