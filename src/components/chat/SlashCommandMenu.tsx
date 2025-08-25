import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Command } from 'lucide-react'
import type { SlashCommand } from '@/types'

interface SlashCommandMenuProps {
  commands: SlashCommand[]
  onSelect: (command: SlashCommand) => void
  onClose: () => void
}

export function SlashCommandMenu({ commands, onSelect, onClose }: SlashCommandMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <Card 
      ref={menuRef}
      className="absolute bottom-full left-0 mb-2 w-full max-w-md p-2 bg-background border-line shadow-elevation z-50"
    >
      <div className="flex items-center gap-2 mb-2 px-2 py-1">
        <Command className="w-4 h-4 text-muted" />
        <span className="text-sm text-muted">Slash Commands</span>
      </div>
      
      <div className="space-y-1">
        {commands.map((command) => (
          <button
            key={command.command}
            onClick={() => onSelect(command)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors group"
          >
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono text-primary">
                {command.command}
              </code>
              <span className="text-sm text-muted group-hover:text-foreground">
                {command.description}
              </span>
            </div>
            
            {command.agent && (
              <Badge variant="secondary" className="text-xs capitalize">
                {command.agent}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </Card>
  )
}