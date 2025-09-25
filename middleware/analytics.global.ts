/**
 * Global analytics middleware for tracking page views
 */

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side
  if (process.client) {
    const config = useRuntimeConfig()
    const gaId = config.public.googleAnalytics

    // Google Analytics 4 tracking
    if (gaId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: to.path
      })
    }

    // Custom analytics tracking
    const trackPageView = () => {
      // Add custom tracking logic here
      console.log(`Page view: ${to.path}`)
    }

    // Track page view with a small delay to ensure page is loaded
    setTimeout(trackPageView, 100)
  }
})
