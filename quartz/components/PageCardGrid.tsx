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

  return (
    <div class="page-card-grid" role="list">
      {list.map((page) => {
        const title = titleFallback(page)
        const imageUrl = showImages
          ? resolveCardImage(page, fileData.slug as FullSlug)
          : undefined

        return (
          <a
            href={resolveRelative(fileData.slug!, page.slug!)}
            class="page-card"
            role="listitem"
          >
            <div class="page-card-image" aria-hidden="true">
              {imageUrl ? (
                <img src={imageUrl} alt={`Imagen de ${title}`} loading="lazy" />
              ) : (
                <div class="page-card-imagePlaceholder" />
              )}
            </div>
            <div class="page-card-body">
              <h3 class="page-card-title">{title}</h3>
            </div>
          </a>
        )
      })}
    </div>
  )
}

PageCardGrid.css = style


