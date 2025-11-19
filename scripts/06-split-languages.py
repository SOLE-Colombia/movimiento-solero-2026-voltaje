#!/usr/bin/env python3
"""
Script 06: Separación Bilingüe
Organiza contenido en carpetas /es/ y /en/ según el idioma detectado.
"""

import os
import re
import yaml
import json
from pathlib import Path
from slugify import slugify
from collections import defaultdict

def load_frontmatter(filepath):
    """Extrae frontmatter de un archivo markdown."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if not content.startswith('---'):
            return None, content
        
        # Extraer frontmatter
        parts = content.split('---', 2)
        if len(parts) < 3:
            return None, content
        
        frontmatter = yaml.safe_load(parts[1])
        body = parts[2].strip()
        
        return frontmatter, body
    except Exception as e:
        print(f"✗ Error leyendo {filepath}: {e}")
        return None, None

def determine_target_section(filepath, frontmatter):
    """Determina la sección de destino basándose en el path y frontmatter."""
    path_str = str(filepath).lower()
    
    # Mapeo de secciones
    section_map = {
        "nuevo aquí": "nuevo-aqui",
        "new here": "new-here",
        "inspírate": "inspirate",
        "inspiration": "inspirate",
        "soluciona": "soluciona",
        "solution": "soluciona",
        "pregunta": "pregunta-comenta",
        "comment": "pregunta-comenta",
        "desconectado": "desconectado",
        "offline": "desconectado",
        "conceptorio": "conceptorio",
        "glossary": "conceptorio"
    }
    
    for key, value in section_map.items():
        if key in path_str:
            return value
    
    # Si tiene categorías en frontmatter, inferir de ahí
    if frontmatter and 'categories' in frontmatter:
        categories = frontmatter['categories']
        if isinstance(categories, list):
            categories_str = " ".join(categories).lower()
            if 'metodología' in categories_str or 'pregunta' in categories_str:
                return 'inspirate'
            if 'soluciones' in categories_str or 'solution' in categories_str:
                return 'soluciona'
    
    # Default
    return 'general'

def get_target_section_name(section, lang):
    """Obtiene el nombre de sección en el idioma apropiado."""
    section_names = {
        "nuevo-aqui": {"es": "nuevo-aqui", "en": "new-here"},
        "new-here": {"es": "nuevo-aqui", "en": "new-here"},
        "inspirate": {"es": "inspirate", "en": "inspire"},
        "soluciona": {"es": "soluciona", "en": "solve"},
        "pregunta-comenta": {"es": "pregunta-comenta", "en": "question-comment"},
        "desconectado": {"es": "desconectado", "en": "offline"},
        "conceptorio": {"es": "conceptorio", "en": "glossary"},
        "general": {"es": "general", "en": "general"}
    }
    
    if section in section_names:
        return section_names[section].get(lang, section)
    
    return section

def create_index_file(directory, section_name, lang):
    """Crea archivo _index.md para una sección."""
    titles = {
        "nuevo-aqui": {"es": "¿Nuevo aquí?", "en": "New here?"},
        "new-here": {"es": "¿Nuevo aquí?", "en": "New here?"},
        "inspirate": {"es": "Inspírate", "en": "Get Inspired"},
        "inspire": {"es": "Inspírate", "en": "Get Inspired"},
        "soluciona": {"es": "Soluciona", "en": "Find Solutions"},
        "solve": {"es": "Soluciona", "en": "Find Solutions"},
        "pregunta-comenta": {"es": "Pregunta/Comenta", "en": "Questions/Comments"},
        "question-comment": {"es": "Pregunta/Comenta", "en": "Questions/Comments"},
        "desconectado": {"es": "Desconectado", "en": "Offline"},
        "offline": {"es": "Desconectado", "en": "Offline"},
        "conceptorio": {"es": "Conceptorio", "en": "Glossary"},
        "glossary": {"es": "Conceptorio", "en": "Glossary"},
        "general": {"es": "General", "en": "General"}
    }
    
    descriptions = {
        "nuevo-aqui": {
            "es": "Bienvenido a SOLE Voltaje. Empieza aquí tu viaje.",
            "en": "Welcome to SOLE Voltaje. Start your journey here."
        },
        "inspirate": {
            "es": "Explora historias, preguntas provocadoras y aprende de comunidades.",
            "en": "Explore stories, thought-provoking questions and learn from communities."
        },
        "soluciona": {
            "es": "Encuentra soluciones para mejorar la conectividad en tu comunidad.",
            "en": "Find solutions to improve connectivity in your community."
        },
        "pregunta-comenta": {
            "es": "Comparte tus preguntas y comentarios con la comunidad.",
            "en": "Share your questions and comments with the community."
        },
        "desconectado": {
            "es": "Aprende sobre Internet sin estar conectado.",
            "en": "Learn about the Internet while offline."
        },
        "conceptorio": {
            "es": "Glosario de términos técnicos y conceptos clave.",
            "en": "Glossary of technical terms and key concepts."
        }
    }
    
    title = titles.get(section_name, {}).get(lang, section_name.title())
    description = descriptions.get(section_name, {}).get(lang, "")
    
    frontmatter = {
        "title": title,
        "lang": lang,
        "type": "section-index",
        "description": description
    }
    
    yaml_fm = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
    content = f"---\n{yaml_fm}---\n\n# {title}\n\n{description}\n"
    
    index_path = directory / "index.md"
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)

def find_translation_pair(filepath, all_files, frontmatter):
    """Busca el archivo de traducción correspondiente."""
    # Por ahora retornamos None, se puede mejorar con lógica más sofisticada
    # basándose en nombres similares o IDs de Notion
    return None

def split_by_language(input_dir, output_dir):
    """Separa archivos por idioma en /es/ y /en/."""
    input_dir = Path(input_dir)
    output_dir = Path(output_dir)
    
    print(f"🌐 Separando contenido por idioma...")
    print(f"   Origen: {input_dir}")
    print(f"   Destino: {output_dir}")
    print("=" * 70)
    
    md_files = list(input_dir.rglob("*.md"))
    total = len(md_files)
    processed = 0
    errors = 0
    
    stats = {
        "es": defaultdict(int),
        "en": defaultdict(int)
    }
    
    sections_created = set()
    
    for md_file in md_files:
        frontmatter, body = load_frontmatter(md_file)
        
        if body is None:
            errors += 1
            continue
        
        # Determinar idioma
        lang = frontmatter.get('lang', 'es') if frontmatter else 'es'
        
        # Determinar sección
        section = determine_target_section(md_file, frontmatter)
        target_section = get_target_section_name(section, lang)
        
        # Construir path de destino
        slug = frontmatter.get('slug', slugify(md_file.stem)) if frontmatter else slugify(md_file.stem)
        
        # Estructura: content/es/seccion/archivo.md
        target_dir = output_dir / lang / target_section
        target_file = target_dir / f"{slug}.md"
        
        # Crear directorio
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # Crear archivo índice si no existe
        section_key = f"{lang}/{target_section}"
        if section_key not in sections_created:
            create_index_file(target_dir, target_section, lang)
            sections_created.add(section_key)
        
        # Guardar archivo
        try:
            # Reconstruir contenido con frontmatter
            if frontmatter:
                yaml_fm = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
                full_content = f"---\n{yaml_fm}---\n\n{body}"
            else:
                full_content = body
            
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(full_content)
            
            processed += 1
            stats[lang][target_section] += 1
            
            if processed % 50 == 0:
                print(f"✓ Procesados: {processed}/{total}")
        
        except Exception as e:
            print(f"✗ Error guardando {target_file}: {e}")
            errors += 1
    
    return {"total": total, "processed": processed, "errors": errors, "stats": stats}

def create_main_index_files(output_dir):
    """Crea archivos index principales para /es/ y /en/."""
    output_dir = Path(output_dir)
    
    # Index español
    es_frontmatter = {
        "title": "SOLE Voltaje",
        "lang": "es",
        "type": "home",
        "description": "Explora, aprende y soluciona problemas de conectividad"
    }
    
    es_content = """# SOLE Voltaje

## ¿Tienes problemas para conectarte a Internet?

**SOLE Voltaje** te invita a "cacharrear", a sentir curiosidad por el Internet y su funcionamiento 
y a extender su alcance para que usemos el Internet en grupo y así, ¡cambiar el mundo juntos!

### Explora

- [¿Nuevo aquí?](nuevo-aqui/) - Empieza tu viaje
- [Inspírate](inspirate/) - Historias y preguntas provocadoras
- [Soluciona](soluciona/) - Encuentra soluciones de conectividad
- [Desconectado](desconectado/) - Aprende sin conexión
- [Conceptorio](conceptorio/) - Glosario de términos

---

*SOLE Voltaje es un proyecto de [SOLE Colombia](https://www.solecolombia.org/) 
apoyado por [Internet Society Foundation](https://www.isocfoundation.org/)*

*Licencia: [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)*
"""
    
    es_file = output_dir / "es" / "index.md"
    es_file.parent.mkdir(parents=True, exist_ok=True)
    with open(es_file, 'w', encoding='utf-8') as f:
        yaml_fm = yaml.dump(es_frontmatter, allow_unicode=True, sort_keys=False)
        f.write(f"---\n{yaml_fm}---\n\n{es_content}")
    
    # Index inglés
    en_frontmatter = {
        "title": "SOLE Voltaje",
        "lang": "en",
        "type": "home",
        "description": "Explore, learn and solve connectivity problems"
    }
    
    en_content = """# SOLE Voltaje

## Having trouble connecting to the Internet?

**SOLE Voltaje** invites you to "tinker," to be curious about the Internet and how it works, 
and to extend its reach so we can use the Internet in groups and thus change the world together!

### Explore

- [New here?](new-here/) - Start your journey
- [Get Inspired](inspire/) - Stories and thought-provoking questions
- [Find Solutions](solve/) - Discover connectivity solutions
- [Offline](offline/) - Learn without connection
- [Glossary](glossary/) - Technical terms

---

*SOLE Voltaje is a project by [SOLE Colombia](https://www.solecolombia.org/) 
supported by [Internet Society Foundation](https://www.isocfoundation.org/)*

*License: [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)*
"""
    
    en_file = output_dir / "en" / "index.md"
    en_file.parent.mkdir(parents=True, exist_ok=True)
    with open(en_file, 'w', encoding='utf-8') as f:
        yaml_fm = yaml.dump(en_frontmatter, allow_unicode=True, sort_keys=False)
        f.write(f"---\n{yaml_fm}---\n\n{en_content}")

def main():
    input_dir = Path("temp/with-frontmatter")
    output_dir = Path("content")
    
    if not input_dir.exists():
        print("❌ Error: Debes ejecutar 05-generate-frontmatter.py primero")
        return
    
    print("\n🚀 Iniciando separación por idioma...")
    
    # Separar archivos
    stats = split_by_language(input_dir, output_dir)
    
    # Crear archivos index principales
    print("\n📝 Creando archivos index principales...")
    create_main_index_files(output_dir)
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("🌐 RESUMEN DE SEPARACIÓN")
    print("=" * 70)
    print(f"📄 Total de archivos:    {stats['total']}")
    print(f"✓  Procesados:           {stats['processed']}")
    print(f"✗  Errores:              {stats['errors']}")
    print(f"\n📊 Distribución por idioma:")
    for lang in ['es', 'en']:
        total_lang = sum(stats['stats'][lang].values())
        print(f"\n   {lang.upper()}: {total_lang} archivos")
        for section, count in sorted(stats['stats'][lang].items()):
            print(f"      {section}: {count}")
    print("=" * 70)
    print(f"\n✅ Contenido separado guardado en: {output_dir}\n")

if __name__ == "__main__":
    main()

