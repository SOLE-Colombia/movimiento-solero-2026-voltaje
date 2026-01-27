import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const isHomePage = (page: { fileData: { slug?: string } }) =>
  page.fileData.slug === "index" || page.fileData.slug === "es"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments(),
  ],
  footer: Component.ConditionalRender({
    component: Component.Footer({
      links: {
        "SOLE Colombia": "https://www.solecolombia.org/",
        "GitHub": "https://github.com/SOLE-Colombia/voltaje",
      },
    }),
    condition: () => false,
  }),
}

// Helper para detectar páginas de soluciones individuales
const isSolveSinglePage = (page: { fileData: { slug?: string; frontmatter?: Record<string, unknown> } }) => {
  const slug = page.fileData.slug ?? ""
  const isInSolve = slug.startsWith("es/solve/") || slug.startsWith("solve/")
  const isIndex = slug.endsWith("/solve") || slug.endsWith("/solve/index") || slug.endsWith("solve/index")
  const isSectionIndex = page.fileData.frontmatter?.type === "section-index"
  return isInSolve && !isIndex && !isSectionIndex
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.HomePopup(),
      condition: (page) => isHomePage(page),
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs({
        showCurrentPage: false,
        rootName: "Inicio",
        hideSegments: ["es", "en"],
        hideTitles: ["sole voltaje", "inicio"],
      }),
      condition: (page) => !isHomePage(page),
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !isHomePage(page),
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      // Ocultar ContentMeta en páginas de soluciones (la metadata va en el sidebar)
      condition: (page) => !isHomePage(page) && page.fileData.frontmatter?.type !== "section-index" && !isSolveSinglePage(page),
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      // Ocultar TagList en páginas de soluciones (las categorías van en el sidebar)
      condition: (page) => !isHomePage(page) && !isSolveSinglePage(page),
    }),
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
      folderClickBehavior: "link", // Permitir que las carpetas funcionen como enlaces
      filterFn: (node) => {
        const mainMenuOrder = [
          "new-here", // Nuevo aquí
          "solve", // Soluciona
          "inspire", // Inspírate
          "glossary", // Conceptorio
          "disconnected", // Desconectado
          "answers-comments", // ¿Quieres hablar con otro humano?
        ]
        // Excluir la carpeta "tags"
        if (node.slugSegment === "tags") return false
        // Excluir borradores / staging
        if (node.slugSegment === "_staging") return false
        // Excluir la página de descargas del menú principal
        if (node.slugSegment === "descargas") return false
        // Mantener el nodo raíz y solo las secciones principales
        if (!node.slugSegment) return true
        return mainMenuOrder.includes(node.slugSegment)
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
        // Dejar solo títulos principales sin desplegables
        if (!node.slugSegment) {
          for (const child of node.children) {
            if (child.slugSegment === "answers-comments") {
              child.displayName = "¿Quieres hablar con otro humano?"
            }
            child.children = []
            child.isFolder = false
          }
        }
      },
      sortFn: (a, b) => {
        // Orden personalizado para las carpetas principales
        const customOrder = [
          "new-here",      // Nuevo aquí
          "solve",         // Soluciona
          "inspire",       // Inspírate
          "glossary",      // Conceptorio
          "disconnected",  // Desconectado
          "answers-comments", // ¿Quieres hablar con otro humano?
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
      order: ["map", "filter", "sort"],
      folderDefaultState: "collapsed",
    }),
  ],
  right: [
    // Módulo de gráfico desactivado sin eliminar el código.
    // Component.Graph(),
    // Metadata de soluciones en sidebar derecho
    Component.SolveMetaSidebar(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({
        showCurrentPage: true,
        rootName: "Inicio",
        hideSegments: ["es", "en"],
        hideTitles: ["sole voltaje", "inicio"],
      }),
      condition: (page) => !isHomePage(page),
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !isHomePage(page),
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !isHomePage(page) && page.fileData.frontmatter?.type !== "section-index",
    }),
    // Filtro de Solve visible solo en móvil (aparece arriba del contenido)
    Component.MobileOnly(
      Component.ConditionalRender({
        component: Component.SolveFilterSidebar(),
        condition: (page) => {
          const slug = page.fileData.slug ?? ""
          return slug.startsWith("es/solve") || slug.startsWith("solve")
        },
      }),
    ),
    // Filtro de Inspire visible solo en móvil (aparece arriba del contenido)
    Component.MobileOnly(
      Component.ConditionalRender({
        component: Component.InspireFilterSidebar(),
        condition: (page) => {
          const slug = page.fileData.slug ?? ""
          return slug.startsWith("es/inspire") || slug.startsWith("inspire")
        },
      }),
    ),
  ],
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
      folderClickBehavior: "link", // Permitir que las carpetas funcionen como enlaces
      filterFn: (node) => {
        const mainMenuOrder = [
          "new-here", // Nuevo aquí
          "solve", // Soluciona
          "inspire", // Inspírate
          "glossary", // Conceptorio
          "disconnected", // Desconectado
          "answers-comments", // ¿Quieres hablar con otro humano?
        ]
        // Excluir la carpeta "tags"
        if (node.slugSegment === "tags") return false
        // Excluir borradores / staging
        if (node.slugSegment === "_staging") return false
        // Excluir la página de descargas del menú principal
        if (node.slugSegment === "descargas") return false
        // Mantener el nodo raíz y solo las secciones principales
        if (!node.slugSegment) return true
        return mainMenuOrder.includes(node.slugSegment)
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
        // Dejar solo títulos principales sin desplegables
        if (!node.slugSegment) {
          for (const child of node.children) {
            if (child.slugSegment === "answers-comments") {
              child.displayName = "¿Quieres hablar con otro humano?"
            }
            child.children = []
            child.isFolder = false
          }
        }
      },
      sortFn: (a, b) => {
        // Orden personalizado para las carpetas principales
        const customOrder = [
          "new-here",      // Nuevo aquí
          "solve",         // Soluciona
          "inspire",       // Inspírate
          "glossary",      // Conceptorio
          "disconnected",  // Desconectado
          "answers-comments", // ¿Quieres hablar con otro humano?
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
      order: ["map", "filter", "sort"],
      folderDefaultState: "collapsed",
    }),
  ],
  right: [
    // Filtro para la sección de Inspire (solo desktop - móvil usa beforeBody)
    Component.DesktopOnly(
      Component.ConditionalRender({
        component: Component.InspireFilterSidebar(),
        condition: (page) => {
          const slug = page.fileData.slug ?? ""
          return slug.startsWith("es/inspire") || slug.startsWith("inspire")
        },
      }),
    ),
    // Filtro para la sección de Solve (solo desktop - móvil usa beforeBody)
    Component.DesktopOnly(
      Component.ConditionalRender({
        component: Component.SolveFilterSidebar(),
        condition: (page) => {
          const slug = page.fileData.slug ?? ""
          return slug.startsWith("es/solve") || slug.startsWith("solve")
        },
      }),
    ),
  ],
}
