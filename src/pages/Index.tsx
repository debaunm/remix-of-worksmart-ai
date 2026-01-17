import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleHero from "@/components/marketplace/SimpleHero";
import LearningPathsSection from "@/components/marketplace/LearningPathsSection";
import NewsletterCTA from "@/components/marketplace/NewsletterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SimpleHero />
      <div id="learning-paths">
        <LearningPathsSection />
      </div>
      <NewsletterCTA />
      <Footer />
    </div>
  );
};

export default Index;
