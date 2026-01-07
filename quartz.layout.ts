import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.FolderGrid(),
      condition: (page) => page.fileData.slug === "index" || page.fileData.slug === "es",
    }),
    Component.ConditionalRender({
      component: Component.RandomCardGrid({ count: 3 }),
      condition: (props) =>
        props.fileData.frontmatter?.type === "section-index" &&
        props.fileData.slug !== "index",
    }),
    Component.Comments(),
  ],
  footer: Component.Footer({
    links: {
      "SOLE Colombia": "https://www.solecolombia.org/",
      "GitHub": "https://github.com/SOLE-Colombia/voltaje",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ showCurrentPage: false }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.LanguageToggle() },
        { Component: Component.Darkmode() },
        { Component: Component.DownloadButton() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Search(),
    Component.Explorer({
      filterFn: (node) => {
        // Excluir la carpeta "tags"
        if (node.slugSegment === "tags") return false
        // Excluir borradores / staging
        if (node.slugSegment === "_staging") return false
        return true
      },
      mapFn: (node) => {
        // Promover contenido de carpetas de idioma al nivel raíz
        // Buscar si este nodo tiene hijos que son carpetas de idioma
        const langFolders = node.children.filter(
          child => child.isFolder && (child.slugSegment === "es" || child.slugSegment === "en")
        )
        
        if (langFolders.length > 0) {
          // Para cada carpeta de idioma encontrada, promover sus hijos al nivel actual
          const promotedChildren = langFolders.flatMap(langFolder => langFolder.children)
          
          // Remover las carpetas de idioma y agregar sus hijos promovidos
          node.children = node.children.filter(
            child => !langFolders.includes(child)
          ).concat(promotedChildren)
        }
      },
      sortFn: (a, b) => {
        // Orden personalizado para las carpetas principales
        const customOrder = [
          "new-here",      // Nuevo aquí
          "inspire",       // Inspírate
          "solve",         // Soluciona
          "answers-comments", // Pregunta/Comenta
          "disconnected",  // Desconectado
          "glossary",      // Conceptorio
          "general",       // General (si existe)
        ]
        
        // Obtener índice en el orden personalizado (-1 si no está en la lista)
        const indexA = customOrder.indexOf(a.slugSegment)
        const indexB = customOrder.indexOf(b.slugSegment)
        
        // Si ambos están en la lista personalizada, ordenar según esa lista
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB
        }
        
        // Si solo uno está en la lista, ese va primero
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        
        // Si ninguno está en la lista, ordenar alfabéticamente
        // Dar prioridad a carpetas sobre archivos
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        
        if (!a.isFolder && b.isFolder) {
          return 1
        } else {
          return -1
        }
      },
      folderDefaultState: "collapsed",
    }),
  ],
  right: [
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs({ showCurrentPage: false }), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.LanguageToggle() },
        { Component: Component.Darkmode() },
        { Component: Component.DownloadButton() },
      ],
    }),
    Component.Search(),
    Component.Explorer({
      filterFn: (node) => {
        // Excluir la carpeta "tags"
        if (node.slugSegment === "tags") return false
        // Excluir borradores / staging
        if (node.slugSegment === "_staging") return false
        return true
      },
      mapFn: (node) => {
        // Promover contenido de carpetas de idioma al nivel raíz
        // Buscar si este nodo tiene hijos que son carpetas de idioma
        const langFolders = node.children.filter(
          child => child.isFolder && (child.slugSegment === "es" || child.slugSegment === "en")
        )
        
        if (langFolders.length > 0) {
          // Para cada carpeta de idioma encontrada, promover sus hijos al nivel actual
          const promotedChildren = langFolders.flatMap(langFolder => langFolder.children)
          
          // Remover las carpetas de idioma y agregar sus hijos promovidos
          node.children = node.children.filter(
            child => !langFolders.includes(child)
          ).concat(promotedChildren)
        }
      },
      sortFn: (a, b) => {
        // Orden personalizado para las carpetas principales
        const customOrder = [
          "new-here",      // Nuevo aquí
          "inspire",       // Inspírate
          "solve",         // Soluciona
          "answers-comments", // Pregunta/Comenta
          "disconnected",  // Desconectado
          "glossary",      // Conceptorio
          "general",       // General (si existe)
        ]
        
        // Obtener índice en el orden personalizado (-1 si no está en la lista)
        const indexA = customOrder.indexOf(a.slugSegment)
        const indexB = customOrder.indexOf(b.slugSegment)
        
        // Si ambos están en la lista personalizada, ordenar según esa lista
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB
        }
        
        // Si solo uno está en la lista, ese va primero
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        
        // Si ninguno está en la lista, ordenar alfabéticamente
        // Dar prioridad a carpetas sobre archivos
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        
        if (!a.isFolder && b.isFolder) {
          return 1
        } else {
          return -1
        }
      },
      folderDefaultState: "collapsed",
    }),
  ],
  right: [],
}
