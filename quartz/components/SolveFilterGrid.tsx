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
      </div>
    )
  }

  SolveFilterGrid.css = style
  return SolveFilterGrid
}) satisfies QuartzComponentConstructor
