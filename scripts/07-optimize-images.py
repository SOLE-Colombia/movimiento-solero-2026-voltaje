#!/usr/bin/env python3
"""
Script 07: Optimización de Imágenes
Optimiza imágenes a WebP con múltiples tamaños responsive.
"""

import os
import re
from pathlib import Path
from PIL import Image
import json

def should_optimize_image(filepath, size_threshold_kb=50):
    """Determina si una imagen debe ser optimizada."""
    size_kb = filepath.stat().st_size / 1024
    return size_kb > size_threshold_kb

def optimize_image(input_path, output_base_path, widths=[400, 800, 1200], quality=85):
    """Optimiza una imagen a múltiples tamaños en formato WebP."""
    try:
        img = Image.open(input_path)
        
        # Convertir a RGB si es necesario (para WebP)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        original_width, original_height = img.size
        optimized_files = []
        
        # Determinar qué tamaños generar
        applicable_widths = [w for w in widths if w < original_width]
        if not applicable_widths or original_width <= min(widths):
            # Imagen pequeña, solo optimizar en su tamaño original
            applicable_widths = [original_width]
        
        for width in applicable_widths:
            # Calcular altura proporcional
            height = int((width / original_width) * original_height)
            
            # Redimensionar
            resized = img.resize((width, height), Image.Resampling.LANCZOS)
            
            # Generar nombre de archivo
            stem = input_path.stem
            output_filename = f"{stem}-{width}w.webp"
            output_path = output_base_path / output_filename
            
            # Crear directorio si no existe
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Guardar en WebP
            resized.save(output_path, 'WEBP', quality=quality, method=6)
            
            optimized_files.append({
                "width": width,
                "height": height,
                "path": str(output_path.relative_to("content")),
                "size_kb": round(output_path.stat().st_size / 1024, 2)
            })
        
        return optimized_files
    
    except Exception as e:
        print(f"✗ Error optimizando {input_path}: {e}")
        return None

def update_image_references(content_dir, image_mapping):
    """Actualiza referencias de imágenes en archivos markdown."""
    content_dir = Path(content_dir)
    updated_files = 0
    
    for md_file in content_dir.rglob("*.md"):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Buscar todas las referencias de imágenes
            # Formato: ![alt](ruta)
            def replace_image(match):
                alt_text = match.group(1)
                img_path = match.group(2)
                
                # Buscar en el mapeo
                for original, optimized_list in image_mapping.items():
                    if original in img_path or Path(img_path).name in original:
                        if optimized_list:
                            # Usar la versión mediana (800w) como default
                            default_img = next((img for img in optimized_list if img['width'] == 800), optimized_list[0])
                            
                            # Generar HTML con srcset para responsive
                            srcset = ", ".join([f"/{img['path']} {img['width']}w" for img in optimized_list])
                            
                            return f'<img src="/{default_img["path"]}" alt="{alt_text}" srcset="{srcset}" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px" loading="lazy" />'
                
                # Si no se encuentra mapeo, dejar como está
                return match.group(0)
            
            content = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_image, content)
            
            # Guardar si hubo cambios
            if content != original_content:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files += 1
        
        except Exception as e:
            print(f"✗ Error actualizando {md_file}: {e}")
    
    return updated_files

def copy_small_images(input_path, output_path):
    """Copia imágenes pequeñas sin optimizar."""
    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        import shutil
        shutil.copy2(input_path, output_path)
        return True
    except Exception as e:
        print(f"✗ Error copiando {input_path}: {e}")
        return False

def optimize_all_images(base_path, output_dir):
    """Optimiza todas las imágenes encontradas."""
    base_path = Path(base_path)
    output_dir = Path(output_dir)
    
    print(f"🖼️  Optimizando imágenes...")
    print(f"   Origen: {base_path}")
    print(f"   Destino: {output_dir}")
    print("=" * 70)
    
    # Buscar todas las imágenes
    image_extensions = ['*.png', '*.jpg', '*.jpeg', '*.gif']
    image_files = []
    for ext in image_extensions:
        image_files.extend(base_path.rglob(ext))
    
    total = len(image_files)
    optimized = 0
    copied = 0
    errors = 0
    
    image_mapping = {}
    total_size_before = 0
    total_size_after = 0
    
    for img_file in image_files:
        relative_path = img_file.relative_to(base_path)
        
        # Calcular tamaño original
        original_size = img_file.stat().st_size
        total_size_before += original_size
        
        # Determinar ruta de salida
        # Organizar por sección
        output_base = output_dir / "assets" / "images" / relative_path.parent.name
        
        if should_optimize_image(img_file):
            # Optimizar
            optimized_files = optimize_image(img_file, output_base)
            
            if optimized_files:
                image_mapping[str(relative_path)] = optimized_files
                optimized += 1
                
                # Sumar tamaño optimizado
                for opt_file in optimized_files:
                    total_size_after += opt_file['size_kb'] * 1024
                
                if optimized % 10 == 0:
                    print(f"✓ Optimizadas: {optimized}/{total}")
            else:
                errors += 1
        else:
            # Copiar sin optimizar
            output_path = output_base / img_file.name
            if copy_small_images(img_file, output_path):
                copied += 1
                total_size_after += original_size
            else:
                errors += 1
    
    return {
        "total": total,
        "optimized": optimized,
        "copied": copied,
        "errors": errors,
        "size_before_mb": round(total_size_before / (1024 * 1024), 2),
        "size_after_mb": round(total_size_after / (1024 * 1024), 2),
        "mapping": image_mapping
    }

def main():
    base_path = Path("Privado y Compartido")
    output_dir = Path("content")
    mapping_file = Path("reports/image-mapping.json")
    
    print("\n🚀 Iniciando optimización de imágenes...")
    
    # Optimizar imágenes
    stats = optimize_all_images(base_path, output_dir)
    
    # Guardar mapeo
    mapping_file.parent.mkdir(exist_ok=True)
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(stats['mapping'], f, indent=2, ensure_ascii=False)
    
    # Actualizar referencias en markdown
    print(f"\n📝 Actualizando referencias en archivos markdown...")
    updated = update_image_references(output_dir, stats['mapping'])
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("🖼️  RESUMEN DE OPTIMIZACIÓN")
    print("=" * 70)
    print(f"📄 Total de imágenes:     {stats['total']}")
    print(f"✓  Optimizadas a WebP:    {stats['optimized']}")
    print(f"📋 Copiadas sin cambios:  {stats['copied']}")
    print(f"✗  Errores:               {stats['errors']}")
    print(f"💾 Tamaño antes:          {stats['size_before_mb']} MB")
    print(f"💾 Tamaño después:        {stats['size_after_mb']} MB")
    
    if stats['size_before_mb'] > 0:
        reduction = ((stats['size_before_mb'] - stats['size_after_mb']) / stats['size_before_mb']) * 100
        print(f"📉 Reducción:             {reduction:.1f}%")
    
    print(f"\n📝 Referencias actualizadas en {updated} archivos markdown")
    print("=" * 70)
    print(f"\n✅ Imágenes optimizadas guardadas en: {output_dir}/assets/images/\n")

if __name__ == "__main__":
    main()

