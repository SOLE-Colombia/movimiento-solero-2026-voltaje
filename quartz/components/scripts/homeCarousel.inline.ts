// HomeCarousel Script - Se ejecuta en cada navegación SPA
let swiperInstance: any = null
let swiperLoaded = false
let lastNavigateAt = 0
const navThrottleMs = 250
let pointerStart: { x: number; y: number } | null = null
const pointerThresholdPx = 8
let docNavAttached = false

// Cargar Swiper dinámicamente
async function loadSwiper(): Promise<any> {
  if (swiperLoaded && (window as any).Swiper) {
    return (window as any).Swiper
  }
  
  // Cargar CSS si no existe
  if (!document.querySelector('link[href*="swiper"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
    document.head.appendChild(link)
  }
  
  // Cargar JS
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
    script.onload = () => {
      swiperLoaded = true
      resolve((window as any).Swiper)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function initHomeCarousel() {
  const container = document.querySelector('.home-carousel-swiper')
  if (!container) return
  
  // Destruir instancia anterior si existe
  if (swiperInstance) {
    try {
      swiperInstance.destroy(true, true)
    } catch (e) {
      // Ignorar errores de destrucción
    }
    swiperInstance = null
  }
  
  // Cargar e inicializar Swiper
  loadSwiper().then((Swiper) => {
    const currentSpan = document.getElementById('carousel-current')
    const prevBtn = document.querySelector('.nav-prev')
    const nextBtn = document.querySelector('.nav-next')
    const counter = document.querySelector('.home-carousel-counter')
    const container = document.querySelector('.home-carousel-swiper') as HTMLElement | null
    
    const getEvent = (a: any, b: any): Event | null => {
      if (a instanceof Event) return a
      if (b instanceof Event) return b
      return null
    }

    const handleCardNav = (event: Event | null) => {
      if (!event) return
      const target = event.target as HTMLElement | null
      if (target?.closest(".home-carousel-nav")) return
      let link = target?.closest("a.home-carousel-card") as HTMLAnchorElement | null
      if (!link) {
        const slide = target?.closest(".swiper-slide") as HTMLElement | null
        link = slide?.querySelector("a.home-carousel-card") ?? null
      }
      if (!link?.href) return

      const mouseEvent = event as MouseEvent
      if (mouseEvent.metaKey || mouseEvent.ctrlKey || mouseEvent.shiftKey || mouseEvent.altKey || mouseEvent.button === 1) {
        return
      }
      if (pointerStart && event.type === "pointerup") {
        const deltaX = Math.abs((event as PointerEvent).clientX - pointerStart.x)
        const deltaY = Math.abs((event as PointerEvent).clientY - pointerStart.y)
        const moved = deltaX > pointerThresholdPx || deltaY > pointerThresholdPx
        if (moved) return
      }

      const now = Date.now()
      if (now - lastNavigateAt < navThrottleMs) return
      lastNavigateAt = now

      event.preventDefault()
      const url = new URL(link.href, window.location.href)
      const sameOrigin = url.origin === window.location.origin
      const spaNavigate = (window as any).spaNavigate
      if (sameOrigin && typeof spaNavigate === "function") {
        spaNavigate(url)
        return
      }
      window.location.href = url.toString()
    }

    if (container && !container.dataset.cardNavBound) {
      container.dataset.cardNavBound = "true"
      container.addEventListener(
        "pointerdown",
        (event) => {
          const e = event as PointerEvent
          pointerStart = { x: e.clientX, y: e.clientY }
        },
        true,
      )
      container.addEventListener("click", (event) => handleCardNav(event), true)
      container.addEventListener("pointerup", (event) => handleCardNav(event), true)
      container.addEventListener(
        "pointercancel",
        () => {
          pointerStart = null
        },
        true,
      )
    }

    if (!docNavAttached) {
      docNavAttached = true
      document.addEventListener(
        "pointerup",
        (event) => {
          const target = event.target as HTMLElement | null
          if (!target?.closest(".home-carousel-container")) return
          handleCardNav(event)
        },
        true,
      )
      document.addEventListener(
        "click",
        (event) => {
          const target = event.target as HTMLElement | null
          if (!target?.closest(".home-carousel-container")) return
          handleCardNav(event)
        },
        true,
      )
    }
    
    swiperInstance = new Swiper('.home-carousel-swiper', {
      direction: 'vertical',
      effect: 'cards',
      grabCursor: true,
      loop: true,
      speed: 600,
      threshold: 10,
      touchStartPreventDefault: false,
      preventClicks: false,
      preventClicksPropagation: false,
      
      cardsEffect: {
        rotate: false,
        perSlideOffset: 10,
        perSlideRotate: 2,
        slideShadows: false,
      },
      
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      
      navigation: {
        nextEl: '.nav-next',
        prevEl: '.nav-prev',
      },
      
      on: {
        click: function(this: any, a: any, b: any) {
          handleCardNav(getEvent(a, b))
        },
        tap: function(this: any, a: any, b: any) {
          handleCardNav(getEvent(a, b))
        },
        slideChange: function(this: any) {
          if (currentSpan) {
            currentSpan.textContent = String(this.realIndex + 1)
          }
          
          // Update colors based on active card
          const activeSlide = this.slides[this.activeIndex]
          const card = activeSlide?.querySelector('.home-carousel-card')
          if (card) {
            const color = card.getAttribute('data-color')
            if (color && counter) {
              (counter as HTMLElement).style.color = color
              if (prevBtn) (prevBtn as HTMLElement).style.color = color
              if (nextBtn) (nextBtn as HTMLElement).style.color = color
            }
          }
        },
        init: function(this: any) {
          // Trigger initial color update
          setTimeout(() => {
            const activeSlide = this.slides?.[this.activeIndex]
            const card = activeSlide?.querySelector('.home-carousel-card')
            if (card && counter) {
              const color = card.getAttribute('data-color')
              if (color) {
                (counter as HTMLElement).style.color = color
                if (prevBtn) (prevBtn as HTMLElement).style.color = color
                if (nextBtn) (nextBtn as HTMLElement).style.color = color
              }
            }
          }, 100)
        }
      }
    })
    
    console.log('HomeCarousel: Swiper initialized')
  }).catch((err) => {
    console.error('HomeCarousel: Failed to load Swiper', err)
  })
}

function cleanupHomeCarousel() {
  if (swiperInstance) {
    try {
      swiperInstance.destroy(true, true)
    } catch (e) {
      // Ignorar
    }
    swiperInstance = null
  }
}

const globalState = window as typeof window & {
  _homeCarouselNavAttached?: boolean
  _homeCarouselCleanupAttached?: boolean
}

const runInit = () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeCarousel, { once: true })
  } else {
    initHomeCarousel()
  }
}

runInit()

// Re-inicializar en navegación SPA (evento personalizado de Quartz)
if (!globalState._homeCarouselNavAttached) {
  globalState._homeCarouselNavAttached = true
  document.addEventListener("nav", () => {
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(initHomeCarousel, 50)
  })
}

// Cleanup antes de navegar o salir
if (!globalState._homeCarouselCleanupAttached) {
  globalState._homeCarouselCleanupAttached = true
  window.addEventListener("beforeunload", cleanupHomeCarousel)
  window.addCleanup?.(() => cleanupHomeCarousel())
}
