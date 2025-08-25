// Core Agent Types
export interface AgentScore {
  score: number; // -2 to 2
  confidence: number; // 0-100
  highlights: string[];
  sources: string[];
}

export interface TechnicalScore extends AgentScore {
  levels: {
    support: number[];
    resistance: number[];
  };
  patterns: string[];
}

export interface OnChainScore extends AgentScore {
  flows: string[];
  contracts: string[];
}

export interface MarketView {
  asset: string;
  timeframe: string;
  bias: 'bullish' | 'bearish' | 'neutral';
  conviction: number;
  key_levels: {
    support: number[];
    resistance: number[];
  };
  catalysts: string[];
  risks: string[];
}

export interface Recommendation {
  type: 'idea' | 'hedge' | 'rebalance' | 'alert';
  entry_zone: string;
  invalidation: string;
  targets: string[];
  r_r: number;
  probability_win: number;
  time_horizon: 'intraday' | 'swing' | 'position';
  sizing_guidance: string;
  fit_for_user: string;
}

export interface BacktestSnapshot {
  strategy_id: string;
  sample_period: string;
  n_trades: number;
  win_rate: number;
  expectancy: number;
  max_dd: number;
  notes: string;
}

export interface AgentResponse {
  summary: string;
  market_view: MarketView;
  recommendations: Recommendation[];
  agent_evidence: (AgentScore & { agent: string } | TechnicalScore & { agent: string } | OnChainScore & { agent: string })[];
  backtest_snapshot: BacktestSnapshot;
  disclosures: string[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: string[];
  agents_used?: AgentType[];
  response?: AgentResponse;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
}

export type AgentType = 'sentiment' | 'macro' | 'technical' | 'onchain' | 'juno';

// User & Wallet Types
export interface UserProfile {
  objective: string;
  horizon: string;
  risk_tolerance: 'low' | 'medium' | 'high';
  jurisdictions: string[];
  assets_followed: string[];
  exchanges: string[];
  portfolio_positions: any[];
  cash_allocation: number;
  notifications_opt_in: boolean;
  staking_tier: 'free' | 'analyst' | 'pro' | 'fund';
  reputation_score: number;
}

export interface StakingInfo {
  staked_amount: number;
  tier: 'free' | 'analyst' | 'pro' | 'fund';
  research_credits: number;
  daily_credits: number;
}

export interface SlashCommand {
  command: string;
  description: string;
  agent?: AgentType;
}

// Market Context
export interface MarketContext {
  market_clock: string;
  risk_regime: 'calm' | 'volatile' | 'crisis';
  news_heat: number;
  chain_activity_heat: number;
}