import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";

export const NewsletterSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
          Newsletter
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stay updated with the latest news in crypto, 
          AI advancements, and Juno platform updates.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email"
            placeholder="Enter your email"
            className="bg-surface border-line text-foreground placeholder:text-muted-foreground"
          />
          <Button variant="hero" className="group">
            Subscribe
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};