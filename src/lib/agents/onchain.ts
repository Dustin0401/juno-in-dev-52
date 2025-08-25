import { BaseAgent } from './base'
import type { OnChainScore, MarketContext, UserProfile } from '@/types'

export class OnChainAgent extends BaseAgent {
  constructor() {
    super({
      name: 'OnChain',
      weight: 0.25,
      timeout: 5000
    })
  }

  async analyze(
    query: string, 
    context: MarketContext, 
    userProfile?: UserProfile
  ): Promise<OnChainScore> {
    await new Promise(resolve => setTimeout(resolve, 1800 + Math.random() * 2000))

    const asset = this.extractAsset(query)
    
    // Mock on-chain data
    const exchangeNetFlow = (Math.random() - 0.5) * 1000 // BTC flow
    const whaleActivity = Math.random() * 100
    const activeAddresses = Math.random() * 100 + 50
    const transactionVolume = Math.random() * 200 + 100
    const stakingRatio = Math.random() * 0.3 + 0.4 // 40-70%
    const liquidityPoolChanges = (Math.random() - 0.5) * 0.2
    
    // Calculate on-chain score
    const flowScore = -exchangeNetFlow / 500 // Inflows to exchanges = bearish
    const whaleScore = whaleActivity > 70 ? (Math.random() > 0.5 ? 1 : -1) : 0
    const activityScore = (activeAddresses - 75) / 25 // Normalize around 75
    const stakingScore = (stakingRatio - 0.55) * 4 // Higher staking = bullish
    
    const rawScore = (flowScore * 0.3 + whaleScore * 0.25 + activityScore * 0.2 + stakingScore * 0.25)
    const score = this.normalizeScore(rawScore)
    
    const confidence = this.calculateConfidence([flowScore, whaleScore, activityScore, stakingScore])
    
    const flows = this.generateFlowHighlights(exchangeNetFlow, whaleActivity, activeAddresses)
    const contracts = this.generateContractHighlights(asset)
    const highlights = this.generateHighlights(exchangeNetFlow, whaleActivity, stakingRatio)
    
    return {
      score,
      confidence: Math.round(confidence),
      highlights,
      sources: ["glassnode.com", "nansen.ai", "dune.com", "etherscan.io"],
      flows,
      contracts
    }
  }

  private extractAsset(query: string): string {
    const assetRegex = /\b(BTC|ETH|SOL|AVAX|MATIC|ARB|DOGE|ADA|DOT|LINK)\b/i
    const match = query.match(assetRegex)
    return match ? match[0].toUpperCase() : 'BTC'
  }

  private generateFlowHighlights(netFlow: number, whaleActivity: number, activeAddresses: number): string[] {
    const flows = []
    
    if (Math.abs(netFlow) > 200) {
      flows.push(`${netFlow > 0 ? 'Large outflows' : 'Large inflows'} to exchanges (${Math.abs(netFlow).toFixed(0)} BTC)`)
    }
    
    if (whaleActivity > 80) {
      flows.push("High whale wallet activity detected")
    }
    
    if (activeAddresses > 85) {
      flows.push("Network activity surge")
    } else if (activeAddresses < 60) {
      flows.push("Low network participation")
    }
    
    return flows
  }

  private generateContractHighlights(asset: string): string[] {
    const contracts = []
    
    // Mock contract addresses and transaction hashes
    if (asset === 'ETH') {
      contracts.push("0x1f9840a85d5af5bf1d1762f925bdaddc4201f984")
      contracts.push("0xa0b86a33e6db436d0f9ab6c6d45e9b72")
    } else if (asset === 'BTC') {
      contracts.push("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")
      contracts.push("bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq")
    }
    
    return contracts
  }

  private generateHighlights(netFlow: number, whaleActivity: number, stakingRatio: number): string[] {
    const highlights = []
    
    if (netFlow > 100) highlights.push("Exchange outflows suggest accumulation")
    if (netFlow < -100) highlights.push("Exchange inflows indicate selling pressure")
    if (whaleActivity > 75) highlights.push("Increased whale wallet movements")
    if (stakingRatio > 0.6) highlights.push("High staking ratio reduces liquid supply")
    if (stakingRatio < 0.45) highlights.push("Low staking participation")
    
    return highlights
  }
}