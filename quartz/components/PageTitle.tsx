import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const homeHref = baseDir
  const logoSrc = cfg.baseUrl
    ? `https://${cfg.baseUrl}/static/logo.png`
    : joinSegments(baseDir, "static/logo.png")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={homeHref} aria-label={title}>
        <img src={logoSrc} alt="" class="page-logo" />
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  display: flex;
  align-items: center;
}

.page-title a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.page-logo {
  height: 6rem;
  width: auto;
  object-fit: contain;
  margin: 0;
}

/* Responsive: Logo ajustado por breakpoints */
@media (max-width: 1200px) {
  .page-logo {
    height: 5rem;
  }
}

@media (max-width: 768px) {
  .page-logo {
    height: 4rem;
  }
}

@media (max-width: 480px) {
  .page-logo {
    height: 3rem;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
