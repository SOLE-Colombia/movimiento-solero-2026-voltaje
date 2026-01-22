import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/solveFilterSidebar.scss"
// @ts-ignore
import script from "./scripts/solveFilter.inline"

// Categorías disponibles
const categories = ["Electricidad", "Señal", "Dispositivos", "Personas", "Espacios"]

// Opciones de "Permite"
const permiteOptions = ["Conseguir", "Mejorar", "Compartir", "Medir"]

export default (() => {
  const SolveFilterSidebar: QuartzComponent = (props: QuartzComponentProps) => {
    const { displayClass } = props

    return (
      <div class={`solve-filter-sidebar ${displayClass ?? ""}`}>
        <div class="solve-filter-header">
          <button class="filter-toggle-btn">
            <span class="filter-title">Filtros</span>
            <span class="toggle-arrow">▼</span>
          </button>
          <button class="filter-reset-btn">Limpiar</button>
        </div>
        
        <div class="solve-filter-content">
          {/* Categorías (Botones) */}
          <div class="filter-section">
            <h4 class="section-title">Categorías</h4>
            <div class="buttons-grid">
              {categories.map((cat) => (
                <button 
                  type="button" 
                  class="solve-filter-btn category-btn" 
                  data-value={cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <hr class="filter-divider" />
          
          {/* Dificultad */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Dificultad</h4>
              <span class="section-reset-link" data-slider="diff">Limpiar</span>
            </div>
            <input 
              type="range" 
              class="filter-slider diff-slider"
              min="0" 
              max="3" 
              value="3" 
            />
            <div class="slider-labels diff-labels">
              <span class="label-item">Fácil</span>
              <span class="label-item">Medio</span>
              <span class="label-item">Difícil</span>
              <span class="label-item">Complejo</span>
            </div>
          </div>
          
          {/* Costo */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Costo</h4>
              <span class="section-reset-link" data-slider="cost">Limpiar</span>
            </div>
            <input 
              type="range" 
              class="filter-slider cost-slider"
              min="0" 
              max="4" 
              value="4" 
            />
            <div class="slider-labels cost-labels">
              <span class="label-item">Gratis</span>
              <span class="label-item">$</span>
              <span class="label-item">$$</span>
              <span class="label-item">$$$</span>
              <span class="label-item">Mensual</span>
            </div>
          </div>
          
          {/* Tarda */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Tarda</h4>
              <span class="section-reset-link" data-slider="time">Limpiar</span>
            </div>
            <input 
              type="range" 
              class="filter-slider time-slider"
              min="0" 
              max="2" 
              value="2" 
            />
            <div class="slider-labels time-labels">
              <span class="label-item">Minutos</span>
              <span class="label-item">Horas</span>
              <span class="label-item">Días</span>
            </div>
          </div>
          
          {/* Ayudantes */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Ayudantes</h4>
              <span class="section-reset-link" data-slider="helpers">Limpiar</span>
            </div>
            <input 
              type="range" 
              class="filter-slider helpers-slider"
              min="0" 
              max="3" 
              value="3" 
            />
            <div class="slider-labels helpers-labels">
              <span class="label-item">Solo</span>
              <span class="label-item">1 ayu.</span>
              <span class="label-item">2-3 ayu.</span>
              <span class="label-item">+3 ayu.</span>
            </div>
          </div>
          
          {/* Permite */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Permite</h4>
              <span class="section-reset-link" data-slider="permite">Limpiar</span>
            </div>
            <input 
              type="range" 
              class="filter-slider permite-slider"
              min="0" 
              max="3" 
              value="0" 
            />
            <div class="slider-labels permite-labels">
              {permiteOptions.map((opt) => (
                <span class="label-item">{opt}</span>
              ))}
            </div>
          </div>
          
          <div class="filter-count-mobile">
            <span class="card-count">36 soluciones</span>
          </div>
        </div>
      </div>
    )
  }

  SolveFilterSidebar.css = style
  SolveFilterSidebar.afterDOMLoaded = script
  return SolveFilterSidebar
}) satisfies QuartzComponentConstructor
