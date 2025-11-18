# 🚀 Inicio Rápido - GitHub Actions

## 🎯 ¿Qué Tienes Ahora?

Deploy automático de SOLE Voltaje con Quartz a dos sitios usando GitHub Pages GRATUITO.

## ⚡ Configuración en 15 Minutos

### Paso 1: Crear Repositorios (3 min)

**Crear repo de PRODUCCIÓN:**
1. Ir a: https://github.com/new
2. Nombre: `voltaje-produccion`
3. ✅ Public
4. Create repository

**Crear repo de DESARROLLO:**
1. Ir a: https://github.com/new
2. Nombre: `voltaje-desarrollo`
3. ✅ Public
4. Create repository

### Paso 2: Crear Token (2 min)

1. Ir a: https://github.com/settings/tokens
2. Generate new token (classic)
3. Scopes:
   - ✅ `repo` (all)
   - ✅ `workflow`
4. Generate token
5. **COPIAR INMEDIATAMENTE** → Guardar en lugar seguro

### Paso 3: Configurar Secrets (3 min)

1. Ir a: `https://github.com/TU-USUARIO/dev_voltaje/settings/secrets/actions`
2. New repository secret:

**Secret 1:**
- Name: `DEPLOY_TOKEN`
- Value: [tu token ghp_xxx...]

**Secret 2:**
- Name: `PRODUCTION_REPO`
- Value: `TU-USUARIO/voltaje-produccion`

**Secret 3:**
- Name: `DEVELOPMENT_REPO`
- Value: `TU-USUARIO/voltaje-desarrollo`

### Paso 4: Activar GitHub Pages (2 min)

**En repo de producción:**
1. `https://github.com/TU-USUARIO/voltaje-produccion/settings/pages`
2. Source: Branch `main`, folder `/ (root)`
3. Save

**En repo de desarrollo:**
1. `https://github.com/TU-USUARIO/voltaje-desarrollo/settings/pages`
2. Source: Branch `main`, folder `/ (root)`
3. Save

### Paso 5: Probar Deploy (5 min)

```bash
# Probar desarrollo
git checkout desarrollo
echo "# Test" >> test.md
git add test.md
git commit -m "test: deploy automático"
git push origin desarrollo

# Ver Actions en:
# https://github.com/TU-USUARIO/dev_voltaje/actions

# Ver sitio en:
# https://TU-USUARIO.github.io/voltaje-desarrollo
```

## 📋 Checklist Rápido

```
□ Repo voltaje-produccion creado (público)
□ Repo voltaje-desarrollo creado (público)
□ Token creado y guardado
□ Secret DEPLOY_TOKEN configurado
□ Secret PRODUCTION_REPO configurado
□ Secret DEVELOPMENT_REPO configurado
□ GitHub Pages activado en producción
□ GitHub Pages activado en desarrollo
□ Test de deploy realizado
```

## 🎮 Uso Diario

```bash
# DESARROLLO
git checkout desarrollo
# ... hacer cambios ...
git push origin desarrollo
# → Deploy automático a voltaje-desarrollo

# PRODUCCIÓN
git checkout main
git merge desarrollo
git push origin main
# → Deploy automático a voltaje-produccion
```

## 🔗 Enlaces Importantes

**Para copiar y reemplazar TU-USUARIO:**

```
Crear token:
https://github.com/settings/tokens

Configurar secrets:
https://github.com/TU-USUARIO/dev_voltaje/settings/secrets/actions

Ver workflows:
https://github.com/TU-USUARIO/dev_voltaje/actions

Configurar Pages producción:
https://github.com/TU-USUARIO/voltaje-produccion/settings/pages

Configurar Pages desarrollo:
https://github.com/TU-USUARIO/voltaje-desarrollo/settings/pages

Sitio producción:
https://TU-USUARIO.github.io/voltaje-produccion

Sitio desarrollo:
https://TU-USUARIO.github.io/voltaje-desarrollo
```

## 📚 Guías Disponibles

| Archivo | Contenido | Cuándo Leer |
|---------|-----------|-------------|
| `guias/RESUMEN_GITHUB_ACTIONS.md` | Resumen visual | Primero (5 min) |
| `guias/CONFIGURACION_GITHUB_ACTIONS_PASO_A_PASO.md` | Guía detallada | Si necesitas más info |
| Este archivo | Inicio rápido | Para empezar ahora |

## 🐛 Si Algo Falla

### Workflow falla
```bash
# Ver logs:
1. GitHub > Actions
2. Click en workflow fallido
3. Click en step con error rojo
4. Leer error
```

### Errores comunes:

**"Repository not found"**
→ Verifica que los secrets tengan formato: `usuario/repo` (sin https://)

**"Resource not accessible"**
→ El token no tiene permisos. Regenera con `repo` + `workflow`

**"npm ci fails"**
→ Falta package-lock.json:
```bash
cd quartz
npm install
git add package-lock.json
git commit -m "chore: add lockfile"
git push
```

## 💡 Tips

1. **Los workflows están en:** `.github/workflows/`
2. **El deploy es automático** - solo haz push
3. **Puedes ejecutar manualmente:** Actions > Run workflow
4. **GitHub Pages toma 2-3 minutos** en actualizar
5. **Siempre prueba en desarrollo primero**

## 🎉 ¡Listo!

Cuando termines la configuración:

1. Cada push a `desarrollo` → Deploy automático al sitio de desarrollo
2. Cada push a `main` → Deploy automático al sitio de producción
3. Sin servidores, sin costos, sin complicaciones

**¿Necesitas más detalles?**
→ Lee `guias/CONFIGURACION_GITHUB_ACTIONS_PASO_A_PASO.md`

**¿Todo funciona?**
→ ¡Excelente! Ahora solo haz push y relájate 😎


