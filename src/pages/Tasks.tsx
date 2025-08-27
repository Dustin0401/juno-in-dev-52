import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Calendar,
  Plus,
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Newspaper,
  DollarSign,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  type: 'price' | 'news' | 'liquidation' | 'volume' | 'volatility'
  title: string
  description: string
  status: 'active' | 'triggered' | 'paused'
  created: string
  lastTriggered?: string
  parameters: Record<string, any>
}

const mockTasks: Task[] = [
  {
    id: '1',
    type: 'price',
    title: 'BTC Price Alert',
    description: 'Alert when BTC reaches $45,000',
    status: 'active',
    created: '2 hours ago',
    parameters: { asset: 'BTC', price: 45000, condition: 'above' }
  },
  {
    id: '2',
    type: 'liquidation',
    title: 'Large ETH Liquidations',
    description: 'Alert on liquidations > $1M',
    status: 'triggered',
    created: '1 day ago',
    lastTriggered: '30 mins ago',
    parameters: { asset: 'ETH', amount: 1000000 }
  },
  {
    id: '3',
    type: 'news',
    title: 'SOL News Monitor',
    description: 'Track Solana ecosystem news',
    status: 'active',
    created: '3 days ago',
    parameters: { asset: 'SOL', keywords: ['ecosystem', 'upgrade', 'partnership'] }
  }
]

const taskTypes = [
  {
    type: 'price',
    title: 'Price Alerts',
    description: 'Get notified when assets reach target prices',
    icon: DollarSign,
    color: 'text-green-500'
  },
  {
    type: 'news',
    title: 'News Monitoring',
    description: 'Track crypto news that could impact markets',
    icon: Newspaper,
    color: 'text-blue-500'
  },
  {
    type: 'liquidation',
    title: 'Liquidation Alerts',
    description: 'Monitor large liquidations and market stress',
    icon: AlertTriangle,
    color: 'text-red-500'
  },
  {
    type: 'volume',
    title: 'Volume Spikes',
    description: 'Alert on unusual trading volume activity',
    icon: Activity,
    color: 'text-purple-500'
  },
  {
    type: 'volatility',
    title: 'Volatility Monitor',
    description: 'Track sudden price movements and market volatility',
    icon: Zap,
    color: 'text-yellow-500'
  }
]

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [activeTab, setActiveTab] = useState('overview')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTaskType, setSelectedTaskType] = useState<string>('')

  const getTaskIcon = (type: string) => {
    const taskType = taskTypes.find(t => t.type === type)
    if (!taskType) return <Calendar className="w-4 h-4" />
    const Icon = taskType.icon
    return <Icon className={cn("w-4 h-4", taskType.color)} />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
      case 'triggered':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Triggered</Badge>
      case 'paused':
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Paused</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTaskTypeStats = () => {
    const stats = taskTypes.map(type => ({
      ...type,
      count: tasks.filter(task => task.type === type.type).length,
      active: tasks.filter(task => task.type === type.type && task.status === 'active').length
    }))
    return stats
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Floating Create Task Button */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogTrigger asChild>
          <Button className="fixed top-6 right-20 gap-2 z-50 shadow-lg">
            <Plus className="w-4 h-4" />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Set up an AI-powered task to monitor crypto markets
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Task Type</Label>
              <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.type} value={type.type}>
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-4 h-4", type.color)} />
                          {type.title}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedTaskType === 'price' && (
              <>
                <div>
                  <Label>Asset</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      <SelectItem value="SOL">Solana (SOL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Target Price ($)</Label>
                  <Input type="number" placeholder="Enter target price" />
                </div>
                <div>
                  <Label>Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Price condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above target</SelectItem>
                      <SelectItem value="below">Below target</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {selectedTaskType === 'news' && (
              <>
                <div>
                  <Label>Keywords (comma-separated)</Label>
                  <Input placeholder="e.g., upgrade, partnership, regulation" />
                </div>
                <div>
                  <Label>Asset Focus</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset or market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Market</SelectItem>
                      <SelectItem value="BTC">Bitcoin</SelectItem>
                      <SelectItem value="ETH">Ethereum</SelectItem>
                      <SelectItem value="SOL">Solana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Tasks</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Task Type Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTaskTypeStats().map((type) => {
                const Icon = type.icon
                return (
                  <Card key={type.type} className="border-line bg-surface/50 hover:bg-surface/80 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-background/50">
                            <Icon className={cn("w-5 h-5", type.color)} />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{type.title}</div>
                            <div className="text-sm text-muted">{type.count} tasks</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{type.active} active</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Tasks', value: tasks.length, icon: Calendar },
                { label: 'Active', value: tasks.filter(t => t.status === 'active').length, icon: CheckCircle },
                { label: 'Triggered Today', value: tasks.filter(t => t.status === 'triggered').length, icon: Bell },
                { label: 'Success Rate', value: '94%', icon: TrendingUp }
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="border-line bg-surface/50">
                    <CardContent className="p-4 text-center">
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

          </TabsContent>

          <TabsContent value="active" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Active Tasks</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Bulk Actions
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.filter(task => task.status === 'active').map((task) => (
                <Card key={task.id} className="border-line bg-surface/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getTaskIcon(task.type)}
                        <div>
                          <div className="font-medium text-foreground">{task.title}</div>
                          <div className="text-sm text-muted">{task.description}</div>
                          <div className="text-xs text-muted mt-1">Created {task.created}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(task.status)}
                        <Switch defaultChecked />
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Task History</h3>
              <Button variant="outline" size="sm">Export Data</Button>
            </div>

            <Card className="border-line bg-surface/50">
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  <div className="p-4 space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-line">
                        <div className="flex items-center gap-3">
                          {getTaskIcon(task.type)}
                          <div>
                            <div className="font-medium text-sm text-foreground">{task.title}</div>
                            <div className="text-xs text-muted">
                              Created {task.created} 
                              {task.lastTriggered && ` • Last triggered ${task.lastTriggered}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(task.status)}
                          {task.status === 'triggered' && (
                            <Badge variant="outline" className="text-xs">
                              <Bell className="w-3 h-3 mr-1" />
                              Alert Sent
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}