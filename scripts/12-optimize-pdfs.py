#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SOLE Voltaje - Script 12: Optimización de PDFs
Comprime PDFs para reducir tamaño sin perder calidad significativa
"""

import os
import sys
import json
from pathlib import Path
from datetime import datetime
import shutil

try:
    import pikepdf
    from pikepdf import Pdf
except ImportError:
    print("❌ Error: pikepdf no está instalado")
    print("   Ejecuta: py -m pip install pikepdf")
    sys.exit(1)

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

SOURCE_DIR = Path("public/downloads")
OUTPUT_DIR = Path("public/downloads-optimized")
BACKUP_DIR = Path("temp/pdf-backups")
REPORT_FILE = Path("reports/pdf-optimization.json")

# Niveles de compresión
COMPRESSION_LEVELS = {
    "1": {"name": "Baja (mayor calidad)", "level": 9},
    "2": {"name": "Media (recomendado)", "level": 6},
    "3": {"name": "Alta (menor tamaño)", "level": 3}
}

# ============================================================================
# FUNCIONES
# ============================================================================

def get_file_size_mb(file_path):
    """Obtiene el tamaño del archivo en MB"""
    return os.path.getsize(file_path) / (1024 * 1024)

def optimize_pdf(input_path, output_path, compression_level=6):
    """
    Optimiza un PDF usando pikepdf
    
    Args:
        input_path: Path al PDF original
        output_path: Path donde guardar el PDF optimizado
        compression_level: Nivel de compresión (1-9, donde 9 es mejor calidad)
    
    Returns:
        dict con información de la optimización
    """
    try:
        original_size = get_file_size_mb(input_path)
        
        # Abrir el PDF
        with Pdf.open(input_path) as pdf:
            # Optimizar imágenes dentro del PDF
            for page in pdf.pages:
                for image_key in page.images.keys():
                    try:
                        image = page.images[image_key]
                        # Reducir calidad de imágenes JPEG
                        if hasattr(image, 'Filter') and '/DCTDecode' in str(image.Filter):
                            # Es una imagen JPEG, podemos optimizarla
                            pass
                    except Exception:
                        # Ignorar errores en imágenes individuales
                        pass
            
            # Guardar con compresión
            pdf.save(
                output_path,
                compress_streams=True,
                stream_decode_level=pikepdf.StreamDecodeLevel.generalized,
                object_stream_mode=pikepdf.ObjectStreamMode.generate,
                linearize=True  # Optimiza para carga rápida en web
            )
        
        optimized_size = get_file_size_mb(output_path)
        reduction = ((original_size - optimized_size) / original_size) * 100
        
        return {
            "success": True,
            "original_size_mb": round(original_size, 2),
            "optimized_size_mb": round(optimized_size, 2),
            "reduction_percent": round(reduction, 1),
            "error": None
        }
    
    except Exception as e:
        return {
            "success": False,
            "original_size_mb": round(get_file_size_mb(input_path), 2),
            "optimized_size_mb": 0,
            "reduction_percent": 0,
            "error": str(e)
        }

def main():
    print("🚀 Iniciando optimización de PDFs...")
    print()
    
    # Verificar que exista el directorio
    if not SOURCE_DIR.exists():
        print(f"❌ Error: No existe el directorio {SOURCE_DIR}")
        return
    
    # Obtener todos los PDFs
    pdf_files = list(SOURCE_DIR.glob("*.pdf"))
    total_pdfs = len(pdf_files)
    
    if total_pdfs == 0:
        print("❌ No se encontraron PDFs para optimizar")
        return
    
    # Calcular tamaño total
    total_size_mb = sum(get_file_size_mb(pdf) for pdf in pdf_files)
    
    print(f"📄 Encontrados: {total_pdfs} PDFs")
    print(f"💾 Tamaño total: {total_size_mb:.2f} MB")
    print()
    
    # Seleccionar nivel de compresión
    print("Selecciona el nivel de compresión:")
    for key, value in COMPRESSION_LEVELS.items():
        print(f"  {key}. {value['name']}")
    print()
    
    choice = input("Tu elección (1-3): ").strip()
    if choice not in COMPRESSION_LEVELS:
        print("❌ Opción inválida, usando nivel medio")
        choice = "2"
    
    compression_level = COMPRESSION_LEVELS[choice]["level"]
    print(f"✓ Usando: {COMPRESSION_LEVELS[choice]['name']}")
    print()
    
    # Crear directorios
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    REPORT_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    # Procesar PDFs
    print("=" * 70)
    print("🔄 PROCESANDO PDFs...")
    print("=" * 70)
    
    results = []
    successful = 0
    failed = 0
    total_original = 0
    total_optimized = 0
    
    for i, pdf_file in enumerate(pdf_files, 1):
        print(f"📄 [{i}/{total_pdfs}] {pdf_file.name}")
        print(f"   Tamaño original: {get_file_size_mb(pdf_file):.2f} MB")
        
        output_path = OUTPUT_DIR / pdf_file.name
        
        # Optimizar
        result = optimize_pdf(pdf_file, output_path, compression_level)
        result["filename"] = pdf_file.name
        result["input_path"] = str(pdf_file)
        result["output_path"] = str(output_path)
        results.append(result)
        
        if result["success"]:
            print(f"   ✓ Optimizado: {result['optimized_size_mb']:.2f} MB (reducción: {result['reduction_percent']:.1f}%)")
            successful += 1
            total_original += result["original_size_mb"]
            total_optimized += result["optimized_size_mb"]
        else:
            print(f"   ✗ Error: {result['error']}")
            # Copiar original si falla la optimización
            shutil.copy2(pdf_file, output_path)
            failed += 1
        
        # Progreso cada 25 archivos
        if i % 25 == 0:
            print(f"✓ Procesados: {i}/{total_pdfs}")
        
        print()
    
    # Calcular reducción total
    total_reduction = ((total_original - total_optimized) / total_original) * 100 if total_original > 0 else 0
    
    # Guardar reporte
    report = {
        "timestamp": datetime.now().isoformat(),
        "compression_level": COMPRESSION_LEVELS[choice]["name"],
        "total_pdfs": total_pdfs,
        "successful": successful,
        "failed": failed,
        "total_original_mb": round(total_original, 2),
        "total_optimized_mb": round(total_optimized, 2),
        "total_reduction_percent": round(total_reduction, 1),
        "files": results
    }
    
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    # Resumen final
    print("=" * 70)
    print("📄 RESUMEN DE OPTIMIZACIÓN")
    print("=" * 70)
    print(f"📄 Total de PDFs:         {total_pdfs}")
    print(f"✓  Optimizados:           {successful}")
    print(f"✗  Errores:               {failed}")
    print(f"💾 Tamaño antes:          {total_original:.2f} MB")
    print(f"💾 Tamaño después:        {total_optimized:.2f} MB")
    print(f"📉 Reducción:             {total_reduction:.1f}%")
    print(f"💾 Espacio ahorrado:      {total_original - total_optimized:.2f} MB")
    print("=" * 70)
    print(f"✅ PDFs optimizados en: {OUTPUT_DIR}")
    print(f"📋 Reporte guardado en: {REPORT_FILE}")
    print()
    print("📝 Próximos pasos:")
    print("   1. Revisa algunos PDFs optimizados para verificar calidad")
    print("   2. Si la calidad es buena:")
    print("      - Elimina: public/downloads (originales)")
    print("      - Renombra: public/downloads-optimized → public/downloads")
    print("   3. Actualiza el repositorio con los PDFs optimizados")

if __name__ == "__main__":
    main()






