#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SOLE Voltaje - Script 13: Análisis de PDFs Duplicados
Identifica qué PDFs son exports de Notion vs documentos únicos
"""

import os
import json
from pathlib import Path
from datetime import datetime
import re
from difflib import SequenceMatcher

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

PDF_DIR = Path("public/downloads")
CONTENT_DIR = Path("content")
REPORT_FILE = Path("reports/pdf-analysis.json")

# Patrones comunes en exports de Notion
NOTION_EXPORT_PATTERNS = [
    r"notion\.so",
    r"Created by",
    r"Last edited",
    r"Notion - ",
    r"www\.notion\.so"
]

# Extensiones de documentos a verificar
DOCUMENT_EXTENSIONS = [".md", ".html"]

# ============================================================================
# FUNCIONES
# ============================================================================

def get_pdf_title(pdf_path):
    """Extrae título del nombre del PDF"""
    name = pdf_path.stem
    # Remover fechas y IDs comunes
    name = re.sub(r'\d{8}', '', name)
    name = re.sub(r'[a-f0-9]{32}', '', name)
    name = re.sub(r'-+', '-', name)
    return name.strip('-').lower()

def find_matching_markdown(pdf_title, markdown_files):
    """Busca archivos markdown que podrían corresponder al PDF"""
    matches = []
    
    for md_file in markdown_files:
        md_title = md_file.stem.lower()
        
        # Calcular similitud
        similarity = SequenceMatcher(None, pdf_title, md_title).ratio()
        
        if similarity > 0.6:  # 60% de similitud
            matches.append({
                "file": str(md_file),
                "similarity": round(similarity * 100, 1)
            })
    
    return sorted(matches, key=lambda x: x["similarity"], reverse=True)

def get_file_size_mb(file_path):
    """Obtiene el tamaño del archivo en MB"""
    if file_path.exists():
        return round(os.path.getsize(file_path) / (1024 * 1024), 2)
    return 0

def categorize_pdfs(pdf_dir, content_dir):
    """Categoriza PDFs en únicos vs duplicados"""
    
    # Obtener todos los PDFs
    pdf_files = list(pdf_dir.glob("*.pdf"))
    
    # Obtener todos los markdowns
    md_files = list(content_dir.rglob("*.md"))
    
    results = {
        "likely_duplicates": [],
        "unique_documents": [],
        "uncertain": []
    }
    
    total_size_duplicates = 0
    total_size_unique = 0
    
    print(f"📄 Analizando {len(pdf_files)} PDFs...")
    print(f"📝 Comparando con {len(md_files)} archivos markdown...")
    print()
    
    for i, pdf_file in enumerate(pdf_files, 1):
        print(f"[{i}/{len(pdf_files)}] {pdf_file.name}")
        
        pdf_title = get_pdf_title(pdf_file)
        file_size = get_file_size_mb(pdf_file)
        
        # Buscar coincidencias con markdown
        matches = find_matching_markdown(pdf_title, md_files)
        
        pdf_info = {
            "filename": pdf_file.name,
            "size_mb": file_size,
            "title_cleaned": pdf_title,
            "matches": matches[:3] if matches else [],  # Top 3 coincidencias
            "has_strong_match": len(matches) > 0 and matches[0]["similarity"] > 80
        }
        
        # Categorizar
        if len(matches) > 0 and matches[0]["similarity"] > 80:
            # Alta probabilidad de ser export de Notion
            results["likely_duplicates"].append(pdf_info)
            total_size_duplicates += file_size
            print(f"   ⚠️  Probable duplicado (similitud: {matches[0]['similarity']}%)")
            print(f"   📝 Existe: {Path(matches[0]['file']).name}")
        elif len(matches) > 0 and matches[0]["similarity"] > 60:
            # Incierto
            results["uncertain"].append(pdf_info)
            print(f"   ❓ Incierto (similitud: {matches[0]['similarity']}%)")
        else:
            # Probablemente único
            results["unique_documents"].append(pdf_info)
            total_size_unique += file_size
            print(f"   ✅ Documento único")
        
        print()
    
    return results, total_size_duplicates, total_size_unique

def analyze_pdf_patterns(pdf_dir):
    """Analiza patrones en nombres de PDFs"""
    pdf_files = list(pdf_dir.glob("*.pdf"))
    
    patterns = {
        "with_dates": [],
        "with_hashes": [],
        "short_names": [],
        "long_names": []
    }
    
    for pdf in pdf_files:
        name = pdf.stem
        
        # Detectar fechas (YYYYMMDD)
        if re.search(r'\d{8}', name):
            patterns["with_dates"].append(pdf.name)
        
        # Detectar hashes MD5
        if re.search(r'[a-f0-9]{32}', name):
            patterns["with_hashes"].append(pdf.name)
        
        # Nombres muy cortos (probablemente códigos)
        if len(name) < 10:
            patterns["short_names"].append(pdf.name)
        
        # Nombres muy largos (probablemente títulos completos)
        if len(name) > 50:
            patterns["long_names"].append(pdf.name)
    
    return patterns

def main():
    print("🔍 Iniciando análisis de PDFs duplicados...")
    print("=" * 70)
    print()
    
    # Verificar directorios
    if not PDF_DIR.exists():
        print(f"❌ Error: No existe {PDF_DIR}")
        return
    
    if not CONTENT_DIR.exists():
        print(f"❌ Error: No existe {CONTENT_DIR}")
        return
    
    # Analizar patrones
    print("📊 Analizando patrones en nombres...")
    patterns = analyze_pdf_patterns(PDF_DIR)
    print(f"   Con fechas: {len(patterns['with_dates'])}")
    print(f"   Con hashes: {len(patterns['with_hashes'])}")
    print(f"   Nombres cortos: {len(patterns['short_names'])}")
    print(f"   Nombres largos: {len(patterns['long_names'])}")
    print()
    
    # Categorizar PDFs
    print("=" * 70)
    results, size_duplicates, size_unique = categorize_pdfs(PDF_DIR, CONTENT_DIR)
    
    # Resumen
    print("=" * 70)
    print("📊 RESUMEN DEL ANÁLISIS")
    print("=" * 70)
    
    total_pdfs = len(results["likely_duplicates"]) + len(results["unique_documents"]) + len(results["uncertain"])
    
    print(f"📄 Total de PDFs:           {total_pdfs}")
    print()
    print(f"⚠️  Probables duplicados:    {len(results['likely_duplicates'])} ({round(len(results['likely_duplicates'])/total_pdfs*100, 1)}%)")
    print(f"   Tamaño:                  {size_duplicates:.2f} MB")
    print(f"   💡 Se pueden eliminar")
    print()
    print(f"❓ Inciertos:               {len(results['uncertain'])}")
    print(f"   💡 Revisar manualmente")
    print()
    print(f"✅ Documentos únicos:       {len(results['unique_documents'])} ({round(len(results['unique_documents'])/total_pdfs*100, 1)}%)")
    print(f"   Tamaño:                  {size_unique:.2f} MB")
    print(f"   💡 Conservar estos")
    print()
    print(f"💾 Espacio recuperable:     ~{size_duplicates:.2f} MB")
    print("=" * 70)
    
    # Guardar reporte
    report = {
        "timestamp": datetime.now().isoformat(),
        "total_pdfs": total_pdfs,
        "statistics": {
            "likely_duplicates": len(results["likely_duplicates"]),
            "unique_documents": len(results["unique_documents"]),
            "uncertain": len(results["uncertain"]),
            "size_duplicates_mb": round(size_duplicates, 2),
            "size_unique_mb": round(size_unique, 2)
        },
        "patterns": {
            "with_dates": len(patterns["with_dates"]),
            "with_hashes": len(patterns["with_hashes"]),
            "short_names": len(patterns["short_names"]),
            "long_names": len(patterns["long_names"])
        },
        "results": results
    }
    
    REPORT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Reporte guardado en: {REPORT_FILE}")
    print()
    print("📝 Próximos pasos:")
    print("   1. Revisa: reports/pdf-analysis.json")
    print("   2. Verifica manualmente los 'inciertos'")
    print("   3. Para duplicados confirmados:")
    print("      - Elimínalos del repositorio")
    print("      - Implementa generación automática de PDFs")
    print()
    print("💡 Recomendación: Implementar sistema de PDF bajo demanda")
    print("   con Puppeteer/Playwright para generar PDFs desde páginas web")

if __name__ == "__main__":
    main()





