import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import SocialProofBar from "@/components/homepage/SocialProofBar";
import ProblemSection from "@/components/homepage/ProblemSection";
import InlineTestimonial from "@/components/homepage/InlineTestimonial";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import ResultsSection from "@/components/homepage/ResultsSection";
import AboutSection from "@/components/homepage/AboutSection";
import FreeToolsSection from "@/components/homepage/FreeToolsSection";
import PricingSection from "@/components/homepage/PricingSection";
import FAQSection from "@/components/homepage/FAQSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <InlineTestimonial />
      <HowItWorksSection />
      <ResultsSection />
      <AboutSection />
      <FreeToolsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
