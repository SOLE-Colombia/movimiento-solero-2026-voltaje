import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Renderizar iconos de costo
const renderCostIcons = (costo: string): string => {
  if (costo === "Gratis") return "Ⓢ"
  if (costo.includes("< USD 25")) return "ⓈⓈ"
  if (costo.includes("25 - 50")) return "ⓈⓈ"
  return "ⓈⓈⓈ"
}

// Renderizar iconos de tiempo
const renderTimeIcons = (tarda: string): string => {
  if (tarda === "Minutos") return "⏱"
  if (tarda === "Horas") return "⏱⏱"
  return "⏱⏱⏱"
}

// Obtener color de dificultad
const getDifficultyColor = (dificultad: string): string => {
  switch (dificultad) {
    case "Fácil": return "var(--tertiary)"
    case "Medio": return "var(--secondary)"
    case "Complejo": return "#eb3b81"
    default: return "var(--gray)"
  }
}

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags as string[] | undefined
  const dificultad = fileData.frontmatter?.dificultad as string | undefined
  const costo = fileData.frontmatter?.costo as string | undefined
  const tarda = fileData.frontmatter?.tarda as string | undefined

  // Si no hay ningún dato, no renderizar nada
  const hasMetadata = dificultad || costo || tarda
  const hasTags = tags && tags.length > 0

  if (!hasMetadata && !hasTags) {
    return null
  }

  return (
    <div class={classNames(displayClass, "content-meta-bar")}>
      {/* Metadata con iconos */}
      {hasMetadata && (
        <div class="meta-icons">
          {dificultad && (
            <span 
              class="meta-badge difficulty" 
              data-difficulty={dificultad}
              title={`Dificultad: ${dificultad}`}
            >
              <span class="meta-icon">⚡</span>
              <span class="meta-text">{dificultad}</span>
            </span>
          )}
          {costo && (
            <span class="meta-badge cost" title={`Costo: ${costo}`}>
              <span class="meta-icon">{renderCostIcons(costo)}</span>
              <span class="meta-text-mobile">{costo}</span>
            </span>
          )}
          {tarda && (
            <span class="meta-badge time" title={`Tiempo: ${tarda}`}>
              <span class="meta-icon">{renderTimeIcons(tarda)}</span>
              <span class="meta-text-mobile">{tarda}</span>
            </span>
          )}
        </div>
      )}

      {/* Tags */}
      {hasTags && (
        <ul class="tags">
          {tags.map((tag) => {
            const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
            return (
              <li>
                <a href={linkDest} class="internal tag-link">
                  {tag}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

TagList.css = `
.content-meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: var(--lightgray);
  border-radius: 8px;
  border-left: 4px solid var(--secondary);
}

/* Meta icons container */
.meta-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

/* Individual badge */
.meta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-family: var(--bodyFont);
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--light);
  border: 1px solid var(--gray);
  color: var(--darkgray);
  transition: all 0.2s ease;
}

.meta-badge:hover {
  border-color: var(--secondary);
  transform: translateY(-1px);
}

.meta-icon {
  font-size: 1rem;
}

.meta-text {
  display: inline;
}

.meta-text-mobile {
  display: none;
}

/* Difficulty colors */
.meta-badge.difficulty[data-difficulty="Fácil"] {
  border-color: var(--tertiary);
  color: var(--tertiary);
}

.meta-badge.difficulty[data-difficulty="Medio"] {
  border-color: var(--secondary);
  color: var(--secondary);
}

.meta-badge.difficulty[data-difficulty="Complejo"] {
  border-color: #eb3b81;
  color: #eb3b81;
}

/* Cost badge */
.meta-badge.cost {
  border-color: #26bfb8;
  color: #26bfb8;
}

/* Time badge */
.meta-badge.time {
  border-color: #F9C369;
  color: #F9C369;
}

/* Tags list */
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 0;
  flex-wrap: wrap;
  flex: 1;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 6px;
  background-color: var(--highlight);
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-size: 0.8rem;
  font-family: var(--bodyFont);
  color: var(--darkgray);
  transition: all 0.2s ease;
}

a.internal.tag-link:hover {
  background-color: var(--secondary);
  color: var(--light);
}

/* Dark mode adjustments */
:root[saved-theme="dark"] .content-meta-bar {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: var(--tertiary);
}

:root[saved-theme="dark"] .meta-badge {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--gray);
}

/* Responsive - Mobile first */
@media (max-width: 768px) {
  .content-meta-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.6rem 0.8rem;
    gap: 0.6rem;
  }

  .meta-icons {
    width: 100%;
    justify-content: flex-start;
  }

  .meta-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }

  .meta-icon {
    font-size: 0.9rem;
  }

  .tags {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .meta-badge {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
  }

  .meta-text {
    display: none;
  }

  .meta-text-mobile {
    display: none;
  }

  a.internal.tag-link {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
  }
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
