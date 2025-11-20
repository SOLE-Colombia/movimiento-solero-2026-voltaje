const randomize = () => {
  const grids = document.querySelectorAll<HTMLElement>(".random-card-grid")
  grids.forEach((grid) => {
    if (grid.dataset.random === "false") {
      grid.classList.add("is-ready")
      return
    }

    const count = Number(grid.dataset.count ?? "3")
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".random-card"))
    if (cards.length === 0) return

    cards.forEach((card) => card.classList.remove("is-visible"))

    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    shuffled.slice(0, Math.min(count, shuffled.length)).forEach((card) => {
      card.classList.add("is-visible")
    })

    grid.classList.add("is-ready")
  })
}

document.addEventListener("DOMContentLoaded", randomize)
document.addEventListener("nav", randomize)

export {}

