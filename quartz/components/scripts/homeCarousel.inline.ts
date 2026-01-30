// HomeCarousel Script - Se ejecuta en cada navegación SPA
let swiperInstance: any = null
let swiperLoaded = false

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
    
    swiperInstance = new Swiper('.home-carousel-swiper', {
      direction: 'vertical',
      effect: 'cards',
      grabCursor: true,
      loop: true,
      speed: 600,
      
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

// Inicializar en carga de página
document.addEventListener('DOMContentLoaded', initHomeCarousel)

// Re-inicializar en navegación SPA (evento personalizado de Quartz)
document.addEventListener('nav', () => {
  // Pequeño delay para asegurar que el DOM esté listo
  setTimeout(initHomeCarousel, 50)
})

// Cleanup antes de navegar
window.addEventListener('beforeunload', cleanupHomeCarousel)
