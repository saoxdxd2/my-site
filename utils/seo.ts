/**
 * SEO optimization utilities
 */

export interface SEOData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Generate structured data for SEO
 */
export const generateStructuredData = (data: SEOData) => {
  const config = useRuntimeConfig()
  
  return {
    '@context': 'https://schema.org',
    '@type': data.type || 'WebPage',
    name: data.title,
    description: data.description,
    url: data.url || config.public.siteUrl,
    image: data.image,
    author: data.author ? {
      '@type': 'Person',
      name: data.author
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: config.public.siteName,
      url: config.public.siteUrl
    },
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime || data.publishedTime
  }
}

/**
 * Generate meta tags for SEO
 */
export const generateMetaTags = (data: SEOData) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl
  
  return [
    // Basic meta tags
    { name: 'description', content: data.description },
    { name: 'keywords', content: data.keywords || '' },
    { name: 'author', content: data.author || config.public.siteName },
    
    // Open Graph tags
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:type', content: data.type || 'website' },
    { property: 'og:url', content: data.url || baseUrl },
    { property: 'og:image', content: data.image || `${baseUrl}/og-image.jpg` },
    { property: 'og:site_name', content: config.public.siteName },
    
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:description', content: data.description },
    { name: 'twitter:image', content: data.image || `${baseUrl}/og-image.jpg` },
    
    // Additional SEO tags
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }
  ].filter(tag => tag.content) // Remove empty content tags
}

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbData = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/**
 * SEO composable for pages
 */
export const useSEO = (data: SEOData) => {
  const route = useRoute()
  const config = useRuntimeConfig()
  
  // Generate full URL
  const fullUrl = generateCanonicalUrl(route.path)
  
  // Enhanced SEO data
  const enhancedData = {
    ...data,
    url: data.url || fullUrl
  }
  
  // Set page meta
  useHead({
    title: data.title,
    meta: generateMetaTags(enhancedData),
    link: [
      { rel: 'canonical', href: fullUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(generateStructuredData(enhancedData))
      }
    ]
  })
  
  return {
    structuredData: generateStructuredData(enhancedData),
    metaTags: generateMetaTags(enhancedData),
    canonicalUrl: fullUrl
  }
}
