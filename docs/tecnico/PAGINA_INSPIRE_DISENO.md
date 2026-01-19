# Página Inspire - Documentación de Diseño y Configuración

> **Última actualización:** 19 de enero de 2026  
> **Sección:** Inspire (Inspiraciones)  
> **Propósito:** Este documento detalla todos los ajustes de diseño, layout y funcionalidad implementados en la página de Inspire para servir como referencia para el resto de las secciones del sitio.

---

## Tabla de Contenidos

1. [Layout General y Espaciado](#1-layout-general-y-espaciado)
2. [Breadcrumbs (Migas de Pan)](#2-breadcrumbs-migas-de-pan)
3. [Sistema de Filtros de Categorías](#3-sistema-de-filtros-de-categorías)
4. [Grid de Tarjetas Tipo Masonry](#4-grid-de-tarjetas-tipo-masonry)
5. [Contenido de Tarjetas](#5-contenido-de-tarjetas)
6. [Home en Blanco](#6-home-en-blanco)
7. [Archivos Modificados](#7-archivos-modificados)

---

## 1. Layout General y Espaciado

### 1.1 Sidebars Más Anchos

**Archivo:** `quartz/styles/variables.scss`

**Cambios:**
- Ancho de sidebars aumentado de `320px` a `380px`
- Ancho máximo de página aumentado para mayor aprovechamiento del espacio

```scss
$sidePanelWidth: 380px; // antes: 320px
```

**Breakpoints del grid:**
```scss
$desktopGrid: (
  templateColumns: "#{$sidePanelWidth} auto #{$sidePanelWidth}",
  // Desktop: sidebar izquierdo (380px) + centro (flexible) + sidebar derecho (380px)
);
```

### 1.2 Área Central Ampliada

**Archivo:** `quartz/styles/base.scss`

**Cambios:**
- El ancho máximo de la página aumentó de `1200px + 300px` a `1800px`
- Padding de sidebars ajustado para mejor aprovechamiento del espacio

```scss
.page {
  max-width: 1800px; // antes: calc(#{map.get($breakpoints, desktop)} + 300px)
  margin: 0 auto;
}
```

**Resultado:**
- Más espacio horizontal para visualizar tarjetas
- Sidebars más legibles y menos abarrotados
- Mejor experiencia de lectura en pantallas grandes

---

## 2. Breadcrumbs (Migas de Pan)

### 2.1 Configuración General

**Archivo:** `quartz/components/Breadcrumbs.tsx`

**Nuevas opciones:**
```typescript
interface BreadcrumbOptions {
  hideSegments: string[]  // Segmentos de slug a ocultar
  hideTitles: string[]    // Títulos de páginas a ocultar
  rootName: string        // Nombre del nodo raíz (default: "Inicio")
  showCurrentPage: boolean
}
```

### 2.2 Implementación en Layouts

**Archivo:** `quartz.layout.ts`

**Para páginas de contenido:**
```typescript
Component.Breadcrumbs({
  showCurrentPage: false,
  rootName: "Inicio",
  hideSegments: ["es", "en"],      // Oculta carpetas de idioma
  hideTitles: ["sole voltaje"],    // Oculta página intermedia
})
```

**Para páginas de listado:**
```typescript
Component.Breadcrumbs({
  showCurrentPage: true,           // Muestra la página actual
  rootName: "Inicio",
  hideSegments: ["es", "en"],
  hideTitles: ["sole voltaje"],
})
```

### 2.3 Resultado Visual

**Antes:**
```
Home ❯ SOLE Voltaje ❯ es ❯ Inspire
```

**Después:**
```
Inicio ❯ Inspire
```

---

## 3. Sistema de Filtros de Categorías

### 3.1 Configuración de Categorías

**Archivo:** `quartz/components/InspireFilterSidebar.tsx`

**Definición de categorías:**
```typescript
const INSPIRE_CATEGORIES: InspireCategory[] = [
  { label: "Historias potentes", value: "Historias potentes" },
  { label: "Preguntas incómodas", value: "Preguntas incómodas" },
  { label: "Sobre el internet", value: "Sobre el internet" },
  { label: "Curiosidades", value: "Curiosidades" },
  { label: "Metodologías", value: "Metodologías" },
  { label: "De Voltaje a SOLE", value: "De Voltaje a SOLE" },
]
```

**Cómo editar categorías:**
1. Edita el array `INSPIRE_CATEGORIES`
2. `label`: texto visible en el filtro
3. `value`: debe coincidir con los tags en el frontmatter de los archivos `.md`
4. Las categorías se normalizan a minúsculas automáticamente para la comparación

### 3.2 Diseño de Filtros

**Archivo:** `quartz/components/styles/inspireFilterSidebar.scss`

**Layout:**
```scss
.inspire-filter-option {
  display: grid;
  grid-template-columns: auto 1fr;  // Checkbox (auto) + texto (flexible)
  align-items: center;
  column-gap: 0.75rem;              // Espacio entre checkbox y texto
  line-height: 1.3;
}

.inspire-filter-options {
  gap: 0.6rem;                      // Espacio entre filas
}
```

**Posición de elementos:**
- **Checkbox:** columna 1 (izquierda), alineado al inicio
- **Texto:** columna 2 (derecha), ocupa espacio restante
- **Centrado vertical:** ambos elementos centrados con `align-items: center`

### 3.3 Estilos del Checkbox

```scss
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid #8a8a8a;
  border-radius: 0;                 // Cuadrado
  
  &:checked {
    background: #1a84ae;            // Color de marca
    border-color: #1a84ae;
  }
  
  &:checked::after {
    // Marca de verificación (checkmark)
    content: "";
    width: 6px;
    height: 11px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}
```

### 3.4 Botón "Limpiar"

```scss
.inspire-filter-reset {
  border: 3px solid #4f4f4f;
  color: #1a84ae;
  box-shadow: 4px 4px 0 #4f4f4f;   // Sombra a 45 grados
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #4f4f4f;
  }
}
```

### 3.5 Funcionamiento del Filtro

**Script de filtrado:**
```javascript
// Obtener categorías seleccionadas
const selected = Array.from(checkboxes)
  .filter(cb => cb.checked)
  .map(cb => cb.value);

// Filtrar tarjetas
cards.forEach(card => {
  const tags = card.dataset.tags.split(',');
  const match = selected.some(tag => tags.includes(tag));
  card.style.display = match ? '' : 'none';
});
```

**Comportamiento:**
- Sin selección → muestra todas las tarjetas
- Con selección → muestra solo tarjetas que tengan al menos una de las categorías seleccionadas (OR lógico)
- Botón "Limpiar" → deselecciona todo y muestra todas las tarjetas

---

## 4. Grid de Tarjetas Tipo Masonry

### 4.1 Implementación CSS Columns

**Archivo:** `quartz/components/styles/pageCardGrid.scss`

**Layout principal:**
```scss
.page-card-grid {
  column-count: 3;           // 3 columnas en desktop
  column-gap: 1.25rem;
  margin: 2rem 0;
  
  @media all and ($tablet) {
    column-count: 2;         // 2 columnas en tablet
  }
  
  @media all and ($mobile) {
    column-count: 1;         // 1 columna en móvil
  }
}
```

### 4.2 Comportamiento de Tarjetas

```scss
.page-card {
  break-inside: avoid;       // Evita que se parta una tarjeta entre columnas
  margin-bottom: 1.25rem;    // Espacio entre tarjetas
  // height: 100% REMOVIDO    // Permite altura dinámica
}
```

**Ventajas del sistema masonry:**
- ✅ Las tarjetas ocupan solo el espacio que necesitan
- ✅ No quedan huecos blancos grandes
- ✅ Aprovechamiento óptimo del espacio vertical
- ✅ Responsive automático
- ✅ No requiere JavaScript

**Desventaja:**
- ⚠️ El orden de lectura es vertical por columnas (no horizontal por filas)
- Para mantener orden estricto horizontal se requeriría JavaScript (Masonry.js)

### 4.3 Visualización por Resolución

| Resolución | Columnas | Ancho aproximado por tarjeta |
|------------|----------|------------------------------|
| Desktop (>1200px) | 3 | ~400-450px |
| Tablet (800-1200px) | 2 | ~350-400px |
| Móvil (<800px) | 1 | 100% ancho |

---

## 5. Contenido de Tarjetas

### 5.1 Resumen Completo

**Archivo:** `quartz/components/styles/pageCardGrid.scss`

**Cambio realizado:**
```scss
.page-card-summary {
  margin: 0;
  font-size: 17px;
  line-height: 1.4;
  // REMOVIDO: -webkit-line-clamp: 2;
  // REMOVIDO: -webkit-box-orient: vertical;
  // REMOVIDO: overflow: hidden;
}
```

**Antes:**
- Resumen limitado a 2 líneas con puntos suspensivos (...)

**Después:**
- Resumen completo visible
- Altura de tarjeta se ajusta al contenido

### 5.2 Estructura de una Tarjeta

```html
<a class="page-card" data-tags="historias potentes,metodologías">
  <!-- Imagen (solo en algunas secciones) -->
  <div class="page-card-image">
    <img src="..." alt="...">
  </div>
  
  <!-- Contenido principal -->
  <div class="page-card-body">
    <h3 class="page-card-title">Título de la inspiración</h3>
    <p class="page-card-summary">Resumen completo del contenido...</p>
    
    <!-- Tags visibles -->
    <div class="page-card-tags">
      <span class="page-card-tag">#Metodologías</span>
      <span class="page-card-tag">#De-Voltaje-a-SOLE</span>
    </div>
  </div>
</a>
```

### 5.3 Colores por Sección

```scss
// Inspire - Turquesa
.section-inspire .page-card {
  background-color: #27bfb8;
  color: #ffffff;
}

// Solve - Magenta
.section-solve .page-card {
  background-color: #991d79;
  color: #ffffff;
}

// Glossary - Coral
.section-glossary .page-card {
  background-color: #fc794d;
  color: #ffffff;
}

// Disconnected - Rosa
.section-disconnected .page-card {
  background-color: #eb3b81;
  color: #ffffff;
}

// Answers-Comments - Amarillo
.section-answers-comments .page-card {
  background-color: #F9C369;
  color: #000000;  // Texto negro para contraste
}
```

---

## 6. Home en Blanco

### 6.1 Archivos de Contenido

**Archivo:** `content/index.md`
```yaml
---
title: Inicio
---
```

**Archivo:** `content/es/index.md`
```yaml
---
title: Inicio
lang: es
type: home
---
```

### 6.2 Configuración de Layout

**Archivo:** `quartz.layout.ts`

```typescript
const isHomePage = (page) =>
  page.fileData.slug === "index" || page.fileData.slug === "es"

// Ocultar componentes en home
Component.ConditionalRender({
  component: Component.Breadcrumbs({ ... }),
  condition: (page) => !isHomePage(page),  // NO mostrar en home
})

Component.ConditionalRender({
  component: Component.ArticleTitle(),
  condition: (page) => !isHomePage(page),  // NO mostrar en home
})

Component.ConditionalRender({
  component: Component.ContentMeta(),
  condition: (page) => !isHomePage(page),  // NO mostrar en home
})
```

**Resultado:**
- La página de inicio (`/` y `/es`) queda completamente en blanco
- Solo se muestra el sidebar de navegación
- No hay breadcrumbs, título, ni metadatos

---

## 7. Archivos Modificados

### 7.1 Estructura de Archivos

```
voltaje-dev/
├── quartz/
│   ├── styles/
│   │   ├── variables.scss          ← Anchos de sidebars y breakpoints
│   │   └── base.scss                ← Ancho máximo de página
│   │
│   ├── components/
│   │   ├── Breadcrumbs.tsx          ← Lógica de ocultación de breadcrumbs
│   │   ├── InspireFilterSidebar.tsx ← Configuración de categorías
│   │   │
│   │   └── styles/
│   │       ├── inspireFilterSidebar.scss  ← Diseño de filtros
│   │       └── pageCardGrid.scss          ← Layout masonry de tarjetas
│   │
│   └── quartz.layout.ts             ← Configuración de layouts y breadcrumbs
│
└── content/
    ├── index.md                     ← Home raíz en blanco
    └── es/
        └── index.md                 ← Home español en blanco
```

### 7.2 Checklist de Aplicación a Otras Secciones

Para aplicar este diseño a otras secciones (Solve, Glossary, etc.):

- [ ] **Layout general:** Ya está aplicado globalmente (variables.scss, base.scss)
- [ ] **Breadcrumbs:** Ya está configurado globalmente (quartz.layout.ts)
- [ ] **Filtros de categorías:**
  - [ ] Crear componente `[Seccion]FilterSidebar.tsx` basado en `InspireFilterSidebar.tsx`
  - [ ] Definir categorías específicas de la sección
  - [ ] Copiar estilos de `inspireFilterSidebar.scss` y ajustar colores
  - [ ] Agregar componente al `right` sidebar en `quartz.layout.ts`
- [ ] **Grid masonry:** Ya está aplicado globalmente (pageCardGrid.scss)
- [ ] **Colores de tarjetas:** Ajustar en `pageCardGrid.scss` según la sección
- [ ] **Contenido de tarjetas:** Asegurar que frontmatter incluya `resumen` o `description`

---

## 8. Mejores Prácticas

### 8.1 Categorías de Filtros

1. **Mantener consistencia:** Usa los mismos nombres en `value` y en los `tags` del frontmatter
2. **Normalización:** El sistema normaliza a minúsculas automáticamente
3. **Limit de categorías:** 6-8 categorías máximo para mejor UX
4. **Nombres descriptivos:** Usa nombres claros y específicos

### 8.2 Resúmenes de Tarjetas

1. **Longitud ideal:** 150-250 caracteres para resúmenes
2. **Contenido útil:** El resumen debe dar contexto real, no ser genérico
3. **Campo en frontmatter:** Usar `resumen` (preferido) o `description`

### 8.3 Performance

1. **Imágenes:** Optimizar todas las imágenes (WebP, tamaño adecuado)
2. **Cantidad de tarjetas:** Considerar paginación si hay >100 tarjetas
3. **Lazy loading:** Las imágenes usan `loading="lazy"` por defecto

---

## 9. Troubleshooting

### Problema: Los filtros no funcionan

**Solución:**
1. Verificar que los tags en el frontmatter coincidan con los valores en `INSPIRE_CATEGORIES`
2. Revisar que el script JavaScript se esté cargando correctamente
3. Verificar en la consola del navegador si hay errores

### Problema: Las tarjetas no se ven en masonry

**Solución:**
1. Verificar que `break-inside: avoid` esté presente en `.page-card`
2. Asegurar que NO exista `height: 100%` en `.page-card`
3. Verificar que `column-count` esté definido en `.page-card-grid`

### Problema: Breadcrumbs no se ocultan

**Solución:**
1. Verificar que `hideSegments` y `hideTitles` estén en minúsculas
2. Revisar que la condición `!isHomePage(page)` esté presente
3. Limpiar caché del navegador

---

## 10. Futuras Mejoras

### Posibles optimizaciones:

1. **Filtros avanzados:**
   - Filtros AND (seleccionar múltiples categorías y que se cumplan todas)
   - Filtros de búsqueda por texto
   - Filtros por autor, fecha, etc.

2. **Grid masonry:**
   - Implementar Masonry.js para orden horizontal exacto
   - Animaciones suaves al filtrar
   - Infinite scroll / paginación

3. **Performance:**
   - Virtual scrolling para listas muy largas
   - Caché de resultados de filtrado
   - Pre-renderizado de imágenes

4. **Accesibilidad:**
   - Navegación por teclado mejorada en filtros
   - Anuncios ARIA cuando se filtran tarjetas
   - Focus management al limpiar filtros

---

## Referencias

- [CSS Columns (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/columns)
- [Break-inside (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside)
- [SCSS Variables](https://sass-lang.com/documentation/variables)
- [Quartz Documentation](https://quartz.jzhao.xyz/)

---

**Documento creado por:** Cursor AI Assistant  
**Fecha:** 19 de enero de 2026  
**Versión:** 1.0
