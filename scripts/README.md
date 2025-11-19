# Scripts de SOLE Voltaje

Scripts para gestión y desarrollo del proyecto Voltaje.

## 🐧 Scripts para Linux/Mac

### Desarrollo

- **`dev-local.sh`** - Inicia desarrollo local con Docker
  ```bash
  ./scripts/dev-local.sh
  ```

- **`dev.sh`** - Desarrollo con Quartz en modo watch
  ```bash
  ./scripts/dev.sh
  ```

- **`build.sh`** - Construir el sitio estático
  ```bash
  ./scripts/build.sh
  ```

### Docker

- **`docker-dev.sh`** - Levantar entorno Docker para desarrollo
  ```bash
  ./scripts/docker-dev.sh
  ```

- **`docker-build.sh`** - Construir la imagen Docker
  ```bash
  ./scripts/docker-build.sh
  ```

- **`docker-entrypoint.sh`** - Script de entrada para contenedores (automático)

### Sincronización

- **`sync-content-to-quartz.sh`** - Sincronizar contenido al directorio de Quartz
  ```bash
  ./scripts/sync-content-to-quartz.sh
  ```

- **`sync-to-public.sh`** - Sincronizar contenido al servidor de producción
  ```bash
  ./scripts/sync-to-public.sh
  ```

### Migración y Procesamiento

Scripts Python para procesar contenido exportado de Notion:

- **`01-inventory.py`** - Crear inventario de archivos
- **`02-analyze-csv.py`** - Analizar CSV de inventario
- **`03-slug-mapper.py`** - Generar mapeo de slugs
- **`04-clean-markdown.py`** - Limpiar archivos markdown
- **`05-generate-frontmatter.py`** - Generar frontmatter
- **`06-split-languages.py`** - Separar idiomas
- **`07-optimize-images.py`** - Optimizar imágenes
- **`08-optimize-videos.py`** - Optimizar videos
- **`09-manage-pdfs.py`** - Gestionar PDFs
- **`10-validate.py`** - Validar contenido
- **`11-convert-videos-to-webm.py`** - Convertir videos a WebM
- **`12-optimize-pdfs.py`** - Optimizar PDFs
- **`13-analyze-pdf-duplicates.py`** - Analizar PDFs duplicados
- **`14-remove-duplicate-pdfs.py`** - Eliminar PDFs duplicados
- **`15-cleanup-pdf-exports.py`** - Limpiar exportaciones de PDF
- **`16-optimize-image-folders.py`** - Optimizar carpetas de imágenes

### Utilidades

- **`fix_frontmatter.py`** - Corregir frontmatter de archivos del conceptorio
  ```bash
  python3 scripts/fix_frontmatter.py
  ```

- **`fix-image-paths.py`** - Corregir rutas de imágenes
- **`clean-markdown.py`** - Limpiar formato de markdown

## 🔧 Pipeline de Migración

Para procesar contenido nuevo de Notion, ejecuta los scripts en orden:

```bash
cd /workspace
python3 scripts/01-inventory.py
python3 scripts/02-analyze-csv.py
python3 scripts/03-slug-mapper.py
python3 scripts/04-clean-markdown.py
python3 scripts/05-generate-frontmatter.py
python3 scripts/06-split-languages.py
python3 scripts/07-optimize-images.py
# ... continuar según necesidades
```

O usa el script todo-en-uno:

```bash
./scripts/run-all-migrations.sh
```

## 📝 Notas

- Los scripts `.bat` (Windows) han sido eliminados del repositorio
- Todos los scripts están configurados con permisos de ejecución
- Los line endings están en formato Unix (LF)
- Para desarrollo, usa el contenedor Docker que ya incluye todas las dependencias

## 🐳 Uso con Docker (Recomendado)

Desde VS Code con Dev Containers:

1. Abre el proyecto en VS Code
2. Usa la paleta de comandos: "Dev Containers: Reopen in Container"
3. El contenedor se configurará automáticamente
4. Todos los scripts estarán disponibles dentro del contenedor

## 🔑 Configuración de Git

La configuración de Git se hace automáticamente al iniciar el contenedor:
- Usuario: `danvegamo_sole`
- Email: `d_vega@davidvega.org`

Para cambiar estos valores, edita `.devcontainer/devcontainer.json` en la línea `postStartCommand`.

