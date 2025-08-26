import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, QrCode } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

interface DepositModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const { address } = useAccount()
  const { toast } = useToast()
  const [selectedToken, setSelectedToken] = useState<'JUNO' | 'ETH'>('JUNO')

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard"
      })
    }
  }

  const depositInstructions = {
    JUNO: "Send JUNO tokens to this address to deposit them into your wallet.",
    ETH: "Send ETH or ERC-20 tokens to this address to deposit them into your wallet."
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit Tokens</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Token Selection */}
          <div className="space-y-2">
            <Label>Select Token</Label>
            <div className="flex gap-2">
              <Button
                variant={selectedToken === 'JUNO' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedToken('JUNO')}
              >
                JUNO
              </Button>
              <Button
                variant={selectedToken === 'ETH' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedToken('ETH')}
              >
                ETH
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-surface rounded-lg">
            <p className="text-sm text-muted-foreground">
              {depositInstructions[selectedToken]}
            </p>
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <Label>Your Wallet Address</Label>
            <div className="flex items-center gap-2">
              <Input
                value={address || ''}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAddress}
                className="px-3"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="flex justify-center p-6 bg-surface rounded-lg">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <QrCode className="w-16 h-16" />
              <span className="text-sm">QR Code</span>
              <span className="text-xs">Scan to get address</span>
            </div>
          </div>

          {/* Warning */}
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              ⚠️ Only send {selectedToken} tokens to this address. Sending other tokens may result in permanent loss.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}