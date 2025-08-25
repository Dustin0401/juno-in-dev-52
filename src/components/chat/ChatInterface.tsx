import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Send, Paperclip, Command } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { SlashCommandMenu } from './SlashCommandMenu'
import { AgentCoordinator } from '@/lib/agents/coordinator'
import type { ChatMessage as ChatMessageType, SlashCommand, AgentType, MarketContext } from '@/types'

const SLASH_COMMANDS: SlashCommand[] = [
  { command: '/chart', description: 'Analyze uploaded chart', agent: 'technical' },
  { command: '/backtest', description: 'Run backtest analysis', agent: 'juno' },
  { command: '/onchain', description: 'On-chain data analysis', agent: 'onchain' },
  { command: '/macro', description: 'Macro environment analysis', agent: 'macro' },
  { command: '/sentiment', description: 'Market sentiment analysis', agent: 'sentiment' },
  { command: '/screen', description: 'Screen assets by criteria', agent: 'juno' },
  { command: '/alert', description: 'Set price/condition alert', agent: 'juno' },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [input, setInput] = useState('')
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coordinator = useRef(new AgentCoordinator())
  const { id } = useParams()
  const navigate = useNavigate()

  // Reset conversation when navigating to /chat/new
  useEffect(() => {
    if (id === 'new') {
      setMessages([])
      setInput('')
      setAttachedFiles([])
      setIsLoading(false)
      setShowSlashMenu(false)
    }
  }, [id])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Determine which agents to use based on slash command
    const requestedAgents = extractAgentsFromInput(input)
    
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      attachments: attachedFiles.map(f => f.name)
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    try {
      // Create market context
      const context: MarketContext = {
        market_clock: new Date().toISOString(),
        risk_regime: 'calm', // Would be determined by market data
        news_heat: Math.floor(Math.random() * 100),
        chain_activity_heat: Math.floor(Math.random() * 100)
      }

      // Process query with agent coordinator
      const response = await coordinator.current.processQuery(
        currentInput,
        context,
        undefined, // userProfile would come from state
        attachedFiles,
        requestedAgents
      )

      const agentResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.summary,
        timestamp: new Date(),
        agents_used: response.agent_evidence.map(e => e.agent as AgentType),
        response
      }

      setMessages(prev => [...prev, agentResponse])
      setAttachedFiles([])
      
      // If we're on /chat/new, navigate to a new conversation ID
      if (id === 'new') {
        const conversationId = Date.now().toString()
        navigate(`/chat/${conversationId}`, { replace: true })
      }
    } catch (error) {
      console.error('Error processing message:', error)
      
      const errorResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setShowSlashMenu(value.startsWith('/') && value.length > 1)
  }

  const handleSlashCommand = (command: SlashCommand) => {
    setInput(command.command + ' ')
    setShowSlashMenu(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const extractAgentsFromInput = (input: string): AgentType[] | undefined => {
    const command = input.split(' ')[0].toLowerCase()
    
    switch (command) {
      case '/sentiment':
        return ['sentiment']
      case '/macro':
        return ['macro']
      case '/chart':
        return ['technical']
      case '/onchain':
        return ['onchain']
      case '/backtest':
      case '/screen':
      case '/alert':
        return ['sentiment', 'macro', 'technical', 'onchain']
      default:
        return undefined
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted mb-4">
                <Command className="w-5 h-5" />
                <span>Start with a slash command or ask anything</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {SLASH_COMMANDS.slice(0, 4).map((cmd) => (
                  <Badge 
                    key={cmd.command}
                    variant="outline" 
                    className="cursor-pointer hover:bg-surface px-3 py-1"
                    onClick={() => handleSlashCommand(cmd)}
                  >
                    {cmd.command}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted space-y-1">
                <p>Ask me about any crypto asset, upload charts, or try these examples:</p>
                <div className="space-y-1 mt-3">
                  <p className="text-xs">"What's the sentiment on BTC right now?"</p>
                  <p className="text-xs">"Analyze ETH on-chain flows this week"</p>
                  <p className="text-xs">"/chart [upload image] - Technical analysis"</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-surface rounded-2xl px-4 py-3 max-w-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                  </div>
                  <span className="text-sm text-muted">Agents working...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-line p-4 bg-surface/30">
        <div className="max-w-4xl mx-auto relative">
          {showSlashMenu && (
            <SlashCommandMenu
              commands={SLASH_COMMANDS}
              onSelect={handleSlashCommand}
              onClose={() => setShowSlashMenu(false)}
            />
          )}
          
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about any crypto asset, upload a chart, or use slash commands..."
                className="min-h-[44px] max-h-32 resize-none pr-12 bg-background"
                disabled={isLoading}
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,.csv"
                multiple
                onChange={handleFileUpload}
              />
            </div>

            
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              variant="hero"
              className="h-11 w-11"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* File attachments preview */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attachedFiles.map((file, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-2 py-1 cursor-pointer hover:bg-surface"
                  onClick={() => removeFile(index)}
                >
                  {file.name} ×
                </Badge>
              ))}
            </div>
          )}
          
          <div className="text-xs text-muted mt-2 text-center">
            Press Enter to send, Shift+Enter for new line • Try /chart, /backtest, /onchain
          </div>
        </div>
      </div>
    </div>
  )
}