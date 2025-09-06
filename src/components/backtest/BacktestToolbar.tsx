import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { Play, Pause, Square, RotateCcw, Settings, Save, FolderOpen, Download } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
interface BacktestToolbarProps {
  onReset: () => void;
  strategyName: string;
}
export function BacktestToolbar({
  onReset,
  strategyName
}: BacktestToolbarProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [timeframe, setTimeframe] = useState('1H');
  const [startDate, setStartDate] = useState<Date>(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2024-01-01'));
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const handleRun = () => {
    setIsRunning(true);
    setStatus('running');

    // Implement actual backtest logic
    console.log('Starting backtest execution...');

    // Simulate progressive backtest with real-time updates
    const duration = 5000; // 5 seconds for demo
    const intervals = 10;
    const intervalTime = duration / intervals;
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      console.log(`Backtest progress: ${progress}%`);
      if (progress >= 100) {
        clearInterval(progressInterval);
        setIsRunning(false);
        setStatus('completed');
        console.log('Backtest completed successfully!');

        // Simulate results
        const results = {
          totalReturn: '+24.5%',
          sharpeRatio: 1.8,
          maxDrawdown: '-8.2%',
          winRate: '68%',
          totalTrades: 142
        };
        console.log('Backtest Results:', results);
      }
    }, intervalTime);
  };
  const handleStop = () => {
    setIsRunning(false);
    setStatus('idle');
    console.log('Backtest stopped by user');
  };
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };
  return <div className="h-14 border-b border-line bg-surface/50 backdrop-blur-sm flex items-center justify-between px-4">
      {/* Left Section - Strategy Controls */}
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" onClick={handleRun} disabled={isRunning} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Play className="w-4 h-4 mr-2" />
          {isRunning ? 'Running...' : 'Run Backtest'}
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleStop} disabled={!isRunning}>
          <Square className="w-4 h-4 mr-2" />
          Stop
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onReset}>
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
          <span className="font-medium">Strategy:</span> {strategyName}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-muted-foreground">Timeframe:</span>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-16 h-6 text-xs">
              <SelectValue />
              <ChevronDown className="w-3 h-3" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1H">1H</SelectItem>
              <SelectItem value="4H">4H</SelectItem>
              <SelectItem value="1D">1D</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-muted-foreground">Period:</span>
          <div className="flex items-center gap-1">
            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  {format(startDate, 'yyyy-MM-dd')}
                  <CalendarIcon className="w-3 h-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={startDate} onSelect={date => {
                if (date) setStartDate(date);
                setStartDateOpen(false);
              }} initialFocus />
              </PopoverContent>
            </Popover>
            <span className="text-xs text-muted-foreground">to</span>
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  {format(endDate, 'yyyy-MM-dd')}
                  <CalendarIcon className="w-3 h-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={endDate} onSelect={date => {
                if (date) setEndDate(date);
                setEndDateOpen(false);
              }} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
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
        
        
        
      </div>
    </div>;
}