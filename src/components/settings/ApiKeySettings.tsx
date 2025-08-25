import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Key, Shield } from 'lucide-react'
import { anthropicClient } from '@/lib/anthropic'
import { toast } from 'sonner'

export function ApiKeySettings() {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isValidKey, setIsValidKey] = useState(false)

  useEffect(() => {
    const savedKey = anthropicClient.getApiKey()
    if (savedKey) {
      setApiKey(savedKey)
      setIsValidKey(true)
    }
  }, [])

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key')
      return
    }

    if (!apiKey.startsWith('sk-')) {
      toast.error('Invalid API key format. Should start with "sk-"')
      return
    }

    anthropicClient.setApiKey(apiKey)
    setIsValidKey(true)
    toast.success('API key saved successfully')
  }

  const handleClearApiKey = () => {
    setApiKey('')
    localStorage.removeItem('anthropic_api_key')
    setIsValidKey(false)
    toast.success('API key cleared')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Anthropic API Configuration
          </CardTitle>
          <CardDescription>
            Configure your Anthropic API key to enable real-time AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="anthropic-key">Anthropic API Key</Label>
            <div className="relative">
              <Input
                id="anthropic-key"
                type={showApiKey ? 'text' : 'password'}
                placeholder="sk-or-v1-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
              Save API Key
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearApiKey}
              disabled={!isValidKey}
            >
              Clear
            </Button>
          </div>

          {isValidKey && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                API key is configured and ready to use.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Note:</strong> Your API key is stored locally in your browser. 
          For production use, we recommend connecting to Supabase for secure secret management.
        </AlertDescription>
      </Alert>
    </div>
  )
}