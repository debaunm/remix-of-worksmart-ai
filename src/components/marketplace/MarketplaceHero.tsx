import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Users, ArrowDown } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Curated by experts" },
  { icon: RefreshCw, label: "Pay once, access forever" },
  { icon: Users, label: "Thousands of professionals" },
];

const MarketplaceHero = () => {
  const scrollToSystems = () => {
    document.getElementById("flagship-systems")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            The AI Operating System
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Build your personal operating system for{" "}
            <span className="text-primary">money</span>,{" "}
            <span className="text-primary">work</span>, and{" "}
            <span className="text-primary">execution</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            An all-in-one AI operating system for thinking, deciding, creating, and executing at a higher level.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Button 
              onClick={scrollToSystems} 
              size="lg" 
              className="h-14 px-10 font-semibold rounded-xl text-base gap-2"
            >
              Explore Systems
              <ArrowDown className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-sm font-medium">{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplaceHero;
