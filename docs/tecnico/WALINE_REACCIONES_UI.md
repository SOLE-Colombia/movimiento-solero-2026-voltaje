# UI de Waline (reacciones + comentarios) - guia actualizada

Esta integracion usa Waline con **reacciones y caja de comentarios**. El diseno y la experiencia se controlan en dos lugares:

- **Estilos y overrides**: `quartz/components/Comments.tsx` (`const style = \`...\``)
- **Configuracion de Waline**: `quartz/components/scripts/waline.inline.ts`

La idea es mantener la estetica SOLE: bordes fuertes, esquinas rectas y tipografia monoespaciada.

---

## 1) Configuracion actual (resumen)

- **Reacciones activas**: 3 botones.
- **Iconos**: data URI (SVG inline) en `reactionIcons`.
- **Texto principal**: `locale.reactionTitle`
- **Placeholder**: `locale.placeholder`
- **Estado vacio**: `locale.sofa`
- **Acciones pesadas desactivadas**:
  - GIFs (`search: false`)
  - Upload de imagenes (`imageUploader: false`)
  - Boton de preview (oculto por CSS)

---

## 2) Donde editar y que tocar

### A) `quartz/components/scripts/waline.inline.ts`

Aqui viven:
- `serverURL` (backend de Waline)
- `reactionIcons` (3 iconos en orden)
- textos en `locale` (titulo, placeholder, sofa)
- flags de features (`imageUploader`, `search`)

Si cambias el orden de las reacciones, actualiza tambien el CSS en `Comments.tsx`.

### B) `quartz/components/Comments.tsx`

Aqui esta todo el CSS de UI (panel, formulario, botones, reacciones y tarjetas).

Puntos clave que ya estan alineados al look SOLE:
- **Bordes**: `3px solid #4f4f4f` y `border-radius: 1px`
- **Tipografia**: `var(--headerFont)` para titulo de reacciones, `var(--bodyFont)` para el resto
- **Panel**: sin sombras, con padding y divisiones internas

---

## 3) Estructura real (clases de Waline)

- **Lista**: `.wl-reaction-list` (contenedor flex)
- **Boton**: `.wl-reaction-item` (cada reaccion)
- **Votos**: `.wl-reaction-votes`
- **Icono nativo de Waline**: `.wl-reaction-img` (se oculta)

El icono visible se dibuja con `::before` usando `mask-image` y color `currentColor`.

---

## 4) Estados (3 botones)

El CSS asume **3 reacciones** y las estiliza por orden:

1. `nth-child(1)` -> **No funciono** (rojo `#ef4444`)
2. `nth-child(2)` -> **Regular** (ambar `#f59e0b`)
3. `nth-child(3)` -> **Funciono** (verde `#10b981`)

Si cambias el orden/cantidad en `reactionIcons`, tambien cambia los `nth-child()`.

---

## 5) Comentarios habilitados (editor visible)

Ahora la seccion **si permite comentar**. Se muestran:
- Campos de nombre/correo (header)
- Editor
- Footer con boton "Enviar"

Se ocultan solo acciones no deseadas (GIF, upload, preview).

---

## 6) Responsive

- **Desktop/Tablet**: reacciones en fila con wrap
- **Mobile**:
  - borde interno cambia de vertical a horizontal en el header
  - botones compactos para no romper el layout

---

## 7) Notas de SPA (Quartz)

Waline se inicializa:
- al cargar la pagina
- y en cada navegacion SPA (`document.addEventListener("nav", ...)`)

Esto evita que la UI se quede en blanco cuando se navega sin recargar.

---

## 8) Checklist rapido

- Abrir una pagina con comentarios
- Ver que **no hay 404 `/true`**
- Ver 3 reacciones con texto correcto
- Ver caja de comentarios y boton "Enviar"
