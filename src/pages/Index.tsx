import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import ChoosePathSection from "@/components/homepage/ChoosePathSection";
import ProblemSection from "@/components/homepage/ProblemSection";
import ReframeSection from "@/components/homepage/ReframeSection";
import WhatYouGetSection from "@/components/homepage/WhatYouGetSection";
import ModulesSection from "@/components/homepage/ModulesSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import WhoItsForSection from "@/components/homepage/WhoItsForSection";
import SocialProofSection from "@/components/homepage/SocialProofSection";
import WhyMorganSection from "@/components/homepage/WhyMorganSection";
import OfferStackSection from "@/components/homepage/OfferStackSection";
import FAQSection from "@/components/homepage/FAQSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import NewsletterSection from "@/components/homepage/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* 1 */}<HeroSection />
      {/* 2 */}<ChoosePathSection />
      {/* 3 */}<ProblemSection />
      {/* 4 */}<ReframeSection />
      {/* 5 */}<WhatYouGetSection />
      {/* 6 */}<ModulesSection />
      {/* 7 */}<HowItWorksSection />
      {/* 8 */}<WhoItsForSection />
      {/* 9 */}<SocialProofSection />
      {/* 10 */}<WhyMorganSection />
      {/* 11 */}<OfferStackSection />
      {/* 12 */}<FAQSection />
      {/* 13 */}<FinalCTASection />
      {/* 14 */}<NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
