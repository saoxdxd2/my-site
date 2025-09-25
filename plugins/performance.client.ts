/**
 * Client-side performance optimizations for faster FCP and reduced layout shift
 * Centralized via composable to keep code DRY and manageable.
 */
import { useMicroOptimizations } from '~/composables/useMicroOptimizations'

export default defineNuxtPlugin(() => {
  const { init, preloadNextRoutes } = useMicroOptimizations()

  // Optimize scroll performance with throttling (for sections visibility only)
  let ticking = false
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Toggle content-visibility for offscreen sections
        const sections = document.querySelectorAll('section')
        sections.forEach(section => {
          const rect = section.getBoundingClientRect()
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
            section.classList.add('content-visibility-auto')
          } else {
            section.classList.remove('content-visibility-auto')
          }
        })
        ticking = false
      })
      ticking = true
    }
  }

  // Initialize optimizations after DOM is ready
  const initOptimizations = () => {
    init()
    
    // Add passive event listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
  }

  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptimizations)
  } else {
    initOptimizations()
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })

  // Preload critical resources for next navigation after full load to avoid contention with LCP
  window.addEventListener('load', () => {
    const conn = (navigator as any)?.connection
    const saveData = !!conn?.saveData
    const effectiveType = (conn?.effectiveType || '').toString()
    const downlink = typeof conn?.downlink === 'number' ? conn.downlink : undefined
    const deviceMemory = (navigator as any)?.deviceMemory as number | undefined
    const isConstrained =
      saveData ||
      effectiveType.includes('2g') ||
      (downlink !== undefined && downlink < 1.5) ||
      (typeof deviceMemory === 'number' && deviceMemory <= 1)

    // Avoid prefetching on constrained devices/networks
    if (isConstrained || document.visibilityState === 'hidden') return

    setTimeout(() => preloadNextRoutes(['/services', '/contact', '/portfolio']), 5000)
  })
})
