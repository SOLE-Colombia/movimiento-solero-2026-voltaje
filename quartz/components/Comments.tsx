import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// Script de inicialización personalizado (widget de reacciones)
// @ts-ignore
import walineScript from "./scripts/waline.inline"

const style = `
.waline-feedback {
  margin-top: 3rem;
  margin-bottom: 2rem;
}

/* Ocultar todo excepto reacciones */
.waline-feedback .wl-editor,
.waline-feedback .wl-header,
.waline-feedback .wl-list,
.waline-feedback .wl-count,
.waline-feedback .wl-powered,
.waline-feedback .wl-login,
.waline-feedback .wl-footer {
  display: none !important;
}

/* Contenedor de reacciones */
.waline-feedback .wl-reaction {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
}

/* Botones base */
.waline-feedback .wl-reaction-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  min-width: 180px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: var(--light);
  color: var(--darkgray);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  position: relative;
}

.waline-feedback .wl-reaction-item span {
  font-size: 1rem;
}

.waline-feedback .wl-reaction-item::after {
  content: "";
  font-size: 0.95rem;
  font-weight: 700;
}

.waline-feedback .wl-reaction-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
}

/* 1) ❌ */
.waline-feedback .wl-reaction-item:nth-child(1) {
  background: #fee2e2;
  border-color: #ef4444;
}
.waline-feedback .wl-reaction-item:nth-child(1)::after {
  content: "No me funcionó";
  color: #b91c1c;
}

/* 2) 😓 */
.waline-feedback .wl-reaction-item:nth-child(2) {
  background: #ffedd5;
  border-color: #f97316;
}
.waline-feedback .wl-reaction-item:nth-child(2)::after {
  content: "Difícil";
  color: #c2410c;
}

/* 3) 😐 */
.waline-feedback .wl-reaction-item:nth-child(3) {
  background: #f3f4f6;
  border-color: #9ca3af;
}
.waline-feedback .wl-reaction-item:nth-child(3)::after {
  content: "Regular";
  color: #4b5563;
}

/* 4) 🙂 */
.waline-feedback .wl-reaction-item:nth-child(4) {
  background: #dbeafe;
  border-color: #3b82f6;
}
.waline-feedback .wl-reaction-item:nth-child(4)::after {
  content: "Útil";
  color: #1d4ed8;
}

/* 5) 🚀 */
.waline-feedback .wl-reaction-item:nth-child(5) {
  background: #dcfce7;
  border-color: #22c55e;
}
.waline-feedback .wl-reaction-item:nth-child(5)::after {
  content: "¡Me funcionó!";
  color: #15803d;
}

@media (max-width: 700px) {
  .waline-feedback .wl-reaction {
    flex-direction: column;
  }
  .waline-feedback .wl-reaction-item {
    width: 100%;
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
