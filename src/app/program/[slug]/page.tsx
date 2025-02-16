'use client'

import { useEffect, useState, use } from 'react'
import { Program } from '@/types/program'
import { notFound } from 'next/navigation'
import { getNetworkStyle } from '@/utils/networkColors'

export default function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const [programName, networkName] = decodeURIComponent(resolvedParams.slug).split('---')
        const response = await fetch(`/api/programs/${encodeURIComponent(programName)}/${encodeURIComponent(networkName)}`)
        if (!response.ok) {
          throw new Error('Program not found')
        }
        const data = await response.json()
        setProgram(data.data)
      } catch (error) {
        console.error('Error fetching program:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProgram()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading program...</p>
        </div>
      </div>
    )
  }

  if (!program) {
    return notFound()
  }

  const networkStyle = getNetworkStyle(program.networkName)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{program.programName}</h1>
              <p className="text-xl text-gray-600 mt-2">{program.advertiserName}</p>
            </div>
            <span className={`px-4 py-2 text-lg font-medium ${networkStyle.bg} ${networkStyle.text} rounded-full`}>
              {program.networkName}
            </span>
          </div>

          {/* Program Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Program Details</h2>
                {program.currency && (
                  <p className="text-sm text-gray-600 mt-1">Currency: {program.currency}</p>
                )}
                {program.cookieDuration && (
                  <p className="text-sm text-gray-600">Cookie Duration: {program.cookieDuration} days</p>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Category</h2>
                <p className="text-xl text-gray-800">{program.category}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Market</h2>
                <p className="text-xl text-gray-800">{program.market}</p>
              </div>
            </div>

            <div className="space-y-4">
              {program.logoUrl && (
                <div>
                  <img 
                    src={program.logoUrl} 
                    alt={`${program.programName} logo`}
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              {program.feed && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Feed</h2>
                  <p className="text-gray-700">This program provides a product feed</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          {program.url && (
            <div className="mt-8 text-center">
              <a
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Program
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 