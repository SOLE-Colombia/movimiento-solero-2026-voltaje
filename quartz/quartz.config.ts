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
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // Fondo principal turquesa inspirado en las pantallas de bienvenida
          light: "#1ABC9C",
          // Variante más clara para secciones o paneles
          lightgray: "#4EDDC2",
          // Gris verdoso oscuro para bordes sutiles
          gray: "#006666",
          // Gris muy oscuro usado para textos secundarios
          darkgray: "#003E3A",
          // Texto principal en negro para máximo contraste
          dark: "#000000",
          // Acento coral (botones y elementos destacados)
          secondary: "#F4795B",
          // Acento amarillo para resaltados y selecciones (radio/checkbox)
          tertiary: "#FCE766",
          // Sombra coral translúcida para resaltar áreas
          highlight: "rgba(244, 117, 90, 0.15)",
          // Color para resaltar texto seleccionado
          textHighlight: "#FFF2B8",
        },
        // Mantener el modo oscuro como el predeterminado de Quartz o ajustarlo más adelante
        darkMode: {
          light: "#0f172a",
          lightgray: "#1f2937",
          gray: "#4b5563",
          darkgray: "#d1d5db",
          dark: "#f3f4f6",
          secondary: "#8795e3",
          tertiary: "#f0c36a",
          highlight: "rgba(135, 149, 227, 0.15)",
          textHighlight: "#ecd49a88",
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
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
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
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
