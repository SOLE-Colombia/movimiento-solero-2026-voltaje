import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    const slug = fileData.slug
    const isSolve = slug?.includes("solve/")
    const isInspire = slug?.includes("inspire/")
    const resumen = (fileData.frontmatter?.resumen ?? fileData.frontmatter?.description) as
      | string
      | undefined
    const summary = typeof resumen === "string" ? resumen.trim() : ""

    return (
      <>
        <h1
          class={classNames(
            displayClass,
            "article-title",
            isSolve ? "section-solve" : "",
            isInspire ? "section-inspire" : "",
          )}
        >
          {title}
        </h1>
        {(isSolve || isInspire) && summary.length > 0 && (
          <p
            class={classNames(
              "article-resumen",
              isSolve ? "section-solve" : "",
              isInspire ? "section-inspire" : "",
            )}
          >
            {summary}
          </p>
        )}
      </>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
  color: #27BFB8;
  font-size: 80px;
  line-height: 0.8;
  font-weight: 400;
}

.article-title.section-solve {
  color: #991D79;
  font-size: 56px;
  line-height: 0.8;
  margin-bottom: 1rem;
}

.article-title.section-inspire {
  color: #27BFB8;
  font-size: 56px;
  line-height: 0.8;
  margin-bottom: 1rem;
}

.article-title.section-conceptorio {
  color: #fc794d;
  font-size: 56px;
  line-height: 0.8;
  margin-bottom: 1rem;
}

.article-resumen {
  margin: -0.5rem 0 1.5rem 0;
  font-family: "Roboto Mono";
  color: black;
  font-size: 20px;
  font-weight: 400;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
