#!/usr/bin/env python3
"""
Script 09: Gestión de PDFs
Copia PDFs a public/downloads/ y actualiza referencias.
"""

import os
import shutil
import json
from pathlib import Path
from slugify import slugify

def copy_pdf(source, destination):
    """Copia un archivo PDF al destino."""
    try:
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        return True
    except Exception as e:
        print(f"✗ Error copiando {source}: {e}")
        return False

def generate_pdf_slug(pdf_path):
    """Genera un slug limpio para el PDF."""
    # Obtener nombre sin extensión
    name = pdf_path.stem
    
    # Remover IDs de Notion
    import re
    name = re.sub(r'\s+[a-f0-9]{32}$', '', name)
    name = re.sub(r'\s+[a-f0-9]{8,}$', '', name)
    
    # Generar slug
    slug = slugify(name)
    
    return f"{slug}.pdf"

def copy_all_pdfs(base_path, output_dir):
    """Copia todos los PDFs encontrados."""
    base_path = Path(base_path)
    output_dir = Path(output_dir)
    
    print(f"📕 Copiando archivos PDF...")
    print(f"   Origen: {base_path}")
    print(f"   Destino: {output_dir}")
    print("=" * 70)
    
    pdf_files = list(base_path.rglob("*.pdf"))
    total = len(pdf_files)
    copied = 0
    errors = 0
    
    pdf_mapping = {}
    total_size = 0
    
    for pdf_file in pdf_files:
        relative_path = pdf_file.relative_to(base_path)
        
        # Generar nombre de destino
        slug = generate_pdf_slug(pdf_file)
        destination = output_dir / slug
        
        # Manejar colisiones de nombres
        counter = 1
        while destination.exists():
            base_slug = slug.replace('.pdf', '')
            slug = f"{base_slug}-{counter}.pdf"
            destination = output_dir / slug
            counter += 1
        
        # Copiar
        if copy_pdf(pdf_file, destination):
            size_mb = pdf_file.stat().st_size / (1024 * 1024)
            total_size += size_mb
            
            pdf_mapping[str(relative_path)] = {
                "original_name": pdf_file.name,
                "new_name": slug,
                "url": f"/downloads/{slug}",
                "size_mb": round(size_mb, 2)
            }
            
            copied += 1
            if copied % 10 == 0:
                print(f"✓ Copiados: {copied}/{total}")
        else:
            errors += 1
    
    return {
        "total": total,
        "copied": copied,
        "errors": errors,
        "total_size_mb": round(total_size, 2),
        "mapping": pdf_mapping
    }

def update_pdf_references(content_dir, pdf_mapping):
    """Actualiza referencias de PDFs en archivos markdown."""
    content_dir = Path(content_dir)
    updated_files = 0
    
    print(f"\n📝 Actualizando referencias a PDFs...")
    
    for md_file in content_dir.rglob("*.md"):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Buscar referencias a PDFs
            import re
            def replace_pdf(match):
                text = match.group(1)
                link = match.group(2)
                
                # Buscar en mapeo
                for original, pdf_info in pdf_mapping.items():
                    if pdf_info['original_name'] in link or original in link:
                        return f"[{text}]({pdf_info['url']})"
                
                # Si no se encuentra, dejar como está
                return match.group(0)
            
            # Reemplazar enlaces a PDFs
            content = re.sub(r'\[([^\]]+)\]\(([^)]*\.pdf[^)]*)\)', replace_pdf, content)
            
            if content != original_content:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files += 1
        
        except Exception as e:
            print(f"✗ Error actualizando {md_file}: {e}")
    
    return updated_files

def generate_downloads_index(output_dir, pdf_mapping):
    """Genera página índice de descargas."""
    # Organizar PDFs por categoría (inferida del path original)
    by_category = {
        "Desconectado": [],
        "Soluciones": [],
        "Inspiración": [],
        "Otros": []
    }
    
    for original, pdf_info in pdf_mapping.items():
        original_lower = original.lower()
        if 'desconectado' in original_lower or 'offline' in original_lower:
            by_category["Desconectado"].append(pdf_info)
        elif 'solucion' in original_lower or 'solution' in original_lower:
            by_category["Soluciones"].append(pdf_info)
        elif 'inspir' in original_lower:
            by_category["Inspiración"].append(pdf_info)
        else:
            by_category["Otros"].append(pdf_info)
    
    # Crear contenido para español
    es_content = """---
title: "Descargas"
lang: "es"
type: "downloads"
description: "Descarga material de SOLE Voltaje en formato PDF"
---

# Descargas

Todos los materiales de SOLE Voltaje están disponibles para descargar en formato PDF.

"""
    
    for category, pdfs in by_category.items():
        if pdfs:
            es_content += f"\n## {category}\n\n"
            for pdf in sorted(pdfs, key=lambda x: x['original_name']):
                es_content += f"- [{pdf['original_name'].replace('.pdf', '')}]({pdf['url']}) ({pdf['size_mb']} MB)\n"
    
    # Crear contenido para inglés
    category_translations = {
        "Desconectado": "Offline",
        "Soluciones": "Solutions",
        "Inspiración": "Inspiration",
        "Otros": "Other"
    }
    
    en_content = """---
title: "Downloads"
lang: "en"
type: "downloads"
description: "Download SOLE Voltaje materials in PDF format"
---

# Downloads

All SOLE Voltaje materials are available for download in PDF format.

"""
    
    for category, pdfs in by_category.items():
        if pdfs:
            en_category = category_translations.get(category, category)
            en_content += f"\n## {en_category}\n\n"
            for pdf in sorted(pdfs, key=lambda x: x['original_name']):
                en_content += f"- [{pdf['original_name'].replace('.pdf', '')}]({pdf['url']}) ({pdf['size_mb']} MB)\n"
    
    # Guardar archivos
    es_file = output_dir / "es" / "descargas.md"
    en_file = output_dir / "en" / "downloads.md"
    
    es_file.parent.mkdir(parents=True, exist_ok=True)
    en_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(es_file, 'w', encoding='utf-8') as f:
        f.write(es_content)
    
    with open(en_file, 'w', encoding='utf-8') as f:
        f.write(en_content)
    
    return [str(es_file), str(en_file)]

def main():
    base_path = Path("Privado y Compartido")
    downloads_dir = Path("public/downloads")
    content_dir = Path("content")
    mapping_file = Path("reports/pdf-mapping.json")
    
    print("\n🚀 Iniciando gestión de PDFs...")
    
    # Copiar PDFs
    stats = copy_all_pdfs(base_path, downloads_dir)
    
    # Guardar mapeo
    mapping_file.parent.mkdir(exist_ok=True)
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(stats['mapping'], f, indent=2, ensure_ascii=False)
    
    # Actualizar referencias
    if content_dir.exists():
        updated = update_pdf_references(content_dir, stats['mapping'])
        print(f"✓ Referencias actualizadas en {updated} archivos")
        
        # Generar índice de descargas
        print(f"\n📄 Generando páginas de índice de descargas...")
        index_files = generate_downloads_index(content_dir, stats['mapping'])
        for index_file in index_files:
            print(f"✓ Creado: {index_file}")
    
    # Mostrar resumen
    print("\n" + "=" * 70)
    print("📕 RESUMEN DE PDFs")
    print("=" * 70)
    print(f"📄 Total de PDFs:         {stats['total']}")
    print(f"✓  Copiados:              {stats['copied']}")
    print(f"✗  Errores:               {stats['errors']}")
    print(f"💾 Tamaño total:          {stats['total_size_mb']} MB")
    print("=" * 70)
    print(f"\n✅ PDFs guardados en: {downloads_dir}\n")

if __name__ == "__main__":
    main()

