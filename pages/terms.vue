<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow-sm p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-600 mb-6">
            Last updated: {{ formatDate(new Date()) }}
          </p>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p class="text-gray-700 mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
            <p class="text-gray-700 mb-4">
              Permission is granted to temporarily download one copy of the materials on our website 
              for personal, non-commercial transitory viewing only.
            </p>
            <p class="text-gray-700 mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p class="text-gray-700 mb-4">
              The materials on our website are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including 
              without limitation, implied warranties or conditions of merchantability, fitness for 
              a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
            <p class="text-gray-700 mb-4">
              In no event shall our company or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
            <p class="text-gray-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the website, to understand our practices.
            </p>
            <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-700 underline">
              View Privacy Policy
            </NuxtLink>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p class="text-gray-700 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p class="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
              <p class="text-gray-700">
                Email: {{ config.contactEmail }}<br>
                Address: [Your Business Address]<br>
                Phone: [Your Phone Number]
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils/helpers'

const config = useConfig()

// SEO
useSEO({
  title: 'Terms of Service',
  description: 'Terms and conditions for using our website and services.',
  type: 'website'
})
</script>
