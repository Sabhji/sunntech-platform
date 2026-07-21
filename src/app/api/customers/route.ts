import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Customer from '@/models/Customer'
import { sanitizeMongoQuery } from '@/lib/mongodb'
import { applyAPISecurityHeaders, applyCORSHeaders, checkAPIRateLimit } from '@/lib/api-security'

// GET all customers
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.next()
    applyAPISecurityHeaders(response)
    applyCORSHeaders(response, request.headers.get('origin') || undefined)

    // Rate limiting
    const ip = request.ip || 'unknown'
    const rateLimit = checkAPIRateLimit(ip, 50)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString() } }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const query: any = {}
    if (status) query.status = status

    const sanitizedQuery = sanitizeMongoQuery(query)

    const customers = await Customer.find(sanitizedQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await Customer.countDocuments(sanitizedQuery)

    return NextResponse.json({
      customers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

// POST create new customer
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.next()
    applyAPISecurityHeaders(response)
    applyCORSHeaders(response, request.headers.get('origin') || undefined)

    // Rate limiting
    const ip = request.ip || 'unknown'
    const rateLimit = checkAPIRateLimit(ip, 20)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString() } }
      )
    }

    const body = await request.json()
    
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const customer = await Customer.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      state: body.state,
      country: body.country,
      zipCode: body.zipCode,
      company: body.company,
      industry: body.industry,
      servicesInterested: body.servicesInterested || [],
      budget: body.budget,
      timeline: body.timeline,
      status: body.status || 'prospect',
      source: body.source,
      notes: body.notes,
    })

    return NextResponse.json(
      { message: 'Customer created successfully', customer },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating customer:', error)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}
