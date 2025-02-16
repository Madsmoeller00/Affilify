import { Program } from '@/types/program'
import Link from 'next/link'
import { getNetworkStyle } from '@/utils/networkColors'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  const programSlug = encodeURIComponent(`${program.programName}---${program.networkName}`)
  const networkStyle = getNetworkStyle(program.networkName)

  return (
    <Link href={`/program/${programSlug}`}>
      <Card className="h-full hover:shadow-primary/5">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{program.programName}</h3>
              <p className="text-sm text-slate-600">{program.advertiserName}</p>
            </div>
            <div className={`px-3 py-1 text-sm font-medium rounded-full ${networkStyle.bg} ${networkStyle.text}`}>
              {program.networkName}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Category</span>
              <span className="text-sm font-medium text-slate-900">{program.category}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 