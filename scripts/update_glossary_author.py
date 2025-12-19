#!/usr/bin/env python3
import csv
import re
from pathlib import Path

GLOSSARY_DIR = Path("content/es/glossary")
DB_PATH = Path("glossary_tags.tsv")

def load_authors():
    authors = {}
    with DB_PATH.open("r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            name = row["nombre git"].strip()
            author = row.get("autor", "").strip()
            if name and author:
                authors[name] = author
    return authors

def update_author(md_path: Path, author: str):
    text = md_path.read_text(encoding="utf-8")

    if not text.startswith("---"):
        print(f"⚠️ Sin frontmatter: {md_path.name}")
        return False

    fm, body = re.split(r"\n---\n", text, maxsplit=1)[0:2]
    lines = fm.splitlines()

    new_fm = []
    author_written = False

    for line in lines:
        if line.startswith("author:"):
            new_fm.append(f"author: {author}")
            author_written = True
        else:
            new_fm.append(line)

    if not author_written:
        new_fm.append(f"author: {author}")

    final = "\n".join(new_fm) + "\n---\n" + body
    md_path.write_text(final, encoding="utf-8")
    return True

def main():
    authors = load_authors()
    updated = 0

    for md in GLOSSARY_DIR.glob("*.md"):
        if md.name == "index.md":
            continue

        key = md.stem
        if key not in authors:
            continue

        if update_author(md, authors[key]):
            updated += 1

    print(f"✅ Autores actualizados: {updated}")

if __name__ == "__main__":
    main()
