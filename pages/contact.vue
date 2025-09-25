<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
      <div class="container-max text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold mb-6">Get In Touch</h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Ready to transform your business? Let's discuss how we can help you achieve your goals.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="card">
            <h2 class="text-2xl font-heading font-bold text-secondary-900 mb-6">Send us a message</h2>
            <form @submit.prevent="submitForm" class="space-y-6" autocomplete="on" :aria-busy="submitting ? 'true' : 'false'">
              <!-- SR-only live region for status updates -->
              <p class="sr-only" aria-live="polite">{{ submitting ? 'Sending your message…' : 'Form ready' }}</p>
              
              <!-- Simple spam honeypot (kept offscreen for humans, visible to naive bots) -->
              <div class="sr-only" aria-hidden="true">
                <label for="website">Website</label>
                <input id="website" v-model="form.hp" type="text" name="website" tabindex="-1" autocomplete="off" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-secondary-700 mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    name="firstName"
                    autocomplete="given-name"
                    autocapitalize="words"
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="John"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-secondary-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    name="lastName"
                    autocomplete="family-name"
                    autocapitalize="words"
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="Doe"
                  >
                </div>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  name="email"
                  inputmode="email"
                  autocomplete="email"
                  autocapitalize="off"
                  spellcheck="false"
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="john@example.com"
                >
              </div>
              
              <div>
                <label for="company" class="block text-sm font-medium text-secondary-700 mb-2">
                  Company
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  name="company"
                  autocomplete="organization"
                  autocapitalize="words"
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="Your Company"
                >
              </div>
              
              <div>
                <label for="service" class="block text-sm font-medium text-secondary-700 mb-2">
                  Service Interest
                </label>
                <select
                  id="service"
                  v-model="form.service"
                  name="service"
                  autocomplete="off"
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                >
                  <option value="">Select a service</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="business-consulting">Business Consulting</option>
                  <option value="technology-solutions">Technology Solutions</option>
                  <option value="brand-development">Brand Development</option>
                  <option value="ecommerce">E-commerce Solutions</option>
                  <option value="data-analytics">Data Analytics</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  name="message"
                  autocomplete="off"
                  enterkeyhint="send"
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project and how we can help..."
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <input
                  id="newsletter"
                  v-model="form.newsletter"
                  type="checkbox"
                  name="newsletter"
                  autocomplete="off"
                  class="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                >
                <label for="newsletter" class="ml-2 text-sm text-secondary-600">
                  Subscribe to our newsletter for updates and insights
                </label>
              </div>
              
              <button
                type="submit"
                :disabled="submitting"
                class="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="submitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-heading font-bold text-secondary-900 mb-6">Contact Information</h2>
              <div class="space-y-6">
                <div v-for="contact in contactInfo" :key="contact.type" class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <component :is="contact.icon" class="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-secondary-900 mb-1">{{ contact.type }}</h3>
                    <p class="text-secondary-600">
                      <a v-if="contact.href" :href="contact.href" class="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {{ contact.value }}
                      </a>
                      <span v-else>{{ contact.value }}</span>
                    </p>
                    <p v-if="contact.extra" class="text-sm text-secondary-500">{{ contact.extra }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="card">
              <h3 class="text-lg font-heading font-semibold text-secondary-900 mb-4">Business Hours</h3>
              <div class="space-y-2">
                <div v-for="hours in businessHours" :key="hours.days" class="flex justify-between">
                  <span class="text-secondary-600">{{ hours.days }}</span>
                  <span class="text-secondary-900 font-medium">{{ hours.time }}</span>
                </div>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="card">
              <h3 class="text-lg font-heading font-semibold text-secondary-900 mb-4">Our Location</h3>
              <div class="aspect-video bg-secondary-200 rounded-lg flex items-center justify-center">
                <p class="text-secondary-500">Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-secondary-50">
      <div class="container-max">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-heading font-bold text-secondary-900 mb-4">Quick Answers</h2>
          <p class="text-lg text-secondary-600">Common questions about getting started with our services.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div v-for="faq in quickFaqs" :key="faq.question" class="card">
            <h3 class="font-semibold text-secondary-900 mb-3">{{ faq.question }}</h3>
            <p class="text-secondary-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
useSeoMeta({
  title: 'Contact Us',
  description: 'Get in touch with our team to discuss your business needs and how we can help you achieve your goals.'
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  service: '',
  message: '',
  newsletter: false,
  hp: ''
})

const submitting = ref(false)
// SSR-safe toast instance to avoid errors during prerender
const toast = process.client ? useToast() : { success: () => {}, error: () => {} }

const contactInfo = [
  {
    type: 'Phone',
    value: '+1 (555) 123-4567',
    extra: 'Mon-Fri 9AM-6PM EST',
    icon: 'svg',
    href: 'tel:+15551234567'
  },
  {
    type: 'Email',
    value: 'hello@business.com',
    extra: 'We respond within 24 hours',
    icon: 'svg',
    href: 'mailto:hello@business.com'
  },
  {
    type: 'Address',
    value: '123 Business Street',
    extra: 'New York, NY 10001',
    icon: 'svg',
    href: 'https://maps.google.com/?q=123%20Business%20Street%2C%20New%20York%2C%20NY%2010001'
  }
]

const businessHours = [
  { days: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
  { days: 'Saturday', time: '10:00 AM - 4:00 PM' },
  { days: 'Sunday', time: 'Closed' }
]

const quickFaqs = [
  {
    question: 'How quickly can we get started?',
    answer: 'Most projects can begin within 1-2 weeks after our initial consultation and agreement.'
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes! We provide a complimentary 30-minute consultation to discuss your needs and goals.'
  },
  {
    question: 'What information should I prepare?',
    answer: 'Basic information about your business, goals, timeline, and any specific requirements you have.'
  },
  {
    question: 'Can you work with our budget?',
    answer: 'We offer flexible solutions and can work with various budgets to find the best approach for you.'
  }
]

const submitForm = async () => {
  submitting.value = true
  
  try {
    // Honeypot: if filled, treat as success but drop silently
    if (form.value.hp) {
      toast.success("Thank you for your message! We'll get back to you soon.")
      return
    }
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    Object.keys(form.value).forEach(key => {
      if (typeof form.value[key] === 'boolean') {
        form.value[key] = false
      } else {
        form.value[key] = ''
      }
    })
    
    // Show success message (non-blocking toast)
    toast.success("Thank you for your message! We'll get back to you soon.")
    
  } catch (error) {
    toast.error('There was an error sending your message. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>
