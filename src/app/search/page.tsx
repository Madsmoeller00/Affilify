'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Program } from '@/types/program'
import { ProgramCard } from '@/components/ProgramCard'

export default function SearchPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/programs/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch programs')
        }

        setPrograms(data.data || [])
      } catch (error) {
        console.error('Error fetching programs:', error)
        setPrograms([])
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchPrograms()
    }
  }, [query])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-primary/10 to-transparent pb-16 pt-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-slate-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbage til kategorier
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-primary-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Søgeresultater
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              Viser resultater for "{query}"
            </p>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="border-t border-slate-200 bg-slate-50/50 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-2 text-slate-600">Indlæser programmer...</p>
              </div>
            ) : programs.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-slate-600">Beklager, der er ingen programmer, der matcher din søgning.</p>
              </div>
            ) : (
              programs.map((program) => (
                <ProgramCard 
                  key={`${program.programName}-${program.networkName}`} 
                  program={program} 
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 