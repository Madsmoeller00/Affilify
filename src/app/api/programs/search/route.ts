import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ data: [] })
    }

    const programs = await prisma.program.findMany({
      where: {
        OR: [
          { programName: { contains: query, mode: 'insensitive' } },
          { advertiserName: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { categoryMapping: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        programName: 'asc',
      },
    })

    return NextResponse.json({
      data: programs,
    })
  } catch (error) {
    console.error('Error searching programs:', error)
    return NextResponse.json(
      { error: 'Failed to search programs' },
      { status: 500 }
    )
  }
} 