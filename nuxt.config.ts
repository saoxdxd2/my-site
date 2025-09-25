// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'node:fs'
import crypto from 'node:crypto'

// Pre-compute critical CSS and its SHA-256 for CSP (prod only)
const isProd = process.env.NODE_ENV === 'production'
let criticalCss = ''
let criticalStyleTag: { children: string }[] = []
let criticalHash: string | null = null
try {
  criticalCss = fs.readFileSync('assets/css/critical.css', 'utf8')
  criticalStyleTag = [{ children: criticalCss }]
  criticalHash = crypto.createHash('sha256').update(criticalCss).digest('base64')
} catch {
  criticalStyleTag = []
}
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Essential modules only to avoid conflicts
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    // Enable content module for blog pages (queryContent/ContentRenderer)
    '@nuxt/content'
  ],
  
  // SEO Configuration moved to runtimeConfig

  // Runtime configuration for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://example.com',
      siteName: process.env.SITE_NAME || 'Professional Business Template',
      contactEmail: process.env.CONTACT_EMAIL || 'contact@example.com',
      googleAnalytics: process.env.GOOGLE_ANALYTICS_ID || ''
    }
  },

  // Google Fonts optimization - Single font family for better performance
  googleFonts: {
    families: {
      // Trim variants to minimize font payload. Headings use 700, body 400.
      Inter: [400, 700]
    },
    display: 'swap',
    preload: true,
    prefetch: false, // Reduce prefetch to prioritize critical resources
    download: true,
    inject: true,
    stylePath: 'css/fonts.css' // Separate font CSS for better caching
  },

  // Content and image modules removed to avoid conflicts

  // CSS configuration: main bundle only. Critical CSS is inlined in head below.
  css: ['~/assets/css/main.css'],

  // Tailwind CSS optimization
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: false
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: false, // Reduce bundle size
    treeshakeClientOnly: true // Remove client-only code from SSR
  },

  // Vite optimizations for faster builds and smaller bundles
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('vue')) return 'vue'
              if (id.includes('@vueuse')) return 'vueuse'
              return 'vendor'
            }
            if (id.includes('components/')) return 'components'
            if (id.includes('composables/')) return 'composables'
          }
        }
      },
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    optimizeDeps: {
      include: ['vue', '@vueuse/core'],
      exclude: ['@nuxt/kit']
    },
    css: {
      devSourcemap: false
    }
  },

  // Build optimization
  build: {
    transpile: ['@headlessui/vue']
  },

  // Static site generation with performance optimizations
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
      crawlLinks: true
    },
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true
    },
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Resource-Policy': 'same-origin',
          'X-Permitted-Cross-Domain-Policies': 'none',
          // Add CSP and HSTS only in production; allow inline critical CSS via hash
          ...(isProd && criticalHash ? {
            'Content-Security-Policy': [
              "default-src 'self'",
              // Nuxt inlines hydration/state scripts; allow inline scripts in static hosting context
              "script-src 'self' 'unsafe-inline'",
              // Allow our inline critical <style> by hash and allow style attributes for dynamic sizing
              `style-src 'self' 'unsafe-inline' 'sha256-${criticalHash}'`,
              "script-src-attr 'none'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'",
              "form-action 'self'"
            ].join('; ')
          } : {}),
          ...(isProd ? {
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
          } : {}),
          // Default: HTML should be revalidated to avoid stale content
          'Cache-Control': 'public, max-age=0, must-revalidate'
        }
      },
      '/': {
        prerender: true,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=86400'
        }
      },
      // Long-term immutable caching for build assets and static resources
      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      '/assets/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      '/images/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      '/fonts/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      '/favicon.ico': {
        headers: {
          'Cache-Control': 'public, max-age=604800'
        }
      },
      '/robots.txt': {
        headers: {
          'Cache-Control': 'public, max-age=3600'
        }
      },
      '/sitemap.xml': {
        headers: {
          'Cache-Control': 'public, max-age=86400'
        }
      }
    }
  },

  // App configuration with performance improvements
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Professional Business Template' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Fonts are self-hosted via @nuxtjs/google-fonts (download: true)
        // Avoid remote preconnect/preload to prevent duplicate requests and FOIT/FOUT.
      ],
      // Inline critical CSS to avoid render-blocking stylesheets and reduce FCP.
      // Computed above to also allow CSP hash generation.
      style: criticalStyleTag
    }
  },

  // TypeScript configuration
  typescript: {
    strict: false,
    typeCheck: false
  }
})
