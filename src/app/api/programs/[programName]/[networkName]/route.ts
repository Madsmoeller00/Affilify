import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { programName: string; networkName: string } }
) {
  try {
    const { programName, networkName } = params

    const program = await prisma.program.findFirst({
      where: {
        programName: decodeURIComponent(programName),
        networkName: decodeURIComponent(networkName),
      },
    })

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: program,
    })
  } catch (error) {
    console.error('Error fetching program:', error)
    return NextResponse.json(
      { error: 'Failed to fetch program' },
      { status: 500 }
    )
  }
} 