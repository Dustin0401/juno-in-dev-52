import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { GitBranch, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ConditionNodeData {
  label: string
  conditionType: string
  value?: number
}

interface ConditionNodeProps {
  data: ConditionNodeData
  id: string
}

export const ConditionNode = memo(({ data, id }: ConditionNodeProps) => {
  return (
    <div className="bg-surface border-2 border-warning/50 rounded-lg p-3 min-w-[160px] shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-warning border-2 border-background"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <GitBranch className="w-4 h-4 text-warning" />
        <span className="font-semibold text-sm text-foreground">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          {data.conditionType.replace('_', ' ').toUpperCase()}
        </Badge>
        {data.value && (
          <Badge variant="outline" className="text-xs">
            {data.value}
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
        className="w-3 h-3 bg-warning border-2 border-background"
      />
    </div>
  )
})