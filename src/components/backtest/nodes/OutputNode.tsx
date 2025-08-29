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
    <div className="bg-surface border-2 border-success/50 rounded-lg p-3 min-w-[160px] shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-success border-2 border-background"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="w-4 h-4 text-success" />
        <span className="font-semibold text-sm text-foreground">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          {data.outputType.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
})