// @ts-nocheck

let walinePromise: Promise<any> | null = null

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
        serverURL: "https://waline-voltaje.vercel.app",
        path: window.location.pathname,
        reaction: ["❌", "😓", "😐", "🙂", "🚀"],
        locale: {
          placeholder: " ",
          comment: " ",
          submit: " ",
          login: " ",
          logout: " ",
        },
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


