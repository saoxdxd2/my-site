/**
 * Global error boundary plugin for comprehensive error handling
 */

export default defineNuxtPlugin((nuxtApp) => {
  const { error: logError, warn: logWarn } = useLogger()
  const router = useRouter()

  // Get current route safely
  const getCurrentRoute = () => {
    try {
      return router.currentRoute.value.path
    } catch {
      return 'unknown'
    }
  }

  // Handle Vue errors
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    logError('Vue Error', error as Error, {
      component: instance?.$options.name || 'Unknown',
      info,
      route: getCurrentRoute()
    })

    // Prevent error from breaking the app in production
    if (!process.dev) {
      console.error('Vue Error caught by error boundary:', error)
    }
  }

  // Handle unhandled promise rejections
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      logError('Unhandled Promise Rejection', event.reason, {
        promise: event.promise,
        route: getCurrentRoute()
      })

      // Prevent default browser behavior in production
      if (!process.dev) {
        event.preventDefault()
      }
    })

    // Handle global JavaScript errors
    window.addEventListener('error', (event) => {
      logError('Global JavaScript Error', event.error, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        route: getCurrentRoute()
      })
    })

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        const target = event.target as HTMLElement
        logWarn('Resource Loading Error', undefined, {
          tagName: target.tagName,
          src: (target as any).src || (target as any).href,
          route: getCurrentRoute()
        })
      }
    }, true)
  }

  // Provide global error reporting function
  return {
    provide: {
      reportError: (error: Error, context?: Record<string, any>) => {
        logError('Manual Error Report', error, {
          ...context,
          route: getCurrentRoute()
        })
      }
    }
  }
})
