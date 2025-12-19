#!/usr/bin/env python3
import csv
import re
from pathlib import Path

GLOSSARY_DIR = Path("content/es/glossary")
DB_PATH = Path("glossary_tags.tsv")

def load_mapping():
    mapping = {}
    with DB_PATH.open("r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            name = row["nombre git"].strip()
            tags = [t.strip() for t in row["tags"].split(",") if t.strip()]
            mapping[name] = tags
    return mapping

def update_file(md_path: Path, tags: list[str]):
    text = md_path.read_text(encoding="utf-8")

    if not text.startswith("---"):
        print(f"⚠️ Sin frontmatter: {md_path.name}")
        return False

    fm, body = re.split(r"\n---\n", text, maxsplit=1)[0:2]
    fm_lines = fm.splitlines()

    # eliminar tags existentes
    new_fm = []
    skip = False
    for line in fm_lines:
        if line.startswith("tags:"):
            skip = True
            continue
        if skip and line.startswith("  -"):
            continue
        skip = False
        new_fm.append(line)

    # añadir tags nuevos
    new_fm.append("tags:")
    for t in tags:
        new_fm.append(f"  - {t}")

    final = "\n".join(new_fm) + "\n---\n" + body
    md_path.write_text(final, encoding="utf-8")
    return True

def main():
    mapping = load_mapping()
    updated = 0

    for md in GLOSSARY_DIR.glob("*.md"):
        if md.name == "index.md":
            continue

        key = md.stem
        if key not in mapping:
            print(f"⏭️ Sin tags en DB: {md.name}")
            continue

        if update_file(md, mapping[key]):
            updated += 1

    print(f"\n✅ Archivos actualizados: {updated}")

if __name__ == "__main__":
    main()
