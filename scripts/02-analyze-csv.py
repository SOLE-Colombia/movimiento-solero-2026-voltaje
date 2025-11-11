#!/usr/bin/env python3
"""
Script 02: Análisis de CSVs
Analiza todos los archivos CSV de Notion y extrae metadata para definir el esquema.
"""

import os
import csv
import json
from pathlib import Path
from collections import defaultdict, Counter

def analyze_csv_files(base_path):
    """Analiza todos los CSV y extrae metadata única."""
    metadata_schema = {
        "analyzed_at": "",
        "total_csv_files": 0,
        "unique_columns": set(),
        "column_analysis": {},
        "tags": set(),
        "languages": set(),
        "formats": set(),
        "categories": set(),
        "aspectos_sugeridos": {
            "señal": [],
            "electricidad": [],
            "dispositivos": [],
            "personas": [],
            "espacio": []
        },
        "csv_by_type": {}
    }
    
    base_path = Path(base_path)
    print(f"📊 Analizando archivos CSV en: {base_path}")
    print("=" * 70)
    
    csv_files = list(base_path.rglob("*.csv"))
    metadata_schema["total_csv_files"] = len(csv_files)
    
    for csv_file in csv_files:
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
                
                if not rows:
                    continue
                
                # Analizar columnas
                columns = reader.fieldnames
                metadata_schema["unique_columns"].update(columns)
                
                # Analizar contenido de cada columna
                for column in columns:
                    if column not in metadata_schema["column_analysis"]:
                        metadata_schema["column_analysis"][column] = {
                            "count": 0,
                            "unique_values": set(),
                            "sample_values": []
                        }
                    
                    for row in rows:
                        value = row.get(column, "").strip()
                        if value:
                            metadata_schema["column_analysis"][column]["count"] += 1
                            metadata_schema["column_analysis"][column]["unique_values"].add(value)
                            
                            # Guardar muestras (máximo 5)
                            if len(metadata_schema["column_analysis"][column]["sample_values"]) < 5:
                                if value not in metadata_schema["column_analysis"][column]["sample_values"]:
                                    metadata_schema["column_analysis"][column]["sample_values"].append(value)
                
                # Extraer metadata específica
                for row in rows:
                    # Tags/Categorías
                    if 'Tags' in row and row['Tags']:
                        tags = [t.strip() for t in row['Tags'].split(',')]
                        metadata_schema["tags"].update(tags)
                        metadata_schema["categories"].update(tags)
                    
                    # Idioma
                    if 'idioma' in row and row['idioma']:
                        metadata_schema["languages"].add(row['idioma'].strip())
                    
                    # Formato
                    if 'Formato' in row and row['Formato']:
                        formats = [f.strip() for f in row['Formato'].split(',')]
                        metadata_schema["formats"].update(formats)
                    
                    # Clasificar por tipo de CSV
                    csv_name = csv_file.stem
                    if csv_name not in metadata_schema["csv_by_type"]:
                        metadata_schema["csv_by_type"][csv_name] = {
                            "path": str(csv_file.relative_to(base_path)),
                            "row_count": 0,
                            "columns": columns
                        }
                    metadata_schema["csv_by_type"][csv_name]["row_count"] += 1
                
                print(f"✓ Procesado: {csv_file.name} ({len(rows)} filas)")
                
        except Exception as e:
            print(f"✗ Error en {csv_file.name}: {e}")
    
    return metadata_schema

def infer_aspectos(metadata):
    """Infiere los 5 aspectos principales basándose en tags y categorías."""
    tags = list(metadata["tags"])
    
    # Palabras clave para cada aspecto
    aspectos_keywords = {
        "señal": ["internet", "señal", "wifi", "conectividad", "antena", "3g", "4g", 
                  "móvil", "satelital", "cobertura", "ancho de banda"],
        "electricidad": ["electricidad", "energía", "solar", "batería", "panel", 
                         "voltaje", "corriente", "generador"],
        "dispositivos": ["computador", "dispositivo", "router", "tablet", "teléfono",
                        "laptop", "equipo", "hardware", "cable", "modem"],
        "personas": ["comunidad", "metodología", "aprendizaje", "educación", "sole",
                    "grupo", "colaboración", "taller", "capacitación", "pregunta"],
        "espacio": ["escuela", "lab", "biblioteca", "espacio", "lugar", "sala",
                   "centro", "sede", "territorio", "rural"]
    }
    
    aspectos = defaultdict(list)
    
    for tag in tags:
        tag_lower = tag.lower()
        for aspecto, keywords in aspectos_keywords.items():
            for keyword in keywords:
                if keyword in tag_lower:
                    aspectos[aspecto].append(tag)
                    break
    
    return dict(aspectos)

def convert_sets_to_lists(obj):
    """Convierte sets a listas para serialización JSON."""
    if isinstance(obj, dict):
        return {k: convert_sets_to_lists(v) for k, v in obj.items()}
    elif isinstance(obj, set):
        return sorted(list(obj))
    elif isinstance(obj, list):
        return [convert_sets_to_lists(item) for item in obj]
    return obj

def print_schema_summary(schema):
    """Imprime resumen del esquema de metadata."""
    print("\n" + "=" * 70)
    print("📋 ESQUEMA DE METADATA EXTRAÍDO")
    print("=" * 70)
    print(f"📊 Total CSVs analizados: {schema['total_csv_files']}")
    print(f"📝 Columnas únicas: {len(schema['unique_columns'])}")
    print(f"   - {', '.join(sorted(schema['unique_columns']))}")
    print(f"\n🏷️  Tags únicos: {len(schema['tags'])}")
    print(f"🌐 Idiomas: {', '.join(sorted(schema['languages']))}")
    print(f"📄 Formatos: {', '.join(sorted(schema['formats']))}")
    
    print(f"\n🎯 ASPECTOS IDENTIFICADOS:")
    for aspecto, tags in schema["aspectos_sugeridos"].items():
        print(f"   {aspecto}: {len(tags)} tags")
    print("=" * 70)

def main():
    base_path = Path("Privado y Compartido")
    output_dir = Path("reports")
    output_file = output_dir / "metadata-schema.json"
    
    # Crear directorio de reportes si no existe
    output_dir.mkdir(exist_ok=True)
    
    print("\n🚀 Iniciando análisis de CSVs...")
    
    # Analizar CSVs
    schema = analyze_csv_files(base_path)
    
    # Inferir aspectos
    print(f"\n🔍 Infiriendo aspectos principales...")
    schema["aspectos_sugeridos"] = infer_aspectos(schema)
    
    # Agregar timestamp
    from datetime import datetime
    schema["analyzed_at"] = datetime.now().isoformat()
    
    # Convertir sets a listas para JSON
    schema = convert_sets_to_lists(schema)
    
    # Guardar esquema
    print(f"\n💾 Guardando esquema en {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(schema, f, indent=2, ensure_ascii=False)
    
    # Mostrar resumen
    print_schema_summary(schema)
    print(f"\n✅ Esquema guardado en: {output_file}\n")

if __name__ == "__main__":
    main()

