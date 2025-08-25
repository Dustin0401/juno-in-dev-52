import { Button } from "@/components/ui/button";
import { Play, Download, ArrowRight } from "lucide-react";
import heroInterface from "@/assets/hero-crypto-interface.jpg";

const CodePreview = () => {
  return (
    <div className="bg-surface border border-line rounded-xl p-6 shadow-elevation font-mono text-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-destructive"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-3 h-3 rounded-full bg-accent"></div>
        <span className="text-muted-foreground ml-2">juno-terminal</span>
      </div>
      <div className="space-y-2">
        <div className="text-muted-foreground">// Agent Response</div>
        <div className="text-foreground">
          <span className="text-primary">SentimentAgent:</span> {"{"} 
        </div>
        <div className="ml-4 text-foreground">
          score: <span className="text-primary">+1.7</span>,
        </div>
        <div className="ml-4 text-foreground">
          confidence: <span className="text-primary">89</span>,
        </div>
        <div className="ml-4 text-foreground">
          narrative: <span className="text-accent">"institutional_accumulation"</span>
        </div>
        <div className="text-foreground">{"}"}</div>
        <div className="text-primary animate-pulse">█</div>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight">
              Your Crypto AI.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Meet Juno—AI-native crypto research with institutional-grade insights. 
              Smarter decisions, in one app.
            </p>
          </div>
          
          <div className="flex justify-center sm:justify-start">
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5" />
              Open Dapp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              Live Market Data
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              5 AI Agents Active
            </div>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <CodePreview />
          </div>
        </div>
      </div>
    </section>
  );
};