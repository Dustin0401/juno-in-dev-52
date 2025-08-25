import { TrendingUp, BarChart3, Activity, Link2, Brain } from "lucide-react";

const agents = [
  {
    name: "Sentiment Agent",
    icon: TrendingUp,
    description: "Real-time crypto sentiment & narratives",
    capabilities: [
      "X/Telegram/Reddit analysis",
      "Influencer cohort tracking",
      "Funding & options sentiment"
    ]
  },
  {
    name: "Macro Agent", 
    icon: BarChart3,
    description: "Global macro and institutional flows",
    capabilities: [
      "Fed/ECB event monitoring",
      "Cross-asset correlation",
      "Risk regime detection"
    ]
  },
  {
    name: "Technical Agent",
    icon: Activity,
    description: "Actionable trend/level structure",
    capabilities: [
      "Multi-timeframe analysis",
      "Pattern recognition",
      "Risk/reward optimization"
    ]
  },
  {
    name: "On-Chain Agent",
    icon: Link2,
    description: "Blockchain flows & smart money",
    capabilities: [
      "Whale wallet tracking",
      "DEX/CEX flow analysis", 
      "Token unlock monitoring"
    ]
  },
  {
    name: "Juno Advisor",
    icon: Brain,
    description: "Synthesizes insights & personalizes",
    capabilities: [
      "Multi-agent fusion",
      "Risk-aware recommendations",
      "Portfolio optimization"
    ]
  }
];

export const AgentsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Your AI Agents,<br />
            Built for Smarter Crypto<br />
            Investing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five specialized agents working together to analyze markets, 
            sentiment, and on-chain data in real time—distilled into clear, 
            actionable insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isJunoAdvisor = agent.name === "Juno Advisor";
            return (
              <div 
                key={agent.name}
                className={`${
                  isJunoAdvisor 
                    ? "md:col-span-2 lg:col-span-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30 shadow-lg" 
                    : "bg-surface border-line"
                } border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group ${
                  isJunoAdvisor ? "hover:shadow-xl" : ""
                }`}
              >
                <div className={`flex items-center gap-3 mb-4 ${isJunoAdvisor ? "justify-center md:justify-start" : ""}`}>
                  <div className={`${isJunoAdvisor ? "w-12 h-12" : "w-10 h-10"} rounded-lg ${
                    isJunoAdvisor ? "bg-primary/20" : "bg-primary/10"
                  } flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
                    <Icon className={`${isJunoAdvisor ? "w-6 h-6" : "w-5 h-5"} text-primary`} />
                  </div>
                  <h3 className={`font-display font-semibold text-foreground ${
                    isJunoAdvisor ? "text-lg" : ""
                  }`}>
                    {agent.name}
                  </h3>
                </div>
                
                <p className={`text-muted-foreground mb-4 ${
                  isJunoAdvisor ? "text-center md:text-left text-base" : ""
                }`}>
                  {agent.description}
                </p>
                
                <div className={`${isJunoAdvisor ? "grid md:grid-cols-3 gap-4" : "space-y-2"}`}>
                  {agent.capabilities.map((capability, capIndex) => (
                    <div key={capIndex} className={`flex items-center gap-2 text-sm ${
                      isJunoAdvisor ? "justify-center md:justify-start" : ""
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">{capability}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-background rounded-lg border border-line font-mono text-xs">
                  <div className="text-primary">
                    {agent.name.toLowerCase().replace(' ', '_')}.analyze()
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};