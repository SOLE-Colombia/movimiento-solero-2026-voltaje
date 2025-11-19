# 🚀 Despliegue y CI/CD

Guía de despliegue automático para **SOLE Voltaje**.

---

## 📦 Entorno de Producción

Este proyecto usa **GitHub Actions** para despliegue automático a **GitHub Pages**.

### Requisitos
*   Repositorio en GitHub.
*   GitHub Pages habilitado.
*   Permisos de escritura para GitHub Actions.

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
GitHub Actions detecta el push a `main` y:
1.  Construye el sitio con Quartz (`npx quartz build`).
2.  Despliega a GitHub Pages automáticamente.

*Tu sitio estará disponible en:*
```
https://tu-usuario.github.io/voltaje-dev/
```

---

## ⚙️ Configuración de GitHub Actions

### Archivo de Workflow
El proyecto incluye `.github/workflows/deploy.yml` (o similar).

Estructura básica:
```yaml
name: Deploy Quartz to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install
      - run: npx quartz build
      - uses: actions/deploy-pages@v4
```

### Habilitar GitHub Pages
1.  Ve a: **Settings** > **Pages**.
2.  Source: **GitHub Actions**.
3.  Guarda los cambios.

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
