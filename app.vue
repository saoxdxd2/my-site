<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Global meta tags and SEO
useSeoMeta({
  titleTemplate: '%s | Professional Business Template',
  description: 'Modern, responsive website template for businesses and professionals',
  ogDescription: 'Modern, responsive website template for businesses and professionals',
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
