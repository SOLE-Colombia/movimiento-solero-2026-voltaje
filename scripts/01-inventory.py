#!/usr/bin/env python3
"""
Script 01: Inventario de Archivos
Analiza toda la estructura de Privado y Compartido/ y genera un reporte completo.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

def get_file_size_mb(filepath):
    """Retorna el tamaño del archivo en MB."""
    try:
        return round(os.path.getsize(filepath) / (1024 * 1024), 2)
    except:
        return 0

def extract_internal_links(content):
    """Extrae enlaces internos de un archivo markdown."""
    links = []
    # Enlaces en formato [texto](ruta)
    links.extend(re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content))
    # Enlaces en formato [[ruta]]
    links.extend(re.findall(r'\[\[([^\]]+)\]\]', content))
    return links

def scan_directory(base_path):
    """Escanea el directorio y recopila información de todos los archivos."""
    inventory = {
        "generated_at": datetime.now().isoformat(),
        "base_path": str(base_path),
        "summary": {
            "total_files": 0,
            "markdown_files": 0,
            "images": 0,
            "csv_files": 0,
            "pdf_files": 0,
            "total_size_mb": 0
        },
        "markdown_files": [],
        "images": [],
        "csv_files": [],
        "pdf_files": [],
        "internal_links": []
    }
    
    base_path = Path(base_path)
    
    if not base_path.exists():
        print(f"❌ Error: La ruta {base_path} no existe")
        return inventory
    
    print(f"📂 Escaneando directorio: {base_path}")
    print("=" * 70)
    
    for root, dirs, files in os.walk(base_path):
        for file in files:
            filepath = Path(root) / file
            relative_path = filepath.relative_to(base_path)
            file_ext = filepath.suffix.lower()
            file_size = get_file_size_mb(filepath)
            
            inventory["summary"]["total_files"] += 1
            inventory["summary"]["total_size_mb"] += file_size
            
            file_info = {
                "path": str(relative_path),
                "full_path": str(filepath),
                "size_mb": file_size,
                "extension": file_ext
            }
            
            # Archivos Markdown
            if file_ext == '.md':
                inventory["summary"]["markdown_files"] += 1
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        file_info["lines"] = len(content.split('\n'))
                        file_info["chars"] = len(content)
                        
                        # Extraer enlaces internos
                        links = extract_internal_links(content)
                        if links:
                            for link in links:
                                if isinstance(link, tuple):
                                    inventory["internal_links"].append({
                                        "source": str(relative_path),
                                        "target": link[1] if len(link) > 1 else link[0],
                                        "text": link[0] if len(link) > 1 else ""
                                    })
                                else:
                                    inventory["internal_links"].append({
                                        "source": str(relative_path),
                                        "target": link,
                                        "text": ""
                                    })
                        
                        # Detectar idioma aproximado
                        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                        if title_match:
                            file_info["title"] = title_match.group(1).strip()
                        
                except Exception as e:
                    file_info["error"] = str(e)
                
                inventory["markdown_files"].append(file_info)
            
            # Imágenes
            elif file_ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']:
                inventory["summary"]["images"] += 1
                inventory["images"].append(file_info)
            
            # CSV
            elif file_ext == '.csv':
                inventory["summary"]["csv_files"] += 1
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        file_info["rows"] = len(lines) - 1  # Menos header
                        if lines:
                            file_info["columns"] = len(lines[0].split(','))
                except Exception as e:
                    file_info["error"] = str(e)
                
                inventory["csv_files"].append(file_info)
            
            # PDF
            elif file_ext == '.pdf':
                inventory["summary"]["pdf_files"] += 1
                inventory["pdf_files"].append(file_info)
    
    return inventory

def print_summary(inventory):
    """Imprime un resumen del inventario."""
    summary = inventory["summary"]
    print("\n" + "=" * 70)
    print("📊 RESUMEN DEL INVENTARIO")
    print("=" * 70)
    print(f"📄 Total de archivos:      {summary['total_files']}")
    print(f"📝 Archivos Markdown:      {summary['markdown_files']}")
    print(f"🖼️  Imágenes:               {summary['images']}")
    print(f"📊 Archivos CSV:           {summary['csv_files']}")
    print(f"📕 Archivos PDF:           {summary['pdf_files']}")
    print(f"💾 Tamaño total:           {summary['total_size_mb']:.2f} MB")
    print(f"🔗 Enlaces internos:       {len(inventory['internal_links'])}")
    print("=" * 70)

def main():
    # Configuración
    base_path = Path("Privado y Compartido")
    output_dir = Path("reports")
    output_file = output_dir / "inventory.json"
    
    # Crear directorio de reportes si no existe
    output_dir.mkdir(exist_ok=True)
    
    # Escanear directorio
    print("\n🚀 Iniciando inventario de archivos...")
    inventory = scan_directory(base_path)
    
    # Guardar reporte
    print(f"\n💾 Guardando reporte en {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(inventory, f, indent=2, ensure_ascii=False)
    
    # Mostrar resumen
    print_summary(inventory)
    print(f"\n✅ Reporte completo guardado en: {output_file}")
    print(f"📁 Puedes revisar el archivo JSON para más detalles\n")

if __name__ == "__main__":
    main()

