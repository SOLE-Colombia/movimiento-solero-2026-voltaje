import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"
// @ts-ignore
import style from "./styles/homeCarousel.scss"
// @ts-ignore
import script from "./scripts/homeCarousel.inline"

interface CarouselCard {
  id: number
  question: string
  highlight: string // Parte destacada de la pregunta
  color: string
  textColor: string
  icon: string // SVG icon
  link: string
}

const cards: CarouselCard[] = [
  {
    id: 1,
    question: "¿Estás en un sitio sin",
    highlight: "electricidad constante y estable",
    color: "#E91E8C", // Rosa/magenta
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M36 4h-8l-4 24h8l-8 32 24-36h-12l8-20z"/></svg>`,
    link: "es/solve#electricidad",
  },
  {
    id: 2,
    question: "¿Te has preguntado",
    highlight: "qué es el internet",
    color: "#A4C639", // Verde lima
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="4"/><ellipse cx="32" cy="32" rx="12" ry="28" fill="none" stroke="currentColor" stroke-width="4"/><line x1="4" y1="32" x2="60" y2="32" stroke="currentColor" stroke-width="4"/><line x1="32" y1="4" x2="32" y2="60" stroke="currentColor" stroke-width="4"/></svg>`,
    link: "es/new-here",
  },
  {
    id: 3,
    question: "¿Tu",
    highlight: "señal de internet es mala o inestable",
    color: "#2E86AB", // Azul
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 52a4 4 0 100 8 4 4 0 000-8z"/><path d="M32 40c-6.6 0-12 4.5-12 10h4c0-3.3 3.6-6 8-6s8 2.7 8 6h4c0-5.5-5.4-10-12-10z"/><path d="M32 28c-11 0-20 7.5-20 16.7h4c0-7 7.2-12.7 16-12.7s16 5.7 16 12.7h4c0-9.2-9-16.7-20-16.7z"/><path d="M32 16c-15.5 0-28 10.5-28 23.5h4C8 28.3 18.7 20 32 20s24 8.3 24 19.5h4c0-13-12.5-23.5-28-23.5z"/></svg>`,
    link: "es/solve#senal",
  },
  {
    id: 4,
    question: "¿Sabes cuántos",
    highlight: "megas de internet necesitas",
    color: "#5C6BC0", // Índigo
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><rect x="8" y="20" width="48" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M24 36h16M24 44h8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="40" r="4"/></svg>`,
    link: "es/solve/solv-bandwidth",
  },
  {
    id: 5,
    question: "¿Conoces cómo",
    highlight: "medir tu velocidad de internet",
    color: "#26A69A", // Verde azulado
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="4"/><path d="M32 32l12-20" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="4"/></svg>`,
    link: "es/solve/solv-internet-speedtest",
  },
  {
    id: 6,
    question: "¿Cuándo fue la última vez que usaste el",
    highlight: "internet en grupo",
    color: "#8E24AA", // Púrpura
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="16" r="8"/><circle cx="16" cy="28" r="6"/><circle cx="48" cy="28" r="6"/><path d="M20 56V44a12 12 0 0124 0v12" fill="none" stroke="currentColor" stroke-width="4"/><path d="M8 56V48a8 8 0 018-8" fill="none" stroke="currentColor" stroke-width="4"/><path d="M56 56V48a8 8 0 00-8-8" fill="none" stroke="currentColor" stroke-width="4"/></svg>`,
    link: "es/inspire",
  },
  {
    id: 7,
    question: "¿Sabías que puedes crear tu propia",
    highlight: "Wikipedia de bolsillo",
    color: "#FF7043", // Naranja coral
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><rect x="12" y="8" width="40" height="48" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M20 20h24M20 28h24M20 36h16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
    link: "es/solve/solv-pocket-wikipedia",
  },
  {
    id: 8,
    question: "¿Estarías dispuesto a",
    highlight: "quitarle la clave a tu WiFi",
    color: "#E91E8C", // Rosa/magenta
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><rect x="16" y="28" width="32" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M24 28V20a8 8 0 0116 0v8" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="32" cy="42" r="4"/><line x1="32" y1="46" x2="32" y2="50" stroke="currentColor" stroke-width="4"/></svg>`,
    link: "es/solve/solv-share-internet-wirelessly",
  },
  {
    id: 9,
    question: "¿Te gustaría aprender sobre",
    highlight: "internet satelital",
    color: "#42A5F5", // Azul claro
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="32" cy="48" rx="24" ry="8" fill="none" stroke="currentColor" stroke-width="4"/><path d="M32 8l-16 32h32z" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="32" cy="24" r="4"/></svg>`,
    link: "es/solve/solv-choose-satellite-internet",
  },
  {
    id: 10,
    question: "¿Sabías que con una lata puedes",
    highlight: "mejorar la señal de tu celular",
    color: "#2E86AB", // Azul
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="48" r="8"/><path d="M32 40V24" stroke="currentColor" stroke-width="4"/><path d="M24 16c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="none" stroke="currentColor" stroke-width="4"/><path d="M16 12c0-8.8 7.2-12 16-12s16 3.2 16 12" fill="none" stroke="currentColor" stroke-width="4"/></svg>`,
    link: "es/solve/solv-improve-signal-can",
  },
  {
    id: 11,
    question: "¿Quieres saber cómo generar",
    highlight: "electricidad con una bicicleta",
    color: "#66BB6A", // Verde
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="16" cy="44" r="12" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="48" cy="44" r="12" fill="none" stroke="currentColor" stroke-width="4"/><path d="M16 44l16-20 8 20M32 24l8 0" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
    link: "es/solve/solv-bicigenerator",
  },
  {
    id: 12,
    question: "¿Quieres conocer comunidades que",
    highlight: "hackean su propia conexión a internet",
    color: "#FF8A65", // Naranja
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M20 48V32a4 4 0 014-4h16a4 4 0 014 4v16" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="28" cy="20" r="8" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="4"/><path d="M24 48l-4 8M40 48l4 8M28 48v8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
    link: "es/inspire",
  },
]

export default (() => {
  const HomeCarousel: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const logoSrc = joinSegments(baseDir, "static/logo.png")

    return (
      <div class={`home-carousel-container ${displayClass ?? ""}`}>
        {/* Load Swiper CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

        <header class="home-carousel-header">
          <a href={baseDir} class="home-carousel-logo-link">
            <img src={logoSrc} alt="SOLE Voltaje" class="home-carousel-logo" />
          </a>
          <p class="home-carousel-tagline">Inventando juntos otros internets posibles</p>
        </header>

        <main class="home-carousel-main">
          <p class="home-carousel-instruction">Haz clic en la pregunta que más llame tu atención:</p>

          <div class="home-carousel-wrapper">
            
            <div class="home-carousel-center-stage">
              {/* Swiper Container */}
              <div class="swiper home-carousel-swiper">
                <div class="swiper-wrapper">
                  {cards.map((card) => (
                    <div class="swiper-slide">
                      <a
                        href={joinSegments(baseDir, card.link)}
                        class="home-carousel-card"
                        data-color={card.color}
                        style={`--card-color: ${card.color}; --card-text: ${card.textColor};`}
                      >
                        <div class="home-carousel-card-icon" dangerouslySetInnerHTML={{ __html: card.icon }} />
                        <div class="home-carousel-card-content">
                          <span class="home-carousel-card-question">
                            {card.question} <span class="highlight">{card.highlight}</span>?
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div class="home-carousel-nav">
                <button class="home-carousel-nav-btn nav-prev" aria-label="Anterior">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <div class="home-carousel-counter">
                  <span id="carousel-current">1</span>/<span id="carousel-total">{cards.length}</span>
                </div>
                <button class="home-carousel-nav-btn nav-next" aria-label="Siguiente">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div class="home-carousel-actions">
              <a href={joinSegments(baseDir, "es/new-here")} class="home-carousel-btn">
                <span class="btn-icon">💡</span>
                 ¿Nuevo aquí?
              </a>
              <a href={joinSegments(baseDir, "es/solve")} class="home-carousel-link">
                Ir directamente a la guía de soluciones
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 8 16 12 12 16"></polyline>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </a>
            </div>
          </div>
        </main>

        <footer class="home-carousel-footer">
          <p>
            <span class="cc-icon">Ⓒ</span> Voltaje es una iniciativa abierta de la{" "}
            <a href="https://www.solecolombia.org/" target="_blank" rel="noopener noreferrer">
              Fundación SOLE Colombia
            </a>
            , con el apoyo de{" "}
            <a href="https://www.isocfoundation.org/" target="_blank" rel="noopener noreferrer">
              Internet Society Foundation
            </a>
            , que se construye día a día en comunidad.
          </p>
        </footer>
      </div>
    )
  }

  HomeCarousel.css = style
  HomeCarousel.afterDOMLoaded = script
  return HomeCarousel
}) satisfies QuartzComponentConstructor
