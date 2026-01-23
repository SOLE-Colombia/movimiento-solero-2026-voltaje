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
  --waline-border-color: #4f4f4f;
  --waline-color: var(--darkgray);
  --waline-info-color: var(--darkgray);
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
  font-family: var(--bodyFont);
}

/* 1. LIMPIEZA DE INTERFAZ (Ocultar extras) */
.wl-info, .wl-sort, .wl-refresh, .wl-count, .wl-powered {
  display: none !important;
}

.wl-panel {
  margin: 0 !important;
  padding: 1rem 1.25rem !important;
  border: 3px solid #4f4f4f !important;
  border-radius: 1px !important;
  background: var(--light) !important;
  box-shadow: none !important;
}

.wl-header {
  border-bottom: 2px solid #4f4f4f !important;
}

.wl-header-item {
  align-items: stretch !important;
}

.wl-header-item:not(:last-child) {
  border-right: 2px solid #4f4f4f !important;
}

.wl-header label {
  font-family: var(--bodyFont) !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--dark) !important;
}

.wl-input {
  font-family: var(--bodyFont) !important;
  font-size: 0.85rem !important;
}

.wl-editor {
  background: var(--light) !important;
  font-family: var(--bodyFont) !important;
  padding: 0.75rem !important;
  padding-right: -80px !important;
}

.wl-editor:focus,
.wl-input:focus {
  background: var(--lightgray) !important;
}

.wl-footer {
  border-top: 2px solid #4f4f4f !important;
  margin-top: 0.75rem !important;
  padding-top: 0.75rem !important;
}

.wl-btn {
  border: 2px solid #4f4f4f !important;
  border-radius: 1px !important;
  font-family: var(--bodyFont) !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  background: var(--light) !important;
  color: var(--dark) !important;
  box-shadow: none !important;
}

.wl-btn.primary {
  background: var(--secondary) !important;
  color: var(--light) !important;
}

.wl-btn.primary:hover,
.wl-btn.primary:active {
  background: var(--dark) !important;
}

.wl-cards .wl-user .wl-user-avatar {
  border: 2px solid #4f4f4f !important;
}

.wl-card {
  border: 2px solid #4f4f4f !important;
  border-radius: 1px !important;
  background: var(--light) !important;
  padding: 0.75rem 1rem !important;
  box-shadow: none !important;
}

.wl-card-item {
  padding: 0.5rem 0 !important;
}

.wl-card .wl-nick,
.wl-card span.wl-nick {
  font-family: var(--bodyFont) !important;
  color: var(--dark) !important;
}

.wl-card .wl-content {
  font-family: var(--bodyFont) !important;
}

.wl-empty {
  font-family: var(--bodyFont) !important;
  font-size: 0.95rem !important;
  color: var(--dark) !important;
}

/* Acciones pesadas desactivadas (gif, upload, preview) */
.wl-action[title="GIF"],
.wl-action[title="Previsualizar"],
label[for="wl-image-upload"],
#wl-image-upload,
.wl-gif-popup {
  display: none !important;
}

.wl-reaction-title {
  font-family: var(--headerFont) !important;
  font-size: clamp(1.2rem, 2.4vw, 1.6rem) !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em;
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
  border: 3px solid #4f4f4f !important;
  border-radius: 1px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  background: var(--light) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease !important;
  cursor: pointer !important;
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
  box-shadow: 8px 8px 0 #4f4f4f !important;
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
.wl-reaction-item:nth-child(1) { color: #ef4444; }
.wl-reaction-item:nth-child(1):hover,
.wl-reaction-item:nth-child(1).active {
  background: #ef4444 !important;
  color: white !important;
  border-color: #4f4f4f !important;
}

/* Icono 2: Regular (Neutro) */
.wl-reaction-item:nth-child(2)::before {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>');
}
.wl-reaction-item:nth-child(2) { color: #f59e0b; }
.wl-reaction-item:nth-child(2):hover,
.wl-reaction-item:nth-child(2).active {
  background: #f59e0b !important;
  color: white !important;
  border-color: #4f4f4f !important;
}

/* Icono 3: Funcionó (Check/Rocket) */
.wl-reaction-item:nth-child(3)::before {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>');
}
.wl-reaction-item:nth-child(3) { color: #10b981; }
.wl-reaction-item:nth-child(3):hover,
.wl-reaction-item:nth-child(3).active {
  background: #10b981 !important;
  color: white !important;
  border-color: #4f4f4f !important;
}

/* Textos personalizados vía CSS si Waline no los inyecta bien */
.wl-reaction-item::after {
  /* Previene “corte” y desbordes: se mantiene en una sola línea */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-family: var(--bodyFont) !important;
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
  box-shadow: 8px 8px 0 #4f4f4f !important;
}
.wl-reaction-item:hover .wl-reaction-votes,
.wl-reaction-item.active .wl-reaction-votes {
  color: currentColor !important; /* en hover/active queda blanco por la regla de estado */
  opacity: 0.9 !important;
}

@media (max-width: 600px) {
  .wl-header-item:not(:last-child) {
    border-right: none !important;
    border-bottom: 2px solid #4f4f4f !important;
  }

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
