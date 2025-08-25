import { Zap, Network, MousePointer, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Portfolio Assistant",
    description: "Intelligent analysis of your holdings with personalized risk assessment and rebalancing suggestions."
  },
  {
    icon: Network, 
    title: "Multi-Agent Intelligence",
    description: "Five specialized AI agents collaborate to provide comprehensive market analysis with institutional-grade insights."
  },
  {
    icon: MousePointer,
    title: "One-Click Investing",
    description: "Execute research-backed trade ideas instantly with integrated paper trading and risk management tools."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Simplicity", 
    description: "Professional-grade research tools optimized for mobile, making institutional insights accessible anywhere."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with cutting-edge AI to help you navigate crypto markets and enhance your 
            investment strategy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-background/50 border border-line rounded-xl p-8 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};