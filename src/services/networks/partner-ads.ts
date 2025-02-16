import axios, { AxiosError } from 'axios'
import { parseStringPromise } from 'xml2js'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import iconv from 'iconv-lite'

// XML response schema
const partnerAdsResponseSchema = z.object({
  program: z.array(z.object({
    programid: z.string(),
    programnavn: z.string(),
    programurl: z.string(),
    programbeskrivelse: z.string(),
    kategorinavn: z.string(),
    provision: z.string(),
    feedcur: z.string().optional(),
    feedmarket: z.string().optional(),
    feedlink: z.string().optional(),
  }))
})

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to handle fetch with rate limit handling
async function fetchWithTimeout(url: string, timeout = 60000, retryCount = 0) {
  try {
    console.log('Attempting to fetch Partner-Ads data...')
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/xml, text/xml, */*',
        'Accept-Charset': 'iso-8859-1',
        'User-Agent': 'Affiliate-Aggregator/1.0',
      },
      responseType: 'arraybuffer', // Get raw buffer to handle encoding manually
      timeout: timeout,
      maxRedirects: 5,
      validateStatus: (status) => status < 400,
    })

    // Convert from ISO-8859-1 to UTF-8
    const convertedData = iconv.decode(response.data, 'iso-8859-1')

    // Check if we received HTML instead of XML
    if (convertedData.trim().toLowerCase().startsWith('<!doctype html')) {
      throw new Error('Received HTML instead of XML. The API might be redirecting to an error page.')
    }

    // Verify we have XML content
    const contentType = response.headers['content-type']
    if (!contentType?.includes('xml') && !convertedData.trim().startsWith('<?xml')) {
      console.error('Unexpected content type:', contentType)
      console.error('Response preview:', convertedData.substring(0, 200))
      throw new Error(`Unexpected content type: ${contentType}. Expected XML.`)
    }

    return { ...response, data: convertedData }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Request failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        contentType: error.response?.headers['content-type'],
        data: error.response?.data?.toString().substring(0, 500) // Log first 500 chars of response
      })

      // Check if it's a rate limit response
      if (
        (error.response?.data?.toString().includes('Data should not be retrieved so frequently')) ||
        error.response?.status === 429
      ) {
        if (retryCount < 3) {
          console.log(`Rate limited. Waiting 60 seconds before retry ${retryCount + 1}/3...`)
          await delay(60000) // Wait 60 seconds
          return fetchWithTimeout(url, timeout, retryCount + 1)
        } else {
          throw new Error('Rate limit exceeded after 3 retries. Please try again later.')
        }
      }
    }
    throw error
  }
}

// Types for error handling
type ErrorDetails = {
  debugInfo: any;
  error: string;
  zodErrors?: z.ZodError['errors'];
  httpError?: {
    status: number;
    statusText: string;
    data: any;
  };
}

export async function fetchPartnerAdsPrograms() {
  let debugInfo: any = {}
  
  try {
    const xmlUrl = process.env.PARTNER_ADS_XML_URL
    if (!xmlUrl) {
      throw new Error('PARTNER_ADS_XML_URL is not set')
    }

    console.log('Fetching Partner-Ads programs from:', xmlUrl)
    const response = await fetchWithTimeout(xmlUrl)
    debugInfo.status = response.status
    debugInfo.headers = response.headers
    console.log('Partner-Ads response status:', response.status)
    console.log('Response headers:', response.headers)

    if (!response.data) {
      throw new Error('No data received from Partner-Ads XML feed')
    }

    // Log raw response
    debugInfo.rawResponseType = typeof response.data
    debugInfo.rawResponsePreview = response.data.substring(0, 500)
    console.log('Raw XML response type:', typeof response.data)
    console.log('Raw XML response first 500 chars:', response.data.substring(0, 500))
    
    // Add debug logging for encoding
    console.log('\nDEBUG - Character encoding check:')
    const sampleText = response.data.toString()
    console.log('1. Raw response encoding test - Looking for æ,ø,å:', 
      sampleText.substring(0, 1000))

    console.log('Parsing XML response...')
    const parsedXml = await parseStringPromise(response.data, {
      explicitArray: false,
      explicitRoot: false,
      trim: true,
      normalizeTags: true,
      normalize: true,
      mergeAttrs: true,
      charkey: 'text',
      emptyTag: '',
      valueProcessors: [
        (value: string) => {
          // First try to normalize the string
          if (typeof value === 'string') {
            // Add debug logging for each string value
            if (value.includes('') || /[æøå]/i.test(value)) {
              console.log('2. During XML parsing - Found special chars in:', value)
            }
            return value.normalize('NFC');
          }
          return value;
        }
      ]
    })
    console.log('XML parsed successfully')
    
    // Add more debug logging after parsing
    if (parsedXml.program && parsedXml.program.length > 0) {
      console.log('3. After XML parsing - Sample program name:', 
        parsedXml.program[0].programnavn)
    }

    debugInfo.parsedXmlKeys = Object.keys(parsedXml)
    debugInfo.fullParsedXml = parsedXml
    console.log('Parsed XML root keys:', Object.keys(parsedXml))
    console.log('Full parsed XML:', JSON.stringify(parsedXml, null, 2))
    
    // Try to find the correct root element
    if (!parsedXml.partnerprogrammer && Object.keys(parsedXml).length > 0) {
      const rootKey = Object.keys(parsedXml)[0]
      debugInfo.availableRootElements = Object.keys(parsedXml)
      debugInfo.rootElementStructure = parsedXml[rootKey]
      console.log('Available root elements:', Object.keys(parsedXml))
      console.log(`Structure of '${rootKey}':`, JSON.stringify(parsedXml[rootKey], null, 2))
    }
    
    // Validate the XML structure
    const validatedData = partnerAdsResponseSchema.parse(parsedXml)
    console.log('XML structure validated')
    
    // Process and normalize the data
    const normalizeText = (text: string): string => {
      try {
        return text.normalize('NFC');
      } catch (e) {
        console.warn('Failed to normalize text:', e);
        return text;
      }
    };

    const programs = validatedData.program.map(program => {
      const normalizedName = normalizeText(program.programnavn)
      // Add debug logging for normalization
      if (program.programnavn.includes('') || /[æøå]/i.test(program.programnavn)) {
        console.log('4. During normalization:', {
          original: program.programnavn,
          normalized: normalizedName
        })
      }
      return {
        programName: normalizedName,
        advertiserName: normalizeText(program.programnavn),
        commissionRate: parseFloat(program.provision.replace('%', '')),
        networkName: 'Partner-Ads',
        category: normalizeText(program.kategorinavn),
        market: program.feedmarket || 'DK',
        url: program.programurl || '',
        logoUrl: '', // Partner-Ads doesn't provide logo URLs
      }
    });

    // Add final debug check
    if (programs.length > 0) {
      console.log('5. Final check - First program:', {
        name: programs[0].programName,
        category: programs[0].category
      })
    }

    console.log(`Successfully parsed ${programs.length} programs`)
    console.log('Starting database operations...')

    // Log a sample program for debugging
    if (programs.length > 0) {
      console.log('Sample program data:', JSON.stringify(programs[0], null, 2));
    }

    // Batch upsert programs
    try {
      const results = await prisma.$transaction(
        programs.map(program => {
          console.log(`Attempting to upsert program: ${program.programName}`);
          return prisma.program.upsert({
            where: {
              programName_networkName: {
                programName: program.programName,
                networkName: program.networkName,
              }
            },
            update: program,
            create: program,
          });
        })
      );

      console.log(`Successfully processed ${results.length} database operations`);
      console.log('Sample result:', JSON.stringify(results[0], null, 2));
      console.log('Successfully saved programs to database');
      
      return {
        success: true,
        count: programs.length,
        message: `Successfully processed ${programs.length} programs from Partner-Ads`,
        data: results
      };
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      throw dbError; // Re-throw to be caught by the outer try-catch
    }
  } catch (error) {
    console.error('Error fetching Partner-Ads programs:', error)
    let errorDetails: ErrorDetails = {
      debugInfo,
      error: error instanceof Error ? error.message : 'Unknown error'
    }

    if (error instanceof z.ZodError) {
      console.error('XML validation error:', JSON.stringify(error.errors, null, 2))
      errorDetails.zodErrors = error.errors
    }
    
    if (error instanceof AxiosError && error.response) {
      console.error('HTTP Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      })
      errorDetails.httpError = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      }
    }

    return {
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : 'Unknown error',
      error: errorDetails
    }
  }
} 