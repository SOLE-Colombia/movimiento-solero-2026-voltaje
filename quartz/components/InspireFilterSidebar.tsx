import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/inspireFilterSidebar.scss"

const normalizeTag = (tag: string) => tag.trim().toLowerCase()

export default (() => {
  const InspireFilterSidebar: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
    const tagMap = new Map<string, string>()
    for (const page of allFiles) {
      const raw = (page.frontmatter?.categories ?? page.frontmatter?.tags ?? []) as string[] | string
      const tags = Array.isArray(raw) ? raw : [raw]
      for (const tag of tags) {
        if (typeof tag !== "string") continue
        const normalized = normalizeTag(tag)
        if (!normalized) continue
        if (!tagMap.has(normalized)) {
          tagMap.set(normalized, tag.trim())
        }
      }
    }

    const tags = Array.from(tagMap.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label, "es"))

    const filterScript = `
      document.addEventListener('DOMContentLoaded', function() {
        const wrapper = document.querySelector('.inspire-filter');
        if (!wrapper) return;
        const checkboxes = wrapper.querySelectorAll('input[type="checkbox"][data-filter-tag]');
        const resetBtn = wrapper.querySelector('[data-filter-reset]');
        const cards = document.querySelectorAll('.page-card-grid.section-inspire .page-card');
        const totalOptions = checkboxes.length;

        function getSelected() {
          const selected = [];
          checkboxes.forEach(cb => {
            if (cb.checked) selected.push(cb.value);
          });
          return selected;
        }

        function showAll() {
          cards.forEach(card => {
            card.style.display = '';
          });
        }

        function filterCards() {
          const selected = getSelected();
          if (selected.length === 0 || selected.length === totalOptions) {
            showAll();
            return;
          }

          cards.forEach(card => {
            const tags = (card.dataset.tags || '').split(',').filter(Boolean);
            const match = selected.some(tag => tags.includes(tag));
            card.style.display = match ? '' : 'none';
          });
        }

        function resetFilters() {
          checkboxes.forEach(cb => { cb.checked = false; });
          showAll();
        }

        checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
        if (resetBtn) resetBtn.addEventListener('click', resetFilters);
      });
    `

    return (
      <div class="inspire-filter" role="region" aria-label="Filtros de categorías">
        <div class="inspire-filter-header">
          <h3>Filtros</h3>
          <button type="button" class="inspire-filter-reset" data-filter-reset>
            Limpiar
          </button>
        </div>
        <div class="inspire-filter-section">
          <h4>Categorías</h4>
          <div class="inspire-filter-options">
            {tags.map((tag) => (
              <label class="inspire-filter-option">
                <input type="checkbox" data-filter-tag value={tag.value} />
                <span>{tag.label}</span>
              </label>
            ))}
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: filterScript }} />
      </div>
    )
  }

  InspireFilterSidebar.css = style
  return InspireFilterSidebar
}) satisfies QuartzComponentConstructor
