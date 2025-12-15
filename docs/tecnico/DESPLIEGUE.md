# 🚀 Despliegue y CI/CD

Guía de despliegue automático para **SOLE Voltaje**.

---

## 📦 Entorno de Producción

Este proyecto usa **GitHub Actions** para construir el sitio con Quartz y publicar el resultado estático en un **repositorio destino** (separado) que es el que sirve el sitio (por ejemplo en GitHub Pages con dominio propio).

### Requisitos
*   Este repositorio (fuente) en GitHub.
*   Uno o dos repositorios “destino” (uno para prod, otro para dev si aplica) con Pages configurado.
*   Un token con permisos de escritura al repo destino (**PAT**) guardado como secret.
*   Secrets configurados en este repo:
    * `PAT`: token para pushear al repo destino.
    * `PROD_REPO`: `owner/repo` destino para producción (workflow de `main`).
    * `PUBLIC_REPO`: `owner/repo` destino para desarrollo (workflow de `desarrollo`).

---

## 🔄 Flujo de Despliegue Automático

### 1. Desarrollo Local
Trabaja dentro del DevContainer:
```bash
npm run dev
```

### 2. Guardar Cambios
```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

### 3. Deploy Automático
GitHub Actions detecta el push y:
1. Construye el sitio con Quartz (`npx quartz build`) → genera `public/` en la raíz.
2. Hace checkout del repositorio destino (según el workflow).
3. Copia `public/*` al repo destino, crea `.nojekyll`, commitea y pushea.

**Ramas y entornos**
- `main` → producción (workflow: `.github/workflows/deploy-production.yml`).
- `desarrollo` → desarrollo/staging (workflow: `.github/workflows/test-desarrollo.yml`).

---

## ⚙️ Configuración de GitHub Actions

### Workflows reales en este repo
- Producción: `.github/workflows/deploy-production.yml`
- Desarrollo: `.github/workflows/test-desarrollo.yml`

### Cómo se publica realmente
Este repo **no** usa `actions/deploy-pages@v4` para publicar desde el mismo repositorio.
En cambio, publica empujando el build (`public/`) a un **repositorio destino** usando `actions/checkout@v4` con `repository:` y un `token:` (PAT).

---

## 🛠️ Build Manual (Opcional)

Si necesitas generar el build localmente para pruebas:

```bash
# Dentro del contenedor
npx quartz build

# Los archivos estáticos estarán en public/
ls -la public/
```

---

## 🔍 Monitoreo

### Ver Estado del Despliegue
1.  Ve a tu repositorio en GitHub.
2.  Pestaña **Actions**.
3.  Revisa el último workflow run.

*Si algo falla, los logs te dirán exactamente qué salió mal.*

---

## 🚨 Solución de Problemas

### Error: "Build failed"
*   Verifica que todos los archivos Markdown tengan frontmatter válido.
*   Revisa que las rutas de imágenes sean correctas.

### Error: "Permission denied"
*   Ve a **Settings** > **Actions** > **General**.
*   En "Workflow permissions", selecciona **Read and write permissions**.

---

## 🎯 Mejores Prácticas

1.  **Trabaja en branches**: Crea `feature/mi-cambio` para cambios grandes.
2.  **Pull Requests**: Revisa cambios antes de merge a `main`.
3.  **Tags de versión**: Usa `git tag v1.0.0` para releases importantes.

---
*Para configuración avanzada de CI/CD, contacta al equipo técnico.*
