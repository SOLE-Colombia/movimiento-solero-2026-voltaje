#!/usr/bin/env python3
"""
Script 05: Generación de Frontmatter
Agrega frontmatter YAML estructurado a cada archivo markdown.
"""

import os
import re
import csv
import json
import yaml
from pathlib import Path
from datetime import datetime
from slugify import slugify

def load_csv_metadata(base_path):
    """Carga metadata de todos los CSVs en un diccionario indexado por ID."""
    metadata_by_id = {}
    metadata_by_name = {}
    
    base_path = Path(base_path)
    csv_files = list(base_path.rglob("*.csv"))
    
    for csv_file in csv_files:
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    # Indexar por ID si existe
                    if 'id' in row and row['id']:
                        metadata_by_id[row['id']] = row
                    
                    # Indexar por Name si existe
                    if 'Name' in row and row['Name']:
                        metadata_by_name[row['Name'].strip()] = row
        except:
            pass
    
    return metadata_by_id, metadata_by_name

def detect_language(content, filepath):
    """Detecta el idioma del contenido."""
    # Revisar nombre de archivo/path
    path_str = str(filepath).lower()
    if 'new here' in path_str or '/en/' in path_str:
        return 'en'
    
    # Palabras clave en español
    spanish_keywords = ['español', 'aquí', 'qué', 'cómo', 'también', 'más']
    english_keywords = ['english', 'here', 'what', 'how', 'also', 'more']
    
    content_lower = content.lower()
    spanish_count = sum(1 for kw in spanish_keywords if kw in content_lower)
    english_count = sum(1 for kw in english_keywords if kw in content_lower)
    
    return 'en' if english_count > spanish_count else 'es'

def infer_aspectos(tags, content):
    """Infiere aspectos basándose en tags y contenido."""
    aspectos = []
    
    # Palabras clave por aspecto
    aspecto_keywords = {
        "señal": ["internet", "señal", "wifi", "conectividad", "antena", "3g", "4g", 
                  "móvil", "satelital", "cobertura", "ancho de banda", "router"],
        "electricidad": ["electricidad", "energía", "solar", "batería", "panel", 
                         "voltaje", "corriente", "generador", "luz"],
        "dispositivos": ["computador", "dispositivo", "router", "tablet", "teléfono",
                        "laptop", "equipo", "hardware", "cable", "modem", "computer"],
        "personas": ["comunidad", "metodología", "aprendizaje", "educación", "sole",
                    "grupo", "colaboración", "taller", "capacitación", "pregunta",
                    "community", "learning", "question"],
        "espacio": ["escuela", "lab", "biblioteca", "espacio", "lugar", "sala",
                   "centro", "sede", "territorio", "rural", "school"]
    }
    
    search_text = (tags + " " + content).lower()
    
    for aspecto, keywords in aspecto_keywords.items():
        if any(kw in search_text for kw in keywords):
            aspectos.append(aspecto)
    
    return aspectos if aspectos else ["general"]

def extract_title(content, filepath):
    """Extrae el título del contenido o del nombre de archivo."""
    # Buscar primer H1
    match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    
    # Usar nombre de archivo limpio
    filename = Path(filepath).stem
    filename = re.sub(r'\s+[a-f0-9]{32}$', '', filename)
    filename = re.sub(r'\s+[a-f0-9]{8,}$', '', filename)
    return filename.strip()

def parse_tags(tags_str):
    """Parsea string de tags a lista."""
    if not tags_str:
        return []
    return [t.strip() for t in tags_str.split(',') if t.strip()]

def generate_frontmatter(filepath, content, slug_mapping, csv_metadata_by_id, csv_metadata_by_name):
    """Genera frontmatter para un archivo."""
    # Datos básicos
    title = extract_title(content, filepath)
    lang = detect_language(content, filepath)
    
    # Buscar en mapeo de slugs
    relative_path = str(Path(filepath).relative_to("temp/cleaned"))
    slug_info = slug_mapping["mappings"].get(relative_path, {})
    slug = slug_info.get("slug", slugify(title))
    
    # Buscar metadata en CSVs
    csv_data = None
    
    # Intentar por ID de Notion en el nombre
    filename = Path(filepath).stem
    id_match = re.search(r'([a-f0-9]{32})$', filename)
    if id_match:
        notion_id = id_match.group(1)
        csv_data = csv_metadata_by_id.get(notion_id)
    
    # Intentar por título
    if not csv_data:
        csv_data = csv_metadata_by_name.get(title)
    
    # Construir frontmatter
    frontmatter = {
        "title": title,
        "lang": lang,
        "slug": slug,
    }
    
    # Agregar metadata de CSV si existe
    if csv_data:
        # Tags/Categorías
        if csv_data.get('Tags'):
            frontmatter["categories"] = parse_tags(csv_data['Tags'])
        
        # Formato
        if csv_data.get('Formato'):
            frontmatter["formato"] = parse_tags(csv_data['Formato'])
        
        # Fecha
        if csv_data.get('Created Date'):
            frontmatter["fecha"] = csv_data['Created Date']
        
        # Estado
        if csv_data.get('R2025') == 'revisado':
            frontmatter["draft"] = False
        elif csv_data.get('R2025') == 'a descartar':
            frontmatter["draft"] = True
        
        # Traducción disponible
        if csv_data.get('traducción'):
            frontmatter["traduccion"] = csv_data['traducción'].lower() in ['yes', 'true', 'si', 'sí']
    
    # Inferir aspectos
    tags_str = " ".join(frontmatter.get("categories", []))
    aspectos = infer_aspectos(tags_str, content[:1000])  # Primeros 1000 chars
    if aspectos:
        frontmatter["aspectos"] = aspectos
    
    # Fecha de creación si no existe
    if "fecha" not in frontmatter:
        frontmatter["fecha"] = datetime.now().strftime("%Y-%m-%d")
    
    return frontmatter

def add_frontmatter_to_file(input_path, output_path, slug_mapping, csv_metadata):
    """Agrega frontmatter a un archivo markdown."""
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar si ya tiene frontmatter
        if content.startswith('---'):
            # Ya tiene frontmatter, skip
            output_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(input_path, output_path)
            return True
        
        # Generar frontmatter
        csv_metadata_by_id, csv_metadata_by_name = csv_metadata
        frontmatter = generate_frontmatter(input_path, content, slug_mapping, 
                                          csv_metadata_by_id, csv_metadata_by_name)
        
        # Crear contenido con frontmatter
        yaml_frontmatter = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
        new_content = f"---\n{yaml_frontmatter}---\n\n{content}"
        
        # Guardar
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True
    except Exception as e:
        print(f"✗ Error en {input_path}: {e}")
        return False

def process_all_files(input_dir, output_dir, slug_mapping, csv_metadata):
    """Procesa todos los archivos markdown."""
    input_dir = Path(input_dir)
    output_dir = Path(output_dir)
    
    print(f"📝 Agregando frontmatter a archivos...")
    print(f"   Origen: {input_dir}")
    print(f"   Destino: {output_dir}")
    print("=" * 70)
    
    md_files = list(input_dir.rglob("*.md"))
    total = len(md_files)
    processed = 0
    errors = 0
    
    for md_file in md_files:
        relative_path = md_file.relative_to(input_dir)
        output_path = output_dir / relative_path
        
        if add_frontmatter_to_file(md_file, output_path, slug_mapping, csv_metadata):
            processed += 1
            if processed % 50 == 0:
                print(f"✓ Procesados: {processed}/{total}")
        else:
            errors += 1
    
    return {"total": total, "processed": processed, "errors": errors}

import shutil

def main():
    input_dir = Path("temp/cleaned")
    output_dir = Path("temp/with-frontmatter")
    slug_mapping_file = Path("reports/slug-mapping.json")
    
    # Verificar archivos necesarios
    if not input_dir.exists():
        print("❌ Error: Debes ejecutar 04-clean-markdown.py primero")
        return
    
    if not slug_mapping_file.exists():
        print("❌ Error: No se encuentra slug-mapping.json")
        return
    
    # Cargar datos
    print("📂 Cargando datos...")
    with open(slug_mapping_file, 'r', encoding='utf-8') as f:
        slug_mapping = json.load(f)
    
    csv_metadata = load_csv_metadata(Path("Privado y Compartido"))
    print(f"   ✓ Metadata CSV cargada: {len(csv_metadata[0])} por ID, {len(csv_metadata[1])} por nombre")
    
    print("\n🚀 Iniciando generación de frontmatter...")
    
    # Procesar archivos
    stats = process_all_files(input_dir, output_dir, slug_mapping, csv_metadata)
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("📝 RESUMEN DE FRONTMATTER")
    print("=" * 70)
    print(f"📄 Total de archivos:    {stats['total']}")
    print(f"✓  Procesados:           {stats['processed']}")
    print(f"✗  Errores:              {stats['errors']}")
    print("=" * 70)
    print(f"\n✅ Archivos con frontmatter guardados en: {output_dir}\n")

if __name__ == "__main__":
    main()

