import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageSquare, Plus, TrendingUp, Mic, Calendar, Coins, MoreHorizontal, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { loadConversations, deleteConversation, saveConversations } from '@/lib/conversations';
import type { Conversation } from '@/types';

export function ChatSidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setConversations(loadConversations());
    
    // Listen for conversation updates
    const handleConversationUpdate = () => {
      setConversations(loadConversations());
    };
    
    window.addEventListener('conversationUpdated', handleConversationUpdate);
    return () => window.removeEventListener('conversationUpdated', handleConversationUpdate);
  }, []);

  const handleDeleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const updated = deleteConversation(conversations, conversationId);
    setConversations(updated);
    saveConversations(updated);
    
    // Navigate to new chat if deleting current conversation
    if (window.location.pathname === `/chat/${conversationId}`) {
      navigate('/chat/new');
    }
  };
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
            {conversations.map(conversation => (
              <div key={conversation.id} className="group relative">
                <NavLink 
                  to={`/chat/${conversation.id}`} 
                  className={({ isActive }) => cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors pr-8",
                    isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  <span className="truncate">{conversation.title}</span>
                </NavLink>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      onClick={(e) => handleDeleteConversation(conversation.id, e)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-3 h-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>;
}