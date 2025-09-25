/**
 * Critical CSS and resource preloading plugin
 */

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Preload critical resources
    const preloadResources = [
      { href: '/favicon.ico', as: 'image' },
      // Add other critical resources
    ]

    preloadResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.href
      link.as = resource.as
      document.head.appendChild(link)
    })

    // Lazy load non-critical CSS
    const loadNonCriticalCSS = () => {
      const nonCriticalCSS = document.querySelectorAll('link[data-lazy-css]')
      nonCriticalCSS.forEach(link => {
        if (link instanceof HTMLLinkElement) {
          link.rel = 'stylesheet'
          link.removeAttribute('data-lazy-css')
        }
      })
    }

    // Load non-critical CSS after page load
    window.addEventListener('load', loadNonCriticalCSS)
  }
})
