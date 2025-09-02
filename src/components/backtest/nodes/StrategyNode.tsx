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
    <div className="bg-surface border-2 border-primary/20 rounded-sm p-1.5 min-w-[75px] max-w-[85px] shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-primary border border-background"
      />
      
      <div className="flex items-center gap-1 mb-0.5">
        <Target className="w-2.5 h-2.5 text-primary" />
        <span className="font-medium text-[10px] text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="text-[9px] text-muted-foreground mb-1">
        {data.strategyType.replace('_', ' ').toUpperCase()}
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-3 w-3 p-0">
          <Settings className="w-1.5 h-1.5" />
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-primary border border-background"
      />
    </div>
  )
})