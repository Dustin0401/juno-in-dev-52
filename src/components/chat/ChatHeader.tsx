import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, Wallet } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

interface ChatHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

const ASSET_FILTERS = ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'ARB']
const TIMEFRAMES = ['1h', '4h', '1d', '1w', '1M']

export function ChatHeader({ sidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()

  const mockStakingTier = 'analyst' // This would come from real staking data

  return (
    <header className="h-16 border-b border-line bg-surface/30 flex items-center justify-between px-4">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-4 h-4" />
        </Button>

        {/* Asset Filters */}
        <div className="hidden md:flex items-center gap-2">
          {ASSET_FILTERS.map((asset) => (
            <Button 
              key={asset}
              variant="outline" 
              size="sm"
              className="h-7 px-2 text-xs"
            >
              {asset}
            </Button>
          ))}
        </div>

        {/* Timeframe Chips */}
        <div className="hidden lg:flex items-center gap-1">
          {TIMEFRAMES.map((tf) => (
            <Button
              key={tf}
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Tier Badge */}
        {isConnected && (
          <Badge variant="secondary" className="capitalize">
            {mockStakingTier}
          </Badge>
        )}

        {/* Wallet Connection */}
        {isConnected ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => disconnect()}
            className="gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </Button>
        ) : (
          <Button
            variant="hero"
            size="sm"
            onClick={() => open()}
            className="gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </Button>
        )}
      </div>
    </header>
  )
}