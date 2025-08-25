import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface SentimentData {
  name: string
  value: number
  color: string
}

interface SentimentChartProps {
  bullishPercent: number
  bearishPercent: number
  neutralPercent: number
  fearGreedIndex: number
  socialVolume: number
}

export function SentimentChart({ 
  bullishPercent, 
  bearishPercent, 
  neutralPercent, 
  fearGreedIndex,
  socialVolume 
}: SentimentChartProps) {
  const sentimentData: SentimentData[] = [
    { name: 'Bullish', value: bullishPercent, color: 'hsl(var(--chart-1))' },
    { name: 'Bearish', value: bearishPercent, color: 'hsl(var(--chart-2))' },
    { name: 'Neutral', value: neutralPercent, color: 'hsl(var(--chart-3))' }
  ]

  const getFearGreedLabel = (index: number) => {
    if (index <= 20) return 'Extreme Fear'
    if (index <= 40) return 'Fear'
    if (index <= 60) return 'Neutral'
    if (index <= 80) return 'Greed'
    return 'Extreme Greed'
  }

  const getFearGreedColor = (index: number) => {
    if (index <= 20) return 'text-red-500'
    if (index <= 40) return 'text-orange-500'
    if (index <= 60) return 'text-yellow-500'
    if (index <= 80) return 'text-green-500'
    return 'text-green-600'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Market Sentiment</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value) => [`${value}%`, 'Sentiment']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Fear & Greed Index</h3>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-foreground">{fearGreedIndex}</div>
            <div className={`text-lg font-medium ${getFearGreedColor(fearGreedIndex)}`}>
              {getFearGreedLabel(fearGreedIndex)}
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress value={fearGreedIndex} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Extreme Fear</span>
              <span>Extreme Greed</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Social Volume</span>
              <span className="text-sm font-medium text-foreground">
                {socialVolume.toLocaleString()} mentions
              </span>
            </div>
            <Progress value={(socialVolume / 10000) * 100} className="h-2 mt-2" />
          </div>
        </div>
      </Card>
    </div>
  )
}