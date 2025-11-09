# 🚀 Despliegue - SOLE Voltaje

## GitHub Actions

### Workflows Configurados

#### 1. Desarrollo (`desarrollo` branch)

**Archivo:** `.github/workflows/test-desarrollo.yml`

```yaml
on:
  push:
    branches: [desarrollo]
```

**Acciones:**
- Build del sitio con Quartz
- Deploy a repositorio de desarrollo
- Tests en Pull Requests

**URL:** Configurada en secrets (`DEVELOPMENT_REPO`)

#### 2. Producción (`main` branch)

**Archivo:** `.github/workflows/deploy-production.yml`

```yaml
on:
  push:
    branches: [main]
```

**Acciones:**
- Build del sitio con Quartz
- Deploy a repositorio de producción
- Deploy a GitHub Pages

**URL:** Configurada en secrets (`PRODUCTION_REPO`)

## Configuración de Secrets

En GitHub: `Settings > Secrets and variables > Actions`

Agregar:

```
DEVELOPMENT_REPO=usuario/repo-desarrollo
PRODUCTION_REPO=usuario/repo-produccion
DEPLOY_TOKEN=ghp_tu_token_personal
```

### Crear Token Personal

1. GitHub > Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Scopes necesarios:
   - `repo` (todos)
   - `workflow`
4. Copiar token y agregar como secret

## Proceso de Deployment

### Desarrollo

```bash
# 1. Crear branch
git checkout -b feature/mi-feature

# 2. Hacer cambios
# Edita archivos en content/

# 3. Commit
git add .
git commit -m "feat: nueva página"

# 4. Push a desarrollo
git checkout desarrollo
git merge feature/mi-feature
git push origin desarrollo

# 5. GitHub Actions deploya automáticamente
```

### Producción

```bash
# 1. Merge desarrollo a main
git checkout main
git merge desarrollo

# 2. Tag de versión (opcional)
git tag -a v1.0.0 -m "Release 1.0.0"

# 3. Push
git push origin main
git push origin --tags

# 4. GitHub Actions deploya a producción
```

## Build Local

### Generar Build de Producción

```bash
# Acceder al contenedor
npm run shell

# Build de producción
npx quartz build

# Los archivos están en quartz/public/
ls -la /workspace/quartz/public
```

### Probar Build Localmente

```bash
# Desde el contenedor
cd /workspace/quartz
npx quartz serve

# Acceder a http://localhost:8080
```

## Optimización para Producción

### Minificación

Quartz minifica automáticamente:
- HTML
- CSS
- JavaScript

### Imágenes

Antes de commitear:

```bash
# Optimizar JPG/PNG
convert imagen.jpg -quality 85 -strip imagen-opt.jpg

# Convertir a WebP
convert imagen.jpg -quality 85 imagen.webp
```

### Cache Busting

Quartz agrega hashes automáticamente:
```
main.abc123.css
index.def456.js
```

## GitHub Pages

### Configuración

1. Repositorio de producción > Settings > Pages
2. Source: Deploy from a branch
3. Branch: `main` / `/(root)`
4. Save

### Custom Domain (Opcional)

1. Agregar archivo `quartz/public/CNAME`:
   ```
   tusitioweb.com
   ```

2. En tu proveedor de DNS:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   usuario.github.io
   ```

3. Settings > Pages > Custom domain: `tusitioweb.com`

## Monitoreo

### Ver Estado de Deployments

GitHub > Actions > Ver workflow runs

### Debugging Fallos

```bash
# Ver logs del workflow
# GitHub > Actions > Click en el run fallido > Ver steps

# Problemas comunes:
# - Token expirado → Regenerar
# - Permisos insuficientes → Verificar scopes
# - Build falla → Ver logs de Quartz
```

### Notificaciones

Configurar en GitHub:
- Settings > Notifications > Actions
- Recibe emails cuando falla un deployment

## Rollback

### Revertir a Versión Anterior

```bash
# Opción 1: Revert del commit
git revert HEAD
git push origin main

# Opción 2: Volver a un tag
git checkout v1.0.0
git checkout -b hotfix
# Hacer cambios
git tag -a v1.0.1 -m "Hotfix"
git push origin hotfix
```

### Deployment Manual de Emergencia

```bash
# 1. Build local
npm run shell
npx quartz build
exit

# 2. Copiar public/
cp -r quartz/public/* /tmp/deploy/

# 3. Push manual al repo de producción
cd /tmp/deploy
git init
git add .
git commit -m "Emergency deploy"
git push -f https://github.com/usuario/produccion.git main
```

## Performance

### Lighthouse Score

Verificar con:
```bash
npx lighthouse https://tusitioweb.com --view
```

Objetivo:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### Analytics (Opcional)

Agregar a `quartz/quartz.config.ts`:

```typescript
analytics: {
  provider: "google",
  tagId: "G-XXXXXXXXXX"
}
```

## CDN (Opcional)

### Cloudflare

1. Agregar sitio a Cloudflare
2. Apuntar DNS
3. Configurar:
   - SSL/TLS: Full
   - Auto Minify: HTML, CSS, JS
   - Brotli: Enabled
   - Cache Level: Standard

### Netlify

Alternativa a GitHub Pages:

1. Conectar repositorio
2. Build command: `npx quartz build`
3. Publish directory: `quartz/public`

## Seguridad

### Headers de Seguridad

Agregar a GitHub Pages con Cloudflare:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer-when-downgrade
```

### HTTPS

GitHub Pages incluye HTTPS automáticamente:
- Enforce HTTPS: ✅ Enabled

## Checklist Pre-Deploy

- [ ] Build local funciona sin errores
- [ ] No hay enlaces rotos
- [ ] Imágenes optimizadas
- [ ] Front matter correcto en todos los .md
- [ ] Tests pasan en desarrollo
- [ ] Secrets configurados en GitHub
- [ ] DNS configurado (si usa custom domain)

## Cronograma Recomendado

### Desarrollo Continuo

```
Lunes-Jueves: Desarrollo en branches
Viernes: Merge a desarrollo → Deploy automático
Lunes siguiente: Review → Merge a main → Producción
```

### Releases

```
v1.0.0 - Release inicial
v1.1.0 - Features menores
v2.0.0 - Breaking changes
```

## Backup

### Backup Automático

GitHub mantiene historial completo:
```bash
# Clonar con historial completo
git clone --mirror https://github.com/usuario/repo.git
```

### Backup Manual

```bash
# Exportar build
cd quartz/public
tar -czf backup-$(date +%Y%m%d).tar.gz .

# Guardar en almacenamiento externo
```

---

**Última actualización:** 4 de Noviembre, 2025

