const LANG_STORAGE_KEY = "contentLang"
const SUPPORTED_LANGS = new Set(["es", "en", "pt"])

const LANG_UI: Record<string, { code: string; flag: string }> = {
  es: { code: "ES", flag: "🇪🇸" },
  en: { code: "EN", flag: "🇺🇸" },
  pt: { code: "PT", flag: "🇵🇹" },
}

function getActiveLang(): string {
  const stored = localStorage.getItem(LANG_STORAGE_KEY)
  if (stored && SUPPORTED_LANGS.has(stored)) return stored
  const htmlLang = (document.documentElement.getAttribute("lang") ?? "es").toLowerCase()
  if (htmlLang.startsWith("pt")) return "pt"
  return htmlLang.startsWith("en") ? "en" : "es"
}

function setActiveLang(lang: string) {
  localStorage.setItem(LANG_STORAGE_KEY, lang)
  document.dispatchEvent(new Event("voltaje:lang-change"))
}

function setDropdownState(root: HTMLElement, active: string, available: Set<string>) {
  const summaryFlag = root.querySelector(".lang-summary-flag") as HTMLElement | null
  const summaryCode = root.querySelector(".lang-summary-code") as HTMLElement | null
  const ui = LANG_UI[active] ?? LANG_UI.es
  if (summaryFlag) summaryFlag.textContent = ui.flag
  if (summaryCode) summaryCode.textContent = ui.code

  const options = root.querySelectorAll("button.lang-option") as NodeListOf<HTMLButtonElement>
  for (const opt of options) {
    const lang = (opt.dataset.lang ?? "").toLowerCase()
    const enabled = available.has(lang)
    opt.toggleAttribute("disabled", !enabled)
    opt.classList.toggle("is-active", lang === active)
    opt.setAttribute("aria-current", lang === active ? "true" : "false")
  }
}

async function setupLanguageToggle() {
  const root = document.querySelector("[data-lang-toggle]") as HTMLElement | null
  if (!root) return

  let available = new Set<string>(["es"])
  try {
    // `fetchData` es un Promise global inyectado por Quartz (contentIndex)
    // @ts-ignore
    const data = await fetchData
    const slugs = Object.keys(data ?? {})
    const langs = new Set<string>()
    for (const slug of slugs) {
      const first = slug.split("/")[0]
      if (SUPPORTED_LANGS.has(first)) langs.add(first)
    }
    if (langs.size > 0) available = langs
  } catch {
    // fallback: deja ES disponible
  }

  let active = getActiveLang()
  if (!available.has(active)) {
    active = available.has("es") ? "es" : Array.from(available)[0] ?? "es"
    setActiveLang(active)
  }
  setDropdownState(root, active, available)

  const onClick = (e: Event) => {
    const target = e.target as HTMLElement | null
    const btn = target?.closest("button.lang-option") as HTMLButtonElement | null
    if (!btn || btn.disabled) return
    const lang = (btn.dataset.lang ?? "").toLowerCase()
    if (!SUPPORTED_LANGS.has(lang)) return
    setActiveLang(lang)
    setDropdownState(root, lang, available)
    // cerrar el desplegable
    if (root instanceof HTMLDetailsElement) {
      root.open = false
    } else {
      root.removeAttribute("open")
    }
  }

  root.addEventListener("click", onClick)
  // Quartz define window.addCleanup() en runtime
  // @ts-ignore
  window.addCleanup?.(() => root.removeEventListener("click", onClick))
}

document.addEventListener("nav", () => {
  void setupLanguageToggle()
})


