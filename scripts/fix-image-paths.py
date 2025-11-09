#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corregir las rutas de imágenes en archivos Markdown.
- Convierte etiquetas HTML <img> a formato Markdown
- Normaliza rutas (backslashes -> slashes)
- Corrige rutas usando el mapa de imágenes de assets/images/

Uso:
    python scripts/fix-image-paths.py [--dry-run] [--lang es|en]
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import Dict, Tuple

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
    Encuentra todas las imágenes en assets/images/ y mapea nombre -> ruta correcta.
    """
    image_map = {}
    images_path = assets_path / "images"
    
    if not images_path.exists():
        print(f"{Colors.YELLOW}⚠️  No se encontró assets/images/, se normalizarán rutas existentes{Colors.RESET}")
        return image_map
    
    # Buscar todas las imágenes en subcarpetas
    for folder in images_path.iterdir():
        if folder.is_dir():
            for image_file in folder.glob("*"):
                if image_file.suffix.lower() in ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']:
                    # Ruta correcta desde /content
                    relative_path = f"/assets/images/{folder.name}/{image_file.name}"
                    image_map[image_file.name] = relative_path
    
    return image_map

def normalize_path(path: str) -> str:
    """Normaliza una ruta: backslashes -> slashes, añade / inicial"""
    # Eliminar espacios al inicio/final
    path = path.strip()
    # Reemplazar backslashes por slashes
    path = path.replace('\\', '/')
    # Eliminar múltiples slashes
    path = re.sub(r'/+', '/', path)
    # Añadir / inicial si no lo tiene y no es una ruta relativa válida
    if not path.startswith('/') and not path.startswith('./') and not path.startswith('../'):
        path = '/' + path
    return path

def extract_filename(path: str) -> str:
    """Extrae el nombre del archivo de una ruta"""
    return path.split('/')[-1].split('\\')[-1].split('?')[0].split('#')[0]

def fix_image_paths_in_content(
    content: str,
    image_map: Dict[str, str],
    file_path: Path,
    dry_run: bool = False
) -> Tuple[str, int]:
    """
    Corrige las rutas de imágenes y convierte HTML a Markdown.
    """
    changes_made = 0
    new_content = content
    
    # 1. Convertir todas las etiquetas <img> a Markdown
    html_img_pattern = r'<img\s+[^>]*?src=["\']([^"\']+?\.(?:png|jpg|jpeg|gif|webp|svg))["\'][^>]*?(?:alt=["\']([^"\']*?)["\'])?[^>]*?/?>'
    
    def convert_html_to_markdown(match):
        nonlocal changes_made
        src = match.group(1)
        alt = match.group(2) if match.lastindex >= 2 and match.group(2) else "Imagen"
        
        # Extraer nombre del archivo
        filename = extract_filename(src)
        
        # Buscar en el mapa de imágenes
        if filename in image_map:
            correct_path = image_map[filename]
        else:
            correct_path = normalize_path(src)
        
        markdown = f"![{alt}]({correct_path})"
        
        if not dry_run:
            print(f"    {Colors.GREEN}HTML→MD:{Colors.RESET} '{filename}' → {correct_path}")
        changes_made += 1
        return markdown
    
    new_content = re.sub(html_img_pattern, convert_html_to_markdown, new_content, flags=re.IGNORECASE | re.DOTALL)
    
    # 2. Corregir rutas en formato Markdown: ![alt](path)
    md_img_pattern = r'!\[([^\]]*?)\]\(([^)]+?\.(?:png|jpg|jpeg|gif|webp|svg)[^)]*?)\)'
    
    def fix_markdown_path(match):
        nonlocal changes_made
        alt = match.group(1)
        old_path = match.group(2).strip()
        
        # Extraer nombre del archivo
        filename = extract_filename(old_path)
        
        # Buscar en el mapa de imágenes
        if filename in image_map:
            correct_path = image_map[filename]
        else:
            correct_path = normalize_path(old_path)
        
        # Solo cambiar si es diferente
        if old_path != correct_path:
            if not dry_run:
                print(f"    {Colors.YELLOW}Corregir:{Colors.RESET} '{filename}' → {correct_path}")
            changes_made += 1
            return f"![{alt}]({correct_path})"
        
        return match.group(0)
    
    new_content = re.sub(md_img_pattern, fix_markdown_path, new_content)
    
    return new_content, changes_made

def process_file(file_path: Path, image_map: Dict[str, str], dry_run: bool = False) -> Tuple[int, bool]:
    """
    Procesa un archivo markdown.
    Returns: (cantidad_cambios, success)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"{Colors.RED}❌ Error leyendo {file_path}: {e}{Colors.RESET}")
        return 0, False
    
    new_content, changes = fix_image_paths_in_content(content, image_map, file_path, dry_run)
    
    if changes > 0:
        print(f"  {Colors.CYAN}📄 {file_path.relative_to(Path.cwd()).as_posix()}{Colors.RESET}")
        
        if not dry_run:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"    {Colors.GREEN}✅ Guardado ({changes} cambios){Colors.RESET}")
            except Exception as e:
                print(f"    {Colors.RED}❌ Error guardando: {e}{Colors.RESET}")
                return changes, False
        else:
            print(f"    {Colors.YELLOW}🔍 {changes} cambios detectados (dry-run){Colors.RESET}")
    
    return changes, True

def main():
    parser = argparse.ArgumentParser(
        description="Corrige rutas de imágenes y convierte HTML a Markdown"
    )
    parser.add_argument("--dry-run", action="store_true", help="Muestra cambios sin aplicarlos")
    parser.add_argument("--lang", type=str, choices=['es', 'en'], help="Procesa solo un idioma")
    args = parser.parse_args()
    
    root_dir = Path(__file__).resolve().parents[1]
    content_path = root_dir / "quartz" / "content"
    assets_path = content_path / "assets"
    
    print(f"\n{Colors.BOLD}{Colors.CYAN}🔧 Corrector de Rutas de Imágenes - SOLE Voltaje{Colors.RESET}")
    print(f"══════════════════════════════════════════════════════════════════════\n")
    
    if not content_path.exists():
        print(f"{Colors.RED}❌ No se encontró la carpeta: {content_path}{Colors.RESET}")
        sys.exit(1)
    
    # Buscar todas las imágenes
    print(f"📸 Escaneando imágenes en assets/images/...")
    image_map = find_all_images(assets_path)
    if image_map:
        print(f"{Colors.GREEN}✅ Encontradas {len(image_map)} imágenes{Colors.RESET}\n")
    else:
        print(f"{Colors.YELLOW}⚠️  No se encontraron imágenes, solo se normalizarán rutas{Colors.RESET}\n")
    
    total_files = 0
    total_changes = 0
    files_with_changes = 0
    
    # Procesar archivos por idioma
    for lang in ["es", "en"]:
        if args.lang and lang != args.lang:
            continue
        
        lang_path = content_path / lang
        if not lang_path.exists():
            print(f"{Colors.YELLOW}⚠️  No se encontró: {lang}/{Colors.RESET}")
            continue
        
        print(f"\n{Colors.BOLD}📁 Procesando archivos en /{lang}/{Colors.RESET}")
        print(f"──────────────────────────────────────────────────────────────────────")
        
        lang_files = 0
        lang_changes = 0
        lang_files_changed = 0
        
        for md_file in sorted(lang_path.rglob("*.md")):
            lang_files += 1
            changes, success = process_file(md_file, image_map, args.dry_run)
            
            if changes > 0:
                lang_changes += changes
                lang_files_changed += 1
        
        total_files += lang_files
        total_changes += lang_changes
        files_with_changes += lang_files_changed
        
        print(f"\n{Colors.BOLD}📊 Resumen /{lang}/{Colors.RESET}")
        print(f"   • Archivos procesados: {lang_files}")
        print(f"   • Archivos modificados: {lang_files_changed}")
        print(f"   • Total cambios: {lang_changes}")
    
    # Resumen final
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'═' * 70}{Colors.RESET}")
    print(f"{Colors.BOLD}✅ Proceso completado{Colors.RESET}\n")
    
    if args.dry_run:
        print(f"{Colors.YELLOW}ℹ️  Modo DRY-RUN: No se guardaron cambios{Colors.RESET}\n")
    
    print(f"{Colors.BOLD}📊 Resumen Global:{Colors.RESET}")
    print(f"   • Archivos Markdown procesados: {total_files}")
    print(f"   • Archivos con cambios: {files_with_changes}")
    print(f"   • Total de correcciones: {total_changes}")
    
    if total_changes > 0:
        if args.dry_run:
            print(f"\n{Colors.CYAN}💡 Para aplicar los cambios, ejecuta:{Colors.RESET}")
            print(f"   {Colors.BOLD}python scripts/fix-image-paths.py{Colors.RESET}")
        else:
            print(f"\n{Colors.GREEN}✅ ¡Todos los cambios se aplicaron correctamente!{Colors.RESET}")
    else:
        print(f"\n{Colors.GREEN}🎉 ¡Excelente! Todas las rutas ya están correctas.{Colors.RESET}")
    
    print()

if __name__ == "__main__":
    main()
