import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        // Lazy load dependencies to prevent build-time evaluation
        const connectDB = (await import('@/lib/mongodb')).default
        const User = (await import('@/models/User')).default
        const { logLoginAttempt, logAccountLockout } = await import('@/lib/security-logger')

        try {
          await connectDB()
        } catch (error) {
          console.error('MongoDB connection error:', error)
          throw new Error('Database connection failed. Please check your environment variables.')
        }

        try {
          const user = await User.findOne({ email: credentials.email.toLowerCase() })

          if (!user) {
            logLoginAttempt('unknown', 'unknown', 'unknown', false)
            throw new Error('Invalid email or password')
          }

          // Check if account is locked
          if (user.isLocked()) {
            logAccountLockout(user._id.toString(), 'unknown', 'unknown')
            throw new Error('Account is temporarily locked due to multiple failed attempts')
          }

          // Check if account is active
          if (!user.isActive) {
            throw new Error('Account has been deactivated')
          }

          // Verify password
          const isPasswordValid = await user.comparePassword(credentials.password)

          if (!isPasswordValid) {
            user.incrementFailedLogin()
            await user.save()
            logLoginAttempt(user._id.toString(), 'unknown', 'unknown', false)
            throw new Error('Invalid email or password')
          }

          // Reset failed login attempts on successful login
          user.resetFailedLogin()
          await user.save()
          logLoginAttempt(user._id.toString(), 'unknown', 'unknown', true)

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          if (error instanceof Error && (error.message === 'Invalid email or password' || error.message === 'Account has been deactivated' || error.message === 'Account is temporarily locked due to multiple failed attempts')) {
            throw error
          }
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
