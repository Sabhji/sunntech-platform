import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100 // requests per window

// Security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Block suspicious user agents
const blockedUserAgents = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /perl/i,
  /ruby/i,
]

// Block suspicious IP patterns (basic implementation)
const blockedIPs: string[] = [
  // Add any known malicious IPs here
]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const ip = request.ip || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const path = request.nextUrl.pathname

  // HTTPS enforcement in production
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto')
    if (proto !== 'https') {
      const host = request.headers.get('host')
      const url = new URL(`https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`)
      return NextResponse.redirect(url, 301)
    }
  }

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Block suspicious user agents
  if (blockedUserAgents.some(pattern => pattern.test(userAgent))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Block suspicious IPs
  if (blockedIPs.includes(ip)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Rate limiting
  const now = Date.now()
  const rateLimitData = rateLimit.get(ip)

  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimit.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
  } else {
    rateLimitData.count++
    
    if (rateLimitData.count > RATE_LIMIT_MAX_REQUESTS) {
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitData.resetTime - now) / 1000).toString()
        }
      })
    }
  }

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
  response.headers.set('X-RateLimit-Remaining', (RATE_LIMIT_MAX_REQUESTS - (rateLimitData?.count || 0)).toString())
  response.headers.set('X-RateLimit-Reset', (rateLimitData?.resetTime || now + RATE_LIMIT_WINDOW).toString())

  // Protect sensitive routes
  if (path.startsWith('/api/') || path.startsWith('/dashboard') || path.startsWith('/profile')) {
    // Add additional security for sensitive routes
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
  }

  // Prevent access to sensitive files
  if (path.includes('.env') || path.includes('.git') || path.includes('package.json')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
