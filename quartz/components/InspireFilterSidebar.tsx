import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/inspireFilterSidebar.scss"

type InspireCategory = {
  label: string
  value: string
}

// Categorías visibles en el filtro de Inspírate.
// Edita el label para el texto visible y el value para que coincida
// con los tags usados en el frontmatter de las páginas.
const INSPIRE_CATEGORIES: InspireCategory[] = [
  { label: "Historias potentes", value: "Historias-potentes" },
  { label: "Preguntas incómodas", value: "Preguntas-incómodas" },
  { label: "Sobre el internet", value: "Sobre-el-internet" },
  { label: "Curiosidades", value: "Curiosidades" },
  { label: "Metodologías", value: "Metodologías" },
  { label: "De Voltaje a SOLE", value: "De-Voltaje-a-SOLE" },
]

const normalizeTag = (tag: string) => tag.trim().toLowerCase()

export default (() => {
  const InspireFilterSidebar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const tags = INSPIRE_CATEGORIES.map((cat) => ({
      value: normalizeTag(cat.value),
      label: cat.label,
    }))

    const filterScript = `
      (function() {
        if (window._inspireFilterGlobalAttached) {
             // Si ya están los listeners globales, solo aseguramos que el filtro se aplique al navegar
             return; 
        }
        window._inspireFilterGlobalAttached = true;

        // Helper para obtener tarjetas (siempre busca en el DOM actual)
        const getCards = () => document.querySelectorAll('.page-card-grid.section-inspire .page-card');

        // Función de filtrado
        const filterCards = () => {
          const cards = getCards();
          if (cards.length === 0) return;

          // Obtenemos los tags activos de cualquier botón activo en el DOM
          const activeTagsSet = new Set();
          document.querySelectorAll('.inspire-filter-btn.active').forEach(btn => {
            if (btn.dataset.filterTag) {
              activeTagsSet.add(btn.dataset.filterTag.toLowerCase());
            }
          });
          const selectedTags = Array.from(activeTagsSet);

          cards.forEach(card => {
            if (selectedTags.length === 0) {
              card.style.display = 'block';
              return;
            }
            const cardTagsStr = card.dataset.tags || '';
            const cardTags = cardTagsStr.toLowerCase().split(',').map(t => t.trim());
            const matches = selectedTags.some(tag => cardTags.includes(tag));
            card.style.display = matches ? 'block' : 'none';
          });
        };

        // Delegación de eventos global
        document.addEventListener('click', (e) => {
          // Manejar clic en botón de filtro
          const btn = e.target.closest('.inspire-filter-btn');
          if (btn) {
            e.preventDefault();
            e.stopPropagation(); // Evitar propagación para prevenir dobles manejos si hay otros listeners
            
            const tag = btn.dataset.filterTag;
            
            // Sincronización: Buscar TODOS los botones con este tag
            const allMatchingButtons = document.querySelectorAll(\`button[data-filter-tag="\${tag}"]\`);
            
            // Determinar nuevo estado (toggle) basado en el botón clickeado
            const newState = !btn.classList.contains('active');

            allMatchingButtons.forEach(b => {
              if (newState) b.classList.add('active');
              else b.classList.remove('active');
            });

            filterCards();
            return;
          }

          // Manejar clic en reset
          const resetBtn = e.target.closest('.inspire-filter-reset');
          if (resetBtn) {
             e.preventDefault();
             e.stopPropagation();
             
             document.querySelectorAll('.inspire-filter-btn.active').forEach(b => {
               b.classList.remove('active');
             });
             filterCards();
          }
        });

        // Re-aplicar filtro al navegar (por si el DOM cambió pero el estado visual se perdió o para inicializar)
        document.addEventListener('nav', () => {
             // Pequeño delay para asegurar que el DOM nuevo esté listo
             setTimeout(filterCards, 50);
        });
        
        // Ejecución inicial
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            filterCards();
        } else {
            document.addEventListener('DOMContentLoaded', filterCards);
        }

      })();
    `

    return (
      <div class={`inspire-filter ${displayClass ?? ""}`} role="region" aria-label="Filtro de categorías">
        <div class="inspire-filter-header">
          <h3>Categorías</h3>
          <button type="button" class="inspire-filter-reset" data-filter-reset>
            Limpiar
          </button>
        </div>
        <div class="inspire-filter-options">
          {tags.map((tag) => (
            <button
              type="button"
              class="inspire-filter-btn"
              data-filter-tag={tag.value}
            >
              {tag.label}
            </button>
          ))}
        </div>
        <script dangerouslySetInnerHTML={{ __html: filterScript }} />
      </div>
    )
  }

  InspireFilterSidebar.css = style
  return InspireFilterSidebar
}) satisfies QuartzComponentConstructor
