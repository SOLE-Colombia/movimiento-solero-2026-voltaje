import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/folderGrid.scss"
import { resolveRelative, FullSlug } from "../util/path"
import { resolveCardImage } from "./cardImage"

export default (() => {
  const FolderGrid: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    const customOrder = [
      "new-here",
      "inspire",
      "solve",
      "answers-comments",
      "disconnected",
      "glossary",
      "general",
    ]

    // Filtrar archivos que son índices de carpetas principales en español
    const folders = allFiles.filter((file) => {
      const slug = file.slug ?? ""
      const parts = slug.split("/")

      if (parts.length >= 2 && parts[0] === "es") {
        const folder = parts[1]
        const isIndex = parts.length === 2 || (parts.length === 3 && parts[2] === "index")

        if (isIndex && customOrder.includes(folder)) {
          return true
        }
      }

      return false
    })

    // Sort
    folders.sort((a, b) => {
      const slugA = a.slug!.split("/")[1]
      const slugB = b.slug!.split("/")[1]
      return customOrder.indexOf(slugA) - customOrder.indexOf(slugB)
    })

    return (
      <div class="folder-grid">
        {folders.map((file) => {
          const title = file.frontmatter?.title ?? file.slug?.split("/")[1]
          const icon = file.frontmatter?.icon ?? "📁"
          const description = file.frontmatter?.description ?? ""
          const imageUrl = resolveCardImage(file, fileData.slug as FullSlug)

          return (
            <a href={resolveRelative(fileData.slug!, file.slug!)} class="folder-card">
              {imageUrl && (
                <div class="card-image">
                  <img src={imageUrl} alt={`Imagen principal de ${title}`} loading="lazy" />
                </div>
              )}
              <div class="card-body">
                <div class="card-icon">{icon}</div>
                <h3>{title}</h3>
                <p class="card-description">{description}</p>
              </div>
            </a>
          )
        })}
      </div>
    )
  }

  FolderGrid.css = style
  return FolderGrid
}) satisfies QuartzComponentConstructor
