import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import HowItWorks from "./pages/HowItWorks";
import MoneySystems from "./pages/MoneySystems";
import WorkSystems from "./pages/WorkSystems";
import WealthDashboard from "./pages/products/WealthDashboard";
import CEOLifePlanner from "./pages/products/CEOLifePlanner";
import MediaCompanySpreadsheet from "./pages/products/MediaCompanySpreadsheet";
import PromptLibrary from "./pages/PromptLibrary";
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
import PitchDeckBuilder from "./pages/tools/PitchDeckBuilder";
import LifeSimplifier from "./pages/tools/LifeSimplifier";
import LinkedIn21DayContentPlan from "./pages/tools/LinkedIn21DayContentPlan";
import LifeCoachAI from "./pages/tools/LifeCoachAI";
import ServicePricingWorkbook from "./pages/tools/ServicePricingWorkbook";
import AIAccelerator from "./pages/courses/AIAccelerator";
import ChatGPT101 from "./pages/courses/ChatGPT101";
import MediaCompany from "./pages/courses/MediaCompany";
import Advisors from "./pages/Advisors";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import Sessions from "./pages/Sessions";
import AIFoundations from "./pages/sessions/AIFoundations";
import AIContentSystems from "./pages/sessions/AIContentSystems";
import AutomationZapier from "./pages/sessions/AutomationZapier";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ContentViewer from "./pages/ContentViewer";

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
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/money-systems" element={<MoneySystems />} />
          <Route path="/work-systems" element={<WorkSystems />} />
          <Route path="/products/wealth-dashboard" element={<WealthDashboard />} />
          <Route path="/products/ceo-life-planner" element={<CEOLifePlanner />} />
          <Route path="/products/media-company-spreadsheet" element={<MediaCompanySpreadsheet />} />
          <Route path="/prompts" element={<PromptLibrary />} />
          <Route path="/advisors" element={<Advisors />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/ai-foundations" element={<AIFoundations />} />
          <Route path="/sessions/ai-content-systems" element={<AIContentSystems />} />
          <Route path="/sessions/automation-zapier" element={<AutomationZapier />} />
          <Route path="/courses/ai-accelerator" element={<AIAccelerator />} />
          <Route path="/courses/chatgpt-101" element={<ChatGPT101 />} />
          <Route path="/courses/media-company" element={<MediaCompany />} />
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
          <Route path="/tools/pitch-deck-builder" element={<PitchDeckBuilder />} />
          <Route path="/tools/life-simplifier" element={<LifeSimplifier />} />
          <Route path="/tools/linkedin-21-day-content-plan" element={<LinkedIn21DayContentPlan />} />
          <Route path="/tools/life-coach-ai" element={<LifeCoachAI />} />
          <Route path="/tools/service-pricing-workbook" element={<ServicePricingWorkbook />} />
          <Route path="/purchase-success" element={<PurchaseSuccess />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/content/:systemId/:contentId" element={<ContentViewer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
