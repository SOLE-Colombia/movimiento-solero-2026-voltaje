import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentProps } from "./types"
import style from "./styles/pageCardGrid.scss"
import { SortFn, byDateAndAlphabeticalFolderFirst } from "./PageList"
import { resolveCardImage } from "./cardImage"

type Props = {
  limit?: number
  sort?: SortFn
  showImages?: boolean
} & QuartzComponentProps

const titleFallback = (page: QuartzPluginData): string => {
  const title = page.frontmatter?.title
  if (typeof title === "string" && title.trim().length > 0) return title.trim()
  const slug = page.slug ?? ""
  if (slug.length === 0) return "Sin título"
  const parts = slug.split("/").filter(Boolean)
  return parts[parts.length - 1] ?? slug
}

// Determinar la sección desde el slug
const getSection = (slug: string): string => {
  const parts = slug.split("/")
  if (parts.includes("inspire")) return "inspire"
  if (parts.includes("solve")) return "solve"
  if (parts.includes("glossary")) return "glossary"
  if (parts.includes("disconnected")) return "disconnected"
  if (parts.includes("answers-comments")) return "answers-comments"
  return "default"
}

// Secciones que no muestran imagen (solo color plano)
const sectionsWithoutImage = ["solve", "inspire", "disconnected", "answers-comments"]

// Mostrar nivel de dificultad
const renderDifficultyLabel = (dificultad: string) => {
  return dificultad
}

// Convertir costo a símbolos Ⓢ
const renderCostIcons = (costo: string) => {
  if (costo === "Gratis") return "Ⓢ"
  if (costo.includes("Bajo")) return "ⓈⓈ"
  return "ⓈⓈⓈ"
}

// Convertir tiempo a símbolos ⏱
const renderTimeIcons = (tarda: string) => {
  if (tarda === "Minutos") return "⏱"
  if (tarda === "Horas") return "⏱⏱"
  return "⏱⏱⏱"
}

export const PageCardGrid: QuartzComponent = ({
  cfg,
  fileData,
  allFiles,
  limit,
  sort,
  showImages = true,
}: Props) => {
  if (!fileData.slug) return null

  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  const section = getSection(fileData.slug)

  return (
    <div class={`page-card-grid section-${section}`} role="list">
      {list.map((page) => {
        const title = titleFallback(page)
        const imageUrl = showImages
          ? resolveCardImage(page, fileData.slug as FullSlug)
          : undefined

        // Extraer datos del frontmatter para solve
        const dificultad = page.frontmatter?.dificultad as string | undefined
        const costo = page.frontmatter?.costo as string | undefined
        const tarda = page.frontmatter?.tarda as string | undefined
        const resumen = (page.frontmatter?.resumen ?? page.frontmatter?.description) as
          | string
          | undefined
        const categorias = (page.frontmatter?.categories ?? []) as string[]

        const hideImage = sectionsWithoutImage.includes(section)

        return (
          <a
            href={resolveRelative(fileData.slug!, page.slug!)}
            class="page-card"
            role="listitem"
          >
            {!hideImage && (
              <div class="page-card-image" aria-hidden="true">
                {imageUrl ? (
                  <img src={imageUrl} alt={`Imagen de ${title}`} loading="lazy" />
                ) : (
                  <div class="page-card-imagePlaceholder" />
                )}
              </div>
            )}
            <div class="page-card-body">
              <h3 class="page-card-title">{title}</h3>
              {resumen && <p class="page-card-summary">{resumen}</p>}
              {categorias.length > 0 && (
                <div class="page-card-tags">
                  {categorias.map((categoria) => (
                    <span class="page-card-tag">#{categoria}</span>
                  ))}
                </div>
              )}
            </div>
            {section === "solve" && (dificultad || costo || tarda) && (
              <div class="page-card-categories">
                {dificultad && <span class="category difficulty">{renderDifficultyLabel(dificultad)}</span>}
                {costo && <span class="category cost">{renderCostIcons(costo)}</span>}
                {tarda && <span class="category time">{renderTimeIcons(tarda)}</span>}
              </div>
            )}
          </a>
        )
      })}
    </div>
  )
}

PageCardGrid.css = style


