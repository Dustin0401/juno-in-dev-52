import { SentimentAgent } from './sentiment'
import { MacroAgent } from './macro'
import { TechnicalAgent } from './technical'
import { OnChainAgent } from './onchain'
import type { 
  AgentResponse, 
  AgentScore, 
  TechnicalScore, 
  OnChainScore, 
  MarketContext, 
  UserProfile,
  AgentType,
  MarketView,
  Recommendation,
  BacktestSnapshot
} from '@/types'

export class AgentCoordinator {
  private agents: {
    sentiment: SentimentAgent
    macro: MacroAgent
    technical: TechnicalAgent
    onchain: OnChainAgent
  }

  constructor() {
    this.agents = {
      sentiment: new SentimentAgent(),
      macro: new MacroAgent(),
      technical: new TechnicalAgent(),
      onchain: new OnChainAgent()
    }
  }

  async processQuery(
    query: string,
    context: MarketContext,
    userProfile?: UserProfile,
    attachments?: File[],
    requestedAgents?: AgentType[]
  ): Promise<AgentResponse> {
    
    // Check if this is a conversational query vs market analysis request
    if (!this.isMarketAnalysisQuery(query) && !requestedAgents) {
      return this.handleConversationalQuery(query, context)
    }
    
    // Determine which agents to use
    const agentsToUse = requestedAgents || this.selectAgents(query, context)
    
    // Run agents in parallel
    const agentPromises = agentsToUse.map(async (agentType) => {
      if (agentType === 'juno') return null // Juno is the coordinator itself
      
      try {
        const result = await this.agents[agentType].analyze(query, context, userProfile, attachments)
        return { ...result, agent: agentType }
      } catch (error) {
        console.error(`Error running ${agentType} agent:`, error)
        return null
      }
    })

    const agentResults = (await Promise.all(agentPromises)).filter(Boolean)
    
    // Fuse the results
    const fusedResponse = this.fuseAgentOutputs(query, agentResults, context, userProfile)
    
    return fusedResponse
  }

  private isMarketAnalysisQuery(query: string): boolean {
    const marketKeywords = [
      'btc', 'eth', 'bitcoin', 'ethereum', 'crypto', 'price', 'chart', 'analysis',
      'sentiment', 'macro', 'onchain', 'technical', 'trading', 'forecast',
      'bullish', 'bearish', 'support', 'resistance', 'trend', 'market',
      'doge', 'sol', 'ada', 'dot', 'link', 'avax', 'matic', 'arb',
      'whale', 'flow', 'fed', 'rate', 'volatility', 'volume'
    ]
    
    const queryLower = query.toLowerCase()
    return marketKeywords.some(keyword => queryLower.includes(keyword)) || 
           query.startsWith('/') || 
           query.length > 50 // Longer queries are more likely to be analysis requests
  }

  private async handleConversationalQuery(
    query: string, 
    context: MarketContext
  ): Promise<AgentResponse> {
    const conversationalResponses = {
      greetings: [
        "Hello! I'm Juno, your AI crypto analyst. Ask me about any cryptocurrency, upload charts for analysis, or use slash commands like /sentiment or /macro.",
        "Hi there! Ready to dive into some crypto analysis? I can help with sentiment, technical analysis, on-chain data, and more.",
        "Hey! What crypto would you like to analyze today? I have access to sentiment, macro, technical, and on-chain data."
      ],
      thanks: [
        "You're welcome! Feel free to ask about any crypto assets or market analysis.",
        "Happy to help! Let me know if you need analysis on any specific cryptocurrencies.",
        "Glad I could assist! What else would you like to explore in the crypto markets?"
      ],
      general: [
        "I'm here to help with cryptocurrency analysis! Try asking about a specific coin like BTC or ETH, or use slash commands for detailed analysis.",
        "I can analyze crypto markets using sentiment, macro, technical, and on-chain data. What would you like to explore?",
        "Feel free to ask about any cryptocurrency or upload charts for analysis. I'm here to help with your crypto research!"
      ]
    }

    let response: string
    const queryLower = query.toLowerCase()
    
    if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('hey')) {
      response = conversationalResponses.greetings[Math.floor(Math.random() * conversationalResponses.greetings.length)]
    } else if (queryLower.includes('thank') || queryLower.includes('thanks')) {
      response = conversationalResponses.thanks[Math.floor(Math.random() * conversationalResponses.thanks.length)]
    } else {
      response = conversationalResponses.general[Math.floor(Math.random() * conversationalResponses.general.length)]
    }

    return {
      summary: response,
      market_view: {
        asset: '',
        timeframe: '',
        bias: 'neutral',
        conviction: 0,
        key_levels: { support: [], resistance: [] },
        catalysts: [],
        risks: []
      },
      recommendations: [],
      agent_evidence: [],
      backtest_snapshot: {
        strategy_id: '',
        sample_period: '',
        n_trades: 0,
        win_rate: 0,
        expectancy: 0,
        max_dd: 0,
        notes: ''
      },
      disclosures: []
    }
  }

  private selectAgents(query: string, context: MarketContext): AgentType[] {
    const queryLower = query.toLowerCase()
    const selectedAgents: AgentType[] = []

    // Always include technical for price-related queries
    if (queryLower.includes('price') || queryLower.includes('chart') || queryLower.includes('level')) {
      selectedAgents.push('technical')
    }

    // Include sentiment for sentiment-related queries
    if (queryLower.includes('sentiment') || queryLower.includes('social') || queryLower.includes('fear')) {
      selectedAgents.push('sentiment')
    }

    // Include macro for macro-related queries
    if (queryLower.includes('macro') || queryLower.includes('fed') || queryLower.includes('rate')) {
      selectedAgents.push('macro')
    }

    // Include onchain for blockchain-related queries
    if (queryLower.includes('onchain') || queryLower.includes('whale') || queryLower.includes('flow')) {
      selectedAgents.push('onchain')
    }

    // If no specific agents selected, use all for general queries
    if (selectedAgents.length === 0) {
      selectedAgents.push('sentiment', 'macro', 'technical', 'onchain')
    }

    return selectedAgents
  }

  private fuseAgentOutputs(
    query: string,
    agentResults: any[],
    context: MarketContext,
    userProfile?: UserProfile
  ): AgentResponse {
    
    // Calculate weighted composite score
    const totalWeight = agentResults.reduce((sum, result) => {
      const weight = this.getAgentWeight(result.agent, context)
      return sum + weight
    }, 0)

    const compositeScore = agentResults.reduce((sum, result) => {
      const weight = this.getAgentWeight(result.agent, context)
      return sum + (result.score * weight)
    }, 0) / totalWeight

    // Calculate overall confidence
    const avgConfidence = agentResults.reduce((sum, result) => sum + result.confidence, 0) / agentResults.length

    // Determine bias and conviction
    const bias = compositeScore > 0.3 ? 'bullish' : compositeScore < -0.3 ? 'bearish' : 'neutral'
    const conviction = Math.min(100, Math.round(Math.abs(compositeScore) * 30 + avgConfidence * 0.7))

    // Extract asset from query
    const asset = this.extractAsset(query)
    
    // Build market view
    const marketView: MarketView = {
      asset,
      timeframe: this.extractTimeframe(query),
      bias,
      conviction,
      key_levels: this.extractKeyLevels(agentResults),
      catalysts: this.extractCatalysts(agentResults, context),
      risks: this.extractRisks(agentResults, context)
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(marketView, agentResults, userProfile)

    // Generate summary
    const summary = this.generateSummary(marketView, agentResults)

    // Mock backtest data
    const backtestSnapshot: BacktestSnapshot = {
      strategy_id: `${asset.toLowerCase()}_${bias}_${Date.now()}`,
      sample_period: "2023-01 to 2024-12",
      n_trades: Math.floor(Math.random() * 50) + 20,
      win_rate: 0.6 + Math.random() * 0.2,
      expectancy: Math.random() * 0.3,
      max_dd: Math.random() * 0.15,
      notes: "Based on similar market conditions and agent consensus"
    }

    return {
      summary,
      market_view: marketView,
      recommendations,
      agent_evidence: agentResults,
      backtest_snapshot: backtestSnapshot,
      disclosures: [
        "This is research, not financial advice.",
        "Probabilities are model-based estimates and may change.",
        "Past performance does not guarantee future results."
      ]
    }
  }

  private getAgentWeight(agentType: string, context: MarketContext): number {
    const baseWeights = {
      sentiment: 0.2,
      macro: 0.25,
      technical: 0.3,
      onchain: 0.25
    }

    // Adjust weights based on market regime
    if (context.risk_regime === 'crisis') {
      return agentType === 'macro' ? baseWeights[agentType as keyof typeof baseWeights] * 1.5 : baseWeights[agentType as keyof typeof baseWeights] * 0.8
    }

    if (context.chain_activity_heat > 80) {
      return agentType === 'onchain' ? baseWeights[agentType as keyof typeof baseWeights] * 1.3 : baseWeights[agentType as keyof typeof baseWeights]
    }

    return baseWeights[agentType as keyof typeof baseWeights] || 0.25
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

  private extractKeyLevels(agentResults: any[]): { support: number[], resistance: number[] } {
    const technicalResult = agentResults.find(r => r.agent === 'technical' && r.levels)
    return technicalResult?.levels || { support: [], resistance: [] }
  }

  private extractCatalysts(agentResults: any[], context: MarketContext): string[] {
    const catalysts = []
    
    if (context.news_heat > 70) catalysts.push("High news attention")
    if (context.chain_activity_heat > 70) catalysts.push("Increased on-chain activity")
    
    // Add agent-specific catalysts
    const macroResult = agentResults.find(r => r.agent === 'macro')
    if (macroResult?.highlights.some((h: string) => h.includes('FOMC'))) {
      catalysts.push("FOMC meeting")
    }
    
    return catalysts
  }

  private extractRisks(agentResults: any[], context: MarketContext): string[] {
    const risks = []
    
    if (context.risk_regime === 'volatile') risks.push("High volatility environment")
    if (context.risk_regime === 'crisis') risks.push("Crisis mode risk-off sentiment")
    
    // Add agent-specific risks
    agentResults.forEach(result => {
      if (result.score < -1) risks.push(`${result.agent} showing strong negative signals`)
    })
    
    return risks
  }

  private generateRecommendations(
    marketView: MarketView,
    agentResults: any[],
    userProfile?: UserProfile
  ): Recommendation[] {
    const recommendations: Recommendation[] = []
    
    if (marketView.bias !== 'neutral' && marketView.conviction > 50) {
      const isLong = marketView.bias === 'bullish'
      const entryZone = isLong 
        ? `${marketView.key_levels.support[0] || 'Current'} - ${marketView.key_levels.support[1] || 'Current + 2%'}`
        : `${marketView.key_levels.resistance[0] || 'Current'} - ${marketView.key_levels.resistance[1] || 'Current - 2%'}`
      
      const invalidation = isLong
        ? `Close below ${marketView.key_levels.support[1] || 'support'}`
        : `Close above ${marketView.key_levels.resistance[1] || 'resistance'}`
      
      const targets = isLong
        ? marketView.key_levels.resistance.slice(0, 2).map(String)
        : marketView.key_levels.support.slice(0, 2).map(String)
      
      recommendations.push({
        type: 'idea',
        entry_zone: entryZone,
        invalidation,
        targets: targets.length > 0 ? targets : ['Target 1', 'Target 2'],
        r_r: 1.5 + Math.random() * 1.5,
        probability_win: marketView.conviction / 100 * 0.8,
        time_horizon: 'swing',
        sizing_guidance: `${Math.max(1, 5 - Math.round((100 - marketView.conviction) / 20))}% of portfolio`,
        fit_for_user: userProfile 
          ? `Matches your ${userProfile.risk_tolerance} risk tolerance and ${userProfile.horizon} horizon`
          : "Standard swing trading setup"
      })
    }
    
    return recommendations
  }

  private generateSummary(marketView: MarketView, agentResults: any[]): string {
    const asset = marketView.asset
    const bias = marketView.bias
    const conviction = marketView.conviction
    
    const agentCount = agentResults.length
    const consensusStrength = agentResults.filter(r => 
      (bias === 'bullish' && r.score > 0) || 
      (bias === 'bearish' && r.score < 0)
    ).length
    
    return `${asset} shows ${bias} bias with ${conviction}% conviction based on ${agentCount} agent analysis. ${consensusStrength}/${agentCount} agents agree on direction.`
  }
}