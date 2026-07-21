import mongoose, { Schema, model, models } from 'mongoose'

export interface ICustomer {
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  company?: string
  industry?: string
  servicesInterested?: string[]
  budget?: string
  timeline?: string
  status: 'prospect' | 'qualified' | 'converted' | 'lost'
  source?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  lastContact?: Date
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be less than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name must be less than 100 characters'],
    },
    industry: {
      type: String,
      trim: true,
    },
    servicesInterested: {
      type: [String],
      default: [],
    },
    budget: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['prospect', 'qualified', 'converted', 'lost'],
      default: 'prospect',
    },
    source: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes must be less than 1000 characters'],
    },
    lastContact: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
CustomerSchema.index({ email: 1 })
CustomerSchema.index({ status: 1 })
CustomerSchema.index({ createdAt: -1 })
CustomerSchema.index({ company: 1 })

const Customer = models.Customer || model<ICustomer>('Customer', CustomerSchema)

export default Customer
