import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PerformanceData {
  date: string
  portfolio: number
  benchmark: number
  drawdown: number
}

interface PerformanceChartProps {
  data: PerformanceData[]
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  volatility: number
}

export function PerformanceChart({ 
  data, 
  totalReturn, 
  sharpeRatio, 
  maxDrawdown, 
  winRate,
  volatility 
}: PerformanceChartProps) {
  const metrics = [
    { label: 'Total Return', value: `${totalReturn > 0 ? '+' : ''}${totalReturn.toFixed(2)}%`, positive: totalReturn > 0 },
    { label: 'Sharpe Ratio', value: sharpeRatio.toFixed(2), positive: sharpeRatio > 1 },
    { label: 'Max Drawdown', value: `${maxDrawdown.toFixed(2)}%`, positive: maxDrawdown > -10 },
    { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, positive: winRate > 50 },
    { label: 'Volatility', value: `${volatility.toFixed(1)}%`, positive: volatility < 20 }
  ]

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
            <div className={`text-lg font-semibold ${
              metric.positive ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Portfolio Performance Chart */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Portfolio Performance</h3>
          <div className="flex gap-2">
            <Badge variant="outline">Portfolio</Badge>
            <Badge variant="secondary">Benchmark</Badge>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value, name) => [`${Number(value).toFixed(2)}%`, name === 'portfolio' ? 'Portfolio' : 'Benchmark']}
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stackId="1"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="portfolio"
                stackId="2"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Drawdown Chart */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Drawdown Analysis</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Drawdown']}
              />
              <Bar 
                dataKey="drawdown" 
                fill="hsl(var(--chart-2))"
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}