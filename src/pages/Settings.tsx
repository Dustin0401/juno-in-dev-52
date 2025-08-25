import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Coins, Crown, Zap, Users } from 'lucide-react'
import { ApiKeySettings } from '@/components/settings/ApiKeySettings'

export default function Settings() {
  const mockStaking = {
    staked: 15000,
    tier: 'pro',
    credits: 320,
    dailyCredits: 500
  }

  return (
    <div className="h-full p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your platform experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Get alerts for portfolio changes</div>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Research Summaries</div>
                  <div className="text-sm text-muted-foreground">Daily digest of market insights</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Agent Routing</div>
                  <div className="text-sm text-muted-foreground">Auto-route queries to best agents</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Usage</div>
                  <div className="text-sm text-muted-foreground">Share anonymized data for model improvement</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <ApiKeySettings />
        </TabsContent>

        <TabsContent value="staking">
          {/* Staking Overview */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>$JNO Staking</CardTitle>
                <Badge variant="secondary" className="capitalize flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  {mockStaking.tier} Tier
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Coins className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{mockStaking.staked.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">$JNO Staked</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{mockStaking.credits}</div>
                  <div className="text-sm text-muted-foreground">Research Credits</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{mockStaking.dailyCredits}</div>
                  <div className="text-sm text-muted-foreground">Daily Limit</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Credits Used</span>
                  <span>{mockStaking.dailyCredits - mockStaking.credits} / {mockStaking.dailyCredits}</span>
                </div>
                <Progress value={((mockStaking.dailyCredits - mockStaking.credits) / mockStaking.dailyCredits) * 100} />
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button>Stake More $JNO</Button>
                <Button variant="outline">Unstake</Button>
              </div>
            </CardContent>
          </Card>

          {/* Tier Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Tier Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">Priority Queue</span>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">Chart Vision Analysis</span>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">Extended Backtests (3+ years)</span>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">API Access</span>
                  <Badge variant="outline">Fund Tier Required</Badge>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Upgrade to Fund Tier</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Stake 100,000+ $JNO for custom quotas, dedicated endpoints, and SLA guarantees.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}