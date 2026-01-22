export default (() => {
  document.addEventListener("nav", () => {
    // Buscar TODOS los contenedores de filtro de Solve
    const filterContainers = document.querySelectorAll<HTMLElement>('.solve-filter-sidebar')
    if (filterContainers.length === 0) return
    
    // Elementos globales (tarjetas)
    const cards = document.querySelectorAll<HTMLElement>('.solve-card')
    if (cards.length === 0) return
    
    // Estado global de filtros
    let filtersActive = false
    
    // Función para sincronizar todos los filtros
    function syncFilters(sourceContainer: HTMLElement) {
      filterContainers.forEach((container) => {
        if (container === sourceContainer) return
        
        // Sincronizar sliders
        const sourceDiff = sourceContainer.querySelector<HTMLInputElement>('.diff-slider')
        const targetDiff = container.querySelector<HTMLInputElement>('.diff-slider')
        if (sourceDiff && targetDiff) targetDiff.value = sourceDiff.value
        
        const sourceCost = sourceContainer.querySelector<HTMLInputElement>('.cost-slider')
        const targetCost = container.querySelector<HTMLInputElement>('.cost-slider')
        if (sourceCost && targetCost) targetCost.value = sourceCost.value
        
        const sourceTime = sourceContainer.querySelector<HTMLInputElement>('.time-slider')
        const targetTime = container.querySelector<HTMLInputElement>('.time-slider')
        if (sourceTime && targetTime) targetTime.value = sourceTime.value
        
        const sourceHelpers = sourceContainer.querySelector<HTMLInputElement>('.helpers-slider')
        const targetHelpers = container.querySelector<HTMLInputElement>('.helpers-slider')
        if (sourceHelpers && targetHelpers) targetHelpers.value = sourceHelpers.value
        
        // Sincronizar checkboxes de categorías
        const sourceCatCbs = sourceContainer.querySelectorAll<HTMLInputElement>('.category-checkbox')
        sourceCatCbs.forEach((sourceCb, i) => {
          const targetCb = container.querySelectorAll<HTMLInputElement>('.category-checkbox')[i]
          if (targetCb) targetCb.checked = sourceCb.checked
        })
        
        // Sincronizar checkboxes de permite
        const sourcePermCbs = sourceContainer.querySelectorAll<HTMLInputElement>('.permite-checkbox')
        sourcePermCbs.forEach((sourceCb, i) => {
          const targetCb = container.querySelectorAll<HTMLInputElement>('.permite-checkbox')[i]
          if (targetCb) targetCb.checked = sourceCb.checked
        })
      })
    }
    
    // Función para filtrar tarjetas usando el primer contenedor visible
    function filterCards() {
      const container = filterContainers[0]
      
      const diffSlider = container.querySelector<HTMLInputElement>('.diff-slider')
      const costSlider = container.querySelector<HTMLInputElement>('.cost-slider')
      const timeSlider = container.querySelector<HTMLInputElement>('.time-slider')
      const categoryCheckboxes = container.querySelectorAll<HTMLInputElement>('.category-checkbox')
      
      if (!filtersActive) {
        updateAllCounts()
        return
      }
      
      const maxDiff = parseInt(diffSlider?.value || '3')
      const maxCost = parseInt(costSlider?.value || '4')
      const maxTime = parseInt(timeSlider?.value || '2')
      
      const selectedCats: string[] = []
      categoryCheckboxes.forEach((cb) => {
        if (cb.checked) selectedCats.push(cb.value)
      })
      
      let visibleCount = 0
      
      cards.forEach((card) => {
        const cardDiff = parseInt(card.dataset.difficulty || '0')
        const cardCost = parseInt(card.dataset.cost || '0')
        const cardTime = parseInt(card.dataset.time || '0')
        const cardCats = (card.dataset.categories || '').split(',').filter(Boolean)
        
        const matchesDiff = cardDiff <= maxDiff + 1
        const matchesCost = cardCost <= maxCost
        const matchesTime = cardTime <= maxTime + 1
        const matchesCat = selectedCats.length === 0 || 
          selectedCats.some((cat) => cardCats.includes(cat))
        
        if (matchesDiff && matchesCost && matchesTime && matchesCat) {
          card.style.display = 'flex'
          visibleCount++
        } else {
          card.style.display = 'none'
        }
      })
      
      // Actualizar contadores en todos los contenedores
      filterContainers.forEach((c) => {
        const countDisplay = c.querySelector('.card-count')
        if (countDisplay) {
          countDisplay.textContent = visibleCount + ' soluciones'
        }
      })
    }
    
    function updateAllCounts() {
      filterContainers.forEach((c) => {
        const countDisplay = c.querySelector('.card-count')
        if (countDisplay) {
          countDisplay.textContent = cards.length + ' soluciones'
        }
      })
    }
    
    function resetAllFilters() {
      filtersActive = false
      filterContainers.forEach((container) => {
        const diffSlider = container.querySelector<HTMLInputElement>('.diff-slider')
        const costSlider = container.querySelector<HTMLInputElement>('.cost-slider')
        const timeSlider = container.querySelector<HTMLInputElement>('.time-slider')
        const helpersSlider = container.querySelector<HTMLInputElement>('.helpers-slider')
        
        if (diffSlider) diffSlider.value = '3'
        if (costSlider) costSlider.value = '4'
        if (timeSlider) timeSlider.value = '2'
        if (helpersSlider) helpersSlider.value = '3'
        
        container.querySelectorAll<HTMLInputElement>('.category-checkbox').forEach((cb) => { cb.checked = false })
        container.querySelectorAll<HTMLInputElement>('.permite-checkbox').forEach((cb) => { cb.checked = false })
      })
      
      cards.forEach((card) => { card.style.display = 'flex' })
      updateAllCounts()
    }
    
    // Configurar cada contenedor de filtro
    filterContainers.forEach((container) => {
      const toggleBtn = container.querySelector<HTMLButtonElement>('.filter-toggle-btn')
      const filterContent = container.querySelector<HTMLElement>('.solve-filter-content')
      const resetBtn = container.querySelector<HTMLButtonElement>('.filter-reset-btn')
      
      // Toggle para móvil - SOLO para este contenedor
      if (toggleBtn && filterContent) {
        const handleToggle = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          filterContent.classList.toggle('expanded')
          toggleBtn.classList.toggle('active')
          const arrow = toggleBtn.querySelector('.toggle-arrow')
          if (arrow) {
            arrow.textContent = filterContent.classList.contains('expanded') ? '▲' : '▼'
          }
        }
        toggleBtn.addEventListener('click', handleToggle)
        window.addCleanup(() => toggleBtn.removeEventListener('click', handleToggle))
      }
      
      // Reset button
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters)
        window.addCleanup(() => resetBtn.removeEventListener('click', resetAllFilters))
      }
      
      // Sliders
      const diffSlider = container.querySelector<HTMLInputElement>('.diff-slider')
      const costSlider = container.querySelector<HTMLInputElement>('.cost-slider')
      const timeSlider = container.querySelector<HTMLInputElement>('.time-slider')
      const helpersSlider = container.querySelector<HTMLInputElement>('.helpers-slider')
      
      function activateAndFilter() {
        filtersActive = true
        syncFilters(container)
        filterCards()
      }
      
      if (diffSlider) {
        diffSlider.addEventListener('input', activateAndFilter)
        window.addCleanup(() => diffSlider.removeEventListener('input', activateAndFilter))
      }
      if (costSlider) {
        costSlider.addEventListener('input', activateAndFilter)
        window.addCleanup(() => costSlider.removeEventListener('input', activateAndFilter))
      }
      if (timeSlider) {
        timeSlider.addEventListener('input', activateAndFilter)
        window.addCleanup(() => timeSlider.removeEventListener('input', activateAndFilter))
      }
      if (helpersSlider) {
        helpersSlider.addEventListener('input', activateAndFilter)
        window.addCleanup(() => helpersSlider.removeEventListener('input', activateAndFilter))
      }
      
      // Checkboxes de categoría
      container.querySelectorAll<HTMLInputElement>('.category-checkbox').forEach((cb) => { 
        cb.addEventListener('change', activateAndFilter)
        window.addCleanup(() => cb.removeEventListener('change', activateAndFilter))
      })
      
      // Checkboxes de permite
      container.querySelectorAll<HTMLInputElement>('.permite-checkbox').forEach((cb) => { 
        cb.addEventListener('change', activateAndFilter)
        window.addCleanup(() => cb.removeEventListener('change', activateAndFilter))
      })
      
      // Individual reset buttons
      const diffReset = container.querySelector<HTMLButtonElement>('.diff-reset')
      const costReset = container.querySelector<HTMLButtonElement>('.cost-reset')
      const timeReset = container.querySelector<HTMLButtonElement>('.time-reset')
      const helpersReset = container.querySelector<HTMLButtonElement>('.helpers-reset')
      const permiteReset = container.querySelector<HTMLButtonElement>('.permite-reset')
      
      if (diffReset) {
        const handleDiffReset = () => {
          filterContainers.forEach((c) => {
            const slider = c.querySelector<HTMLInputElement>('.diff-slider')
            if (slider) slider.value = '3'
          })
          activateAndFilter()
        }
        diffReset.addEventListener('click', handleDiffReset)
        window.addCleanup(() => diffReset.removeEventListener('click', handleDiffReset))
      }
      
      if (costReset) {
        const handleCostReset = () => {
          filterContainers.forEach((c) => {
            const slider = c.querySelector<HTMLInputElement>('.cost-slider')
            if (slider) slider.value = '4'
          })
          activateAndFilter()
        }
        costReset.addEventListener('click', handleCostReset)
        window.addCleanup(() => costReset.removeEventListener('click', handleCostReset))
      }
      
      if (timeReset) {
        const handleTimeReset = () => {
          filterContainers.forEach((c) => {
            const slider = c.querySelector<HTMLInputElement>('.time-slider')
            if (slider) slider.value = '2'
          })
          activateAndFilter()
        }
        timeReset.addEventListener('click', handleTimeReset)
        window.addCleanup(() => timeReset.removeEventListener('click', handleTimeReset))
      }
      
      if (helpersReset) {
        const handleHelpersReset = () => {
          filterContainers.forEach((c) => {
            const slider = c.querySelector<HTMLInputElement>('.helpers-slider')
            if (slider) slider.value = '3'
          })
          activateAndFilter()
        }
        helpersReset.addEventListener('click', handleHelpersReset)
        window.addCleanup(() => helpersReset.removeEventListener('click', handleHelpersReset))
      }
      
      if (permiteReset) {
        const handlePermiteReset = () => {
          filterContainers.forEach((c) => {
            c.querySelectorAll<HTMLInputElement>('.permite-checkbox').forEach((cb) => { cb.checked = false })
          })
          activateAndFilter()
        }
        permiteReset.addEventListener('click', handlePermiteReset)
        window.addCleanup(() => permiteReset.removeEventListener('click', handlePermiteReset))
      }
    })
    
    // Inicializar contadores
    updateAllCounts()
  })
})
