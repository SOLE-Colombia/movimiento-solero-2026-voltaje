import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// Script de inicialización personalizado (widget de reacciones)
// @ts-ignore
import walineScript from "./scripts/waline.inline"

const style = `
:root {
  /* Mapeo de variables Quartz -> Waline */
  --waline-theme-color: var(--secondary);
  --waline-bgcolor: var(--light);
  --waline-bgcolor-light: var(--lightgray);
  --waline-text-color: var(--darkgray);
  --waline-border-color: var(--lightgray);
  --waline-disable-bgcolor: var(--lightgray);
  --waline-info-bgcolor: var(--lightgray);
  --waline-white: var(--light);
}

.waline-feedback {
  margin-top: 4rem;
  margin-bottom: 2rem;
  width: 100%;
  border-top: 1px solid var(--lightgray);
  padding-top: 2rem;
}

/* 1. LIMPIEZA DE INTERFAZ (Ocultar extras) */
.wl-header, .wl-editor, .wl-footer, .wl-info, .wl-sort, .wl-refresh, .wl-count, .wl-powered {
  display: none !important;
}

.wl-panel {
  border: none !important;
  background: transparent !important;
  margin: 0 !important;
}

.wl-reaction-title {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: var(--dark) !important;
  margin-bottom: 1.5rem !important;
  text-align: center !important;
}

/* 2. LAYOUT BASE (Horizontal/compacto, responsive-first) */
.wl-reaction-list {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  width: 100% !important;
  padding: 0 !important;
  flex-wrap: wrap !important;
}

.wl-reaction-item {
  /* Fluido: evita cortes en desktop y se adapta en tablet/móvil */
  flex: 1 1 12.5rem !important;
  min-width: 9.5rem !important;
  max-width: 16rem !important;
  margin: 0 !important;
  padding: 0.75rem 1rem !important;
  border: 1px solid var(--lightgray) !important;
  border-radius: 12px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  background: var(--light) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer !important;
  box-shadow: none !important; /* flat por defecto */
  line-height: 1.1 !important;
}

/* Accesibilidad / UX: foco visible */
.wl-reaction-item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--secondary) 60%, transparent);
  outline-offset: 2px;
}

.wl-reaction-item.active {
  /* El color real de active se define por estado (ver reglas nth-child) */
  transform: translateY(-1px);
}

/* 3. SOLUCIÓN SVGS EN LÍNEA */
.wl-reaction-img {
  display: none !important; /* Ocultamos los broken icons de Waline */
}

.wl-reaction-item::before {
  content: "";
  width: 1.4rem;
  height: 1.4rem;
  background-color: currentColor;
  display: inline-block;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

/* Icono 1: No funcionó (X) */
.wl-reaction-item:nth-child(1)::before {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');
}
.wl-reaction-item:nth-child(1) { color: #ef4444; border-color: color-mix(in srgb, #ef4444 35%, var(--lightgray)); }
.wl-reaction-item:nth-child(1):hover,
.wl-reaction-item:nth-child(1).active {
  background: #ef4444 !important;
  color: white !important;
  border-color: #ef4444 !important;
}

/* Icono 2: Regular (Neutro) */
.wl-reaction-item:nth-child(2)::before {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>');
}
.wl-reaction-item:nth-child(2) { color: #f59e0b; border-color: color-mix(in srgb, #f59e0b 35%, var(--lightgray)); }
.wl-reaction-item:nth-child(2):hover,
.wl-reaction-item:nth-child(2).active {
  background: #f59e0b !important;
  color: white !important;
  border-color: #f59e0b !important;
}

/* Icono 3: Funcionó (Check/Rocket) */
.wl-reaction-item:nth-child(3)::before {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>');
}
.wl-reaction-item:nth-child(3) { color: #10b981; border-color: color-mix(in srgb, #10b981 35%, var(--lightgray)); }
.wl-reaction-item:nth-child(3):hover,
.wl-reaction-item:nth-child(3).active {
  background: #10b981 !important;
  color: white !important;
  border-color: #10b981 !important;
}

/* Textos personalizados vía CSS si Waline no los inyecta bien */
.wl-reaction-item::after {
  /* Previene “corte” y desbordes: se mantiene en una sola línea */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.wl-reaction-item:nth-child(1)::after { content: "No funcionó"; font-weight: 600; font-size: 0.9rem; }
.wl-reaction-item:nth-child(2)::after { content: "Regular"; font-weight: 600; font-size: 0.9rem; }
.wl-reaction-item:nth-child(3)::after { content: "Funcionó"; font-weight: 600; font-size: 0.9rem; }

.wl-reaction-votes {
  font-size: 0.8rem !important;
  opacity: 0.65 !important;
  font-family: var(--codeFont) !important;
  color: var(--darkgray) !important;
}

/* Hover “flat”: solo levanta un poco + refuerzo de contraste */
.wl-reaction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
.wl-reaction-item:hover .wl-reaction-votes,
.wl-reaction-item.active .wl-reaction-votes {
  color: currentColor !important; /* en hover/active queda blanco por la regla de estado */
  opacity: 0.9 !important;
}

@media (max-width: 600px) {
  .wl-reaction-list {
    /* Mobile compacto: fila/rejilla, no “tarjetas gigantes” */
    justify-content: center !important;
    gap: 0.6rem !important;
  }
  .wl-reaction-item {
    padding: 0.6rem 0.75rem !important;
    flex: 1 1 9.5rem !important;
    min-width: 8.75rem !important;
    max-width: 100% !important;
  }
  .wl-reaction-item::before {
    width: 1.2rem;
    height: 1.2rem;
  }
  .wl-reaction-item:nth-child(1)::after,
  .wl-reaction-item:nth-child(2)::after,
  .wl-reaction-item:nth-child(3)::after {
    font-size: 0.85rem;
  }
}
`

export default (() => {
  const Comments: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div class="waline-feedback">
        <link
          rel="stylesheet"
          href="https://unpkg.com/@waline/client@3.4.2/dist/waline.css"
        />
        <div id="waline"></div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    )
  }

  Comments.afterDOMLoaded = walineScript
  return Comments
}) satisfies QuartzComponentConstructor
