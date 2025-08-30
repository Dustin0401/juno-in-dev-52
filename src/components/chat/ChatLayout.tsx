import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ChatSidebar } from './ChatSidebar'
import { ChatHeader } from './ChatHeader'
import { cn } from '@/lib/utils'

export function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  
  // Only show header on chat routes
  const isChatRoute = location.pathname.startsWith('/chat')

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
        {isChatRoute && (
          <ChatHeader 
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
        
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}