import { z } from 'zod'

// Zod schema for validation
export const ProgramSchema = z.object({
  id: z.string(),
  programName: z.string(),
  advertiserName: z.string(),
  networkName: z.string(),
  category: z.string(),
  url: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
  cookieDuration: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  market: z.string(),
  feed: z.boolean().nullable().optional(),
  pendingActive: z.boolean().nullable().optional(),
  lastUpdated: z.date(),
  createdAt: z.date()
})

// TypeScript type derived from Zod schema
export type Program = z.infer<typeof ProgramSchema>

// API response types
export type ProgramsResponse = {
  programs: Program[]
  total: number
  page: number
  totalPages: number
}

// Query parameters type
export type ProgramQueryParams = {
  page?: number
  limit?: number
  category?: string
  networkName?: string
  sort?: string
  search?: string
} 