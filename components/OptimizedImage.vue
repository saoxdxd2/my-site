<template>
  <div class="optimized-image-container" :class="containerClass">
    <picture v-if="!isLazy || isVisible">
      <source 
        v-if="supportsAVIF && avifSrc" 
        :srcset="avifSrc" 
        type="image/avif"
      />
      <source 
        v-if="supportsWebP && webpSrc" 
        :srcset="webpSrc" 
        type="image/webp"
      />
      <img
        :src="optimizedSrc"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
        :decoding="decoding"
        :fetchpriority="fetchpriority"
        :class="[imageClass, { 'loaded': isLoaded }]"
        @load="onLoad"
        @error="onError"
      />
    </picture>
    <div
      v-else-if="isLazy && !isVisible"
      ref="placeholder"
      class="image-placeholder"
      :style="placeholderStyle"
    >
      <div class="placeholder-content">
        <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  sizes?: string
  format?: string[]
  quality?: number
  loading?: 'lazy' | 'eager'
  isLazy?: boolean
  containerClass?: string
  imageClass?: string
  decoding?: 'sync' | 'async' | 'auto'
  fetchpriority?: 'high' | 'low' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  format: () => ['webp', 'jpeg'],
  quality: 80,
  loading: 'lazy',
  isLazy: false,
  containerClass: '',
  imageClass: 'w-full h-auto',
  decoding: 'async',
  fetchpriority: 'auto'
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const placeholder = ref<HTMLElement>()
const isVisible = ref(false)
const isLoaded = ref(false)

// Intersection Observer for lazy loading
let observer: IntersectionObserver | null = null

const placeholderStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  aspectRatio: props.width && props.height ? `${props.width} / ${props.height}` : 'auto'
}))

// Browser support detection
const supportsWebP = ref(false)
const supportsAVIF = ref(false)

// Generate optimized image sources
const optimizedSrc = computed(() => props.src)

const webpSrc = computed(() => {
  if (!props.src || !supportsWebP.value) return ''
  // In a real implementation, this would convert/serve WebP versions
  return props.src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
})

const avifSrc = computed(() => {
  if (!props.src || !supportsAVIF.value) return ''
  // In a real implementation, this would convert/serve AVIF versions
  return props.src.replace(/\.(jpg|jpeg|png)$/i, '.avif')
})

// Detect format support on mount
const detectFormatSupport = () => {
  if (typeof window === 'undefined') return
  
  // Test WebP support
  const webpCanvas = document.createElement('canvas')
  webpCanvas.width = 1
  webpCanvas.height = 1
  supportsWebP.value = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  
  // Test AVIF support
  const avifCanvas = document.createElement('canvas')
  avifCanvas.width = 1
  avifCanvas.height = 1
  supportsAVIF.value = avifCanvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
}

const onLoad = (event: Event) => {
  isLoaded.value = true
  emit('load', event)
}

const onError = (event: Event) => {
  emit('error', event)
}

onMounted(() => {
  detectFormatSupport()
  
  if (props.isLazy && placeholder.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px'
      }
    )
    observer.observe(placeholder.value)
  } else {
    isVisible.value = true
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.optimized-image-container {
  @apply relative overflow-hidden;
}

.image-placeholder {
  @apply bg-gray-100 flex items-center justify-center min-h-[200px];
}

.placeholder-content {
  @apply flex items-center justify-center;
}

/* Fade in animation for loaded images */
.optimized-image-container img {
  @apply transition-opacity duration-300;
}

.optimized-image-container img[loading="lazy"] {
  @apply opacity-0;
}

.optimized-image-container img[loading="lazy"].loaded {
  @apply opacity-100;
}
</style>
