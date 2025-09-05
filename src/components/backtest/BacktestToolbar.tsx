import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Play, Pause, Square, RotateCcw, Settings, Save, FolderOpen, Download } from 'lucide-react'
import { useState } from 'react'

export function BacktestToolbar() {
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle')

  const handleRun = () => {
    setIsRunning(true)
    setStatus('running')
    
    // Implement actual backtest logic
    console.log('Starting backtest execution...')
    
    // Simulate progressive backtest with real-time updates
    const duration = 5000 // 5 seconds for demo
    const intervals = 10
    const intervalTime = duration / intervals
    
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 10
      console.log(`Backtest progress: ${progress}%`)
      
      if (progress >= 100) {
        clearInterval(progressInterval)
        setIsRunning(false)
        setStatus('completed')
        console.log('Backtest completed successfully!')
        
        // Simulate results
        const results = {
          totalReturn: '+24.5%',
          sharpeRatio: 1.8,
          maxDrawdown: '-8.2%',
          winRate: '68%',
          totalTrades: 142
        }
        console.log('Backtest Results:', results)
      }
    }, intervalTime)
  }

  const handleStop = () => {
    setIsRunning(false)
    setStatus('idle')
    console.log('Backtest stopped by user')
  }

  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'bg-warning/10 text-warning border-warning/20'
      case 'completed':
        return 'bg-success/10 text-success border-success/20'
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  }

  return (
    <div className="h-14 border-b border-line bg-surface/50 backdrop-blur-sm flex items-center justify-between px-4">
      {/* Left Section - Strategy Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleRun}
          disabled={isRunning}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Play className="w-4 h-4 mr-2" />
          {isRunning ? 'Running...' : 'Run Backtest'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleStop}
          disabled={!isRunning}
        >
          <Square className="w-4 h-4 mr-2" />
          Stop
        </Button>
        
        <Button variant="ghost" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Badge variant="outline" className={getStatusColor()}>
          {status === 'idle' && 'Ready'}
          {status === 'running' && 'Running'}
          {status === 'completed' && 'Completed'}
          {status === 'error' && 'Error'}
        </Badge>
      </div>

      {/* Center Section - Strategy Info */}
      <div className="hidden md:flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Strategy:</span> Moving Average Crossover
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Timeframe:</span> 1H
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Period:</span> 2023-01-01 to 2024-01-01
        </div>
      </div>

      {/* Right Section - File Operations */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" title="Open">
          <FolderOpen className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" title="Save">
          <Save className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" title="Export">
          <Download className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}