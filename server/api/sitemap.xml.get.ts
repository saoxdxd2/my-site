/**
 * Dynamic sitemap generation for static template
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://example.com'
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.8', changefreq: 'monthly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' }
  ]
  
  // Get blog posts from content
  let blogPosts: any[] = []
  try {
    const { data } = await $fetch('/api/_content/query', {
      params: {
        where: { _path: { $regex: '^/blog' }, _draft: false },
        sort: { date: -1 }
      }
    })
    blogPosts = data || []
  } catch (error) {
    console.warn('Could not fetch blog posts for sitemap:', error)
  }
  
  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}${post._path}</loc>
    <lastmod>${post.updatedAt || post.createdAt || new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

  // Set proper headers
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600') // Cache for 1 hour
  
  return sitemap
})
