import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Database, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface DataSourceNodeData {
  label: string
  symbol: string
  timeframe: string
  onDelete?: (id: string) => void
}

interface DataSourceNodeProps {
  data: DataSourceNodeData
  id: string
}

export const DataSourceNode = memo(({ data, id }: DataSourceNodeProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [symbol, setSymbol] = useState(data.symbol);
  const [timeframe, setTimeframe] = useState(data.timeframe);
  const [label, setLabel] = useState(data.label);

  return (
    <div className="bg-surface border-2 border-accent/50 rounded-sm p-2 min-w-[140px] max-w-[155px] min-h-[70px] max-h-[85px] shadow-md relative group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <Database className="w-3 h-3 text-accent" />
          <span className="font-medium text-xs text-foreground truncate">{label}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-3 w-3 p-0 hover:bg-accent/20">
                <Settings className="w-2 h-2" />
              </Button>
            </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Data Source Settings</h4>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSettingsOpen(false)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="label" className="text-xs">Label</Label>
                <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} className="h-7 text-xs" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="symbol" className="text-xs">Symbol</Label>
                <Select value={symbol} onValueChange={setSymbol}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="AVAX">AVAX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="timeframe" className="text-xs">Timeframe</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1m</SelectItem>
                    <SelectItem value="5m">5m</SelectItem>
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="1d">1d</SelectItem>
                  </SelectContent>
                </Select>
               </div>
               <div className="pt-2 border-t">
                 <Button 
                   variant="destructive" 
                   size="sm" 
                   className="w-full h-7 text-xs"
                   onClick={() => {
                     if (data.onDelete) {
                       data.onDelete(id);
                     }
                     setSettingsOpen(false);
                   }}
                 >
                   Delete Node
                 </Button>
               </div>
             </div>
           </PopoverContent>
        </Popover>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 mb-2">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-auto">
          {symbol}
        </Badge>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 h-auto">
          {timeframe}
        </Badge>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-accent border border-background"
      />
    </div>
  )
})