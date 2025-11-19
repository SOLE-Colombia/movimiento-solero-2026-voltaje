# 🚀 Inicio Rápido - Git para Organización

## ⚡ Resumen Ultra-Rápido

### ¿Qué vas a subir?
- ✅ **content/** - Contenido procesado (~3 MB)
- ✅ **public/** - PDFs y videos (~30 MB)  
- ✅ **quartz/** - Código de Quartz (sin node_modules)
- ✅ **scripts/** - Scripts de migración
- ✅ **Archivos .md** - Documentación
- ❌ **temp/** - NO (temporal)
- ❌ **reports/** - NO (reportes generados)
- ❌ **node_modules/** - NO (se instala con npm)

**Tamaño total: ~35-40 MB** ✅ Perfecto para GitHub

---

## 🎯 Tus 3 Ramas

```
┌─────────────────────────────────────┐
│  content-editing                    │  ← Redactores trabajan aquí
│  (Contenido, imágenes, metadata)    │
└──────────────┬──────────────────────┘
               │ PR
               ↓
┌─────────────────────────────────────┐
│  development                        │  ← Desarrolladores trabajan aquí
│  (Código Quartz, componentes)       │
└──────────────┬──────────────────────┘
               │ PR
               ↓
┌─────────────────────────────────────┐
│  main                               │  ← Deploy automático
│  (Producción, GitHub Pages)         │
└─────────────────────────────────────┘
```

---

## 🏃 Inicio en 3 Pasos

### 1️⃣ Crea el Repositorio en GitHub

1. Ve a tu **Organización en GitHub**
2. Click **"New repository"**
3. Nombre: `sole-voltaje`
4. ❌ NO inicializar con README
5. Click **"Create repository"**

### 2️⃣ Ejecuta el Script Automático

```cmd
cd "c:\Users\David Vega\Downloads\Sole"
scripts\init-git-organization.bat
```

El script hace **TODO automáticamente**:
- ✅ Inicializa Git
- ✅ Configura remote
- ✅ Sube código a main
- ✅ Crea rama development
- ✅ Crea rama content-editing

### 3️⃣ Configura en GitHub (5 minutos)

#### Proteger Ramas
1. **Settings** → **Branches** → **Add rule**
2. Para `main`: 
   - ✅ Require pull request
   - ✅ Require 1 approval
3. Para `development`:
   - ✅ Require pull request

#### Activar GitHub Pages
1. **Settings** → **Pages**
2. **Source**: GitHub Actions
3. ✅ Guardar

¡**LISTO!** 🎉

---

## 📝 Trabajo Diario

### Si eres Redactor

```cmd
# Cambiar a rama de contenido
scripts\switch-branch.bat
# Seleccionar: 1 (content-editing)

# Editar archivos en:
# - content/es/
# - content/en/
# - content/assets/images/

# Guardar y subir
git add .
git commit -m "📝 Actualizar contenido sobre [tema]"
git push

# Crear PR en GitHub → development
```

### Si eres Desarrollador

```cmd
# Cambiar a rama de desarrollo
scripts\switch-branch.bat
# Seleccionar: 2 (development)

# Mergear contenido nuevo
git merge content-editing

# Trabajar en:
# - quartz/components/
# - quartz/quartz.config.ts
# - quartz/styles/

# Probar localmente
cd quartz
npm run dev

# Guardar y subir
git add .
git commit -m "✨ Nuevo feature: [descripción]"
git push

# Crear PR en GitHub → main
```

---

## 🛠️ Scripts Útiles

| Script | Qué hace |
|--------|----------|
| `init-git-organization.bat` | Configuración inicial completa |
| `switch-branch.bat` | Cambiar entre ramas fácilmente |
| `dev.bat` | Ejecutar Quartz en desarrollo local |
| `build.bat` | Build de producción local |

---

## 🆘 Problemas Comunes

### "remote origin already exists"
```cmd
git remote remove origin
git remote add origin https://github.com/TU-ORG/sole-voltaje.git
```

### "authentication failed"
- Usa **Personal Access Token** en vez de contraseña
- O configura **SSH keys**

### "node_modules se está subiendo"
- Verifica que está en `.gitignore`
- Ejecuta: `git rm -r --cached quartz/node_modules`

### Build falla en GitHub Actions
- Ve a **Actions** tab en GitHub
- Revisa los logs del error
- Normalmente es problema de dependencias

---

## 📚 Documentación Completa

Para más detalles, lee:
- **GUIA_GIT_ORGANIZACION.md** - Guía completa y detallada
- **README.md** - Documentación del proyecto
- **QUARTZ_CONFIG.md** - Configuración de Quartz

---

## ✅ Checklist Post-Setup

Después de ejecutar `init-git-organization.bat`:

- [ ] Verificar en GitHub que las 3 ramas existen
- [ ] Configurar protección de ramas (main y development)
- [ ] Activar GitHub Pages
- [ ] Ver que el workflow de deploy está en Actions
- [ ] Agregar colaboradores al repositorio
- [ ] Probar hacer un cambio en content-editing
- [ ] Probar crear un PR
- [ ] Verificar que el deploy automático funciona

---

## 🎉 ¡Ya Estás Listo!

Con esta configuración tienes:
- ✅ Código en GitHub con sistema de versiones
- ✅ 3 ramas organizadas por tipo de trabajo
- ✅ Deploy automático a GitHub Pages
- ✅ Protección de producción
- ✅ Flujo de trabajo claro

**¡Ahora todo el equipo puede colaborar sin problemas!** 🚀

---

**Tiempo estimado de setup**: 15-20 minutos  
**Dificultad**: Fácil (todo automatizado)


