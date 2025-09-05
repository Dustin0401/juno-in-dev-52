import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Target, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface StrategyNodeData {
  label: string
  strategyType: string
}

interface StrategyNodeProps {
  data: StrategyNodeData
  id: string
}

export const StrategyNode = memo(({ data, id }: StrategyNodeProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [strategyType, setStrategyType] = useState(data.strategyType);

  return (
    <div className="bg-surface border-2 border-primary/20 rounded-sm p-2 min-w-[160px] max-w-[175px] min-h-[45px] max-h-[58px] shadow-md relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-primary border border-background"
      />
      
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <Target className="w-3 h-3 text-primary" />
          <span className="font-medium text-xs text-foreground truncate">{label}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-3 w-3 p-0 hover:bg-primary/20">
                <Settings className="w-2 h-2" />
              </Button>
            </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Strategy Settings</h4>
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
                <Label htmlFor="strategy" className="text-xs">Strategy Type</Label>
                <Select value={strategyType} onValueChange={setStrategyType}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy_hold">Buy & Hold</SelectItem>
                    <SelectItem value="mean_reversion">Mean Reversion</SelectItem>
                    <SelectItem value="momentum">Momentum</SelectItem>
                    <SelectItem value="scalping">Scalping</SelectItem>
                    <SelectItem value="swing_trading">Swing Trading</SelectItem>
                  </SelectContent>
                </Select>
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
      
      <div className="mb-2">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-auto">
          {strategyType.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-primary border border-background"
      />
    </div>
  )
})