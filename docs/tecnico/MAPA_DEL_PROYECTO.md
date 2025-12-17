# 🧭 Mapa del Proyecto (visión global)

Este documento explica **cómo funciona SOLE Voltaje** de punta a punta: contenido → build → despliegue → sitio público. También resume **las lógicas ya implementadas**, la **infraestructura actual** y qué implica agregar **rastreo de actividad** e **interactividad** en un sitio estático basado en Quartz.

---

## 1) ¿Qué es este proyecto?

- **Tipo de producto**: un sitio web estático (HTML/CSS/JS) generado desde Markdown.
- **Generador**: **Quartz v4** (en este repo: `4.5.2`).
- **Runtime del sitio**: estático + JavaScript en el navegador (Quartz corre como **SPA**: navegación sin recarga completa cuando es posible).

En términos prácticos:
- Ustedes escriben en `content/`.
- Quartz compila a `public/`.
- GitHub Actions publica el `public/` en un repositorio “destino” (separado) que es el que sirve el sitio.

---

## 2) Estructura real del repo (qué tocar y qué no)

- **`content/`**: el corazón del proyecto (Markdown + assets). Aquí vive la información que el sitio muestra.
- **`quartz/`**: el motor (código de Quartz, componentes, plugins, estilos). Se toca cuando hay que cambiar UX/UI, lógica de navegación, componentes, etc.
- **`quartz.config.ts`**: configuración del “pipeline” (plugins, theme, analytics, locale, etc.).
- **`quartz.layout.ts`**: composición de UI (qué componentes aparecen en cada zona y con qué reglas).
- **`public/`**: salida del build (no se edita a mano; se genera).
- **`scripts/`**: utilidades (muchos scripts son legado de migraciones o de una estructura anterior; ver sección 6).

---

## 3) Flujo de datos: Markdown → HTML (Quartz)

### Entrada
- Markdown y assets en `content/`.
- El proyecto usa contenido multi-idioma con rutas tipo `content/es/...` y `content/en/...`.

### Transformación (plugins)
La cadena principal está en `quartz.config.ts`:
- **Frontmatter** y metadata (title, tags, author, description, etc.).
- **Fechas** (prioridad: frontmatter → git → filesystem).
- **Markdown extendido**: Obsidian-flavored, GFM, TOC, crawling de links, LaTeX/MathJax, etc.
- **Filtros**: se remueven drafts.
- **Emitters**: generan páginas (content pages, folder pages, tags), índice (RSS/Sitemap), assets, favicon, 404, OG images, etc.

### Layout/UI (componentes)
Se define en `quartz.layout.ts`:
- `sharedPageComponents.head = Component.Head()`
- En **home** (`slug === "index"`) se renderiza un grid de carpetas con `FolderGrid()`.
- En índices de sección (`frontmatter.type === "section-index"`) se renderiza `RandomCardGrid({ count: 3 })`.
- En el sidebar izquierdo: `Search`, `Darkmode`, `DownloadButton`, `ReaderMode`, `Explorer`.
- En el derecho: `Graph`, TOC, backlinks.

### Salida
- `npx quartz build` genera `public/` en la raíz.

---

## 4) Lógicas ya aplicadas (lo “especial” del Voltaje)

### 4.1 Home como “panel de secciones”
- **`FolderGrid`** (componente custom) construye tarjetas de secciones a partir de índices en español.
- Regla actual: busca slugs que empiecen por `es/` y que sean índices de carpetas principales.

### 4.2 Índices de sección con tarjetas aleatorias
- **`RandomCardGrid`** muestra tarjetas “recomendadas/aleatorias” para páginas `type: section-index`.
- Tiene script en cliente (inline) para comportamiento dinámico.

### 4.3 Explorer con orden y “promoción” de idiomas
En `quartz.layout.ts`, `Explorer` hace 3 cosas:
- **Oculta** `tags/`.
- **Promueve** hijos de `es/` y `en/` al “nivel raíz” del árbol para que el usuario no navegue por “idiomas” sino por “secciones”.
- Ordena carpetas con un **orden personalizado** (new-here, inspire, solve, …).

### 4.4 Funciones interactivas ya existentes
- **Búsqueda**, **modo oscuro**, **grafo**, **popovers**, **SPA**.
- **DownloadButton** y **ReaderMode**: botones con scripts inline (interacción 100% client-side).

---

## 5) Infraestructura actual (CI/CD y hosting)

### 5.1 Build local
- En DevContainer: `npm run dev` (equivale a `npx quartz build --serve`).
- Build de producción local: `npx quartz build` → genera `public/`.

### 5.2 Deploy automático (GitHub Actions)
Hay 2 workflows principales:
- **Producción**: `.github/workflows/deploy-production.yml`
  - Dispara por `push` a `main`.
  - Construye `public/`.
  - Hace checkout de un repositorio destino (`secrets.PROD_REPO`) y **copia `public/*`** allí.
  - Commits y push a `main` del repo destino usando `secrets.PAT`.

- **Desarrollo**: `.github/workflows/test-desarrollo.yml`
  - Dispara por `push` a `desarrollo`.
  - Construye `public/`.
  - Hace checkout de repo destino (`secrets.PUBLIC_REPO`) y copia `public/*`.
  - Commits y push a `main` del repo destino usando `secrets.PAT`.

**Implicación importante**: el sitio público NO se sirve desde este repo, sino desde el repo “destino” (uno para prod y otro para dev).

---

## 6) Scripts: qué está vigente y qué es legado

En `scripts/` hay utilidades valiosas (migración/limpieza/optimización), pero algunos scripts operativos reflejan una estructura antigua donde:
- Se hacía `cd quartz` para construir,
- El output era `quartz/public`,
- Se sincronizaba `content/` hacia `quartz/content/`,
- Se usaba `docker-compose.dev.yml`.

Hoy, con la estructura actual (config en raíz y build a `public/`), el flujo recomendado es:
- **Desarrollo**: `npm run dev` (en la raíz).
- **Build**: `npx quartz build` (en la raíz).

Si se quiere mantener scripts operativos, conviene auditarlos y actualizarlos para evitar confusión.

---

## 7) Rastreo de actividad (analytics): cómo funciona hoy y cómo ampliarlo

### 7.1 Estado actual
En `quartz.config.ts`:
- `enableSPA: true`
- `analytics.provider: "plausible"`

Quartz inyecta el script de analytics desde el emisor `ComponentResources` (`quartz/plugins/emitters/componentResources.ts`).
- Para Plausible usa `script.manual.js`.
- Hace `plausible('pageview')` al cargar.
- Y vuelve a disparar `pageview` en cada navegación SPA escuchando el evento `document.addEventListener('nav', ...)`.

### 7.2 Qué se puede rastrear sin backend
En un sitio estático, todo el rastreo es **client-side**:
- **Pageviews** (ya está).
- **Eventos** (clicks en botones, descargas, uso de search, aperturas de cards, etc.).
- **Props**/metadata (por ejemplo: sección, slug, idioma, tipo de contenido).

### 7.3 Cómo agregar eventos (recomendación)
- Definir una **taxonomía** simple (ej.: `ui_download_pdf`, `ui_reader_mode_toggle`, `nav_card_click`).
- Emitirlos desde scripts inline o listeners:
  - Plausible expone `window.plausible(...)` (Quartz crea el stub al cargar el script).

Puntos de enganche recomendados:
- Scripts de componentes (ej. `DownloadButton`, `ReaderMode`, `RandomCardGrid`).
- Listener global sobre clicks (delegación) si se quiere instrumentación sin tocar cada componente.

### 7.4 Riesgos/limitaciones
- Si el script de analytics está bloqueado (adblock), no hay eventos.
- No hay “usuario” autenticado: identificación real requiere un sistema externo (o se evita por privacidad).
- Cualquier cosa “server-side” (funnels con backend, sesión, etc.) requiere infraestructura adicional.

---

## 8) Interactividad y diseño “tipo app” en una página estática

### 8.1 Qué SÍ se puede hacer bien (con infraestructura actual)
- Componentes interactivos client-side (botones, filtros, tabs, acordeones, quizzes simples).
- Persistencia local: `localStorage` / `sessionStorage`.
- Experiencias SPA (Quartz ya emite el evento `nav` y tiene router).
- Cargar assets estáticos y JS propio.

### 8.2 Qué NO se puede (sin agregar infraestructura)
- Base de datos propia.
- Login/roles/usuarios.
- Comentarios nativos con persistencia.
- Formularios que guarden datos en el servidor (sin usar un tercero).

### 8.3 Patrón técnico usado por Quartz (muy importante)
Quartz agrega JS/CSS global y por-componente en el build:
- Cada componente puede aportar:
  - `css`
  - `beforeDOMLoaded`
  - `afterDOMLoaded`
- Todo se empaqueta en:
  - `public/index.css`
  - `public/prescript.js`
  - `public/postscript.js`

Esto es la base para “diseño interactivo” en un sitio estático: UI en TSX + comportamiento en scripts inline.

---

## 9) Checklist: “que todo siga funcionando” al agregar rastreo + interactividad

- Mantener `enableSPA: true` (si queremos navegación tipo app) y usar el evento `nav` para re-inicializar componentes.
- No asumir recarga completa de página (en SPA, listeners deben re-engancharse o usar delegación).
- Añadir rastreo de eventos de manera resiliente (si `window.plausible` no existe, no romper UI).
- Evitar depender de backend salvo que se decida explícitamente (serverless/terceros).

---

## 10) Dónde mirar cuando quieras “entender el sistema” rápido

- **Layout y composición UI**: `quartz.layout.ts`
- **Pipeline de plugins y analytics**: `quartz.config.ts`
- **Inyección de scripts globales + analytics + SPA**: `quartz/plugins/emitters/componentResources.ts`
- **Componentes custom**:
  - `quartz/components/FolderGrid.tsx`
  - `quartz/components/RandomCardGrid.tsx`
  - `quartz/components/DownloadButton.tsx`
  - `quartz/components/ReaderMode.tsx`
- **CI/CD**:
  - `.github/workflows/deploy-production.yml`
  - `.github/workflows/test-desarrollo.yml`



