# 🚀 Guía Completa de Deploy - SOLE Voltaje

## 📋 Índice

1. [Copiar contenido a Quartz](#1-copiar-contenido-a-quartz)
2. [Configurar Quartz](#2-configurar-quartz)
3. [Probar localmente](#3-probar-localmente)
4. [Preparar para GitHub](#4-preparar-para-github)
5. [Subir a GitHub](#5-subir-a-github)
6. [Configurar GitHub Pages](#6-configurar-github-pages)
7. [Configurar Docker](#7-configurar-docker)
8. [Workflow de trabajo](#8-workflow-de-trabajo)

---

## 1. Copiar contenido a Quartz

### Paso 1.1: Verificar estructura de Quartz

```cmd
cd quartz
dir
```

Deberías ver:
- `content/` (carpeta vacía o con docs de Quartz)
- `quartz/` (código de Quartz)
- `quartz.config.ts`
- `quartz.layout.ts`

### Paso 1.2: Hacer backup del contenido original de Quartz (opcional)

```cmd
REM Solo si quieres conservar los docs originales de Quartz
mkdir ..\quartz-original-backup
xcopy /E /I content ..\quartz-original-backup\content
```

### Paso 1.3: Copiar contenido optimizado

```cmd
REM Estar en la carpeta quartz
cd C:\Users\David Vega\Downloads\Sole\quartz

REM Eliminar contenido anterior
rmdir /S /Q content
rmdir /S /Q public

REM Copiar el nuevo contenido
xcopy /E /I /Y ..\content content
xcopy /E /I /Y ..\public public

REM Verificar
dir content
dir public
```

Deberías ver:
- `content/assets/` (con imágenes optimizadas)
- `content/es/` (contenido en español)
- `content/en/` (contenido en inglés)
- `public/downloads/` (PDFs)
- `public/videos/` (videos WebM)

---

## 2. Configurar Quartz

### Paso 2.1: Copiar archivos de configuración

```cmd
REM Copiar configuraciones personalizadas
copy /Y ..\quartz.config.ts quartz.config.ts
copy /Y ..\quartz.layout.ts quartz.layout.ts

REM Copiar componentes personalizados (si los tienes)
xcopy /E /I /Y ..\components components
```

### Paso 2.2: Instalar dependencias (si aún no lo hiciste)

```cmd
npm install
```

### Paso 2.3: Editar quartz.config.ts

Abre `quartz.config.ts` y verifica/actualiza:

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "SOLE Voltaje",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-XXXXXXXXXX", // Tu ID de Google Analytics
    },
    locale: "es-CO", // Español de Colombia
    baseUrl: "tu-usuario.github.io/sole-voltaje", // Tu URL de GitHub Pages
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}
```

---

## 3. Probar localmente

### Paso 3.1: Iniciar servidor de desarrollo

```cmd
npx quartz build --serve
```

O usando el script que ya tienes:

```cmd
cd ..
scripts\dev.bat
```

### Paso 3.2: Abrir en navegador

Visita: `http://localhost:8080`

### Paso 3.3: Verificar

✅ Verifica que:
- [ ] Las imágenes se cargan correctamente
- [ ] Los enlaces entre páginas funcionan
- [ ] Los videos se reproducen
- [ ] Los PDFs son descargables
- [ ] La navegación entre idiomas funciona
- [ ] El diseño se ve bien en móvil y escritorio

### Paso 3.4: Construir versión de producción

```cmd
npx quartz build
```

Esto genera la carpeta `public/` con el sitio estático.

---

## 4. Preparar para GitHub

### Paso 4.1: Crear estructura de repositorio

```cmd
REM Volver a la carpeta raíz de Sole
cd C:\Users\David Vega\Downloads\Sole

REM Crear .gitignore si no existe
```

Crea/edita `.gitignore`:

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/

# Temporales y reportes
temp/
reports/
*.log

# Node modules
node_modules/
quartz/node_modules/
quartz/.quartz-cache/
quartz/public/

# Sistema
.DS_Store
Thumbs.db
*.swp
*.swo
*~

# IDEs
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Builds
dist/
build/
*.egg-info/

# Env
.env
.env.local
```

### Paso 4.2: Crear README principal

Ya tienes `README.md`, asegúrate que esté actualizado con:
- Descripción del proyecto
- Instrucciones de instalación
- Cómo contribuir
- Licencia

---

## 5. Subir a GitHub

### Paso 5.1: Inicializar Git (si no está inicializado)

```cmd
cd C:\Users\David Vega\Downloads\Sole

REM Verificar si ya está inicializado
git status

REM Si no está inicializado:
git init
```

### Paso 5.2: Configurar Git (primera vez)

```cmd
git config user.name "Tu Nombre"
git config user.email "tu-email@ejemplo.com"
```

### Paso 5.3: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `sole-voltaje`
3. Descripción: "SOLE Voltaje - Plataforma educativa bilingüe sobre conectividad"
4. Público o Privado (tu elección)
5. **NO** marcar "Add README" (ya lo tienes)
6. Click en "Create repository"

### Paso 5.4: Conectar con GitHub

```cmd
REM Reemplaza TU-USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/sole-voltaje.git

REM Verificar
git remote -v
```

### Paso 5.5: Preparar primer commit

```cmd
REM Agregar todos los archivos
git add .

REM Ver qué se va a commitear
git status

REM Crear commit
git commit -m "feat: Migración inicial SOLE Voltaje de Notion a Quartz v4

- Estructura bilingüe (es/en)
- Imágenes optimizadas a WebP
- Videos en formato WebM
- PDFs organizados
- Scripts de migración completos
- Configuración de Quartz personalizada
- Docker configurado
- CI/CD con GitHub Actions"

REM Subir a GitHub
git branch -M main
git push -u origin main
```

### Paso 5.6: Verificar en GitHub

Ve a `https://github.com/TU-USUARIO/sole-voltaje` y verifica que todo se subió correctamente.

---

## 6. Configurar GitHub Pages

### Opción A: GitHub Actions (Recomendado)

Ya tienes `.github/workflows/deploy.yml` configurado.

#### Paso 6.1: Habilitar GitHub Pages

1. En tu repositorio, ve a **Settings** → **Pages**
2. En "Source", selecciona **GitHub Actions**
3. Guardar

#### Paso 6.2: Activar permisos de workflow

1. Ve a **Settings** → **Actions** → **General**
2. En "Workflow permissions", selecciona **Read and write permissions**
3. Marcar "Allow GitHub Actions to create and approve pull requests"
4. Guardar

#### Paso 6.3: Ejecutar el workflow

El workflow se ejecutará automáticamente en cada push a `main`. O puedes:

1. Ir a **Actions**
2. Seleccionar "Deploy to GitHub Pages"
3. Click en "Run workflow"

#### Paso 6.4: Verificar deploy

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/sole-voltaje/
```

### Opción B: Deploy manual desde Quartz

```cmd
cd quartz
npx quartz build
npx quartz deploy
```

---

## 7. Configurar Docker

### Paso 7.1: Verificar archivos Docker

Ya tienes:
- `Dockerfile` (en raíz)
- `docker-compose.yml`
- `quartz/Dockerfile`

### Paso 7.2: Construir imagen Docker

```cmd
REM Desde la raíz del proyecto
docker-compose build
```

### Paso 7.3: Ejecutar con Docker

```cmd
REM Desarrollo (con hot-reload)
docker-compose up dev

REM O usar el script
scripts\docker-dev.bat
```

Visita: `http://localhost:8080`

### Paso 7.4: Construir para producción

```cmd
REM Producción
docker-compose up build

REM O usar el script
scripts\docker-build.bat
```

### Paso 7.5: Subir imagen a Docker Hub (opcional)

```cmd
REM Login
docker login

REM Tag
docker tag sole-voltaje TU-USUARIO/sole-voltaje:latest

REM Push
docker push TU-USUARIO/sole-voltaje:latest
```

---

## 8. Workflow de trabajo

### Desarrollo diario

```cmd
# 1. Actualizar desde GitHub
git pull origin main

# 2. Hacer cambios en content/

# 3. Probar localmente
scripts\dev.bat

# 4. Agregar cambios
git add .

# 5. Commit
git commit -m "feat: Descripción del cambio"

# 6. Subir a GitHub
git push origin main

# 7. El deploy se hace automáticamente
```

### Crear nuevo contenido

```cmd
# 1. Crear archivo markdown en content/es/ o content/en/
# 2. Agregar frontmatter
# 3. Probar localmente
# 4. Commit y push
```

### Actualizar imágenes

```cmd
# 1. Agregar imagen a content/assets/images/
# 2. Optimizar (o usar script de optimización)
# 3. Referenciar en markdown
# 4. Commit y push
```

### Branches para features

```cmd
# 1. Crear branch
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios
# ... editar archivos ...

# 3. Commit
git add .
git commit -m "feat: Nueva funcionalidad"

# 4. Push
git push origin feature/nueva-funcionalidad

# 5. Crear Pull Request en GitHub
# 6. Revisar y merge
```

### Sincronizar con equipo

```cmd
# Antes de empezar a trabajar
git pull origin main

# Después de hacer cambios
git add .
git commit -m "mensaje descriptivo"
git push origin main
```

---

## 🎯 Checklist Final

### Configuración Inicial
- [ ] Contenido copiado a `quartz/content/`
- [ ] Archivos públicos copiados a `quartz/public/`
- [ ] `quartz.config.ts` configurado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Prueba local exitosa (`http://localhost:8080`)

### GitHub
- [ ] Repositorio creado en GitHub
- [ ] Git inicializado localmente
- [ ] Remote configurado
- [ ] Primer commit y push completado
- [ ] `.gitignore` configurado correctamente

### GitHub Pages
- [ ] GitHub Pages habilitado
- [ ] GitHub Actions configurado
- [ ] Permisos de workflow configurados
- [ ] Primer deploy exitoso
- [ ] Sitio accesible en `https://TU-USUARIO.github.io/sole-voltaje/`

### Docker
- [ ] Dockerfile verificado
- [ ] Docker Compose configurado
- [ ] Imagen construida exitosamente
- [ ] Contenedor ejecutándose correctamente
- [ ] (Opcional) Imagen subida a Docker Hub

### Verificación del sitio
- [ ] Todas las páginas se cargan
- [ ] Imágenes optimizadas funcionan
- [ ] Videos se reproducen
- [ ] PDFs descargables
- [ ] Navegación funciona
- [ ] SEO configurado
- [ ] Responsive design funciona
- [ ] Ambos idiomas (es/en) funcionan

---

## 🆘 Solución de Problemas

### Error: "remote origin already exists"

```cmd
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/sole-voltaje.git
```

### Error: Build falla en GitHub Actions

1. Revisa los logs en la pestaña "Actions"
2. Verifica que `quartz.config.ts` tenga la `baseUrl` correcta
3. Asegúrate de que los permisos de workflow estén habilitados

### Error: Imágenes no se cargan

1. Verifica rutas en markdown: `/assets/images/...`
2. Asegúrate que las carpetas estén en `content/assets/`
3. Revisa mayúsculas/minúsculas en nombres de archivos

### Error: Docker no construye

```cmd
# Limpiar caché
docker system prune -a

# Reconstruir
docker-compose build --no-cache
```

---

## 📚 Recursos

- **Quartz Docs**: https://quartz.jzhao.xyz/
- **GitHub Pages**: https://pages.github.com/
- **Docker Docs**: https://docs.docker.com/
- **Git Docs**: https://git-scm.com/doc

---

## 🎉 ¡Listo!

Ahora tienes:
✅ Proyecto en GitHub con control de versiones  
✅ Deploy automático con GitHub Pages  
✅ Desarrollo local con Docker  
✅ Workflow optimizado para trabajo colaborativo  
✅ Copias de seguridad en la nube  

**¡A trabajar!** 🚀

---

**Última actualización**: Octubre 14, 2025  
**SOLE Colombia** - Fundación SOLE Colombia  
**Licencia**: Creative Commons BY-SA 4.0




