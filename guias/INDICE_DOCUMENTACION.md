# 📚 Índice de Documentación - SOLE Voltaje

## 🎯 ¿Por dónde empiezo?

### 👤 Según tu Rol

#### 🚀 Quiero subir el proyecto a GitHub (Primera vez)
1. **[INICIO_GIT.md](INICIO_GIT.md)** ⭐ Empieza aquí
2. **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** - Guía completa
3. Ejecuta: `scripts\init-git-organization.bat`

#### ✍️ Soy Redactor/Editor de Contenido
1. **[INICIO_GIT.md](INICIO_GIT.md)** - Setup inicial
2. **[COMANDOS_GIT.md](COMANDOS_GIT.md)** - Comandos básicos
3. Trabaja en rama: `content-editing`
4. Edita archivos en: `content/es/` y `content/en/`

#### 👨‍💻 Soy Desarrollador Web
1. **[README.md](README.md)** - Documentación principal
2. **[QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)** - Configuración Quartz
3. **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** - Estructura
4. Trabaja en rama: `development`

#### 🎨 Soy Diseñador/Gestor de Imágenes
1. **[GUIA_VIDEOS.md](GUIA_VIDEOS.md)** - Videos
2. **[ESTRATEGIA_PDFS.md](ESTRATEGIA_PDFS.md)** - PDFs
3. Ver scripts: `07-optimize-images.py`
4. Trabaja en rama: `content-editing`

#### 🚀 Necesito hacer Deploy
1. **[GUIA_DEPLOY.md](GUIA_DEPLOY.md)** - Guía de deployment
2. **[INICIO_DEPLOY.md](INICIO_DEPLOY.md)** - Inicio rápido
3. **[RESUMEN_DEPLOY.txt](RESUMEN_DEPLOY.txt)** - Resumen
4. Ver: `.github/workflows/deploy.yml`

---

## 📖 Toda la Documentación

### 🚀 Git y Versionado

| Archivo | Descripción | Nivel | Tiempo |
|---------|-------------|-------|--------|
| **[INICIO_GIT.md](INICIO_GIT.md)** ⭐ | Inicio rápido para subir a GitHub | Básico | 15 min |
| **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** | Guía completa de 3 ramas y flujo de trabajo | Intermedio | 30 min |
| **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** | Estructura de carpetas y archivos | Intermedio | 20 min |
| **[COMANDOS_GIT.md](COMANDOS_GIT.md)** | Referencia rápida de comandos | Todos | Referencia |

### 📝 Proyecto General

| Archivo | Descripción | Nivel | Tiempo |
|---------|-------------|-------|--------|
| **[README.md](README.md)** | Documentación principal del proyecto | Básico | 20 min |
| **[RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)** | Resumen ejecutivo completo | Ejecutivo | 15 min |
| **[COMIENZA_AQUI.md](COMIENZA_AQUI.md)** | Punto de entrada al proyecto | Básico | 10 min |

### ⚙️ Configuración Técnica

| Archivo | Descripción | Nivel | Tiempo |
|---------|-------------|-------|--------|
| **[QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)** | Configuración de Quartz v4 | Avanzado | 30 min |
| **[IMPLEMENTACION_COMPLETA.md](IMPLEMENTACION_COMPLETA.md)** | Implementación técnica completa | Avanzado | 45 min |
| **[NOTAS_WINDOWS.md](NOTAS_WINDOWS.md)** | Notas específicas para Windows | Básico | 10 min |

### 🚀 Deploy y Producción

| Archivo | Descripción | Nivel | Tiempo |
|---------|-------------|-------|--------|
| **[GUIA_DEPLOY.md](GUIA_DEPLOY.md)** | Guía completa de deployment | Intermedio | 30 min |
| **[INICIO_DEPLOY.md](INICIO_DEPLOY.md)** | Inicio rápido de deploy | Básico | 15 min |
| **[RESUMEN_DEPLOY.txt](RESUMEN_DEPLOY.txt)** | Resumen de deployment | Básico | 5 min |
| **[PASOS_SIMPLES.md](PASOS_SIMPLES.md)** | Pasos simples para deploy | Básico | 10 min |

### 🎨 Contenido y Media

| Archivo | Descripción | Nivel | Tiempo |
|---------|-------------|-------|--------|
| **[GUIA_VIDEOS.md](GUIA_VIDEOS.md)** | Gestión de videos | Intermedio | 20 min |
| **[ESTRATEGIA_PDFS.md](ESTRATEGIA_PDFS.md)** | Gestión de PDFs | Intermedio | 20 min |

### 🛠️ Scripts y Automatización

| Archivo | Descripción | Nivel | Tiempo |
|---------|-------------|-------|--------|
| **[COMANDOS_DIRECTOS.md](COMANDOS_DIRECTOS.md)** | Comandos directos útiles | Intermedio | Referencia |

---

## 🗂️ Scripts Disponibles

### 🔧 Scripts de Migración (Python)

| Script | Qué hace |
|--------|----------|
| `01-inventory.py` | Inventario completo de archivos |
| `02-analyze-csv.py` | Extracción de metadata de CSVs |
| `03-slug-mapper.py` | Generación de slugs SEO-friendly |
| `04-clean-markdown.py` | Limpieza de sintaxis de Notion |
| `05-generate-frontmatter.py` | Generación de frontmatter YAML |
| `06-split-languages.py` | Separación en `/es/` y `/en/` |
| `07-optimize-images.py` | Conversión a WebP responsive |
| `08-optimize-videos.py` | Validación de embeds de video |
| `09-manage-pdfs.py` | Gestión de archivos PDF |
| `10-validate.py` | Verificación de enlaces e imágenes |
| `11-convert-videos-to-webm.py` | Conversión de videos |
| `12-optimize-pdfs.py` | Optimización de PDFs |
| `13-analyze-pdf-duplicates.py` | Análisis de PDFs duplicados |
| `14-remove-duplicate-pdfs.py` | Eliminación de duplicados |
| `15-cleanup-pdf-exports.py` | Limpieza de exports |
| `16-optimize-image-folders.py` | Optimización de carpetas |

### 🚀 Scripts de Workflow (Batch)

| Script | Qué hace |
|--------|----------|
| `init-git-organization.bat` ⭐ | Setup completo de Git |
| `switch-branch.bat` | Cambiar entre ramas fácilmente |
| `run-all-migrations.bat` | Ejecutar todos los scripts de migración |
| `dev.bat` | Servidor de desarrollo local |
| `build.bat` | Build de producción |
| `copy-to-quartz.bat` | Copiar contenido a Quartz |
| `docker-dev.bat` | Desarrollo con Docker |
| `docker-build.bat` | Build con Docker |
| `deploy-simple.bat` | Deploy simplificado |
| `first-push.bat` | Primer push a GitHub |
| `init-git.bat` | Inicializar Git |
| `check-requirements.bat` | Verificar dependencias |
| `setup-complete.bat` | Setup completo del proyecto |

---

## 🎯 Rutas de Aprendizaje

### 🏃 Ruta Rápida (1 hora)

Para empezar lo más rápido posible:

1. **[COMIENZA_AQUI.md](COMIENZA_AQUI.md)** (10 min)
2. **[INICIO_GIT.md](INICIO_GIT.md)** (15 min)
3. Ejecuta: `scripts\init-git-organization.bat` (10 min)
4. **[README.md](README.md)** - Sección de desarrollo (15 min)
5. Ejecuta: `scripts\dev.bat` (5 min)
6. ¡A trabajar! 🎉

### 📚 Ruta Completa (3-4 horas)

Para entender todo el proyecto:

1. **[README.md](README.md)** (20 min)
2. **[RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)** (15 min)
3. **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** (30 min)
4. **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** (20 min)
5. **[QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)** (30 min)
6. **[IMPLEMENTACION_COMPLETA.md](IMPLEMENTACION_COMPLETA.md)** (45 min)
7. **[GUIA_DEPLOY.md](GUIA_DEPLOY.md)** (30 min)
8. Práctica con scripts (30 min)

### 👨‍💻 Ruta de Desarrollador (2 horas)

Enfocado en código:

1. **[README.md](README.md)** (20 min)
2. **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** (20 min)
3. **[QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)** (30 min)
4. **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** - Sección development (15 min)
5. **[COMANDOS_GIT.md](COMANDOS_GIT.md)** - Referencia (10 min)
6. Explorar código en `quartz/` (25 min)

### ✍️ Ruta de Contenido (45 min)

Para redactores y editores:

1. **[INICIO_GIT.md](INICIO_GIT.md)** (15 min)
2. **[COMANDOS_GIT.md](COMANDOS_GIT.md)** - Sección básica (10 min)
3. **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** - Sección de contenido (10 min)
4. Explorar carpeta `content/` (10 min)

### 🚀 Ruta de DevOps (1.5 horas)

Para deployment y CI/CD:

1. **[GUIA_DEPLOY.md](GUIA_DEPLOY.md)** (30 min)
2. **[INICIO_DEPLOY.md](INICIO_DEPLOY.md)** (15 min)
3. Revisar `.github/workflows/deploy.yml` (15 min)
4. **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** - Sección automation (15 min)
5. Práctica con Docker (15 min)

---

## 🔍 Búsqueda por Tema

### Git y Control de Versiones
- [INICIO_GIT.md](INICIO_GIT.md)
- [GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)
- [COMANDOS_GIT.md](COMANDOS_GIT.md)

### Estructura y Arquitectura
- [ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)
- [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)

### Configuración Técnica
- [QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)
- [IMPLEMENTACION_COMPLETA.md](IMPLEMENTACION_COMPLETA.md)
- [NOTAS_WINDOWS.md](NOTAS_WINDOWS.md)

### Deployment
- [GUIA_DEPLOY.md](GUIA_DEPLOY.md)
- [INICIO_DEPLOY.md](INICIO_DEPLOY.md)
- [RESUMEN_DEPLOY.txt](RESUMEN_DEPLOY.txt)

### Contenido y Media
- [GUIA_VIDEOS.md](GUIA_VIDEOS.md)
- [ESTRATEGIA_PDFS.md](ESTRATEGIA_PDFS.md)

### Scripts y Automatización
- [COMANDOS_DIRECTOS.md](COMANDOS_DIRECTOS.md)
- Ver carpeta: `scripts/`

---

## 📋 Checklist de Documentación Leída

Marca lo que ya leíste:

### Esencial (Todos deberían leer)
- [ ] [README.md](README.md)
- [ ] [INICIO_GIT.md](INICIO_GIT.md)
- [ ] [COMANDOS_GIT.md](COMANDOS_GIT.md) - Al menos sección básica

### Para Líderes de Proyecto
- [ ] [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)
- [ ] [GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)
- [ ] [ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)

### Para Desarrolladores
- [ ] [QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)
- [ ] [IMPLEMENTACION_COMPLETA.md](IMPLEMENTACION_COMPLETA.md)
- [ ] [GUIA_DEPLOY.md](GUIA_DEPLOY.md)

### Para Editores de Contenido
- [ ] Sección de frontmatter en [README.md](README.md)
- [ ] [GUIA_VIDEOS.md](GUIA_VIDEOS.md)
- [ ] [ESTRATEGIA_PDFS.md](ESTRATEGIA_PDFS.md)

---

## 🆘 ¿No encuentras lo que buscas?

### Por Pregunta

**¿Cómo subo el proyecto a GitHub?**
→ [INICIO_GIT.md](INICIO_GIT.md)

**¿Cómo funciona el sistema de ramas?**
→ [GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)

**¿Dónde están los archivos de contenido?**
→ [ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)

**¿Cómo configuro Quartz?**
→ [QUARTZ_CONFIG.md](QUARTZ_CONFIG.md)

**¿Cómo hago deploy?**
→ [GUIA_DEPLOY.md](GUIA_DEPLOY.md)

**¿Cómo agrego videos?**
→ [GUIA_VIDEOS.md](GUIA_VIDEOS.md)

**¿Cómo optimizo PDFs?**
→ [ESTRATEGIA_PDFS.md](ESTRATEGIA_PDFS.md)

**¿Qué comandos de Git necesito?**
→ [COMANDOS_GIT.md](COMANDOS_GIT.md)

**¿Cómo funciona todo en Windows?**
→ [NOTAS_WINDOWS.md](NOTAS_WINDOWS.md)

**¿Cuál es la visión general del proyecto?**
→ [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)

---

## 📊 Estadísticas de Documentación

- **Total de archivos de documentación**: 15
- **Scripts disponibles**: 32
- **Cobertura**: Git, Desarrollo, Deploy, Contenido, Media
- **Idiomas**: Español
- **Última actualización**: 2024-10-20

---

## 🎉 Consejos

1. **No intentes leer todo de una vez** - Usa las rutas de aprendizaje
2. **Empieza por INICIO_GIT.md** si es tu primera vez
3. **Usa COMANDOS_GIT.md como referencia** mientras trabajas
4. **Los scripts .bat automatizan mucho** - úsalos
5. **Pregunta si algo no está claro** - mejoramos la documentación

---

**¿Listo para empezar?** 🚀

👉 Ve a **[INICIO_GIT.md](INICIO_GIT.md)** si quieres configurar Git

👉 Ve a **[README.md](README.md)** si quieres entender el proyecto

👉 Ve a **[COMIENZA_AQUI.md](COMIENZA_AQUI.md)** si no sabes por dónde empezar


