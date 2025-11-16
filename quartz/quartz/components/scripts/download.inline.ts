export default (() => {
  document.addEventListener("nav", () => {
    const downloadButtons = document.querySelectorAll<HTMLButtonElement>(".download-button")
    
    downloadButtons.forEach((button) => {
      const handleClick = () => {
        // Abrir el diálogo de impresión del navegador
        // El usuario puede elegir "Guardar como PDF" en el diálogo
        window.print()
      }
      
      button.addEventListener("click", handleClick)
      window.addCleanup(() => button.removeEventListener("click", handleClick))
    })
  })
})

