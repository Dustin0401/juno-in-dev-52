import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TradingChartProps {
  data: Array<{
    time: string
    price: number
    volume: number
    ma20?: number
    ma50?: number
  }>
  asset: string
  timeframe: string
  showVolume?: boolean
  indicators?: string[]
}

export function TradingChart({ 
  data, 
  asset, 
  timeframe, 
  showVolume = true, 
  indicators = [] 
}: TradingChartProps) {
  const currentPrice = data[data.length - 1]?.price || 0
  const previousPrice = data[data.length - 2]?.price || 0
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = ((priceChange / previousPrice) * 100)

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-foreground">{asset}/USD</h3>
          <Badge variant={priceChange >= 0 ? "default" : "destructive"}>
            {timeframe}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            ${currentPrice.toLocaleString()}
          </div>
          <div className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
            />
            {indicators.includes('ma20') && (
              <Line 
                type="monotone" 
                dataKey="ma20" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
            {indicators.includes('ma50') && (
              <Line 
                type="monotone" 
                dataKey="ma50" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showVolume && (
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="hsl(var(--muted-foreground))" 
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.3}
              />
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}