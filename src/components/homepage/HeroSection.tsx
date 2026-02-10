import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 section-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 tag-pill mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Career & Wealth Operating System</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            The Operating System for Your Career, Money, and Time
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            WorkSmart gives ambitious professionals the AI tools, wealth frameworks, and accountability systems to build financial freedom without burning out getting there.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link to="/auth">
              <Button className="h-14 px-8 font-semibold rounded-lg text-base gap-2 bg-primary hover:bg-primary/90 text-white">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/free-tools">
              <Button 
                variant="outline" 
                className="h-14 px-8 font-semibold rounded-lg text-base border-foreground/20 text-foreground hover:bg-foreground/5"
              >
                Explore Free Tools
              </Button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-muted-foreground"
          >
            Trusted by 10,000+ professionals • Built by the team behind Blavity Inc. & AfroTech
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
