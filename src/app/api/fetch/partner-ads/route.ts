import { NextRequest, NextResponse } from 'next/server'
import { fetchPartnerAdsPrograms } from '@/services/networks/partner-ads'

export async function GET(request: NextRequest) {
  try {
    // Fetch and process programs
    const result = await fetchPartnerAdsPrograms()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in Partner-Ads fetch route:', error)
    
    return NextResponse.json({
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 