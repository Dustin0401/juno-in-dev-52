import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Target, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StrategyNodeData {
  label: string
  strategyType: string
}

interface StrategyNodeProps {
  data: StrategyNodeData
  id: string
}

export const StrategyNode = memo(({ data, id }: StrategyNodeProps) => {
  return (
    <div className="bg-surface border-2 border-primary/20 rounded-lg p-3 min-w-[160px] shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-4 h-4 text-primary" />
        <span className="font-semibold text-sm text-foreground">{data.label}</span>
      </div>
      
      <div className="text-xs text-muted-foreground mb-3">
        {data.strategyType.replace('_', ' ').toUpperCase()}
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="w-3 h-3" />
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </div>
  )
})