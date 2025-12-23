# 🎨 Guía de Colores y Temas - SOLE Voltaje

## 📍 Ubicación de la Configuración

Los colores globales del sitio se configuran en:
```
quartz.config.ts
```

Sección `theme.colors` (líneas 30-63 aproximadamente)

---

## 🎨 Paleta de Colores Actual

### Modo Claro (Light Mode)

| Variable | Código | Uso |
|----------|--------|-----|
| **light** | `#f5f5f5` | Fondo principal de páginas |
| **lightgray** | `#e5e5e5` | Variante para paneles y secciones |
| **gray** | `#9ca3af` | Bordes sutiles |
| **darkgray** | `#4b5563` | Texto secundario |
| **dark** | `#1a84ae` | Color de títulos (h1-h6) |
| **secondary** | `#1a84ae` | Enlaces y elementos destacados |
| **tertiary** | `#F9C369` | Color activo/hover (amarillo dorado) |
| **highlight** | `rgba(26, 132, 174, 0.15)` | Fondo de elementos resaltados |
| **textHighlight** | `#F9C36966` | Texto resaltado |

### Modo Oscuro (Dark Mode)

| Variable | Código | Uso |
|----------|--------|-----|
| **light** | `#060b16` | Fondo principal de páginas |
| **lightgray** | `#1a1f2e` | Variante para paneles y secciones |
| **gray** | `#4b5563` | Bordes |
| **darkgray** | `#d1d5db` | Texto secundario (claro) |
| **dark** | `#26BFB8` | Color de títulos (h1-h6) - Aguamarina |
| **secondary** | `#26BFB8` | Enlaces y elementos destacados |
| **tertiary** | `#F9C369` | Color activo/hover (amarillo dorado) |
| **highlight** | `rgba(249, 195, 105, 0.15)` | Fondo de elementos resaltados |
| **textHighlight** | `#F9C36966` | Texto resaltado |

---

## 🃏 Colores de Tarjetas por Sección

Las tarjetas de contenido tienen colores específicos según la sección:

| Sección | Color | Código Hex | Ubicación |
|---------|-------|------------|-----------|
| **Inspírate** | Aguamarina | `#26bfb8` | `inspire/` |
| **Soluciona** | Morado | `#991d79` | `solve/` |
| **Conceptorio** | Naranja | `#fc794d` | `glossary/` |
| **Desconectado** | Rosado | `#eb3b81` | `disconnected/` |
| **Pregunta/Comenta** | Amarillo dorado | `#F9C369` | `answers-comments/` |
| **¿Nuevo aquí?** | Azul | `#1a84ae` | `new-here/` |

### Archivos de configuración de tarjetas:
- **PageCardGrid.tsx**: `quartz/components/PageCardGrid.tsx`
- **Estilos**: `quartz/components/styles/pageCardGrid.scss`
- **FolderGrid (Home)**: `quartz/components/FolderGrid.tsx`
- **Estilos Home**: `quartz/components/styles/folderGrid.scss`

---

## 🔧 Cómo Cambiar los Colores

### 1. Colores del tema global

Editar `quartz.config.ts`:

```typescript
colors: {
  lightMode: {
    light: "#f5f5f5",
    lightgray: "#e5e5e5",
    gray: "#9ca3af",
    darkgray: "#4b5563",
    dark: "#1a84ae",        // ← Títulos
    secondary: "#1a84ae",   // ← Enlaces
    tertiary: "#F9C369",    // ← Hover/activos
    highlight: "rgba(26, 132, 174, 0.15)",
    textHighlight: "#F9C36966",
  },
  darkMode: {
    // ... similar estructura
  },
}
```

### 2. Colores de tarjetas por sección

Editar `quartz/components/styles/pageCardGrid.scss`:

```scss
.section-inspire .page-card {
  background-color: #26bfb8;
}

.section-solve .page-card {
  background-color: #991d79;
}

// ... etc
```

### 3. Colores del Home (FolderGrid)

Editar `quartz/components/FolderGrid.tsx`:

```typescript
const sectionColors: Record<string, string> = {
  "new-here": "#1a84ae",
  "inspire": "#26bfb8",
  "solve": "#991d79",
  "answers-comments": "#F9C369",
  "disconnected": "#eb3b81",
  "glossary": "#fc794d",
}
```

---

## 🎯 Qué Hace Cada Color

### Variables del tema

| Variable | Descripción |
|----------|-------------|
| `light` | Fondo principal de todas las páginas |
| `lightgray` | Fondo de paneles, tarjetas, secciones secundarias |
| `gray` | Bordes, líneas divisorias |
| `darkgray` | Texto secundario, metadatos, fechas |
| `dark` | **Títulos (h1-h6)** y texto principal |
| `secondary` | Enlaces, botones principales |
| `tertiary` | Estados hover, elementos activos en sidebar |
| `highlight` | Fondo de elementos al pasar el mouse |
| `textHighlight` | Resaltado de texto (==texto==) |

---

## 🌈 Consistencia de Colores

Para mantener la identidad visual de SOLE Voltaje:

1. **Títulos (tema claro)**: `#1a84ae` (azul SOLE)
2. **Títulos (tema oscuro)**: `#26BFB8` (aguamarina)
3. **Hover/Activos**: Siempre `#F9C369` (amarillo dorado)
4. **Tarjetas**: Colores planos por sección (sin degradados)
5. **Texto en tarjetas oscuras**: Usar `#ffffff` (blanco) para contraste

---

## 🔄 Aplicar Cambios

Después de modificar colores:

1. **Guardar** los archivos modificados
2. **Reconstruir** el sitio:
   ```bash
   npx quartz build --serve
   ```
3. **Limpiar caché** si es necesario:
   ```bash
   rm -rf .quartz-cache public
   npx quartz build --serve
   ```

---

## 📝 Historial de Cambios

### Diciembre 2024
- Fondo claro cambiado de turquesa a gris claro (`#f5f5f5`)
- Fondo oscuro cambiado a azul muy oscuro (`#060b16`)
- Títulos ahora usan azul SOLE (`#1a84ae`)
- Hover/activos usan amarillo dorado (`#F9C369`)
- Nuevos colores de tarjetas por sección

---

**Última actualización:** Diciembre 2024
**Versión de Quartz:** 4.x
