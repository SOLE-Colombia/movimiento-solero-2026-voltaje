#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para limpiar y mejorar archivos Markdown:
1. Convertir HTML <img> a Markdown
2. Normalizar rutas de imágenes
3. Mejorar formato de enlaces (URLs → [texto descriptivo](url))
4. Limpiar referencias y fuentes

Uso:
    python scripts/clean-markdown.py [--dry-run] [--lang es|en]
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import Dict, Tuple, List
from urllib.parse import urlparse

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
    """Encuentra todas las imágenes en assets/images/"""
    image_map = {}
    images_path = assets_path / "images"
    
    if not images_path.exists():
        return image_map
    
    for folder in images_path.iterdir():
        if folder.is_dir():
            for image_file in folder.glob("*"):
                if image_file.suffix.lower() in ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']:
                    relative_path = f"/assets/images/{folder.name}/{image_file.name}"
                    image_map[image_file.name] = relative_path
    
    return image_map

def normalize_path(path: str) -> str:
    """Normaliza una ruta: backslashes -> slashes, añade / inicial"""
    path = path.strip()
    path = path.replace('\\', '/')
    path = re.sub(r'/+', '/', path)
    if not path.startswith('/') and not path.startswith('./') and not path.startswith('../'):
        if not path.startswith('http'):
            path = '/' + path
    return path

def extract_filename(path: str) -> str:
    """Extrae el nombre del archivo de una ruta"""
    return path.split('/')[-1].split('\\')[-1].split('?')[0].split('#')[0]

def get_link_text_from_url(url: str) -> str:
    """Extrae un texto descriptivo de una URL"""
    try:
        parsed = urlparse(url)
        
        # Si tiene texto después de # (ancla)
        if parsed.fragment:
            text = parsed.fragment.replace('-', ' ').replace('_', ' ').title()
            if text and len(text) > 3:
                return text
        
        # Extraer del path
        path_parts = [p for p in parsed.path.split('/') if p]
        if path_parts:
            last_part = path_parts[-1]
            # Remover extensión
            if '.' in last_part:
                last_part = last_part.rsplit('.', 1)[0]
            text = last_part.replace('-', ' ').replace('_', ' ').title()
            if text and len(text) > 3:
                return text
        
        # Usar el dominio
        domain = parsed.netloc.replace('www.', '')
        if domain and len(domain) > 3:
            return domain
    except (ValueError, AttributeError):
        # Si falla el parsing, intentar extraer el dominio manualmente
        pass
    
    # Fallback: usar la URL completa acortada
    if len(url) > 50:
        return url[:47] + "..."
    return url

def clean_images(content: str, image_map: Dict[str, str]) -> Tuple[str, int]:
    """Limpia y normaliza imágenes (HTML → Markdown)"""
    changes = 0
    new_content = content
    
    # 1. Convertir HTML <img> a Markdown
    html_img_pattern = r'<img\s+[^>]*?src=["\']([^"\']+?\.(?:png|jpg|jpeg|gif|webp|svg))["\'][^>]*?(?:alt=["\']([^"\']*?)["\'])?[^>]*?/?>'
    
    def convert_html_to_markdown(match):
        nonlocal changes
        src = match.group(1)
        alt = match.group(2) if match.lastindex >= 2 and match.group(2) else "Imagen"
        
        filename = extract_filename(src)
        if filename in image_map:
            correct_path = image_map[filename]
        else:
            correct_path = normalize_path(src)
        
        changes += 1
        return f"![{alt}]({correct_path})"
    
    new_content = re.sub(html_img_pattern, convert_html_to_markdown, new_content, flags=re.IGNORECASE | re.DOTALL)
    
    # 2. Normalizar rutas en Markdown ![alt](path)
    md_img_pattern = r'!\[([^\]]*?)\]\(([^)]+?\.(?:png|jpg|jpeg|gif|webp|svg)[^)]*?)\)'
    
    def fix_markdown_path(match):
        nonlocal changes
        alt = match.group(1)
        old_path = match.group(2).strip()
        
        filename = extract_filename(old_path)
        if filename in image_map:
            correct_path = image_map[filename]
        else:
            correct_path = normalize_path(old_path)
        
        if old_path != correct_path:
            changes += 1
            return f"![{alt}]({correct_path})"
        
        return match.group(0)
    
    new_content = re.sub(md_img_pattern, fix_markdown_path, new_content)
    
    return new_content, changes

def clean_links(content: str) -> Tuple[str, int]:
    """Limpia y mejora el formato de enlaces"""
    changes = 0
    new_content = content
    
    # 1. URLs sueltas (no en Markdown) → [texto](url)
    # Buscar URLs que NO estén ya en formato Markdown
    url_pattern = r'(?<!\]\()(?<!\()https?://[^\s<>\"\'\)]+(?![^\[]*\])'
    
    def improve_url(match):
        nonlocal changes
        url = match.group(0)
        text = get_link_text_from_url(url)
        changes += 1
        return f"[{text}]({url})"
    
    new_content = re.sub(url_pattern, improve_url, new_content)
    
    # 2. Limpiar enlaces Markdown con texto igual a la URL
    md_link_pattern = r'\[(' + r'https?://[^\]]+' + r')\]\((\1)\)'
    
    def improve_md_link(match):
        nonlocal changes
        url = match.group(1)
        text = get_link_text_from_url(url)
        changes += 1
        return f"[{text}]({url})"
    
    new_content = re.sub(md_link_pattern, improve_md_link, new_content)
    
    return new_content, changes

def clean_markdown_file(
    file_path: Path,
    image_map: Dict[str, str],
    dry_run: bool = False
) -> Tuple[int, bool]:
    """Limpia un archivo Markdown completo"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"{Colors.RED}❌ Error leyendo {file_path.name}: {e}{Colors.RESET}")
        return 0, False
    
    original_content = content
    total_changes = 0
    
    # 1. Limpiar imágenes
    content, img_changes = clean_images(content, image_map)
    total_changes += img_changes
    
    # 2. Limpiar enlaces
    content, link_changes = clean_links(content)
    total_changes += link_changes
    
    if total_changes > 0:
        print(f"  {Colors.CYAN}📄 {file_path.name}{Colors.RESET}")
        
        if img_changes > 0:
            print(f"    {Colors.GREEN}🖼️  {img_changes} imágenes corregidas{Colors.RESET}")
        if link_changes > 0:
            print(f"    {Colors.BLUE}🔗 {link_changes} enlaces mejorados{Colors.RESET}")
        
        if not dry_run:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"    {Colors.GREEN}✅ Guardado{Colors.RESET}")
            except Exception as e:
                print(f"    {Colors.RED}❌ Error guardando: {e}{Colors.RESET}")
                return total_changes, False
        else:
            print(f"    {Colors.YELLOW}🔍 Dry-run: cambios NO aplicados{Colors.RESET}")
    
    return total_changes, True

def main():
    parser = argparse.ArgumentParser(
        description="Limpia y mejora archivos Markdown (imágenes y enlaces)"
    )
    parser.add_argument("--dry-run", action="store_true", help="Muestra cambios sin aplicarlos")
    parser.add_argument("--lang", type=str, choices=['es', 'en'], help="Procesa solo un idioma")
    args = parser.parse_args()
    
    root_dir = Path(__file__).resolve().parents[1]
    content_path = root_dir / "quartz" / "content"
    assets_path = content_path / "assets"
    
    print(f"\n{Colors.BOLD}{Colors.CYAN}🧹 Limpieza de Markdown - SOLE Voltaje{Colors.RESET}")
    print(f"{'═' * 70}\n")
    
    if not content_path.exists():
        print(f"{Colors.RED}❌ No se encontró: {content_path}{Colors.RESET}")
        sys.exit(1)
    
    print(f"📸 Cargando mapa de imágenes...")
    image_map = find_all_images(assets_path)
    if image_map:
        print(f"{Colors.GREEN}✅ {len(image_map)} imágenes encontradas{Colors.RESET}\n")
    else:
        print(f"{Colors.YELLOW}⚠️  No se encontraron imágenes{Colors.RESET}\n")
    
    total_files = 0
    total_changes = 0
    files_with_changes = 0
    
    for lang in ["es", "en"]:
        if args.lang and lang != args.lang:
            continue
        
        lang_path = content_path / lang
        if not lang_path.exists():
            print(f"{Colors.YELLOW}⚠️  No se encontró: /{lang}/{Colors.RESET}")
            continue
        
        print(f"\n{Colors.BOLD}📁 Procesando archivos en /{lang}/{Colors.RESET}")
        print(f"{'─' * 70}")
        
        lang_files = 0
        lang_changes = 0
        lang_files_changed = 0
        
        for md_file in sorted(lang_path.rglob("*.md")):
            lang_files += 1
            changes, success = clean_markdown_file(md_file, image_map, args.dry_run)
            
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
    
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'═' * 70}{Colors.RESET}")
    print(f"{Colors.BOLD}✅ Proceso completado{Colors.RESET}\n")
    
    if args.dry_run:
        print(f"{Colors.YELLOW}ℹ️  Modo DRY-RUN: No se guardaron cambios{Colors.RESET}\n")
    
    print(f"{Colors.BOLD}📊 Resumen Global:{Colors.RESET}")
    print(f"   • Archivos Markdown procesados: {total_files}")
    print(f"   • Archivos con cambios: {files_with_changes}")
    print(f"   • Total de mejoras aplicadas: {total_changes}")
    
    if total_changes > 0:
        if args.dry_run:
            print(f"\n{Colors.CYAN}💡 Para aplicar los cambios:{Colors.RESET}")
            print(f"   {Colors.BOLD}python scripts/clean-markdown.py{Colors.RESET}")
        else:
            print(f"\n{Colors.GREEN}✅ ¡Todos los cambios aplicados correctamente!{Colors.RESET}")
    else:
        print(f"\n{Colors.GREEN}🎉 ¡Excelente! Todo ya está limpio.{Colors.RESET}")
    
    print()

if __name__ == "__main__":
    main()

