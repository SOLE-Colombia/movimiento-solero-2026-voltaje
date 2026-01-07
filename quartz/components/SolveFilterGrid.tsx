import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/solveFilterGrid.scss"
import { byDateAndAlphabeticalFolderFirst } from "./PageList"

// Mapeo de valores cualitativos a numéricos
const difficultyMap: Record<string, number> = {
  "Fácil": 1,
  "Medio": 2,
  "Complejo": 3,
}

const costMap: Record<string, number> = {
  "Gratis": 0,
  "< USD 25": 1,
  "USD 25 - 50": 2,
  "> USD 50": 3,
  "Gasto mensual": 3,
}

const timeMap: Record<string, number> = {
  "Minutos": 1,
  "Horas": 2,
  "Días": 3,
}

// Categorías disponibles
const categories = ["Señal", "Dispositivos", "Personas", "Electricidad", "Espacio"]

const titleFallback = (page: QuartzPluginData): string => {
  const title = page.frontmatter?.title
  if (typeof title === "string" && title.trim().length > 0) return title.trim()
  const slug = page.slug ?? ""
  if (slug.length === 0) return "Sin título"
  const parts = slug.split("/").filter(Boolean)
  return parts[parts.length - 1] ?? slug
}

interface SolveFilterGridOptions {
  showFolderCount?: boolean
}

export default ((opts?: SolveFilterGridOptions) => {
  const SolveFilterGrid: QuartzComponent = (props: QuartzComponentProps) => {
    const { cfg, fileData, allFiles } = props

    const sorter = byDateAndAlphabeticalFolderFirst(cfg)
    const list = allFiles.sort(sorter)

    // Script de filtrado - solo se activa con interacción del usuario
    const filterScript = `
    document.addEventListener('DOMContentLoaded', function() {
      const diffSlider = document.getElementById('diff-slider');
      const costSlider = document.getElementById('cost-slider');
      const timeSlider = document.getElementById('time-slider');
      const checkboxes = document.querySelectorAll('.category-checkbox');
      const cards = document.querySelectorAll('.solve-card');
      const diffValue = document.getElementById('diff-value');
      const costValue = document.getElementById('cost-value');
      const timeValue = document.getElementById('time-value');
      const countDisplay = document.getElementById('card-count');
      const resetBtn = document.getElementById('filter-reset');
      
      const diffLabels = ['', 'Fácil', 'Medio', 'Complejo'];
      const costLabels = ['Gratis', '$', '$$', '$$$'];
      const timeLabels = ['', 'Min', 'Hrs', 'Días'];
      
      // Estado: filtros inactivos hasta primera interacción
      let filtersActive = false;
      
      function updateLabels() {
        if (diffValue) diffValue.textContent = diffLabels[diffSlider.value] || '';
        if (costValue) costValue.textContent = costLabels[costSlider.value] || '';
        if (timeValue) timeValue.textContent = timeLabels[timeSlider.value] || '';
      }
      
      function getCheckedCategories() {
        const checked = [];
        checkboxes.forEach(cb => {
          if (cb.checked) checked.push(cb.value);
        });
        return checked;
      }
      
      function filterCards() {
        // Solo filtrar si el usuario ha interactuado
        if (!filtersActive) {
          updateLabels();
          return;
        }
        
        const maxDiff = parseInt(diffSlider.value);
        const maxCost = parseInt(costSlider.value);
        const maxTime = parseInt(timeSlider.value);
        const selectedCats = getCheckedCategories();
        
        let visibleCount = 0;
        
        cards.forEach(card => {
          const cardDiff = parseInt(card.dataset.difficulty) || 0;
          const cardCost = parseInt(card.dataset.cost) || 0;
          const cardTime = parseInt(card.dataset.time) || 0;
          const cardCats = (card.dataset.categories || '').split(',').filter(Boolean);
          
          const matchesDiff = cardDiff <= maxDiff;
          const matchesCost = cardCost <= maxCost;
          const matchesTime = cardTime <= maxTime;
          const matchesCat = selectedCats.length === 0 || 
            selectedCats.some(cat => cardCats.includes(cat));
          
          if (matchesDiff && matchesCost && matchesTime && matchesCat) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        if (countDisplay) {
          countDisplay.textContent = visibleCount + ' soluciones';
        }
        
        updateLabels();
      }
      
      function activateAndFilter() {
        filtersActive = true;
        filterCards();
      }
      
      function resetFilters() {
        filtersActive = false;
        diffSlider.value = 3;
        costSlider.value = 3;
        timeSlider.value = 3;
        checkboxes.forEach(cb => cb.checked = false);
        
        // Mostrar todas las tarjetas
        cards.forEach(card => card.style.display = 'flex');
        if (countDisplay) countDisplay.textContent = cards.length + ' soluciones';
        updateLabels();
      }
      
      // Event listeners - activan filtros en primera interacción
      if (diffSlider) diffSlider.addEventListener('input', activateAndFilter);
      if (costSlider) costSlider.addEventListener('input', activateAndFilter);
      if (timeSlider) timeSlider.addEventListener('input', activateAndFilter);
      checkboxes.forEach(cb => cb.addEventListener('change', activateAndFilter));
      if (resetBtn) resetBtn.addEventListener('click', resetFilters);
      
      // Inicializar labels sin filtrar
      updateLabels();
      if (countDisplay) countDisplay.textContent = cards.length + ' soluciones';
    });
    `

    return (
      <div class="solve-filter-wrapper">
        {/* Barra de filtros horizontal arriba */}
        <div class="solve-filter-bar">
          <div class="filter-header">
            <span class="filter-icon">⚡</span>
            <span class="filter-title">Filtrar soluciones</span>
            <span id="card-count" class="filter-count">{list.length} soluciones</span>
            <button id="filter-reset" class="filter-reset-btn">Limpiar</button>
          </div>
          
          <div class="filter-controls">
            <div class="filter-group">
              <label class="filter-label">
                <span class="label-text">Dificultad</span>
                <span id="diff-value" class="label-value">Complejo</span>
              </label>
              <input 
                type="range" 
                id="diff-slider" 
                min="1" 
                max="3" 
                value="3" 
                class="pixel-slider"
              />
              <div class="slider-marks">
                <span>Fácil</span>
                <span>Medio</span>
                <span>Complejo</span>
              </div>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">
                <span class="label-text">Costo</span>
                <span id="cost-value" class="label-value">$$$</span>
              </label>
              <input 
                type="range" 
                id="cost-slider" 
                min="0" 
                max="3" 
                value="3" 
                class="pixel-slider"
              />
              <div class="slider-marks">
                <span>Gratis</span>
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
              </div>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">
                <span class="label-text">Tiempo</span>
                <span id="time-value" class="label-value">Días</span>
              </label>
              <input 
                type="range" 
                id="time-slider" 
                min="1" 
                max="3" 
                value="3" 
                class="pixel-slider"
              />
              <div class="slider-marks">
                <span>Min</span>
                <span>Hrs</span>
                <span>Días</span>
              </div>
            </div>
            
            <div class="filter-group filter-categories">
              <label class="filter-label">
                <span class="label-text">Categorías</span>
              </label>
              <div class="checkbox-group">
                {categories.map((cat) => (
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      class="category-checkbox filter-checkbox" 
                      value={cat}
                    />
                    <span class="checkbox-text">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid de tarjetas - 3 columnas */}
        <div class="solve-card-grid">
          {list.map((page) => {
            const title = titleFallback(page)
            const dificultad = page.frontmatter?.dificultad as string | undefined
            const costo = page.frontmatter?.costo as string | undefined
            const tarda = page.frontmatter?.tarda as string | undefined
            const tags = (page.frontmatter?.tags as string[] | undefined) ?? []
            
            const diffNum = dificultad ? (difficultyMap[dificultad] ?? 2) : 2
            const costNum = costo ? (costMap[costo] ?? 1) : 1
            const timeNum = tarda ? (timeMap[tarda] ?? 2) : 2
            
            // Renderizar iconos de costo
            const costIcon = costo === "Gratis" ? "Ⓢ" : 
                            costo?.includes("< USD 25") ? "ⓈⓈ" : 
                            costo?.includes("25 - 50") ? "ⓈⓈ" : "ⓈⓈⓈ"
            
            // Renderizar iconos de tiempo
            const timeIcon = tarda === "Minutos" ? "⏱" : 
                            tarda === "Horas" ? "⏱⏱" : "⏱⏱⏱"
            
            return (
              <a
                href={resolveRelative(fileData.slug!, page.slug!)}
                class="solve-card"
                data-difficulty={diffNum}
                data-cost={costNum}
                data-time={timeNum}
                data-categories={tags.join(",")}
              >
                <div class="solve-card-body">
                  <h3 class="solve-card-title">{title}</h3>
                </div>
                <div class="solve-card-meta">
                  {dificultad && <span class="meta-item difficulty">{dificultad}</span>}
                  {costo && <span class="meta-item cost">{costIcon}</span>}
                  {tarda && <span class="meta-item time">{timeIcon}</span>}
                </div>
                {tags.length > 0 && (
                  <div class="solve-card-tags">
                    {tags.slice(0, 2).map((tag) => (
                      <span class="tag-badge">{tag}</span>
                    ))}
                  </div>
                )}
              </a>
            )
          })}
        </div>
        
        <script dangerouslySetInnerHTML={{ __html: filterScript }} />
      </div>
    )
  }

  SolveFilterGrid.css = style
  return SolveFilterGrid
}) satisfies QuartzComponentConstructor
