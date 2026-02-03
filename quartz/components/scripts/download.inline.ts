const EXPORT_ROOT_ID = "pdf-export-root"
const HTML2PDF_CDN =
  "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"

let html2pdfPromise: Promise<any> | null = null

const loadHtml2Pdf = () => {
  const existing = (window as any).html2pdf
  if (typeof existing === "function") return Promise.resolve(existing)
  if (html2pdfPromise) return html2pdfPromise

  html2pdfPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = HTML2PDF_CDN
    script.async = true
    script.onload = () => {
      const loaded = (window as any).html2pdf
      if (typeof loaded === "function") {
        resolve(loaded)
      } else {
        reject(new Error("html2pdf no está disponible después de cargar el CDN."))
      }
    }
    script.onerror = () => reject(new Error("No se pudo cargar html2pdf desde el CDN."))
    document.head.appendChild(script)
  })

  return html2pdfPromise
}

const getBasePath = (): string => {
  const basePath = document.body?.dataset?.basepath ?? ""
  if (!basePath || basePath === "/") return ""
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath
}

const getStaticUrl = (path: string) => {
  const basePath = getBasePath()
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${normalized}`
}

const sanitizeFileName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)

const getFileName = () => {
  const slug = document.body?.dataset?.slug ?? ""
  const title = document.title ?? ""
  const base = sanitizeFileName(slug || title || "nota")
  return `${base || "nota"}.pdf`
}

const buildExportRoot = () => {
  const root = document.createElement("div")
  root.id = EXPORT_ROOT_ID
  root.className = "pdf-export-root"

  const template = document.createElement("div")
  template.className = "pdf-template"

  const header = document.createElement("header")
  header.className = "pdf-header"

  const branding = document.createElement("div")
  branding.className = "pdf-branding"
  const logo = document.createElement("img")
  logo.className = "pdf-logo"
  logo.alt = "SOLE Voltaje"
  logo.src = getStaticUrl("/static/logo.png")
  logo.crossOrigin = "anonymous"
  branding.appendChild(logo)

  const meta = document.createElement("div")
  meta.className = "pdf-meta"
  const titleText =
    document.querySelector(".article-title")?.textContent?.trim() ||
    document.title?.trim() ||
    "Nota"
  const resumenText = document.querySelector(".article-resumen")?.textContent?.trim() || ""
  const titleEl = document.createElement("h1")
  titleEl.className = "pdf-title"
  titleEl.textContent = titleText
  meta.appendChild(titleEl)

  if (resumenText) {
    const resumenEl = document.createElement("p")
    resumenEl.className = "pdf-summary"
    resumenEl.textContent = resumenText
    meta.appendChild(resumenEl)
  }

  const infoEl = document.createElement("p")
  infoEl.className = "pdf-info"
  const locale = document.documentElement.lang || "es-ES"
  const dateText = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date())
  infoEl.textContent = `${dateText} · ${window.location.href}`
  meta.appendChild(infoEl)

  header.appendChild(branding)
  header.appendChild(meta)
  template.appendChild(header)

  const content = document.createElement("div")
  content.className = "pdf-content"
  const article = document.querySelector(".center article")
  if (article) content.appendChild(article.cloneNode(true))
  template.appendChild(content)

  const footer = document.createElement("footer")
  footer.className = "pdf-footer"
  const year = new Date().getFullYear()
  footer.textContent = `SOLE Voltaje · ${year} · Fundación SOLE Colombia`
  template.appendChild(footer)

  root.appendChild(template)

  return { root, hasArticle: Boolean(article) }
}

export default (() => {
  document.addEventListener("nav", () => {
    const handleClick = async (event: Event) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest(".download-button") as HTMLButtonElement | null
      if (!button || button.disabled) return
      event.preventDefault()

      button.disabled = true
      button.classList.add("is-loading")

      const { root, hasArticle } = buildExportRoot()
      if (!hasArticle) {
        button.disabled = false
        button.classList.remove("is-loading")
        window.print()
        return
      }

      document.body.appendChild(root)

      try {
        await (document.fonts?.ready ?? Promise.resolve())
        const html2pdf = await loadHtml2Pdf()
        await html2pdf()
          .set({
            margin: 10,
            filename: getFileName(),
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(root)
          .save()
      } catch (error) {
        console.error("[download] PDF generation failed, using print fallback", error)
        window.print()
      } finally {
        root.remove()
        button.disabled = false
        button.classList.remove("is-loading")
      }
    }

    document.addEventListener("click", handleClick)
    window.addCleanup(() => document.removeEventListener("click", handleClick))
  })
})

