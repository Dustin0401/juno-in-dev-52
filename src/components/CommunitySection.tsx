import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

export const CommunitySection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface border border-line rounded-2xl p-12 text-center shadow-elevation">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Users className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Join Our AI-Powered Community
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a growing community of forward-thinking crypto 
            enthusiasts using AI to shape the future.
          </p>
          
          <Button variant="hero" size="xl" className="group">
            Join the Community
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="mt-8 text-sm text-muted-foreground">
            5,000+ members · 24/7 active discussions
          </div>
        </div>
      </div>
    </section>
  );
};