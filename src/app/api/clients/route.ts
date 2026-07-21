import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'
import { sanitizeMongoQuery, isValidObjectId } from '@/lib/mongodb'
import { applyAPISecurityHeaders, applyCORSHeaders, checkAPIRateLimit } from '@/lib/api-security'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'

// GET all clients
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

    // Sanitize query
    const sanitizedQuery = sanitizeMongoQuery(query)

    const clients = await Client.find(sanitizedQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await Client.countDocuments(sanitizedQuery)

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

// POST create new client
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
    
    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const client = await Client.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      industry: body.industry,
      projectRequirements: body.projectRequirements,
      budget: body.budget,
      status: body.status || 'lead',
      assignedTo: body.assignedTo,
      notes: body.notes,
    })

    return NextResponse.json(
      { message: 'Client created successfully', client },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating client:', error)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  }
}
