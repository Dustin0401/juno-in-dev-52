import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const navigate = useNavigate();

  const navItems = [
    { name: "Agents", href: "#agents" },
    { name: "Features", href: "#features" }, 
    { name: "Team", href: "/team" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Community", href: "#community" }
  ];

  const handleWalletConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      await open();
      // Navigation will be handled by the useEffect below
    }
  };

  // Navigate to chat page when wallet connects
  useEffect(() => {
    if (isConnected) {
      navigate('/chat');
    }
  }, [isConnected, navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">J</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Juno</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant={isConnected ? "secondary" : "outline"} 
              size="sm"
              onClick={handleWalletConnect}
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? 
                `${address?.slice(0, 6)}...${address?.slice(-4)}` : 
                "Connect Wallet"
              }
            </Button>
            <Button variant="hero" size="sm">
              Get App
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-line py-4 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-line">
              <Button 
                variant={isConnected ? "secondary" : "outline"} 
                size="sm"
                onClick={handleWalletConnect}
              >
                <Wallet className="w-4 h-4" />
                {isConnected ? 
                  `${address?.slice(0, 6)}...${address?.slice(-4)}` : 
                  "Connect Wallet"
                }
              </Button>
              <Button variant="hero" size="sm">
                Get App
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};