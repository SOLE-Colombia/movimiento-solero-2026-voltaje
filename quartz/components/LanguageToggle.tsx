import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/languageToggle.scss"
// @ts-ignore
import script from "./scripts/languageToggle.inline"
import { classNames } from "../util/lang"

export default (() => {
  const LanguageToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <details class={classNames(displayClass, "lang-toggle")} data-lang-toggle>
        <summary class="lang-summary" aria-label="Cambiar idioma">
          <span class="lang-summary-flag" aria-hidden="true">
            🇪🇸
          </span>
          <span class="lang-summary-code">ES</span>
        </summary>
        <div class="lang-menu" role="menu" aria-label="Idiomas disponibles">
          <button type="button" class="lang-option" role="menuitem" data-lang="es">
            <span aria-hidden="true">🇪🇸</span> ES
          </button>
          <button type="button" class="lang-option" role="menuitem" data-lang="en">
            <span aria-hidden="true">🇺🇸</span> EN
          </button>
          <button type="button" class="lang-option" role="menuitem" data-lang="pt">
            <span aria-hidden="true">🇵🇹</span> PT
          </button>
        </div>
      </details>
    )
  }

  LanguageToggle.afterDOMLoaded = script
  LanguageToggle.css = style

  return LanguageToggle
}) satisfies QuartzComponentConstructor


