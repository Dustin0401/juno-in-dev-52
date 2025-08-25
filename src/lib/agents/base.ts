import type { AgentScore, TechnicalScore, OnChainScore, MarketContext, UserProfile } from '@/types'

export interface AgentConfig {
  name: string
  weight: number
  timeout: number
}

export abstract class BaseAgent {
  protected config: AgentConfig

  constructor(config: AgentConfig) {
    this.config = config
  }

  abstract analyze(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile,
    attachments?: File[]
  ): Promise<AgentScore | TechnicalScore | OnChainScore>

  protected normalizeScore(rawScore: number): number {
    // Clamp score between -2 and 2
    return Math.max(-2, Math.min(2, rawScore))
  }

  protected calculateConfidence(factors: number[]): number {
    // Calculate confidence based on convergence of factors
    const variance = factors.reduce((acc, val, _, arr) => {
      const mean = arr.reduce((a, b) => a + b) / arr.length
      return acc + Math.pow(val - mean, 2)
    }, 0) / factors.length
    
    return Math.max(0, Math.min(100, 100 - (variance * 50)))
  }
}

export interface AgentRegistry {
  sentiment: BaseAgent
  macro: BaseAgent
  technical: BaseAgent
  onchain: BaseAgent
}