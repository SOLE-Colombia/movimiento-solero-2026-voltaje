#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SOLE Voltaje - Script 14: Remover PDFs Duplicados
Elimina PDFs que son exports de páginas markdown existentes
"""

import os
import json
import shutil
from pathlib import Path
from datetime import datetime

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

ANALYSIS_FILE = Path("reports/pdf-analysis.json")
PDF_DIR = Path("public/downloads")
BACKUP_DIR = Path("temp/pdf-duplicates-backup")
REPORT_FILE = Path("reports/pdf-removal.json")

# ============================================================================
# FUNCIONES
# ============================================================================

def load_analysis():
    """Carga el análisis de PDFs"""
    with open(ANALYSIS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def move_duplicates(duplicates, dry_run=True):
    """
    Mueve PDFs duplicados a carpeta de backup
    
    Args:
        duplicates: Lista de PDFs duplicados
        dry_run: Si True, solo simula (no mueve archivos)
    
    Returns:
        dict con estadísticas del proceso
    """
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    
    moved = []
    errors = []
    total_size = 0
    
    for pdf_info in duplicates:
        filename = pdf_info['filename']
        src = PDF_DIR / filename
        dst = BACKUP_DIR / filename
        size_mb = pdf_info['size_mb']
        
        if not src.exists():
            errors.append({
                "filename": filename,
                "error": "Archivo no encontrado"
            })
            continue
        
        try:
            if not dry_run:
                shutil.move(str(src), str(dst))
            
            moved.append({
                "filename": filename,
                "size_mb": size_mb,
                "matched_with": pdf_info['matches'][0]['file'] if pdf_info['matches'] else None,
                "similarity": pdf_info['matches'][0]['similarity'] if pdf_info['matches'] else 0
            })
            total_size += size_mb
            
        except Exception as e:
            errors.append({
                "filename": filename,
                "error": str(e)
            })
    
    return {
        "moved": moved,
        "errors": errors,
        "total_files": len(moved),
        "total_size_mb": round(total_size, 2),
        "error_count": len(errors)
    }

def delete_duplicates(confirm=False):
    """
    Elimina permanentemente PDFs duplicados del backup
    
    Args:
        confirm: Debe ser True para eliminar
    """
    if not confirm:
        print("⚠️  Función de eliminación no confirmada")
        return
    
    if not BACKUP_DIR.exists():
        print("❌ No existe directorio de backup")
        return
    
    pdf_files = list(BACKUP_DIR.glob("*.pdf"))
    total_size = sum(os.path.getsize(f) for f in pdf_files) / (1024 * 1024)
    
    print(f"🗑️  Eliminando {len(pdf_files)} PDFs ({total_size:.2f} MB)...")
    
    for pdf_file in pdf_files:
        pdf_file.unlink()
    
    print(f"✅ {len(pdf_files)} PDFs eliminados permanentemente")

def main():
    print("🚀 Iniciando remoción de PDFs duplicados...")
    print("=" * 70)
    print()
    
    # Cargar análisis
    if not ANALYSIS_FILE.exists():
        print(f"❌ Error: No existe {ANALYSIS_FILE}")
        print("   Ejecuta primero: py scripts\\13-analyze-pdf-duplicates.py")
        return
    
    analysis = load_analysis()
    duplicates = analysis['results']['likely_duplicates']
    uncertain = analysis['results']['uncertain']
    unique = analysis['results']['unique_documents']
    
    print("📊 RESUMEN DEL ANÁLISIS")
    print("=" * 70)
    print(f"⚠️  Duplicados a eliminar:    {len(duplicates)} PDFs")
    print(f"   Espacio a recuperar:     {analysis['statistics']['size_duplicates_mb']} MB")
    print()
    print(f"❓ Inciertos (revisar):      {len(uncertain)} PDFs")
    print(f"✅ Únicos (conservar):       {len(unique)} PDFs")
    print(f"   Espacio a mantener:      {analysis['statistics']['size_unique_mb']} MB")
    print()
    print("=" * 70)
    print()
    
    # Preguntar confirmación
    print("⚠️  IMPORTANTE:")
    print("   Los PDFs duplicados se moverán a: temp/pdf-duplicates-backup/")
    print("   Podrás revisarlos antes de eliminarlos permanentemente")
    print()
    
    choice = input("¿Mover PDFs duplicados a backup? (S/n): ").strip().lower()
    
    if choice not in ['s', 'si', 'yes', 'y', '']:
        print("❌ Operación cancelada")
        return
    
    # Mover duplicados
    print()
    print("📦 Moviendo PDFs duplicados a backup...")
    print("=" * 70)
    
    result = move_duplicates(duplicates, dry_run=False)
    
    print()
    print("=" * 70)
    print("📊 RESUMEN DE REMOCIÓN")
    print("=" * 70)
    print(f"✓ PDFs movidos:              {result['total_files']}")
    print(f"💾 Espacio recuperado:       {result['total_size_mb']:.2f} MB")
    print(f"✗ Errores:                   {result['error_count']}")
    print("=" * 70)
    print()
    
    # Guardar reporte
    report = {
        "timestamp": datetime.now().isoformat(),
        "operation": "move_duplicates",
        "statistics": {
            "moved": result['total_files'],
            "size_mb": result['total_size_mb'],
            "errors": result['error_count']
        },
        "details": result
    }
    
    REPORT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Reporte guardado en: {REPORT_FILE}")
    print(f"📁 PDFs respaldados en: {BACKUP_DIR}")
    print()
    print("📝 Próximos pasos:")
    print(f"   1. Revisa los PDFs en: {BACKUP_DIR}")
    print("   2. Si todo está bien, elimínalos permanentemente:")
    print("      rmdir /S /Q temp\\pdf-duplicates-backup")
    print()
    print("   3. Implementa generación automática de PDFs:")
    print("      - Lee: ESTRATEGIA_PDFS.md")
    print("      - Implementa botón 'Descargar PDF' en Quartz")
    print()
    print(f"💾 Tamaño actual de public/downloads: ~{analysis['statistics']['size_unique_mb']} MB")
    print(f"🎉 Reducción total: {analysis['statistics']['size_duplicates_mb']} MB")

if __name__ == "__main__":
    main()


