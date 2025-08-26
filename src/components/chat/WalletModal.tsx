import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Copy, Send, Plus, LogOut, Wallet } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { useToast } from '@/hooks/use-toast'
import { DepositModal } from './DepositModal'
import { SendModal } from './SendModal'
import { useState } from 'react'

interface WalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)

  // Mock token balances - would come from real API/blockchain
  const mockBalances = {
    juno: '1,250.50',
    eth: '2.45'
  }

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard"
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    onOpenChange(false)
    toast({
      title: "Wallet disconnected",
      description: "You have been disconnected from your wallet"
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <div className="flex items-center gap-2 p-3 bg-surface rounded-lg">
              <span className="text-sm font-mono flex-1 truncate">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className="p-1 h-8 w-8"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Token Balances */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Token Balances</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">J</span>
                  </div>
                  <div>
                    <div className="font-medium">JUNO</div>
                    <div className="text-xs text-muted-foreground">Juno Token</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{mockBalances.juno}</div>
                  <div className="text-xs text-muted-foreground">≈ $1,875.75</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-500">ETH</span>
                  </div>
                  <div>
                    <div className="font-medium">ETH</div>
                    <div className="text-xs text-muted-foreground">Ethereum</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{mockBalances.eth}</div>
                  <div className="text-xs text-muted-foreground">≈ $9,562.50</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowDepositModal(true)}
            >
              <Plus className="w-4 h-4" />
              Deposit
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowSendModal(true)}
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>

          <Separator />

          {/* Disconnect Button */}
          <Button 
            variant="destructive" 
            className="w-full gap-2"
            onClick={handleDisconnect}
          >
            <LogOut className="w-4 h-4" />
            Disconnect Wallet
          </Button>
        </div>
      </DialogContent>

      {/* Nested Modals */}
      <DepositModal 
        open={showDepositModal} 
        onOpenChange={setShowDepositModal} 
      />
      <SendModal 
        open={showSendModal} 
        onOpenChange={setShowSendModal} 
      />
    </Dialog>
  )
}