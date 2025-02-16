"use client"

import { Search } from "lucide-react"

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <Search className="h-6 w-6 rotate-12 text-rose-500" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-semibold tracking-tight text-gray-800">Affilify</span>
    </div>
  )
} 