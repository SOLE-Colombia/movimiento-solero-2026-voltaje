import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    const slug = fileData.slug
    const isSolve = slug?.includes("solve/")
    const isInspire = slug?.includes("inspire/")

    return (
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
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
