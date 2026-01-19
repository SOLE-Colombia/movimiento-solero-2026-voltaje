# Sistema Masonry para Tarjetas - Guía Técnica

> Documentación del sistema de layout tipo masonry implementado para las tarjetas del sitio.

---

## ¿Qué es Masonry?

Masonry es un patrón de diseño de cuadrícula donde los elementos se apilan verticalmente de forma compacta, similar a cómo un albañil coloca ladrillos. A diferencia de un grid tradicional, las tarjetas ocupan solo el espacio necesario según su contenido, eliminando espacios vacíos.

**Ejemplo visual:**

```
Grid Tradicional (altura fija):     Masonry (altura dinámica):
┌─────┐ ┌─────┐ ┌─────┐            ┌─────┐ ┌─────┐ ┌─────┐
│  A  │ │  B  │ │  C  │            │  A  │ │  B  │ │  F  │
│     │ │     │ │     │            └─────┘ └─────┘ │     │
└─────┘ └─────┘ │     │            ┌─────┐ ┌─────┐ │     │
                │     │            │  D  │ │  E  │ └─────┘
┌─────┐ ┌─────┐ └─────┘            │     │ │     │ ┌─────┐
│  D  │ │  E  │                    │     │ └─────┘ │  G  │
└─────┘ └─────┘                    └─────┘         └─────┘
```

---

## Implementación Actual

### Método: CSS Columns

Usamos **CSS Columns** en lugar de JavaScript por estas razones:

✅ **Ventajas:**
- Rendimiento nativo del navegador
- No requiere JavaScript adicional
- Funciona con contenido dinámico
- Responsive automático
- Muy ligero (solo CSS)

⚠️ **Limitación:**
- El orden de lectura es vertical por columnas, no horizontal por filas

---

## Código de Implementación

### Archivo: `quartz/components/styles/pageCardGrid.scss`

```scss
@use "../../styles/variables.scss" as *;

.page-card-grid {
  // Configuración masonry
  column-count: 3;           // Número de columnas
  column-gap: 1.25rem;       // Espacio entre columnas
  margin: 2rem 0;
  
  // Responsive
  @media all and ($tablet) {
    column-count: 2;         // 2 columnas en tablets
  }
  
  @media all and ($mobile) {
    column-count: 1;         // 1 columna en móviles
  }
}

.page-card {
  // Evita que una tarjeta se parta entre columnas
  break-inside: avoid;
  
  // Espacio entre tarjetas
  margin-bottom: 1.25rem;
  
  // IMPORTANTE: NO usar height: 100%
  // Esto permite que cada tarjeta tenga altura dinámica
}
```

---

## Propiedades Clave

### `column-count`

Define cuántas columnas tendrá el grid.

```scss
.page-card-grid {
  column-count: 3;  // 3 columnas
}
```

**Alternativas:**
- `column-count: auto` + `column-width: 300px` → columnas automáticas según ancho disponible

### `column-gap`

Espacio horizontal entre columnas.

```scss
.page-card-grid {
  column-gap: 1.25rem;  // 20px de separación
}
```

### `break-inside: avoid`

Evita que un elemento se parta entre columnas.

```scss
.page-card {
  break-inside: avoid;
  
  // También disponibles:
  // break-inside: auto;     → permite partir (default)
  // break-inside: avoid-page;   → evita partir entre páginas (print)
  // break-inside: avoid-column; → evita partir entre columnas
}
```

### `margin-bottom`

Espacio vertical entre tarjetas.

```scss
.page-card {
  margin-bottom: 1.25rem;
}
```

---

## Responsive Design

### Breakpoints del Sistema

Definidos en `quartz/styles/variables.scss`:

```scss
$breakpoints: (
  mobile: 800px,
  desktop: 1200px,
);

$mobile: "(max-width: #{map.get($breakpoints, mobile)})";
$tablet: "(min-width: #{map.get($breakpoints, mobile)}) and (max-width: #{map.get($breakpoints, desktop)})";
$desktop: "(min-width: #{map.get($breakpoints, desktop)})";
```

### Aplicación en Tarjetas

```scss
.page-card-grid {
  // Desktop (>1200px)
  column-count: 3;
  
  // Tablet (800px - 1200px)
  @media all and ($tablet) {
    column-count: 2;
  }
  
  // Mobile (<800px)
  @media all and ($mobile) {
    column-count: 1;
  }
}
```

---

## Orden de Lectura

### Flujo Vertical por Columnas

```
Columna 1    Columna 2    Columna 3
┌─────┐      ┌─────┐      ┌─────┐
│  1  │      │  4  │      │  7  │
└─────┘      └─────┘      └─────┘
┌─────┐      ┌─────┐      ┌─────┐
│  2  │      │  5  │      │  8  │
└─────┘      └─────┘      └─────┘
┌─────┐      ┌─────┐      ┌─────┐
│  3  │      │  6  │      │  9  │
└─────┘      └─────┘      └─────┘
```

**Orden de lectura:** 1, 2, 3, 4, 5, 6, 7, 8, 9

### Consideraciones de Accesibilidad

Para lectores de pantalla, el contenido se lee en orden del DOM (horizontal), pero visualmente se muestra en columnas (vertical).

**Solución actual:**
- Mantener orden lógico en el HTML
- Para la mayoría de casos (tarjetas de artículos), el orden vertical es aceptable
- Si el orden horizontal es crítico, usar JavaScript (ver alternativas)

---

## Alternativas JavaScript

Si necesitas orden horizontal estricto, puedes usar estas librerías:

### 1. Masonry.js

```bash
npm install masonry-layout
```

```javascript
import Masonry from 'masonry-layout';

const grid = document.querySelector('.page-card-grid');
const msnry = new Masonry(grid, {
  itemSelector: '.page-card',
  columnWidth: 300,
  gutter: 20
});
```

**Pros:**
- Orden horizontal perfecto
- Control total sobre el layout

**Contras:**
- Requiere JavaScript
- Mayor complejidad
- ~20KB de librería adicional

### 2. CSS Grid con grid-template-rows: masonry

```scss
.page-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;  // ⚠️ Experimental
  gap: 1.25rem;
}
```

**Estado:** Propuesta CSS en borrador, solo soportado en Firefox con flag.

---

## Comparación de Métodos

| Método | Orden | Performance | Soporte | Complejidad |
|--------|-------|-------------|---------|-------------|
| **CSS Columns** | Vertical | ⭐⭐⭐⭐⭐ | ✅ Universal | ⭐ Muy simple |
| CSS Grid masonry | Horizontal | ⭐⭐⭐⭐⭐ | ⚠️ Solo Firefox | ⭐ Simple |
| Masonry.js | Horizontal | ⭐⭐⭐ | ✅ Universal | ⭐⭐⭐ Media |
| Isotope | Horizontal | ⭐⭐⭐ | ✅ Universal | ⭐⭐⭐⭐ Alta |

---

## Casos de Uso

### ✅ Cuándo usar CSS Columns (actual)

- Blog posts / artículos
- Galerías de imágenes
- Listados de productos
- Cards de información
- Cuando el orden exacto no es crítico
- Cuando necesitas máximo rendimiento

### ⚠️ Cuándo considerar JavaScript

- Feeds sociales donde el orden cronológico es crítico
- Dashboards con widgets específicos
- Aplicaciones que requieren animaciones complejas
- Cuando necesitas drag & drop

---

## Ajustes y Personalización

### Cambiar Número de Columnas

```scss
.page-card-grid {
  // Más columnas (pantallas muy grandes)
  column-count: 4;
  
  @media all and (max-width: 1600px) {
    column-count: 3;
  }
  
  @media all and ($tablet) {
    column-count: 2;
  }
  
  @media all and ($mobile) {
    column-count: 1;
  }
}
```

### Cambiar Espaciado

```scss
.page-card-grid {
  column-gap: 2rem;        // Más espacio horizontal
}

.page-card {
  margin-bottom: 2rem;     // Más espacio vertical
}
```

### Columnas Automáticas por Ancho

```scss
.page-card-grid {
  column-width: 300px;     // Ancho mínimo de columna
  column-count: auto;      // Calcula columnas automáticamente
  column-gap: 1.25rem;
}
```

---

## Problemas Comunes y Soluciones

### Problema: Tarjetas se parten entre columnas

**Causa:** Falta `break-inside: avoid`

**Solución:**
```scss
.page-card {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;  // Safari legacy
}
```

### Problema: Todas las tarjetas tienen la misma altura

**Causa:** Hay `height: 100%` en `.page-card`

**Solución:**
```scss
.page-card {
  // Quitar height: 100%
  // La altura será automática según contenido
}
```

### Problema: Mucho espacio vacío al final de columnas

**Causa:** Distribución desigual de contenido

**Soluciones:**
1. Ajustar número de columnas
2. Limitar altura máxima de tarjetas
3. Usar JavaScript para balance manual

### Problema: Tarjetas muy anchas en mobile

**Causa:** Falta responsive

**Solución:**
```scss
@media all and ($mobile) {
  .page-card-grid {
    column-count: 1;
  }
}
```

---

## Testing Checklist

Al implementar masonry, verificar:

- [ ] Las tarjetas no se parten entre columnas
- [ ] El espaciado horizontal es consistente
- [ ] El espaciado vertical es consistente
- [ ] Responsive funciona en mobile (1 columna)
- [ ] Responsive funciona en tablet (2 columnas)
- [ ] Responsive funciona en desktop (3 columnas)
- [ ] No hay altura fija en tarjetas
- [ ] Las tarjetas se adaptan a su contenido
- [ ] No hay overflow horizontal
- [ ] El performance es bueno (60fps)

---

## Mejoras Futuras

### Posibles optimizaciones:

1. **Balance de columnas:**
   ```scss
   .page-card-grid {
     column-fill: balance;  // Intenta balancear altura de columnas
   }
   ```

2. **Animaciones al cargar:**
   ```scss
   .page-card {
     animation: fadeIn 0.3s ease;
   }
   
   @keyframes fadeIn {
     from { opacity: 0; transform: translateY(20px); }
     to { opacity: 1; transform: translateY(0); }
   }
   ```

3. **Lazy loading de imágenes:**
   - Ya implementado con `loading="lazy"`
   - Mejorar con Intersection Observer

---

## Referencias

- [CSS Columns (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns)
- [break-inside (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside)
- [CSS Grid Level 3 - Masonry](https://www.w3.org/TR/css-grid-3/#masonry-layout)
- [Masonry.js](https://masonry.desandro.com/)

---

**Última actualización:** 19 de enero de 2026  
**Implementado en:** SOLE Voltaje - Página Inspire
