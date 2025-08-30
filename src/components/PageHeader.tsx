import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, Settings, Bell, BarChart3 } from 'lucide-react'
import { AlertsDropdown } from '@/components/alerts/AlertsDropdown'
import { useNavigate } from 'react-router-dom'
import { WalletModal } from '@/components/chat/WalletModal'
import { useState } from 'react'
import profileAvatar from '@/assets/profile-avatar.png'

interface PageHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  children?: ReactNode
}

export function PageHeader({ sidebarOpen, onToggleSidebar, children }: PageHeaderProps) {
  const navigate = useNavigate()
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  return (
    <>
      <header className="h-14 border-b border-line bg-surface/30 flex items-center justify-between px-4">
        {/* Left side - Sidebar toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="hover:bg-surface"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Center - Page-specific content */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>

        {/* Right side - Common actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/settings')}
            className="hover:bg-surface"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <AlertsDropdown />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/backtest')}
            className="hover:bg-surface"
          >
            <BarChart3 className="w-5 h-5" />
          </Button>

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
        </div>
      </header>

      <WalletModal 
        open={walletModalOpen} 
        onOpenChange={setWalletModalOpen} 
      />
    </>
  )
}