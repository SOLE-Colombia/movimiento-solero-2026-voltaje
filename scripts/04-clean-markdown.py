#!/usr/bin/env python3
"""
Script 04: Limpieza de Markdown
Limpia sintaxis específica de Notion y enlaces codificados.
"""

import os
import re
import json
import shutil
from pathlib import Path
from urllib.parse import unquote

def clean_notion_syntax(content):
    """Elimina sintaxis específica de Notion."""
    # Eliminar <aside> tags pero mantener contenido
    content = re.sub(r'<aside>\s*\n*', '\n', content)
    content = re.sub(r'\s*\n*</aside>', '\n', content)
    
    # Limpiar emojis standalone en aside (💡, etc)
    content = re.sub(r'^[🔥💡⚡🎯📝✨🚀]+\s*\n\s*\n', '', content, flags=re.MULTILINE)
    
    # Limpiar múltiples líneas en blanco
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content

def decode_url_links(content):
    """Decodifica enlaces con caracteres URL-encoded."""
    def decode_link(match):
        text = match.group(1)
        url = match.group(2)
        decoded_url = unquote(url)
        return f"[{text}]({decoded_url})"
    
    # Decodificar enlaces [texto](url)
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', decode_link, content)
    
    return content

def update_internal_links(content, slug_mapping, current_file_path):
    """Actualiza enlaces internos usando el mapeo de slugs."""
    def replace_link(match):
        text = match.group(1)
        link = match.group(2)
        
        # Si es un enlace externo, dejarlo como está
        if link.startswith('http://') or link.startswith('https://'):
            return match.group(0)
        
        # Decodificar el enlace
        decoded_link = unquote(link)
        
        # Construir ruta relativa desde el archivo actual
        try:
            current_dir = Path(current_file_path).parent
            target_path = (current_dir / decoded_link).resolve()
            
            # Buscar en el mapeo de slugs
            for original_path, slug_info in slug_mapping.items():
                original_full = Path("Privado y Compartido") / original_path
                if original_full.resolve() == target_path:
                    # Usar el slug nuevo
                    return f"[{text}]({slug_info['clean_url']})"
        except:
            pass
        
        # Si no se encuentra mapeo, dejar el link decodificado
        return f"[{text}]({decoded_link})"
    
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replace_link, content)
    
    return content

def extract_metadata_from_path(filepath):
    """Extrae metadata del path y nombre del archivo."""
    metadata = {
        "section": None,
        "subsection": None,
        "notion_id": None
    }
    
    parts = Path(filepath).parts
    
    # Identificar sección principal
    section_indicators = {
        "Nuevo aquí": "nuevo-aqui",
        "New here": "new-here",
        "Inspírate": "inspirate",
        "Inspiration DB": "inspirate",
        "Soluciona": "soluciona",
        "Solutions DB": "soluciona",
        "Pregunta": "pregunta-comenta",
        "Desconectado": "desconectado",
        "Conceptorio": "conceptorio"
    }
    
    for part in parts:
        for indicator, section in section_indicators.items():
            if indicator in part:
                metadata["section"] = section
                break
    
    # Extraer ID de Notion del nombre de archivo
    filename = Path(filepath).stem
    id_match = re.search(r'([a-f0-9]{32})$', filename)
    if id_match:
        metadata["notion_id"] = id_match.group(1)
    
    return metadata

def clean_markdown_file(input_path, output_path, slug_mapping):
    """Limpia un archivo markdown individual."""
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Aplicar limpiezas
        content = clean_notion_syntax(content)
        content = decode_url_links(content)
        content = update_internal_links(content, slug_mapping["mappings"], input_path)
        
        # Crear directorio de salida si no existe
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Guardar archivo limpio
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"✗ Error limpiando {input_path}: {e}")
        return False

def clean_all_markdown(base_path, output_dir, slug_mapping):
    """Limpia todos los archivos markdown."""
    base_path = Path(base_path)
    output_dir = Path(output_dir)
    
    print(f"🧹 Limpiando archivos markdown...")
    print(f"   Origen: {base_path}")
    print(f"   Destino: {output_dir}")
    print("=" * 70)
    
    md_files = list(base_path.rglob("*.md"))
    total = len(md_files)
    processed = 0
    errors = 0
    
    for md_file in md_files:
        relative_path = md_file.relative_to(base_path)
        output_path = output_dir / relative_path
        
        if clean_markdown_file(md_file, output_path, slug_mapping):
            processed += 1
            if processed % 50 == 0:
                print(f"✓ Procesados: {processed}/{total}")
        else:
            errors += 1
    
    return {"total": total, "processed": processed, "errors": errors}

def main():
    base_path = Path("Privado y Compartido")
    output_dir = Path("temp/cleaned")
    slug_mapping_file = Path("reports/slug-mapping.json")
    
    # Cargar mapeo de slugs
    if not slug_mapping_file.exists():
        print("❌ Error: Debes ejecutar 03-slug-mapper.py primero")
        return
    
    with open(slug_mapping_file, 'r', encoding='utf-8') as f:
        slug_mapping = json.load(f)
    
    print("\n🚀 Iniciando limpieza de archivos markdown...")
    
    # Limpiar archivos
    stats = clean_all_markdown(base_path, output_dir, slug_mapping)
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("🧹 RESUMEN DE LIMPIEZA")
    print("=" * 70)
    print(f"📄 Total de archivos:    {stats['total']}")
    print(f"✓  Procesados:           {stats['processed']}")
    print(f"✗  Errores:              {stats['errors']}")
    print("=" * 70)
    print(f"\n✅ Archivos limpios guardados en: {output_dir}\n")

if __name__ == "__main__":
    main()

