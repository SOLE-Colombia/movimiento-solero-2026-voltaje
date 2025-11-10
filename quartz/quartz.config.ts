import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
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
          light: "#ffffff",           // Fondo blanco limpio
          lightgray: "#e8ecf1",       // Gris muy claro para bordes
          gray: "#9ca3af",            // Gris medio para texto secundario
          darkgray: "#374151",        // Gris oscuro para texto importante
          dark: "#1f2937",            // Casi negro para texto principal
          secondary: "#0066cc",       // Azul SOLE - color principal
          tertiary: "#10b981",        // Verde energético - color de acento
          highlight: "rgba(0, 102, 204, 0.12)",  // Highlight azul suave
          textHighlight: "#fef3c7",   // Amarillo suave para resaltar texto
        },
        darkMode: {
          light: "#0f1419",           // Fondo oscuro profundo
          lightgray: "#1f2937",       // Gris oscuro para bordes
          gray: "#6b7280",            // Gris medio
          darkgray: "#d1d5db",        // Gris claro para texto
          dark: "#f3f4f6",            // Casi blanco para texto principal
          secondary: "#3b82f6",       // Azul más brillante en dark mode
          tertiary: "#10b981",        // Verde mantiene energía
          highlight: "rgba(59, 130, 246, 0.15)",  // Highlight azul en dark
          textHighlight: "#fcd34d88", // Amarillo dorado transparente
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
      Plugin.Latex({ renderEngine: "katex" }),
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
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
