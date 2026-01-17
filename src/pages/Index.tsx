import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleHero from "@/components/marketplace/SimpleHero";
import LearningPathsSection from "@/components/marketplace/LearningPathsSection";
import TopToolsGrid from "@/components/marketplace/TopToolsGrid";
import NewsletterCTA from "@/components/marketplace/NewsletterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SimpleHero />
      <div id="learning-paths">
        <LearningPathsSection />
      </div>
      <TopToolsGrid
        title="Free AI Tools"
        subtitle="Start using these tools right now—no signup required."
      />
      <NewsletterCTA />
      <Footer />
    </div>
  );
};

export default Index;
