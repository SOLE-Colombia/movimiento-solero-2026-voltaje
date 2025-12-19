#!/usr/bin/env python3
from __future__ import annotations

import csv
import re
from pathlib import Path
from datetime import datetime

TSV_PATH = Path("solutions.tsv")
SOLVE_DIR = Path("content/es/solve")

FM_RE = re.compile(r"^---\s*\n.*?\n---\s*\n", re.DOTALL)

ALLOWED_TAGS = {"Electricidad", "Señal", "Dispositivos", "Espacio", "Personas"}
ALLOWED_DIFICULTAD = {"Fácil", "Medio", "Complejo"}
ALLOWED_COSTO = {"Gratis", "< USD 25", "USD 25 - 50", "> USD 50", "Gasto mensual"}
ALLOWED_AYUDANTES = {"Sin ayudantes", "1 persona", "2-3 personas", "Más de 3 personas"}
ALLOWED_TARDA = {"Minutos", "Horas", "Días", "Semanas"}


def normalize_date(s: str) -> str:
    """
    Normaliza fecha a AAAA-MM-DD.
    Acepta:
      - '2025-10-11' con o sin comillas
      - '2025-2-24' (mes/día sin cero)
      - vacío -> hoy (fallback)
    """
    s = (s or "").strip().strip('"').strip("'")
    if not s:
        return datetime.utcnow().strftime("%Y-%m-%d")

    # intento manual robusto: YYYY-M-D
    try:
        parts = s.split("-")
        if len(parts) == 3:
            y = int(parts[0])
            m = int(parts[1])
            d = int(parts[2])
            return f"{y:04d}-{m:02d}-{d:02d}"
    except Exception:
        pass

    # fallback: hoy
    return datetime.utcnow().strftime("%Y-%m-%d")


def norm_dificultad(x: str) -> str:
    x = (x or "").strip()
    mapping = {
        "Media": "Medio",
        "Medio": "Medio",
        "Promedio": "Medio",
        "Tranqui": "Medio",
        "Fácil": "Fácil",
        "Facil": "Fácil",
        "Complejo": "Complejo",
        "Difícil": "Complejo",
        "Dificil": "Complejo",
    }
    return mapping.get(x, x)


def norm_ayudantes(x: str) -> str:
    x = (x or "").strip()
    mapping = {
        "Nadie": "Sin ayudantes",
        "Sin ayudantes": "Sin ayudantes",
        "Una persona": "1 persona",
        "1 ayudante": "1 persona",
        "1 persona": "1 persona",
        "2-3 ayudantes": "2-3 personas",
        "2-3 personas": "2-3 personas",
        "Más de 3 ayudantes": "Más de 3 personas",
        "Más de 3 personas": "Más de 3 personas",
    }
    return mapping.get(x, x)


def split_tags(x: str) -> list[str]:
    raw = [t.strip() for t in (x or "").split(",") if t.strip()]
    norm = []
    for t in raw:
        t2 = t.strip()
        if not t2:
            continue

        low = t2.lower()
        if low in ("senal", "señal"):
            t2 = "Señal"
        elif low == "dispositivos":
            t2 = "Dispositivos"
        elif low == "personas":
            t2 = "Personas"
        elif low == "espacio":
            t2 = "Espacio"
        elif low == "electricidad":
            t2 = "Electricidad"
        else:
            t2 = t2[0].upper() + t2[1:] if t2 else t2

        if t2 in ALLOWED_TAGS:
            norm.append(t2)

    out = []
    for t in norm:
        if t not in out:
            out.append(t)
    return out


def read_tsv() -> dict[str, dict]:
    data: dict[str, dict] = {}
    with TSV_PATH.open(encoding="utf-8") as f:
        r = csv.DictReader(f, delimiter="\t")
        for row in r:
            key = (row.get("nombre git") or row.get("nombre_git") or "").strip()
            if not key:
                continue
            data[key] = row
    return data


def build_frontmatter(row: dict) -> str:
    title = (row.get("nombre") or row.get("title") or "").strip() or "Título pendiente"
    safe_title = title.replace('"', '\\"')  # ✅ sin backslash dentro del f-string

    date = normalize_date((row.get("fecha") or "").strip())
    tags = split_tags(row.get("tags", ""))

    dificultad = norm_dificultad(row.get("dificultad", "")).strip()
    costo = (row.get("costo", "") or "").strip()
    ayudantes = norm_ayudantes(row.get("ayudantes", "")).strip()
    tarda = (row.get("tarda", "") or "").strip()

    # Validaciones suaves
    if dificultad and dificultad not in ALLOWED_DIFICULTAD:
        dificultad = ""
    if costo and costo not in ALLOWED_COSTO:
        costo = ""
    if ayudantes and ayudantes not in ALLOWED_AYUDANTES:
        ayudantes = ""
    if tarda and tarda not in ALLOWED_TARDA:
        tarda = ""

    fm_lines = ["---"]
    fm_lines.append(f'title: "{safe_title}"')
    fm_lines.append(f"date: {date}")

    fm_lines.append("tags:")
    for t in tags:
        fm_lines.append(f'  - "{t}"')

    if dificultad:
        fm_lines.append(f'dificultad: "{dificultad}"')
    if costo:
        fm_lines.append(f'costo: "{costo}"')
    if ayudantes:
        fm_lines.append(f'ayudantes: "{ayudantes}"')
    if tarda:
        fm_lines.append(f'tarda: "{tarda}"')

    fm_lines.append('autor: "SOLE Colombia"')
    fm_lines.append("draft: false")
    fm_lines.append("---")
    return "\n".join(fm_lines) + "\n"


def main() -> None:
    if not TSV_PATH.exists():
        raise SystemExit(f"ERROR: No existe {TSV_PATH}")
    if not SOLVE_DIR.exists():
        raise SystemExit(f"ERROR: No existe {SOLVE_DIR}")

    tsv = read_tsv()

    md_files = sorted([p for p in SOLVE_DIR.glob("solv-*.md") if p.name != "index.md"])
    changed = 0
    missing_in_tsv: list[str] = []

    for p in md_files:
        key = p.stem
        row = tsv.get(key)
        if not row:
            missing_in_tsv.append(key)
            continue

        text = p.read_text(encoding="utf-8", errors="replace")
        new_fm = build_frontmatter(row)

        if FM_RE.match(text):
            new_text = FM_RE.sub(new_fm, text, count=1)
        else:
            new_text = new_fm + "\n" + text

        if new_text != text:
            p.write_text(new_text, encoding="utf-8")
            changed += 1

    print(f"✅ Archivos procesados: {len(md_files)}")
    print(f"✍️  Archivos modificados: {changed}")

    if missing_in_tsv:
        print("\n⚠️  Estos MD no están en TSV (debería ser 0):")
        for x in missing_in_tsv:
            print(" -", x)

    print("\nListo. Revisa con git diff.")


if __name__ == "__main__":
    main()
