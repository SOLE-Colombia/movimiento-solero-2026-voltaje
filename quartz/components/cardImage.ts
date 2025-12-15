import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, isAbsoluteURL, resolveRelative } from "../util/path"

/**
 * Resolución estándar de imagen para tarjetas.
 * Lee (en orden): frontmatter.cardImage -> frontmatter.cover -> frontmatter.image
 *
 * - URLs absolutas se devuelven tal cual
 * - Rutas absolutas (/assets/...) se devuelven tal cual
 * - Rutas relativas se resuelven respecto a la página destino (page.slug) desde currentSlug
 */
export const resolveCardImage = (
  page: QuartzPluginData,
  currentSlug: FullSlug,
): string | undefined => {
  const raw = page.frontmatter?.cardImage ?? page.frontmatter?.cover ?? page.frontmatter?.image
  if (typeof raw !== "string") return undefined
  if (raw.trim().length === 0) return undefined
  if (!page.slug) return undefined

  const clean = raw.trim()
  if (clean.startsWith("/")) return clean
  if (isAbsoluteURL(clean)) return clean

  return resolveRelative(currentSlug, `${page.slug}/${clean}` as FullSlug)
}


