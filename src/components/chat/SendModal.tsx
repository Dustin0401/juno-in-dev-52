import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

interface SendModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SendModal({ open, onOpenChange }: SendModalProps) {
  const { toast } = useToast()
  const [selectedToken, setSelectedToken] = useState<string>('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Mock token balances
  const tokenBalances = {
    JUNO: { balance: '1,250.50', symbol: 'JUNO', decimals: 18 },
    ETH: { balance: '2.45', symbol: 'ETH', decimals: 18 }
  }

  const handleSend = async () => {
    if (!selectedToken || !recipientAddress || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    if (!recipientAddress.startsWith('0x') || recipientAddress.length !== 42) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Transaction submitted",
        description: `Sending ${amount} ${selectedToken} to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`
      })
      onOpenChange(false)
      setSelectedToken('')
      setRecipientAddress('')
      setAmount('')
    }, 2000)
  }

  const maxAmount = selectedToken ? parseFloat(tokenBalances[selectedToken as keyof typeof tokenBalances]?.balance.replace(',', '') || '0') : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Tokens
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Token Selection */}
          <div className="space-y-2">
            <Label>Select Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger>
                <SelectValue placeholder="Choose token to send" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(tokenBalances).map(([token, data]) => (
                  <SelectItem key={token} value={token}>
                    <div className="flex items-center justify-between w-full">
                      <span>{data.symbol}</span>
                      <span className="text-muted-foreground ml-2">Balance: {data.balance}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Address */}
          <div className="space-y-2">
            <Label>Recipient Address</Label>
            <Input
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="font-mono text-sm"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Amount</Label>
              {selectedToken && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAmount(maxAmount.toString())}
                  className="text-xs h-auto p-1"
                >
                  Max: {tokenBalances[selectedToken as keyof typeof tokenBalances]?.balance}
                </Button>
              )}
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={maxAmount}
            />
          </div>

          {/* Transaction Summary */}
          {selectedToken && amount && recipientAddress && (
            <div className="p-3 bg-surface rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You're sending:</span>
                <span className="font-medium">{amount} {selectedToken}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">To:</span>
                <span className="font-mono text-xs">{recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network fee:</span>
                <span className="text-muted-foreground">~$0.50</span>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="flex gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-700 dark:text-orange-300">
              Double-check the recipient address. Transactions cannot be reversed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSend}
              disabled={isLoading || !selectedToken || !recipientAddress || !amount}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}