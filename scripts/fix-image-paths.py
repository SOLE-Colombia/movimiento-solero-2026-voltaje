#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corregir las rutas de imágenes en archivos Markdown.
Actualiza las referencias de imágenes para que apunten a la ruta correcta en /assets/images/

Uso:
    python scripts/fix-image-paths.py [--dry-run] [--lang es|en]
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import List, Tuple, Dict
from collections import defaultdict

# Configurar encoding para Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

# Colores para output
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def find_all_images(assets_path: Path) -> Dict[str, str]:
    """
    Encuentra todas las imágenes en assets/images/ y mapea nombre -> ruta relativa.
    
    Returns:
        Dict con {nombre_imagen: ruta_relativa_desde_content}
    """
    image_map = {}
    images_path = assets_path / "images"
    
    if not images_path.exists():
        print(f"{Colors.RED}❌ No se encontró la carpeta: {images_path}{Colors.RESET}")
        return image_map
    
    # Buscar todas las imágenes
    for folder in images_path.iterdir():
        if folder.is_dir():
            for image_file in folder.glob("*"):
                if image_file.suffix.lower() in ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']:
                    # Ruta relativa desde content/
                    relative_path = f"/assets/images/{folder.name}/{image_file.name}"
                    image_map[image_file.name] = relative_path
                    
    print(f"{Colors.GREEN}✅ Encontradas {len(image_map)} imágenes{Colors.RESET}")
    return image_map

def extract_image_references(content: str) -> List[Tuple[str, str]]:
    """
    Extrae todas las referencias de imágenes en markdown.
    
    Formatos soportados:
    - ![alt](path)
    - ![alt](path "title")
    - <img src="path" ...>
    
    Returns:
        Lista de tuplas (match_completo, nombre_archivo)
    """
    references = []
    
    # Patrón para markdown: ![alt](path)
    md_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    for match in re.finditer(md_pattern, content):
        full_match = match.group(0)
        path = match.group(2).split()[0]  # Tomar solo el path, ignorar "title"
        filename = os.path.basename(path)
        references.append((full_match, path, filename))
    
    # Patrón para HTML: <img src="path">
    html_pattern = r'<img[^>]+src="([^"]+)"'
    for match in re.finditer(html_pattern, content):
        full_match = match.group(0)
        path = match.group(1)
        filename = os.path.basename(path)
        references.append((full_match, path, filename))
    
    return references

def fix_image_paths(file_path: Path, image_map: Dict[str, str], dry_run: bool = False) -> Tuple[int, List[str]]:
    """
    Corrige las rutas de imágenes en un archivo markdown.
    
    Returns:
        Tupla (cantidad_cambios, lista_de_cambios)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"{Colors.RED}❌ Error leyendo {file_path}: {e}{Colors.RESET}")
        return 0, []
    
    original_content = content
    changes = []
    references = extract_image_references(content)
    
    for full_match, old_path, filename in references:
        # Buscar la imagen en el mapa
        if filename in image_map:
            correct_path = image_map[filename]
            
            # Solo cambiar si la ruta es diferente
            if old_path != correct_path:
                # Reemplazar en el contenido
                new_match = full_match.replace(old_path, correct_path)
                content = content.replace(full_match, new_match)
                
                change_msg = f"  {Colors.YELLOW}• {old_path}{Colors.RESET} → {Colors.GREEN}{correct_path}{Colors.RESET}"
                changes.append(change_msg)
        else:
            # Imagen no encontrada en assets
            changes.append(f"  {Colors.RED}⚠️  Imagen no encontrada en assets: {filename}{Colors.RESET}")
    
    # Guardar cambios si hay y no es dry-run
    if content != original_content and not dry_run:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"{Colors.RED}❌ Error escribiendo {file_path}: {e}{Colors.RESET}")
            return 0, []
    
    return len([c for c in changes if '→' in c]), changes

def process_directory(content_path: Path, lang: str, image_map: Dict[str, str], dry_run: bool = False):
    """
    Procesa todos los archivos .md en un directorio de idioma.
    """
    lang_path = content_path / lang
    
    if not lang_path.exists():
        print(f"{Colors.RED}❌ No se encontró el directorio: {lang_path}{Colors.RESET}")
        return
    
    print(f"\n{Colors.BOLD}{Colors.CYAN}📁 Procesando archivos en {lang}/{Colors.RESET}")
    print("═" * 70)
    
    total_files = 0
    total_changes = 0
    files_with_changes = 0
    
    # Buscar todos los archivos .md recursivamente
    for md_file in lang_path.rglob("*.md"):
        total_files += 1
        relative_path = md_file.relative_to(content_path)
        
        changes_count, changes = fix_image_paths(md_file, image_map, dry_run)
        
        if changes_count > 0:
            files_with_changes += 1
            total_changes += changes_count
            
            print(f"\n{Colors.BLUE}📄 {relative_path}{Colors.RESET}")
            print(f"   {changes_count} cambio(s):")
            for change in changes:
                print(change)
    
    # Resumen
    print(f"\n{Colors.BOLD}📊 Resumen para {lang}/{Colors.RESET}")
    print(f"   Archivos procesados: {total_files}")
    print(f"   Archivos con cambios: {files_with_changes}")
    print(f"   Total de cambios: {Colors.GREEN}{total_changes}{Colors.RESET}")
    
    if dry_run:
        print(f"\n{Colors.YELLOW}ℹ️  Modo DRY-RUN: No se guardaron cambios{Colors.RESET}")

def main():
    parser = argparse.ArgumentParser(
        description='Corrige las rutas de imágenes en archivos Markdown'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Mostrar cambios sin guardarlos'
    )
    parser.add_argument(
        '--lang',
        choices=['es', 'en', 'all'],
        default='all',
        help='Idioma a procesar (es, en, o all para ambos)'
    )
    parser.add_argument(
        '--content-dir',
        type=str,
        default='quartz/content',
        help='Directorio de contenido (default: quartz/content)'
    )
    
    args = parser.parse_args()
    
    # Rutas
    content_path = Path(args.content_dir)
    assets_path = content_path / "assets"
    
    print(f"\n{Colors.BOLD}{Colors.CYAN}🔧 Corrector de Rutas de Imágenes - SOLE Voltaje{Colors.RESET}")
    print("═" * 70)
    
    if not content_path.exists():
        print(f"{Colors.RED}❌ No se encontró: {content_path}{Colors.RESET}")
        return
    
    # Construir mapa de imágenes
    print(f"\n{Colors.CYAN}📸 Escaneando imágenes...{Colors.RESET}")
    image_map = find_all_images(assets_path)
    
    if not image_map:
        print(f"{Colors.RED}❌ No se encontraron imágenes{Colors.RESET}")
        return
    
    # Procesar idiomas
    if args.lang == 'all':
        process_directory(content_path, 'es', image_map, args.dry_run)
        process_directory(content_path, 'en', image_map, args.dry_run)
    else:
        process_directory(content_path, args.lang, image_map, args.dry_run)
    
    print(f"\n{Colors.GREEN}{Colors.BOLD}✅ Proceso completado{Colors.RESET}\n")

if __name__ == "__main__":
    main()

