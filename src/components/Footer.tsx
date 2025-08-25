import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageSquare, Mail } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { name: "Home", href: "#" },
    { name: "Agents", href: "#agents" },
    { name: "Features", href: "#features" },
    { name: "Tokenomics", href: "#tokenomics" }
  ],
  "Resources": [
    { name: "Documentation", href: "#" },
    { name: "API", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Support", href: "#" }
  ]
};

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">J</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Juno</span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-native crypto research with institutional-grade insights.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* CTA */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get Started</h3>
            <p className="text-muted-foreground text-sm">
              Join thousands of traders using AI for smarter crypto decisions.
            </p>
            <Button variant="hero" size="sm">
              Start Free Trial
            </Button>
          </div>
        </div>
        
        <div className="border-t border-line mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Juno. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Empowering the next generation of crypto investors, one AI at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};