import mongoose, { Schema, model, models } from 'mongoose'
import { hashPassword, verifyPassword } from '@/lib/auth-security'

export interface IUser {
  email: string
  password: string
  name?: string
  role: 'freelancer' | 'company' | 'admin'
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  isActive: boolean
  failedLoginAttempts: number
  lockUntil?: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    name: {
      type: String,
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be less than 100 characters'],
    },
    role: {
      type: String,
      enum: ['freelancer', 'company', 'admin'],
      default: 'freelancer',
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Security: Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  try {
    this.password = await hashPassword(this.password)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Security: Method to verify password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return verifyPassword(password, this.password)
}

// Security: Check if account is locked
UserSchema.methods.isLocked = function (): boolean {
  return !!(this.lockUntil && this.lockUntil > new Date())
}

// Security: Increment failed login attempts
UserSchema.methods.incrementFailedLogin = function (): void {
  this.failedLoginAttempts += 1
  
  // Lock account after 5 failed attempts
  if (this.failedLoginAttempts >= 5) {
    this.lockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  }
}

// Security: Reset failed login attempts on successful login
UserSchema.methods.resetFailedLogin = function (): void {
  this.failedLoginAttempts = 0
  this.lockUntil = undefined
  this.lastLogin = new Date()
}

const User = models.User || model<IUser>('User', UserSchema)

export default User
