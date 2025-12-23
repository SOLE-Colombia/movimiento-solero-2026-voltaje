import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Configuración de Quartz con paleta de colores inspirada en
 * la guía de SOLE Voltaje (versión clara).  Se utilizan
 * fondos turquesa y coral con textos negros y acentos amarillos.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "SOLE Voltaje",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "es-ES", // Español de Colombia
    baseUrl: "voltaje.solecolombia.org",
    ignorePatterns: ["private", "templates", ".obsidian", "_staging", "**/_staging/**"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "VT323",
        body: "Roboto Mono",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // Fondo principal gris claro
          light: "#f5f5f5",
          // Variante más clara para secciones o paneles
          lightgray: "#e5e5e5",
          // Gris para bordes sutiles
          gray: "#9ca3af",
          // Gris oscuro para textos secundarios
          darkgray: "#4b5563",
          // Color de títulos (h1-h6)
          dark: "#1a84ae",
          // Acento para botones y elementos destacados
          secondary: "#1a84ae",
          // Color activo/hover (amarillo dorado)
          tertiary: "#F9C369",
          // Sombra para resaltar áreas
          highlight: "rgba(26, 132, 174, 0.15)",
          // Color para resaltar texto seleccionado
          textHighlight: "#F9C36966",
        },
        darkMode: {
          // Fondo principal oscuro
          light: "#060b16",
          // Variante para secciones o paneles
          lightgray: "#1a1f2e",
          // Gris para bordes
          gray: "#4b5563",
          // Gris claro para textos secundarios
          darkgray: "#d1d5db",
          // Color de títulos (h1-h6)
          dark: "#1a84ae",
          // Acento para botones y elementos destacados
          secondary: "#1a84ae",
          // Color activo/hover (amarillo dorado)
          tertiary: "#F9C369",
          // Sombra para resaltar áreas
          highlight: "rgba(249, 195, 105, 0.15)",
          // Color para resaltar texto seleccionado
          textHighlight: "#F9C36966",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      // Permitimos HTML embebido (por ejemplo iframes de video)
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ 
        renderEngine: "mathjax"
      }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      ...(process.env.QUARTZ_DEV === "1" ? [] : [Plugin.CustomOgImages()]),
    ],
  },
}

export default config
