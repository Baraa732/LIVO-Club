const HEADER_HEIGHT = 80

/**
 * Scrolls to a section by id.
 * Supports optional query param for sub-selection:
 *   href = "#games"           → scroll to #games
 *   href = "#games?game=chess" → scroll to #games then dispatch a custom event
 *                                so the Games component can activate the right tab
 */
export function scrollToSection(href: string): void {
  if (!href.startsWith('#')) return

  const [hash, query] = href.slice(1).split('?')
  const el = document.getElementById(hash)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT
  window.scrollTo({ top, behavior: 'smooth' })

  if (query) {
    const params = new URLSearchParams(query)
    // Dispatch after a short delay so the scroll starts first
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('section:select', { detail: Object.fromEntries(params) }))
    }, 80)
  }
}
