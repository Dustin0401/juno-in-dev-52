import { BaseAgent } from './base'
import type { AgentScore, MarketContext, UserProfile } from '@/types'
import { anthropicClient } from '@/lib/anthropic'

export class SentimentAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Sentiment',
      weight: 0.2,
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
      const asset = this.extractAsset(query)
      const systemPrompt = `You are a cryptocurrency sentiment analysis agent. Analyze market sentiment for ${asset}.

Return a JSON response with:
- score: number between -2 (very bearish) and 2 (very bullish)
- confidence: number 0-100
- highlights: array of 2-4 key sentiment insights
- sources: array of relevant data source names

Focus on social media sentiment, fear/greed indicators, funding rates, and market psychology.`

      const userMessage = `Analyze sentiment for ${asset}. Query: "${query}". Current market context: ${context.risk_regime}, news heat: ${context.news_heat}, chain activity: ${context.chain_activity_heat}.`

      const response = await anthropicClient.sendMessage([
        { role: 'user', content: userMessage }
      ], systemPrompt)

      // Parse AI response
      const result = JSON.parse(response)
      return {
        score: this.normalizeScore(result.score),
        confidence: Math.max(0, Math.min(100, result.confidence)),
        highlights: result.highlights || [],
        sources: result.sources || ["AI Analysis"]
      }
    } catch (error) {
      console.error('Sentiment AI analysis failed:', error)
      return this.analyzeMock(query, context, userProfile)
    }
  }

  private async analyzeMock(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile
  ): Promise<AgentScore> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Extract asset from query
    const asset = this.extractAsset(query)
    
    // Mock sentiment analysis
    const fearGreedIndex = Math.random() * 100
    const socialVolume = Math.random() * 100
    const influencerSentiment = (Math.random() - 0.5) * 4 // -2 to 2
    const fundingRate = (Math.random() - 0.5) * 0.02 // -1% to 1%
    
    // Calculate composite score
    const fearGreedScore = (fearGreedIndex - 50) / 25 // Convert to -2 to 2
    const fundingScore = -fundingRate * 100 // Invert funding (high funding = bearish)
    
    const rawScore = (fearGreedScore * 0.4 + influencerSentiment * 0.4 + fundingScore * 0.2)
    const score = this.normalizeScore(rawScore)
    
    const confidence = this.calculateConfidence([fearGreedScore, influencerSentiment, fundingScore])
    
    // Generate highlights based on data
    const highlights = []
    if (fearGreedIndex < 25) highlights.push("Extreme fear in market sentiment")
    if (fearGreedIndex > 75) highlights.push("Extreme greed detected")
    if (Math.abs(fundingRate) > 0.01) highlights.push(`${fundingRate > 0 ? 'High positive' : 'Negative'} funding rates`)
    if (socialVolume > 70) highlights.push("High social media volume")
    
    return {
      score,
      confidence: Math.round(confidence),
      highlights,
      sources: ["@trader123", "reddit.com/r/bitcoin", "cryptofear.com", "coinglass.com"]
    }
  }

  private extractAsset(query: string): string {
    const assetRegex = /\b(BTC|ETH|SOL|AVAX|MATIC|ARB|DOGE|ADA|DOT|LINK)\b/i
    const match = query.match(assetRegex)
    return match ? match[0].toUpperCase() : 'BTC'
  }
}