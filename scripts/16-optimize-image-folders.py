#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script 16: Optimizar Nombres de Carpetas de Imágenes
Elimina los hashes de Notion y actualiza referencias en markdown
"""

import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, List, Tuple

# Configuración
IMAGES_DIR = Path("content/assets/images")
CONTENT_DIRS = [Path("content/es"), Path("content/en")]
REPORTS_DIR = Path("reports")
MAPPING_FILE = REPORTS_DIR / "folder-mapping.json"

def clean_folder_name(folder_name: str) -> str:
    """
    Limpia el nombre de carpeta eliminando el hash de Notion.
    
    Ejemplos:
    - "¿Cómo usar el juego 12a2bd68c5b6801a8d61de57be65d679" 
      -> "como-usar-el-juego"
    - "La esquina del cacharreo 1262bd68c5b680e39fe2ff0120743c8e" 
      -> "la-esquina-del-cacharreo"
    """
    # Eliminar el hash (32 caracteres hexadecimales al final)
    cleaned = re.sub(r'\s+[0-9a-f]{32}$', '', folder_name)
    
    # Limpiar nombre para URL
    # Convertir a minúsculas
    cleaned = cleaned.lower()
    
    # Eliminar signos de puntuación al inicio (¿, ¡)
    cleaned = re.sub(r'^[¿¡]+', '', cleaned)
    
    # Eliminar signos de puntuación al final (?, !)
    cleaned = re.sub(r'[?!]+$', '', cleaned)
    
    # Reemplazar espacios y caracteres especiales con guiones
    cleaned = re.sub(r'[^\w\s-]', '', cleaned)
    cleaned = re.sub(r'[-\s]+', '-', cleaned)
    
    # Eliminar guiones al inicio y final
    cleaned = cleaned.strip('-')
    
    # Truncar si es muy largo (máximo 100 caracteres)
    if len(cleaned) > 100:
        cleaned = cleaned[:100].rstrip('-')
    
    return cleaned

def get_folder_mapping() -> Dict[str, str]:
    """
    Genera un mapeo de nombres de carpetas viejos -> nuevos.
    """
    mapping = {}
    
    if not IMAGES_DIR.exists():
        print(f"❌ No se encuentra el directorio: {IMAGES_DIR}")
        return mapping
    
    for folder in IMAGES_DIR.iterdir():
        if folder.is_dir():
            old_name = folder.name
            new_name = clean_folder_name(old_name)
            
            if old_name != new_name:
                mapping[old_name] = new_name
    
    return mapping

def handle_duplicate_names(mapping: Dict[str, str]) -> Dict[str, str]:
    """
    Maneja nombres duplicados añadiendo sufijos numéricos.
    """
    # Invertir el mapeo para encontrar duplicados
    new_to_old = {}
    for old_name, new_name in mapping.items():
        if new_name not in new_to_old:
            new_to_old[new_name] = []
        new_to_old[new_name].append(old_name)
    
    # Resolver duplicados
    final_mapping = {}
    for new_name, old_names in new_to_old.items():
        if len(old_names) == 1:
            final_mapping[old_names[0]] = new_name
        else:
            # Hay duplicados, añadir sufijos
            for i, old_name in enumerate(sorted(old_names), 1):
                if i == 1:
                    final_mapping[old_name] = new_name
                else:
                    final_mapping[old_name] = f"{new_name}-{i}"
    
    return final_mapping

def rename_folders(mapping: Dict[str, str], dry_run: bool = False) -> List[Tuple[str, str]]:
    """
    Renombra las carpetas físicamente.
    """
    renamed = []
    errors = []
    
    print(f"\n{'🔍 SIMULACIÓN' if dry_run else '📁 RENOMBRANDO'} carpetas de imágenes...")
    print("=" * 80)
    
    for old_name, new_name in mapping.items():
        old_path = IMAGES_DIR / old_name
        new_path = IMAGES_DIR / new_name
        
        if not old_path.exists():
            errors.append(f"❌ No existe: {old_name}")
            continue
        
        if new_path.exists() and new_path != old_path:
            errors.append(f"⚠️  Ya existe: {new_name}")
            continue
        
        print(f"📂 {old_name}")
        print(f"   → {new_name}")
        
        if not dry_run:
            try:
                old_path.rename(new_path)
                renamed.append((old_name, new_name))
                print(f"   ✅ Renombrada")
            except Exception as e:
                errors.append(f"❌ Error renombrando {old_name}: {e}")
                print(f"   ❌ Error: {e}")
        else:
            renamed.append((old_name, new_name))
            print(f"   🔍 Se renombraría")
        
        print()
    
    if errors:
        print("\n⚠️  ERRORES:")
        for error in errors:
            print(f"  {error}")
    
    return renamed

def update_markdown_references(mapping: Dict[str, str], dry_run: bool = False) -> Dict[str, int]:
    """
    Actualiza todas las referencias a carpetas de imágenes en archivos markdown.
    """
    stats = {
        'files_checked': 0,
        'files_updated': 0,
        'references_updated': 0
    }
    
    print(f"\n{'🔍 VERIFICANDO' if dry_run else '📝 ACTUALIZANDO'} referencias en markdown...")
    print("=" * 80)
    
    for content_dir in CONTENT_DIRS:
        if not content_dir.exists():
            continue
        
        # Buscar todos los archivos .md
        md_files = list(content_dir.rglob("*.md"))
        
        for md_file in md_files:
            stats['files_checked'] += 1
            
            try:
                content = md_file.read_text(encoding='utf-8')
                original_content = content
                updates_in_file = 0
                
                # Buscar y reemplazar referencias a carpetas
                for old_name, new_name in mapping.items():
                    # Patrón para encontrar referencias a imágenes
                    # Ejemplos: ![...](../assets/images/CARPETA/imagen.webp)
                    #           ![...](/assets/images/CARPETA/imagen.webp)
                    
                    # Escapar caracteres especiales en el nombre de carpeta
                    old_escaped = re.escape(old_name)
                    
                    # Patrón para rutas relativas y absolutas
                    patterns = [
                        rf'(!\[.*?\]\([./]*assets/images/){old_escaped}(/)',
                        rf'(src=["\'][./]*assets/images/){old_escaped}(/)',
                    ]
                    
                    for pattern in patterns:
                        replacement = rf'\1{new_name}\2'
                        new_content, count = re.subn(pattern, replacement, content)
                        if count > 0:
                            content = new_content
                            updates_in_file += count
                
                if updates_in_file > 0:
                    stats['files_updated'] += 1
                    stats['references_updated'] += updates_in_file
                    
                    print(f"📄 {md_file.relative_to(Path.cwd())}")
                    print(f"   ✏️  {updates_in_file} referencia(s) actualizada(s)")
                    
                    if not dry_run:
                        md_file.write_text(content, encoding='utf-8')
                        print(f"   ✅ Guardado")
                    else:
                        print(f"   🔍 Se actualizaría")
                    print()
            
            except Exception as e:
                print(f"❌ Error procesando {md_file}: {e}")
    
    return stats

def save_mapping(mapping: Dict[str, str]):
    """
    Guarda el mapeo de carpetas para referencia futura.
    """
    REPORTS_DIR.mkdir(exist_ok=True)
    
    report = {
        'description': 'Mapeo de carpetas de imágenes optimizadas',
        'total_folders': len(mapping),
        'mapping': mapping,
        'examples': [
            {
                'old': old,
                'new': new
            }
            for old, new in list(mapping.items())[:5]
        ]
    }
    
    with open(MAPPING_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Mapeo guardado en: {MAPPING_FILE}")

def main():
    """
    Función principal.
    """
    print("=" * 80)
    print("🖼️  OPTIMIZACIÓN DE CARPETAS DE IMÁGENES")
    print("=" * 80)
    
    # Paso 1: Generar mapeo
    print("\n📋 Generando mapeo de carpetas...")
    mapping = get_folder_mapping()
    
    if not mapping:
        print("❌ No se encontraron carpetas para optimizar")
        return
    
    print(f"✅ Se encontraron {len(mapping)} carpetas para optimizar")
    
    # Paso 2: Resolver duplicados
    print("\n🔍 Verificando duplicados...")
    mapping = handle_duplicate_names(mapping)
    print(f"✅ Mapeo final: {len(mapping)} carpetas")
    
    # Paso 3: Guardar mapeo
    save_mapping(mapping)
    
    # Paso 4: Mostrar ejemplos
    print("\n📝 Ejemplos de cambios:")
    print("-" * 80)
    for i, (old, new) in enumerate(list(mapping.items())[:10], 1):
        print(f"{i:2d}. {old}")
        print(f"    → {new}")
        print()
    
    if len(mapping) > 10:
        print(f"    ... y {len(mapping) - 10} más\n")
    
    # Paso 5: Preguntar confirmación
    print("\n⚠️  IMPORTANTE: Esta operación:")
    print("   1. Renombrará carpetas físicas en el disco")
    print("   2. Actualizará referencias en archivos markdown")
    print("   3. Es IRREVERSIBLE (sin el mapeo guardado)")
    print()
    
    response = input("¿Continuar? (s/N): ").lower().strip()
    
    if response != 's':
        print("\n❌ Operación cancelada por el usuario")
        return
    
    # Paso 6: Renombrar carpetas
    renamed = rename_folders(mapping, dry_run=False)
    print(f"\n✅ {len(renamed)} carpetas renombradas")
    
    # Paso 7: Actualizar referencias
    stats = update_markdown_references(mapping, dry_run=False)
    
    # Resumen final
    print("\n" + "=" * 80)
    print("📊 RESUMEN FINAL")
    print("=" * 80)
    print(f"📁 Carpetas renombradas: {len(renamed)}")
    print(f"📄 Archivos revisados: {stats['files_checked']}")
    print(f"📝 Archivos actualizados: {stats['files_updated']}")
    print(f"🔗 Referencias actualizadas: {stats['references_updated']}")
    print()
    print("✅ Optimización completada exitosamente!")
    print(f"💾 Mapeo guardado en: {MAPPING_FILE}")
    print()

if __name__ == "__main__":
    main()

