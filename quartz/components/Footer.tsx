import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const translations = i18n(cfg.locale).components.footer
    
    // Enlaces rápidos de SOLE Voltaje
    const soleLinks = {
      "¿Nuevo aquí?": "/nuevo-aqui-sole-voltaje",
      "Inspírate": "/inspirate-sole-voltaje",
      "Soluciona": "/soluciona-sole-voltaje",
      "Pregunta/Comenta": "/pregunta-comenta-sole-voltaje",
      "¿Desconectado?": "/desconectado-sole-voltaje",
      "Conceptorio": "/conceptorio-sole-voltaje",
    }
    
    const basePath = (() => {
      if (!cfg.baseUrl) return ""
      const url = new URL(`https://${cfg.baseUrl}`)
      const cleaned = url.pathname.replace(/\/$/, "")
      return cleaned === "/" ? "" : cleaned
    })()
    const logoSrc = `${basePath}/static/logo.png`.replace(/\/{2,}/g, "/")

    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="footer-section footer-links">
          <h3>{translations.quickLinks}</h3>
          <ul>
            {Object.entries(soleLinks).map(([text, link]) => (
              <li>
                <a href={link}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div class="footer-section footer-info">
          <p class="footer-project">
            <a href="http://voltaje.solecolombia.org/">SOLE Voltaje</a> es un proyecto de{" "}
            <a href="https://www.solecolombia.org/" target="_blank" rel="noopener noreferrer">
              SOLE Colombia
            </a>{" "}
            con el apoyo de{" "}
            <a href="https://www.isocfoundation.org/" target="_blank" rel="noopener noreferrer">
              Internet Society Foundation
            </a>
          </p>
          
          <p class="footer-license">
            <a href="http://voltaje.solecolombia.org/">SOLE Voltaje</a> {year} by{" "}
            <a href="http://www.solecolombia.org/" target="_blank" rel="noopener noreferrer">
              Fundación SOLE Colombia
            </a>{" "}
            is licensed by{" "}
            <a 
              href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Creative Commons Attribution-ShareAlike 4.0 International
            </a>
          </p>
          
          <p class="footer-tech">
            {translations.createdWith}{" "}
            <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noopener noreferrer">
              Quartz v{version}
            </a>
          </p>
        </div>
        
        <div class="footer-section footer-custom">
          {Object.entries(links).length > 0 && (
            <ul>
              <li>
                <a href="/es">Página Principal</a>
              </li>
              {Object.entries(links).map(([text, link]) => (
                <li>
                  <a href={link} target="_blank" rel="noopener noreferrer">{text}</a>
                </li>
              ))}
            </ul>
          )}
          <div class="footer-branding">
            <img src={logoSrc} alt="SOLE Voltaje" class="footer-logo" />
          </div>
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
