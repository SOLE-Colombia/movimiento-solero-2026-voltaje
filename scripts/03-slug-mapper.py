#!/usr/bin/env python3
"""
Script 03: Generación de Slugs
Genera slugs limpios y SEO-friendly desde los nombres de archivos/títulos.
Detecta y resuelve colisiones.
"""

import os
import json
import re
from pathlib import Path
from slugify import slugify
from collections import defaultdict

def extract_title_from_filename(filename):
    """Extrae el título limpio desde el nombre del archivo."""
    # Remover extensión
    name = Path(filename).stem
    
    # Remover IDs de Notion (UUID pattern)
    # Pattern: nombre ID_HASH
    name = re.sub(r'\s+[a-f0-9]{32}$', '', name)
    name = re.sub(r'\s+[a-f0-9]{8,}$', '', name)
    
    # Limpiar caracteres especiales de URL encoding
    name = name.replace('%20', ' ')
    name = re.sub(r'%[0-9A-Fa-f]{2}', '', name)
    
    return name.strip()

def extract_title_from_content(filepath):
    """Extrae el título desde el contenido del archivo markdown."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Buscar primer heading H1
            match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            if match:
                return match.group(1).strip()
    except:
        pass
    return None

def generate_slug_mapping(base_path):
    """Genera mapeo de rutas originales a slugs limpios."""
    slug_mapping = {
        "generated_at": "",
        "total_files": 0,
        "mappings": {},
        "collisions": {},
        "slug_counts": defaultdict(int)
    }
    
    base_path = Path(base_path)
    print(f"🏷️  Generando slugs para archivos en: {base_path}")
    print("=" * 70)
    
    # Recopilar todos los archivos markdown
    md_files = list(base_path.rglob("*.md"))
    slug_mapping["total_files"] = len(md_files)
    
    # Primera pasada: generar slugs base
    slug_to_files = defaultdict(list)
    
    for md_file in md_files:
        relative_path = str(md_file.relative_to(base_path))
        
        # Intentar extraer título del contenido primero
        title = extract_title_from_content(md_file)
        
        # Si no hay título en contenido, usar nombre de archivo
        if not title:
            title = extract_title_from_filename(md_file.name)
        
        # Generar slug
        slug = slugify(title, max_length=100)
        
        # Si el slug está vacío, usar un slug genérico
        if not slug:
            slug = slugify(md_file.stem, max_length=100)
        
        # Almacenar temporalmente
        slug_to_files[slug].append({
            "original_path": relative_path,
            "title": title,
            "file": md_file
        })
    
    # Segunda pasada: resolver colisiones
    for slug, files in slug_to_files.items():
        if len(files) == 1:
            # No hay colisión
            file_info = files[0]
            slug_mapping["mappings"][file_info["original_path"]] = {
                "slug": slug,
                "title": file_info["title"],
                "clean_url": f"/{slug}"
            }
            slug_mapping["slug_counts"][slug] = 1
        else:
            # Hay colisión, agregar sufijos
            slug_mapping["collisions"][slug] = []
            for idx, file_info in enumerate(files):
                # Agregar parte del path para diferenciar
                parent_dir = Path(file_info["original_path"]).parent.name
                parent_slug = slugify(extract_title_from_filename(parent_dir))
                
                if parent_slug and parent_slug != slug:
                    unique_slug = f"{slug}-{parent_slug}"
                else:
                    unique_slug = f"{slug}-{idx + 1}"
                
                slug_mapping["mappings"][file_info["original_path"]] = {
                    "slug": unique_slug,
                    "title": file_info["title"],
                    "clean_url": f"/{unique_slug}",
                    "collision_resolved": True,
                    "original_slug": slug
                }
                slug_mapping["collisions"][slug].append(file_info["original_path"])
                slug_mapping["slug_counts"][unique_slug] = 1
            
            print(f"⚠️  Colisión resuelta para '{slug}': {len(files)} archivos")
    
    print(f"\n✓ Slugs generados para {len(slug_mapping['mappings'])} archivos")
    
    return slug_mapping

def generate_section_mappings():
    """Define mapeos de nombres de secciones en español e inglés."""
    return {
        "¿Nuevo aquí": {"es": "nuevo-aqui", "en": "new-here"},
        "New here": {"es": "nuevo-aqui", "en": "new-here"},
        "Inspírate": {"es": "inspirate", "en": "inspire"},
        "Soluciona": {"es": "soluciona", "en": "solve"},
        "Pregunta Comenta": {"es": "pregunta-comenta", "en": "question-comment"},
        "Pregunta/Comenta": {"es": "pregunta-comenta", "en": "question-comment"},
        "¿Desconectado": {"es": "desconectado", "en": "offline"},
        "Desconectado": {"es": "desconectado", "en": "offline"},
        "Conceptorio": {"es": "conceptorio", "en": "glossary"},
        "Inspiration DB": {"es": "inspirate", "en": "inspire"},
        "Solutions DB": {"es": "soluciona", "en": "solve"},
        "Comunidades conectadas": {"es": "comunidades-conectadas", "en": "connected-communities"},
        "Voltaje desconectado": {"es": "voltaje-desconectado", "en": "offline-voltage"}
    }

def print_slug_summary(mapping):
    """Imprime resumen de la generación de slugs."""
    print("\n" + "=" * 70)
    print("🏷️  RESUMEN DE SLUGS GENERADOS")
    print("=" * 70)
    print(f"📄 Total de archivos:      {mapping['total_files']}")
    print(f"✓  Slugs generados:        {len(mapping['mappings'])}")
    print(f"⚠️  Colisiones detectadas: {len(mapping['collisions'])}")
    
    if mapping['collisions']:
        print(f"\n🔍 Colisiones resueltas:")
        for slug, files in list(mapping['collisions'].items())[:5]:
            print(f"   '{slug}': {len(files)} archivos")
        if len(mapping['collisions']) > 5:
            print(f"   ... y {len(mapping['collisions']) - 5} más")
    
    print("=" * 70)

def main():
    base_path = Path("Privado y Compartido")
    output_dir = Path("reports")
    output_file = output_dir / "slug-mapping.json"
    
    # Crear directorio de reportes si no existe
    output_dir.mkdir(exist_ok=True)
    
    print("\n🚀 Iniciando generación de slugs...")
    
    # Generar slugs
    mapping = generate_slug_mapping(base_path)
    
    # Agregar mapeos de secciones
    mapping["section_mappings"] = generate_section_mappings()
    
    # Agregar timestamp
    from datetime import datetime
    mapping["generated_at"] = datetime.now().isoformat()
    
    # Convertir defaultdict a dict normal
    mapping["slug_counts"] = dict(mapping["slug_counts"])
    
    # Guardar mapeo
    print(f"\n💾 Guardando mapeo en {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    
    # Mostrar resumen
    print_slug_summary(mapping)
    print(f"\n✅ Mapeo de slugs guardado en: {output_file}\n")

if __name__ == "__main__":
    main()

