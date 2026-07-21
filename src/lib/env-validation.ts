import { validateEnvVariables } from './security'

// Required environment variables for the application
const REQUIRED_ENV_VARS = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
] as const

// Optional but recommended environment variables
const RECOMMENDED_ENV_VARS = [
  'DATABASE_URL',
  'NEXT_PUBLIC_API_URL',
] as const

export function validateEnvironment(): { isValid: boolean; missing: string[]; warnings: string[] } {
  const warnings: string[] = []
  
  // Validate required environment variables
  const requiredValidation = validateEnvVariables(REQUIRED_ENV_VARS as string[])
  
  // Check recommended variables
  const missingRecommended: string[] = []
  RECOMMENDED_ENV_VARS.forEach(varName => {
    if (!process.env[varName]) {
      missingRecommended.push(varName)
    }
  })
  
  if (missingRecommended.length > 0) {
    warnings.push(`Recommended environment variables missing: ${missingRecommended.join(', ')}`)
  }
  
  // Warn if running in development mode
  if (process.env.NODE_ENV === 'development') {
    warnings.push('Running in development mode - ensure environment variables are properly configured')
  }
  
  return {
    isValid: requiredValidation.isValid,
    missing: requiredValidation.missing,
    warnings
  }
}

// Validate environment on import (will run on server startup)
if (typeof window === 'undefined') {
  const validation = validateEnvironment()
  
  if (!validation.isValid) {
    console.error('❌ Environment validation failed:')
    console.error('Missing required environment variables:', validation.missing)
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️  Warnings:', validation.warnings)
    }
    
    // In development, show a clear error
    if (process.env.NODE_ENV === 'development') {
      throw new Error(
        `Missing required environment variables: ${validation.missing.join(', ')}\n` +
        `Please copy .env.example to .env and configure the required variables.`
      )
    }
  } else {
    console.log('✅ Environment validation passed')
    if (validation.warnings.length > 0) {
      console.warn('⚠️  Warnings:', validation.warnings)
    }
  }
}
