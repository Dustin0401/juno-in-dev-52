import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { TrendingUp, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface IndicatorNodeData {
  label: string
  indicatorType: string
  period?: number
}

interface IndicatorNodeProps {
  data: IndicatorNodeData
  id: string
}

export const IndicatorNode = memo(({ data, id }: IndicatorNodeProps) => {
  return (
    <div className="bg-surface border-2 border-secondary/50 rounded-lg p-3 min-w-[160px] shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-secondary border-2 border-background"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-secondary" />
        <span className="font-semibold text-sm text-foreground">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          {data.indicatorType.toUpperCase()}
        </Badge>
        {data.period && (
          <Badge variant="secondary" className="text-xs">
            {data.period}
          </Badge>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="w-3 h-3" />
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-secondary border-2 border-background"
      />
    </div>
  )
})