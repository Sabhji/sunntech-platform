import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Global mongoose instance to prevent multiple connections in development
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Security: Sanitize MongoDB queries to prevent injection
export function sanitizeMongoQuery(query: any): any {
  if (!query || typeof query !== 'object') return query
  
  const sanitized: any = {}
  
  for (const key in query) {
    // Remove potentially dangerous operators
    if (key.startsWith('$')) {
      continue
    }
    
    const value = query[key]
    
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeMongoQuery(value)
    } else if (typeof value === 'string') {
      // Remove MongoDB operators from strings
      sanitized[key] = value.replace(/^\$/, '')
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

// Security: Validate MongoDB ObjectId
export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id)
}

// Security: Escape user input for MongoDB
export function escapeMongoInput(input: string): string {
  return input.replace(/[$.]/g, '')
}

export default connectDB
