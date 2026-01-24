# Guia de diseno (SOLE Voltaje)

Esta guia resume el sistema visual actual y donde tocarlo. La idea es que alguien sin mucha experiencia pueda mantener el estilo sin romper la identidad.

---

## 1) Principios visuales (SOLEandola)

- **Bordes fuertes y rectos**: usamos lineas solidas (3px) y esquinas casi rectas (radio 1px).
- **Colores por seccion**: cada seccion tiene un color propio para que el usuario se ubique rapido.
- **Tipografia monoespaciada**: todo se siente tecnico y claro, sin fuentes decorativas fuera de lugar.
- **Sombras minimas**: el sistema es "flat", si hay sombra es sutil y solo en hover.

---

## 2) Tipografia

Definida en `quartz.config.ts`:

- **Header**: `VT323` (titulo principal)
- **Body**: `Roboto Mono` Se esta cambiando por Noto Sans
- **Code**: `IBM Plex Mono`

Usa siempre las variables CSS:
- `var(--headerFont)`
- `var(--bodyFont)`
- `var(--codeFont)`

---

## 3) Colores del tema

Tambien en `quartz.config.ts` (section `theme.colors`):

- **Light**: `#f5f5f5` (fondo principal)
- **Lightgray**: `#e5e5e5` (paneles y cajas)
- **Dark**: `#1a84ae` (titulos)
- **Secondary**: `#1a84ae` (links y acentos)
- **Tertiary**: `#F9C369` (hover y activos)

Colores por seccion (tarjetas):
- Inspire: `#26bfb8`
- Solve: `#991d79`
- Glossary: `#fc794d`
- Disconnected: `#eb3b81`
- Answers-comments: `#F9C369`
- New-here: `#1a84ae`

---

## 4) Tarjetas y grids

El layout de tarjetas usa **masonry via CSS columns**:
- Archivo: `quartz/components/styles/pageCardGrid.scss`

Reglas clave:
- `column-count` cambia segun breakpoints.
- Cada tarjeta usa `break-inside: avoid`.
- Bordes y colores se aplican por seccion.

Las tarjetas del home viven en:
- `quartz/components/FolderGrid.tsx`
- `quartz/components/styles/folderGrid.scss`

---

## 5) Comentarios y reacciones (Waline)

El estilo de comentarios esta alineado a SOLE:
- Bordes `3px solid #4f4f4f`
- Tipografias `var(--headerFont)` y `var(--bodyFont)`
- Panel sin sombra

Archivos clave:
- `quartz/components/Comments.tsx` (CSS)
- `quartz/components/scripts/waline.inline.ts` (config)

---

## 6) Donde ajustar rapido

- **Colores y fuentes globales**: `quartz.config.ts`
- **Estilos base**: `quartz/styles/base.scss`
- **Tarjetas**: `quartz/components/styles/pageCardGrid.scss`
- **Home**: `quartz/components/styles/folderGrid.scss`
- **Filtros**: `quartz/components/styles/solveFilterSidebar.scss`
- **Comentarios**: `quartz/components/Comments.tsx`

---

## 7) Consejos practicos

- Si dudas entre dos estilos, elige el mas simple y legible.
- Evita degradados nuevos si no estan en el sistema.
- Mantener el mismo grosor de borde crea coherencia visual.
- Si un cambio se ve "moderno corporativo", probablemente no es SOLE.
