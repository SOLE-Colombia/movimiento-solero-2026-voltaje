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
          {/* Categorías */}
          <div class="filter-section">
            <h4 class="section-title">Categorías</h4>
            <div class="checkbox-list">
              {categories.map((cat) => (
                <label class="checkbox-item">
                  <input 
                    type="checkbox" 
                    class="category-checkbox" 
                    value={cat}
                  />
                  <span class="checkbox-label">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          
          <hr class="filter-divider" />
          
          {/* Dificultad */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Dificultad</h4>
              <button class="section-reset diff-reset">Limpiar</button>
            </div>
            <input 
              type="range" 
              class="filter-slider diff-slider"
              min="0" 
              max="3" 
              value="3" 
            />
            <div class="slider-labels">
              <span>⚡</span>
              <span>⚡⚡</span>
              <span>⚡⚡⚡</span>
              <span>⚡⚡⚡⚡</span>
            </div>
          </div>
          
          {/* Costo */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Costo</h4>
              <button class="section-reset cost-reset">Limpiar</button>
            </div>
            <input 
              type="range" 
              class="filter-slider cost-slider"
              min="0" 
              max="4" 
              value="4" 
            />
            <div class="slider-labels cost-labels">
              <span>Gratis</span>
              <span>$</span>
              <span>$$</span>
              <span>$$$</span>
              <span>Mensual</span>
            </div>
          </div>
          
          {/* Tarda */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Tarda</h4>
              <button class="section-reset time-reset">Limpiar</button>
            </div>
            <input 
              type="range" 
              class="filter-slider time-slider"
              min="0" 
              max="2" 
              value="2" 
            />
            <div class="slider-labels">
              <span>Minutos</span>
              <span>Horas</span>
              <span>Días</span>
            </div>
          </div>
          
          {/* Ayudantes */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Ayudantes</h4>
              <button class="section-reset helpers-reset">Limpiar</button>
            </div>
            <input 
              type="range" 
              class="filter-slider helpers-slider"
              min="0" 
              max="3" 
              value="3" 
            />
            <div class="slider-labels">
              <span>Sin ayudantes</span>
              <span>1 ayu.</span>
              <span>2-3 ayu.</span>
              <span>+3 ayu.</span>
            </div>
          </div>
          
          {/* Permite */}
          <div class="filter-section">
            <div class="section-header">
              <h4 class="section-title">Permite</h4>
              <button class="section-reset permite-reset">Limpiar</button>
            </div>
            <div class="permite-options">
              {permiteOptions.map((opt) => (
                <label class="permite-item">
                  <input 
                    type="checkbox" 
                    class="permite-checkbox" 
                    value={opt}
                  />
                  <span class="permite-label">{opt}</span>
                </label>
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
