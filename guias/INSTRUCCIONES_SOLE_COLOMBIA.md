# 🚀 Instrucciones para SOLE Colombia - dev_voltaje

## 📍 Información del Repositorio

- **Organización**: SOLE-Colombia
- **Repositorio**: dev_voltaje
- **URL SSH**: `git@github.com:SOLE-Colombia/dev_voltaje.git`
- **URL HTTPS**: `https://github.com/SOLE-Colombia/dev_voltaje.git`
- **URL Web**: https://github.com/SOLE-Colombia/dev_voltaje

---

## ⚡ INICIO MÁS RÁPIDO (5 minutos)

### Opción 1: Script Automático (RECOMENDADO) ⭐

```cmd
cd "c:\Users\David Vega\Downloads\Sole"
scripts\push-to-sole-colombia.bat
```

Este script:
- ✅ Configura el remote automáticamente
- ✅ Verifica tu conexión SSH
- ✅ Crea las 3 ramas (main, development, content-editing)
- ✅ Sube todo a GitHub
- ✅ Te guía paso a paso

### Opción 2: Manual (si prefieres control total)

```cmd
# 1. Inicializar Git
git init

# 2. Configurar remote (elige SSH o HTTPS)

# SSH (recomendado si tienes keys configuradas)
git remote add origin git@github.com:SOLE-Colombia/dev_voltaje.git

# O HTTPS (si no tienes SSH configurado)
git remote add origin https://github.com/SOLE-Colombia/dev_voltaje.git

# 3. Agregar archivos
git add .

# 4. Primer commit
git commit -m "🚀 Initial commit: SOLE Voltaje"

# 5. Subir a main
git branch -M main
git push -u origin main

# 6. Crear development
git checkout -b development
git push -u origin development

# 7. Crear content-editing
git checkout -b content-editing
git push -u origin content-editing

# 8. Volver a development
git checkout development
```

---

## 🔐 Configurar SSH (Recomendado)

Si aún no tienes SSH configurado:

### 1. Generar SSH Key

```bash
# En PowerShell o Git Bash
ssh-keygen -t ed25519 -C "tu-email@solecolombia.org"
```

Presiona Enter 3 veces (acepta ubicación por defecto y sin contraseña)

### 2. Copiar la Key

```bash
# Windows PowerShell
cat ~/.ssh/id_ed25519.pub | clip

# O ver en pantalla
cat ~/.ssh/id_ed25519.pub
```

### 3. Agregar en GitHub

1. Ve a: https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: `SOLE Voltaje - Windows PC`
4. Pega la key
5. Click **"Add SSH key"**

### 4. Verificar

```bash
ssh -T git@github.com
```

Deberías ver: `Hi SOLE-Colombia! You've successfully authenticated...`

---

## 📊 Qué se va a Subir

### ✅ Incluido (~40 MB)

```
content/              ~3 MB    584 archivos MD + 731 imágenes
public/               ~30 MB   4 PDFs + 51 videos
quartz/               ~5 MB    Código (sin node_modules)
scripts/              ~200 KB  Scripts de automatización
.github/workflows/    ~5 KB    GitHub Actions
Documentación         ~100 KB  Guías y README
```

### ❌ Excluido (en .gitignore)

```
temp/                 ~500 MB  Archivos temporales
reports/              ~5 MB    Reportes generados
node_modules/         ~200 MB  Dependencias (se instalan después)
Build outputs         Variable Se generan en deploy
```

---

## 🌳 Estructura de Ramas para SOLE Colombia

```
┌────────────────────────────────────────────────────┐
│ 📝 content-editing                                 │
│ ─────────────────────────────────────              │
│ Equipo: Redactores, Traductores                    │
│ Editan: Contenido en español/inglés               │
└─────────────────┬──────────────────────────────────┘
                  │ Pull Request
                  ↓
┌────────────────────────────────────────────────────┐
│ 👨‍💻 development                                    │
│ ─────────────────────────────────────              │
│ Equipo: Desarrolladores                            │
│ Editan: Código, componentes, configuración        │
└─────────────────┬──────────────────────────────────┘
                  │ Pull Request + Review
                  ↓
┌────────────────────────────────────────────────────┐
│ 🚀 main (PROTEGIDA)                                │
│ ─────────────────────────────────────              │
│ Deploy automático → voltaje.solecolombia.org      │
└────────────────────────────────────────────────────┘
```

---

## 🔒 Configuración Post-Push en GitHub

Después de subir el código, configura esto en GitHub:

### 1. Protección de Ramas (Importante)

Ve a: https://github.com/SOLE-Colombia/dev_voltaje/settings/branches

#### Para `main`:
```
✅ Require a pull request before merging
✅ Require approvals: 1
✅ Require status checks to pass before merging
✅ Do not allow bypassing the above settings
```

#### Para `development`:
```
✅ Require a pull request before merging
✅ Require status checks to pass before merging
```

### 2. GitHub Pages

Ve a: https://github.com/SOLE-Colombia/dev_voltaje/settings/pages

```
Source: GitHub Actions
```

✅ Guardar

Tu sitio estará en:
- https://sole-colombia.github.io/dev_voltaje/

### 3. Configurar Dominio Personalizado (Opcional)

En la misma página de GitHub Pages:

```
Custom domain: voltaje.solecolombia.org
✅ Enforce HTTPS
```

Luego configura el DNS:
```
Tipo: CNAME
Host: voltaje
Valor: sole-colombia.github.io
```

### 4. Agregar Colaboradores

Ve a: https://github.com/SOLE-Colombia/dev_voltaje/settings/access

Invita a:
- Redactores → Rol: Write (en content-editing)
- Desarrolladores → Rol: Maintain (en development)
- Administradores → Rol: Admin

---

## 👥 Flujo de Trabajo del Equipo

### Redactores (content-editing)

```cmd
# 1. Cambiar a rama de contenido
git checkout content-editing
git pull origin content-editing

# 2. Editar archivos
# - content/es/
# - content/en/

# 3. Guardar
git add .
git commit -m "📝 Actualizar artículo sobre conectividad"
git push

# 4. Crear PR en GitHub
# https://github.com/SOLE-Colombia/dev_voltaje/compare/content-editing
```

### Desarrolladores (development)

```cmd
# 1. Cambiar a development
git checkout development
git pull origin development

# 2. Mergear contenido (si hay PR aprobado)
git merge content-editing

# 3. Desarrollar
# - quartz/components/
# - quartz/quartz.config.ts

# 4. Probar
cd quartz
npm run dev

# 5. Guardar
git add .
git commit -m "✨ Mejorar búsqueda bilingüe"
git push

# 6. Crear PR a main
# https://github.com/SOLE-Colombia/dev_voltaje/compare/development
```

### Deploy a Producción

1. PR de development → main
2. Revisión de código
3. Aprobar y merge
4. GitHub Actions automáticamente:
   - Instala dependencias
   - Build con Quartz
   - Deploy a GitHub Pages
5. ✅ Sitio live en voltaje.solecolombia.org

---

## 🔄 Comandos Comunes

### Cambiar de Rama

```cmd
# Script interactivo
scripts\switch-branch.bat

# O manual
git checkout content-editing
git checkout development
git checkout main
```

### Actualizar tu Rama Local

```cmd
git pull origin nombre-rama
```

### Guardar Cambios

```cmd
git add .
git commit -m "Descripción del cambio"
git push
```

### Ver Estado

```cmd
git status
git log --oneline
git branch
```

---

## 🆘 Solución de Problemas

### "Permission denied (publickey)"

Tu SSH no está configurado. Opciones:

1. **Configurar SSH** (ver sección arriba)
2. **Cambiar a HTTPS**:
   ```cmd
   git remote set-url origin https://github.com/SOLE-Colombia/dev_voltaje.git
   ```

### "Authentication failed"

Para HTTPS, necesitas un **Personal Access Token**:

1. Ve a: https://github.com/settings/tokens
2. Generate new token (classic)
3. Permisos: `repo` (todos)
4. Copia el token
5. Úsalo como contraseña cuando Git te pida

### "Repository not found"

Verifica que:
- Eres miembro de la organización SOLE-Colombia
- Tienes acceso al repo dev_voltaje
- El nombre del repo es correcto

### "node_modules se está subiendo"

```cmd
git rm -r --cached quartz/node_modules
echo quartz/node_modules/ >> .gitignore
git add .gitignore
git commit -m "Fix .gitignore"
git push
```

---

## 📚 Documentación Completa

Para más detalles, consulta:

| Documento | Para qué |
|-----------|----------|
| **[LISTO_PARA_GITHUB.md](LISTO_PARA_GITHUB.md)** | Resumen completo |
| **[INICIO_GIT.md](INICIO_GIT.md)** | Guía rápida |
| **[GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md)** | Guía completa |
| **[COMANDOS_GIT.md](COMANDOS_GIT.md)** | Referencia de comandos |
| **[ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md)** | Arquitectura |

---

## ✅ Checklist

### Antes de Subir

- [ ] Tienes acceso a la organización SOLE-Colombia
- [ ] Tienes SSH configurado (o usarás HTTPS)
- [ ] Has revisado qué archivos se van a subir
- [ ] temp/ y reports/ están en .gitignore

### Después de Subir

- [ ] Verificar que las 3 ramas existen en GitHub
- [ ] Configurar protección de main
- [ ] Configurar protección de development
- [ ] Activar GitHub Pages
- [ ] Verificar que el workflow funciona
- [ ] Agregar colaboradores
- [ ] Configurar dominio (opcional)

---

## 🎯 Próximos Pasos

1. **Ejecutar**: `scripts\push-to-sole-colombia.bat`
2. **Verificar** en: https://github.com/SOLE-Colombia/dev_voltaje
3. **Configurar** protección de ramas
4. **Activar** GitHub Pages
5. **Invitar** colaboradores
6. **¡A trabajar!** 🚀

---

## 📞 Contacto

- **Organización**: SOLE Colombia
- **Web**: https://www.solecolombia.org/
- **Proyecto**: SOLE Voltaje
- **Repositorio**: https://github.com/SOLE-Colombia/dev_voltaje

---

**¡Listo para cambiar el mundo juntos!** ⚡


