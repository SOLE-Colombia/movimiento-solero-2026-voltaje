// @ts-nocheck

const initWaline = () => {
  const target = document.querySelector("#waline")
  if (!target) return

  import("@waline/client/component").then(({ init }) => {
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
}

document.addEventListener("nav", () => {
  initWaline()
})

// Inicializar en primera carga
initWaline()


