# 🚀 Guía Git para Organización - SOLE Voltaje

## 📊 Análisis de Carpetas del Proyecto

### ✅ CARPETAS QUE DEBES SUBIR A GITHUB

#### 1. **content/** (2.5MB aprox)
- ✅ Contenido en español e inglés procesado
- ✅ Imágenes optimizadas en WebP
- ✅ **Rama principal**: `content-editing`
- 📝 Contenido listo para producción

#### 2. **public/** (20-30MB aprox)
- ✅ PDFs descargables (4 archivos)
- ✅ Videos en formato WebM (51 archivos)
- ✅ **Rama principal**: `content-editing`
- 📝 Assets estáticos del sitio

#### 3. **quartz/** (EXCLUYENDO `node_modules/` y `public/`)
- ✅ Código fuente de Quartz customizado
- ✅ Componentes personalizados (`components/`)
- ✅ Configuración (`quartz.config.ts`, `quartz.layout.ts`)
- ✅ Estilos personalizados (`styles/`)
- ✅ `package.json` y `package-lock.json`
- ✅ **Rama principal**: `development`
- 📝 Core del sitio web

#### 4. **scripts/**
- ✅ Scripts de migración (Python)
- ✅ Scripts de build y deploy
- ✅ **Rama principal**: `development`
- 📝 Herramientas de automatización

#### 5. **Archivos de configuración en raíz**
- ✅ `README.md` - Documentación principal
- ✅ `requirements.txt` - Dependencias Python
- ✅ `docker-compose.yml` - Configuración Docker
- ✅ `Dockerfile` - Imagen Docker
- ✅ `.gitignore` - Reglas de Git
- ✅ Documentación (.md files)
- ✅ **Rama principal**: `development`

### ❌ CARPETAS QUE NO DEBES SUBIR

#### 1. **temp/** (~500MB)
- ❌ Archivos temporales de migración
- ❌ Ya está en `.gitignore`
- 🗑️ Solo para procesamiento local

#### 2. **reports/** (~5MB)
- ❌ Reportes generados automáticamente
- ❌ Ya está en `.gitignore`
- 🗑️ Se regeneran cuando ejecutas scripts

#### 3. **quartz/node_modules/** (~200MB)
- ❌ Dependencias de Node.js
- ❌ Ya está en `.gitignore`
- 📦 Se instalan con `npm install`

#### 4. **quartz/public/** (build output)
- ❌ Sitio generado (output de build)
- ❌ Ya está en `.gitignore`
- 🏗️ Se genera automáticamente en CI/CD

#### 5. **Privado y Compartido/** (si existe)
- ❌ Exportación original de Notion
- ❌ Ya está en `.gitignore`
- 🔒 Datos sensibles/originales

---

## 🌳 Estrategia de 3 Ramas

### Estructura de Ramas

```
main (producción)
├── development (desarrollo de Quartz)
└── content-editing (redacción y contenido)
```

### 1️⃣ Rama `content-editing` - Redacción y Contenido

**Propósito**: Trabajo de redactores, editores y creadores de contenido

**Qué incluye**:
- Archivos `.md` en `content/`
- Imágenes en `content/assets/images/`
- PDFs en `public/downloads/`
- Videos en `public/videos/`
- Metadata y frontmatter

**Flujo de trabajo**:
```bash
# Los redactores trabajan aquí
content-editing
  ├── Editar archivos .md
  ├── Agregar/optimizar imágenes
  ├── Actualizar metadata
  └── PR → development (para revisión)
```

**Quién trabaja aquí**:
- ✍️ Redactores
- 📸 Editores de imágenes
- 📊 Gestores de metadata
- 🌍 Traductores

**Reglas**:
- ✅ Solo modificar archivos de contenido
- ✅ No tocar código de Quartz
- ✅ PR obligatorio antes de merge a `development`
- ✅ Revisión de calidad de contenido

---

### 2️⃣ Rama `development` - Desarrollo de Quartz

**Propósito**: Desarrollo de la página web, componentes y configuración

**Qué incluye**:
- Código de `quartz/` (TypeScript, React)
- Componentes personalizados
- Configuración de Quartz
- Estilos y temas
- Scripts de build
- Integración de contenido

**Flujo de trabajo**:
```bash
# Los desarrolladores trabajan aquí
development
  ├── Merge desde content-editing (contenido nuevo)
  ├── Desarrollar componentes
  ├── Ajustar configuración
  ├── Testing local
  └── PR → main (para deploy)
```

**Quién trabaja aquí**:
- 👨‍💻 Desarrolladores web
- 🎨 Diseñadores UI/UX
- ⚙️ DevOps
- 🧪 Testers

**Reglas**:
- ✅ Recibir contenido desde `content-editing`
- ✅ Testing local obligatorio
- ✅ PR con revisión de código antes de merge a `main`
- ✅ CI/CD checks deben pasar

---

### 3️⃣ Rama `main` - Producción Automática

**Propósito**: Rama de producción con deploy automático

**Qué incluye**:
- Código estable y probado
- Contenido aprobado
- Deploy automático a GitHub Pages
- Integración con otros repositorios

**Flujo de trabajo**:
```bash
# Deploy automático
main
  ├── Merge desde development (aprobado)
  ├── GitHub Actions ejecuta build
  ├── Deploy a GitHub Pages
  └── Webhook a otros repos (opcional)
```

**Características**:
- 🔒 **Protegida**: No se puede hacer push directo
- 🤖 **Automática**: CI/CD con GitHub Actions
- 🌐 **Producción**: Conectada al dominio
- 🔄 **Sincronizada**: Puede disparar webhooks a otros repos

**Reglas**:
- ❌ NO push directo
- ✅ Solo merge desde `development`
- ✅ PR con múltiples revisores
- ✅ Tests automáticos deben pasar
- ✅ Deploy automático activado

---

## 📋 Plan de Implementación Paso a Paso

### Paso 1: Preparar el Repositorio Local

```bash
# 1. Verificar que estás en la carpeta correcta
cd "c:\Users\David Vega\Downloads\Sole"

# 2. Verificar archivos que se van a subir
git status

# 3. Si no existe git, inicializar
git init
```

### Paso 2: Configurar Git (Si es primera vez)

```bash
git config user.name "Tu Nombre"
git config user.email "tu-email@example.com"
```

### Paso 3: Crear el Repositorio en GitHub

1. Ve a tu **Organización en GitHub**
2. Click en **"New repository"**
3. Nombre sugerido: `sole-voltaje`
4. Descripción: "Sitio web estático bilingüe de SOLE Voltaje"
5. **Público** o **Privado** (según preferencia)
6. ❌ NO inicializar con README (ya tienes uno)
7. ❌ NO agregar .gitignore (ya tienes uno)
8. Click en **"Create repository"**

### Paso 4: Conectar Local con GitHub

```bash
# Reemplaza TU-ORGANIZACION con el nombre real
git remote add origin https://github.com/TU-ORGANIZACION/sole-voltaje.git

# Verificar
git remote -v
```

### Paso 5: Primera Subida (Rama Main)

```bash
# 1. Agregar todos los archivos
git add .

# 2. Revisar qué se va a subir
git status

# 3. Hacer primer commit
git commit -m "🚀 Initial commit: Migración completa de SOLE Voltaje desde Notion a Quartz v4"

# 4. Subir a GitHub
git branch -M main
git push -u origin main
```

### Paso 6: Crear Rama de Desarrollo

```bash
# 1. Crear y cambiar a rama development
git checkout -b development

# 2. Subir rama a GitHub
git push -u origin development
```

### Paso 7: Crear Rama de Contenido

```bash
# 1. Crear desde development
git checkout -b content-editing

# 2. Subir rama a GitHub
git push -u origin content-editing
```

### Paso 8: Configurar Protección de Ramas en GitHub

1. Ve a **Settings** → **Branches** en tu repo
2. Click en **"Add rule"** para `main`:
   - ✅ Require pull request before merging
   - ✅ Require approvals (al menos 1)
   - ✅ Require status checks to pass
   - ✅ Do not allow bypassing the above settings

3. Click en **"Add rule"** para `development`:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass

---

## 🤖 Configurar GitHub Actions para Deploy Automático

### Crear Workflow de Deploy

Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy SOLE Voltaje to GitHub Pages

on:
  push:
    branches:
      - main  # Solo deploy desde main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd quartz
          npm ci
          
      - name: Build Quartz
        run: |
          cd quartz
          npx quartz build
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './quartz/public'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Activar GitHub Pages

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona **"GitHub Actions"**
3. Guarda los cambios

---

## 🔄 Flujo de Trabajo Diario

### Para Redactores (Rama content-editing)

```bash
# 1. Asegurarte de estar en content-editing
git checkout content-editing

# 2. Actualizar con cambios remotos
git pull origin content-editing

# 3. Editar archivos de contenido
# (editar .md, agregar imágenes, etc.)

# 4. Guardar cambios
git add content/ public/
git commit -m "📝 Actualizar contenido: [descripción breve]"

# 5. Subir a GitHub
git push origin content-editing

# 6. Crear Pull Request a development en GitHub
# (Interface web de GitHub)
```

### Para Desarrolladores (Rama development)

```bash
# 1. Cambiar a development
git checkout development

# 2. Actualizar con cambios remotos
git pull origin development

# 3. Merge contenido nuevo (si hay PR aprobado)
git merge content-editing

# 4. Trabajar en código de Quartz
# (editar componentes, configuración, estilos)

# 5. Testing local
npm run dev  # Probar localmente

# 6. Guardar cambios
git add quartz/ scripts/
git commit -m "✨ Nuevo feature: [descripción]"

# 7. Subir a GitHub
git push origin development

# 8. Crear Pull Request a main cuando esté listo
```

### Para Deploy a Producción

```bash
# 1. Crear PR desde development → main en GitHub
# 2. Revisión de código
# 3. Aprobar PR
# 4. Merge a main
# 5. GitHub Actions automáticamente:
#    - Ejecuta build
#    - Deploya a GitHub Pages
#    - Sitio disponible en tu dominio
```

---

## 📊 Resumen de Archivos a Subir

| Carpeta/Archivo | Tamaño Aprox | Rama Principal | Subir a GitHub |
|-----------------|--------------|----------------|----------------|
| `content/` | 2-3 MB | content-editing | ✅ SÍ |
| `public/` | 20-30 MB | content-editing | ✅ SÍ |
| `quartz/content/` | 2-3 MB | development | ✅ SÍ |
| `quartz/quartz/` | 1-2 MB | development | ✅ SÍ |
| `quartz/components/` | <1 MB | development | ✅ SÍ |
| `quartz/package.json` | <1 KB | development | ✅ SÍ |
| `quartz/node_modules/` | ~200 MB | - | ❌ NO (.gitignore) |
| `quartz/public/` | varies | - | ❌ NO (build output) |
| `scripts/` | <1 MB | development | ✅ SÍ |
| `temp/` | ~500 MB | - | ❌ NO (.gitignore) |
| `reports/` | ~5 MB | - | ❌ NO (.gitignore) |
| Docs (.md) | <1 MB | development | ✅ SÍ |
| `requirements.txt` | <1 KB | development | ✅ SÍ |
| `Dockerfile` | <1 KB | development | ✅ SÍ |
| `docker-compose.yml` | <1 KB | development | ✅ SÍ |

**Tamaño total a subir**: ~30-40 MB (muy manejable)  
**Archivos excluidos**: ~700 MB (se ignoran o regeneran)

---

## 🔐 Integración con Otros Repositorios

Si quieres que `main` se sincronice con otros repos:

### Opción 1: GitHub Webhooks

1. Ve a **Settings** → **Webhooks** en el repo principal
2. **Add webhook**
3. URL: `https://api.github.com/repos/OTRA-ORG/otro-repo/dispatches`
4. Content type: `application/json`
5. Secret: (crea un token secreto)
6. Eventos: `push` en rama `main`

### Opción 2: GitHub Actions con Repository Dispatch

Agregar al workflow `deploy.yml`:

```yaml
      - name: Trigger other repos
        run: |
          curl -X POST \
            -H "Authorization: token ${{ secrets.GH_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/OTRA-ORG/otro-repo/dispatches \
            -d '{"event_type":"deploy-trigger"}'
```

---

## ✅ Checklist Final

### Antes de Subir

- [ ] Verificar que `.gitignore` es correcto
- [ ] Revisar que `temp/` y `reports/` están excluidos
- [ ] Confirmar que `node_modules/` no se sube
- [ ] Verificar tamaño total (`git count-objects -vH`)
- [ ] Asegurarte de tener credenciales de GitHub configuradas

### Después de Subir

- [ ] Verificar que las 3 ramas existen en GitHub
- [ ] Configurar protección de ramas
- [ ] Crear workflow de GitHub Actions
- [ ] Activar GitHub Pages
- [ ] Probar que el sitio se despliega correctamente
- [ ] Configurar dominio personalizado (si aplica)
- [ ] Agregar colaboradores al repositorio
- [ ] Documentar flujo de trabajo para el equipo

---

## 🆘 Comandos Útiles

```bash
# Ver estado actual
git status

# Ver ramas locales
git branch

# Ver ramas remotas
git branch -r

# Cambiar de rama
git checkout nombre-rama

# Crear nueva rama
git checkout -b nueva-rama

# Ver tamaño del repo
git count-objects -vH

# Ver qué archivos se van a ignorar
git status --ignored

# Limpiar archivos no rastreados
git clean -fd

# Ver historial
git log --oneline --graph --all

# Deshacer último commit (sin perder cambios)
git reset --soft HEAD~1

# Ver diferencias antes de commit
git diff
```

---

## 📞 Soporte

Si tienes problemas durante el proceso:

1. **Error de tamaño**: GitHub tiene límite de 100MB por archivo
2. **Error de autenticación**: Usa Personal Access Token en vez de contraseña
3. **Conflictos de merge**: Usa `git mergetool` o resuelve manualmente
4. **Build falla en Actions**: Revisa logs en la pestaña "Actions" de GitHub

---

## 🎉 Resultado Final

Después de implementar esta estrategia tendrás:

✅ **3 ramas organizadas** con propósitos claros  
✅ **Contenido separado del código** para trabajo paralelo  
✅ **Deploy automático** desde main  
✅ **Protección de producción** con code review  
✅ **Tamaño optimizado** del repositorio  
✅ **Flujo de trabajo claro** para todo el equipo  
✅ **Integración con otros repos** (opcional)  

---

**¡Listo para subir tu proyecto! 🚀**


