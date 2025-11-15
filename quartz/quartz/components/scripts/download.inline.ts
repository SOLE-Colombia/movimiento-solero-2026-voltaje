export default (() => {
  const downloadButtons = document.querySelectorAll<HTMLButtonElement>(".download-button")
  
  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Abrir el diálogo de impresión del navegador
      // El usuario puede elegir "Guardar como PDF" en el diálogo
      window.print()
    })
  })
})

