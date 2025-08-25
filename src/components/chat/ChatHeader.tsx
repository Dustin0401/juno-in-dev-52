import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Menu, ChevronDown, Search, Bell, History, Settings } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { WalletModal } from './WalletModal'
import profileAvatar from '@/assets/profile-avatar.png'

interface ChatHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

const CRYPTOCURRENCIES = [
  'BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'ARB', 'ADA', 'DOT', 'LINK', 'UNI',
  'AAVE', 'SUSHI', 'CRV', 'YFI', 'COMP', 'MKR', 'SNX', 'BAL', 'REN', 'KNC',
  'ZRX', 'LRC', 'BAND', 'ALPHA', 'XTZ', 'ALGO', 'ATOM', 'NEAR', 'FTM', 'LUNA',
  'FIL', 'VET', 'THETA', 'ICP', 'CAKE', 'RUNE', 'MANA', 'SAND', 'ENJ', 'CHZ',
  'FLOW', 'HOT', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ETC', 'XLM', 'TRX', 'EOS',
  'BSV', 'XMR', 'NEO', 'IOTA', 'DASH', 'ZEC', 'DCR', 'QTUM', 'ONT', 'ZIL',
  'ICX', 'WAVES', 'SC', 'DGB', 'RVN', 'NANO', 'XEM', 'STEEM', 'LSK', 'ARK'
]

const TIMEFRAMES = ['1h', '4h', '1d', '1w', '1M']

export function ChatHeader({ sidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  const { address, isConnected } = useAccount()
  const [selectedCrypto, setSelectedCrypto] = useState('')
  const [cryptoPopoverOpen, setCryptoPopoverOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)

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

        {/* Crypto Selector */}
        <div className="hidden md:flex items-center gap-2">
          <Popover open={cryptoPopoverOpen} onOpenChange={setCryptoPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs gap-2 min-w-[100px] justify-between"
              >
                {selectedCrypto || 'Select Crypto'}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search cryptocurrencies..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No cryptocurrency found.</CommandEmpty>
                  <CommandGroup>
                    {CRYPTOCURRENCIES.map((crypto) => (
                      <CommandItem
                        key={crypto}
                        value={crypto}
                        onSelect={(value) => {
                          setSelectedCrypto(value.toUpperCase())
                          setCryptoPopoverOpen(false)
                        }}
                      >
                        {crypto}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedCrypto && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs gap-1"
              onClick={() => {
                // This would trigger AI analysis for the selected crypto
                console.log(`Starting AI analysis for ${selectedCrypto}`)
              }}
            >
              <Search className="w-3 h-3" />
              Analyze {selectedCrypto}
            </Button>
          )}
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
        {/* Navigation Items */}
        <div className="hidden sm:flex items-center gap-1">
          <NavLink to="/alerts">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3 text-xs gap-2"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden md:inline">Alerts</span>
              </Button>
            )}
          </NavLink>
          
          <NavLink to="/backtests">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3 text-xs gap-2"
              >
                <History className="w-4 h-4" />
                <span className="hidden md:inline">Backtest</span>
              </Button>
            )}
          </NavLink>
          
          <NavLink to="/settings">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3 text-xs gap-2"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Settings</span>
              </Button>
            )}
          </NavLink>
        </div>
        {/* Tier Badge */}
        {isConnected && (
          <Badge variant="secondary" className="capitalize">
            {mockStakingTier}
          </Badge>
        )}

        {/* Profile Avatar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setWalletModalOpen(true)}
          className="p-1 rounded-full hover:bg-surface"
        >
          <img 
            src={profileAvatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        </Button>

        {/* Wallet Modal */}
        <WalletModal 
          open={walletModalOpen} 
          onOpenChange={setWalletModalOpen} 
        />
      </div>
    </header>
  )
}