'use client'

import { useEffect, useState, useRef } from 'react'
/**
 * Lucide Icons - ISC License
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * @license ISC
 * @see https://lucide.dev/license
 */
import { 
  Search, 
  TrendingUp, 
  Tag, 
  Users,
  Car,
  Baby,
  BookOpen,
  Briefcase,
  Shirt,
  Heart,
  Cpu,
  Gamepad2,
  Coins,
  UtensilsCrossed,
  Home,
  PiggyBank,
  Ticket,
  ShoppingBag,
  Dumbbell,
  ClipboardList,
  Plane,
  GraduationCap,
  Component,
  Zap,
  Leaf,
  HeartHandshake
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { Program } from '@/types/program'
import Image from 'next/image'

interface Filters {
  search: string
}

// Add this function before the HomePage component
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: any } = {
    'Køretøjer & Transport': Car,
    'Baby, Børn & Forældre': Baby,
    'Bøger, Litteratur & Kunst': BookOpen,
    'B2B': Briefcase,
    'Tøj, Mode & Accessoires': Shirt,
    'Dating & Voksen': Heart,
    'Elektronik & Teknologi': Cpu,
    'Telefoni, internet, Underholdning, Medie & Spil': Gamepad2,
    'Finans & Krypto': Coins,
    'Mad, Drikke & Fest': UtensilsCrossed,
    'Bolig, Have & Gør-det-selv': Home,
    'Penge & Forsikring': PiggyBank,
    'Lodtrækninger og Konkurrencer': Ticket,
    'Shopping & Gaver': ShoppingBag,
    'Sport, Dyr, Outdoor, Sundhed & Beauty': Dumbbell,
    'Undersøgelser & Markedsføring': ClipboardList,
    'Rejser & Oplevelser': Plane,
    'Arbejde & Uddannelse': GraduationCap,
    'Energi & Utility': Zap,
    'Bæredygtighed & Miljø': Leaf,
    'Non-Profit & Velgørenhed': HeartHandshake
  }

  const IconComponent = iconMap[category] || Component
  return IconComponent
}

export default function HomePage() {
  const router = useRouter()
  const [categories, setCategories] = useState<string[]>([])
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    search: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Program[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch suggestions when typing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([])
        return
      }

      try {
        const response = await fetch(`/api/programs/search?q=${encodeURIComponent(searchTerm)}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch suggestions')
        }

        setSuggestions(data.data.slice(0, 5)) // Limit to 5 suggestions
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchSuggestions()
    }, 300) // Debounce by 300ms

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch categories')
        }

        setCategories(data.data)
        setFilteredCategories(data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
        setFilteredCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = categories

    if (filters.search) {
      filtered = filtered.filter(category =>
        category.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredCategories(filtered)
  }, [filters, categories])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleSuggestionClick = (programName: string) => {
    setSearchTerm(programName)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(programName)}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="relative bg-muted pb-16 pt-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Affiliate programmer i Danmark
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Vi samler alle affiliate marketing programmer i Danmark. Find de bedste affiliate programmer i Danmark og få inspiration til nye kampagner.
            </p>
            <div className="w-full max-w-4xl">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1" ref={searchContainerRef}>
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Søg programmer..."
                    className="w-full pl-10 h-12 bg-background border-input focus:border-ring focus:ring-ring"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-background rounded-md shadow-lg max-h-60 overflow-auto border border-input">
                      {suggestions.map((program) => (
                        <button
                          key={`${program.programName}-${program.networkName}`}
                          className="w-full px-4 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none"
                          onClick={() => handleSuggestionClick(program.programName)}
                        >
                          <div className="font-medium text-foreground">{program.programName}</div>
                          <div className="text-sm text-muted-foreground">
                            {program.networkName} • {program.category}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Networks Carousel */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center text-foreground mb-8">
            Samlet fra nedenstående affiliate netværk
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8 py-4">
              {/* First set of logos */}
              <div className="flex space-x-8 items-center">
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dzkuih3hn/image/upload/v1738423123/logo-2_umguvy.png"
                    alt="Adtraction"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dzkuih3hn/image/upload/v1738423123/image001_gtdv6j.png"
                    alt="SmartResponse"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dzkuih3hn/image/upload/v1738423123/partner-ads-e1645176923536_ldzxov.png"
                    alt="PartnerAds"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="logo urs"
                    alt="Dasiycon"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://your-logo-url-5.com/logo.png"
                    alt="Salesstring"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
              {/* Duplicate set for seamless scrolling */}
              <div className="flex space-x-8 items-center">
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dzkuih3hn/image/upload/v1738423123/logo-2_umguvy.png"
                    alt="Adtraction"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dzkuih3hn/image/upload/v1738423123/image001_gtdv6j.png"
                    alt="SmartResponse"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dzkuih3hn/image/upload/v1738423123/partner-ads-e1645176923536_ldzxov.png"
                    alt="PartnerAds"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://your-logo-url-4.com/logo.png"
                    alt="Dasiycon"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="w-[200px] h-[80px] relative bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://your-logo-url-5.com/logo.png"
                    alt="Salesstring"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="border-t border-slate-200 bg-slate-50/50 py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter text-slate-900">Søg i kategorier</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-2 text-slate-600">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">No categories found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredCategories.map((category) => {
                const CategoryIcon = getCategoryIcon(category)
                return (
                  <Link
                    key={category}
                    href={`/category/${encodeURIComponent(category)}`}
                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                  >
                    <div className="flex items-center space-x-4">
                      <CategoryIcon className="h-6 w-6 text-primary group-hover:text-primary/80" />
                      <h3 className="font-medium text-slate-900">{category}</h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 