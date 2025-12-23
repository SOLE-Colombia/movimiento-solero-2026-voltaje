## UI de reacciones Waline (Quartz) – guía de ajustes

Este proyecto usa un `Comments.tsx` que integra Waline pero **solo muestra reacciones** (se oculta editor, lista de comentarios, etc.). El diseño está implementado como CSS embebido en `const style`.

### Dónde editar

- **Componente**: `quartz/components/Comments.tsx`
- **Bloque CSS**: `const style = \`...\``

### Estructura real (clases de Waline)

- **Lista**: `.wl-reaction-list` (contenedor flex)
- **Botón**: `.wl-reaction-item` (cada reacción)
- **Votos**: `.wl-reaction-votes`
- **Ícono “roto” de Waline**: `.wl-reaction-img` (se oculta)

El ícono visible se dibuja con `::before` usando `mask-image` (SVG inline) y color vía `currentColor`.

### Estados (3 botones)

El CSS asume **3 reacciones** y las estiliza por orden:

1. `nth-child(1)` → **No funcionó** (rojo `#ef4444`)
2. `nth-child(2)` → **Regular** (ámbar `#f59e0b`)
3. `nth-child(3)` → **Funcionó** (verde `#10b981`)

Si cambias el orden/cantidad en la configuración de Waline, debes actualizar las reglas `nth-child()`.

### Responsive (mobile-first compacto)

- **Desktop/Tablet**: la lista es horizontal con `flex-wrap`, y cada item usa `flex: 1 1 12.5rem` para evitar cortes.
- **Mobile (`@media (max-width: 600px)`)**:
  - Se mantiene **fila/rejilla** (no columna).
  - Se reduce `padding` y tamaño del ícono.
  - Cada botón usa `flex: 1 1 9.5rem` para acomodarse en 1–2 filas sin ocupar toda la pantalla.

### Evitar “corte de información”

El texto de cada botón se imprime con `::after` y se fuerza a una sola línea:

- `white-space: nowrap`
- `overflow: hidden`
- `text-overflow: ellipsis`

Si quieres permitir 2 líneas (por ejemplo en móviles), cambia a:

- `white-space: normal;`
- y opcional: `line-clamp` (requiere reglas extra).

### Hover/Active con color del estado

El hover y el active son por estado:

- Rojo: `background: #ef4444; color: white; border-color: #ef4444;`
- Ámbar: `background: #f59e0b; color: white; border-color: #f59e0b;`
- Verde: `background: #10b981; color: white; border-color: #10b981;`

Como `::before` usa `currentColor`, el ícono automáticamente se vuelve blanco en hover/active.

### Ajustes rápidos recomendados

- **Separación entre botones**: `.wl-reaction-list { gap: ... }`
- **Ancho base de botón**: `.wl-reaction-item { flex: 1 1 ...; min-width: ...; max-width: ... }`
- **Breakpoints**: `@media (max-width: 600px)` (puedes mover a 700px si tu sidebar es estrecho)
- **Sombra en hover**: `.wl-reaction-item:hover { box-shadow: ...; transform: ... }` (mantener sutil para estilo “flat”)

