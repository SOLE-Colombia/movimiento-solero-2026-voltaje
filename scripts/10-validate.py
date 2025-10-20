#!/usr/bin/env python3
"""
Script 10: Validación
Valida enlaces internos, imágenes y frontmatter en el contenido final.
"""

import os
import re
import yaml
from pathlib import Path
from collections import defaultdict

def load_frontmatter(filepath):
    """Carga el frontmatter de un archivo markdown."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if not content.startswith('---'):
            return None
        
        parts = content.split('---', 2)
        if len(parts) < 3:
            return None
        
        return yaml.safe_load(parts[1])
    except Exception as e:
        return None

def validate_frontmatter(filepath, frontmatter):
    """Valida que el frontmatter tenga los campos requeridos."""
    errors = []
    warnings = []
    
    required_fields = ['title', 'lang']
    recommended_fields = ['slug', 'fecha']
    
    if not frontmatter:
        errors.append(f"Sin frontmatter: {filepath}")
        return errors, warnings
    
    # Validar campos requeridos
    for field in required_fields:
        if field not in frontmatter or not frontmatter[field]:
            errors.append(f"Campo requerido faltante '{field}': {filepath}")
    
    # Validar campos recomendados
    for field in recommended_fields:
        if field not in frontmatter or not frontmatter[field]:
            warnings.append(f"Campo recomendado faltante '{field}': {filepath}")
    
    # Validar valores específicos
    if 'lang' in frontmatter:
        if frontmatter['lang'] not in ['es', 'en']:
            errors.append(f"Idioma inválido '{frontmatter['lang']}': {filepath}")
    
    return errors, warnings

def extract_internal_links(content):
    """Extrae enlaces internos del contenido."""
    links = []
    
    # Enlaces markdown [texto](ruta)
    markdown_links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
    for text, link in markdown_links:
        if not link.startswith('http://') and not link.startswith('https://') and not link.startswith('#'):
            links.append(link)
    
    return links

def extract_image_references(content):
    """Extrae referencias de imágenes del contenido."""
    images = []
    
    # Imágenes markdown ![alt](ruta)
    md_images = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', content)
    images.extend([img[1] for img in md_images])
    
    # Imágenes HTML <img src="ruta"
    html_images = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    images.extend(html_images)
    
    return images

def validate_links_and_images(content_dir):
    """Valida enlaces internos e imágenes."""
    content_dir = Path(content_dir)
    
    # Construir índice de archivos disponibles
    available_files = set()
    for md_file in content_dir.rglob("*.md"):
        # Agregar rutas posibles
        relative = md_file.relative_to(content_dir)
        available_files.add(str(relative))
        available_files.add(f"/{relative}")
        available_files.add(str(relative.with_suffix('')))
        available_files.add(f"/{relative.with_suffix('')}")
    
    # Construir índice de imágenes disponibles
    available_images = set()
    image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
    for ext in image_extensions:
        for img_file in content_dir.rglob(f"*{ext}"):
            relative = img_file.relative_to(content_dir)
            available_images.add(str(relative))
            available_images.add(f"/{relative}")
    
    errors = []
    warnings = []
    
    print(f"🔍 Validando enlaces e imágenes...")
    print(f"   Archivos disponibles: {len(available_files)}")
    print(f"   Imágenes disponibles: {len(available_images)}")
    print("=" * 70)
    
    for md_file in content_dir.rglob("*.md"):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            relative_path = md_file.relative_to(content_dir)
            
            # Validar enlaces
            links = extract_internal_links(content)
            for link in links:
                # Limpiar anclas
                link_clean = link.split('#')[0]
                if not link_clean:
                    continue
                
                # Resolver ruta relativa
                if not link_clean.startswith('/'):
                    link_resolved = (md_file.parent / link_clean).resolve()
                    try:
                        link_clean = str(link_resolved.relative_to(content_dir.resolve()))
                    except:
                        pass
                
                # Verificar si existe
                found = False
                for available in available_files:
                    if link_clean in available or available in link_clean:
                        found = True
                        break
                
                if not found and not link.endswith('.pdf'):
                    warnings.append(f"Enlace roto: {link} en {relative_path}")
            
            # Validar imágenes
            images = extract_image_references(content)
            for img in images:
                # Limpiar query strings
                img_clean = img.split('?')[0]
                
                if not img_clean.startswith('http://') and not img_clean.startswith('https://'):
                    found = False
                    for available in available_images:
                        if img_clean in available or available in img_clean:
                            found = True
                            break
                    
                    if not found:
                        errors.append(f"Imagen faltante: {img} en {relative_path}")
        
        except Exception as e:
            errors.append(f"Error procesando {relative_path}: {e}")
    
    return errors, warnings

def validate_all(content_dir):
    """Ejecuta todas las validaciones."""
    content_dir = Path(content_dir)
    
    print(f"✓ Validando contenido en: {content_dir}")
    print("=" * 70)
    
    all_errors = []
    all_warnings = []
    
    # Validar frontmatter
    print(f"\n📋 Validando frontmatter...")
    md_files = list(content_dir.rglob("*.md"))
    
    for md_file in md_files:
        frontmatter = load_frontmatter(md_file)
        errors, warnings = validate_frontmatter(md_file.relative_to(content_dir), frontmatter)
        all_errors.extend(errors)
        all_warnings.extend(warnings)
    
    print(f"✓ {len(md_files)} archivos verificados")
    
    # Validar enlaces e imágenes
    link_errors, link_warnings = validate_links_and_images(content_dir)
    all_errors.extend(link_errors)
    all_warnings.extend(link_warnings)
    
    return all_errors, all_warnings

def write_validation_report(output_file, errors, warnings):
    """Escribe reporte de validación a archivo."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write("REPORTE DE VALIDACIÓN - SOLE VOLTAJE\n")
        f.write("=" * 70 + "\n\n")
        
        f.write(f"Total de errores: {len(errors)}\n")
        f.write(f"Total de advertencias: {len(warnings)}\n\n")
        
        if errors:
            f.write("\n" + "=" * 70 + "\n")
            f.write("ERRORES\n")
            f.write("=" * 70 + "\n")
            for error in errors:
                f.write(f"✗ {error}\n")
        
        if warnings:
            f.write("\n" + "=" * 70 + "\n")
            f.write("ADVERTENCIAS\n")
            f.write("=" * 70 + "\n")
            for warning in warnings:
                f.write(f"⚠ {warning}\n")
        
        if not errors and not warnings:
            f.write("\n✅ ¡Todo está correcto! No se encontraron errores ni advertencias.\n")

def main():
    content_dir = Path("content")
    output_file = Path("reports/validation-errors.txt")
    
    if not content_dir.exists():
        print("❌ Error: El directorio content/ no existe")
        return
    
    print("\n🚀 Iniciando validación completa...\n")
    
    # Ejecutar validaciones
    errors, warnings = validate_all(content_dir)
    
    # Guardar reporte
    output_file.parent.mkdir(exist_ok=True)
    write_validation_report(output_file, errors, warnings)
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("✓ RESUMEN DE VALIDACIÓN")
    print("=" * 70)
    print(f"✗ Errores encontrados:         {len(errors)}")
    print(f"⚠ Advertencias:                {len(warnings)}")
    
    if errors:
        print(f"\n❌ Se encontraron {len(errors)} errores que deben corregirse")
        print(f"   Mostrando primeros 10:")
        for error in errors[:10]:
            print(f"   ✗ {error}")
        if len(errors) > 10:
            print(f"   ... y {len(errors) - 10} más")
    
    if warnings:
        print(f"\n⚠️  Se encontraron {len(warnings)} advertencias")
        print(f"   Mostrando primeras 10:")
        for warning in warnings[:10]:
            print(f"   ⚠ {warning}")
        if len(warnings) > 10:
            print(f"   ... y {len(warnings) - 10} más")
    
    if not errors and not warnings:
        print(f"\n✅ ¡Perfecto! No se encontraron problemas")
    
    print("=" * 70)
    print(f"\n📄 Reporte completo guardado en: {output_file}\n")

if __name__ == "__main__":
    main()

