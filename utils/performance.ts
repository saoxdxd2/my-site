/**
 * Performance optimization utilities
 */

/**
 * Lazy load images with intersection observer
 */
export const useLazyImages = () => {
  const observer = ref<IntersectionObserver | null>(null)

  const initLazyLoading = () => {
    if (process.client) {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            if (src) {
              img.src = src
              img.classList.remove('lazy')
              observer.value?.unobserve(img)
            }
          }
        })
      })

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach((img) => {
        observer.value?.observe(img)
      })
    }
  }

  onMounted(() => {
    initLazyLoading()
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    initLazyLoading
  }
}

/**
 * Preload critical resources
 */
export const preloadCriticalResources = (resources: string[]) => {
  if (process.client) {
    resources.forEach((resource) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      
      if (resource.endsWith('.css')) {
        link.as = 'style'
      } else if (resource.endsWith('.js')) {
        link.as = 'script'
      } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
        link.as = 'image'
      }
      
      document.head.appendChild(link)
    })
  }
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
