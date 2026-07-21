import crypto from 'crypto'

// CSRF Token Generation and Validation
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false
  return token === sessionToken
}

// Input Sanitization
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return ''
  return email.toLowerCase().trim()
}

export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return ''
    }
    return parsed.href
  } catch {
    return ''
  }
}

// SQL Injection Prevention (basic)
export function sanitizeSQLInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/['";\\]/g, '') // Remove SQL special characters
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove SQL block comments
    .replace(/\*\//g, '')
    .trim()
}

// XSS Prevention
export function escapeHTML(unsafe: string): string {
  if (typeof unsafe !== 'string') return ''
  
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Password Strength Validation
export function validatePasswordStrength(password: string): {
  isValid: boolean
  strength: 'weak' | 'medium' | 'strong'
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak'
  if (password.length >= 12 && errors.length <= 1) {
    strength = 'strong'
  } else if (password.length >= 8 && errors.length <= 2) {
    strength = 'medium'
  }
  
  return {
    isValid: errors.length === 0,
    strength,
    errors
  }
}

// Environment Variable Validation
export function validateEnvVariables(required: string[]): { isValid: boolean; missing: string[] } {
  const missing: string[] = []
  
  required.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  })
  
  return {
    isValid: missing.length === 0,
    missing
  }
}

// Rate Limiting Helper
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number,
  store: Map<string, { count: number; resetTime: number }>
): { allowed: boolean; resetTime: number } {
  const now = Date.now()
  const data = store.get(identifier)
  
  if (!data || now > data.resetTime) {
    store.set(identifier, {
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

// Secure Random Token Generation
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// Session Management Helpers
export function generateSessionId(): string {
  return generateSecureToken(32)
}

export function validateSessionId(sessionId: string): boolean {
  // Basic validation - in production, check against database
  return typeof sessionId === 'string' && sessionId.length === 64
}

// Content Security Policy Helper
export function getCSPHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self';"
  }
}
