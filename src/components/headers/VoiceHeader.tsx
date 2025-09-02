import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Waves, TrendingUp, TrendingDown, Zap, Search } from 'lucide-react'
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
  { coin: 'AVAX', price: '$36.8', change: '+1.9%', sentiment: 'bullish' },
  { coin: 'DOT', price: '$7.45', change: '+1.2%', sentiment: 'bullish' },
  { coin: 'ATOM', price: '$12.8', change: '-0.8%', sentiment: 'neutral' },
  { coin: 'LINK', price: '$15.2', change: '+3.1%', sentiment: 'bullish' },
  { coin: 'UNI', price: '$6.8', change: '-1.5%', sentiment: 'bearish' },
  { coin: 'AAVE', price: '$95.3', change: '+2.7%', sentiment: 'bullish' },
  { coin: 'NEAR', price: '$3.2', change: '+1.8%', sentiment: 'bullish' },
  { coin: 'FTM', price: '$0.48', change: '-2.1%', sentiment: 'bearish' },
  { coin: 'ALGO', price: '$0.32', change: '+0.9%', sentiment: 'neutral' },
  { coin: 'VET', price: '$0.028', change: '+4.5%', sentiment: 'bullish' },
  { coin: 'XTZ', price: '$1.15', change: '-1.8%', sentiment: 'bearish' },
  { coin: 'ICP', price: '$12.5', change: '+2.4%', sentiment: 'bullish' },
  { coin: 'FLOW', price: '$0.85', change: '+1.1%', sentiment: 'neutral' },
  { coin: 'MANA', price: '$0.48', change: '+5.2%', sentiment: 'bullish' },
  { coin: 'SAND', price: '$0.42', change: '+3.8%', sentiment: 'bullish' },
  { coin: 'ENJ', price: '$0.38', change: '-0.7%', sentiment: 'neutral' },
  { coin: 'CHZ', price: '$0.095', change: '+2.1%', sentiment: 'bullish' },
  { coin: 'THETA', price: '$1.28', change: '-1.3%', sentiment: 'bearish' },
  { coin: 'FIL', price: '$5.8', change: '+1.6%', sentiment: 'bullish' }
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
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredMarketData = mockMarketData.filter(item =>
    item.coin.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              
              <div className="mb-3">
                <Command>
                  <CommandInput 
                    placeholder="Search altcoins..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="h-8"
                  />
                </Command>
              </div>
              
              <ScrollArea className="h-60">
                <div className="grid grid-cols-2 gap-2">
                  {filteredMarketData.map((item) => (
                    <div
                      key={item.coin}
                      className="p-2 rounded-lg bg-surface/50 border border-line hover:bg-surface/80 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground text-xs">{item.coin}</span>
                        {getSentimentIcon(item.sentiment)}
                      </div>
                      <div className="text-xs text-muted">{item.price}</div>
                      <div className={cn("text-xs font-medium", getSentimentColor(item.sentiment))}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
                {filteredMarketData.length === 0 && (
                  <div className="text-center text-muted text-sm py-4">
                    No coins found matching "{searchQuery}"
                  </div>
                )}
              </ScrollArea>
              
              <div className="mt-3 pt-3 border-t border-line">
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