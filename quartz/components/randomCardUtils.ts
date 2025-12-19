import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { resolveCardImage } from "./cardImage"

export type CardItem = {
  title: string
  summary: string
  author: string
  imageUrl?: string
  href: string
}

export type CardPoolQuery = {
  baseSlug: FullSlug
  allFiles: QuartzPluginData[]
  poolSize: number
  folders?: string[]
}

const normalizeFolder = (folder: string): string => {
  return folder.replace(/^\/+/, "").replace(/\/+$/, "")
}

const defaultAuthor = "Equipo SOLE Voltaje"

const extractAuthor = (page: QuartzPluginData): string => {
  const authorField = page.frontmatter?.author ?? page.frontmatter?.authors
  if (!authorField) return defaultAuthor
  if (Array.isArray(authorField)) {
    return authorField.join(", ")
  }
  return String(authorField)
}

const truncate = (text: string, maxLength: number): string => {
  const clean = text.replace(/\s+/g, " ").trim()
  if (clean.length <= maxLength) return clean
  return clean.substring(0, maxLength).trimEnd() + "…"
}

const buildSummary = (page: QuartzPluginData): string => {
  const fmDescription = page.frontmatter?.description ?? page.frontmatter?.summary
  const base = fmDescription ?? page.description ?? ""
  return truncate(base, 220)
}

export const collectCardPool = ({
  baseSlug,
  allFiles,
  poolSize,
  folders,
}: CardPoolQuery): CardItem[] => {
  const currentFolder = normalizeFolder(baseSlug.replace(/\/index$/, ""))
  const folderPool = (folders?.length ? folders : [currentFolder]).map(normalizeFolder)

  const pool = allFiles.filter((file) => {
    if (!file.slug || file.slug === baseSlug) return false
    if (isFolderPath(file.slug)) return false
    return folderPool.some((folder) => file.slug!.startsWith(`${folder}/`))
  })

  const limitedPool = pool.slice(0, Math.max(poolSize, 1))

  return limitedPool.map((page) => ({
    title: page.frontmatter?.title ?? page.slug!,
    summary: buildSummary(page),
    author: extractAuthor(page),
    imageUrl: resolveCardImage(page, baseSlug),
    href: resolveRelative(baseSlug, page.slug!),
  }))
}

