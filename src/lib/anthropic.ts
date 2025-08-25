interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}

export class AnthropicClient {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor() {
    this.apiKey = localStorage.getItem('anthropic_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('anthropic_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey || localStorage.getItem('anthropic_api_key');
  }

  hasApiKey(): boolean {
    return !!this.getApiKey();
  }

  async sendMessage(
    messages: AnthropicMessage[],
    systemPrompt?: string,
    model: string = 'claude-3-5-sonnet-20241022'
  ): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Anthropic API key not set. Please configure it in settings.');
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 1000,
          system: systemPrompt,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
      }

      const data: AnthropicResponse = await response.json();
      return data.content[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Anthropic API call failed:', error);
      throw error;
    }
  }
}

export const anthropicClient = new AnthropicClient();