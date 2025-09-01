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
    <div className="bg-surface border-2 border-success/50 rounded-lg p-2.5 min-w-[140px] max-w-[160px] shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-success border-2 border-background"
      />
      
      <div className="flex items-center gap-2 mb-1.5">
        <BarChart3 className="w-3.5 h-3.5 text-success" />
        <span className="font-semibold text-xs text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-2.5">
        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
          {data.outputType.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
          <Settings className="w-2.5 h-2.5" />
        </Button>
      </div>
    </div>
  )
})