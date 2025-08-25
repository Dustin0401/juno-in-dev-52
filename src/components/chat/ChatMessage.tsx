import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Copy, Download, Share2, User, Bot } from 'lucide-react'
import { InsightCard } from './InsightCard'
import type { ChatMessage as ChatMessageType } from '@/types'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content)
  }

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          <AvatarFallback className={`${isUser ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-4xl ${isUser ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className={`flex items-center gap-2 mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-sm font-medium">
            {isUser ? 'You' : 'Juno'}
          </span>
          <span className="text-xs text-muted">
            {formatTime(message.timestamp)}
          </span>
          {message.agents_used && message.agents_used.length > 0 && (
            <div className="flex gap-1">
              {message.agents_used.map((agent) => (
                <Badge key={agent} variant="secondary" className="text-xs capitalize">
                  {agent}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Message Body */}
        {isUser ? (
          // User message
          <Card className={`${isUser ? 'bg-primary text-primary-foreground ml-12' : 'bg-surface mr-12'}`}>
            <CardContent className="p-4">
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-line opacity-70">
                  <div className="text-xs">
                    Attachments: {message.attachments.join(', ')}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          // Assistant message
          <div className="space-y-4">
            <Card className="bg-surface mr-12">
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{message.content}</p>
              </CardContent>
            </Card>
            
            {/* Enhanced insight card for responses */}
            {message.response && (
              <InsightCard response={message.response} />
            )}

            {/* Message actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyMessage}
                className="h-8 px-2 text-xs"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
              >
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </Button>
              {message.response && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}