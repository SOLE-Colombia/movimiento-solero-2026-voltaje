# 📁 Estructura del Repositorio - SOLE Voltaje

## 🗂️ Vista General

```
sole-voltaje/                          ~40 MB total (GitHub)
│
├── 📝 CONTENIDO (Rama: content-editing)
│   ├── content/                       ~3 MB
│   │   ├── es/                        Contenido en español
│   │   │   ├── index.md
│   │   │   ├── nuevo-aqui/            4 archivos
│   │   │   ├── inspirate/             303 archivos
│   │   │   ├── soluciona/             51 archivos
│   │   │   ├── pregunta-comenta/      4 archivos
│   │   │   ├── desconectado/          33 archivos
│   │   │   └── conceptorio/           32 archivos
│   │   │
│   │   ├── en/                        Contenido en inglés
│   │   │   ├── index.md
│   │   │   ├── new-here/              2 archivos
│   │   │   ├── inspire/               90 archivos
│   │   │   ├── solve/                 39 archivos
│   │   │   ├── question-comment/      2 archivos
│   │   │   └── glossary/              18 archivos
│   │   │
│   │   └── assets/
│   │       └── images/                731 imágenes WebP optimizadas
│   │
│   └── public/                        ~30 MB
│       ├── downloads/                 4 PDFs
│       └── videos/                    51 videos WebM
│
├── 💻 DESARROLLO (Rama: development)
│   ├── quartz/                        ~5 MB (sin node_modules)
│   │   ├── content/                   Copia sincronizada del contenido
│   │   │   ├── es/
│   │   │   ├── en/
│   │   │   └── assets/
│   │   │
│   │   ├── quartz/                    Core de Quartz
│   │   │   ├── components/            Componentes React
│   │   │   ├── plugins/               Plugins de transformación
│   │   │   ├── styles/                Estilos SCSS
│   │   │   ├── i18n/                  Traducciones UI
│   │   │   └── util/                  Utilidades
│   │   │
│   │   ├── components/                Componentes personalizados
│   │   │   └── ExportPDF.tsx
│   │   │
│   │   ├── styles/                    Estilos personalizados
│   │   │   └── exportPDF.scss
│   │   │
│   │   ├── quartz.config.ts           Configuración principal
│   │   ├── quartz.layout.ts           Layout del sitio
│   │   ├── package.json               Dependencias Node
│   │   └── package-lock.json
│   │
│   ├── scripts/                       Scripts de automatización
│   │   ├── 01-inventory.py            Inventario de archivos
│   │   ├── 02-analyze-csv.py          Análisis de metadata
│   │   ├── 03-slug-mapper.py          Generación de slugs
│   │   ├── 04-clean-markdown.py       Limpieza de MD
│   │   ├── 05-generate-frontmatter.py Generación de frontmatter
│   │   ├── 06-split-languages.py      Separación de idiomas
│   │   ├── 07-optimize-images.py      Optimización de imágenes
│   │   ├── 08-optimize-videos.py      Validación de videos
│   │   ├── 09-manage-pdfs.py          Gestión de PDFs
│   │   ├── 10-validate.py             Validación final
│   │   ├── run-all-migrations.bat     Ejecutar todo
│   │   ├── dev.bat                    Desarrollo local
│   │   ├── build.bat                  Build producción
│   │   ├── init-git-organization.bat  Setup Git automático
│   │   └── switch-branch.bat          Cambiar ramas fácil
│   │
│   ├── .github/
│   │   └── workflows/
│   │       └── deploy.yml             GitHub Actions para deploy
│   │
│   ├── docker-compose.yml             Configuración Docker Compose
│   ├── Dockerfile                     Imagen Docker
│   ├── requirements.txt               Dependencias Python
│   └── .gitignore                     Archivos a ignorar
│
├── 📚 DOCUMENTACIÓN
│   ├── README.md                      Guía principal del proyecto
│   ├── INICIO_GIT.md                  ⭐ EMPIEZA AQUÍ para Git
│   ├── GUIA_GIT_ORGANIZACION.md       Guía completa de Git
│   ├── ESTRUCTURA_REPOSITORIO.md      Este archivo
│   ├── RESUMEN_PROYECTO.md            Resumen ejecutivo
│   ├── QUARTZ_CONFIG.md               Configuración de Quartz
│   ├── GUIA_DEPLOY.md                 Guía de deployment
│   ├── ESTRATEGIA_PDFS.md             Gestión de PDFs
│   ├── GUIA_VIDEOS.md                 Gestión de videos
│   └── NOTAS_WINDOWS.md               Notas específicas Windows
│
└── ❌ NO INCLUIDO EN GIT (ignorado)
    ├── temp/                          ~500 MB - Archivos temporales
    ├── reports/                       ~5 MB - Reportes generados
    ├── quartz/node_modules/           ~200 MB - Dependencias Node
    ├── quartz/public/                 Build output (generado)
    └── Privado y Compartido/          Exportación original de Notion
```

---

## 🎨 Mapa de Responsabilidades

### 👥 ¿Quién trabaja en qué?

```
┌──────────────────────────────────────────────────────────┐
│ 📝 REDACTORES & EDITORES                                 │
├──────────────────────────────────────────────────────────┤
│ Rama: content-editing                                    │
│                                                           │
│ Trabajan en:                                             │
│   • content/es/*.md                                      │
│   • content/en/*.md                                      │
│   • content/assets/images/                               │
│   • public/downloads/                                    │
│   • public/videos/                                       │
│                                                           │
│ No tocan:                                                │
│   • quartz/ (código)                                     │
│   • scripts/ (scripts)                                   │
│   • configuración                                        │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 👨‍💻 DESARROLLADORES                                      │
├──────────────────────────────────────────────────────────┤
│ Rama: development                                        │
│                                                           │
│ Trabajan en:                                             │
│   • quartz/components/ (React)                           │
│   • quartz/quartz.config.ts                              │
│   • quartz/styles/                                       │
│   • scripts/                                             │
│   • .github/workflows/                                   │
│                                                           │
│ Reciben:                                                 │
│   • Merge desde content-editing                          │
│   • Contenido nuevo actualizado                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 🤖 AUTOMATIZACIÓN (GitHub Actions)                       │
├──────────────────────────────────────────────────────────┤
│ Rama: main                                               │
│                                                           │
│ Proceso:                                                 │
│   1. Recibe merge desde development                      │
│   2. Ejecuta: npm install                                │
│   3. Ejecuta: npx quartz build                           │
│   4. Deploy a GitHub Pages                               │
│   5. Sitio live en voltaje.solecolombia.org              │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Desglose de Tamaño

### Archivos en Git (~40 MB)

| Categoría | Tamaño | Archivos | Descripción |
|-----------|--------|----------|-------------|
| **Imágenes WebP** | ~20 MB | 731 | Optimizadas, responsive |
| **Videos WebM** | ~15 MB | 51 | Formato web optimizado |
| **PDFs** | ~3 MB | 4 | Documentos descargables |
| **Código Quartz** | ~1 MB | 200+ | TypeScript, React, SCSS |
| **Contenido MD** | ~500 KB | 584 | Archivos markdown |
| **Scripts Python** | ~200 KB | 16 | Scripts de migración |
| **Configuración** | ~100 KB | 20+ | Configs, Docker, etc |
| **Documentación** | ~100 KB | 15 | Guías y README |

**Total en GitHub**: ~40 MB ✅

### Archivos ignorados (~700 MB)

| Categoría | Tamaño | Por qué se ignora |
|-----------|--------|-------------------|
| `temp/` | ~500 MB | Archivos temporales de migración |
| `quartz/node_modules/` | ~200 MB | Se instala con `npm install` |
| `reports/` | ~5 MB | Reportes generados, no necesarios |
| Build outputs | varies | Se generan en deploy |

---

## 🔄 Flujo de Archivos

```
1. CREACIÓN DE CONTENIDO
   ↓
   Redactores editan en content-editing
   content/es/*.md
   content/en/*.md
   ↓
   git commit & push
   ↓
   PR → development

2. INTEGRACIÓN Y DESARROLLO
   ↓
   Desarrolladores en development
   Merge contenido nuevo
   Desarrollan componentes
   ↓
   git commit & push
   ↓
   PR → main

3. DEPLOY AUTOMÁTICO
   ↓
   GitHub Actions en main
   npm install
   npx quartz build
   ↓
   Deploy → GitHub Pages
   ↓
   🌐 Sitio en vivo

4. RETROALIMENTACIÓN
   ↓
   Issues en GitHub
   ↓
   Volver a paso 1 o 2
```

---

## 📁 Tipos de Archivos

### Archivos de Contenido (.md)

```markdown
---
title: "Título de la Página"
lang: "es"
slug: "slug-seo-friendly"
categories: ["tag1", "tag2"]
aspectos: ["señal", "dispositivos"]
formato: "Video"
fecha: "2024-10-12"
draft: false
traduccion: true
---

# Contenido en Markdown

Texto, enlaces, imágenes...
```

### Archivos de Configuración

- **quartz.config.ts**: Configuración principal de Quartz
- **quartz.layout.ts**: Layout de páginas
- **docker-compose.yml**: Servicios Docker
- **package.json**: Dependencias Node.js
- **requirements.txt**: Dependencias Python

### Archivos de Automatización

- **Scripts Python**: Migración y procesamiento
- **Scripts Batch**: Comandos Windows
- **GitHub Actions**: CI/CD workflows

---

## 🎯 Ubicaciones Clave

### Para Agregar Contenido Nuevo

```
ES: content/es/[sección]/nuevo-articulo.md
EN: content/en/[section]/new-article.md

Secciones:
- nuevo-aqui / new-here
- inspirate / inspire
- soluciona / solve
- pregunta-comenta / question-comment
- desconectado / (offline en ES solamente)
- conceptorio / glossary
```

### Para Agregar Imágenes

```
content/assets/images/nombre-descriptivo.webp
```

**Importante**: Usa formato WebP optimizado

### Para Agregar PDFs

```
public/downloads/nombre-descriptivo.pdf
```

### Para Agregar Videos

```
public/videos/nombre-descriptivo.webm
```

**Importante**: Usa formato WebM para web

---

## 🔍 Archivos Especiales

### .gitignore

Define qué NO subir a GitHub:
- Carpetas temporales
- node_modules
- Build outputs
- Archivos de sistema

### package.json

Dependencias de Node.js para Quartz:
- React/Preact
- TypeScript
- Processors de markdown
- Build tools

### requirements.txt

Dependencias de Python para scripts:
- Pillow (imágenes)
- PyYAML (frontmatter)
- Pandas (análisis)

### quartz.config.ts

Configuración de Quartz:
- Plugins activos
- Transformadores
- Metadata del sitio
- Idiomas

---

## 📋 Checklist de Archivos

### Antes de Commit

```bash
# Ver qué archivos cambiarán
git status

# Ver diferencias
git diff

# Verificar que NO se incluyan:
# ❌ temp/
# ❌ reports/
# ❌ node_modules/
# ❌ *.log
# ❌ archivos temporales

# Si todo se ve bien
git add .
git commit -m "Descripción del cambio"
```

### Antes de Push

```bash
# Ver commits pendientes
git log origin/rama-actual..HEAD

# Verificar rama correcta
git branch --show-current

# Push
git push
```

---

## 🆘 Comandos Útiles

```bash
# Ver tamaño del repo
git count-objects -vH

# Ver archivos más grandes
git ls-files | xargs ls -lh | sort -k5 -h -r | head -20

# Ver qué archivos se ignoran
git status --ignored

# Limpiar archivos no rastreados
git clean -fd --dry-run  # Ver qué se borraría
git clean -fd            # Borrar (¡cuidado!)

# Ver diferencias de tamaño
git diff --stat

# Ver historial de un archivo
git log --follow -- ruta/archivo.md
```

---

## 📚 Referencias

- **README.md**: Guía principal del proyecto
- **INICIO_GIT.md**: Inicio rápido para Git
- **GUIA_GIT_ORGANIZACION.md**: Guía completa de Git y ramas

---

**Fecha de última actualización**: 2024-10-20  
**Versión**: 1.0


