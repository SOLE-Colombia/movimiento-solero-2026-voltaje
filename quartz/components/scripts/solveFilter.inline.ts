let filtersActive = false

const permiteOptions = ["Conseguir", "Mejorar", "Compartir", "Medir"]

const sliderDefaults: Record<string, string> = {
  'diff': '3',
  'cost': '4',
  'time': '2',
  'helpers': '3',
  'permite': '0'
}

const updateFilterPlacement = () => {
  const hasSolveFilter = document.querySelector('.solve-filter-sidebar') !== null
  if (!hasSolveFilter) {
    document.body?.classList.remove('solve-filter-top')
    return
  }

  const prefersSidebar = window.matchMedia('(min-width: 1201px)').matches
  const rightFilter = document.querySelector('.sidebar.right .solve-filter-sidebar')
  const rightVisible = prefersSidebar && rightFilter instanceof HTMLElement && rightFilter.offsetParent !== null
  document.body?.classList.toggle('solve-filter-top', !rightVisible)
}

const setupFilters = () => {
  const basePath = document.body?.dataset.basepath ?? ''
  const prefix = basePath && location.pathname.startsWith(basePath) ? basePath : ''
  document.querySelectorAll<HTMLImageElement>('.solve-card-metric-icon[data-icon]').forEach((img) => {
    const iconName = img.dataset.icon
    if (!iconName) return
    const nextSrc = `${prefix}/assets/icons/${iconName}`.replace(/\/{2,}/g, '/')
    if (img.getAttribute('src') !== nextSrc) {
      img.setAttribute('src', nextSrc)
    }
  })

  updateFilterPlacement()

  const filterContainers = document.querySelectorAll<HTMLElement>('.solve-filter-sidebar')
  const cards = document.querySelectorAll<HTMLElement>('.solve-card')
  
  if (filterContainers.length === 0 || cards.length === 0) return

  const updateUrlParams = () => {
    const url = new URL(window.location.href)
    const container = filterContainers[0]
    if (!container) return

    // Categories
    const activeCatBtns = container.querySelectorAll<HTMLButtonElement>('.category-btn.active')
    const selectedCats = Array.from(activeCatBtns).map(btn => btn.dataset.value || "")
    if (selectedCats.length > 0) {
      url.searchParams.set('solve_cats', selectedCats.join(','))
    } else {
      url.searchParams.delete('solve_cats')
    }

    // Sliders
    Object.keys(sliderDefaults).forEach(s => {
      const slider = container.querySelector<HTMLInputElement>(`.${s}-slider`)
      if (slider && slider.classList.contains('touched')) {
        url.searchParams.set(`solve_${s}`, slider.value)
      } else {
        url.searchParams.delete(`solve_${s}`)
      }
    })

    window.history.replaceState({}, '', url)
  }

  const readUrlParams = () => {
    const url = new URL(window.location.href)
    
    // Reset state before reading from URL
    filterContainers.forEach(container => {
      container.querySelectorAll('.category-btn.active').forEach(btn => btn.classList.remove('active'))
      Object.entries(sliderDefaults).forEach(([s, val]) => {
        const slider = container.querySelector<HTMLInputElement>(`.${s}-slider`)
        if (slider) {
          slider.value = val
          slider.classList.remove('touched')
          updateSliderLabels(container, s, parseInt(val), false)
        }
      })
    })
    filtersActive = false

    // Categories
    const catsParam = url.searchParams.get('solve_cats')
    if (catsParam) {
      const cats = catsParam.split(',')
      filterContainers.forEach(container => {
        cats.forEach(cat => {
          const btn = container.querySelector(`.category-btn[data-value="${cat}"]`)
          if (btn) btn.classList.add('active')
        })
      })
    }

    // Sliders
    Object.keys(sliderDefaults).forEach(s => {
      const val = url.searchParams.get(`solve_${s}`)
      if (val !== null) {
        filterContainers.forEach(container => {
          const slider = container.querySelector<HTMLInputElement>(`.${s}-slider`)
          if (slider) {
            slider.value = val
            slider.classList.add('touched')
            updateSliderLabels(container, s, parseInt(val), true)
          }
        })
      }
    })

    // Activate filters if URL has params
    for (const key of url.searchParams.keys()) {
      if (key.startsWith('solve_')) {
        filtersActive = true
        break
      }
    }
  }

  console.log(`SolveFilter: Initializing with ${cards.length} cards`)

  readUrlParams()

  function updateAllCounts(count: number) {
    filterContainers.forEach((c) => {
      const countDisplay = c.querySelector('.card-count')
      if (countDisplay) countDisplay.textContent = `${count} soluciones`
    })
  }

  function updateSliderLabels(container: HTMLElement, sliderName: string, value: number, isTouched: boolean) {
    const section = container.querySelector(`.${sliderName}-slider`)?.closest('.filter-section')
    if (!section) return
    
    const labels = section.querySelectorAll('.label-item')
    labels.forEach((label, index) => {
      if (isTouched && index === value) {
        label.classList.add('active')
      } else {
        label.classList.remove('active')
      }
    })
  }

  function filterCards() {
    const container = filterContainers[0]
    const diffSlider = container.querySelector<HTMLInputElement>('.diff-slider')
    const costSlider = container.querySelector<HTMLInputElement>('.cost-slider')
    const timeSlider = container.querySelector<HTMLInputElement>('.time-slider')
    const helpersSlider = container.querySelector<HTMLInputElement>('.helpers-slider')
    const permiteSlider = container.querySelector<HTMLInputElement>('.permite-slider')
    
    const activeCatBtns = container.querySelectorAll<HTMLButtonElement>('.category-btn.active')
    
    if (!filtersActive) {
      cards.forEach(card => card.style.display = 'flex')
      updateAllCounts(cards.length)
      return
    }
    
    const diffVal = parseInt(diffSlider?.value || '3')
    const diffTouched = diffSlider?.classList.contains('touched')

    const costVal = parseInt(costSlider?.value || '4')
    const costTouched = costSlider?.classList.contains('touched')

    const timeVal = parseInt(timeSlider?.value || '2')
    const timeTouched = timeSlider?.classList.contains('touched')

    const helpersVal = parseInt(helpersSlider?.value || '3')
    const helpersTouched = helpersSlider?.classList.contains('touched')

    const permiteVal = parseInt(permiteSlider?.value || '0')
    const permiteTouched = permiteSlider?.classList.contains('touched')
    const selectedPermite = permiteTouched ? permiteOptions[permiteVal] : null

    const selectedCats = Array.from(activeCatBtns).map(btn => btn.dataset.value || "")
    
    let visibleCount = 0
    cards.forEach((card) => {
      const cardDiff = parseInt(card.dataset.difficulty || '0')
      const cardCost = parseInt(card.dataset.cost || '0')
      const cardTime = parseInt(card.dataset.time || '0')
      const cardHelpers = parseInt(card.dataset.helpers || '0')
      const cardCats = (card.dataset.categories || '').split(',').filter(Boolean)
      
      // Discriminative Logic (Exact Match) ONLY if touched
      const matchesDiff = !diffTouched || cardDiff === (diffVal + 1)
      const matchesCost = !costTouched || cardCost === costVal
      const matchesTime = !timeTouched || cardTime === (timeVal + 1)
      const matchesHelpers = !helpersTouched || cardHelpers === (helpersVal + 1)
      const matchesCat = selectedCats.length === 0 || selectedCats.some(cat => cardCats.includes(cat))
      const matchesPerm = !selectedPermite || cardCats.includes(selectedPermite)
      
      if (matchesDiff && matchesCost && matchesTime && matchesHelpers && matchesCat && matchesPerm) {
        card.style.display = 'flex'
        visibleCount++
      } else {
        card.style.display = 'none'
      }
    })
    
    updateAllCounts(visibleCount)
  }

  function syncAndFilter(sourceContainer: HTMLElement) {
    filtersActive = true
    
    filterContainers.forEach((target) => {
      if (target === sourceContainer) return
      
      // Sync sliders
      Object.keys(sliderDefaults).forEach(s => {
        const src = sourceContainer.querySelector<HTMLInputElement>(`.${s}-slider`)
        const dst = target.querySelector<HTMLInputElement>(`.${s}-slider`)
        if (src && dst) {
          dst.value = src.value
          if (src.classList.contains('touched')) dst.classList.add('touched')
          else dst.classList.remove('touched')
        }
      })
      
      // Sync category buttons
      const srcBtns = sourceContainer.querySelectorAll<HTMLButtonElement>('.category-btn')
      const dstBtns = target.querySelectorAll<HTMLButtonElement>('.category-btn')
      srcBtns.forEach((btn, i) => {
        if (dstBtns[i]) {
          if (btn.classList.contains('active')) dstBtns[i].classList.add('active')
          else dstBtns[i].classList.remove('active')
        }
      })
    })

    // Update labels for ALL containers
    filterContainers.forEach(container => {
      Object.keys(sliderDefaults).forEach(s => {
        const slider = container.querySelector<HTMLInputElement>(`.${s}-slider`)
        if (slider) {
          updateSliderLabels(container, s, parseInt(slider.value), slider.classList.contains('touched'))
        }
      })
    })

    filterCards()
    updateUrlParams()
  }

  function resetAllFilters() {
    filtersActive = false
    filterContainers.forEach(container => {
      Object.entries(sliderDefaults).forEach(([s, val]) => {
        const slider = container.querySelector<HTMLInputElement>(`.${s}-slider`)
        if (slider) {
          slider.value = val
          slider.classList.remove('touched')
          updateSliderLabels(container, s, parseInt(val), false)
        }
      })
      container.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'))
    })
    filterCards()
    updateUrlParams()
  }

  function resetSingleSlider(sliderName: string) {
    const defaultVal = sliderDefaults[sliderName] || '0'
    
    filterContainers.forEach(container => {
      const slider = container.querySelector<HTMLInputElement>(`.${sliderName}-slider`)
      if (slider) {
        slider.value = defaultVal
        slider.classList.remove('touched')
        updateSliderLabels(container, sliderName, parseInt(defaultVal), false)
      }
    })
    
    // Check if any filter is still active
    const anyActive = Array.from(filterContainers).some(container => {
      const hasTouchedSlider = Object.keys(sliderDefaults).some(s => 
        container.querySelector<HTMLInputElement>(`.${s}-slider`)?.classList.contains('touched')
      )
      const hasActiveCat = container.querySelector('.category-btn.active') !== null
      return hasTouchedSlider || hasActiveCat
    })
    
    if (!anyActive) {
      filtersActive = false
    }
    
    filterCards()
    updateUrlParams()
  }

  filterContainers.forEach(container => {
    if (container.dataset.solveFilterReady === "true") {
      return
    }
    container.dataset.solveFilterReady = "true"
    const toggleBtn = container.querySelector<HTMLButtonElement>('.filter-toggle-btn')
    const content = container.querySelector<HTMLElement>('.solve-filter-content')
    const resetBtn = container.querySelector<HTMLButtonElement>('.filter-reset-btn')
    
    // Toggle mobile
    if (toggleBtn && content) {
      const clickHandler = (e: Event) => {
        e.preventDefault()
        content.classList.toggle('expanded')
        toggleBtn.classList.toggle('active')
        const arrow = toggleBtn.querySelector('.toggle-arrow')
        if (arrow) arrow.textContent = content.classList.contains('expanded') ? '▲' : '▼'
      }
      toggleBtn.addEventListener('click', clickHandler)
      window.addCleanup(() => toggleBtn.removeEventListener('click', clickHandler))
    }

    // Global Reset
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters)
      window.addCleanup(() => resetBtn.removeEventListener('click', resetAllFilters))
    }

    // Section Reset Links
    container.querySelectorAll<HTMLSpanElement>('.section-reset-link').forEach(link => {
      const clickHandler = () => {
        const sliderName = link.dataset.slider
        if (sliderName) {
          resetSingleSlider(sliderName)
        }
      }
      link.addEventListener('click', clickHandler)
      window.addCleanup(() => link.removeEventListener('click', clickHandler))
    })

    // Category Buttons
    container.querySelectorAll<HTMLButtonElement>('.category-btn').forEach(btn => {
      const clickHandler = () => {
        btn.classList.toggle('active')
        syncAndFilter(container)
      }
      btn.addEventListener('click', clickHandler)
      window.addCleanup(() => btn.removeEventListener('click', clickHandler))
    })

    // Sliders
    container.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(input => {
      const inputHandler = () => {
        input.classList.add('touched')
        syncAndFilter(container)
      }
      input.addEventListener('input', inputHandler)
      input.addEventListener('change', inputHandler)
      window.addCleanup(() => {
        input.removeEventListener('input', inputHandler)
        input.removeEventListener('change', inputHandler)
      })
    })
    
    // Initialize labels (reflecting URL state or default)
    Object.keys(sliderDefaults).forEach(s => {
      const slider = container.querySelector<HTMLInputElement>(`.${s}-slider`)
      if (slider) {
        const isTouched = slider.classList.contains('touched')
        updateSliderLabels(container, s, parseInt(slider.value), isTouched)
      }
    })
  })

  const anyActive = Array.from(filterContainers).some(container => {
    const hasTouchedSlider = Object.keys(sliderDefaults).some(s =>
      container.querySelector<HTMLInputElement>(`.${s}-slider`)?.classList.contains('touched')
    )
    const hasActiveCat = container.querySelector('.category-btn.active') !== null
    return hasTouchedSlider || hasActiveCat
  })
  filtersActive = anyActive
  filterCards()
}

const globalState = window as typeof window & {
  _solveFilterNavAttached?: boolean
  _solveFilterSetup?: () => void
  _solveFilterPlacementAttached?: boolean
}

const runSetup = () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFilters, { once: true })
  } else {
    setupFilters()
  }
}

globalState._solveFilterSetup = setupFilters
runSetup()
if (!globalState._solveFilterNavAttached) {
  globalState._solveFilterNavAttached = true
  document.addEventListener("nav", () => {
    globalState._solveFilterSetup?.()
  })
}

if (!globalState._solveFilterPlacementAttached) {
  globalState._solveFilterPlacementAttached = true
  window.addEventListener('resize', updateFilterPlacement)
  window.addCleanup?.(() => window.removeEventListener('resize', updateFilterPlacement))
}
