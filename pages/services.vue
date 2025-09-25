<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
      <div class="container-max text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold mb-6">Our Services</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Comprehensive business solutions designed to accelerate your growth and maximize your potential.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding">
      <div class="container-max">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title" class="card hover-lift">
            <div class="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center mb-6">
              <component :is="service.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-heading font-semibold mb-4">{{ service.title }}</h3>
            <p class="text-secondary-600 mb-6">{{ service.description }}</p>
            <ul class="space-y-2 mb-6">
              <li v-for="feature in service.features" :key="feature" class="flex items-center text-sm text-secondary-600">
                <svg class="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ feature }}
              </li>
            </ul>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-600">{{ service.price }}</span>
              <button class="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section-padding bg-secondary-50">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-4">Our Process</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            A proven methodology that ensures successful outcomes for every project.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, index) in process" :key="step.title" class="text-center">
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                {{ index + 1 }}
              </div>
              <div v-if="index < process.length - 1" class="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-primary-200"></div>
            </div>
            <h3 class="text-lg font-heading font-semibold mb-3">{{ step.title }}</h3>
            <p class="text-secondary-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-4">Frequently Asked Questions</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            Common questions about our services and how we work with clients.
          </p>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-4">
          <div v-for="faq in faqs" :key="faq.question" class="card">
            <button 
              @click="faq.open = !faq.open"
              class="w-full text-left flex items-center justify-between p-2"
            >
              <h3 class="text-lg font-semibold text-secondary-900">{{ faq.question }}</h3>
              <svg 
                class="w-5 h-5 text-secondary-400 transition-transform duration-200"
                :class="{ 'rotate-180': faq.open }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Transition name="fade">
              <div v-if="faq.open" class="px-2 pb-2">
                <p class="text-secondary-600">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-secondary-900 text-white">
      <div class="container-max text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
          Choose the service that best fits your needs or contact us for a custom solution.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn bg-primary-600 hover:bg-primary-700 text-white">
            Contact Us Today
          </NuxtLink>
          <button class="btn btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Services',
  description: 'Comprehensive business solutions including digital marketing, consulting, technology, and brand development services.'
})

const services = ref([
  {
    title: 'Digital Marketing',
    description: 'Boost your online presence with comprehensive digital marketing strategies.',
    price: 'From $999',
    icon: 'svg',
    features: [
      'SEO Optimization',
      'Social Media Management',
      'Content Marketing',
      'PPC Advertising',
      'Analytics & Reporting'
    ]
  },
  {
    title: 'Business Consulting',
    description: 'Expert guidance to optimize operations and accelerate business growth.',
    price: 'From $1,499',
    icon: 'svg',
    features: [
      'Strategic Planning',
      'Process Optimization',
      'Market Analysis',
      'Financial Planning',
      'Growth Strategies'
    ]
  },
  {
    title: 'Technology Solutions',
    description: 'Cutting-edge tech solutions to streamline your business processes.',
    price: 'From $2,499',
    icon: 'svg',
    features: [
      'Custom Software',
      'System Integration',
      'Cloud Migration',
      'Security Audits',
      'Technical Support'
    ]
  },
  {
    title: 'Brand Development',
    description: 'Build a strong, memorable brand that resonates with your audience.',
    price: 'From $799',
    icon: 'svg',
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Marketing Materials',
      'Website Design',
      'Brand Strategy'
    ]
  },
  {
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms to sell your products online.',
    price: 'From $1,999',
    icon: 'svg',
    features: [
      'Online Store Setup',
      'Payment Integration',
      'Inventory Management',
      'Mobile Optimization',
      'Marketing Tools'
    ]
  },
  {
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights for better decisions.',
    price: 'From $1,299',
    icon: 'svg',
    features: [
      'Data Visualization',
      'Custom Dashboards',
      'Predictive Analytics',
      'Performance Metrics',
      'Automated Reports'
    ]
  }
])

const process = [
  {
    title: 'Discovery',
    description: 'We learn about your business, goals, and challenges to create a tailored strategy.'
  },
  {
    title: 'Planning',
    description: 'Develop a comprehensive plan with clear milestones and deliverables.'
  },
  {
    title: 'Execution',
    description: 'Implement solutions with regular updates and transparent communication.'
  },
  {
    title: 'Optimization',
    description: 'Monitor performance and continuously optimize for better results.'
  }
]

const faqs = ref([
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. Most projects are completed within 4-12 weeks, with ongoing support available.',
    open: false
  },
  {
    question: 'Do you offer ongoing support after project completion?',
    answer: 'Yes, we provide various support packages to ensure your continued success. This includes maintenance, updates, and strategic guidance.',
    open: false
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Absolutely! We collaborate seamlessly with in-house teams and can provide training to ensure smooth knowledge transfer.',
    open: false
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We work across various industries including technology, healthcare, finance, retail, and professional services.',
    open: false
  },
  {
    question: 'How do you measure project success?',
    answer: 'We establish clear KPIs and success metrics at the project start, with regular reporting and performance reviews throughout.',
    open: false
  }
])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
