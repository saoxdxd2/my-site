// Service Worker for performance optimization (safe caching)
const CACHE_NAME = 'freelance-template-v2'
const STATIC_CACHE = [
  '/favicon.ico',
  // Add other static assets as needed
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - cache static assets only; avoid caching HTML/navigation requests
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const req = event.request
  const url = new URL(req.url)
  const destination = req.destination
  const isNavigation = req.mode === 'navigate'
  const isStaticPath = url.pathname.startsWith('/_nuxt/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname === '/favicon.ico'
  const isStaticDest = ['script', 'style', 'image', 'font'].includes(destination)
  const isAsset = isStaticPath || isStaticDest

  if (isNavigation) {
    // Network-first for HTML/navigation to respect server caching and freshness
    event.respondWith(fetch(req).catch(() => caches.match('/'))) // optional offline fallback
    return
  }

  if (!isAsset) {
    // For non-asset GET requests (e.g., API), just passthrough
    return
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req)
      if (cached) return cached
      const resp = await fetch(req)
      if (resp && resp.status === 200 && (resp.type === 'basic' || resp.type === 'opaque')) {
        cache.put(req, resp.clone())
      }
      return resp
    })
  )
})
