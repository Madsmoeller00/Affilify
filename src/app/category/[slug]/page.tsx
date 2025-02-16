'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Program } from '@/types/program'
import { ProgramCard } from '@/components/ProgramCard'
import { Button } from '@/components/ui/button'

type PageProps = {
  params: Promise<{ slug: string }>
}

function CategoryPageContent({ categoryName }: { categoryName: string }) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/programs?categoryMapping=${encodeURIComponent(categoryName)}`)
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

    fetchPrograms()
  }, [categoryName])

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
              {categoryName}
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              Find affiliate prorgammer i {categoryName}
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="border-t border-slate-200 bg-slate-50/50 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-2 text-slate-600">Henter programmer...</p>
              </div>
            ) : programs.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-slate-600">Ingen programmer fundet i denne kategori.</p>
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

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const categoryName = decodeURIComponent(resolvedParams.slug)
  
  return <CategoryPageContent categoryName={categoryName} />
} 