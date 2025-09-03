import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { BarChart3, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface OutputNodeData {
  label: string
  outputType: string
}

interface OutputNodeProps {
  data: OutputNodeData
  id: string
}

export const OutputNode = memo(({ data, id }: OutputNodeProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [outputType, setOutputType] = useState(data.outputType);

  return (
    <div className="bg-surface border-2 border-success/50 rounded-sm p-2 min-w-[120px] max-w-[140px] shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-success border border-background"
      />
      
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <BarChart3 className="w-3 h-3 text-success" />
          <span className="font-medium text-xs text-foreground truncate">{label}</span>
        </div>
        
        <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-success/20">
              <Settings className="w-2 h-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Output Settings</h4>
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
                <Label htmlFor="output" className="text-xs">Output Type</Label>
                <Select value={outputType} onValueChange={setOutputType}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance_report">Performance Report</SelectItem>
                    <SelectItem value="equity_curve">Equity Curve</SelectItem>
                    <SelectItem value="trade_log">Trade Log</SelectItem>
                    <SelectItem value="risk_metrics">Risk Metrics</SelectItem>
                    <SelectItem value="profit_loss">Profit & Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="mb-2">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-auto">
          {outputType.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
    </div>
  )
})