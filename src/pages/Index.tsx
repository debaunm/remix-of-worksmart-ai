import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import FlagshipProducts from "@/components/marketplace/FlagshipProducts";
import CategoryNav from "@/components/marketplace/CategoryNav";
import TopToolsGrid from "@/components/marketplace/TopToolsGrid";
import PromoBanner from "@/components/marketplace/PromoBanner";
import StaffPicksSection from "@/components/marketplace/StaffPicksSection";
import BundlesSection from "@/components/marketplace/BundlesSection";
import NewsletterCTA from "@/components/marketplace/NewsletterCTA";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MarketplaceHero />
      <FlagshipProducts />
      <CategoryNav 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <TopToolsGrid 
        category={activeCategory}
        title="All Tools"
        subtitle="Browse our complete collection of AI-powered tools."
      />
      <PromoBanner />
      <StaffPicksSection />
      <BundlesSection />
      <NewsletterCTA />
      <Footer />
    </div>
  );
};

export default Index;
