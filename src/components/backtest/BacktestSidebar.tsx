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
        description: 'OHLCV price data',
        type: 'dataSource'
      },
      {
        id: 'volume-data',
        name: 'Volume Data',
        description: 'Trading volume data',
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
        name: 'Simple Moving Average',
        description: 'SMA indicator',
        type: 'indicator'
      },
      {
        id: 'ema',
        name: 'Exponential Moving Average',
        description: 'EMA indicator',
        type: 'indicator'
      },
      {
        id: 'rsi',
        name: 'RSI',
        description: 'Relative Strength Index',
        type: 'indicator'
      },
      {
        id: 'macd',
        name: 'MACD',
        description: 'Moving Average Convergence Divergence',
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
        description: 'Value above threshold',
        type: 'condition'
      },
      {
        id: 'below',
        name: 'Below Threshold',
        description: 'Value below threshold',
        type: 'condition'
      },
      {
        id: 'crossover',
        name: 'Crossover',
        description: 'Line crossover condition',
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
        description: 'Generate buy signals',
        type: 'strategy'
      },
      {
        id: 'sell-signal',
        name: 'Sell Signal',
        description: 'Generate sell signals',
        type: 'strategy'
      },
      {
        id: 'stop-loss',
        name: 'Stop Loss',
        description: 'Risk management',
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
        name: 'Performance Metrics',
        description: 'Calculate performance',
        type: 'output'
      },
      {
        id: 'trades',
        name: 'Trade List',
        description: 'List of trades',
        type: 'output'
      },
      {
        id: 'chart',
        name: 'Strategy Chart',
        description: 'Visual representation',
        type: 'output'
      }
    ]
  }
]

export function BacktestSidebar({ open, onToggle }: BacktestSidebarProps) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
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
                      className="p-3 rounded-lg border border-line bg-surface hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-colors group"
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
                      className="p-3 rounded-lg border border-line bg-surface hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-colors group/item"
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