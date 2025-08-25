import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Header } from "@/components/Header";

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Chief Executive Officer",
    bio: "Former Goldman Sachs quant with 15+ years in algorithmic trading. Led AI initiatives at two unicorn fintech startups before founding Juno.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "alex@juno.ai",
    specialties: ["Strategic Leadership", "AI/ML", "Quantitative Finance"]
  },
  {
    id: 2,
    name: "Sarah Rodriguez",
    role: "Chief Technology Officer",
    bio: "Ex-OpenAI researcher who worked on GPT-4. PhD in Computer Science from Stanford with expertise in large language models and blockchain infrastructure.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "sarah@juno.ai",
    specialties: ["AI Research", "Blockchain", "System Architecture"]
  },
  {
    id: 3,
    name: "Marcus Thompson",
    role: "Chief Financial Officer",
    bio: "Former Managing Director at JPMorgan Chase. CPA with deep expertise in crypto markets, regulatory compliance, and institutional finance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "marcus@juno.ai",
    specialties: ["Corporate Finance", "Regulatory Compliance", "Risk Management"]
  },
  {
    id: 4,
    name: "Dr. Emily Zhang",
    role: "Head of Research",
    bio: "PhD in Economics from MIT. Former Federal Reserve economist specializing in monetary policy and crypto market dynamics. Published 30+ papers on DeFi.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "emily@juno.ai",
    specialties: ["Economic Research", "DeFi Analysis", "Market Modeling"]
  },
  {
    id: 5,
    name: "James Wilson",
    role: "VP of Engineering",
    bio: "Former Senior Engineer at Coinbase. Built trading infrastructure handling $1B+ daily volume. Expert in distributed systems and real-time data processing.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "james@juno.ai",
    specialties: ["Distributed Systems", "Trading Infrastructure", "DevOps"]
  },
  {
    id: 6,
    name: "Lisa Park",
    role: "Head of Product",
    bio: "Former Product Lead at Robinhood where she launched crypto trading features used by 10M+ users. Expert in user experience and fintech product strategy.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "lisa@juno.ai",
    specialties: ["Product Strategy", "UX Design", "Growth Analytics"]
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our world-class team combines decades of experience in AI, finance, and blockchain 
              to build the future of crypto intelligence.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-lg transition-all duration-300 border-line bg-surface/50">
                <CardContent className="p-6">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 pt-4 border-t border-line">
                    <a
                      href={member.linkedin}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.twitter}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-muted-foreground">Years Combined Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">$10B+</div>
              <div className="text-muted-foreground">Assets Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Research Papers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Market Monitoring</div>
            </div>
          </div>

          {/* Join Team CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Join Our Mission
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                We're always looking for exceptional talent to help us democratize 
                access to institutional-grade crypto intelligence.
              </p>
              <a
                href="mailto:careers@juno.ai"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}