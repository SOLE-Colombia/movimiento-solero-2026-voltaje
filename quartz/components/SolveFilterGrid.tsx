import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/solveFilterGrid.scss"
import { byDateAndAlphabeticalFolderFirst } from "./PageList"

// Mapeo de valores cualitativos a numéricos
const difficultyMap: Record<string, number> = {
  "Fácil": 1,
  "Medio": 2,
  "Difícil": 3,
  "Complejo": 4,
}

const costMap: Record<string, number> = {
  "Gratis": 0,
  "< USD 25": 1,
  "USD 25 - 50": 2,
  "> USD 50": 3,
  "Gasto mensual": 4,
  "Mensual": 4,
}

const timeMap: Record<string, number> = {
  "Minutos": 1,
  "Horas": 2,
  "Días": 3,
}

const helpersMap: Record<string, number> = {
  "Sin ayudantes": 1,
  "1 persona": 2,
  "2-3 personas": 3,
  "Más de 3 personas": 4,
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

const clampCount = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const iconSrc = (baseSlug: FullSlug, metric: string, level: number) =>
  resolveRelative(baseSlug, `assets/icons/solve-${metric}-${level}.svg` as FullSlug)

const renderMetricIcon = (
  baseSlug: FullSlug,
  level: number,
  className: string,
  label: string,
) => (
  <span class={`solve-card-metric ${className}`} aria-label={label} title={label}>
    <img
      class="solve-card-metric-icon"
      src={iconSrc(baseSlug, className, level)}
      alt=""
      aria-hidden="true"
    />
  </span>
)

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
            const resumen = (page.frontmatter?.resumen ??
              page.frontmatter?.description ??
              page.description) as string | undefined
            const dificultad = page.frontmatter?.dificultad as string | undefined
            const costo = page.frontmatter?.costo as string | undefined
            const tarda = page.frontmatter?.tarda as string | undefined
            const ayudantes = page.frontmatter?.ayudantes as string | undefined
            const tags = (page.frontmatter?.tags as string[] | undefined) ?? []
            
            const diffNum = dificultad ? (difficultyMap[dificultad] ?? 2) : 2
            const costNum = costo ? (costMap[costo] ?? 1) : 1
            const timeNum = tarda ? (timeMap[tarda] ?? 2) : 2
            const helpersNum = ayudantes ? (helpersMap[ayudantes] ?? 1) : 1
            const showMeta = Boolean(dificultad || costo || tarda || ayudantes)

            const diffLevel = clampCount(diffNum, 1, 4)
            const costLevel = clampCount(costNum + 1, 1, 5)
            const timeLevel = clampCount(timeNum, 1, 3)
            const helpersLevel = clampCount(helpersNum, 1, 4)
            
            return (
              <a
                href={resolveRelative(fileData.slug!, page.slug!)}
                class="solve-card"
                data-difficulty={diffNum}
                data-cost={costNum}
                data-time={timeNum}
                data-helpers={helpersNum}
                data-categories={tags.join(",")}
              >
                <div class="solve-card-body">
                  <h3 class="solve-card-title">{title}</h3>
                  {resumen && (
                    <p class="solve-card-summary">{resumen}</p>
                  )}
                </div>
                {tags.length > 0 && (
                  <div class="solve-card-tags">
                    {tags.slice(0, 3).map((tag) => (
                      <span class="solve-card-tag">#{tag}</span>
                    ))}
                  </div>
                )}
                {showMeta && (
                  <div class="solve-card-meta">
                    {renderMetricIcon(
                      fileData.slug!,
                      diffLevel,
                      "difficulty",
                      `Dificultad: ${dificultad ?? "Sin dato"}`,
                    )}
                    {renderMetricIcon(fileData.slug!, costLevel, "cost", `Costo: ${costo ?? "Sin dato"}`)}
                    {renderMetricIcon(fileData.slug!, timeLevel, "time", `Tarda: ${tarda ?? "Sin dato"}`)}
                    {renderMetricIcon(
                      fileData.slug!,
                      helpersLevel,
                      "helpers",
                      `Ayudantes: ${ayudantes ?? "Sin dato"}`,
                    )}
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
