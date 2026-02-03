// Script para cargar los iconos SVG dinámicamente en SolveMetaSidebar
const setupSolveMetaIcons = () => {
  const basePath = document.body?.dataset.basepath ?? ''
  const prefix = basePath && location.pathname.startsWith(basePath) ? basePath : ''
  
  document.querySelectorAll<HTMLImageElement>('.solve-meta-sidebar .solve-meta-icon[data-icon]').forEach((img) => {
    const iconName = img.dataset.icon
    if (!iconName) return
    const nextSrc = `${prefix}/assets/icons/${iconName}`.replace(/\/{2,}/g, '/')
    if (img.getAttribute('src') !== nextSrc) {
      img.setAttribute('src', nextSrc)
    }
  })
}

// Ejecutar al cargar la página
setupSolveMetaIcons()

// Escuchar cambios de navegación SPA (si Quartz lo soporta)
document.addEventListener('nav', () => {
  setupSolveMetaIcons()
})
