import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { TrendingUp, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface IndicatorNodeData {
  label: string
  indicatorType: string
  period?: number
}

interface IndicatorNodeProps {
  data: IndicatorNodeData
  id: string
}

export const IndicatorNode = memo(({ data, id }: IndicatorNodeProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [indicatorType, setIndicatorType] = useState(data.indicatorType);
  const [period, setPeriod] = useState(data.period || 14);

  return (
    <div className="bg-surface border-2 border-secondary/50 rounded-sm p-2 min-w-[160px] max-w-[180px] min-h-[70px] max-h-[90px] shadow-md relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-secondary border border-background"
      />
      
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-secondary" />
          <span className="font-medium text-xs text-foreground truncate">{label}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-3 w-3 p-0 hover:bg-secondary/20">
                <Settings className="w-2 h-2" />
              </Button>
            </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Indicator Settings</h4>
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
                <Label htmlFor="type" className="text-xs">Type</Label>
                <Select value={indicatorType} onValueChange={setIndicatorType}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sma">SMA</SelectItem>
                    <SelectItem value="ema">EMA</SelectItem>
                    <SelectItem value="rsi">RSI</SelectItem>
                    <SelectItem value="macd">MACD</SelectItem>
                    <SelectItem value="bollinger">Bollinger Bands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="period" className="text-xs">Period</Label>
                <Input id="period" type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="h-7 text-xs" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Delete Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-3 w-3 p-0 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => {
            console.log('Delete node:', id);
          }}
        >
          <span className="text-red-500 text-xs">×</span>
        </Button>
      </div>
      </div>
      
      <div className="flex flex-col gap-1 mb-2">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-auto">
          {indicatorType.toUpperCase()}
        </Badge>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 h-auto">
          {period}
        </Badge>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-secondary border border-background"
      />
    </div>
  )
})