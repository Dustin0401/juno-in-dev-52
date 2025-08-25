import { useState, useEffect } from "react";
import { Coins, Users, Zap, Vote, Award, Shield } from "lucide-react";

const TokenFlow = () => {
  const [animationState, setAnimationState] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState(prev => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 'stake', label: 'Stake $JNO', x: 100, y: 100 },
    { id: 'credits', label: 'Research Credits', x: 300, y: 50 },
    { id: 'agents', label: 'Agent Calls', x: 500, y: 100 },
    { id: 'fees', label: 'Platform Fees', x: 500, y: 200 },
    { id: 'burn', label: 'Burn', x: 300, y: 250 },
    { id: 'treasury', label: 'Treasury', x: 450, y: 300 },
    { id: 'operators', label: 'Operators', x: 200, y: 300 }
  ];

  return (
    <div className="relative h-80 w-full">
      <svg viewBox="0 0 600 350" className="w-full h-full">
        {/* Connections */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
          </marker>
        </defs>
        
        {/* Flow lines */}
        <path d="M 120 110 Q 200 80 280 60" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" className="opacity-60" />
        <path d="M 320 70 Q 400 85 480 110" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" className="opacity-60" />
        <path d="M 500 120 L 500 180" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" className="opacity-60" />
        <path d="M 480 220 Q 400 235 320 240" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" className="opacity-60" />
        <path d="M 470 220 Q 460 260 440 280" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" className="opacity-60" />
        <path d="M 280 260 Q 240 280 220 290" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" className="opacity-60" />
        
        {/* Animated flow dots */}
        {[0, 1, 2, 3].map(index => (
          <circle
            key={index}
            r="3"
            fill="hsl(var(--primary))"
            className={`transition-all duration-1000 ${animationState === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <animateMotion dur="2s" repeatCount="1" begin={`${index * 0.5}s`}>
              <path d="M 120 110 Q 200 80 280 60 Q 400 85 480 110 L 500 180 Q 400 235 320 240 Q 240 280 220 290" />
            </animateMotion>
          </circle>
        ))}
        
        {/* Nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle 
              cx={node.x} 
              cy={node.y} 
              r="24" 
              fill="hsl(var(--surface))" 
              stroke="hsl(var(--primary))" 
              strokeWidth="2"
            />
            <text 
              x={node.x} 
              y={node.y + 35} 
              textAnchor="middle" 
              className="text-xs fill-muted-foreground font-mono"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const benefits = [
  {
    icon: Coins,
    title: "Stake → Credits",
    description: "Stake $JNO tokens to earn daily Research Credits for AI agent calls"
  },
  {
    icon: Zap,
    title: "Priority Access",
    description: "Higher tiers get faster queues and early access to new agent features"
  },
  {
    icon: Award,
    title: "Vision & Backtests",
    description: "Upload charts for AI analysis and run historical strategy backtests"
  },
  {
    icon: Vote,
    title: "Governance",
    description: "Vote on agent parameters, platform features, and treasury allocation"
  },
  {
    icon: Users,
    title: "Operator Rewards",
    description: "Data providers and model hosts earn $JNO for accuracy and uptime"
  },
  {
    icon: Shield,
    title: "Fee Discounts",
    description: "Pay platform fees in $JNO for significant discounts on premium features"
  }
];

export const TokenomicsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Fuel the Research with $JNO
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A utility token that powers Juno's AI research ecosystem. Stake to unlock deeper insights, 
            govern the platform, and participate in the operator economy.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Benefits */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Token Flow Animation */}
          <div className="bg-surface border border-line rounded-xl p-8">
            <h3 className="text-2xl font-display font-semibold text-foreground mb-6 text-center">
              Token Flow Pipeline
            </h3>
            <TokenFlow />
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Stake → Research Credits → Agent Calls → Fees Split (Burn/Treasury/Operators) → Governance
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Disclaimer:</span> $JNO is a utility token for access and governance. Not investment advice.
          </p>
        </div>
      </div>
    </section>
  );
};