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
    <div className="bg-surface border-2 border-accent/50 rounded-md p-1.5 min-w-[75px] max-w-[85px] shadow-md">
      <div className="flex items-center gap-1 mb-0.5">
        <Database className="w-2.5 h-2.5 text-accent" />
        <span className="font-medium text-[10px] text-foreground truncate">{data.label}</span>
      </div>
      
      <div className="flex flex-col gap-0.5 mb-1">
        <Badge variant="outline" className="text-[9px] px-1 py-0 h-auto">
          {data.symbol}
        </Badge>
        <Badge variant="secondary" className="text-[9px] px-1 py-0 h-auto">
          {data.timeframe}
        </Badge>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-3 w-3 p-0">
          <Settings className="w-1.5 h-1.5" />
        </Button>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-accent border border-background"
      />
    </div>
  )
})