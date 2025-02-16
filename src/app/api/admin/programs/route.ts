import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sortField = (searchParams.get('sortField') || 'createdAt') as keyof typeof prisma.program.fields
    const sortDirection = (searchParams.get('sortDirection') || 'desc') as 'asc' | 'desc'

    // Calculate skip value for pagination
    const skip = (page - 1) * limit

    // Build sort object
    const orderBy: Prisma.ProgramOrderByWithRelationInput = {
      [sortField]: sortDirection,
    }

    console.log('Fetching programs with params:', { page, limit, sortField, sortDirection, skip })

    // Get total count for pagination
    const total = await prisma.program.count()
    console.log('Total programs in database:', total)

    // Fetch programs with their commissions
    const programs = await prisma.program.findMany({
      skip,
      take: limit,
      orderBy,
      include: {
        commissions: true,
      },
    })

    console.log('Found programs:', programs.length)

    const response = {
      programs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }

    console.log('Sending response:', { total, page, totalPages: Math.ceil(total / limit) })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 