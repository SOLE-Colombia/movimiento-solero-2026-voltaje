// @ts-nocheck

let walinePromise: Promise<any> | null = null

const reactionIcon = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

const reactionIcons = [
  reactionIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  ),
  reactionIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
  ),
  reactionIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  ),
]

const loadWaline = () => {
  if (!walinePromise) {
    walinePromise = import("https://unpkg.com/@waline/client@3.4.2/dist/waline.js")
  }
  return walinePromise
}

const initWaline = () => {
  const target = document.querySelector("#waline")
  if (!target) {
    console.debug("[waline] no #waline target found")
    return
  }

  loadWaline()
    .then(({ init }) => {
      if (typeof init !== "function") {
        console.error("[waline] init not found in module")
        return
      }
      console.debug("[waline] init reactions on", window.location.pathname)
      init({
        el: "#waline",
        serverURL: "https://voltaje.zeabur.app/",
        path: window.location.pathname,
        lang: 'es',
        reaction: reactionIcons,
        imageUploader: false,
        search: false,
        locale: {
          reactionTitle: '¿Te gustaría probar esta solución?',
          placeholder: 'Deja tus inquietudes o comentarios estamos para ayudarte.',
          sofa: 'Aún no hay comentarios. ¡Cuéntanos tu experiencia!',
        },
      })

      // Redirigir a /es/answers-comments al hacer clic en "Tal vez" o "Sí"
      target.addEventListener("click", (e) => {
        const btn = e.target.closest(".wl-reaction-item")
        if (btn) {
          const allBtns = Array.from(target.querySelectorAll(".wl-reaction-item"))
          const index = allBtns.indexOf(btn)
          if (index === 1 || index === 2) {
            // Index 1 = "Tal vez", Index 2 = "Sí"
            window.open("/es/answers-comments", "_blank")
          }
        }
      })
    })
    .catch((err) => {
      console.error("[waline] failed to load/init", err)
    })
}

document.addEventListener("nav", () => {
  initWaline()
})

// Inicializar en primera carga
initWaline()


