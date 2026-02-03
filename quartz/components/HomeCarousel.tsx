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
  icon: string // Icon filename (static/icons-home)
  accentColor?: string // Optional highlight/link color
  link: string
}

const cards: CarouselCard[] = [
  {
    id: 1,
    question: "¿Estás en un sitio sin",
    highlight: "electricidad constante y estable",
    color: "#E91E8C", // Rosa/magenta
    textColor: "#ffffff",
    icon: "ic_pix_thunder.svg",
    link: "/es/solve/?solve_cats=Electricidad",
  },
  {
    id: 2,
    question: "¿Te has preguntado",
    highlight: "qué es el internet",
    color: "#A4C639", // Verde lima
    textColor: "#ffffff",
    icon: "ic_pix_world.svg",
    link: "/es/inspire/insp-what-is-internet",
  },
  {
    id: 3,
    question: "¿Tu",
    highlight: "señal de internet es mala o inestable",
    color: "#2E86AB", // Azul
    textColor: "#ffffff",
    icon: "ic_pix_signal.svg",
    link: "/es/solve/?solve_cats=Se%C3%B1al",
  },
  {
    id: 4,
    question: "¿Cómo conectarse a",
    highlight: "internet con una caja",
    color: "#5C6BC0", // Índigo
    textColor: "#ffffff",
    icon: "ic_pix_box.svg",
    link: "/es/solve/solv-jangala-internet-box",
  },
  {
    id: 5,
    question: "¿Conoces gente que no tiene un lugar",
    highlight: "público o comunitario para reunirse",
    color: "#26A69A", // Verde azulado
    textColor: "#ffffff",
    icon: "ic_pix_location.svg",
    link: "/es/solve/?solve_cats=Espacios",
  },
  {
    id: 6,
    question: "¿Cuándo fue la última vez que usaste el",
    highlight: "internet en grupo",
    color: "#8E24AA", // Púrpura
    textColor: "#ffffff",
    icon: "ic_pix_happy-person.svg",
    link: "/es/inspire/insp-internet-in-group",
  },
  {
    id: 7,
    question: "¿Es difícil convocar personas para hacer",
    highlight: "algo juntos",
    color: "#FF7043", // Naranja coral
    textColor: "#ffffff",
    icon: "ic_pix_hand01.svg",
    link: "/es/solve/?solve_cats=Personas",
  },
  {
    id: 8,
    question: "¿Estarías dispuesto a",
    highlight: "quitarle la clave a tu WiFi",
    color: "#E91E8C", // Rosa/magenta
    textColor: "#ffffff",
    icon: "ic_pix_unlock.svg",
    link: "/es/inspire/insp-sharing-your-internet",
  },
  {
    id: 9,
    question: "¿Conoces comunidades que necesiten",
    highlight: "computadores",
    color: "#42A5F5", // Azul claro
    textColor: "#ffffff",
    icon: "ic_pix_computer.svg",
    link: "/es/solve/?solve_cats=Dispositivos",
  },
  {
    id: 10,
    question: "¿Sabías que con una lata puedes",
    highlight: "mejorar la señal de tu celular",
    color: "#2E86AB", // Azul
    textColor: "#ffffff",
    icon: "ic_signal02.svg",
    link: "/es/solve/solv-improve-signal-can",
  },
  {
    id: 11,
    question: "¿Conoces a alguien que NO tiene",
    highlight: "acceso a internet",
    color: "#66BB6A", // Verde
    textColor: "#ffffff",
    icon: "ic_pix_nosignal.svg",
    link: "/es/disconnected",
  },
  {
    id: 12,
    question: "¿Quieres conocer comunidades que",
    highlight: "hackean su propia conexión a internet",
    color: "#FF8A65", // Naranja
    textColor: "#ffffff",
    icon: "ic_pix_face.svg",
    link: "/es/inspire?inspire_tags=historias-potentes",
  },
]

export default (() => {
  const HomeCarousel: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const logoSrc = cfg.baseUrl
      ? `https://${cfg.baseUrl}/static/logo.png`
      : joinSegments(baseDir, "static/logo.png")

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
                        href={card.link.startsWith("http") ? card.link : joinSegments(baseDir, card.link)}
                        class="home-carousel-card"
                        data-color={card.color}
                        style={`--card-color: ${card.color}; --card-text: ${card.textColor}; --card-accent: ${card.accentColor ?? "#F9C369"};`}
                      >
                        <div class="home-carousel-card-icon">
                          <img
                            src={joinSegments(baseDir, "static", "icons-home", card.icon)}
                            alt=""
                            loading="lazy"
                          />
                        </div>
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
