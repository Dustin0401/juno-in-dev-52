import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  TrendingUp, 
  GitBranch, 
  Target, 
  BarChart3,
  Plus,
  Layers
} from 'lucide-react'

interface BacktestSidebarProps {
  open: boolean
  onToggle: () => void
}

interface NodeCategory {
  id: string
  name: string
  icon: React.ReactNode
  items: {
    id: string
    name: string
    description: string
    type: string
  }[]
}

const nodeCategories: NodeCategory[] = [
  {
    id: 'data',
    name: 'Data Sources',
    icon: <Database className="w-4 h-4" />,
    items: [
      {
        id: 'price-data',
        name: 'Price Data',
        description: 'OHLCV candlestick data',
        type: 'dataSource'
      },
      {
        id: 'volume-data',
        name: 'Volume Data',
        description: 'Trading volume analytics',
        type: 'dataSource'
      },
      {
        id: 'orderbook-data',
        name: 'Order Book',
        description: 'Bid/ask depth data',
        type: 'dataSource'
      },
      {
        id: 'sentiment-data',
        name: 'Market Sentiment',
        description: 'Fear & greed index',
        type: 'dataSource'
      },
      {
        id: 'news-data',
        name: 'News Feed',
        description: 'Market news & events',
        type: 'dataSource'
      },
      {
        id: 'social-data',
        name: 'Social Metrics',
        description: 'Twitter/Reddit sentiment',
        type: 'dataSource'
      }
    ]
  },
  {
    id: 'indicators',
    name: 'Technical Indicators',
    icon: <TrendingUp className="w-4 h-4" />,
    items: [
      {
        id: 'sma',
        name: 'Simple MA',
        description: 'Simple moving average',
        type: 'indicator'
      },
      {
        id: 'ema',
        name: 'Exponential MA',
        description: 'Exponential moving average',
        type: 'indicator'
      },
      {
        id: 'rsi',
        name: 'RSI',
        description: 'Relative strength index',
        type: 'indicator'
      },
      {
        id: 'macd',
        name: 'MACD',
        description: 'Moving avg convergence',
        type: 'indicator'
      },
      {
        id: 'bollinger',
        name: 'Bollinger Bands',
        description: 'Volatility bands',
        type: 'indicator'
      },
      {
        id: 'stochastic',
        name: 'Stochastic',
        description: 'Momentum oscillator',
        type: 'indicator'
      },
      {
        id: 'atr',
        name: 'ATR',
        description: 'Average true range',
        type: 'indicator'
      },
      {
        id: 'adx',
        name: 'ADX',
        description: 'Trend strength',
        type: 'indicator'
      },
      {
        id: 'cci',
        name: 'CCI',
        description: 'Commodity channel index',
        type: 'indicator'
      },
      {
        id: 'williams-r',
        name: 'Williams %R',
        description: 'Williams percent range',
        type: 'indicator'
      },
      {
        id: 'ichimoku',
        name: 'Ichimoku Cloud',
        description: 'Complete trend system',
        type: 'indicator'
      },
      {
        id: 'vwap',
        name: 'VWAP',
        description: 'Volume weighted price',
        type: 'indicator'
      }
    ]
  },
  {
    id: 'conditions',
    name: 'Conditions',
    icon: <GitBranch className="w-4 h-4" />,
    items: [
      {
        id: 'above',
        name: 'Above Threshold',
        description: 'Value > threshold',
        type: 'condition'
      },
      {
        id: 'below',
        name: 'Below Threshold',
        description: 'Value < threshold',
        type: 'condition'
      },
      {
        id: 'crossover',
        name: 'Crossover',
        description: 'Line crosses above',
        type: 'condition'
      },
      {
        id: 'crossunder',
        name: 'Cross Under',
        description: 'Line crosses below',
        type: 'condition'
      },
      {
        id: 'range',
        name: 'In Range',
        description: 'Value within range',
        type: 'condition'
      },
      {
        id: 'breakout',
        name: 'Breakout',
        description: 'Price breaks level',
        type: 'condition'
      },
      {
        id: 'divergence',
        name: 'Divergence',
        description: 'Price vs indicator',
        type: 'condition'
      },
      {
        id: 'volatility',
        name: 'Volatility Check',
        description: 'Market volatility level',
        type: 'condition'
      },
      {
        id: 'volume-spike',
        name: 'Volume Spike',
        description: 'Unusual volume activity',
        type: 'condition'
      },
      {
        id: 'time-filter',
        name: 'Time Filter',
        description: 'Specific trading hours',
        type: 'condition'
      }
    ]
  },
  {
    id: 'strategies',
    name: 'Strategy Blocks',
    icon: <Target className="w-4 h-4" />,
    items: [
      {
        id: 'buy-signal',
        name: 'Buy Signal',
        description: 'Long entry point',
        type: 'strategy'
      },
      {
        id: 'sell-signal',
        name: 'Sell Signal',
        description: 'Short entry point',
        type: 'strategy'
      },
      {
        id: 'stop-loss',
        name: 'Stop Loss',
        description: 'Risk management exit',
        type: 'strategy'
      },
      {
        id: 'take-profit',
        name: 'Take Profit',
        description: 'Profit taking exit',
        type: 'strategy'
      },
      {
        id: 'trailing-stop',
        name: 'Trailing Stop',
        description: 'Dynamic stop loss',
        type: 'strategy'
      },
      {
        id: 'position-sizing',
        name: 'Position Sizing',
        description: 'Risk-based sizing',
        type: 'strategy'
      },
      {
        id: 'portfolio-balance',
        name: 'Portfolio Balance',
        description: 'Asset allocation',
        type: 'strategy'
      },
      {
        id: 'dca-strategy',
        name: 'DCA Strategy',
        description: 'Dollar cost averaging',
        type: 'strategy'
      },
      {
        id: 'grid-trading',
        name: 'Grid Trading',
        description: 'Grid-based orders',
        type: 'strategy'
      },
      {
        id: 'mean-reversion',
        name: 'Mean Reversion',
        description: 'Return to average',
        type: 'strategy'
      },
      {
        id: 'momentum',
        name: 'Momentum',
        description: 'Trend following',
        type: 'strategy'
      },
      {
        id: 'arbitrage',
        name: 'Arbitrage',
        description: 'Price difference exploit',
        type: 'strategy'
      }
    ]
  },
  {
    id: 'outputs',
    name: 'Outputs',
    icon: <BarChart3 className="w-4 h-4" />,
    items: [
      {
        id: 'performance',
        name: 'Performance',
        description: 'Strategy performance',
        type: 'output'
      },
      {
        id: 'trades',
        name: 'Trade List',
        description: 'Executed trades log',
        type: 'output'
      },
      {
        id: 'chart',
        name: 'Strategy Chart',
        description: 'Visual backtest chart',
        type: 'output'
      },
      {
        id: 'risk-metrics',
        name: 'Risk Metrics',
        description: 'Sharpe, VaR, drawdown',
        type: 'output'
      },
      {
        id: 'equity-curve',
        name: 'Equity Curve',
        description: 'Portfolio value over time',
        type: 'output'
      },
      {
        id: 'returns',
        name: 'Returns Analysis',
        description: 'Return distribution',
        type: 'output'
      },
      {
        id: 'correlation',
        name: 'Correlation Matrix',
        description: 'Asset correlations',
        type: 'output'
      },
      {
        id: 'monthly-returns',
        name: 'Monthly Returns',
        description: 'Monthly performance grid',
        type: 'output'
      },
      {
        id: 'monte-carlo',
        name: 'Monte Carlo',
        description: 'Simulation analysis',
        type: 'output'
      }
    ]
  }
]

export function BacktestSidebar({ open, onToggle }: BacktestSidebarProps) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
    
    // Add smooth visual feedback
    const target = event.target as HTMLElement
    target.style.opacity = '0.7'
    target.style.transform = 'scale(0.98)'
    target.style.transition = 'all 0.15s ease-out'
    
    // Reset after drag
    setTimeout(() => {
      target.style.opacity = '1'
      target.style.transform = 'scale(1)'
    }, 150)
  }

  return (
    <div className={`${open ? 'w-80' : 'w-16'} transition-all duration-300 border-r border-line bg-surface/50 backdrop-blur-sm flex flex-col relative`}>
      {/* Header */}
      <div className="h-14 border-b border-line flex items-center justify-between px-4">
        {open && (
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Strategy Builder</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Content */}
      {open ? (
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {nodeCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-3">
                  {category.icon}
                  <h3 className="font-medium text-sm text-foreground">{category.name}</h3>
                </div>
                
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(event) => onDragStart(event, item.type)}
                      className="p-2.5 rounded-lg border border-line bg-surface hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-xs text-foreground">{item.name}</h4>
                        <Plus className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {category.id !== 'outputs' && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        // Collapsed state - show category icons
        <div className="flex-1 py-4">
          {nodeCategories.map((category) => (
            <div key={category.id} className="relative group">
              <div className="flex items-center justify-center h-12 w-12 mx-2 mb-2 rounded-lg bg-surface hover:bg-accent/50 transition-colors cursor-pointer">
                {category.icon}
              </div>
              
              {/* Hover dropdown */}
              <div className="absolute left-16 top-0 z-50 w-72 bg-surface border border-line rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                <div className="p-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h3 className="font-medium text-sm text-foreground">{category.name}</h3>
                  </div>
                </div>
                
                <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(event) => onDragStart(event, item.type)}
                      className="p-2.5 rounded-lg border border-line bg-surface hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group/item"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-xs text-foreground">{item.name}</h4>
                        <Plus className="w-3 h-3 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}