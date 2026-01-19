# Referencia Rápida - Sistema de Filtros por Categorías

> Guía rápida para implementar filtros de categorías en cualquier sección del sitio.

---

## Paso 1: Crear el Componente de Filtro

**Archivo:** `quartz/components/[Seccion]FilterSidebar.tsx`

```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/[seccion]FilterSidebar.scss"

type Category = {
  label: string  // Texto visible
  value: string  // Debe coincidir con tags en frontmatter
}

// Define tus categorías aquí
const CATEGORIES: Category[] = [
  { label: "Categoría 1", value: "Categoría 1" },
  { label: "Categoría 2", value: "Categoría 2" },
  // ... más categorías
]

const normalizeTag = (tag: string) => tag.trim().toLowerCase()

export default (() => {
  const FilterSidebar: QuartzComponent = ({}: QuartzComponentProps) => {
    const tags = CATEGORIES.map((cat) => ({
      value: normalizeTag(cat.value),
      label: cat.label,
    }))

    const filterScript = `
      document.addEventListener('DOMContentLoaded', function() {
        const wrapper = document.querySelector('.filter-sidebar');
        if (!wrapper) return;
        const checkboxes = wrapper.querySelectorAll('input[type="checkbox"][data-filter-tag]');
        const resetBtn = wrapper.querySelector('[data-filter-reset]');
        const cards = document.querySelectorAll('.page-card-grid.section-[SECCION] .page-card');
        const totalOptions = checkboxes.length;

        function getSelected() {
          const selected = [];
          checkboxes.forEach(cb => {
            if (cb.checked) selected.push(cb.value);
          });
          return selected;
        }

        function showAll() {
          cards.forEach(card => {
            card.style.display = '';
          });
        }

        function filterCards() {
          const selected = getSelected();
          if (selected.length === 0 || selected.length === totalOptions) {
            showAll();
            return;
          }

          cards.forEach(card => {
            const tags = (card.dataset.tags || '').split(',').filter(Boolean);
            const match = selected.some(tag => tags.includes(tag));
            card.style.display = match ? '' : 'none';
          });
        }

        function resetFilters() {
          checkboxes.forEach(cb => { cb.checked = false; });
          showAll();
        }

        checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
        if (resetBtn) resetBtn.addEventListener('click', resetFilters);
      });
    `

    return (
      <div class="filter-sidebar" role="region" aria-label="Filtros de categorías">
        <div class="filter-header">
          <h3>Filtros</h3>
          <button type="button" class="filter-reset" data-filter-reset>
            Limpiar
          </button>
        </div>
        <div class="filter-section">
          <h4>Categorías</h4>
          <div class="filter-options">
            {tags.map((tag) => (
              <label class="filter-option">
                <input type="checkbox" data-filter-tag value={tag.value} />
                <span>{tag.label}</span>
              </label>
            ))}
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: filterScript }} />
      </div>
    )
  }

  FilterSidebar.css = style
  return FilterSidebar
}) satisfies QuartzComponentConstructor
```

---

## Paso 2: Crear los Estilos

**Archivo:** `quartz/components/styles/[seccion]FilterSidebar.scss`

```scss
@use "../../styles/variables.scss" as *;

.filter-sidebar {
  padding: 1rem 0;
  margin-top: 1rem;
  background: transparent;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  h3 {
    margin: 0;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    color: #1a84ae;
    font-weight: 600;
  }
}

.filter-reset {
  border: 3px solid #4f4f4f;
  color: #1a84ae;
  background: var(--light);
  padding: 0.35rem 0.85rem;
  font-family: 'Noto Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 4px 4px 0 #4f4f4f;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #4f4f4f;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #4f4f4f;
  }
}

.filter-section {
  h4 {
    margin: 0 0 1rem 0;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: 700;
  }
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 0;
}

.filter-option {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 0.75rem;
  font-family: 'Noto Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  line-height: 1.3;
  width: 100%;

  input[type="checkbox"] {
    grid-column: 1;
    justify-self: start;
    align-self: center;
    width: 20px;
    height: 20px;
    min-width: 20px;
    border: 2px solid #8a8a8a;
    border-radius: 0;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
  }

  input[type="checkbox"]:checked {
    background: #1a84ae;
    border-color: #1a84ae;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 11px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  span {
    grid-column: 2;
  }
}

// Dark mode
:root[saved-theme="dark"] {
  .filter-reset {
    background: var(--light);
  }

  .filter-option {
    color: var(--darkgray);
  }

  .filter-section h4 {
    color: var(--darkgray);
  }

  .filter-option input[type="checkbox"] {
    background: transparent;
  }
}
```

---

## Paso 3: Registrar el Componente

**Archivo:** `quartz/components/index.ts`

```typescript
// ... otros imports
import SolveFilterSidebar from "./SolveFilterSidebar"  // ejemplo

export {
  // ... otros componentes
  SolveFilterSidebar,
}
```

---

## Paso 4: Agregar al Layout

**Archivo:** `quartz.layout.ts`

```typescript
export const defaultListPageLayout: PageLayout = {
  // ...
  right: [
    Component.ConditionalRender({
      component: Component.SolveFilterSidebar(),  // Tu componente
      condition: (page) => {
        const slug = page.fileData.slug ?? ""
        return slug.startsWith("es/solve") || slug.startsWith("solve")
      },
    }),
  ],
}
```

---

## Paso 5: Asegurar Tags en Frontmatter

**En tus archivos `.md`:**

```yaml
---
title: Mi artículo
tags:
  - Categoría 1
  - Categoría 2
categories:
  - Categoría 1
  - Categoría 2
---
```

**IMPORTANTE:** Los valores deben coincidir **exactamente** con los `value` definidos en el componente de filtro.

---

## Checklist de Implementación

- [ ] Crear componente `[Seccion]FilterSidebar.tsx`
- [ ] Definir array `CATEGORIES` con las categorías de la sección
- [ ] Crear archivo SCSS con estilos del filtro
- [ ] Cambiar clase `.filter-sidebar` por `.inspire-filter` (o el nombre de tu sección)
- [ ] Actualizar selector de tarjetas en el script: `.section-[SECCION]`
- [ ] Registrar componente en `quartz/components/index.ts`
- [ ] Agregar al layout en `quartz.layout.ts` con condición correcta
- [ ] Verificar que archivos `.md` tengan tags que coincidan
- [ ] Probar que el filtro funcione correctamente

---

## Personalización de Colores

Para cambiar los colores del botón "Limpiar" y checkboxes:

```scss
// Color del botón "Limpiar" al hover
.filter-reset {
  color: #991d79;  // Cambia este color
}

// Color del checkbox cuando está marcado
.filter-option input[type="checkbox"]:checked {
  background: #991d79;        // Cambia este color
  border-color: #991d79;      // Cambia este color
}
```

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Filtros no funcionan | Verificar que los tags en frontmatter coincidan con los `value` |
| Checkboxes no se ven | Verificar que el SCSS esté importado correctamente |
| No aparece el sidebar | Verificar la condición en `quartz.layout.ts` |
| Categorías en minúsculas | Es normal, se normalizan automáticamente |

---

**Tiempo estimado de implementación:** 15-20 minutos por sección
