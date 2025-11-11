#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para eliminar PDFs que son exports de páginas de Notion
Mantiene solo documentos originales importantes
"""

import json
import shutil
from pathlib import Path

REPORT_FILE = Path("reports/pdf-analysis.json")
BACKUP_DIR = Path("temp/pdf-originals-backup")

def cleanup_pdfs():
    """Elimina PDFs exports y mantiene solo originales"""
    
    if not REPORT_FILE.exists():
        print("❌ Primero ejecuta: py scripts/13-analyze-pdfs.py")
        return
    
    with open(REPORT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    notion_exports = data['classification']['notion_exports']['files']
    unknown_pdfs = data['classification']['unknown']['files']
    original_docs = data['classification']['original_documents']['files']
    
    # Backup de documentos originales
    print("📦 Creando backup de documentos originales...")
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    
    for doc in original_docs:
        src = Path(doc['path'])
        dst = BACKUP_DIR / src.name
        if src.exists():
            shutil.copy2(src, dst)
            print(f"  ✓ {src.name}")
    
    print()
    
    # Eliminar exports de Notion
    print("🗑️  Eliminando exports de Notion...")
    for export in notion_exports:
        pdf_path = Path(export['path'])
        if pdf_path.exists():
            pdf_path.unlink()
            print(f"  ✓ Eliminado: {pdf_path.name}")
    
    print()
    
    # Mostrar PDFs "unknown" para revisión manual
    print("⚠️  PDFs NO CLASIFICADOS (revisar manualmente):")
    print()
    print(f"   Total: {len(unknown_pdfs)} archivos")
    print(f"   Tamaño: {data['classification']['unknown']['total_size_mb']:.2f} MB")
    print()
    print("   Estos probablemente son exports de páginas que ahora")
    print("   tendrán versión HTML en Quartz. Considera eliminarlos.")
    print()
    print("   Para ver la lista completa:")
    print("   cat reports/pdf-analysis.json")
    print()
    
    # Resumen
    print("=" * 70)
    print("✅ LIMPIEZA COMPLETADA")
    print("=" * 70)
    print(f"📦 Backup guardado en: {BACKUP_DIR}")
    print(f"🗑️  Eliminados: {len(notion_exports)} exports de Notion")
    print(f"✅ Conservados: {len(original_docs)} documentos originales")
    print(f"⚠️  Para revisar: {len(unknown_pdfs)} PDFs sin clasificar")
    print()
    print("💡 Los PDFs ahora se generarán dinámicamente desde las páginas HTML")
    print("   usando el botón 'Exportar a PDF' en cada página.")

if __name__ == "__main__":
    cleanup_pdfs()
