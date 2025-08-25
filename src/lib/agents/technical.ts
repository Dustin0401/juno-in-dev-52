import { BaseAgent } from './base'
import type { TechnicalScore, MarketContext, UserProfile } from '@/types'

export class TechnicalAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Technical',
      weight: 0.3,
      timeout: 5000
    })
  }

  async analyze(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile,
    attachments?: File[]
  ): Promise<TechnicalScore> {
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 2000))

    // If chart image is attached, analyze it
    if (attachments && attachments.length > 0) {
      return this.analyzeChart(attachments[0], query)
    }

    // Extract asset and timeframe
    const asset = this.extractAsset(query)
    const timeframe = this.extractTimeframe(query)
    
    // Mock price data (in real implementation, fetch from API)
    const currentPrice = this.getMockPrice(asset)
    
    // Generate support/resistance levels
    const supportLevels = this.generateSupportLevels(currentPrice)
    const resistanceLevels = this.generateResistanceLevels(currentPrice)
    
    // Mock technical indicators
    const rsi = Math.random() * 100
    const macdSignal = (Math.random() - 0.5) * 2
    const trendStrength = Math.random() * 2 - 1
    const volumeProfile = Math.random()
    
    // Calculate technical score
    const rsiScore = rsi > 70 ? -1 : rsi < 30 ? 1 : 0
    const macdScore = macdSignal
    const trendScore = trendStrength
    const volumeScore = volumeProfile > 0.6 ? 0.5 : volumeProfile < 0.3 ? -0.5 : 0
    
    const rawScore = (rsiScore * 0.25 + macdScore * 0.3 + trendScore * 0.35 + volumeScore * 0.1)
    const score = this.normalizeScore(rawScore)
    
    const confidence = this.calculateConfidence([rsiScore, macdScore, trendScore, volumeScore])
    
    const patterns = this.detectPatterns(rsi, macdSignal, trendStrength)
    const highlights = this.generateHighlights(rsi, macdSignal, trendStrength, patterns)
    
    return {
      score,
      confidence: Math.round(confidence),
      highlights,
      sources: ["tradingview.com", "coingecko.com", "binance.com"],
      levels: {
        support: supportLevels,
        resistance: resistanceLevels
      },
      patterns
    }
  }

  private async analyzeChart(chartFile: File, query: string): Promise<TechnicalScore> {
    // In real implementation, this would use vision AI to analyze the chart
    // For now, return mock analysis
    
    const mockPrice = 45000 + Math.random() * 10000
    
    return {
      score: (Math.random() - 0.5) * 4,
      confidence: Math.round(60 + Math.random() * 30),
      highlights: [
        "Chart shows ascending triangle pattern",
        "Volume confirming breakout attempt",
        "RSI showing bullish divergence"
      ],
      sources: ["Chart Analysis", "Pattern Recognition"],
      levels: {
        support: [mockPrice * 0.95, mockPrice * 0.92],
        resistance: [mockPrice * 1.05, mockPrice * 1.08]
      },
      patterns: ["Ascending Triangle", "Bullish Divergence"]
    }
  }

  private extractAsset(query: string): string {
    const assetRegex = /\b(BTC|ETH|SOL|AVAX|MATIC|ARB|DOGE|ADA|DOT|LINK)\b/i
    const match = query.match(assetRegex)
    return match ? match[0].toUpperCase() : 'BTC'
  }

  private extractTimeframe(query: string): string {
    const timeframeRegex = /\b(1h|4h|1d|1w|1M)\b/i
    const match = query.match(timeframeRegex)
    return match ? match[0] : '1d'
  }

  private getMockPrice(asset: string): number {
    const prices: Record<string, number> = {
      'BTC': 45000,
      'ETH': 3000,
      'SOL': 180,
      'AVAX': 45,
      'MATIC': 1.2,
      'ARB': 2.1
    }
    return prices[asset] || 45000
  }

  private generateSupportLevels(price: number): number[] {
    return [
      Math.round(price * 0.95),
      Math.round(price * 0.92),
      Math.round(price * 0.88)
    ]
  }

  private generateResistanceLevels(price: number): number[] {
    return [
      Math.round(price * 1.05),
      Math.round(price * 1.08),
      Math.round(price * 1.12)
    ]
  }

  private detectPatterns(rsi: number, macd: number, trend: number): string[] {
    const patterns = []
    
    if (rsi < 30 && macd > 0) patterns.push("Bullish Divergence")
    if (rsi > 70 && macd < 0) patterns.push("Bearish Divergence")
    if (trend > 0.5) patterns.push("Strong Uptrend")
    if (trend < -0.5) patterns.push("Strong Downtrend")
    if (Math.abs(trend) < 0.2) patterns.push("Sideways Consolidation")
    
    return patterns
  }

  private generateHighlights(rsi: number, macd: number, trend: number, patterns: string[]): string[] {
    const highlights = []
    
    if (rsi > 70) highlights.push(`RSI overbought at ${rsi.toFixed(1)}`)
    if (rsi < 30) highlights.push(`RSI oversold at ${rsi.toFixed(1)}`)
    if (Math.abs(macd) > 1) highlights.push(`Strong MACD ${macd > 0 ? 'bullish' : 'bearish'} signal`)
    if (patterns.length > 0) highlights.push(`Pattern: ${patterns[0]}`)
    
    return highlights
  }
}