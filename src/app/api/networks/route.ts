import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get distinct network names from the database
    const networks = await prisma.program.findMany({
      select: {
        networkName: true,
      },
      distinct: ['networkName'],
      orderBy: {
        networkName: 'asc',
      },
    })

    // Extract and sort network names
    const uniqueNetworks = networks
      .map(n => n.networkName)
      .filter(Boolean)

    return NextResponse.json({
      success: true,
      data: uniqueNetworks
    })
  } catch (error) {
    console.error('Error fetching networks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch networks' },
      { status: 500 }
    )
  }
} 