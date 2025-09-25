/**
 * Global error handling composable
 */

export interface ErrorOptions {
  showToast?: boolean
  logToConsole?: boolean
  reportToService?: boolean
}

export const useErrorHandler = () => {
  const handleError = (
    error: Error | string,
    context?: string,
    options: ErrorOptions = {}
  ) => {
    const {
      showToast = true,
      logToConsole = true,
      reportToService = false
    } = options

    const errorMessage = typeof error === 'string' ? error : error.message
    const fullContext = context ? `${context}: ${errorMessage}` : errorMessage

    // Log to console in development
    if (logToConsole && process.dev) {
      console.error(fullContext, error)
    }

    // Show user-friendly toast notification
    if (showToast && process.client) {
      // Use toast notification library if available
      try {
        const nuxtApp = useNuxtApp()
        if (nuxtApp.$toast && typeof (nuxtApp.$toast as any).error === 'function') {
          (nuxtApp.$toast as any).error(errorMessage)
        } else {
          // Fallback to alert
          alert(`Error: ${errorMessage}`)
        }
      } catch {
        // Fallback to alert if toast is not available
        alert(`Error: ${errorMessage}`)
      }
    }

    // Report to error tracking service in production
    if (reportToService && process.env.NODE_ENV === 'production') {
      // Integrate with services like Sentry, LogRocket, etc.
      console.warn('Error reporting service not configured')
    }
  }

  const handleAsyncError = async <T>(
    asyncFn: () => Promise<T>,
    context?: string,
    options?: ErrorOptions
  ): Promise<T | null> => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error as Error, context, options)
      return null
    }
  }

  const createErrorBoundary = (fallback: () => void) => {
    return (error: Error, context?: string) => {
      handleError(error, context)
      fallback()
    }
  }

  return {
    handleError,
    handleAsyncError,
    createErrorBoundary
  }
}
