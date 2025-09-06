import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/lib/wallet";
import { ChatLayout } from "@/components/chat/ChatLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import Team from "./pages/Team";
import Voice from "./pages/Voice";
import Tasks from "./pages/Tasks";
import Backtest from "./pages/Backtest";
import Staking from "./pages/Staking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/team" element={<Team />} />
            <Route path="/chat" element={<ChatLayout />}>
              <Route index element={<Chat />} />
              <Route path="new" element={<Chat />} />
              <Route path=":id" element={<Chat />} />
            </Route>
            <Route path="/portfolio" element={<ChatLayout />}>
              <Route index element={<Portfolio />} />
            </Route>
            <Route path="/settings" element={<ChatLayout />}>
              <Route index element={<Settings />} />
            </Route>
            <Route path="/staking" element={<ChatLayout />}>
              <Route index element={<Staking />} />
            </Route>
            <Route path="/voice" element={<ChatLayout />}>
              <Route index element={<Voice />} />
            </Route>
            <Route path="/tasks" element={<ChatLayout />}>
              <Route index element={<Tasks />} />
            </Route>
            <Route path="/backtest" element={<Backtest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
