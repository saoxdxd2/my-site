/**
 * API composable for handling HTTP requests with error handling and loading states
 */

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  headers?: Record<string, string>
  timeout?: number
  retries?: number
  showLoading?: boolean
  showError?: boolean
}

export const useApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { handleError } = useErrorHandler()

  const request = async <T = any>(
    url: string,
    options: ApiOptions = {}
  ): Promise<T | null> => {
    const {
      method = 'GET',
      body,
      headers = {},
      timeout = 10000,
      retries = 1,
      showLoading = true,
      showError = true
    } = options

    if (showLoading) loading.value = true
    error.value = null

    let attempt = 0
    while (attempt <= retries) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await $fetch<T>(url, {
          method,
          body: body ? JSON.stringify(body) : undefined,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          signal: controller.signal
        })

        clearTimeout(timeoutId)
        if (showLoading) loading.value = false
        return response as T

      } catch (err: any) {
        attempt++
        
        if (attempt > retries) {
          const errorMessage = err.message || 'An error occurred'
          error.value = errorMessage
          
          if (showError) {
            handleError(err, `API request to ${url}`, {
              showToast: true,
              logToConsole: true
            })
          }
          
          if (showLoading) loading.value = false
          return null
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
      }
    }

    if (showLoading) loading.value = false
    return null
  }

  const get = <T = any>(url: string, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    request<T>(url, { ...options, method: 'GET' })

  const post = <T = any>(url: string, body?: any, options?: Omit<ApiOptions, 'method'>) =>
    request<T>(url, { ...options, method: 'POST', body })

  const put = <T = any>(url: string, body?: any, options?: Omit<ApiOptions, 'method'>) =>
    request<T>(url, { ...options, method: 'PUT', body })

  const del = <T = any>(url: string, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    request<T>(url, { ...options, method: 'DELETE' })

  const patch = <T = any>(url: string, body?: any, options?: Omit<ApiOptions, 'method'>) =>
    request<T>(url, { ...options, method: 'PATCH', body })

  return {
    loading: readonly(loading),
    error: readonly(error),
    request,
    get,
    post,
    put,
    delete: del,
    patch
  }
}
