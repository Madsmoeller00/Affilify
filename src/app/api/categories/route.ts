import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.program.findMany({
      select: {
        categoryMapping: true,
      },
      where: {
        categoryMapping: {
          not: null,
        },
      },
      distinct: ['categoryMapping'],
    })

    const uniqueCategories = categories
      .map(c => c.categoryMapping)
      .filter((c): c is string => c !== null)
      .sort()

    return NextResponse.json({
      data: uniqueCategories,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
} 