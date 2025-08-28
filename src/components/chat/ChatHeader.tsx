import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, ChevronDown, Search, Bell, History, Settings, Bitcoin, Coins, Circle, Zap, Triangle, Hexagon, Diamond, Star, Square, Octagon } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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

// Crypto icon mapping
const getCryptoIcon = (crypto: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'BTC': <Bitcoin className="w-4 h-4 text-orange-500" />,
    'ETH': <Diamond className="w-4 h-4 text-blue-500" />,
    'SOL': <Circle className="w-4 h-4 text-purple-500" />,
    'AVAX': <Triangle className="w-4 h-4 text-red-500" />,
    'MATIC': <Hexagon className="w-4 h-4 text-purple-600" />,
    'ARB': <Circle className="w-4 h-4 text-blue-600" />,
    'ADA': <Star className="w-4 h-4 text-blue-400" />,
    'DOT': <Circle className="w-4 h-4 text-pink-500" />,
    'LINK': <Zap className="w-4 h-4 text-blue-500" />,
    'UNI': <Coins className="w-4 h-4 text-pink-400" />,
    'DOGE': <Circle className="w-4 h-4 text-yellow-500" />,
    'SHIB': <Triangle className="w-4 h-4 text-orange-400" />,
    'LTC': <Square className="w-4 h-4 text-gray-400" />,
    'XMR': <Octagon className="w-4 h-4 text-orange-600" />,
  }
  
  return iconMap[crypto] || <Coins className="w-4 h-4 text-primary" />
}

export function ChatHeader({ sidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  return (
    <>
      {/* Profile Avatar */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setWalletModalOpen(true)}
        className="fixed top-4 right-4 z-50 p-1 rounded-full hover:bg-surface"
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
    </>
  )
}