# 🎯 Resumen Rápido - GitHub Actions para SOLE Voltaje

## ✨ ¿Qué se Configuró?

Deploy automático de Quartz a dos sitios diferentes usando GitHub Pages gratuito.

## 📊 Diagrama del Flujo

```
┌──────────────────────────────────────────────────────────────┐
│           REPOSITORIO PRINCIPAL (Privado)                    │
│           TU-USUARIO/dev_voltaje                             │
└──────────────────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│ rama: main    │       │ rama: desarrollo │
│ (producción)  │       │ (pruebas)        │
└───────┬───────┘       └───────┬──────────┘
        │                       │
        │ git push              │ git push
        │                       │
        ▼                       ▼
┌────────────────────┐  ┌─────────────────────┐
│ GitHub Actions     │  │ GitHub Actions      │
│ - Build con Quartz │  │ - Build con Quartz  │
│ - Deploy automático│  │ - Deploy automático │
└────────┬───────────┘  └─────────┬───────────┘
         │                        │
         │ deploy                 │ deploy
         │                        │
         ▼                        ▼
┌────────────────────┐  ┌─────────────────────┐
│ REPO PRODUCCIÓN    │  │ REPO DESARROLLO     │
│ voltaje-produccion │  │ voltaje-desarrollo  │
│ (público)          │  │ (público)           │
└────────┬───────────┘  └─────────┬───────────┘
         │                        │
         │ GitHub Pages           │ GitHub Pages
         │                        │
         ▼                        ▼
┌────────────────────┐  ┌─────────────────────┐
│   SITIO PÚBLICO    │  │  SITIO DESARROLLO   │
│ *.github.io/prod   │  │  *.github.io/dev    │
│ (para usuarios)    │  │  (para pruebas)     │
└────────────────────┘  └─────────────────────┘
```

## 🚀 Configuración en 5 Pasos

### 1️⃣ Crear Repositorios (5 min)

```
Crear 2 repos PÚBLICOS en GitHub:
├── voltaje-produccion     (para sitio final)
└── voltaje-desarrollo     (para pruebas)

Activar GitHub Pages en ambos:
Settings > Pages > Source: main / (root)
```

### 2️⃣ Crear Token (2 min)

```
GitHub > Settings > Developer settings > Personal access tokens
Generar token con:
✓ repo (all)
✓ workflow

Copiar y guardar el token: ghp_xxxxx...
```

### 3️⃣ Configurar Secrets (3 min)

```
En tu repo principal (dev_voltaje):
Settings > Secrets and variables > Actions

Agregar 3 secrets:
├── DEPLOY_TOKEN          = ghp_xxxxx...
├── PRODUCTION_REPO       = tu-usuario/voltaje-produccion
└── DEVELOPMENT_REPO      = tu-usuario/voltaje-desarrollo
```

### 4️⃣ Commit los Workflows (1 min)

```bash
# Los workflows ya están creados en:
# .github/workflows/deploy-production.yml
# .github/workflows/test-desarrollo.yml

git add .github/workflows/
git commit -m "feat: agregar workflows de GitHub Actions"
git push origin desarrollo
git push origin main
```

### 5️⃣ Probar (5 min)

```bash
# Probar en desarrollo
git checkout desarrollo
echo "test" >> test.md
git add test.md
git commit -m "test: deploy desarrollo"
git push origin desarrollo

# Ver en: https://tu-usuario.github.io/voltaje-desarrollo
```

## 📝 Archivos Creados

```
.github/workflows/
├── deploy-production.yml      # Deploy desde main
└── test-desarrollo.yml        # Deploy desde desarrollo
    (antes: test-desarrollo.yml)
```

## 🔧 Secrets Necesarios

| Nombre | Valor | Descripción |
|--------|-------|-------------|
| `DEPLOY_TOKEN` | `ghp_xxx...` | Token de acceso personal |
| `PRODUCTION_REPO` | `usuario/voltaje-produccion` | Repo de producción |
| `DEVELOPMENT_REPO` | `usuario/voltaje-desarrollo` | Repo de desarrollo |

## 🎮 Uso Diario

### Para Desarrollo

```bash
# 1. Trabajar en desarrollo
git checkout desarrollo
# ... hacer cambios ...
git add .
git commit -m "feat: nuevo contenido"

# 2. Push → deploy automático
git push origin desarrollo

# 3. Ver en:
# https://tu-usuario.github.io/voltaje-desarrollo
```

### Para Producción

```bash
# 1. Mergear desarrollo a main
git checkout main
git merge desarrollo

# 2. Push → deploy automático
git push origin main

# 3. Ver en:
# https://tu-usuario.github.io/voltaje-produccion
```

## ⚡ Comandos Rápidos

```bash
# Ver workflows en GitHub
gh workflow list

# Ver último workflow
gh run list --limit 1

# Ver logs de un workflow
gh run view

# Re-ejecutar último workflow
gh run rerun

# Ver status de GitHub Pages
gh browse --settings
```

## 🔍 Verificación

### ✅ Checklist Rápido

- [ ] 2 repos públicos creados
- [ ] GitHub Pages activado en ambos
- [ ] Token generado y guardado
- [ ] 3 secrets configurados
- [ ] Workflows committed
- [ ] Deploy a desarrollo funciona
- [ ] Deploy a producción funciona

### 📊 Ver Status

**En GitHub:**
1. Ir a: `https://github.com/tu-usuario/dev_voltaje/actions`
2. Ver workflows: ✅ = éxito, ❌ = error

**Sitios:**
- Desarrollo: `https://tu-usuario.github.io/voltaje-desarrollo`
- Producción: `https://tu-usuario.github.io/voltaje-produccion`

## 🐛 Errores Comunes

### "Repository not found"
```
❌ Problema: El secret PRODUCTION_REPO o DEVELOPMENT_REPO está mal
✅ Solución: Verificar formato: usuario/nombre-repo (sin https://)
```

### "Resource not accessible"
```
❌ Problema: El token no tiene permisos
✅ Solución: Regenerar token con scopes: repo + workflow
```

### "npm ci" falla
```
❌ Problema: No existe package-lock.json
✅ Solución:
   cd quartz
   npm install
   git add package-lock.json
   git commit -m "chore: add lockfile"
   git push
```

### Sitio no actualiza
```
❌ Problema: GitHub Pages toma tiempo
✅ Solución: Esperar 2-3 minutos, refrescar con Ctrl+F5
```

## 💡 Tips

1. **Siempre prueba en desarrollo primero**
   ```bash
   desarrollo → ver resultado → luego main
   ```

2. **Monitorea los workflows**
   ```
   GitHub > Actions > Ver status en tiempo real
   ```

3. **Los errores tienen logs detallados**
   ```
   Click en workflow > Click en step fallido > Ver error
   ```

4. **El deploy es automático**
   ```
   Solo haz push, GitHub se encarga del resto
   ```

5. **Puedes ejecutar manualmente**
   ```
   Actions > Seleccionar workflow > Run workflow
   ```

## 📚 Guías Completas

Para más detalles, ver:

- `CONFIGURACION_GITHUB_ACTIONS_PASO_A_PASO.md` - Guía completa
- `README_CONFIGURACION.md` - Configuración general
- `CONFIGURACION_GITHUB.md` - Configuración de GitHub

## 🎉 ¡Listo!

Con esto tienes:
- ✅ Deploy automático a 2 sitios
- ✅ Separación desarrollo/producción
- ✅ GitHub Pages gratuito
- ✅ Sin configuración de servidores

**Siguiente paso:** Hacer push y ver la magia ✨


