import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolCategories from "@/components/ToolCategories";
import FeaturedTools from "@/components/FeaturedTools";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ToolCategories />
      <FeaturedTools />
      <Footer />
    </div>
  );
};

export default Index;
