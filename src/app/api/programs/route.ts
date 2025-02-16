import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ProgramQueryParams } from '@/types/program'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  category: z.string().optional(),
  networkName: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryMapping = searchParams.get('categoryMapping')

    const programs = await prisma.program.findMany({
      where: {
        categoryMapping: categoryMapping || undefined,
      },
      orderBy: {
        programName: 'asc',
      },
    })

    return NextResponse.json({
      data: programs,
    })
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
} 