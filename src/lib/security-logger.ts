// Security logging system

export enum SecurityEventType {
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST',
  ACCOUNT_LOCKOUT = 'ACCOUNT_LOCKOUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  CSRF_TOKEN_FAILURE = 'CSRF_TOKEN_FAILURE',
  API_ACCESS_DENIED = 'API_ACCESS_DENIED',
  DATA_ACCESS_ATTEMPT = 'DATA_ACCESS_ATTEMPT',
}

export interface SecurityEvent {
  type: SecurityEventType
  timestamp: Date
  userId?: string
  ip: string
  userAgent: string
  path: string
  details?: Record<string, any>
  severity: 'low' | 'medium' | 'high' | 'critical'
}

class SecurityLogger {
  private events: SecurityEvent[] = []
  private maxEvents = 1000 // Keep last 1000 events in memory

  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    }

    this.events.push(securityEvent)
    
    // Keep only the last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents)
    }

    // Log to console based on severity
    const logMethod = this.getLogMethod(event.severity)
    logMethod(`[SECURITY] ${event.type}`, {
      ...event,
      timestamp: securityEvent.timestamp,
    })

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(securityEvent)
    }
  }

  private getLogMethod(severity: SecurityEvent['severity']) {
    switch (severity) {
      case 'critical':
      case 'high':
        return console.error
      case 'medium':
        return console.warn
      case 'low':
      default:
        return console.log
    }
  }

  private sendToMonitoringService(event: SecurityEvent): void {
    // Placeholder for sending to monitoring service (Sentry, Datadog, etc.)
    // In production, implement actual monitoring integration
    if (typeof window !== 'undefined') return // Only run on server
    
    // Example: Send to your monitoring service
    // fetch('https://your-monitoring-service.com/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event),
    // })
  }

  getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events.slice(-limit)
  }

  getEventsByType(type: SecurityEventType): SecurityEvent[] {
    return this.events.filter(event => event.type === type)
  }

  getEventsBySeverity(severity: SecurityEvent['severity']): SecurityEvent[] {
    return this.events.filter(event => event.severity === severity)
  }

  getEventsByUser(userId: string): SecurityEvent[] {
    return this.events.filter(event => event.userId === userId)
  }

  clearOldEvents(olderThanHours: number = 24): void {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000)
    this.events = this.events.filter(event => event.timestamp > cutoff)
  }
}

// Singleton instance
export const securityLogger = new SecurityLogger()

// Convenience functions for common security events
export function logLoginAttempt(userId: string, ip: string, userAgent: string, success: boolean): void {
  securityLogger.log({
    type: success ? SecurityEventType.LOGIN_SUCCESS : SecurityEventType.LOGIN_FAILURE,
    userId,
    ip,
    userAgent,
    path: '/api/auth/login',
    severity: success ? 'low' : 'medium',
    details: { success },
  })
}

export function logRateLimitExceeded(ip: string, userAgent: string, path: string): void {
  securityLogger.log({
    type: SecurityEventType.RATE_LIMIT_EXCEEDED,
    ip,
    userAgent,
    path,
    severity: 'high',
    details: { message: 'Rate limit exceeded' },
  })
}

export function logSuspiciousActivity(ip: string, userAgent: string, path: string, reason: string): void {
  securityLogger.log({
    type: SecurityEventType.SUSPICIOUS_ACTIVITY,
    ip,
    userAgent,
    path,
    severity: 'high',
    details: { reason },
  })
}

export function logAccountLockout(userId: string, ip: string, userAgent: string): void {
  securityLogger.log({
    type: SecurityEventType.ACCOUNT_LOCKOUT,
    userId,
    ip,
    userAgent,
    path: '/api/auth/login',
    severity: 'critical',
    details: { message: 'Account locked due to multiple failed attempts' },
  })
}
