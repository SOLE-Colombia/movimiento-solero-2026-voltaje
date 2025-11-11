#!/usr/bin/env python3
"""
Script 11: Conversión de Videos a WebM
Convierte videos locales MP4/MOV a WebM optimizado para web.
"""

import os
import json
import subprocess
from pathlib import Path
from slugify import slugify

def check_ffmpeg():
    """Verifica si ffmpeg está instalado."""
    try:
        result = subprocess.run(['ffmpeg', '-version'], 
                              capture_output=True, 
                              text=True)
        return result.returncode == 0
    except FileNotFoundError:
        return False

def get_video_info(video_path):
    """Obtiene información del video usando ffprobe."""
    try:
        cmd = [
            'ffprobe',
            '-v', 'error',
            '-select_streams', 'v:0',
            '-show_entries', 'stream=width,height,duration',
            '-of', 'json',
            str(video_path)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            info = json.loads(result.stdout)
            if 'streams' in info and info['streams']:
                return info['streams'][0]
        return None
    except:
        return None

def convert_to_webm(input_path, output_path, target_quality='medium'):
    """
    Convierte un video a WebM optimizado.
    
    Quality levels:
    - 'high': CRF 10, bitrate 2M (mejor calidad, mayor tamaño)
    - 'medium': CRF 30, bitrate 1M (balance)
    - 'low': CRF 50, bitrate 500k (menor tamaño)
    """
    quality_settings = {
        'high': {'crf': 10, 'bitrate': '2M'},
        'medium': {'crf': 30, 'bitrate': '1M'},
        'low': {'crf': 50, 'bitrate': '500k'}
    }
    
    settings = quality_settings.get(target_quality, quality_settings['medium'])
    
    try:
        # Crear directorio de salida
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        cmd = [
            'ffmpeg',
            '-i', str(input_path),
            '-c:v', 'libvpx-vp9',          # Codec VP9 (mejor que VP8)
            '-crf', str(settings['crf']),   # Calidad (menor = mejor)
            '-b:v', settings['bitrate'],     # Bitrate máximo
            '-c:a', 'libopus',              # Audio Opus (mejor que Vorbis)
            '-b:a', '128k',                 # Bitrate de audio
            '-movflags', '+faststart',      # Optimización para streaming
            '-y',                           # Sobrescribir si existe
            str(output_path)
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        return result.returncode == 0
    
    except Exception as e:
        print(f"✗ Error convirtiendo {input_path.name}: {e}")
        return False

def generate_video_slug(video_path):
    """Genera un slug limpio para el video."""
    name = video_path.stem
    # Limpiar nombres largos de Notion
    name = name.replace('_', '-')
    slug = slugify(name)
    return f"{slug}.webm"

def process_videos(video_analysis_file, base_path, output_dir, quality='medium'):
    """Procesa todos los videos locales."""
    print(f"📹 Cargando análisis de videos desde {video_analysis_file}...")
    
    with open(video_analysis_file, 'r', encoding='utf-8') as f:
        video_data = json.load(f)
    
    local_videos = video_data.get('local_videos_in_source', [])
    
    if not local_videos:
        print("ℹ️  No hay videos locales para convertir")
        return
    
    total = len(local_videos)
    total_size_before = sum(v['size_mb'] for v in local_videos)
    
    print(f"\n📊 Estadísticas:")
    print(f"   Videos a convertir: {total}")
    print(f"   Tamaño total: {total_size_before:.2f} MB")
    print(f"   Calidad objetivo: {quality}")
    print("=" * 70)
    
    converted = 0
    errors = 0
    total_size_after = 0
    video_mapping = {}
    
    for idx, video_info in enumerate(local_videos, 1):
        video_path = Path(base_path) / video_info['path']
        
        if not video_path.exists():
            print(f"✗ [{idx}/{total}] No encontrado: {video_path.name}")
            errors += 1
            continue
        
        # Generar nombre de salida
        slug = generate_video_slug(video_path)
        output_path = Path(output_dir) / slug
        
        # Evitar duplicados
        counter = 1
        while output_path.exists():
            base_slug = slug.replace('.webm', '')
            slug = f"{base_slug}-{counter}.webm"
            output_path = Path(output_dir) / slug
            counter += 1
        
        print(f"\n📹 [{idx}/{total}] Convirtiendo: {video_path.name}")
        print(f"   Tamaño original: {video_info['size_mb']:.2f} MB")
        print(f"   Salida: {slug}")
        
        # Convertir
        if convert_to_webm(video_path, output_path, quality):
            size_after = output_path.stat().st_size / (1024 * 1024)
            total_size_after += size_after
            reduction = ((video_info['size_mb'] - size_after) / video_info['size_mb']) * 100
            
            print(f"   ✓ Convertido: {size_after:.2f} MB (reducción: {reduction:.1f}%)")
            
            video_mapping[video_info['path']] = {
                'original_path': video_info['path'],
                'webm_path': str(output_path.relative_to(output_dir.parent)),
                'original_size_mb': video_info['size_mb'],
                'webm_size_mb': round(size_after, 2),
                'reduction_percent': round(reduction, 1)
            }
            
            converted += 1
        else:
            print(f"   ✗ Error en conversión")
            errors += 1
    
    return {
        'total': total,
        'converted': converted,
        'errors': errors,
        'size_before_mb': round(total_size_before, 2),
        'size_after_mb': round(total_size_after, 2),
        'mapping': video_mapping
    }

def update_video_references(content_dir, video_mapping):
    """Actualiza referencias de videos en archivos markdown."""
    content_dir = Path(content_dir)
    updated_files = 0
    
    print(f"\n📝 Actualizando referencias en archivos markdown...")
    
    for md_file in content_dir.rglob("*.md"):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Buscar referencias a los videos originales
            for original_path, mapping in video_mapping.items():
                original_name = Path(original_path).name
                
                # Reemplazar referencias
                if original_name in content:
                    # Reemplazar enlaces markdown
                    content = content.replace(
                        f"]({original_name})",
                        f"]({mapping['webm_path']})"
                    )
                    content = content.replace(
                        f"({original_name})",
                        f"({mapping['webm_path']})"
                    )
            
            if content != original_content:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files += 1
        
        except Exception as e:
            print(f"✗ Error actualizando {md_file}: {e}")
    
    return updated_files

def create_videos_index(output_dir, video_mapping):
    """Crea una página índice de videos."""
    output_dir = Path(output_dir)
    
    # Organizar videos por categoría
    by_category = {
        "Comunidades": [],
        "Tutoriales": [],
        "Otros": []
    }
    
    for original, mapping in video_mapping.items():
        original_lower = original.lower()
        if 'inspiration' in original_lower or 'mejoro' in original_lower:
            by_category["Comunidades"].append(mapping)
        elif 'solution' in original_lower or 'tutorial' in original_lower:
            by_category["Tutoriales"].append(mapping)
        else:
            by_category["Otros"].append(mapping)
    
    # Crear índice en español
    es_content = """---
title: "Videos"
lang: "es"
type: "videos"
description: "Galería de videos de SOLE Voltaje"
---

# Videos

Videos de comunidades y tutoriales de SOLE Voltaje.

"""
    
    for category, videos in by_category.items():
        if videos:
            es_content += f"\n## {category}\n\n"
            for video in sorted(videos, key=lambda x: x['original_path']):
                name = Path(video['original_path']).stem.replace('_', ' ')
                es_content += f"### {name}\n\n"
                es_content += f"<video controls width=\"100%\">\n"
                es_content += f"  <source src=\"/{video['webm_path']}\" type=\"video/webm\">\n"
                es_content += f"  Tu navegador no soporta el elemento de video.\n"
                es_content += f"</video>\n\n"
                es_content += f"*Tamaño: {video['webm_size_mb']} MB*\n\n"
    
    # Guardar
    index_file = output_dir.parent / "content" / "es" / "videos.md"
    index_file.parent.mkdir(parents=True, exist_ok=True)
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(es_content)
    
    return str(index_file)

def main():
    # Configuración
    video_analysis_file = Path("reports/video-analysis.json")
    base_path = Path("Privado y Compartido")
    output_dir = Path("public/videos")
    mapping_file = Path("reports/video-mapping.json")
    
    # Verificar ffmpeg
    print("\n🔍 Verificando dependencias...")
    if not check_ffmpeg():
        print("\n❌ ERROR: ffmpeg no está instalado")
        print("\nPara instalar ffmpeg:")
        print("  Windows: Descarga de https://ffmpeg.org/download.html")
        print("           O usa: winget install FFmpeg")
        print("  Mac:     brew install ffmpeg")
        print("  Linux:   sudo apt install ffmpeg")
        print("\nDespués de instalar, ejecuta este script de nuevo.")
        return
    
    print("✓ ffmpeg encontrado")
    
    if not video_analysis_file.exists():
        print(f"\n❌ Error: No se encuentra {video_analysis_file}")
        print("   Ejecuta primero: py scripts\\08-optimize-videos.py")
        return
    
    print("\n🚀 Iniciando conversión de videos a WebM...\n")
    
    # Preguntar calidad
    print("Selecciona calidad de conversión:")
    print("  1. Alta (mejor calidad, más tamaño)")
    print("  2. Media (balance) [recomendado]")
    print("  3. Baja (menor tamaño)")
    
    quality_map = {'1': 'high', '2': 'medium', '3': 'low'}
    quality = 'medium'  # Default
    
    # Procesar videos
    stats = process_videos(video_analysis_file, base_path, output_dir, quality)
    
    if stats:
        # Guardar mapeo
        mapping_file.parent.mkdir(exist_ok=True)
        with open(mapping_file, 'w', encoding='utf-8') as f:
            json.dump(stats['mapping'], f, indent=2, ensure_ascii=False)
        
        # Actualizar referencias
        if Path("content").exists():
            updated = update_video_references(Path("content"), stats['mapping'])
            print(f"✓ Referencias actualizadas en {updated} archivos")
            
            # Crear índice
            index_file = create_videos_index(output_dir, stats['mapping'])
            print(f"✓ Índice de videos creado: {index_file}")
        
        # Mostrar resumen
        print("\n" + "=" * 70)
        print("📹 RESUMEN DE CONVERSIÓN")
        print("=" * 70)
        print(f"📄 Total de videos:      {stats['total']}")
        print(f"✓  Convertidos a WebM:   {stats['converted']}")
        print(f"✗  Errores:              {stats['errors']}")
        print(f"💾 Tamaño antes:         {stats['size_before_mb']} MB")
        print(f"💾 Tamaño después:       {stats['size_after_mb']} MB")
        
        if stats['size_before_mb'] > 0:
            reduction = ((stats['size_before_mb'] - stats['size_after_mb']) / stats['size_before_mb']) * 100
            print(f"📉 Reducción:            {reduction:.1f}%")
        
        print("=" * 70)
        print(f"\n✅ Videos guardados en: {output_dir}")
        print(f"📋 Mapeo guardado en: {mapping_file}\n")
        
        # Información adicional
        print("📝 Próximos pasos:")
        print("   1. Los videos están en public/videos/")
        print("   2. Las referencias en markdown fueron actualizadas")
        print("   3. Para subirlos a un CDN más adelante:")
        print("      - Sube el contenido de public/videos/ al CDN")
        print("      - Actualiza las rutas en los archivos markdown")
        print("")

if __name__ == "__main__":
    main()






