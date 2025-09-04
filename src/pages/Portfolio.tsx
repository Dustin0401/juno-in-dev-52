import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Activity, Target, BarChart3, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock portfolio data for different timeframes
const mockPortfolioData = {
  '1d': {
    totalValue: 125420.50,
    totalPnL: 8230.25,
    totalPnLPercent: 7.03,
    positions: [{
      symbol: 'BTC',
      amount: 2.5,
      value: 112500,
      pnl: 7200,
      pnlPercent: 6.84,
      allocation: 89.7
    }, {
      symbol: 'ETH',
      amount: 4.2,
      value: 12600,
      pnl: 1030,
      pnlPercent: 8.91,
      allocation: 10.0
    }, {
      symbol: 'SOL',
      amount: 1.8,
      value: 320.50,
      pnl: 0.25,
      pnlPercent: 0.08,
      allocation: 0.3
    }],
    riskMetrics: {
      volatility: 32.4,
      sharpe: 1.85,
      maxDrawdown: -12.3,
      beta: 0.92
    }
  },
  '7d': {
    totalValue: 123100.75,
    totalPnL: 5910.50,
    totalPnLPercent: 5.04,
    positions: [{
      symbol: 'BTC',
      amount: 2.5,
      value: 110250,
      pnl: 5450,
      pnlPercent: 5.19,
      allocation: 89.5
    }, {
      symbol: 'ETH',
      amount: 4.2,
      value: 12300,
      pnl: 460,
      pnlPercent: 3.89,
      allocation: 10.0
    }, {
      symbol: 'SOL',
      amount: 1.8,
      value: 550.75,
      pnl: 0.50,
      pnlPercent: 0.09,
      allocation: 0.5
    }],
    riskMetrics: {
      volatility: 28.7,
      sharpe: 1.92,
      maxDrawdown: -9.8,
      beta: 0.88
    }
  },
  '1m': {
    totalValue: 118750.25,
    totalPnL: 1430.25,
    totalPnLPercent: 1.22,
    positions: [{
      symbol: 'BTC',
      amount: 2.5,
      value: 106500,
      pnl: 1200,
      pnlPercent: 1.14,
      allocation: 89.7
    }, {
      symbol: 'ETH',
      amount: 4.2,
      value: 11900,
      pnl: 230,
      pnlPercent: 1.97,
      allocation: 10.0
    }, {
      symbol: 'SOL',
      amount: 1.8,
      value: 350.25,
      pnl: 0.25,
      pnlPercent: 0.07,
      allocation: 0.3
    }],
    riskMetrics: {
      volatility: 41.2,
      sharpe: 1.65,
      maxDrawdown: -18.5,
      beta: 1.15
    }
  },
  'all': {
    totalValue: 150320.75,
    totalPnL: 33000.50,
    totalPnLPercent: 28.15,
    positions: [{
      symbol: 'BTC',
      amount: 2.5,
      value: 135000,
      pnl: 30000,
      pnlPercent: 28.57,
      allocation: 89.8
    }, {
      symbol: 'ETH',
      amount: 4.2,
      value: 14800,
      pnl: 2800,
      pnlPercent: 23.33,
      allocation: 9.8
    }, {
      symbol: 'SOL',
      amount: 1.8,
      value: 520.75,
      pnl: 200.50,
      pnlPercent: 62.66,
      allocation: 0.4
    }],
    riskMetrics: {
      volatility: 45.8,
      sharpe: 2.15,
      maxDrawdown: -22.7,
      beta: 1.05
    }
  }
};
export default function Portfolio() {
  const [selectedTimeframe, setSelectedTimeframe] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('timeframe') || localStorage.getItem('portfolio-timeframe') || '1d';
  });
  
  // Listen for timeframe changes from header
  useEffect(() => {
    const handleStorageChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const timeframe = urlParams.get('timeframe') || localStorage.getItem('portfolio-timeframe') || '1d';
      setSelectedTimeframe(timeframe);
    };
    
    // Listen for custom events and popstate
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('popstate', handleStorageChange);
    
    // Custom event for same-page updates
    const handleTimeframeChange = (e: CustomEvent) => {
      setSelectedTimeframe(e.detail.timeframe);
    };
    
    window.addEventListener('timeframeChanged', handleTimeframeChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('popstate', handleStorageChange);
      window.removeEventListener('timeframeChanged', handleTimeframeChange as EventListener);
    };
  }, []);
  
  const currentData = mockPortfolioData[selectedTimeframe as keyof typeof mockPortfolioData] || mockPortfolioData['1d'];
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
  const formatPercent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  
  return (
    <div className="h-full p-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-muted" /><span className="text-sm text-muted">Total Value</span></div>
            <div className="text-2xl font-bold">{formatCurrency(currentData.totalValue)}</div>
          </CardContent></Card>
          
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-accent" /><span className="text-sm text-muted">Total P&L</span></div>
            <div className="text-2xl font-bold text-accent">{formatCurrency(currentData.totalPnL)}</div>
            <div className="text-sm text-accent">{formatPercent(currentData.totalPnLPercent)}</div>
          </CardContent></Card>
          
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><Activity className="w-5 h-5 text-muted" /><span className="text-sm text-muted">Volatility</span></div>
            <div className="text-2xl font-bold">{currentData.riskMetrics.volatility}%</div>
          </CardContent></Card>
          
          <Card><CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-muted" /><span className="text-sm text-muted">Sharpe</span></div>
            <div className="text-2xl font-bold">{currentData.riskMetrics.sharpe}</div>
          </CardContent></Card>
        </div>

        {/* Positions */}
        <Card>
          <CardHeader><CardTitle>Positions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.positions.map(position => <div key={position.symbol} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center font-medium">{position.symbol}</div>
                    <div><div className="font-medium">{position.symbol}</div><div className="text-sm text-muted">{position.amount} tokens</div></div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(position.value)}</div>
                    <div className={`text-sm ${position.pnl > 0 ? 'text-accent' : 'text-destructive'}`}>{formatPercent(position.pnlPercent)}</div>
                  </div>
                  <Progress value={position.allocation} className="w-20" />
                  <Button size="sm" variant="hero">Analyze</Button>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}