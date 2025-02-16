import { NextResponse } from 'next/server'
import { fetchSmartResponsePrograms } from '@/services/networks/smartresponse'
import { AxiosError } from 'axios'

export async function GET() {
  try {
    const result = await fetchSmartResponsePrograms()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in SmartResponse fetch route:', error)
    
    if (error instanceof AxiosError) {
      const status = error.response?.status || 500
      const errorMessage = error.response?.data?.message || error.message
      
      return NextResponse.json({
        success: false,
        message: errorMessage,
        error: error.response?.data || error.message
      }, { status })
    }
    
    // Handle any other type of error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({
      success: false,
      message: errorMessage,
      error: errorMessage
    }, { status: 500 })
  }
}
