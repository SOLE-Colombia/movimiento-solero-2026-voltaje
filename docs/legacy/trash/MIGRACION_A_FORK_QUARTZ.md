# 🔄 Migración de Quartz Submódulo a Fork Integrado

## 🎯 Objetivo

Cambiar de usar Quartz como submódulo a tener un fork integrado directamente en el proyecto.

## 📋 Pasos a Seguir

### Paso 1: Crear Fork de Quartz en GitHub

1. **Ir a:** https://github.com/jackyzha0/quartz
2. **Click en "Fork"** (esquina superior derecha)
3. **Configurar fork:**
   - Owner: Selecciona tu cuenta o `SOLE-Colombia`
   - Repository name: `quartz` (mantener el mismo nombre)
   - Description: "Fork de Quartz v4 para SOLE Voltaje"
   - ✅ Marcar "Copy the main branch only"
4. **Click "Create fork"**
5. **Copiar la URL SSH del fork:** 
   - Ejemplo: `git@github.com:SOLE-Colombia/quartz.git`
   - O: `git@github.com:TU-USUARIO/quartz.git`

### Paso 2: Guardar Personalizaciones Actuales (Si las hay)

Si ya modificaste archivos en `quartz/`, guárdalos:

```bash
# Listar archivos modificados en quartz/
cd quartz
git status

# Si hay cambios, crear un patch
git diff > ../quartz-customizations.patch
cd ..

# O simplemente copiar archivos importantes
# Ejemplo: quartz.config.ts, quartz.layout.ts
copy quartz\quartz.config.ts quartz.config.backup.ts
copy quartz\quartz.layout.ts quartz.layout.backup.ts
```

### Paso 3: Eliminar el Submódulo

```bash
# Desde la raíz del proyecto

# 1. Eliminar entrada del submódulo de .gitmodules
git config -f .gitmodules --remove-section submodule.quartz

# 2. Eliminar entrada de .git/config
git config -f .git/config --remove-section submodule.quartz

# 3. Eliminar del staging area
git rm --cached quartz

# 4. Eliminar carpeta .git/modules/quartz
Remove-Item -Recurse -Force .git\modules\quartz  # Windows
# rm -rf .git/modules/quartz  # Linux

# 5. Eliminar carpeta física de quartz
Remove-Item -Recurse -Force quartz  # Windows
# rm -rf quartz  # Linux

# 6. Eliminar archivo .gitmodules si está vacío
Remove-Item .gitmodules  # Windows
# rm .gitmodules  # Linux

# 7. Commit de la eliminación
git add .gitmodules
git commit -m "chore: remove Quartz submodule"
```

### Paso 4: Clonar Tu Fork Directamente

```bash
# Clonar tu fork en la carpeta quartz/
git clone git@github.com:SOLE-Colombia/quartz.git quartz
# O si es tu usuario personal:
# git clone git@github.com:TU-USUARIO/quartz.git quartz

# Entrar a la carpeta
cd quartz

# Verificar remotes
git remote -v
# Debería mostrar:
# origin  git@github.com:SOLE-Colombia/quartz.git (fetch)
# origin  git@github.com:SOLE-Colombia/quartz.git (push)
```

### Paso 5: Configurar Upstream (Para Actualizaciones)

```bash
# Dentro de quartz/

# Agregar upstream apuntando al Quartz original
git remote add upstream https://github.com/jackyzha0/quartz.git

# Verificar
git remote -v
# Debería mostrar:
# origin    git@github.com:SOLE-Colombia/quartz.git (fetch)
# origin    git@github.com:SOLE-Colombia/quartz.git (push)
# upstream  https://github.com/jackyzha0/quartz.git (fetch)
# upstream  https://github.com/jackyzha0/quartz.git (push)

# Volver a la raíz
cd ..
```

### Paso 6: Restaurar Personalizaciones (Si las guardaste)

```bash
# Si creaste un patch
cd quartz
git apply ../quartz-customizations.patch
cd ..

# O copiar archivos de backup
copy quartz.config.backup.ts quartz\quartz.config.ts
copy quartz.layout.backup.ts quartz\quartz.layout.ts
```

### Paso 7: Actualizar .gitignore

Asegurarte que `.gitignore` en la raíz NO ignore `quartz/`:

```bash
# Verificar que quartz/ NO esté en .gitignore
# Si está, eliminarlo

# Mantener estas líneas en .gitignore:
# quartz/.quartz-cache/
# quartz/public/
# quartz/content/
# quartz/node_modules/
```

### Paso 8: Agregar Quartz al Repositorio Principal

```bash
# Desde la raíz del proyecto

# Agregar todo quartz/ excepto lo que está en .gitignore
git add quartz/

# Ver qué se va a agregar (debería ser mucho código)
git status

# Commit
git commit -m "feat: integrate Quartz fork directly into project

- Remove Quartz submodule
- Clone fork from SOLE-Colombia/quartz
- Configure upstream for future updates
- All Quartz code now part of main repository"

# Push
git push origin feature/reorganizacion-proyecto
```

### Paso 9: Sincronizar Contenido y Probar

```bash
# Sincronizar contenido
.\scripts\sync-content-to-quartz.bat  # Windows
# ./scripts/sync-content-to-quartz.sh  # Linux

# Instalar dependencias (si no están)
cd quartz
npm install
cd ..

# Probar build
cd quartz
npx quartz build
cd ..
```

## 🔄 Actualizar Quartz en el Futuro

Cuando quieras actualizar desde el Quartz original:

```bash
cd quartz

# Fetch cambios del upstream
git fetch upstream

# Ver qué cambios hay
git log HEAD..upstream/v4 --oneline

# Mergear cambios (puede haber conflictos si personalizaste mucho)
git merge upstream/v4

# Resolver conflictos si los hay
# git status
# ... resolver conflictos ...
# git add .
# git commit

# Push a tu fork
git push origin v4

# Volver a raíz
cd ..

# Commit en proyecto principal
git add quartz/
git commit -m "chore: update Quartz from upstream"
git push
```

## 📝 Ventajas de Esta Estructura

1. **Un solo repositorio Git** - Todo en un lugar
2. **Control total** - Puedes modificar Quartz libremente
3. **Historial unificado** - Un solo historial de commits
4. **Deploy más simple** - No necesitas `git submodule update`
5. **Colaboración fácil** - Un solo repo para clonar
6. **Actualizaciones controladas** - Decides cuándo actualizar desde upstream

## 📊 Comparación

### Antes (Submódulo)
```
dev_voltaje/
├── .gitmodules          # Configuración del submódulo
├── quartz/              # Submódulo separado
│   └── .git/            # Git independiente
└── .git/                # Git principal
```

### Después (Fork Integrado)
```
dev_voltaje/
├── quartz/              # Código completo de Quartz
│   ├── .git/            # Git del fork (con upstream configurado)
│   └── ...              # Todo el código de Quartz
└── .git/                # Git principal (incluye quartz/)
```

## ⚠️ Notas Importantes

1. **El fork se pushea a tu cuenta/organización** - Tienes control total
2. **Upstream permite actualizaciones** - Puedes traer cambios del Quartz original
3. **Tu .git/config maneja quartz/** - Ahora es parte del proyecto
4. **GitHub Actions puede necesitar ajustes** - Si los workflows referencian submódulos

## 🎯 Resultado Final

- ✅ Un solo repositorio
- ✅ Quartz integrado directamente
- ✅ Fork personalizable
- ✅ Actualizaciones desde upstream cuando quieras
- ✅ Deploy simplificado
- ✅ Colaboración más fácil

