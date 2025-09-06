import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coins, Crown, Zap, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
export default function Staking() {
  const [stakingData, setStakingData] = useState({
    staked: 15000,
    tier: 'pro',
    credits: 320,
    dailyCredits: 500
  });
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive"
      });
      return;
    }

    setIsStaking(true);
    try {
      // Simulate staking transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newStaked = stakingData.staked + parseFloat(stakeAmount);
      const newTier = newStaked >= 100000 ? 'fund' : newStaked >= 10000 ? 'pro' : 'basic';
      const newDailyCredits = newTier === 'fund' ? 2000 : newTier === 'pro' ? 500 : 100;
      
      setStakingData(prev => ({
        ...prev,
        staked: newStaked,
        tier: newTier,
        dailyCredits: newDailyCredits
      }));
      
      setStakeAmount('');
      toast({
        title: "Staking Successful",
        description: `Successfully staked ${stakeAmount} $JNO tokens.`
      });
    } catch (error) {
      toast({
        title: "Staking Failed",
        description: "Failed to stake tokens. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to unstake.",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(unstakeAmount) > stakingData.staked) {
      toast({
        title: "Insufficient Balance",
        description: "You cannot unstake more than your staked amount.",
        variant: "destructive"
      });
      return;
    }

    setIsUnstaking(true);
    try {
      // Simulate unstaking transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newStaked = stakingData.staked - parseFloat(unstakeAmount);
      const newTier = newStaked >= 100000 ? 'fund' : newStaked >= 10000 ? 'pro' : 'basic';
      const newDailyCredits = newTier === 'fund' ? 2000 : newTier === 'pro' ? 500 : 100;
      
      setStakingData(prev => ({
        ...prev,
        staked: newStaked,
        tier: newTier,
        dailyCredits: newDailyCredits
      }));
      
      setUnstakeAmount('');
      toast({
        title: "Unstaking Successful",
        description: `Successfully unstaked ${unstakeAmount} $JNO tokens.`
      });
    } catch (error) {
      toast({
        title: "Unstaking Failed",
        description: "Failed to unstake tokens. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUnstaking(false);
    }
  };
  return <div className="h-full overflow-y-auto staking-scrollbar"
    style={{
      scrollBehavior: 'smooth',
      scrollbarWidth: 'thin',
      scrollbarColor: 'hsl(var(--muted-foreground) / 0.3) transparent'
    }}
  >
      <div className="p-6 max-w-6xl mx-auto">
      

      {/* Staking Overview */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Staking Overview</CardTitle>
            <Badge variant="secondary" className="capitalize flex items-center gap-1">
              <Crown className="w-3 h-3" />
              {stakingData.tier} Tier
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Coins className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stakingData.staked.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">$JNO Staked</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stakingData.credits}</div>
              <div className="text-sm text-muted-foreground">Research Credits</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stakingData.dailyCredits}</div>
              <div className="text-sm text-muted-foreground">Daily Limit</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Daily Credits Used</span>
              <span>{stakingData.dailyCredits - stakingData.credits} / {stakingData.dailyCredits}</span>
            </div>
            <Progress value={(stakingData.dailyCredits - stakingData.credits) / stakingData.dailyCredits * 100} />
          </div>
          
          <div className="flex gap-3 mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Stake More $JNO</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Stake $JNO Tokens</DialogTitle>
                  <DialogDescription>
                    Increase your stake to unlock higher tier benefits and more research credits.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="stake-amount">Amount to Stake</Label>
                    <Input
                      id="stake-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleStake} 
                    disabled={isStaking}
                  >
                    {isStaking ? 'Staking...' : 'Stake Tokens'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Unstake</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Unstake $JNO Tokens</DialogTitle>
                  <DialogDescription>
                    Withdraw your staked tokens. Note that this may affect your tier benefits.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                    <Input
                      id="unstake-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      max={stakingData.staked}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Available: {stakingData.staked.toLocaleString()} $JNO
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleUnstake} 
                    disabled={isUnstaking}
                    variant="outline"
                  >
                    {isUnstaking ? 'Unstaking...' : 'Unstake Tokens'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Tier Benefits</CardTitle>
          <CardDescription>Your current staking tier unlocks these features</CardDescription>
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
      </div>
    </div>;
}