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

    return (
      <div class="solve-grid-wrapper">
        <p class="solve-count">{list.length} soluciones en esta carpeta.</p>
        
        {/* Grid de tarjetas - Estilo masonry como Inspire */}
        <div class="solve-card-grid">
          {list.map((page) => {
            const title = titleFallback(page)
            const description = page.frontmatter?.description as string | undefined
            const dificultad = page.frontmatter?.dificultad as string | undefined
            const costo = page.frontmatter?.costo as string | undefined
            const tarda = page.frontmatter?.tarda as string | undefined
            const tags = (page.frontmatter?.tags as string[] | undefined) ?? []
            
            const diffNum = dificultad ? (difficultyMap[dificultad] ?? 2) : 2
            const costNum = costo ? (costMap[costo] ?? 1) : 1
            const timeNum = tarda ? (timeMap[tarda] ?? 2) : 2
            
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
                  {description && (
                    <p class="solve-card-summary">{description}</p>
                  )}
                </div>
                {tags.length > 0 && (
                  <div class="solve-card-tags">
                    {tags.slice(0, 3).map((tag) => (
                      <span class="solve-card-tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  SolveFilterGrid.css = style
  return SolveFilterGrid
}) satisfies QuartzComponentConstructor
