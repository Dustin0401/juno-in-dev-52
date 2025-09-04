import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PortfolioHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
}

const timePeriods = [
  { label: '1D', value: '1d' },
  { label: '7D', value: '7d' },
  { label: '1M', value: '1m' },
  { label: 'All Time', value: 'all' }
]

export function PortfolioHeader({ sidebarOpen, onToggleSidebar, selectedPeriod = '1d', onPeriodChange }: PortfolioHeaderProps) {

  return (
    <PageHeader sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar}>
      <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
        {timePeriods.map((period) => (
          <Button
            key={period.value}
            variant="ghost"
            size="sm"
            onClick={() => onPeriodChange?.(period.value)}
            className={cn(
              "h-8 px-3 text-sm transition-colors",
              selectedPeriod === period.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted hover:text-foreground hover:bg-background/50"
            )}
          >
            {period.label}
          </Button>
        ))}
      </div>
    </PageHeader>
  )
}