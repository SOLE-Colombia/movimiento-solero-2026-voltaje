# Configuración de Quartz v4 para SOLE Voltaje

Este documento describe cómo configurar Quartz v4 después de instalar y migrar el contenido.

## 📝 Configuración Básica

### 1. Archivo `quartz.config.ts`

Después de clonar Quartz, edita `quartz/quartz.config.ts`:

```typescript
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "SOLE Voltaje",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "TU-ID-DE-GOOGLE-ANALYTICS", // Opcional
    },
    locale: "es-CO", // Español de Colombia por defecto
    baseUrl: "voltaje.solecolombia.org", // Tu dominio
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63", // Color SOLE Colombia
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
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
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
```

## 🎨 Personalización Visual

### 2. Colores Personalizados

Crea `quartz/styles/custom.scss`:

```scss
// Colores de marca SOLE Colombia
$primary-color: #284b63;
$secondary-color: #84a59d;
$accent-color: #f28482;

// Sobrescribir estilos de Quartz
.page-title {
  color: $primary-color;
  font-weight: 700;
}

.nav-link {
  &:hover {
    color: $secondary-color;
  }
}

// Estilos para videos responsive
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin: 2rem 0;
  border-radius: 8px;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

// Aspecto badges
.aspecto-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.25rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  &.señal { background-color: #e3f2fd; color: #1565c0; }
  &.electricidad { background-color: #fff3e0; color: #e65100; }
  &.dispositivos { background-color: #f3e5f5; color: #6a1b9a; }
  &.personas { background-color: #e8f5e9; color: #2e7d32; }
  &.espacio { background-color: #fce4ec; color: #c2185b; }
}
```

## 🧩 Componentes Personalizados

### 3. Header Bilingüe

Crea `quartz/components/Header.tsx`:

```tsx
import { QuartzComponentConstructor } from "./types"

export default (() => {
  function Header() {
    return (
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/">
              <h1>SOLE Voltaje</h1>
            </a>
          </div>
          <nav className="language-switcher">
            <a href="/es/">Español</a>
            <span className="separator">|</span>
            <a href="/en/">English</a>
          </nav>
        </div>
      </header>
    )
  }

  return Header
}) satisfies QuartzComponentConstructor
```

### 4. Footer con Créditos

Crea `quartz/components/Footer.tsx`:

```tsx
import { QuartzComponentConstructor } from "./types"

export default (() => {
  function Footer() {
    return (
      <footer>
        <div className="footer-content">
          <p>
            <a href="http://voltaje.solecolombia.org/">SOLE Voltaje</a> © 2024 por{" "}
            <a href="http://www.solecolombia.org/">Fundación SOLE Colombia</a>
          </p>
          <p>
            Licencia:{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution-ShareAlike 4.0 International
            </a>
          </p>
          <p>
            Proyecto apoyado por{" "}
            <a href="https://www.isocfoundation.org/">Internet Society Foundation</a>
          </p>
        </div>
      </footer>
    )
  }

  return Footer
}) satisfies QuartzComponentConstructor
```

### 5. Filtro por Aspectos

Crea `quartz/components/FilterPanel.tsx`:

```tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  function FilterPanel({ fileData, displayClass }: QuartzComponentProps) {
    const aspectos = fileData.frontmatter?.aspectos || []
    
    if (aspectos.length === 0) return null

    return (
      <div className={classNames(displayClass, "filter-panel")}>
        <h3>Aspectos</h3>
        <div className="aspecto-list">
          {aspectos.map((aspecto: string) => (
            <span key={aspecto} className={`aspecto-badge ${aspecto}`}>
              {aspecto}
            </span>
          ))}
        </div>
      </div>
    )
  }

  FilterPanel.css = `
  .filter-panel {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid var(--lightgray);
    border-radius: 8px;
  }
  
  .aspecto-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  `

  return FilterPanel
}) satisfies QuartzComponentConstructor
```

## 📋 Layout Configuration

### 6. Configurar Layout

Edita `quartz/quartz.layout.ts`:

```typescript
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Componentes compartidos en todas las páginas
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Header(), // Tu header personalizado
  ],
  footer: Component.Footer(), // Tu footer personalizado
}

// Layout de páginas de contenido
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.FilterPanel(), // Tu componente de filtros
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// Layout de páginas de listado
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
```

## 🌐 Configuración i18n

### 7. Traducciones

Crea `quartz/i18n/es-CO/translation.ts`:

```typescript
import { Translation } from "../definition"

export default {
  propertyDefaults: {
    title: "Sin título",
    description: "Sin descripción",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Resumen",
      info: "Información",
      todo: "Por hacer",
      tip: "Consejo",
      success: "Éxito",
      question: "Pregunta",
      warning: "Advertencia",
      failure: "Error",
      danger: "Peligro",
      bug: "Bug",
      example: "Ejemplo",
      quote: "Cita",
    },
    backlinks: {
      title: "Enlaces entrantes",
      noBacklinksFound: "No se encontraron enlaces entrantes",
    },
    themeToggle: {
      lightMode: "Modo claro",
      darkMode: "Modo oscuro",
    },
    explorer: {
      title: "Explorador",
    },
    footer: {
      createdWith: "Creado con",
    },
    graph: {
      title: "Vista de grafo",
    },
    recentNotes: {
      title: "Notas recientes",
      seeRemainingMore: ({ remaining }) => `Ver ${remaining} más →`,
    },
    search: {
      title: "Buscar",
      searchBarPlaceholder: "Buscar algo...",
    },
    tableOfContents: {
      title: "Tabla de contenidos",
    },
  },
  pages: {
    rss: {
      recentNotes: "Notas recientes",
      lastFewNotes: ({ count }) => `Últimas ${count} notas`,
    },
    error: {
      title: "No encontrado",
      notFound: "Esta página es privada o no existe.",
    },
    folderContent: {
      folder: "Carpeta",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 elemento en esta carpeta" : `${count} elementos en esta carpeta`,
    },
    tagContent: {
      tag: "Etiqueta",
      tagIndex: "Índice de etiquetas",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 elemento con esta etiqueta" : `${count} elementos con esta etiqueta`,
      showingFirst: ({ count }) => `Mostrando las primeras ${count} etiquetas`,
      totalTags: ({ count }) => `Se encontraron ${count} etiquetas en total`,
    },
  },
} as const satisfies Translation
```

## ✅ Verificación

Después de configurar, verifica que todo funcione:

```bash
cd quartz
npx quartz build --serve
```

Visita `http://localhost:8080` y verifica:

- [x] Header con selector de idioma
- [x] Footer con créditos
- [x] Páginas en `/es/` y `/en/`
- [x] Búsqueda funcionando
- [x] Imágenes cargando correctamente
- [x] Links internos funcionando
- [x] Filtros por aspectos visibles

## 🐛 Problemas Comunes

### Error: Cannot find module

```bash
cd quartz
npm install
```

### Imágenes no cargan

Verifica que las imágenes estén en `quartz/content/assets/images/`

### Links rotos

Ejecuta el validador:
```bash
py scripts/10-validate.py
```

## 📚 Recursos

- [Documentación de Quartz](https://quartz.jzhao.xyz/)
- [Guía de Configuración](https://quartz.jzhao.xyz/configuration)
- [Personalización](https://quartz.jzhao.xyz/features/custom-components)






