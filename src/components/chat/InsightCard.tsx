import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, LineChart, PieChart, BarChart3, ExternalLink } from 'lucide-react'
import type { AgentResponse, MarketView, Recommendation } from '@/types'
import { TradingChart } from '@/components/charts/TradingChart'
import { SentimentChart } from '@/components/charts/SentimentChart'
import { PerformanceChart } from '@/components/charts/PerformanceChart'
import { RiskMetrics } from '@/components/charts/RiskMetrics'

interface InsightCardProps {
  response: AgentResponse
}

export function InsightCard({ response }: InsightCardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getBiasColor = (bias: string) => {
    switch (bias.toLowerCase()) {
      case 'bullish': return 'text-green-500'
      case 'bearish': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  const getBiasIcon = (bias: string) => {
    switch (bias.toLowerCase()) {
      case 'bullish': return TrendingUp
      case 'bearish': return TrendingDown
      default: return AlertTriangle
    }
  }

  // Mock chart data - in production this would come from the response
  const generateMockChartData = () => {
    const data = []
    const basePrice = 45000
    for (let i = 0; i < 30; i++) {
      const price = basePrice + (Math.random() - 0.5) * 5000 + (i * 100)
      data.push({
        time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: Math.max(price, 0),
        volume: Math.random() * 1000 + 500,
        ma20: price * (0.98 + Math.random() * 0.04),
        ma50: price * (0.96 + Math.random() * 0.08)
      })
    }
    return data
  }

  const generateMockPerformanceData = () => {
    const data = []
    let portfolioValue = 0
    let benchmarkValue = 0
    for (let i = 0; i < 12; i++) {
      portfolioValue += (Math.random() - 0.4) * 10
      benchmarkValue += (Math.random() - 0.45) * 8
      data.push({
        date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        portfolio: portfolioValue,
        benchmark: benchmarkValue,
        drawdown: Math.min(0, portfolioValue * (Math.random() * 0.1))
      })
    }
    return data
  }

  const chartData = generateMockChartData()
  const performanceData = generateMockPerformanceData()

  return (
    <Card className="p-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-border/50 overflow-hidden">
      <div className="p-6 pb-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-background/50 ${getBiasColor(response.market_view.bias)}`}>
              {React.createElement(getBiasIcon(response.market_view.bias), { className: "w-5 h-5" })}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {response.market_view.asset} Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                {response.market_view.timeframe} • Confidence: {response.market_view.conviction}%
              </p>
            </div>
          </div>
          <Badge 
            variant={response.market_view.bias.toLowerCase() === 'bullish' ? 'default' : 
                    response.market_view.bias.toLowerCase() === 'bearish' ? 'destructive' : 'secondary'}
            className="px-3 py-1"
          >
            {response.market_view.bias}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Sentiment
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Performance
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0 space-y-6">
            {/* Agent Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {response.agent_evidence.map((agent, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/30 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {agent.agent}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`text-lg font-bold ${
                      agent.score > 0.5 ? 'text-green-500' : 
                      agent.score < -0.5 ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {agent.score > 0 ? '+' : ''}{agent.score.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {agent.confidence}%
                    </div>
                  </div>
                  <Progress 
                    value={((agent.score + 2) / 4) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>

            {/* Key Levels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Support Levels</h4>
                {response.market_view.key_levels.support.map((level, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm text-muted-foreground">S{index + 1}</span>
                    <span className="font-medium text-green-500">${level.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Resistance Levels</h4>
                {response.market_view.key_levels.resistance.map((level, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-sm text-muted-foreground">R{index + 1}</span>
                    <span className="font-medium text-red-500">${level.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Recommendations */}
            {response.recommendations.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Trading Recommendations</h4>
                {response.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background/30 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{rec.type}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        R/R: {rec.r_r}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Entry: </span>
                        <span className="font-medium text-foreground">{rec.entry_zone}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Targets: </span>
                        <span className="font-medium text-green-500">{rec.targets.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Stop: </span>
                        <span className="font-medium text-red-500">{rec.invalidation}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{rec.fit_for_user}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground leading-relaxed">
                {response.summary}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export JSON
                </Button>
                <Button variant="outline" size="sm">
                  Share Analysis
                </Button>
              </div>
              <Button variant="default" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Simulate Trade
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="mt-0">
            <TradingChart 
              data={chartData}
              asset={response.market_view.asset}
              timeframe={response.market_view.timeframe}
              showVolume={true}
              indicators={['ma20', 'ma50']}
            />
          </TabsContent>

          <TabsContent value="sentiment" className="mt-0">
            <SentimentChart 
              bullishPercent={45}
              bearishPercent={30}
              neutralPercent={25}
              fearGreedIndex={65}
              socialVolume={8500}
            />
          </TabsContent>

          <TabsContent value="performance" className="mt-0">
            <div className="space-y-6">
              <PerformanceChart 
                data={performanceData}
                totalReturn={12.5}
                sharpeRatio={1.8}
                maxDrawdown={-8.2}
                winRate={65.5}
                volatility={18.3}
              />
              <RiskMetrics 
                riskScore={72}
                betaValue={1.2}
                varValue={-5.8}
                correlationBTC={0.75}
                diversificationScore={6.5}
                concentrationRisk={35}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  )
}