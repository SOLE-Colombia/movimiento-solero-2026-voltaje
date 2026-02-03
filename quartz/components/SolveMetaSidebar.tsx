import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Date as DateComponent, getDate } from "./Date"
import style from "./styles/solveMetaSidebar.scss"
// @ts-ignore
import script from "./scripts/solveMetaSidebar.inline"

// Mapeo de valores cualitativos a numéricos (igual que SolveFilterGrid)
const difficultyMap: Record<string, number> = {
  "Fácil": 1,
  "Medio": 2,
  "Difícil": 3,
  "Complejo": 4,
}

const costMap: Record<string, number> = {
  "Gratis": 0,
  "< USD 25": 1,
  "USD 25 - 50": 2,
  "> USD 50": 3,
  "Gasto mensual": 4,
  "Mensual": 4,
}

const timeMap: Record<string, number> = {
  "Minutos": 1,
  "Horas": 2,
  "Días": 3,
}

const helpersMap: Record<string, number> = {
  "Sin ayudantes": 1,
  "1 persona": 2,
  "2-3 personas": 3,
  "Más de 3 personas": 4,
}

// Texto para mostrar en permite
const permiteLabels: Record<string, string> = {
  "Conseguir": "Conseguir",
  "Mejorar": "Mejorar",
  "Compartir": "Compartir",
  "Medir": "Medir",
}

// Colores de semáforo por tipo y nivel
// Opción 1 general: B6FAA4 (verde claro)
// Opciones 2 y 3 cuando hay 4: FFCEA0 (naranja claro)
// Opción 2 cuando hay 3: FFCEA0
// Opción 3 cuando hay 3: FFB6B6 (rojo claro)
// Opción 4 dificultad: FFB6B6
// Opción 4 costo (mensualidad): A6EFFF (azul claro)

interface ColorMapping {
  [key: number]: string
}

const difficultyColors: ColorMapping = {
  1: "#B6FAA4", // Fácil - verde
  2: "#FFCEA0", // Medio - naranja
  3: "#FFCEA0", // Difícil - naranja
  4: "#FFB6B6", // Complejo - rojo
}

const costColors: ColorMapping = {
  1: "#B6FAA4", // Gratis - verde
  2: "#FFCEA0", // < USD 25 - naranja
  3: "#FFCEA0", // USD 25-50 - naranja
  4: "#FFB6B6", // > USD 50 - rojo
  5: "#A6EFFF", // Mensual - azul
}

const timeColors: ColorMapping = {
  1: "#B6FAA4", // Minutos - verde
  2: "#FFCEA0", // Horas - naranja
  3: "#FFB6B6", // Días - rojo
}

const helpersColors: ColorMapping = {
  1: "#B6FAA4", // Sin ayudantes - verde
  2: "#FFCEA0", // 1 persona - naranja
  3: "#FFCEA0", // 2-3 personas - naranja
  4: "#FFB6B6", // Más de 3 - rojo
}

// Colores variados para "Permite"
const permiteColors: Record<string, string> = {
  "Conseguir": "#A6EFFF", // azul
  "Mejorar": "#B6FAA4",   // verde
  "Compartir": "#FFCEA0", // naranja
  "Medir": "#A6EFFF",     // azul
}

const clampCount = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export default (() => {
  const SolveMetaSidebar: QuartzComponent = (props: QuartzComponentProps) => {
    const { cfg, fileData, displayClass } = props
    const fm = fileData.frontmatter
    
    // Solo mostrar en páginas de soluciones individuales (no en index)
    const slug = fileData.slug ?? ""
    const isSolvePage = (slug.startsWith("es/solve/") || slug.startsWith("solve/")) && 
                        !slug.endsWith("/solve") && 
                        !slug.endsWith("/solve/index") &&
                        fm?.type !== "section-index"
    
    if (!isSolvePage) return null

    // Extraer datos del frontmatter
    const tags = (fm?.tags as string[] | undefined) ?? []
    const dificultad = fm?.dificultad as string | undefined
    const costo = fm?.costo as string | undefined
    const tarda = fm?.tarda as string | undefined
    const ayudantes = fm?.ayudantes as string | undefined
    const permite = fm?.permite as string | string[] | undefined
    const autor = fm?.autor as string | undefined
    const date = getDate(cfg, fileData)

    // Calcular niveles numéricos para iconos
    const diffNum = dificultad ? (difficultyMap[dificultad] ?? 2) : null
    const costNum = costo ? (costMap[costo] ?? 1) : null
    const timeNum = tarda ? (timeMap[tarda] ?? 2) : null
    const helpersNum = ayudantes ? (helpersMap[ayudantes] ?? 1) : null

    // Niveles para iconos (clamped)
    const diffLevel = diffNum ? clampCount(diffNum, 1, 4) : null
    const costLevel = costNum !== null ? clampCount(costNum + 1, 1, 5) : null
    const timeLevel = timeNum ? clampCount(timeNum, 1, 3) : null
    const helpersLevel = helpersNum ? clampCount(helpersNum, 1, 4) : null

    // Procesar permite (puede ser string o array)
    const permiteArray: string[] = permite 
      ? (Array.isArray(permite) ? permite : [permite])
      : []

    const hasMetadata = dificultad || costo || tarda || ayudantes || permiteArray.length > 0

    if (!hasMetadata && !autor && !date && tags.length === 0) return null

    return (
      <div class={`solve-meta-sidebar ${displayClass ?? ""}`}>
        <h3 class="solve-meta-title">Sobre este artículo</h3>
        
        {/* Categorías (tags) */}
        {tags.length > 0 && (
          <div class="solve-meta-section">
            <span class="solve-meta-label">Categorías:</span>
            <div class="solve-meta-tags">
              {tags.map((tag) => (
                <span class="solve-meta-tag">#{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Grid de métricas con iconos */}
        {hasMetadata && (
          <div class="solve-meta-metrics">
            {/* Dificultad */}
            {dificultad && diffLevel && (
              <div class="solve-meta-row">
                <span class="solve-meta-label">Dificultad:</span>
                <span 
                  class="solve-meta-badge"
                  style={`background-color: ${difficultyColors[diffLevel]}`}
                >
                  <img 
                    class="solve-meta-icon" 
                    data-icon={`solve-difficulty-${diffLevel}.svg`} 
                    alt="" 
                    aria-hidden="true" 
                  />
                  <span class="solve-meta-value">{dificultad}</span>
                </span>
              </div>
            )}

            {/* Costo */}
            {costo && costLevel && (
              <div class="solve-meta-row">
                <span class="solve-meta-label">Costo:</span>
                <span 
                  class="solve-meta-badge"
                  style={`background-color: ${costColors[costLevel]}`}
                >
                  <img 
                    class="solve-meta-icon" 
                    data-icon={`solve-cost-${costLevel}.svg`} 
                    alt="" 
                    aria-hidden="true" 
                  />
                  <span class="solve-meta-value">{costo}</span>
                </span>
              </div>
            )}

            {/* Tarda */}
            {tarda && timeLevel && (
              <div class="solve-meta-row">
                <span class="solve-meta-label">Tarda:</span>
                <span 
                  class="solve-meta-badge"
                  style={`background-color: ${timeColors[timeLevel]}`}
                >
                  <img 
                    class="solve-meta-icon" 
                    data-icon={`solve-time-${timeLevel}.svg`} 
                    alt="" 
                    aria-hidden="true" 
                  />
                  <span class="solve-meta-value">{tarda}</span>
                </span>
              </div>
            )}

            {/* Ayudantes */}
            {ayudantes && helpersLevel && (
              <div class="solve-meta-row">
                <span class="solve-meta-label">Ayudantes:</span>
                <span 
                  class="solve-meta-badge"
                  style={`background-color: ${helpersColors[helpersLevel]}`}
                >
                  <img 
                    class="solve-meta-icon" 
                    data-icon={`solve-helpers-${helpersLevel}.svg`} 
                    alt="" 
                    aria-hidden="true" 
                  />
                  <span class="solve-meta-value">{ayudantes}</span>
                </span>
              </div>
            )}

            {/* Permite (multiselección) */}
            {permiteArray.length > 0 && (
              <div class="solve-meta-row solve-meta-permite">
                <span class="solve-meta-label">Permite:</span>
                <div class="solve-meta-permite-badges">
                  {permiteArray.map((p) => (
                    <span 
                      class="solve-meta-badge solve-meta-badge-small"
                      style={`background-color: ${permiteColors[p] || "#A6EFFF"}`}
                    >
                      <span class="solve-meta-value">{permiteLabels[p] || p}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Autor y fecha */}
        <div class="solve-meta-footer">
          {autor && (
            <div class="solve-meta-author">
              <span class="solve-meta-label-bold">Autor:</span> {autor}
            </div>
          )}
          {date && (
            <div class="solve-meta-date">
              <span class="solve-meta-label-bold">Publicado:</span>{" "}
              <DateComponent date={date} locale={cfg.locale} />
            </div>
          )}
        </div>
      </div>
    )
  }

  SolveMetaSidebar.css = style
  SolveMetaSidebar.afterDOMLoaded = script
  return SolveMetaSidebar
}) satisfies QuartzComponentConstructor
