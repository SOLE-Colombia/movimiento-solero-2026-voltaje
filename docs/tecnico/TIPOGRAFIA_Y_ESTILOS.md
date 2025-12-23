# ✏️ Tipografía y Estilos Visuales - SOLE Voltaje

Este documento detalla la configuración de tipografía, tamaños de fuente y estilos visuales del sitio.

---

## 📝 Fuentes Tipográficas

### Configuración en `quartz.config.ts`

```typescript
typography: {
  header: "VT323",        // Solo para h1
  body: "Roboto Mono",    // Texto general y h2-h6
  code: "IBM Plex Mono",  // Bloques de código
},
```

### Uso de cada fuente

| Fuente | Uso | Descripción |
|--------|-----|-------------|
| **VT323** | Solo `<h1>` | Fuente pixelada/retro para títulos principales |
| **Roboto Mono** | Cuerpo, h2-h6, sidebar, tarjetas | Fuente monoespaciada moderna |
| **IBM Plex Mono** | Bloques de código | Fuente técnica para código |

### Importante
- Las fuentes se cargan desde **Google Fonts** (configurado en `fontOrigin: "googleFonts"`)
- VT323 solo se aplica a `h1`, no a otros encabezados
- El sidebar usa Roboto Mono para mejor legibilidad

---

## 📏 Tamaños de Fuente

### Encabezados (en `quartz/styles/base.scss`)

| Elemento | Tamaño | Fuente |
|----------|--------|--------|
| `h1` | `48px` | VT323 |
| `h2` | `1.4rem` | Roboto Mono |
| `h3` | `1.12rem` | Roboto Mono |
| `h4`, `h5`, `h6` | `1rem` | Roboto Mono |

### Tarjetas (en `pageCardGrid.scss`)

| Elemento | Tamaño |
|----------|--------|
| `.page-card-title` | `clamp(1.1rem, 2.5vw, 1.5rem)` |
| `.page-card-description` | `0.95rem` |
| `.page-card-categories` | `1rem` |

### Tarjetas del Home (en `folderGrid.scss`)

| Elemento | Tamaño |
|----------|--------|
| `.card-body h3` | `clamp(1.1rem, 2.5vw, 1.4rem)` |
| `.card-description` | `0.9rem` |

---

## 🎨 Estilos del Sidebar

### Archivo: `quartz/components/styles/explorer.scss`

El sidebar (explorador de carpetas) usa:
- **Fuente**: `var(--bodyFont)` (Roboto Mono)
- **Tamaño**: `0.95rem`
- **Color de enlaces**: `var(--secondary)`
- **Color hover/activo**: `var(--tertiary)`

```scss
.folder-container {
  & div > a {
    font-family: var(--bodyFont);
    font-size: 0.95rem;
    color: var(--secondary);
  }
  
  & div > a:hover {
    color: var(--tertiary);
  }
}
```

---

## 🃏 Estilos de Tarjetas

### PageCardGrid (Páginas de sección)

**Archivo**: `quartz/components/PageCardGrid.tsx`

Características:
- Detecta automáticamente la sección desde el slug
- Aplica colores de fondo según la sección
- En secciones sin imagen: oculta el degradado

**Secciones sin imagen** (solo color plano):
- `solve`
- `inspire`
- `disconnected`
- `answers-comments`

**Sección con imagen**:
- `glossary` (Conceptorio)

### FolderGrid (Home)

**Archivo**: `quartz/components/FolderGrid.tsx`

Características:
- Tarjetas sin imagen (solo color plano)
- Iconos SVG en lugar de emojis
- Colores por sección

**Iconos SVG utilizados** (en `/static/icons/voltaje/`):

| Sección | Icono |
|---------|-------|
| ¿Nuevo aquí? | `hand-hang-loose.svg` |
| Inspírate | `star-1.svg` |
| Soluciona | `hammer.svg` |
| Pregunta/Comenta | `phone-transfer.svg` |
| Desconectado | `wifi-none.svg` |
| Conceptorio | `document.svg` |

---

## 📱 Diseño Responsive

### Logo (en `PageTitle.tsx`)

```css
.page-logo {
  height: 6rem;      /* Desktop grande */
}

@media (max-width: 1200px) {
  .page-logo { height: 5rem; }
}

@media (max-width: 768px) {
  .page-logo { height: 4rem; }
}

@media (max-width: 480px) {
  .page-logo { height: 3rem; }
}
```

### Títulos de tarjetas

Usan `clamp()` para escalar automáticamente:
```css
font-size: clamp(1.1rem, 2.5vw, 1.5rem);
```

---

## 🔧 Archivos Clave

| Archivo | Contenido |
|---------|-----------|
| `quartz.config.ts` | Configuración de fuentes |
| `quartz/styles/base.scss` | Estilos globales, h1-h6 |
| `quartz/components/styles/explorer.scss` | Sidebar/explorador |
| `quartz/components/styles/pageCardGrid.scss` | Tarjetas de contenido |
| `quartz/components/styles/folderGrid.scss` | Tarjetas del home |
| `quartz/components/PageTitle.tsx` | Logo y estilos responsive |
| `quartz/components/Footer.tsx` | Footer y logo inferior |

---

## 📝 Cómo Modificar

### Cambiar tamaño de h1

En `quartz/styles/base.scss`:
```scss
h1 {
  font-size: 48px;  // ← Cambiar este valor
  margin-top: 2.25rem;
  margin-bottom: 1rem;
}
```

### Cambiar fuente del sidebar

En `quartz/components/styles/explorer.scss`:
```scss
.folder-container {
  & div > a {
    font-family: var(--bodyFont);  // ← Cambiar a otra variable
  }
}
```

### Agregar nuevo icono de sección

1. Añadir el SVG en `/static/icons/voltaje/`
2. Actualizar el mapeo en `FolderGrid.tsx`:
```typescript
const sectionIcons: Record<string, string> = {
  // ... iconos existentes
  "nueva-seccion": "/static/icons/voltaje/nuevo-icono.svg",
}
```

---

## 🐛 Solución de Problemas

### La fuente VT323 aparece en h2-h6

Verificar en `base.scss` que h2-h6 usen `var(--bodyFont)`:
```scss
h2, h3, h4, h5, h6, thead {
  font-family: var(--bodyFont);  // NO var(--headerFont)
}
```

### Los iconos SVG no se ven

1. Verificar que el archivo existe en `/static/icons/voltaje/`
2. Verificar la ruta en `FolderGrid.tsx`
3. Limpiar caché: `rm -rf .quartz-cache public`

### El texto no contrasta con el fondo de tarjeta

En `pageCardGrid.scss`, ajustar el color de texto para esa sección:
```scss
.section-solve .page-card-title {
  color: #ffffff;  // Blanco para fondos oscuros
}
```

---

**Última actualización:** Diciembre 2024

