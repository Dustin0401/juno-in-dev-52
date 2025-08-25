import { BaseAgent } from './base'
import type { AgentScore, MarketContext, UserProfile } from '@/types'
import { anthropicClient } from '@/lib/anthropic'

export class MacroAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Macro',
      weight: 0.25,
      timeout: 5000
    })
  }

  async analyze(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile
  ): Promise<AgentScore> {
    // Try to use real AI analysis if API key is available
    if (anthropicClient.hasApiKey()) {
      return this.analyzeWithAI(query, context, userProfile)
    }
    
    // Fallback to mock data
    return this.analyzeMock(query, context, userProfile)
  }

  private async analyzeWithAI(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile
  ): Promise<AgentScore> {
    try {
      const systemPrompt = `You are a macroeconomic analysis agent for cryptocurrency markets. Analyze macro factors affecting crypto.

Return a JSON response with:
- score: number between -2 (very bearish) and 2 (very bullish)
- confidence: number 0-100
- highlights: array of 2-4 key macro insights
- sources: array of relevant data source names

Focus on USD strength, interest rates, inflation, risk sentiment, traditional market correlations.`

      const userMessage = `Analyze macro environment for crypto. Query: "${query}". Current market: ${context.risk_regime}, market hours: ${context.market_clock}, news heat: ${context.news_heat}.`

      const response = await anthropicClient.sendMessage([
        { role: 'user', content: userMessage }
      ], systemPrompt)

      const result = JSON.parse(response)
      return {
        score: this.normalizeScore(result.score),
        confidence: Math.max(0, Math.min(100, result.confidence)),
        highlights: result.highlights || [],
        sources: result.sources || ["AI Analysis"]
      }
    } catch (error) {
      console.error('Macro AI analysis failed:', error)
      return this.analyzeMock(query, context, userProfile)
    }
  }

  private async analyzeMock(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile
  ): Promise<AgentScore> {
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))

    // Mock macro indicators
    const dxyTrend = (Math.random() - 0.5) * 2 // -1 to 1
    const yieldCurve = Math.random() * 0.02 - 0.01 // -1% to 1%
    const realYields = Math.random() * 0.04 - 0.02 // -2% to 2%
    const spxCorrelation = Math.random() * 2 - 1 // -1 to 1
    const vixLevel = Math.random() * 50 + 10 // 10 to 60
    
    // Calculate macro score
    const dxyScore = -dxyTrend // Strong dollar = bearish for crypto
    const rateScore = -realYields * 50 // High real yields = bearish
    const riskOnScore = spxCorrelation > 0.5 ? 1 : -1 // High correlation in risk-on = bullish
    const volatilityScore = vixLevel > 30 ? -1 : 0.5 // High VIX = bearish
    
    const rawScore = (dxyScore * 0.3 + rateScore * 0.3 + riskOnScore * 0.25 + volatilityScore * 0.15)
    const score = this.normalizeScore(rawScore)
    
    const confidence = this.calculateConfidence([dxyScore, rateScore, riskOnScore, volatilityScore])
    
    const highlights = []
    if (Math.abs(dxyTrend) > 0.5) highlights.push(`${dxyTrend > 0 ? 'Strong' : 'Weak'} USD momentum`)
    if (yieldCurve < 0) highlights.push("Inverted yield curve signals recession risk")
    if (realYields > 0.01) highlights.push("High real yields pressuring risk assets")
    if (vixLevel > 30) highlights.push("Elevated volatility regime")
    if (spxCorrelation > 0.7) highlights.push("High crypto-equity correlation")
    
    return {
      score,
      confidence: Math.round(confidence),
      highlights,
      sources: ["fed.com", "treasury.gov", "bloomberg.com", "tradingview.com"]
    }
  }
}