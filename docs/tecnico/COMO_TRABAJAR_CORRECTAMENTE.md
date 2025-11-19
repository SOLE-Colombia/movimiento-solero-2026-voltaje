# 📖 Guía de Trabajo - SOLE Voltaje

Flujo de trabajo estándar para desarrollar y contribuir al jardín digital.

---

## 🚀 Inicio Rápido

### 1. Abrir el Proyecto
Si estás usando **VS Code** con DevContainers (configuración recomendada):

1.  Abre VS Code en la carpeta del proyecto.
2.  Acepta la notificación *"Reopen in Container"* (o usa `F1` > Dev Containers: Reopen in Container).
3.  Espera a que el entorno se construya (solo la primera vez).

### 2. Iniciar el Servidor
Una vez dentro del contenedor, abre la terminal integrada (`Ctrl + \``) y ejecuta:

```bash
npm run dev
```

*El sitio estará disponible en `http://localhost:8080`.*

---

## 📝 Editando Contenido

### Ubicación de Archivos
Todo el contenido está en la carpeta `content/`:

```
content/
├── es/                 ← Contenido en español
│   ├── inspirate/
│   ├── soluciona/
│   ├── conceptorio/
│   └── desconectado/
├── en/                 ← Content in English
│   ├── inspire/
│   ├── solve/
│   └── glossary/
└── assets/
    └── images/         ← Todas las imágenes
```

### Crear una Nueva Página
1.  Crea un archivo `.md` en la carpeta correspondiente (ej: `content/es/soluciona/mi-guia.md`).
2.  Agrega el frontmatter:

```yaml
---
title: "Mi Guía Técnica"
date: 2025-11-20
tags:
  - conectividad
  - hardware
---
```

3.  Escribe tu contenido en Markdown.
4.  Guarda (`Ctrl + S`). El navegador se recargará automáticamente.

---

## 🔗 Enlaces e Imágenes

### Enlaces Internos (Wikilinks)
Usa el formato `[[nombre-archivo]]` para conectar notas:
```markdown
Consulta la guía sobre [[antenas-3g]] para más detalles.
```

### Imágenes
Usa rutas relativas desde tu archivo:
```markdown
![Descripción accesible](../../assets/images/mi-imagen.webp)
```

---

## 💾 Guardando Cambios

### Flujo con Git
Desde la terminal del contenedor:

```bash
# Ver qué cambió
git status

# Agregar cambios
git add content/

# Hacer commit
git commit -m "feat: nueva guía sobre paneles solares"

# Subir a GitHub
git push
```

*Recuerda: El contenedor ya tiene tus credenciales Git configuradas automáticamente.*

---

## 🐛 Solución de Problemas

### El servidor no arranca
```bash
# Reconstruir dependencias
rm -rf node_modules
npm install
npm run dev
```

### Cambios no se reflejan en el navegador
*   Presiona `Ctrl + Shift + R` para limpiar caché.
*   Verifica que el archivo tenga frontmatter válido.

### Imágenes no se cargan
*   Verifica la ruta relativa: `../../assets/images/...`
*   Asegúrate de que el archivo exista en `content/assets/images/`.

---

## ✅ Checklist Pre-Commit

Antes de hacer `git push`, verifica:

- [ ] El sitio se ve bien en `localhost:8080`.
- [ ] No hay errores en la consola del navegador (`F12`).
- [ ] Las imágenes cargan correctamente.
- [ ] Los enlaces internos funcionan.
- [ ] El frontmatter es válido (title, date, tags).

---
*Para más detalles, consulta [docs/editorial/MANUAL_REDACCION.md](../editorial/MANUAL_REDACCION.md).*
