<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-bg text-white section-padding">
      <div class="container-max">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-up">
            <h1 class="text-4xl md:text-6xl font-heading font-bold mb-6 text-shadow">
              Grow Your Business with 
              <span class="text-gradient bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Professional Solutions
              </span>
            </h1>
            <p class="text-xl text-blue-100 mb-8 leading-relaxed">
              We help businesses thrive in the digital age with cutting-edge strategies, 
              innovative solutions, and personalized service that delivers real results.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="btn bg-white text-primary-600 hover:bg-blue-50 font-semibold">
                Get Started Today
              </button>
              <button class="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </button>
            </div>
          </div>
          <div class="animate-float">
            <div class="relative">
              <div class="w-full h-96 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl glass-effect p-8">
                <div class="space-y-4">
                  <div class="h-4 bg-white/30 rounded w-3/4"></div>
                  <div class="h-4 bg-white/20 rounded w-1/2"></div>
                  <div class="h-32 bg-white/10 rounded-lg"></div>
                  <div class="flex space-x-2">
                    <div class="h-8 bg-white/20 rounded w-20"></div>
                    <div class="h-8 bg-white/30 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-padding bg-secondary-50">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-4">
            Why Choose Our Services?
          </h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results for your business.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="card hover-lift text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-heading font-semibold mb-4">{{ feature.title }}</h3>
            <p class="text-secondary-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-6">
              Comprehensive Business Solutions
            </h2>
            <p class="text-lg text-secondary-600 mb-8">
              From strategy development to implementation, we provide end-to-end solutions 
              that drive growth and maximize your business potential.
            </p>
            
            <div class="space-y-6">
              <div v-for="service in services" :key="service.title" class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-secondary-900 mb-1">{{ service.title }}</h3>
                  <p class="text-secondary-600">{{ service.description }}</p>
                </div>
              </div>
            </div>
            
            <NuxtLink to="/services" class="btn btn-primary inline-block mt-8">
              View All Services
            </NuxtLink>
          </div>
          
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg"></div>
                <div class="h-24 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-lg"></div>
              </div>
              <div class="space-y-4 mt-8">
                <div class="h-24 bg-gradient-to-br from-primary-300 to-primary-500 rounded-lg"></div>
                <div class="h-32 bg-gradient-to-br from-secondary-300 to-secondary-400 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section-padding bg-primary-600 text-white">
      <div class="container-max">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-4xl md:text-5xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-primary-100">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-secondary-900 text-white">
      <div class="container-max text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <p class="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
          Join hundreds of successful businesses that have accelerated their growth with our proven strategies.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn bg-primary-600 hover:bg-primary-700 text-white">
            Start Your Journey
          </NuxtLink>
          <NuxtLink to="/portfolio" class="btn btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
            View Our Work
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Home',
  description: 'Professional business solutions that help you grow and succeed in today\'s competitive market.'
})

const features = [
  {
    title: 'Expert Strategy',
    description: 'Data-driven strategies tailored to your unique business goals and market position.',
    icon: 'svg'
  },
  {
    title: 'Proven Results',
    description: 'Track record of delivering measurable results and ROI for our clients.',
    icon: 'svg'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock support to ensure your business operations run smoothly.',
    icon: 'svg'
  }
]

const services = [
  {
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to boost your online presence.'
  },
  {
    title: 'Business Consulting',
    description: 'Expert guidance to optimize operations and accelerate growth.'
  },
  {
    title: 'Technology Solutions',
    description: 'Cutting-edge tech solutions to streamline your business processes.'
  },
  {
    title: 'Brand Development',
    description: 'Build a strong, memorable brand that resonates with your target audience.'
  }
]

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '1000+', label: 'Projects Completed' },
  { value: '99%', label: 'Success Rate' },
  { value: '24/7', label: 'Support Available' }
]
</script>
