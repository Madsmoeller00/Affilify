'use client'

import { useEffect, useState } from 'react'
import { Program, Commission } from '@prisma/client'

type SortConfig = {
  field: keyof Program
  direction: 'asc' | 'desc'
}

export default function AdminPage() {
  const [programs, setPrograms] = useState<(Program & { commissions: Commission[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'createdAt', direction: 'desc' })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedProgram, setSelectedProgram] = useState<(Program & { commissions: Commission[] }) | null>(null)

  const fetchPrograms = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sortField: sortConfig.field,
        sortDirection: sortConfig.direction,
      })
      
      console.log('Fetching programs with params:', params.toString())
      const response = await fetch(`/api/admin/programs?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch programs')
      }

      if (!data.programs) {
        throw new Error('No programs data received')
      }

      console.log('Received programs:', data.programs.length)
      setPrograms(data.programs)
      setTotalPages(Math.ceil(data.total / 10))
    } catch (error) {
      console.error('Error fetching programs:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch programs')
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [page, sortConfig])

  const handleSort = (field: keyof Program) => {
    setSortConfig(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Database Admin</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={fetchPrograms}
              className="mt-2 bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Admin</h1>
        
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading programs...</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No programs found in the database
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['programName', 'advertiserName', 'networkName', 'category', 'market', 'createdAt'].map((field) => (
                      <th
                        key={field}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort(field as keyof Program)}
                      >
                        {field}
                        {sortConfig.field === field && (
                          <span className="ml-2">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{program.programName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{program.advertiserName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{program.networkName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{program.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{program.market}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {new Date(program.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedProgram(program)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 