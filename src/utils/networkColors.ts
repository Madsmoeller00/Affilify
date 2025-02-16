// Network color mapping for consistent styling across components
export const networkColors: Record<string, { bg: string; text: string }> = {
  'Adtraction': { bg: 'bg-[#0D1E79]/10', text: 'text-[#0D1E79]' },
  'SmartResponse': { bg: 'bg-[#004147]/10', text: 'text-[#004147]' },
  'Partner-Ads': { bg: 'bg-[#1F95D3]/10', text: 'text-[#1F95D3]' }
}

// Helper function to get network style with fallback
export function getNetworkStyle(networkName: string) {
  return networkColors[networkName] || { bg: 'bg-gray-100', text: 'text-gray-800' }
} 