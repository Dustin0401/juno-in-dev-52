import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface OutputNodeData {
  label: string
  outputType: string
}

interface OutputNodeProps {
  data: OutputNodeData
  id: string
}

export const OutputNode = memo(({ data, id }: OutputNodeProps) => {
  return (
    <div className="bg-surface border-2 border-success/50 rounded-sm p-1.5 min-w-[75px] max-w-[85px] shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-success border border-background"
      />
      
      <div className="flex items-center gap-1 mb-0.5">
        <BarChart3 className="w-2.5 h-2.5 text-success" />
        <span className="font-medium text-[10px] text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-1 mb-1">
        <Badge variant="outline" className="text-[9px] px-1 py-0 h-auto">
          {data.outputType.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-3 w-3 p-0">
          <Settings className="w-1.5 h-1.5" />
        </Button>
      </div>
    </div>
  )
})