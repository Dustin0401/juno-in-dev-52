import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatPreview = () => {
  const messages = [
    {
      type: 'user',
      content: 'Analyze my BTC/ETH portfolio for the next week',
      time: '2:34 PM'
    },
    {
      type: 'juno',
      content: 'I\'ve analyzed your portfolio across all agents. Here\'s what I found:',
      time: '2:34 PM'
    },
    {
      type: 'juno',
      content: '• **Sentiment Agent**: +1.7 score (89% confidence) - institutional accumulation narrative\n• **Technical Agent**: +1.2 score - BTC testing $45k resistance, ETH in ascending triangle\n• **Recommendation**: 65% BTC, 35% ETH allocation optimal for 1-week horizon',
      time: '2:34 PM'
    }
  ];

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-elevation">
      {/* Header */}
      <div className="border-b border-line p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Juno Assistant</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Online
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="p-4 space-y-4 h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs rounded-lg p-3 ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground ml-8' 
                : 'bg-background border border-line mr-8'
            }`}>
              <div className="text-sm whitespace-pre-line">
                {message.content}
              </div>
              <div className={`text-xs mt-1 opacity-70 ${
                message.type === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-background border border-line rounded-lg px-3 py-2">
            <span className="text-muted-foreground text-sm">Ask Juno anything...</span>
          </div>
          <Button size="icon" variant="ghost">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const JunoChatSection = () => {
  return (
    <section className="py-20 px-6 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
                Meet Juno,<br />
                Your AI Portfolio Assistant
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Chat naturally with Juno to get personalized portfolio analysis, 
                market insights, and trade recommendations tailored to your investment style.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-foreground">Instant portfolio & diversification analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-foreground">Real-time risk assessment and alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-foreground">Personalized trade ideas with risk/reward</span>
              </div>
            </div>
            
            <Button variant="hero" size="lg">
              Try Juno Now
            </Button>
          </div>
          
          {/* Right Content - Chat Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl"></div>
            <div className="relative z-10">
              <ChatPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};