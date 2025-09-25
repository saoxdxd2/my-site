<template>
  <header class="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300" :class="{ 'shadow-lg': scrolled }">
    <nav class="container-max section-padding py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">B</span>
          </div>
          <span class="text-xl font-heading font-bold text-secondary-900">Business</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.href"
            class="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
            :class="{ 'text-primary-600': $route.path === item.href }"
          >
            {{ item.name }}
          </NuxtLink>
          <button class="btn btn-primary">Get Started</button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-secondary-200">
          <div class="flex flex-col space-y-3 pt-4">
            <NuxtLink 
              v-for="item in navigation" 
              :key="item.name"
              :to="item.href"
              @click="mobileMenuOpen = false"
              class="text-secondary-600 hover:text-primary-600 font-medium py-2 transition-colors duration-200"
              :class="{ 'text-primary-600': $route.path === item.href }"
            >
              {{ item.name }}
            </NuxtLink>
            <button class="btn btn-primary mt-4">Get Started</button>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
]

// Handle scroll effect
onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 10
  }
  
  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
