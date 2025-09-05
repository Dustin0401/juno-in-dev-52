import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Plus, TrendingUp, Upload, Mic, Calendar, Users, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Conversation } from '@/types';
const mockConversations: Conversation[] = [{
  id: '1',
  title: 'BTC Analysis - Dec 2024',
  messages: [],
  created_at: new Date(),
  updated_at: new Date()
}, {
  id: '2',
  title: 'ETH Technical Levels',
  messages: [],
  created_at: new Date(),
  updated_at: new Date()
}];
export function ChatSidebar() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  return <div className="h-full flex flex-col bg-surface/50">
      {/* New Chat Button */}
      <div className="p-4">
        <Button variant="hero" size="sm" className="w-full justify-start" asChild>
          <NavLink to="/chat/new">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </NavLink>
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <div className="p-4 space-y-2">
        <NavLink to="/chat" className={({
        isActive
      }) => cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground")}>
          <MessageSquare className="w-4 h-4" />
          Chat
        </NavLink>

        <NavLink to="/portfolio" className={({
        isActive
      }) => cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground")}>
          <TrendingUp className="w-4 h-4" />
          Portfolio
        </NavLink>

        <NavLink to="/voice" className={({
        isActive
      }) => cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground")}>
          <Mic className="w-4 h-4" />
          Voice
        </NavLink>

        <NavLink to="/tasks" className={({
        isActive
      }) => cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground")}>
          <Calendar className="w-4 h-4" />
          Tasks
        </NavLink>

        <NavLink to="/staking" className={({
        isActive
      }) => cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground")}>
          <Coins className="w-4 h-4" />
          Staking
        </NavLink>


      </div>

      <Separator />

      {/* Recent Conversations */}
      <div className="flex-1 p-4">
        <h3 className="text-sm font-medium text-muted mb-3">Recent</h3>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {conversations.map(conversation => <NavLink key={conversation.id} to={`/chat/${conversation.id}`} className={({
            isActive
          }) => cn("block px-3 py-2 rounded-lg text-sm transition-colors truncate", isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground")}>
                {conversation.title}
              </NavLink>)}
          </div>
        </ScrollArea>
      </div>
    </div>;
}