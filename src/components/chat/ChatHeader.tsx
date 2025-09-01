import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu, ChevronDown, History, Settings, Bitcoin, Coins, Circle, Zap, Triangle, Hexagon, Diamond, Star, Square, Octagon, BarChart3 } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { WalletModal } from './WalletModal';
import { AlertsDropdown } from '@/components/alerts/AlertsDropdown';
import profileAvatar from '@/assets/profile-avatar.png';
interface ChatHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}
const CRYPTOCURRENCIES = ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'ARB', 'ADA', 'DOT', 'LINK', 'UNI', 'AAVE', 'SUSHI', 'CRV', 'YFI', 'COMP', 'MKR', 'SNX', 'BAL', 'REN', 'KNC', 'ZRX', 'LRC', 'BAND', 'ALPHA', 'XTZ', 'ALGO', 'ATOM', 'NEAR', 'FTM', 'LUNA', 'FIL', 'VET', 'THETA', 'ICP', 'CAKE', 'RUNE', 'MANA', 'SAND', 'ENJ', 'CHZ', 'FLOW', 'HOT', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ETC', 'XLM', 'TRX', 'EOS', 'BSV', 'XMR', 'NEO', 'IOTA', 'DASH', 'ZEC', 'DCR', 'QTUM', 'ONT', 'ZIL', 'ICX', 'WAVES', 'SC', 'DGB', 'RVN', 'NANO', 'XEM', 'STEEM', 'LSK', 'ARK'];
const TIMEFRAMES = ['1h', '4h', '1d', '1w', '1M'];

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
    'XMR': <Octagon className="w-4 h-4 text-orange-600" />
  };
  return iconMap[crypto] || <Coins className="w-4 h-4 text-primary" />;
};
export function ChatHeader({
  sidebarOpen,
  onToggleSidebar
}: ChatHeaderProps) {
  const {
    address,
    isConnected
  } = useAccount();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const location = useLocation();
  return <>
      <header className="h-16 border-b border-line bg-surface/50 backdrop-blur-sm flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </Button>

        </div>

        {/* Center Section - Market Selector */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Crypto Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="min-w-[120px] justify-between bg-surface border-line">
                <div className="flex items-center gap-2">
                  {getCryptoIcon(selectedCrypto)}
                  <span className="font-medium">{selectedCrypto}</span>
                </div>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-surface border-line" align="start">
              <Command>
                <CommandInput placeholder="Search crypto..." />
                <CommandEmpty>No cryptocurrency found.</CommandEmpty>
                <CommandList>
                  <ScrollArea className="h-64">
                    <CommandGroup>
                      {CRYPTOCURRENCIES.map(crypto => <CommandItem key={crypto} value={crypto} onSelect={() => setSelectedCrypto(crypto)} className="hover:bg-accent">
                          <div className="flex items-center gap-2">
                            {getCryptoIcon(crypto)}
                            <span>{crypto}</span>
                          </div>
                        </CommandItem>)}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-surface border border-line rounded-md p-1">
            {TIMEFRAMES.map(timeframe => <Button key={timeframe} variant={selectedTimeframe === timeframe ? "secondary" : "ghost"} size="sm" onClick={() => setSelectedTimeframe(timeframe)} className="text-xs px-2 py-1 h-7">
                {timeframe}
              </Button>)}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <NavLink to="/settings">
              <Settings className="w-4 h-4" />
            </NavLink>
          </Button>
          <AlertsDropdown />
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <NavLink to="/backtest">
              <BarChart3 className="w-4 h-4" />
            </NavLink>
          </Button>
          
          
          {/* Profile Avatar */}
          <Button variant="ghost" size="sm" onClick={() => setWalletModalOpen(true)} className="p-1 rounded-full hover:bg-accent">
            <img src={profileAvatar} alt="Profile" className="w-8 h-8 rounded-full" />
          </Button>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>;
}