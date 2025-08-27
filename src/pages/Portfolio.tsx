import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  Activity,
  Target,
  BarChart3,
  AlertTriangle
} from 'lucide-react'

// Mock portfolio data
const mockPortfolioData = {
  totalValue: 125420.50,
  totalPnL: 8230.25,
  totalPnLPercent: 7.03,
  positions: [
    { symbol: 'BTC', amount: 2.5, value: 112500, pnl: 7200, pnlPercent: 6.84, allocation: 89.7 },
    { symbol: 'ETH', amount: 4.2, value: 12600, pnl: 1030, pnlPercent: 8.91, allocation: 10.0 },
    { symbol: 'SOL', amount: 1.8, value: 320.50, pnl: 0.25, pnlPercent: 0.08, allocation: 0.3 }
  ],
  riskMetrics: { volatility: 32.4, sharpe: 1.85, maxDrawdown: -12.3, beta: 0.92 }
}

export default function Portfolio() {
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  const formatPercent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`

  return (
    <div className="h-full p-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Portfolio</h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-muted" /><span className="text-sm text-muted">Total Value</span></div>
            <div className="text-2xl font-bold">{formatCurrency(mockPortfolioData.totalValue)}</div>
          </CardContent></Card>
          
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-accent" /><span className="text-sm text-muted">Total P&L</span></div>
            <div className="text-2xl font-bold text-accent">{formatCurrency(mockPortfolioData.totalPnL)}</div>
            <div className="text-sm text-accent">{formatPercent(mockPortfolioData.totalPnLPercent)}</div>
          </CardContent></Card>
          
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><Activity className="w-5 h-5 text-muted" /><span className="text-sm text-muted">Volatility</span></div>
            <div className="text-2xl font-bold">{mockPortfolioData.riskMetrics.volatility}%</div>
          </CardContent></Card>
          
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-muted" /><span className="text-sm text-muted">Sharpe</span></div>
            <div className="text-2xl font-bold">{mockPortfolioData.riskMetrics.sharpe}</div>
          </CardContent></Card>
        </div>

        {/* Positions */}
        <Card>
          <CardHeader><CardTitle>Positions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPortfolioData.positions.map((position) => (
                <div key={position.symbol} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center font-medium">{position.symbol}</div>
                    <div><div className="font-medium">{position.symbol}</div><div className="text-sm text-muted">{position.amount} tokens</div></div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(position.value)}</div>
                    <div className={`text-sm ${position.pnl > 0 ? 'text-accent' : 'text-destructive'}`}>{formatPercent(position.pnlPercent)}</div>
                  </div>
                  <Progress value={position.allocation} className="w-20" />
                  <Button size="sm" variant="hero">Analyze</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}