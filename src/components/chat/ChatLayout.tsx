import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ChatSidebar } from './ChatSidebar'
import { ChatHeader } from './ChatHeader'
import { PortfolioHeader } from '@/components/headers/PortfolioHeader'
import { VoiceHeader } from '@/components/headers/VoiceHeader'
import { TasksHeader } from '@/components/headers/TasksHeader'
import { SettingsHeader } from '@/components/headers/SettingsHeader'
import { cn } from '@/lib/utils'

export function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  
  const getHeaderComponent = () => {
    if (location.pathname.startsWith('/chat')) {
      return (
        <ChatHeader 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )
    }
    
    if (location.pathname.startsWith('/portfolio')) {
      return (
        <PortfolioHeader 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )
    }
    
    if (location.pathname.startsWith('/voice')) {
      return (
        <VoiceHeader 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )
    }
    
    if (location.pathname.startsWith('/tasks')) {
      return (
        <TasksHeader 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )
    }
    
    if (location.pathname.startsWith('/settings')) {
      return (
        <SettingsHeader 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )
    }
    
    return null
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className={cn(
        "transition-all duration-300 border-r border-line bg-surface/30",
        sidebarOpen ? "w-72" : "w-0 overflow-hidden"
      )}>
        <ChatSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {getHeaderComponent()}
        
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}