#!/usr/bin/env python3
"""
Script para corregir el frontmatter de archivos markdown exportados de Notion.

Corrige:
- Extrae metadata del cuerpo y la mueve al frontmatter
- Elimina títulos duplicados
- Elimina líneas de metadata del cuerpo
- Prioriza información ya existente en el frontmatter
"""

import os
import re
from pathlib import Path
from datetime import datetime


def parse_frontmatter(content):
    """Extrae el frontmatter y el contenido del archivo."""
    if not content.startswith('---'):
        return {}, '', content
    
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, '', content
    
    frontmatter_text = parts[1].strip()
    body = parts[2].strip()
    
    # Parsear frontmatter manualmente
    frontmatter = {}
    current_key = None
    current_list = []
    
    for line in frontmatter_text.split('\n'):
        line = line.rstrip()
        
        # Lista (líneas que empiezan con -)
        if line.startswith('- '):
            if current_key:
                current_list.append(line[2:])
            continue
        elif line.startswith('-'):
            if current_key:
                current_list.append(line[1:].strip())
            continue
        
        # Si había una lista, guardarla
        if current_key and current_list:
            frontmatter[current_key] = current_list
            current_list = []
            current_key = None
        
        # Clave: valor
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()
            
            # Remover comillas de los valores
            if value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            elif value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            
            if value:
                frontmatter[key] = value
                current_key = None
            else:
                # Puede ser el inicio de una lista
                current_key = key
    
    # Guardar última lista si existe
    if current_key and current_list:
        frontmatter[current_key] = current_list
    
    return frontmatter, frontmatter_text, body


def extract_metadata_from_body(body):
    """Extrae metadata del cuerpo del documento."""
    metadata = {}
    lines = body.split('\n')
    
    for line in lines:
        # Fecha de creación
        match = re.match(r'Fecha de creación:\s*(.+)', line, re.IGNORECASE)
        if match:
            fecha_text = match.group(1).strip()
            # Intentar parsear la fecha
            try:
                # Formato: "15 de julio de 2025 15:44"
                meses = {
                    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
                    'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
                    'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
                }
                match_fecha = re.match(r'(\d+)\s+de\s+(\w+)\s+de\s+(\d+)', fecha_text)
                if match_fecha:
                    dia = int(match_fecha.group(1))
                    mes = meses.get(match_fecha.group(2).lower(), 1)
                    año = int(match_fecha.group(3))
                    metadata['fecha_creacion'] = f'{año:04d}-{mes:02d}-{dia:02d}'
            except:
                pass
        
        # Autor
        match = re.match(r'Autor\(a\):\s*(.+)', line, re.IGNORECASE)
        if match:
            metadata['autor'] = match.group(1).strip()
        
        # R2025
        if 'R2025:' in line:
            metadata['r2025'] = line.split('R2025:')[1].strip()
        
        # Idioma
        match = re.match(r'idioma:\s*(.+)', line, re.IGNORECASE)
        if match:
            metadata['idiomas'] = match.group(1).strip()
        
        # Tags
        match = re.match(r'Tags:\s*(.+)', line, re.IGNORECASE)
        if match:
            metadata['tags'] = match.group(1).strip()
    
    return metadata


def clean_body(body, title_from_frontmatter):
    """Limpia el cuerpo del documento eliminando metadata y títulos duplicados."""
    lines = body.split('\n')
    cleaned_lines = []
    skip_next_empty = False
    
    for i, line in enumerate(lines):
        # Eliminar título duplicado (primer H1 que coincida con el título del frontmatter)
        if line.startswith('# ') and i < 20:  # Solo en las primeras líneas
            h1_title = line[2:].strip()
            if h1_title == title_from_frontmatter:
                skip_next_empty = True
                continue
        
        # Eliminar líneas de metadata
        if any([
            re.match(r'Fecha de creación:', line, re.IGNORECASE),
            re.match(r'Autor\(a\):', line, re.IGNORECASE),
            re.match(r'R2025:', line, re.IGNORECASE),
            re.match(r'^idioma:', line, re.IGNORECASE),
            re.match(r'^Tags:', line, re.IGNORECASE),
        ]):
            skip_next_empty = True
            continue
        
        # Eliminar líneas vacías después de metadata eliminada
        if skip_next_empty and line.strip() == '':
            skip_next_empty = False
            continue
        
        cleaned_lines.append(line)
    
    # Unir líneas y limpiar espacios múltiples al inicio
    cleaned_body = '\n'.join(cleaned_lines)
    
    # Eliminar líneas vacías múltiples al inicio
    while cleaned_body.startswith('\n\n\n'):
        cleaned_body = cleaned_body[1:]
    
    return cleaned_body.strip()


def merge_metadata(frontmatter, body_metadata):
    """Combina metadata del frontmatter y del cuerpo, priorizando la metadata del cuerpo (Notion)."""
    # Autor: si existe en el cuerpo, usar esa (es la correcta de Notion)
    if 'autor' in body_metadata:
        frontmatter['autor'] = body_metadata['autor']
    
    # Fecha: si existe fecha de creación en el cuerpo, usar esa (es la correcta de Notion)
    # La fecha del cuerpo es más precisa que la fecha genérica del frontmatter
    if 'fecha_creacion' in body_metadata:
        frontmatter['fecha'] = body_metadata['fecha_creacion']
    
    return frontmatter


def frontmatter_to_yaml(frontmatter):
    """Convierte un diccionario de frontmatter a texto YAML."""
    lines = []
    for key, value in frontmatter.items():
        if isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"- {item}")
        else:
            # Agregar comillas simples si contiene caracteres especiales
            if any(c in str(value) for c in [':', '#', '-', '[', ']', '{', '}']) or str(value).strip() != str(value):
                lines.append(f"{key}: '{value}'")
            else:
                lines.append(f"{key}: {value}")
    return '\n'.join(lines)


def fix_markdown_file(filepath):
    """Procesa y corrige un archivo markdown."""
    print(f"Procesando: {filepath.name}")
    
    # Leer archivo
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parsear frontmatter y cuerpo
    frontmatter, original_fm_text, body = parse_frontmatter(content)
    
    if not frontmatter:
        print(f"  ⚠️  Sin frontmatter, saltando...")
        return False
    
    # Extraer metadata del cuerpo
    body_metadata = extract_metadata_from_body(body)
    
    # Combinar metadata
    original_frontmatter = frontmatter.copy()
    frontmatter = merge_metadata(frontmatter, body_metadata)
    
    # Limpiar cuerpo
    title = frontmatter.get('title', '')
    cleaned_body = clean_body(body, title)
    
    # Verificar si hubo cambios
    if frontmatter == original_frontmatter and cleaned_body == body.strip():
        print(f"  ✓ Sin cambios necesarios")
        return False
    
    # Construir nuevo contenido
    new_content = '---\n'
    new_content += frontmatter_to_yaml(frontmatter)
    new_content += '\n---\n\n'
    new_content += cleaned_body
    new_content += '\n'
    
    # Guardar archivo
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✓ Corregido")
    
    # Mostrar cambios
    if 'autor' in frontmatter and 'autor' not in original_frontmatter:
        print(f"    + Autor agregado: {frontmatter['autor']}")
    elif 'autor' in frontmatter and frontmatter.get('autor') != original_frontmatter.get('autor'):
        print(f"    ~ Autor actualizado: {frontmatter['autor']}")
    
    if 'fecha' in frontmatter and frontmatter.get('fecha') != original_frontmatter.get('fecha'):
        print(f"    ~ Fecha actualizada: {original_frontmatter.get('fecha', 'N/A')} → {frontmatter['fecha']}")
    
    return True


def main():
    """Procesa todos los archivos markdown en el directorio."""
    # Directorio de conceptorio
    conceptorio_dir = Path('/workspace/quartz/content/es/conceptorio')
    
    if not conceptorio_dir.exists():
        print(f"❌ No se encontró el directorio: {conceptorio_dir}")
        return
    
    print(f"🔍 Buscando archivos en: {conceptorio_dir}\n")
    
    # Buscar todos los archivos .md excepto index.md
    markdown_files = [f for f in conceptorio_dir.glob('*.md') if f.name != 'index.md']
    
    print(f"📝 Encontrados {len(markdown_files)} archivos\n")
    print("=" * 60)
    
    fixed_count = 0
    for filepath in sorted(markdown_files):
        if fix_markdown_file(filepath):
            fixed_count += 1
        print()
    
    print("=" * 60)
    print(f"\n✅ Proceso completado!")
    print(f"   📊 Archivos corregidos: {fixed_count}/{len(markdown_files)}")


if __name__ == '__main__':
    main()

