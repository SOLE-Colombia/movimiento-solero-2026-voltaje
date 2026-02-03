export default (() => {
  document.addEventListener("nav", () => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest(".download-button") as HTMLButtonElement | null
      if (!button) return
      event.preventDefault()
      // Abrir el diálogo de impresión del navegador
      // El usuario puede elegir "Guardar como PDF" en el diálogo
      window.print()
    }

    document.addEventListener("click", handleClick)
    window.addCleanup(() => document.removeEventListener("click", handleClick))
  })
})

