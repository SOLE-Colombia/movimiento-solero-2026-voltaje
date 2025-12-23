import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/folderGrid.scss"
import { resolveRelative } from "../util/path"

// Mapeo de secciones a iconos SVG
const sectionIcons: Record<string, string> = {
  "new-here": "/static/icons/voltaje/hand-hang-loose.svg",
  "inspire": "/static/icons/voltaje/star-1.svg",
  "solve": "/static/icons/voltaje/hammer.svg",
  "answers-comments": "/static/icons/voltaje/phone-transfer.svg",
  "disconnected": "/static/icons/voltaje/wifi-none.svg",
  "glossary": "/static/icons/voltaje/document.svg",
  "general": "/static/icons/voltaje/spiral-1.svg",
}

// Colores de fondo por sección
const sectionColors: Record<string, string> = {
  "new-here": "#1a84ae",
  "inspire": "#26bfb8",
  "solve": "#991d79",
  "answers-comments": "#F9C369",
  "disconnected": "#eb3b81",
  "glossary": "#fc794d",
  "general": "#4b5563",
}

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
          const description = file.frontmatter?.description ?? ""
          const section = file.slug?.split("/")[1] ?? ""
          const iconUrl = sectionIcons[section] ?? "/static/icons/voltaje/spiral-1.svg"
          const bgColor = sectionColors[section] ?? "#4b5563"

          return (
            <a 
              href={resolveRelative(fileData.slug!, file.slug!)} 
              class="folder-card"
              style={`--card-bg-color: ${bgColor}`}
            >
              <div class="card-body">
                <div class="card-icon">
                  <img src={iconUrl} alt="" class="card-icon-svg" />
                </div>
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
