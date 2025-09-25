/*
  Micro-optimizations composable
  - Defers non-critical animations
  - Lazily optimizes images
  - Applies content-visibility for offscreen sections
  - Provides prefetch for next likely routes

  This centralizes logic so plugins and components can reuse it.
*/

// requestIdleCallback wrapper with SSR-safe fallback
function ric(cb: IdleRequestCallback, opts?: IdleRequestOptions) {
  const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined
  if (g && typeof g.requestIdleCallback === 'function') {
    return g.requestIdleCallback(cb, opts)
  }
  // Fallback to setTimeout in any environment
  return (g?.setTimeout ?? setTimeout)(
    () => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline),
    1
  )
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useMicroOptimizations() {
  let cleanedUp = false

  const deferAnimations = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    ric(() => {
      if (prefersReducedMotion()) return
      const animated = document.querySelectorAll<HTMLElement>('.animate-float, .animate-slide-up')
      animated.forEach(el => el.classList.add('loaded'))
      // Also apply 'loaded' to elements with heavy visual effects to defer expensive styles (e.g., blur)
      const glass = document.querySelectorAll<HTMLElement>('.glass-effect')
      glass.forEach(el => el.classList.add('loaded'))
    }, { timeout: 2000 })
  }

  const optimizeImages = () => {
    if (typeof document === 'undefined') return
    const images = document.querySelectorAll<HTMLImageElement>('img')
    images.forEach(img => {
      if (!img.hasAttribute('loading') && img.dataset.priority !== 'true') {
        img.setAttribute('loading', 'lazy')
      }
      img.setAttribute('decoding', 'async')
    })
  }

  const applyContentVisibility = () => {
    if (typeof document === 'undefined') return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section'))
    // Skip the very first section (usually the hero) to avoid any chance of CLS there
    sections.slice(1).forEach(sec => sec.classList.add('content-visibility-auto'))
  }

  const preloadNextRoutes = (paths: string[] = ['/services', '/contact', '/portfolio']) => {
    if (typeof document === 'undefined') return
    paths.forEach(path => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = path
      document.head.appendChild(link)
    })
  }

  const init = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    if (cleanedUp) return
    deferAnimations()
    optimizeImages()
    applyContentVisibility()
    // Note: route prefetching is scheduled in plugins/performance.client.ts
  }

  const cleanup = () => {
    cleanedUp = true
  }

  return { init, cleanup, preloadNextRoutes }
}
