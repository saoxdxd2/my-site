/**
 * Site configuration composable
 * Provides centralized access to runtime configuration
 */
export const useConfig = () => {
  const config = useRuntimeConfig()

  return {
    siteUrl: config.public.siteUrl,
    siteName: config.public.siteName,
    contactEmail: config.public.contactEmail,
    googleAnalytics: config.public.googleAnalytics
  }
}
