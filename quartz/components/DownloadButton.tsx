// @ts-ignore
import downloadScript from "./scripts/download.inline"
import styles from "./styles/download.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const fallbackLabels = {
  title: "Descargar página",
  ariaLabel: "Descargar esta página como PDF",
}

const DownloadButton: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  const translations = i18n(cfg.locale).components.download ?? fallbackLabels

  return (
    <button
      class={classNames(displayClass, "download-button")}
      aria-label={translations.ariaLabel}
      title={translations.title}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <title>{translations.title}</title>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </button>
  )
}

DownloadButton.afterDOMLoaded = downloadScript
DownloadButton.css = styles

export default (() => DownloadButton) satisfies QuartzComponentConstructor

