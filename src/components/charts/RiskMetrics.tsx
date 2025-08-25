import React from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, TrendingUp, Shield } from 'lucide-react'

interface RiskMetricsProps {
  riskScore: number // 0-100
  betaValue: number
  varValue: number // Value at Risk
  correlationBTC: number
  diversificationScore: number
  concentrationRisk: number
}

export function RiskMetrics({ 
  riskScore, 
  betaValue, 
  varValue, 
  correlationBTC,
  diversificationScore,
  concentrationRisk 
}: RiskMetricsProps) {
  const riskData = [
    { name: 'Risk Score', value: riskScore, fill: 'hsl(var(--chart-1))' }
  ]

  const getRiskLevel = (score: number) => {
    if (score <= 25) return { label: 'Low Risk', color: 'text-green-500', icon: Shield }
    if (score <= 50) return { label: 'Medium Risk', color: 'text-yellow-500', icon: TrendingUp }
    if (score <= 75) return { label: 'High Risk', color: 'text-orange-500', icon: AlertTriangle }
    return { label: 'Very High Risk', color: 'text-red-500', icon: AlertTriangle }
  }

  const risk = getRiskLevel(riskScore)
  const RiskIcon = risk.icon

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Risk Score Radial Chart */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Portfolio Risk Score</h3>
        <div className="relative h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" data={riskData}>
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="hsl(var(--primary))"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{riskScore}</div>
              <div className={`text-sm font-medium ${risk.color} flex items-center gap-1 justify-center`}>
                <RiskIcon className="w-4 h-4" />
                {risk.label}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Risk Metrics */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Risk Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Beta (vs Market)</span>
              <span className="text-sm font-medium text-foreground">{betaValue.toFixed(2)}</span>
            </div>
            <Progress value={(betaValue / 2) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Value at Risk (1d)</span>
              <span className="text-sm font-medium text-foreground">{varValue.toFixed(2)}%</span>
            </div>
            <Progress value={Math.abs(varValue) * 2} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">BTC Correlation</span>
              <span className="text-sm font-medium text-foreground">{correlationBTC.toFixed(2)}</span>
            </div>
            <Progress value={(correlationBTC + 1) * 50} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Diversification Score</span>
              <span className="text-sm font-medium text-foreground">{diversificationScore}/10</span>
            </div>
            <Progress value={diversificationScore * 10} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Concentration Risk</span>
              <span className="text-sm font-medium text-foreground">{concentrationRisk.toFixed(1)}%</span>
            </div>
            <Progress value={concentrationRisk} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  )
}