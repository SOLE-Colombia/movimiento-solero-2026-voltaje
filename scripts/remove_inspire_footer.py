#!/usr/bin/env python3
from pathlib import Path
import re

INSPIRE_DIR = Path("content/es/inspire")

# Match desde "[¿Nuevo aquí?]" hasta el final del archivo
FOOTER_RE = re.compile(
    r"\n?\[¿Nuevo aquí\?\][\s\S]*$",
    re.MULTILINE
)

def main():
    if not INSPIRE_DIR.exists():
        raise SystemExit("❌ No existe content/es/inspire")

    files = [
        p for p in INSPIRE_DIR.glob("*.md")
        if p.name != "index.md"
    ]

    touched = 0

    for path in files:
        text = path.read_text(encoding="utf-8", errors="replace")

        if FOOTER_RE.search(text):
            new_text = FOOTER_RE.sub("", text).rstrip() + "\n"
            path.write_text(new_text, encoding="utf-8")
            touched += 1

    print(f"✅ Archivos revisados: {len(files)}")
    print(f"✂️  Archivos limpiados: {touched}")
    print("👉 Revisa con: git diff")

if __name__ == "__main__":
    main()
