import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
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
import CLevelStatementBuilder from "./pages/tools/CLevelStatementBuilder";
import RolesAndResponsibilitiesCreator from "./pages/tools/RolesAndResponsibilitiesCreator";
import BudgetBuilderPrompts from "./pages/tools/BudgetBuilderPrompts";
import LinkedInAuditToolExec from "./pages/tools/LinkedInAuditToolExec";
import EarlyRetirementCalculator from "./pages/tools/EarlyRetirementCalculator";
import PressReleaseGenerator from "./pages/tools/PressReleaseGenerator";
import PitchDeckReviewer from "./pages/tools/PitchDeckReviewer";
import LifeSimplifier from "./pages/tools/LifeSimplifier";
import LinkedIn21DayContentPlan from "./pages/tools/LinkedIn21DayContentPlan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
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
          <Route path="/tools/c-level-statement-builder" element={<CLevelStatementBuilder />} />
          <Route path="/tools/roles-and-responsibilities-creator" element={<RolesAndResponsibilitiesCreator />} />
          <Route path="/tools/budget-builder-prompts" element={<BudgetBuilderPrompts />} />
          <Route path="/tools/linkedin-audit-tool-exec" element={<LinkedInAuditToolExec />} />
          <Route path="/tools/early-retirement-calculator" element={<EarlyRetirementCalculator />} />
          <Route path="/tools/press-release-generator" element={<PressReleaseGenerator />} />
          <Route path="/tools/pitch-deck-reviewer" element={<PitchDeckReviewer />} />
          <Route path="/tools/life-simplifier" element={<LifeSimplifier />} />
          <Route path="/tools/linkedin-21-day-content-plan" element={<LinkedIn21DayContentPlan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
