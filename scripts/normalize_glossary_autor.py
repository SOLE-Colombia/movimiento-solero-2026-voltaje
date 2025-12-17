#!/usr/bin/env python3
import re
from pathlib import Path

GLOSSARY_DIR = Path("content/es/glossary")

FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n(.*)$", re.DOTALL)

def extract_key(fm: str, key: str):
    # captura "key: value" en línea simple
    m = re.search(rf"(?m)^\s*{re.escape(key)}\s*:\s*(.*?)\s*$", fm)
    return m.group(1).strip() if m else None

def remove_key_lines(fm: str, key: str):
    # elimina líneas "key: ..." (solo línea simple)
    return re.sub(rf"(?m)^\s*{re.escape(key)}\s*:\s*.*\n?", "", fm)

def upsert_key(fm: str, key: str, value: str):
    # si existe, reemplaza; si no, añade al final
    if re.search(rf"(?m)^\s*{re.escape(key)}\s*:", fm):
        fm = re.sub(rf"(?m)^\s*{re.escape(key)}\s*:\s*.*$", f"{key}: {value}", fm)
        return fm
    fm = fm.rstrip() + "\n" + f"{key}: {value}\n"
    return fm

def main():
    updated = 0
    for md in sorted(GLOSSARY_DIR.glob("*.md")):
        if md.name == "index.md":
            continue

        text = md.read_text(encoding="utf-8")
        m = FM_RE.match(text)
        if not m:
            # sin frontmatter válido: skip
            continue

        fm, body = m.group(1), m.group(2)

        autor_val = extract_key(fm, "autor")
        author_val = extract_key(fm, "author")

        # Regla: preferimos `author` si existe (porque es el “bonito/corto”),
        # si no, conservamos `autor`.
        final_autor = author_val or autor_val

        if not final_autor:
            # no hay nada que normalizar
            continue

        # elimina `author:` siempre
        fm2 = remove_key_lines(fm, "author")

        # setea `autor:` al valor final
        fm2 = upsert_key(fm2, "autor", final_autor)

        new_text = f"---\n{fm2.strip()}\n---\n{body}"
        if new_text != text:
            md.write_text(new_text, encoding="utf-8")
            updated += 1

    print(f"✅ Normalizados: {updated} archivos")

if __name__ == "__main__":
    main()
