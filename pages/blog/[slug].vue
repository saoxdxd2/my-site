<template>
  <div>
    <!-- Article Header -->
    <article class="section-padding">
      <div class="container-max max-w-4xl">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-secondary-500 mb-8">
          <NuxtLink to="/" class="hover:text-primary-600">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/blog" class="hover:text-primary-600">Blog</NuxtLink>
          <span>/</span>
          <span class="text-secondary-900">{{ post.title }}</span>
        </nav>

        <!-- Article Meta -->
        <div class="flex items-center space-x-4 mb-6">
          <span class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {{ post.category }}
          </span>
          <span class="text-sm text-secondary-500">{{ formatDate(post.date) }}</span>
          <span class="text-sm text-secondary-500">{{ readingTime }} min read</span>
        </div>

        <!-- Article Title -->
        <h1 class="text-3xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
          {{ post.title }}
        </h1>

        <!-- Article Description -->
        <p class="text-xl text-secondary-600 mb-8 leading-relaxed">
          {{ post.description }}
        </p>

        <!-- Author Info -->
        <div class="flex items-center space-x-4 mb-8 pb-8 border-b border-secondary-200">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full"></div>
          <div>
            <p class="font-semibold text-secondary-900">{{ post.author }}</p>
            <p class="text-sm text-secondary-600">Published {{ formatDate(post.date) }}</p>
          </div>
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <ContentRenderer :value="post" />
        </div>

        <!-- Article Tags -->
        <div class="flex flex-wrap gap-2 mt-12 pt-8 border-t border-secondary-200">
          <span class="text-sm font-medium text-secondary-700 mr-2">Tags:</span>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-sm bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full hover:bg-primary-50 hover:text-primary-700 cursor-pointer transition-colors duration-200"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Social Share -->
        <div class="flex items-center justify-between mt-12 pt-8 border-t border-secondary-200">
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium text-secondary-700">Share this article:</span>
            <div class="flex space-x-3">
              <button
                v-for="social in socialShare"
                :key="social.name"
                @click="shareArticle(social.name)"
                class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-200"
                :title="`Share on ${social.name}`"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </button>
            </div>
          </div>
          <button @click="copyLink" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Copy Link
          </button>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    <section class="section-padding bg-secondary-50" v-if="relatedPosts.length > 0">
      <div class="container-max">
        <h2 class="text-3xl font-heading font-bold text-secondary-900 mb-12 text-center">
          Related Articles
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            v-for="relatedPost in relatedPosts"
            :key="relatedPost._path"
            class="card hover-lift"
          >
            <div class="aspect-video bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-lg mb-6"></div>
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {{ relatedPost.category }}
              </span>
              <span class="text-sm text-secondary-500">{{ formatDate(relatedPost.date) }}</span>
            </div>
            <h3 class="text-lg font-heading font-semibold text-secondary-900 mb-3 hover:text-primary-600 transition-colors duration-200">
              <NuxtLink :to="`/blog/${relatedPost._path.split('/').pop()}`">
                {{ relatedPost.title }}
              </NuxtLink>
            </h3>
            <p class="text-secondary-600 mb-4">{{ relatedPost.description }}</p>
            <NuxtLink :to="`/blog/${relatedPost._path.split('/').pop()}`" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Read More →
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="section-padding bg-primary-600 text-white">
      <div class="container-max text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-6">
          Enjoyed this article?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for more insights and tips delivered to your inbox.
        </p>
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex gap-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="flex-1 px-4 py-3 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
          <button type="submit" class="btn bg-white text-primary-600 hover:bg-primary-50">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// Fetch the current post
const { data: post } = await queryContent(`/blog/${slug}`).findOne()

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article not found'
  })
}

// Fetch related posts
const { data: allPosts } = await queryContent('/blog').sort({ date: -1 }).find()
const relatedPosts = allPosts
  .filter(p => p._path !== post._path && p.category === post.category)
  .slice(0, 3)

const email = ref('')

// SEO
useSeoMeta({
  title: post.title,
  description: post.description,
  ogTitle: post.title,
  ogDescription: post.description,
  ogImage: post.image || '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Calculate reading time (rough estimate)
const readingTime = computed(() => {
  const wordsPerMinute = 200
  const wordCount = post.body?.children?.reduce((count, child) => {
    if (child.type === 'element' && child.tag === 'p') {
      return count + (child.children?.[0]?.value?.split(' ').length || 0)
    }
    return count
  }, 0) || 500
  
  return Math.ceil(wordCount / wordsPerMinute)
})

const socialShare = [
  { name: 'Twitter', icon: 'svg' },
  { name: 'Facebook', icon: 'svg' },
  { name: 'LinkedIn', icon: 'svg' }
]

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareArticle = (platform) => {
  const url = window.location.href
  const title = post.title
  
  let shareUrl = ''
  
  switch (platform) {
    case 'Twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
      break
    case 'Facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      break
    case 'LinkedIn':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      break
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const subscribeNewsletter = () => {
  alert('Thank you for subscribing to our newsletter!')
  email.value = ''
}
</script>

<style>
/* Custom prose styles */
.prose {
  @apply text-secondary-700;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-secondary-900 font-heading font-semibold;
}

.prose h2 {
  @apply text-2xl mt-12 mb-6;
}

.prose h3 {
  @apply text-xl mt-8 mb-4;
}

.prose p {
  @apply mb-6 leading-relaxed;
}

.prose ul,
.prose ol {
  @apply mb-6;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-primary-600 pl-6 italic text-secondary-600 my-8;
}

.prose code {
  @apply bg-secondary-100 text-secondary-800 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-secondary-900 text-white p-6 rounded-lg overflow-x-auto my-8;
}

.prose a {
  @apply text-primary-600 hover:text-primary-700 font-medium;
}

.prose strong {
  @apply font-semibold text-secondary-900;
}
</style>
