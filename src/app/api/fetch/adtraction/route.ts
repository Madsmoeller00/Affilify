import { NextRequest, NextResponse } from 'next/server'
import { fetchAdtractionPrograms } from '@/services/networks/adtraction'
import axios from 'axios'

export async function GET(request: NextRequest) {
  try {
    console.log('Starting Adtraction fetch request...')
    
    // Fetch and process programs
    const result = await fetchAdtractionPrograms()
    console.log('Fetch result:', JSON.stringify(result))
    
    if (!result) {
      console.error('No result returned from fetchAdtractionPrograms')
      return NextResponse.json({
        success: false,
        count: 0,
        message: 'No result returned from fetchAdtractionPrograms'
      })
    }
    
    // Return the result directly, it's already in the correct format
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in Adtraction fetch route:', error)
    
    // Add detailed error logging
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      })
    }
    
    const errorResponse = {
      success: false,
      count: 0,
      message: axios.isAxiosError(error) 
        ? `Adtraction API error: ${error.response?.data?.message || error.message}`
        : error instanceof Error 
          ? error.message 
          : 'Unknown error occurred',
      error: error instanceof Error ? {
        type: error.constructor.name,
        message: error.message
      } : 'Unknown error'
    }

    return NextResponse.json(errorResponse)
  }
} 