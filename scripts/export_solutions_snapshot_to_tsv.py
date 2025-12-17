#!/usr/bin/env python3
from __future__ import annotations

import csv
import re
from pathlib import Path

SOLUTIONS_DIR = Path("content/es/solve")  # OJO: en tu repo se ve "content/es/solve"
OUT_TSV = Path("solutions_current_snapshot.tsv")

FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

def split_md(md_text: str) -> tuple[str, str]:
    m = FM_RE.match(md_text)
    if not m:
        return "", md_text
    return m.group(1), md_text[m.end():]

def strip_quotes(s: str) -> str:
    s = (s or "").strip()
    if s.startswith('"""') and s.endswith('"""') and len(s) >= 6:
        s = s[3:-3].strip()
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        s = s[1:-1].strip()
    return s

def fm_scalar(fm: str, key: str) -> str:
    m = re.search(rf"(?m)^{re.escape(key)}\s*:\s*(.*?)\s*$", fm)
    return strip_quotes(m.group(1)) if m else ""

def fm_list(fm: str, key: str) -> list[str]:
    m = re.search(rf"(?ms)^{re.escape(key)}\s*:\s*\n((?:\s*-\s*.*\n)+)", fm)
    if not m:
        return []
    out = []
    for ln in m.group(1).splitlines():
        ln = ln.strip()
        if ln.startswith("-"):
            out.append(strip_quotes(ln[1:].strip()))
    return [x for x in out if x]

def parse_body_meta(body: str) -> dict[str, str]:
    """
    Captura líneas tipo: "Clave: Valor"
    desde "Created:" hacia abajo, hasta encontrar:
      - línea vacía (opcional) o
      - otro heading que empiece con '#'
    Nota: No depende de que esté perfecto; captura lo que encuentre.
    """
    lines = body.splitlines()

    # localizar "Created:"
    start = None
    for i, ln in enumerate(lines):
        if ln.strip().lower().startswith("created:"):
            start = i
            break
    if start is None:
        return {}

    meta: dict[str, str] = {}

    # de Created hacia abajo
    for ln in lines[start:]:
        s = ln.strip()
        if not s:
            # paramos en primer bloque vacío (si prefieres capturar más, quita este break)
            break
        if s.startswith("#"):
            break
        if ":" not in s:
            continue

        k, v = s.split(":", 1)
        k = k.strip()
        v = v.strip()
        # normaliza claves duplicadas (pilar/senal, impacto/personas etc) tal cual como vienen
        meta[k] = v

    return meta

def main():
    if not SOLUTIONS_DIR.exists():
        raise SystemExit(f"ERROR: No existe {SOLUTIONS_DIR}. Ajusta SOLUTIONS_DIR en el script.")

    rows = []

    # vamos a sacar algunas keys del body que sabemos que existen, y también un campo JSON-like para extras
    BODY_KEYS = [
        "Created",
        "Autor",
        "Solucionas",
        "Dificultad",
        "Cuesta",
        "Ayudantes",
        "Tardas",
    ]

    for md_path in sorted(SOLUTIONS_DIR.glob("*.md")):
        if md_path.name == "index.md":
            continue

        slug = md_path.stem
        md_text = md_path.read_text(encoding="utf-8", errors="replace")
        fm, body = split_md(md_text)

        body_meta = parse_body_meta(body)

        # Campos del front matter actual (lo viejo)
        title = fm_scalar(fm, "title")
        lang = fm_scalar(fm, "lang")
        slug_field = fm_scalar(fm, "slug")
        fecha = fm_scalar(fm, "fecha") or fm_scalar(fm, "date")
        aspectos = ", ".join(fm_list(fm, "aspectos"))

        # Campos del body (lo que te preocupaba)
        created = body_meta.get("Created", "")
        autor_body = body_meta.get("Autor", "")
        solucionas = body_meta.get("Solucionas", "")
        dificultad_body = body_meta.get("Dificultad", "")
        cuesta = body_meta.get("Cuesta", "")
        ayudantes_body = body_meta.get("Ayudantes", "")
        tardas = body_meta.get("Tardas", "")

        # Extras del body: todo lo demás (pilar/*, impacto/*, recursos/*, etc.)
        extras = {k: v for k, v in body_meta.items() if k not in BODY_KEYS}
        # serialización simple key=value;key=value...
        extras_str = "; ".join([f"{k}={v}" for k, v in sorted(extras.items())])

        rows.append({
            "nombre git": slug,
            "fm_title": title,
            "fm_lang": lang,
            "fm_slug": slug_field,
            "fm_fecha": fecha,
            "fm_aspectos": aspectos,
            "body_created": created,
            "body_autor": autor_body,
            "body_solucionas": solucionas,
            "body_dificultad": dificultad_body,
            "body_cuesta": cuesta,
            "body_ayudantes": ayudantes_body,
            "body_tardas": tardas,
            "body_extras": extras_str,
        })

    with OUT_TSV.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(
            f,
            fieldnames=list(rows[0].keys()) if rows else [],
            delimiter="\t",
        )
        w.writeheader()
        w.writerows(rows)

    print("✅ Export listo:", OUT_TSV)
    print("Filas (sin header):", len(rows))

if __name__ == "__main__":
    main()
