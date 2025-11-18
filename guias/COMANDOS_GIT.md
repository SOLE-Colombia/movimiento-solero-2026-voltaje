# ⚡ Comandos Git - Referencia Rápida

## 🚀 Setup Inicial (Solo una vez)

```bash
# Ejecutar script automático (RECOMENDADO)
scripts\init-git-organization.bat

# O manual:
git init
git remote add origin https://github.com/TU-ORG/sole-voltaje.git
git add .
git commit -m "🚀 Initial commit"
git push -u origin main
git checkout -b development
git push -u origin development
git checkout -b content-editing
git push -u origin content-editing
```

---

## 🌿 Trabajo con Ramas

### Cambiar de Rama

```bash
# Script interactivo (FÁCIL)
scripts\switch-branch.bat

# O manual:
git checkout content-editing    # Para redacción
git checkout development        # Para desarrollo
git checkout main              # Para producción (cuidado)
```

### Ver Ramas

```bash
# Rama actual
git branch --show-current

# Todas las ramas locales
git branch

# Todas las ramas (local + remoto)
git branch -a

# Ramas remotas
git branch -r
```

### Crear Nueva Rama

```bash
# Crear y cambiar
git checkout -b nueva-rama

# Solo crear (sin cambiar)
git branch nueva-rama

# Subir a GitHub
git push -u origin nueva-rama
```

---

## 💾 Guardar Cambios

### Flujo Básico

```bash
# 1. Ver qué cambió
git status

# 2. Ver diferencias específicas
git diff

# 3. Agregar archivos
git add .                     # Todos los archivos
git add archivo.md           # Un archivo específico
git add carpeta/             # Una carpeta

# 4. Commit
git commit -m "📝 Descripción del cambio"

# 5. Subir a GitHub
git push
```

### Commits Descriptivos

```bash
# Contenido
git commit -m "📝 Agregar artículo sobre antenas WiFi"
git commit -m "✏️ Corregir typos en página de inicio"
git commit -m "🖼️ Optimizar imágenes de tutorial solar"
git commit -m "🌍 Traducir sección de glosario"

# Desarrollo
git commit -m "✨ Nuevo componente de búsqueda"
git commit -m "🐛 Fix error en navegación móvil"
git commit -m "💄 Mejorar estilos del header"
git commit -m "⚡ Optimizar carga de imágenes"
git commit -m "♻️ Refactorizar código de filtros"

# Configuración
git commit -m "🔧 Actualizar configuración de Quartz"
git commit -m "📦 Actualizar dependencias"
git commit -m "🚀 Mejorar workflow de deploy"
```

### Emojis de Commit

| Emoji | Código | Uso |
|-------|--------|-----|
| 📝 | `:memo:` | Contenido/documentación |
| ✨ | `:sparkles:` | Nueva funcionalidad |
| 🐛 | `:bug:` | Bug fix |
| 💄 | `:lipstick:` | Estilos/UI |
| ⚡ | `:zap:` | Performance |
| 🔧 | `:wrench:` | Configuración |
| 🚀 | `:rocket:` | Deploy |
| ♻️ | `:recycle:` | Refactoring |
| 🌍 | `:earth_americas:` | Traducción |
| 🖼️ | `:framed_picture:` | Imágenes |

---

## 🔄 Actualizar y Sincronizar

### Traer Cambios de GitHub

```bash
# Actualizar rama actual
git pull

# O más específico
git pull origin content-editing
git pull origin development
git pull origin main

# Solo descargar (sin merge)
git fetch
```

### Mergear Ramas

```bash
# Ejemplo: Traer contenido a development
git checkout development
git pull origin development
git merge content-editing

# Si hay conflictos, resolverlos y:
git add .
git commit -m "🔀 Merge content-editing"
git push
```

### Resolver Conflictos

```bash
# Ver archivos en conflicto
git status

# Editar archivos manualmente, luego:
git add archivo-resuelto.md
git commit -m "🔀 Resolver conflictos de merge"
git push
```

---

## 📊 Ver Información

### Estado y Cambios

```bash
# Estado actual
git status

# Cambios detallados
git diff

# Cambios de un archivo específico
git diff archivo.md

# Cambios entre ramas
git diff content-editing..development

# Ver archivos ignorados
git status --ignored
```

### Historial

```bash
# Últimos commits
git log

# Formato compacto
git log --oneline

# Con gráfico de ramas
git log --oneline --graph --all

# Últimos 10 commits
git log -10

# Historial de un archivo
git log --follow -- archivo.md

# Quién modificó cada línea
git blame archivo.md
```

### Información del Repo

```bash
# Remote configurado
git remote -v

# Tamaño del repo
git count-objects -vH

# Ramas y último commit
git branch -v

# Ver configuración
git config --list
```

---

## ↩️ Deshacer Cambios

### Antes de Commit

```bash
# Descartar cambios de un archivo
git checkout -- archivo.md

# Descartar todos los cambios
git checkout -- .

# Quitar del staging (mantener cambios)
git reset archivo.md
git reset  # todos los archivos

# Descartar TODO (¡cuidado!)
git reset --hard
```

### Después de Commit (Local)

```bash
# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartar cambios)
git reset --hard HEAD~1

# Deshacer últimos 3 commits
git reset --hard HEAD~3
```

### Después de Push (Remoto)

```bash
# Revertir un commit (crea commit nuevo)
git revert abc123

# Ver hash de commits
git log --oneline

# Revertir último commit
git revert HEAD
git push
```

---

## 🏷️ Tags y Releases

```bash
# Crear tag
git tag v1.0.0
git tag -a v1.0.0 -m "Primera versión estable"

# Subir tags
git push origin v1.0.0
git push --tags  # todos los tags

# Ver tags
git tag
git tag -l "v1.*"

# Eliminar tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## 🔍 Búsqueda

```bash
# Buscar en archivos
git grep "palabra clave"

# Buscar en commits
git log --all --grep="búsqueda"

# Buscar quién cambió algo
git log -S "código específico"

# Ver cambios de autor específico
git log --author="nombre"
```

---

## 🧹 Limpieza y Mantenimiento

```bash
# Limpiar archivos no rastreados
git clean -fd --dry-run  # ver qué se borraría
git clean -fd           # borrar

# Limpiar ramas mergeadas
git branch --merged
git branch -d rama-vieja

# Optimizar repo
git gc

# Verificar integridad
git fsck

# Ver archivos más grandes
git ls-files | xargs ls -lh | sort -k5 -h -r | head -20
```

---

## 🔐 Configuración

### Identidad

```bash
# Global (todas las repos)
git config --global user.name "Tu Nombre"
git config --global user.email "email@example.com"

# Solo este repo
git config user.name "Tu Nombre"
git config user.email "email@example.com"
```

### Alias Útiles

```bash
# Crear shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"

# Usar
git st   # = git status
git co development  # = git checkout development
git lg   # = git log --oneline --graph --all
```

### Configuración Útil

```bash
# Editor predeterminado
git config --global core.editor "code --wait"

# Colores
git config --global color.ui auto

# Autocorrección
git config --global help.autocorrect 1

# Push simple
git config --global push.default simple

# Line endings (Windows)
git config --global core.autocrlf true
```

---

## 🚨 Emergencias

### "Borré algo importante"

```bash
# Ver todos los cambios (incluso borrados)
git reflog

# Restaurar a un punto anterior
git reset --hard abc123
```

### "Commit en rama equivocada"

```bash
# Guardar cambios
git stash

# Cambiar a rama correcta
git checkout rama-correcta

# Aplicar cambios
git stash pop
```

### "Quiero cambios de otro commit"

```bash
# Cherry pick
git cherry-pick abc123
```

### "Repo muy grande"

```bash
# Ver qué ocupa espacio
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -20

# Limpiar historial (¡cuidado!)
git filter-branch --tree-filter 'rm -f archivo-grande' HEAD
```

---

## 📝 Pull Requests (GitHub)

### Crear PR desde Command Line

```bash
# Con GitHub CLI
gh pr create

# O manual en GitHub web:
# 1. Push tu rama
git push origin mi-rama

# 2. Ve a GitHub.com
# 3. Click "Compare & pull request"
# 4. Llenar descripción
# 5. Solicitar reviewers
# 6. Create pull request
```

### Actualizar PR

```bash
# Hacer cambios
git add .
git commit -m "Cambios solicitados en review"
git push

# PR se actualiza automáticamente
```

---

## 🤝 Colaboración

### Clonar Repo

```bash
git clone https://github.com/ORG/sole-voltaje.git
cd sole-voltaje
```

### Contribuir

```bash
# 1. Fork en GitHub
# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/sole-voltaje.git

# 3. Agregar upstream
git remote add upstream https://github.com/ORG/sole-voltaje.git

# 4. Crear rama
git checkout -b mi-contribucion

# 5. Hacer cambios y push
git push origin mi-contribucion

# 6. Crear PR en GitHub
```

### Mantener Fork Actualizado

```bash
# Traer cambios del original
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## 📚 Scripts del Proyecto

### SOLE Voltaje Específicos

```bash
# Setup completo
scripts\init-git-organization.bat

# Cambiar ramas fácilmente
scripts\switch-branch.bat

# Desarrollo local
scripts\dev.bat

# Build producción
scripts\build.bat

# Migración completa
scripts\run-all-migrations.bat
```

---

## 🆘 Recursos

### Documentación

- [INICIO_GIT.md](INICIO_GIT.md) - Inicio rápido
- [GUIA_GIT_ORGANIZACION.md](GUIA_GIT_ORGANIZACION.md) - Guía completa
- [ESTRUCTURA_REPOSITORIO.md](ESTRUCTURA_REPOSITORIO.md) - Estructura
- [README.md](README.md) - Documentación principal

### Links Externos

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Docs](https://docs.github.com/)
- [Pro Git Book](https://git-scm.com/book/es/v2)

---

**Imprime esta referencia y tenla a mano!** 📋


