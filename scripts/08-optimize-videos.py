#!/usr/bin/env python3
"""
Script 08: Optimización de Videos
Valida enlaces de videos de YouTube/Vimeo y opcionalmente convierte videos locales.
"""

import os
import re
from pathlib import Path
import json

def extract_video_links(content):
    """Extrae enlaces de video de contenido markdown."""
    videos = []
    
    # YouTube links
    youtube_patterns = [
        r'https?://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]+)',
        r'https?://youtu\.be/([a-zA-Z0-9_-]+)',
        r'https?://(?:www\.)?youtube\.com/embed/([a-zA-Z0-9_-]+)'
    ]
    
    for pattern in youtube_patterns:
        matches = re.finditer(pattern, content)
        for match in matches:
            videos.append({
                "type": "youtube",
                "id": match.group(1),
                "url": match.group(0)
            })
    
    # Vimeo links
    vimeo_pattern = r'https?://(?:www\.)?vimeo\.com/(\d+)'
    matches = re.finditer(vimeo_pattern, content)
    for match in matches:
        videos.append({
            "type": "vimeo",
            "id": match.group(1),
            "url": match.group(0)
        })
    
    return videos

def convert_video_embeds(content):
    """Convierte enlaces simples de video a embeds responsive."""
    # YouTube
    def replace_youtube(match):
        video_id = match.group(1)
        return f'''<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/{video_id}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>'''
    
    youtube_patterns = [
        r'https?://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]+)',
        r'https?://youtu\.be/([a-zA-Z0-9_-]+)'
    ]
    
    for pattern in youtube_patterns:
        content = re.sub(pattern, replace_youtube, content)
    
    # Vimeo
    def replace_vimeo(match):
        video_id = match.group(1)
        return f'''<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://player.vimeo.com/video/{video_id}" 
    frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>'''
    
    content = re.sub(r'https?://(?:www\.)?vimeo\.com/(\d+)', replace_vimeo, content)
    
    return content

def scan_video_usage(content_dir):
    """Escanea uso de videos en archivos markdown."""
    content_dir = Path(content_dir)
    
    print(f"📹 Escaneando uso de videos...")
    print("=" * 70)
    
    video_stats = {
        "total_files_with_videos": 0,
        "youtube_count": 0,
        "vimeo_count": 0,
        "local_videos": [],
        "videos_by_file": {}
    }
    
    md_files = list(content_dir.rglob("*.md"))
    files_updated = 0
    
    for md_file in md_files:
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extraer videos
            videos = extract_video_links(content)
            
            if videos:
                relative_path = str(md_file.relative_to(content_dir))
                video_stats["videos_by_file"][relative_path] = videos
                video_stats["total_files_with_videos"] += 1
                
                # Contar por tipo
                for video in videos:
                    if video['type'] == 'youtube':
                        video_stats["youtube_count"] += 1
                    elif video['type'] == 'vimeo':
                        video_stats["vimeo_count"] += 1
                
                # Convertir embeds
                new_content = convert_video_embeds(content)
                
                if new_content != content:
                    with open(md_file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    files_updated += 1
        
        except Exception as e:
            print(f"✗ Error procesando {md_file}: {e}")
    
    # Buscar archivos de video locales
    video_extensions = ['*.mp4', '*.webm', '*.avi', '*.mov']
    for ext in video_extensions:
        local_videos = list(content_dir.rglob(ext))
        for video in local_videos:
            video_stats["local_videos"].append({
                "path": str(video.relative_to(content_dir)),
                "size_mb": round(video.stat().st_size / (1024 * 1024), 2)
            })
    
    video_stats["files_updated"] = files_updated
    
    return video_stats

def find_local_videos(base_path):
    """Encuentra videos locales en el directorio original."""
    base_path = Path(base_path)
    video_extensions = ['*.mp4', '*.webm', '*.avi', '*.mov', '*.flv']
    
    videos = []
    for ext in video_extensions:
        for video in base_path.rglob(ext):
            videos.append({
                "path": str(video.relative_to(base_path)),
                "size_mb": round(video.stat().st_size / (1024 * 1024), 2),
                "extension": video.suffix
            })
    
    return videos

def main():
    content_dir = Path("content")
    base_path = Path("Privado y Compartido")
    output_file = Path("reports/video-analysis.json")
    
    if not content_dir.exists():
        print("❌ Error: El directorio content/ no existe. Ejecuta scripts anteriores primero.")
        return
    
    print("\n🚀 Iniciando análisis de videos...")
    
    # Buscar videos locales en origen
    print(f"\n📂 Buscando videos locales en {base_path}...")
    local_videos = find_local_videos(base_path)
    
    # Escanear uso en content
    video_stats = scan_video_usage(content_dir)
    video_stats["local_videos_in_source"] = local_videos
    
    # Guardar análisis
    output_file.parent.mkdir(exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(video_stats, f, indent=2, ensure_ascii=False)
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("📹 RESUMEN DE VIDEOS")
    print("=" * 70)
    print(f"📄 Archivos con videos:        {video_stats['total_files_with_videos']}")
    print(f"🎥 Videos de YouTube:          {video_stats['youtube_count']}")
    print(f"🎬 Videos de Vimeo:            {video_stats['vimeo_count']}")
    print(f"💾 Videos locales (origen):    {len(local_videos)}")
    
    if local_videos:
        total_size = sum(v['size_mb'] for v in local_videos)
        print(f"📦 Tamaño total (locales):     {total_size:.2f} MB")
        print(f"\n⚠️  Videos locales encontrados:")
        for video in local_videos[:5]:
            print(f"   - {video['path']} ({video['size_mb']} MB)")
        if len(local_videos) > 5:
            print(f"   ... y {len(local_videos) - 5} más")
        print(f"\n💡 Considera subir videos locales a YouTube o un CDN")
    
    print(f"\n📝 Embeds convertidos en {video_stats['files_updated']} archivos")
    print("=" * 70)
    print(f"\n✅ Análisis guardado en: {output_file}\n")

if __name__ == "__main__":
    main()

