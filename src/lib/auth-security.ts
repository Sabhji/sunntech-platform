import bcrypt from 'bcryptjs'
import { generateSecureToken, validatePasswordStrength } from './security'

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Secure Password Reset Token Generation
export function generatePasswordResetToken(): string {
  return generateSecureToken(32)
}

// Session Token Generation
export function generateAuthToken(): string {
  return generateSecureToken(48)
}

// Secure User Registration Validation
export function validateRegistration(data: {
  email: string
  password: string
  name?: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Invalid email address')
  }
  
  // Password validation
  const passwordValidation = validatePasswordStrength(data.password)
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors)
  }
  
  // Name validation (if provided)
  if (data.name && data.name.length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Secure Login Validation
export function validateLogin(email: string, password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!email || email.length < 5) {
    errors.push('Email is required')
  }
  
  if (!password || password.length < 1) {
    errors.push('Password is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Account Lockout Mechanism
const loginAttempts = new Map<string, { count: number; lockUntil: number }>()
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export function checkAccountLockout(email: string): { isLocked: boolean; remainingTime?: number } {
  const attempts = loginAttempts.get(email)
  
  if (!attempts) return { isLocked: false }
  
  if (attempts.lockUntil > Date.now()) {
    return {
      isLocked: true,
      remainingTime: attempts.lockUntil - Date.now()
    }
  }
  
  // Reset if lockout period has passed
  loginAttempts.delete(email)
  return { isLocked: false }
}

export function recordFailedLoginAttempt(email: string): void {
  const attempts = loginAttempts.get(email) || { count: 0, lockUntil: 0 }
  attempts.count++
  
  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    attempts.lockUntil = Date.now() + LOCKOUT_DURATION
  }
  
  loginAttempts.set(email, attempts)
}

export function resetLoginAttempts(email: string): void {
  loginAttempts.delete(email)
}

// Two-Factor Authentication (2FA) Helpers
export function generate2FASecret(): string {
  return generateSecureToken(16)
}

export function generate2FABackupCodes(count: number = 10): string[] {
  const codes: string[] = []
  for (let i = 0; i < count; i++) {
    codes.push(generateSecureToken(8).toUpperCase())
  }
  return codes
}

// Session Security
export function validateSession(session: any): boolean {
  if (!session) return false
  
  // Check session expiration
  if (session.expiresAt && session.expiresAt < Date.now()) {
    return false
  }
  
  // Check required fields
  if (!session.userId || !session.token) {
    return false
  }
  
  return true
}

// Secure Cookie Settings
export const secureCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/'
}

// Password Policy Configuration
export const passwordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
  preventPersonalInfo: true,
  expirationDays: 90
}

// Common weak passwords to prevent
const commonPasswords = [
  'password', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', 'master', 'dragon', '111111', 'baseball',
  'iloveyou', 'trustno1', 'sunshine', 'princess', 'admin'
]

export function isCommonPassword(password: string): boolean {
  return commonPasswords.includes(password.toLowerCase())
}
