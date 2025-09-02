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
    <div className="bg-surface border-2 border-warning/50 rounded-md p-1.5 min-w-[75px] max-w-[85px] shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-warning border border-background"
      />
      
      <div className="flex items-center gap-1 mb-0.5">
        <GitBranch className="w-2.5 h-2.5 text-warning" />
        <span className="font-medium text-[10px] text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="flex flex-col gap-0.5 mb-1">
        <Badge variant="outline" className="text-[9px] px-1 py-0 h-auto">
          {data.conditionType.replace('_', ' ').toUpperCase()}
        </Badge>
        {data.value && (
          <Badge variant="outline" className="text-[9px] px-1 py-0 h-auto">
            {data.value}
          </Badge>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-3 w-3 p-0">
          <Settings className="w-1.5 h-1.5" />
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-warning border border-background"
      />
    </div>
  )
})