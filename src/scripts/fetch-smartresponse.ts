import { config } from 'dotenv'
import { fetchSmartResponsePrograms } from '../services/networks/smartresponse'

// Load environment variables from .env.local
config({ path: '.env.local' })

async function fetchPrograms() {
  try {
    console.log('Starting SmartResponse program fetch...')
    const result = await fetchSmartResponsePrograms()
    
    if (result.success) {
      console.log(`✓ Successfully fetched ${result.count} programs from SmartResponse`)
      console.log(`✓ ${result.message}`)
    } else {
      console.error('✗ Failed to fetch programs:', result.message)
    }
  } catch (error) {
    console.error('✗ Error:', error instanceof Error ? error.message : 'Unknown error')
  }
}

// Run the script
fetchPrograms() 