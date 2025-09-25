// Lightweight LCP logger for development to diagnose LCP candidate and timing
// Runs only on client. Minimal overhead and helpful to pinpoint slow LCP.
export default defineNuxtPlugin(() => {
  if (process.server) return
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return

  try {
    let lcpEntry: any = null
    const po = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const last = entries[entries.length - 1]
      if (last) lcpEntry = last as any
    })
    po.observe({ type: 'largest-contentful-paint', buffered: true as any })

    const report = () => {
      if (!lcpEntry) return
      // Attempt to extract some diagnostic info about the element
      const el = (lcpEntry as any).element as Element | undefined
      const elInfo = el ? {
        tag: el.tagName,
        id: (el as HTMLElement).id,
        class: (el as HTMLElement).className,
        text: el.textContent?.trim()?.slice(0, 80)
      } : undefined
      // eslint-disable-next-line no-console
      console.log('[LCP]', {
        time: Math.round(lcpEntry.startTime),
        size: lcpEntry.size,
        url: (lcpEntry as any).url,
        el: elInfo
      })
      // Highlight in dev for quick visual confirmation
      if (import.meta.env.DEV && el) {
        (el as HTMLElement).setAttribute('data-lcp', 'true')
        ;(el as HTMLElement).style.outline = '2px dashed #10b981'
        ;(el as HTMLElement).style.outlineOffset = '2px'
      }
    }

    // Report when page is hidden or on load end
    addEventListener('pagehide', report)
    addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') report()
    })
    addEventListener('load', () => setTimeout(report, 0))
  } catch {
    // no-op
  }
})
