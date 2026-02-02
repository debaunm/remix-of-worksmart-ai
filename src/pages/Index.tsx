import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import ProblemSection from "@/components/homepage/ProblemSection";
import GuideSection from "@/components/homepage/GuideSection";
import PlanSection from "@/components/homepage/PlanSection";
import TwoPathsSection from "@/components/homepage/TwoPathsSection";
import SuccessSection from "@/components/homepage/SuccessSection";
import StakesSection from "@/components/homepage/StakesSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <GuideSection />
      <PlanSection />
      <TwoPathsSection />
      <SuccessSection />
      <StakesSection />
      <NewsletterSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
