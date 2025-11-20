import sharp from "sharp"
import fs from "fs"
import { joinSegments, QUARTZ, FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"

export const Favicon: QuartzEmitterPlugin = () => ({
  name: "Favicon",
  async *emit({ argv }) {
    const candidates = [
      joinSegments(QUARTZ, "static", "icon.png"),
      joinSegments("static", "icon.png"),
    ]

    const iconPath = candidates.find((candidate) => fs.existsSync(candidate))

    if (!iconPath) {
      throw new Error(
        "Favicon: no se encontró `icon.png`. Colócalo en `quartz/static/` o en la carpeta raíz `static/`.",
      )
    }

    const faviconContent = sharp(iconPath).resize(48, 48).toFormat("png")

    yield write({
      ctx: { argv } as BuildCtx,
      slug: "favicon" as FullSlug,
      ext: ".ico",
      content: faviconContent,
    })
  },
  async *partialEmit() {},
})
