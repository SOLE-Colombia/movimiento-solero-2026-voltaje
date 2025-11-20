import { render } from "preact-render-to-string"
import { QuartzComponent, QuartzComponentProps } from "./types"
import HeaderConstructor from "./Header"
import BodyConstructor from "./Body"
import { JSResourceToScriptElement, StaticResources } from "../util/resources"
import { FullSlug, RelativeURL, joinSegments, normalizeHastElement } from "../util/path"
import { clone } from "../util/clone"
import { visit } from "unist-util-visit"
import { Root, Element, ElementContent } from "hast"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { styleText } from "util"
import { collectCardPool } from "./randomCardUtils"

interface RenderComponents {
  head: QuartzComponent
  header: QuartzComponent[]
  beforeBody: QuartzComponent[]
  pageBody: QuartzComponent
  afterBody: QuartzComponent[]
  left: QuartzComponent[]
  right: QuartzComponent[]
  footer: QuartzComponent
}

const headerRegex = new RegExp(/h[1-6]/)
const RANDOM_CARD_REGEX = /\{\{random-cards(?<params>[^}]*)\}\}/i
const ARGUMENT_REGEX = /(\w+)=("([^"]*)"|'([^']*)'|[^\s]+)/g

type RandomCardCommand = {
  count: number
  folders?: string[]
  title?: string
  showSummary?: boolean
  randomize: boolean
}

const parseCommand = (raw: string): RandomCardCommand => {
  const args: Record<string, string> = {}
  let match
  while ((match = ARGUMENT_REGEX.exec(raw)) !== null) {
    const [, key, value, doubleQuoted, singleQuoted] = match
    args[key.toLowerCase()] = doubleQuoted ?? singleQuoted ?? value ?? ""
  }

  const count = Number(args.count) > 0 ? Number(args.count) : 3
  const folders = args.folders
    ? args.folders.split(",").map((folder) => folder.trim()).filter(Boolean)
    : undefined
  const showSummary =
    args.summary !== undefined ? args.summary === "true" || args.summary === "1" : false
  const randomize =
    args.random !== undefined ? args.random === "true" || args.random === "1" : true
  const title = args.title

  return { count, folders, title, showSummary, randomize }
}

const textNode = (value: string): ElementContent => ({ type: "text", value })

const buildCardSection = (
  cards: ReturnType<typeof collectCardPool>,
  count: number,
  title: string,
  showSummary: boolean,
  randomize: boolean,
): Element => ({
  type: "element",
  tagName: "section",
  properties: { "aria-label": "Notas destacadas" },
  children: [
    {
      type: "element",
      tagName: "div",
      properties: { class: "random-card-section" },
      children: [
        {
          type: "element",
          tagName: "div",
          properties: { class: "random-card-header" },
          children: [
            {
              type: "element",
              tagName: "h2",
              properties: {},
              children: [textNode(title)],
            },
          ],
        },
        {
          type: "element",
          tagName: "div",
          properties: {
            class: "random-card-grid",
            "data-count": count,
            "data-random": randomize ? "true" : "false",
          },
          children: cards.map((card, idx) => {
            const isVisible = randomize ? idx < count : true
            const children: ElementContent[] = []

            if (card.imageUrl) {
              children.push({
                type: "element",
                tagName: "div",
                properties: { class: "random-card-image" },
                children: [
                  {
                    type: "element",
                    tagName: "img",
                    properties: {
                      src: card.imageUrl,
                      alt: `Imagen de ${card.title}`,
                      loading: "lazy",
                    },
                    children: [],
                  },
                ],
              })
            }

            const bodyChildren: ElementContent[] = [
              {
                type: "element",
                tagName: "h3",
                properties: {},
                children: [textNode(card.title)],
              },
            ]
            if (showSummary && card.summary) {
              bodyChildren.push({
                type: "element",
                tagName: "p",
                properties: { class: "random-card-summary" },
                children: [textNode(card.summary)],
              })
            }
            bodyChildren.push({
              type: "element",
              tagName: "p",
              properties: { class: "random-card-meta" },
              children: [textNode(`Por ${card.author}`)],
            })

            children.push({
              type: "element",
              tagName: "div",
              properties: { class: "random-card-body" },
              children: bodyChildren,
            })

            return {
              type: "element",
              tagName: "a",
              properties: {
                href: card.href,
                class: `random-card ${isVisible ? "is-visible" : ""}`,
                "data-card": "true",
              },
              children,
            } as Element
          }),
        },
      ],
    },
  ],
})

function renderRandomCardCommands(root: Root, componentData: QuartzComponentProps) {
  visit(root, "element", (node, index, parent) => {
    if (
      !parent ||
      node.tagName !== "p" ||
      node.children.length !== 1 ||
      node.children[0].type !== "text"
    ) {
      return
    }

    const match = node.children[0].value.trim().match(RANDOM_CARD_REGEX)
    if (!match) return

    const command = parseCommand(match.groups?.params ?? "")
    const pool = collectCardPool({
      baseSlug: componentData.fileData.slug as FullSlug,
      allFiles: componentData.allFiles,
      poolSize: Math.max(command.count * 6, 24),
      folders: command.folders,
    })

    if (pool.length === 0) {
      parent.children.splice(index!, 1)
      return
    }

    const cards = command.randomize ? pool : pool.slice(0, command.count)

    const section = buildCardSection(
      cards,
      command.count,
      command.title ?? "Explora también estas notas",
      command.showSummary ?? false,
      command.randomize,
    )
    parent.children[index!] = section
  })
}
export function pageResources(
  baseDir: FullSlug | RelativeURL,
  staticResources: StaticResources,
): StaticResources {
  const contentIndexPath = joinSegments(baseDir, "static/contentIndex.json")
  const contentIndexScript = `const fetchData = fetch("${contentIndexPath}").then(data => data.json())`

  const resources: StaticResources = {
    css: [
      {
        content: joinSegments(baseDir, "index.css"),
      },
      ...staticResources.css,
    ],
    js: [
      {
        src: joinSegments(baseDir, "prescript.js"),
        loadTime: "beforeDOMReady",
        contentType: "external",
      },
      {
        loadTime: "beforeDOMReady",
        contentType: "inline",
        spaPreserve: true,
        script: contentIndexScript,
      },
      ...staticResources.js,
    ],
    additionalHead: staticResources.additionalHead,
  }

  resources.js.push({
    src: joinSegments(baseDir, "postscript.js"),
    loadTime: "afterDOMReady",
    moduleType: "module",
    contentType: "external",
  })

  return resources
}

function renderTranscludes(
  root: Root,
  cfg: GlobalConfiguration,
  slug: FullSlug,
  componentData: QuartzComponentProps,
  visited: Set<FullSlug>,
) {
  // process transcludes in componentData
  visit(root, "element", (node, _index, _parent) => {
    if (node.tagName === "blockquote") {
      const classNames = (node.properties?.className ?? []) as string[]
      if (classNames.includes("transclude")) {
        const inner = node.children[0] as Element
        const transcludeTarget = (inner.properties["data-slug"] ?? slug) as FullSlug
        if (visited.has(transcludeTarget)) {
          console.warn(
            styleText(
              "yellow",
              `Warning: Skipping circular transclusion: ${slug} -> ${transcludeTarget}`,
            ),
          )
          node.children = [
            {
              type: "element",
              tagName: "p",
              properties: { style: "color: var(--secondary);" },
              children: [
                {
                  type: "text",
                  value: `Circular transclusion detected: ${transcludeTarget}`,
                },
              ],
            },
          ]
          return
        }
        visited.add(transcludeTarget)

        const page = componentData.allFiles.find((f) => f.slug === transcludeTarget)
        if (!page) {
          return
        }

        let blockRef = node.properties.dataBlock as string | undefined
        if (blockRef?.startsWith("#^")) {
          // block transclude
          blockRef = blockRef.slice("#^".length)
          let blockNode = page.blocks?.[blockRef]
          if (blockNode) {
            if (blockNode.tagName === "li") {
              blockNode = {
                type: "element",
                tagName: "ul",
                properties: {},
                children: [blockNode],
              }
            }

            node.children = [
              normalizeHastElement(blockNode, slug, transcludeTarget),
              {
                type: "element",
                tagName: "a",
                properties: { href: inner.properties?.href, class: ["internal", "transclude-src"] },
                children: [
                  { type: "text", value: i18n(cfg.locale).components.transcludes.linkToOriginal },
                ],
              },
            ]
          }
        } else if (blockRef?.startsWith("#") && page.htmlAst) {
          // header transclude
          blockRef = blockRef.slice(1)
          let startIdx = undefined
          let startDepth = undefined
          let endIdx = undefined
          for (const [i, el] of page.htmlAst.children.entries()) {
            // skip non-headers
            if (!(el.type === "element" && el.tagName.match(headerRegex))) continue
            const depth = Number(el.tagName.substring(1))

            // lookin for our blockref
            if (startIdx === undefined || startDepth === undefined) {
              // skip until we find the blockref that matches
              if (el.properties?.id === blockRef) {
                startIdx = i
                startDepth = depth
              }
            } else if (depth <= startDepth) {
              // looking for new header that is same level or higher
              endIdx = i
              break
            }
          }

          if (startIdx === undefined) {
            return
          }

          node.children = [
            ...(page.htmlAst.children.slice(startIdx, endIdx) as ElementContent[]).map((child) =>
              normalizeHastElement(child as Element, slug, transcludeTarget),
            ),
            {
              type: "element",
              tagName: "a",
              properties: { href: inner.properties?.href, class: ["internal", "transclude-src"] },
              children: [
                { type: "text", value: i18n(cfg.locale).components.transcludes.linkToOriginal },
              ],
            },
          ]
        } else if (page.htmlAst) {
          // page transclude
          node.children = [
            {
              type: "element",
              tagName: "h1",
              properties: {},
              children: [
                {
                  type: "text",
                  value:
                    page.frontmatter?.title ??
                    i18n(cfg.locale).components.transcludes.transcludeOf({
                      targetSlug: page.slug!,
                    }),
                },
              ],
            },
            ...(page.htmlAst.children as ElementContent[]).map((child) =>
              normalizeHastElement(child as Element, slug, transcludeTarget),
            ),
            {
              type: "element",
              tagName: "a",
              properties: { href: inner.properties?.href, class: ["internal", "transclude-src"] },
              children: [
                { type: "text", value: i18n(cfg.locale).components.transcludes.linkToOriginal },
              ],
            },
          ]
        }
      }
    }
  })
}

export function renderPage(
  cfg: GlobalConfiguration,
  slug: FullSlug,
  componentData: QuartzComponentProps,
  components: RenderComponents,
  pageResources: StaticResources,
): string {
  // make a deep copy of the tree so we don't remove the transclusion references
  // for the file cached in contentMap in build.ts
  const root = clone(componentData.tree) as Root
  const visited = new Set<FullSlug>([slug])
  renderTranscludes(root, cfg, slug, componentData, visited)
  renderRandomCardCommands(root, componentData)

  // set componentData.tree to the edited html that has transclusions rendered
  componentData.tree = root

  const {
    head: Head,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer: Footer,
  } = components
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  const LeftComponent = (
    <div class="left sidebar">
      {left.map((BodyComponent) => (
        <BodyComponent {...componentData} />
      ))}
    </div>
  )

  const RightComponent = (
    <div class="right sidebar">
      {right.map((BodyComponent) => (
        <BodyComponent {...componentData} />
      ))}
    </div>
  )

  const lang = componentData.fileData.frontmatter?.lang ?? cfg.locale?.split("-")[0] ?? "en"
  const direction = i18n(cfg.locale).direction ?? "ltr"
  const doc = (
    <html lang={lang} dir={direction}>
      <Head {...componentData} />
      <body data-slug={slug}>
        <div id="quartz-root" class="page">
          <Body {...componentData}>
            {LeftComponent}
            <div class="center">
              <div class="page-header">
                <Header {...componentData}>
                  {header.map((HeaderComponent) => (
                    <HeaderComponent {...componentData} />
                  ))}
                </Header>
                <div class="popover-hint">
                  {beforeBody.map((BodyComponent) => (
                    <BodyComponent {...componentData} />
                  ))}
                </div>
              </div>
              <Content {...componentData} />
              <hr />
              <div class="page-footer">
                {afterBody.map((BodyComponent) => (
                  <BodyComponent {...componentData} />
                ))}
              </div>
            </div>
            {RightComponent}
            <Footer {...componentData} />
          </Body>
        </div>
      </body>
      {pageResources.js
        .filter((resource) => resource.loadTime === "afterDOMReady")
        .map((res) => JSResourceToScriptElement(res))}
    </html>
  )

  return "<!DOCTYPE html>\n" + render(doc)
}
