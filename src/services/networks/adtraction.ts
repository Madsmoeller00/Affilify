import axios from 'axios'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// API response schema based on official documentation
const adtractionProgramSchema = z.object({
  programId: z.number(),
  programName: z.string(),
  programURL: z.string().optional(), // URL field is optional as per API response
  market: z.string(),
  currency: z.string().optional(),
  feed: z.boolean().optional(),
  pendingActive: z.boolean().optional(),
  cookieDuration: z.number().optional(),
  logoURL: z.string().optional(),
  categoryName: z.string(),
  epc: z.number().optional(), // EPC (Earnings Per Click)
  commissions: z.array(z.object({
    value: z.number(),
    id: z.number(),
    name: z.string(),
    transactionType: z.number(),
    type: z.string()
  })).optional()
})

const adtractionResponseSchema = z.array(adtractionProgramSchema)

const marketSchema = z.object({
  market: z.string(),
  marketName: z.string(),
  marketId: z.number()
})

const marketsResponseSchema = z.array(marketSchema)

const MARKET_ID = {
  DK: 12 // Denmark's market ID
}

const BASE_URL = 'https://api.adtraction.com/v2'

export async function fetchAdtractionPrograms() {
  try {
    console.log('Starting Adtraction program fetch...')
    const apiKey = process.env.ADTRACTION_API_KEY
    if (!apiKey) {
      console.error('ADTRACTION_API_KEY is not set')
      return {
        success: false,
        count: 0,
        message: 'ADTRACTION_API_KEY is not set'
      }
    }

    console.log('Configuring axios instance...')
    // Configure axios with default headers for all requests
    const axiosInstance = axios.create({
      headers: {
        'X-Token': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    })
    
    // First, get all markets to verify API key and connection
    const marketsUrl = `${BASE_URL}/affiliate/markets`
    console.log('Fetching markets from:', marketsUrl)
    
    const marketsResponse = await axiosInstance.get(marketsUrl)
    console.log('Markets response status:', marketsResponse.status)
    
    if (!marketsResponse.data) {
      console.error('No data received from markets endpoint')
      return {
        success: false,
        count: 0,
        message: 'No data received from markets endpoint'
      }
    }
    
    console.log('Markets response data:', marketsResponse.data)
    const markets = marketsResponseSchema.parse(marketsResponse.data)
    console.log('Available markets:', markets)

    // Find Danish market to confirm it exists
    const danishMarket = markets.find(m => m.marketId === MARKET_ID.DK)
    if (!danishMarket) {
      console.error('Danish market not found in available markets')
      return {
        success: false,
        count: 0,
        message: 'Danish market not found in available markets'
      }
    }
    console.log('Found Danish market:', danishMarket)

    // Now fetch programs for Danish market
    const programsUrl = `${BASE_URL}/affiliate/programs?market=DK`
    console.log('Fetching programs from:', programsUrl)
    
    const response = await axiosInstance.get(programsUrl)
    console.log('Programs response status:', response.status)
    
    if (!response.data) {
      console.error('No data received from programs endpoint')
      return {
        success: false,
        count: 0,
        message: 'No data received from programs endpoint'
      }
    }
    
    console.log('Programs response data:', response.data)
    const parsedData = adtractionResponseSchema.parse(response.data)
    console.log(`Successfully parsed ${parsedData.length} programs`)

    // Process and normalize the data
    const programs = parsedData.map(program => ({
      programName: program.programName,
      advertiserName: program.programName,
      networkName: 'Adtraction',
      category: program.categoryName,
      commissionRate: program.commissions?.[0]?.value || 0,
      epc: program.epc || 0, // Use actual EPC data from Adtraction
      market: program.market,
      url: program.programURL || '',
      logoUrl: program.logoURL || '',
      cookieDuration: program.cookieDuration || null,
      currency: program.currency || null,
      feed: program.feed || false,
      pendingActive: program.pendingActive || false,
      lastUpdated: new Date(),
      createdAt: new Date()
    }))

    console.log(`Processed ${programs.length} programs, starting database operations...`)
    
    try {
      // Batch upsert programs
      const results = await prisma.$transaction(
        programs.map(program => 
          prisma.program.upsert({
            where: {
              programName_networkName: {
                programName: program.programName,
                networkName: program.networkName,
              }
            },
            update: program,
            create: program,
          })
        )
      )
      
      console.log('Successfully saved programs to database')
      
      return {
        success: true,
        count: programs.length,
        message: `Successfully processed ${programs.length} Danish programs from Adtraction`,
        data: results
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      return {
        success: false,
        count: 0,
        message: `Database error: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`,
        error: dbError
      }
    }
  } catch (error) {
    console.error('Error in Adtraction service:', error)
    
    if (axios.isAxiosError(error)) {
      console.error('Full error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        url: error.config?.url
      })
      
      return {
        success: false,
        count: 0,
        message: `Adtraction API error: ${error.response?.data?.message || error.message}`,
        error: {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        }
      }
    }
    
    if (error instanceof z.ZodError) {
      console.error('Zod validation error:', error.errors)
      return {
        success: false,
        count: 0,
        message: `Data validation error: ${error.errors.map(e => e.message).join(', ')}`,
        error: {
          validation: error.errors
        }
      }
    }
    
    return {
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    }
  }
} 