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
    <div className="bg-surface border-2 border-accent/50 rounded-lg p-2.5 min-w-[140px] max-w-[160px] shadow-lg">
      <div className="flex items-center gap-2 mb-1.5">
        <Database className="w-3.5 h-3.5 text-accent" />
        <span className="font-semibold text-xs text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="flex items-center gap-1.5 mb-2.5">
        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
          {data.symbol}
        </Badge>
        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
          {data.timeframe}
        </Badge>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
          <Settings className="w-2.5 h-2.5" />
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