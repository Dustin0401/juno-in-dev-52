import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Bell, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react'

interface Alert {
  id: string
  type: 'price' | 'technical' | 'news' | 'portfolio'
  title: string
  message: string
  timestamp: string
  severity: 'high' | 'medium' | 'low'
  symbol?: string
  isRead: boolean
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'price',
    title: 'BTC Price Alert',
    message: 'Bitcoin has reached $45,000 - your target price',
    timestamp: '2 mins ago',
    severity: 'high',
    symbol: 'BTC',
    isRead: false
  },
  {
    id: '2',
    type: 'technical',
    title: 'RSI Oversold',
    message: 'ETH RSI has dropped below 30 - potential buy signal',
    timestamp: '15 mins ago',
    severity: 'medium',
    symbol: 'ETH',
    isRead: false
  },
  {
    id: '3',
    type: 'news',
    title: 'Market News',
    message: 'Federal Reserve announces new monetary policy',
    timestamp: '1 hour ago',
    severity: 'medium',
    isRead: true
  },
  {
    id: '4',
    type: 'portfolio',
    title: 'Portfolio Alert',
    message: 'Your SOL position is up 12% today',
    timestamp: '2 hours ago',
    severity: 'low',
    symbol: 'SOL',
    isRead: true
  }
]

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'price':
      return <TrendingUp className="w-4 h-4" />
    case 'technical':
      return <TrendingDown className="w-4 h-4" />
    case 'news':
      return <AlertTriangle className="w-4 h-4" />
    case 'portfolio':
      return <CheckCircle className="w-4 h-4" />
  }
}

const getSeverityColor = (severity: Alert['severity']) => {
  switch (severity) {
    case 'high':
      return 'bg-destructive/10 text-destructive border-destructive/20'
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/20'
    case 'low':
      return 'bg-success/10 text-success border-success/20'
  }
}

export function AlertsDropdown() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [open, setOpen] = useState(false)
  
  const unreadCount = alerts.filter(alert => !alert.isRead).length

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ))
  }

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0 bg-surface border-line shadow-xl" 
        align="end"
        sideOffset={8}
      >
        <div className="border-b border-line p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Alerts</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No alerts yet</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`group relative p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
                    alert.isRead ? 'opacity-70' : 'bg-accent/20'
                  }`}
                  onClick={() => !alert.isRead && markAsRead(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-foreground truncate">
                          {alert.title}
                        </h4>
                        {alert.symbol && (
                          <Badge variant="outline" className="text-xs">
                            {alert.symbol}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeAlert(alert.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {!alert.isRead && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="border-t border-line p-3">
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            View all alerts
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}