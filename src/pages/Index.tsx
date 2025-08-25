import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AgentsSection } from "@/components/AgentsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { JunoChatSection } from "@/components/JunoChatSection";
import { TokenomicsSection } from "@/components/TokenomicsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="agents">
          <AgentsSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <JunoChatSection />
        <div id="tokenomics">
          <TokenomicsSection />
        </div>
        <div id="community">
          <CommunitySection />
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
