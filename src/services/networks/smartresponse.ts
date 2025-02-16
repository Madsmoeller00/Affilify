import axios, { AxiosError } from 'axios'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// API response schema based on documentation
const countrySchema = z.object({
  country_code: z.string(),
  country_abbr: z.string(),
  country_name: z.string()
})

const mediaTypeSchema = z.object({
  media_type_id: z.number(),
  media_type_name: z.string(),
  medium_id: z.number(),
  medium_name: z.string()
})

const creativeTypeSchema = z.object({
  creative_type_id: z.number(),
  creative_type_name: z.string()
})

const creativeSchema = z.object({
  creative_id: z.number(),
  creative_name: z.string(),
  creative_type: creativeTypeSchema,
  unique_link: z.string(),
  creative_download_url: z.string(),
  width: z.number(),
  height: z.number()
})

const offerStatusSchema = z.object({
  offer_status_id: z.number(),
  offer_status_name: z.string()
})

const tagSchema = z.object({
  tag_id: z.number(),
  tag_name: z.string()
})

const campaignSchema = z.object({
  offer_id: z.number(),
  offer_contract_id: z.number(),
  campaign_id: z.number().nullable(),
  offer_name: z.string(),
  vertical_name: z.string(),
  offer_status: offerStatusSchema,
  price: z.number(),
  currency_id: z.number(),
  currency_symbol: z.string(),
  price_converted: z.number(),
  price_format_id: z.number(),
  price_format: z.string(),
  preview_link: z.string(),
  thumbnail_image_url: z.string(),
  allowed_countries: z.array(countrySchema),
  allowed_media_types: z.array(mediaTypeSchema),
  expiration_date: z.string().nullable(),
  tags: z.array(tagSchema),
  advertiser_extended_terms: z.string(),
  hidden: z.boolean(),
  date_created: z.string(),
  price_min: z.number().nullable(),
  price_max: z.number().nullable(),
  percentage_min: z.number().nullable(),
  percentage_max: z.number().nullable()
})

const smartResponseSchema = z.object({
  row_count: z.number(),
  data: z.array(campaignSchema),
  success: z.boolean(),
  message: z.string().nullable()
})

const BASE_URL = 'https://login.smartresponse-media.com'

async function getRequestParams() {
  const apiKey = process.env.SMARTRESPONSE_API_KEY
  const affiliateId = process.env.SMARTRESPONSE_AFFILIATE_ID
  
  if (!apiKey || !affiliateId) {
    throw new Error('SMARTRESPONSE_API_KEY or SMARTRESPONSE_AFFILIATE_ID is not set')
  }

  return {
    api_key: apiKey,
    affiliate_id: affiliateId,
    page: 1,
    page_size: 1000,
    include_hidden: 1,
    include_inactive: 1,
    include_pending: 1,
    include_expired: 1,
    format: 'json'
  }
}

export async function fetchSmartResponsePrograms() {
  try {
    console.log('Fetching SmartResponse campaigns...')
    const params = await getRequestParams()
    console.log('Using params:', { ...params, api_key: '***' })
    
    const url = `${BASE_URL}/affiliates/api/Offers/Feed`
    console.log('Making request to:', url)
    
    const response = await axios.get(url, {
      params,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'AffiliateAggregator/1.0'
      }
    })

    if (!response.data) {
      throw new Error('No data received from SmartResponse API')
    }

    // Validate the response data
    const validatedData = smartResponseSchema.parse(response.data)
    console.log(`Successfully parsed ${validatedData.data.length} campaigns`)

    // Filter programs for Danish market (containing "DK" in name)
    const programs = validatedData.data
      .filter(campaign => campaign.offer_name.includes('DK'))
      .map(campaign => ({
        programName: campaign.offer_name,
        advertiserName: campaign.offer_name,
        commissionRate: campaign.price,
        networkName: 'SmartResponse',
        category: campaign.vertical_name,
        market: 'DK', // Set market explicitly to DK since we filtered for Danish programs
        url: campaign.preview_link,
        logoUrl: campaign.thumbnail_image_url || '',
        currency: campaign.currency_symbol,
        lastUpdated: new Date(),
        createdAt: new Date()
      }))

    console.log(`Filtered ${programs.length} Danish programs`)

    if (programs.length === 0) {
      return {
        success: true,
        count: 0,
        message: 'No programs found from SmartResponse',
        data: []
      }
    }

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
    
    return {
      success: true,
      count: programs.length,
      message: `Successfully processed ${programs.length} programs from SmartResponse`,
      data: results
    }
  } catch (error) {
    console.error('Error fetching SmartResponse programs:', error)
    
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${JSON.stringify(error.errors)}`)
    }

    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    throw error
  }
}
