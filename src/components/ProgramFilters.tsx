import { ProgramQueryParams } from '@/types/program'

interface ProgramFiltersProps {
  filters: ProgramQueryParams
  onFilterChange: (filters: ProgramQueryParams) => void
  categories: string[]
  networks: string[]
}

export function ProgramFilters({ 
  filters, 
  onFilterChange, 
  categories, 
  networks 
}: ProgramFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search programs..."
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={filters.category || ''}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="network" className="block text-sm font-medium text-gray-700">
          Network
        </label>
        <select
          id="network"
          value={filters.networkName || ''}
          onChange={(e) => onFilterChange({ ...filters, networkName: e.target.value || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Networks</option>
          {networks.map((network) => (
            <option key={network} value={network}>
              {network}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
} 