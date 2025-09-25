<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer -->
    <!-- Lazy-loaded to reduce initial JS/hydration cost -->
    <LazyAppFooter />
    
    <!-- Back to Top Button -->
    <!-- Client-only & lazy to avoid SSR/hydration on initial paint -->
    <ClientOnly>
      <LazyBackToTop />
    </ClientOnly>
  </div>
</template>

<script setup>
// Layout-specific logic can go here
</script>
