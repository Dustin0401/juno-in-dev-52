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
    <div className="bg-surface border-2 border-warning/50 rounded-lg p-2.5 min-w-[140px] max-w-[160px] shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-warning border-2 border-background"
      />
      
      <div className="flex items-center gap-2 mb-1.5">
        <GitBranch className="w-3.5 h-3.5 text-warning" />
        <span className="font-semibold text-xs text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-1.5 mb-2.5">
        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
          {data.conditionType.replace('_', ' ').toUpperCase()}
        </Badge>
        {data.value && (
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            {data.value}
          </Badge>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
          <Settings className="w-2.5 h-2.5" />
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