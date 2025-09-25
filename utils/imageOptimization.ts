/**
 * Image optimization utilities
 * Centralized image processing and format detection
 */

export interface ImageOptimizationOptions {
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
  width?: number
  height?: number
  lazy?: boolean
}

// Cache for format support detection
let formatSupport: { webp: boolean; avif: boolean } | null = null

/**
 * Detect browser support for modern image formats
 */
export const detectImageFormatSupport = (): Promise<{ webp: boolean; avif: boolean }> => {
  if (formatSupport) {
    return Promise.resolve(formatSupport)
  }

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      formatSupport = { webp: false, avif: false }
      resolve(formatSupport)
      return
    }

    // Test WebP support
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    
    // Test AVIF support (more complex detection)
    const avifSupported = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0

    formatSupport = { webp: webpSupported, avif: avifSupported }
    resolve(formatSupport)
  })
}

/**
 * Generate optimized image source URLs
 */
export const generateOptimizedSources = (
  src: string, 
  options: ImageOptimizationOptions = {}
): { original: string; webp?: string; avif?: string } => {
  if (!src) return { original: '' }

  const { quality = 80 } = options
  
  // In a real implementation, these would be actual optimized URLs
  // For now, we simulate the URLs that would be generated
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, `.webp?q=${quality}`)
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, `.avif?q=${quality}`)

  return {
    original: src,
    webp: webpSrc,
    avif: avifSrc
  }
}

/**
 * Create responsive image srcset
 */
export const createResponsiveSrcset = (
  src: string,
  widths: number[] = [320, 640, 1024, 1280, 1920]
): string => {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ')
}

/**
 * Calculate optimal image dimensions while maintaining aspect ratio
 */
export const calculateOptimalDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  const aspectRatio = originalWidth / originalHeight
  
  let width = Math.min(originalWidth, maxWidth)
  let height = width / aspectRatio
  
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}
