import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/randomCards.scss"
import { collectCardPool } from "./randomCardUtils"
import { FullSlug } from "../util/path"
// @ts-ignore
import script from "./scripts/randomCards.inline"
import { concatenateResources } from "../util/resources"

type RandomCardGridOptions = {
  count?: number
  poolSize?: number
  title?: string
  showSummary?: boolean
  folders?: string[]
  randomize?: boolean
}

const DEFAULT_OPTIONS: Required<Omit<RandomCardGridOptions, "title" | "folders">> = {
  count: 3,
  poolSize: 24,
  showSummary: false,
  randomize: true,
}

export default ((opts?: RandomCardGridOptions) => {
  const options = { ...DEFAULT_OPTIONS, ...opts }

  const RandomCardGrid: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    if (!fileData.slug) return null
    const countFromFrontmatter = fileData.frontmatter?.cards?.count
    const count =
      typeof countFromFrontmatter === "number" && countFromFrontmatter > 0
        ? countFromFrontmatter
        : options.count

    const title =
      fileData.frontmatter?.cards?.title ?? options.title ?? "Explora también estas notas"
    const showSummary =
      fileData.frontmatter?.cards?.showSummary ?? options.showSummary ?? false
    const frontmatterFolders = fileData.frontmatter?.cards?.folders
    const parsedFrontmatterFolders = Array.isArray(frontmatterFolders)
      ? frontmatterFolders
      : typeof frontmatterFolders === "string"
        ? frontmatterFolders.split(",").map((folder) => folder.trim())
        : undefined

    const folders =
      parsedFrontmatterFolders ??
      options.folders?.map((folder) => folder.trim()).filter(Boolean)

    const pool = collectCardPool({
      baseSlug: fileData.slug as FullSlug,
      allFiles,
      poolSize: options.poolSize,
      folders,
    })

    if (pool.length === 0) {
      return null
    }

    const randomFrontmatter = fileData.frontmatter?.cards?.random
    const randomize =
      typeof randomFrontmatter === "boolean"
        ? randomFrontmatter
        : options.randomize ?? true

    const renderedPool = randomize ? pool : pool.slice(0, count)

    return (
      <section class={displayClass} aria-label="Notas destacadas">
        <div class="random-card-section">
          <div class="random-card-header">
            <h2>{title}</h2>
          </div>
          <div
            class="random-card-grid"
            data-count={count}
            data-random={randomize ? "true" : "false"}
          >
            {renderedPool.map((card, idx) => {
              const fallbackVisible = idx < count

              return (
                <a
                  href={card.href}
                  class={`random-card ${fallbackVisible ? "is-visible" : ""}`}
                  data-card
                >
                  {card.imageUrl && (
                    <div class="random-card-image">
                      <img src={card.imageUrl} alt={`Imagen de ${card.title}`} loading="lazy" />
                    </div>
                  )}
                  <div class="random-card-body">
                    <h3>{card.title}</h3>
                    {showSummary && card.summary && (
                      <p class="random-card-summary">{card.summary}</p>
                    )}
                    <p class="random-card-meta">Por {card.author}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  RandomCardGrid.css = style
  RandomCardGrid.afterDOMLoaded = concatenateResources(script)

  return RandomCardGrid
}) satisfies QuartzComponentConstructor<RandomCardGridOptions>

