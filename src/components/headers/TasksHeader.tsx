import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, DollarSign, Newspaper, AlertTriangle, Activity, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TasksHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

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

export function TasksHeader({ sidebarOpen, onToggleSidebar }: TasksHeaderProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTaskType, setSelectedTaskType] = useState<string>('')

  return (
    <PageHeader sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar}>
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 shadow-soft">
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
    </PageHeader>
  )
}