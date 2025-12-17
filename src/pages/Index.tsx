import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsByTier from "@/components/ToolsByTier";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ToolsByTier />
      <CoursesSection />
      <Footer />
    </div>
  );
};

export default Index;
