import type { Conversation, ChatMessage } from '@/types';

const CONVERSATIONS_KEY = 'juno_conversations';

export function saveConversations(conversations: Conversation[]): void {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
}

export function loadConversations(): Conversation[] {
  try {
    const stored = localStorage.getItem(CONVERSATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function createConversation(
  id: string,
  messages: ChatMessage[]
): Conversation {
  const title = generateConversationTitle(messages);
  const now = new Date();
  
  return {
    id,
    title,
    messages,
    created_at: now,
    updated_at: now
  };
}

export function updateConversation(
  conversations: Conversation[],
  id: string,
  messages: ChatMessage[]
): Conversation[] {
  const existingIndex = conversations.findIndex(c => c.id === id);
  const title = generateConversationTitle(messages);
  const now = new Date();
  
  if (existingIndex >= 0) {
    // Update existing conversation
    const updated = [...conversations];
    updated[existingIndex] = {
      ...updated[existingIndex],
      title,
      messages,
      updated_at: now
    };
    return updated;
  } else {
    // Create new conversation
    const newConversation: Conversation = {
      id,
      title,
      messages,
      created_at: now,
      updated_at: now
    };
    return [newConversation, ...conversations];
  }
}

export function deleteConversation(
  conversations: Conversation[],
  id: string
): Conversation[] {
  return conversations.filter(c => c.id !== id);
}

function generateConversationTitle(messages: ChatMessage[]): string {
  const userMessage = messages.find(m => m.role === 'user');
  if (!userMessage) return 'New Chat';
  
  const content = userMessage.content.trim();
  if (content.length <= 40) return content;
  
  return content.substring(0, 37) + '...';
}