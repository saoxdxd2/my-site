<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
      <div class="container-max text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold mb-6">About Our Company</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          We're passionate about helping businesses succeed through innovative solutions and dedicated service.
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-heading font-bold text-secondary-900 mb-6">Our Story</h2>
            <p class="text-lg text-secondary-600 mb-6">
              Founded in 2020, we started with a simple mission: to help businesses thrive in the digital age. 
              What began as a small team of passionate professionals has grown into a trusted partner for 
              companies worldwide.
            </p>
            <p class="text-lg text-secondary-600 mb-6">
              Our journey has been marked by continuous learning, innovation, and an unwavering commitment 
              to our clients' success. We believe that every business has unique potential, and our role 
              is to unlock that potential through strategic guidance and cutting-edge solutions.
            </p>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-secondary-900">Certified Excellence</h3>
                <p class="text-secondary-600">Industry-recognized certifications and awards</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-padding bg-secondary-50">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-4">Our Values</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            These core principles guide everything we do and shape our relationships with clients and partners.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="value in values" :key="value.title" class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <component :is="value.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-heading font-semibold mb-4">{{ value.title }}</h3>
            <p class="text-secondary-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-4">Meet Our Team</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our diverse team of experts brings together years of experience and fresh perspectives.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.name" class="card text-center hover-lift">
            <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mx-auto mb-6"></div>
            <h3 class="text-xl font-heading font-semibold mb-2">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-4">{{ member.role }}</p>
            <p class="text-secondary-600 mb-6">{{ member.bio }}</p>
            <div class="flex justify-center space-x-3">
              <a v-for="social in member.social" :key="social.platform" :href="social.url" 
                 class="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-200">
                <component :is="social.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-primary-600 text-white">
      <div class="container-max text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Work Together?</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Let's discuss how we can help your business reach its full potential.
        </p>
        <NuxtLink to="/contact" class="btn bg-white text-primary-600 hover:bg-primary-50">
          Get In Touch
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'About Us',
  description: 'Learn about our company, values, and the passionate team dedicated to helping your business succeed.'
})

const values = [
  {
    title: 'Innovation',
    description: 'We embrace new technologies and creative approaches to solve complex business challenges.',
    icon: 'svg'
  },
  {
    title: 'Integrity',
    description: 'Transparency and honesty form the foundation of all our client relationships.',
    icon: 'svg'
  },
  {
    title: 'Excellence',
    description: 'We strive for perfection in every project, delivering results that exceed expectations.',
    icon: 'svg'
  }
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years of experience in business strategy and digital transformation.',
    social: [
      { platform: 'LinkedIn', url: '#', icon: 'svg' },
      { platform: 'Twitter', url: '#', icon: 'svg' }
    ]
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Technology expert specializing in scalable solutions and innovative development practices.',
    social: [
      { platform: 'LinkedIn', url: '#', icon: 'svg' },
      { platform: 'GitHub', url: '#', icon: 'svg' }
    ]
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Marketing',
    bio: 'Creative strategist with a passion for building brands and driving customer engagement.',
    social: [
      { platform: 'LinkedIn', url: '#', icon: 'svg' },
      { platform: 'Instagram', url: '#', icon: 'svg' }
    ]
  }
]
</script>
