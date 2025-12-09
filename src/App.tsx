import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WriteItBetter from "./pages/tools/WriteItBetter";
import RewriteMessage from "./pages/tools/RewriteMessage";
import MeetingToActionPlan from "./pages/tools/MeetingToActionPlan";
import DecisionHelper from "./pages/tools/DecisionHelper";
import WeeklyPlanBuilder from "./pages/tools/WeeklyPlanBuilder";
import PersonalAIAssistantSetup from "./pages/tools/PersonalAIAssistantSetup";
import FixMyContent from "./pages/tools/FixMyContent";
import IdeaToRevenue from "./pages/tools/IdeaToRevenue";
import BrandVoiceGenerator from "./pages/tools/BrandVoiceGenerator";
import SocialBioBuilder from "./pages/tools/SocialBioBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools/write-it-better" element={<WriteItBetter />} />
          <Route path="/tools/rewrite-message" element={<RewriteMessage />} />
          <Route path="/tools/meeting-to-action-plan" element={<MeetingToActionPlan />} />
          <Route path="/tools/decision-helper" element={<DecisionHelper />} />
          <Route path="/tools/weekly-plan-builder" element={<WeeklyPlanBuilder />} />
          <Route path="/tools/personal-ai-assistant-setup" element={<PersonalAIAssistantSetup />} />
          <Route path="/tools/fix-my-content" element={<FixMyContent />} />
          <Route path="/tools/idea-to-revenue" element={<IdeaToRevenue />} />
          <Route path="/tools/brand-voice-generator" element={<BrandVoiceGenerator />} />
          <Route path="/tools/social-bio-builder" element={<SocialBioBuilder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
