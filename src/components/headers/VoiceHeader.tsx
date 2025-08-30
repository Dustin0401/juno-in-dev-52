import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Waves, TrendingUp, TrendingDown, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VoiceHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

const mockMarketData = [
  { coin: 'BTC', price: '$43,250', change: '+2.3%', sentiment: 'bullish' },
  { coin: 'ETH', price: '$2,580', change: '+0.8%', sentiment: 'neutral' },
  { coin: 'SOL', price: '$98.5', change: '-1.2%', sentiment: 'bearish' },
  { coin: 'ADA', price: '$0.52', change: '+4.1%', sentiment: 'bullish' },
  { coin: 'MATIC', price: '$0.89', change: '-0.5%', sentiment: 'neutral' },
  { coin: 'AVAX', price: '$36.8', change: '+1.9%', sentiment: 'bullish' }
]

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish':
      return <TrendingUp className="w-4 h-4 text-accent" />
    case 'bearish':
      return <TrendingDown className="w-4 h-4 text-destructive" />
    default:
      return <Zap className="w-4 h-4 text-warning" />
  }
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish':
      return 'text-accent'
    case 'bearish':
      return 'text-destructive'
    default:
      return 'text-warning'
  }
}

export function VoiceHeader({ sidebarOpen, onToggleSidebar }: VoiceHeaderProps) {
  const [pulseOpen, setPulseOpen] = useState(false)

  return (
    <PageHeader sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar}>
      <Popover open={pulseOpen} onOpenChange={setPulseOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 hover:bg-surface">
            <Waves className="w-4 h-4" />
            Live Market Pulse
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="center">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Waves className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Live Market Pulse</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {mockMarketData.map((item) => (
                  <div
                    key={item.coin}
                    className="p-3 rounded-lg bg-surface/50 border border-line hover:bg-surface/80 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{item.coin}</span>
                      {getSentimentIcon(item.sentiment)}
                    </div>
                    <div className="text-sm text-muted">{item.price}</div>
                    <div className={cn("text-sm font-medium", getSentimentColor(item.sentiment))}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-line">
                <div className="flex justify-center">
                  <Button variant="ghost" size="sm" className="text-xs text-muted">
                    Last updated: 2 mins ago
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </PageHeader>
  )
}