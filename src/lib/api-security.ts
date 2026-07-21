import { NextResponse } from 'next/server'

// API security headers
export const apiSecurityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// CORS configuration
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://www.sunntech.in', 'https://sunntech.in']
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true,
  maxAge: 86400, // 24 hours
}

// Apply CORS headers to response
export function applyCORSHeaders(response: NextResponse, origin?: string): NextResponse {
  // Check if origin is allowed
  if (origin && corsConfig.origin.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else if (process.env.NODE_ENV === 'development') {
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  
  response.headers.set('Access-Control-Allow-Methods', corsConfig.methods.join(', '))
  response.headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '))
  response.headers.set('Access-Control-Allow-Credentials', corsConfig.credentials.toString())
  response.headers.set('Access-Control-Max-Age', corsConfig.maxAge.toString())
  
  return response
}

// Apply API security headers
export function applyAPISecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(apiSecurityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Additional API-specific headers
  response.headers.set('X-API-Version', '1.0')
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Window', '900') // 15 minutes
  
  return response
}

// Handle preflight requests
export function handlePreflightRequest(): NextResponse {
  const response = new NextResponse(null, { status: 204 })
  return applyCORSHeaders(response)
}

// Validate API key (placeholder for future implementation)
export function validateAPIKey(apiKey?: string): boolean {
  // In production, validate against database or secure storage
  if (!apiKey) return false
  return apiKey.startsWith('sk_') && apiKey.length >= 32
}

// Rate limiting for API endpoints (basic implementation)
const apiRateLimits = new Map<string, { count: number; resetTime: number }>()

export function checkAPIRateLimit(identifier: string, maxRequests: number = 50): { allowed: boolean; resetTime: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const data = apiRateLimits.get(identifier)
  
  if (!data || now > data.resetTime) {
    apiRateLimits.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return { allowed: true, resetTime: now + windowMs }
  }
  
  if (data.count >= maxRequests) {
    return { allowed: false, resetTime: data.resetTime }
  }
  
  data.count++
  return { allowed: true, resetTime: data.resetTime }
}
