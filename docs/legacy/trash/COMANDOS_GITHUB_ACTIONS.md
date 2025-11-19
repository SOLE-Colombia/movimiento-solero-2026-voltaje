# ⚡ Comandos Rápidos - GitHub Actions

## 🔗 Enlaces Directos (Reemplaza TU-USUARIO)

### Crear Token
```
https://github.com/settings/tokens
```

### Configurar Secrets
```
https://github.com/TU-USUARIO/dev_voltaje/settings/secrets/actions
```

### Ver Workflows
```
https://github.com/TU-USUARIO/dev_voltaje/actions
```

### Configurar GitHub Pages - Producción
```
https://github.com/TU-USUARIO/voltaje-produccion/settings/pages
```

### Configurar GitHub Pages - Desarrollo
```
https://github.com/TU-USUARIO/voltaje-desarrollo/settings/pages
```

## 🎮 Comandos Git

### Deploy a Desarrollo
```bash
git checkout desarrollo
git add .
git commit -m "feat: descripción del cambio"
git push origin desarrollo
# → Se ejecuta automáticamente: Development Build and Deploy
```

### Deploy a Producción
```bash
git checkout main
git merge desarrollo
git push origin main
# → Se ejecuta automáticamente: Production Build and Deploy
```

### Ver Status de Git
```bash
git status
git log --oneline -5
git branch -a
```

## 🔍 Comandos de Verificación

### Ver Workflows Locales
```bash
# Listar workflows
ls .github/workflows/

# Ver contenido
cat .github/workflows/deploy-production.yml
cat .github/workflows/test-desarrollo.yml
```

### Verificar Estructura de Quartz
```bash
# Verificar que existe quartz/
ls quartz/

# Verificar package.json
cat quartz/package.json

# Verificar que hay package-lock.json
ls quartz/package-lock.json
```

### Test Build Local (antes de push)
```bash
cd quartz
npm install
npx quartz build
cd ..

# Si funciona localmente, funcionará en GitHub Actions
```

## 🐛 Comandos de Troubleshooting

### Si npm ci falla
```bash
cd quartz
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "chore: regenerate package-lock.json"
git push
```

### Ver Logs de GitHub Actions (con gh CLI)
```bash
# Instalar gh CLI si no lo tienes
# Windows: winget install GitHub.cli
# Mac: brew install gh
# Linux: apt install gh

# Autenticar
gh auth login

# Ver workflows
gh workflow list

# Ver últimos runs
gh run list --limit 5

# Ver logs del último run
gh run view --log

# Ver logs de un run específico
gh run view RUN_ID --log
```

### Limpiar Cache
```bash
cd quartz
rm -rf .quartz-cache
rm -rf node_modules
npm install
npx quartz build
```

## 📝 Plantillas de Commits

### Para Features
```bash
git commit -m "feat: agregar nueva sección de soluciones"
git commit -m "feat: optimizar imágenes de concepto"
```

### Para Fixes
```bash
git commit -m "fix: corregir enlaces rotos en página X"
git commit -m "fix: actualizar rutas de imágenes"
```

### Para Docs
```bash
git commit -m "docs: actualizar guía de instalación"
git commit -m "docs: agregar ejemplos de uso"
```

### Para Chores
```bash
git commit -m "chore: actualizar dependencias"
git commit -m "chore: limpiar archivos temporales"
```

## 🔄 Flujo de Trabajo Completo

```bash
# 1. Crear feature branch
git checkout desarrollo
git pull origin desarrollo
git checkout -b feature/mi-cambio

# 2. Hacer cambios
# ... editar archivos ...

# 3. Ver cambios
git status
git diff

# 4. Test local (opcional)
cd quartz
npx quartz build
cd ..

# 5. Commit
git add .
git commit -m "feat: descripción"

# 6. Push
git push origin feature/mi-cambio

# 7. Crear PR en GitHub
# Ir a: https://github.com/TU-USUARIO/dev_voltaje/pulls
# Click "New pull request"
# base: desarrollo <- compare: feature/mi-cambio
# Create pull request

# 8. Mergear PR → Deploy automático a desarrollo

# 9. Cuando esté listo, PR de desarrollo → main

# 10. Mergear → Deploy automático a producción
```

## 📊 Monitoreo

### Ver Status de Deployments
```bash
# Con gh CLI
gh run list --workflow=deploy-production.yml --limit 5
gh run list --workflow=test-desarrollo.yml --limit 5

# Ver si un workflow está corriendo
gh run list --status in_progress

# Ver workflows fallidos
gh run list --status failure
```

### Verificar Sitios
```bash
# Desarrollo
curl -I https://TU-USUARIO.github.io/voltaje-desarrollo

# Producción
curl -I https://TU-USUARIO.github.io/voltaje-produccion
```

## 🔐 Gestión de Secrets

### Ver Secrets (nombres, no valores)
```bash
gh secret list
```

### Actualizar un Secret
```bash
# Con gh CLI
gh secret set DEPLOY_TOKEN

# Te pedirá el valor
```

### Eliminar un Secret
```bash
gh secret delete NOMBRE_SECRET
```

## ⚙️ Ejecutar Workflow Manualmente

### Desde GitHub Web
1. Ir a: https://github.com/TU-USUARIO/dev_voltaje/actions
2. Seleccionar workflow
3. Click "Run workflow"
4. Seleccionar branch
5. Run

### Con gh CLI
```bash
# Ejecutar workflow de desarrollo
gh workflow run test-desarrollo.yml

# Ejecutar workflow de producción
gh workflow run deploy-production.yml

# Ver el run
gh run watch
```

## 🧹 Limpieza

### Eliminar Feature Branch (después de mergear)
```bash
# Localmente
git branch -d feature/mi-cambio

# Remotamente
git push origin --delete feature/mi-cambio
```

### Limpiar Branches Mergeadas
```bash
# Ver branches mergeadas
git branch --merged

# Eliminar todas las mergeadas (excepto main y desarrollo)
git branch --merged | grep -v "\*\|main\|desarrollo" | xargs -n 1 git branch -d
```

## 🎯 Comandos de Emergencia

### Revertir Último Commit (NO pushed)
```bash
git reset --soft HEAD~1
```

### Revertir Último Commit (YA pushed)
```bash
git revert HEAD
git push
```

### Cancelar Workflow en Ejecución
```bash
# Con gh CLI
gh run cancel RUN_ID

# O desde web
# https://github.com/TU-USUARIO/dev_voltaje/actions
# Click en workflow → Cancel workflow
```

### Forzar Re-run de Workflow
```bash
# Con gh CLI
gh run rerun RUN_ID

# O desde web
# Click en workflow → Re-run all jobs
```

## 📱 Atajos con Alias (Opcional)

Agregar a `~/.bashrc` o `~/.zshrc`:

```bash
# Git aliases
alias gst='git status'
alias gco='git checkout'
alias gp='git push'
alias gl='git pull'
alias ga='git add'
alias gc='git commit -m'

# Workflow aliases
alias ghw='gh workflow list'
alias ghr='gh run list --limit 10'
alias ghv='gh run view --log'

# Deploy aliases
alias deploy-dev='git checkout desarrollo && git push origin desarrollo'
alias deploy-prod='git checkout main && git merge desarrollo && git push origin main'
```

Después recargar:
```bash
source ~/.bashrc  # o ~/.zshrc
```

## 🎉 Tips Rápidos

1. **Siempre probar en desarrollo primero**
   ```bash
   git push origin desarrollo
   # Verificar que funciona
   # Luego mergear a main
   ```

2. **Ver logs en tiempo real**
   ```bash
   gh run watch
   ```

3. **Los workflows tardan 2-3 minutos**
   - No te preocupes si no ves cambios inmediatamente

4. **GitHub Pages tarda 1-2 minutos extra**
   - El workflow puede terminar antes que el sitio actualice

5. **Usa workflow_dispatch para tests**
   - Puedes ejecutar manualmente sin hacer push

---

**🔗 Links Importantes:**

- Workflows: `https://github.com/TU-USUARIO/dev_voltaje/actions`
- Sitio Dev: `https://TU-USUARIO.github.io/voltaje-desarrollo`
- Sitio Prod: `https://TU-USUARIO.github.io/voltaje-produccion`

**📚 Guías:**
- Inicio: `INICIO_GITHUB_ACTIONS.md`
- Completa: `guias/CONFIGURACION_GITHUB_ACTIONS_PASO_A_PASO.md`
- Resumen: `guias/RESUMEN_GITHUB_ACTIONS.md`


