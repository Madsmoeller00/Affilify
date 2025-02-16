import { config } from 'dotenv'
import { fetchPartnerAdsPrograms } from '../services/networks/partner-ads'

// Load environment variables from .env.local
config({ path: '.env.local' })

async function fetchPrograms() {
  try {
    console.log('Starting Partner-Ads program fetch...')
    const result = await fetchPartnerAdsPrograms()
    
    if (result.success) {
      console.log(`✓ Successfully fetched ${result.count} programs from Partner-Ads`)
      console.log(`✓ ${result.message}`)
    } else {
      console.error('✗ Failed to fetch programs:', result.message)
      if (result.error) {
        console.error('Error details:', result.error)
      }
    }
  } catch (error) {
    console.error('✗ Error:', error instanceof Error ? error.message : 'Unknown error')
  }
}

// Run the script
fetchPrograms() 