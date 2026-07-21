import { z } from 'zod'

// User registration validation schema
export const registerSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  role: z.enum(['freelancer', 'company']).optional()
})

// User login validation schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .toLowerCase(),
  password: z.string()
    .min(1, 'Password is required')
})

// Project creation validation schema
export const projectSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  budget: z.string()
    .min(1, 'Budget is required')
    .regex(/^\$?\d+\.?\d*$/, 'Invalid budget format'),
  category: z.string()
    .min(1, 'Category is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  skills: z.array(z.string())
    .min(1, 'At least one skill is required')
    .max(10, 'Maximum 10 skills allowed'),
  duration: z.string()
    .min(1, 'Duration is required')
})

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .toLowerCase(),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
})

// Generic input sanitization with validation
export function validateAndSanitizeInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: boolean; data?: T; errors?: string[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message)
      return { success: false, errors }
    }
    return { success: false, errors: ['Validation failed'] }
  }
}

// Sanitize string input
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
}

// Sanitize email
export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return ''
  return email.toLowerCase().trim()
}

// Export types for TypeScript
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type ContactInput = z.infer<typeof contactSchema>
