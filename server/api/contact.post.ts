/**
 * Contact form API endpoint for static template
 * Handles form submissions without requiring a full backend
 */

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    const { name, email, message, subject } = body
    
    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: name, email, and message are required'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Rate limiting (simple in-memory store for demo)
    const clientIP = getClientIP(event) || 'unknown'
    const rateLimit = await checkRateLimit(clientIP)
    
    if (!rateLimit.allowed) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many requests. Please try again later.'
      })
    }

    // In a real implementation, you would:
    // 1. Send email via SMTP service
    // 2. Save to database
    // 3. Integrate with CRM
    
    // For now, we'll simulate success
    console.log('Contact form submission:', {
      name,
      email,
      subject: subject || 'Contact Form Submission',
      message,
      timestamp: new Date().toISOString(),
      ip: clientIP
    })

    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    }
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error. Please try again later.'
    })
  }
})

// Simple rate limiting implementation
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

async function checkRateLimit(clientIP: string): Promise<{ allowed: boolean; remaining: number }> {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // 5 requests per window
  
  const record = rateLimitStore.get(clientIP)
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + windowMs
    })
    return { allowed: true, remaining: maxRequests - 1 }
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }
  
  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes
