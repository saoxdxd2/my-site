<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
      <div class="container-max text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold mb-6">Our Blog</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Insights, tips, and strategies to help your business thrive in the digital world.
        </p>
      </div>
    </section>

    <!-- Featured Post -->
    <section class="section-padding bg-secondary-50" v-if="featuredPost">
      <div class="container-max">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-heading font-bold text-secondary-900 mb-4">Featured Article</h2>
        </div>
        
        <div class="card max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div class="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg"></div>
            <div>
              <div class="flex items-center space-x-4 mb-4">
                <span class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {{ featuredPost.category }}
                </span>
                <span class="text-sm text-secondary-500">{{ formatDate(featuredPost.date) }}</span>
              </div>
              <h3 class="text-2xl font-heading font-bold text-secondary-900 mb-4">
                {{ featuredPost.title }}
              </h3>
              <p class="text-secondary-600 mb-6">{{ featuredPost.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full"></div>
                  <span class="text-sm text-secondary-600">{{ featuredPost.author }}</span>
                </div>
                <NuxtLink :to="`/blog/${featuredPost._path.split('/').pop()}`" class="btn btn-primary">
                  Read More
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="section-padding">
      <div class="container-max">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeFilter = category"
            class="px-6 py-3 rounded-full font-medium transition-all duration-200"
            :class="activeFilter === category 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'"
          >
            {{ category }}
          </button>
        </div>

        <!-- Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in filteredPosts"
            :key="post._path"
            class="card hover-lift"
          >
            <div class="aspect-video bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-lg mb-6"></div>
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {{ post.category }}
              </span>
              <span class="text-sm text-secondary-500">{{ formatDate(post.date) }}</span>
            </div>
            <h3 class="text-xl font-heading font-semibold text-secondary-900 mb-3 hover:text-primary-600 transition-colors duration-200">
              <NuxtLink :to="`/blog/${post._path.split('/').pop()}`">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-secondary-600 mb-4">{{ post.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full"></div>
                <span class="text-sm text-secondary-600">{{ post.author }}</span>
              </div>
              <NuxtLink :to="`/blog/${post._path.split('/').pop()}`" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Read More →
              </NuxtLink>
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-12" v-if="hasMorePosts">
          <button @click="loadMorePosts" class="btn btn-outline">
            Load More Articles
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="section-padding bg-primary-600 text-white">
      <div class="container-max text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-6">Stay Updated</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest insights and business tips delivered to your inbox.
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
useSeoMeta({
  title: 'Blog',
  description: 'Read our latest insights, tips, and strategies to help your business succeed in the digital world.'
})

const activeFilter = ref('All Categories')
const email = ref('')
const postsPerPage = 9
const currentPage = ref(1)

// Fetch blog posts with error handling (Nuxt Content v2 returns array)
const posts = await queryContent('/blog').sort({ date: -1 }).find().catch(() => [])

// Fallback sample data if no content found
const samplePosts = [
  {
    _path: '/blog/getting-started-digital-marketing',
    title: 'Getting Started with Digital Marketing',
    description: 'Learn the fundamentals of digital marketing and how to create effective campaigns that drive results.',
    category: 'Marketing',
    author: 'John Smith',
    date: '2024-01-15',
    tags: ['digital marketing', 'strategy', 'business'],
    featured: true
  },
  {
    _path: '/blog/business-growth-strategies',
    title: '10 Proven Business Growth Strategies',
    description: 'Discover proven strategies that successful businesses use to scale and achieve sustainable growth.',
    category: 'Business',
    author: 'Sarah Johnson',
    date: '2024-01-10',
    tags: ['growth', 'strategy', 'scaling']
  },
  {
    _path: '/blog/technology-trends-2024',
    title: 'Technology Trends to Watch in 2024',
    description: 'Stay ahead of the curve with these emerging technology trends that will shape business in 2024.',
    category: 'Technology',
    author: 'Mike Chen',
    date: '2024-01-05',
    tags: ['technology', 'trends', 'innovation']
  }
]

const allPosts = posts && posts.length > 0 ? posts : samplePosts

const categories = computed(() => {
  const cats = ['All Categories']
  if (allPosts && Array.isArray(allPosts)) {
    allPosts.forEach(post => {
      if (post.category && !cats.includes(post.category)) {
        cats.push(post.category)
      }
    })
  }
  return cats
})

const featuredPost = computed(() => {
  if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) return null
  return allPosts.find(post => post.featured) || allPosts[0]
})

const filteredPosts = computed(() => {
  if (!allPosts || !Array.isArray(allPosts)) return []
  
  let filtered = allPosts.filter(post => post !== featuredPost.value)
  
  if (activeFilter.value !== 'All Categories') {
    filtered = filtered.filter(post => post.category === activeFilter.value)
  }
  
  return filtered.slice(0, postsPerPage * currentPage.value)
})

const hasMorePosts = computed(() => {
  if (!allPosts || !Array.isArray(allPosts)) return false
  
  let totalFiltered = allPosts.filter(post => post !== featuredPost.value)
  
  if (activeFilter.value !== 'All Categories') {
    totalFiltered = totalFiltered.filter(post => post.category === activeFilter.value)
  }
  
  return totalFiltered.length > postsPerPage * currentPage.value
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadMorePosts = () => {
  currentPage.value++
}

const subscribeNewsletter = () => {
  // Handle newsletter subscription
  alert('Thank you for subscribing to our newsletter!')
  email.value = ''
}

// Reset pagination when filter changes
watch(activeFilter, () => {
  currentPage.value = 1
})
</script>
