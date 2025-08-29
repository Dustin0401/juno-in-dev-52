import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Database, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DataSourceNodeData {
  label: string
  symbol: string
  timeframe: string
}

interface DataSourceNodeProps {
  data: DataSourceNodeData
  id: string
}

export const DataSourceNode = memo(({ data, id }: DataSourceNodeProps) => {
  return (
    <div className="bg-surface border-2 border-accent/50 rounded-lg p-3 min-w-[160px] shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-4 h-4 text-accent" />
        <span className="font-semibold text-sm text-foreground">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          {data.symbol}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {data.timeframe}
        </Badge>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="w-3 h-3" />
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-accent border-2 border-background"
      />
    </div>
  )
})