import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, RefreshCw, Users } from "lucide-react";
import { useState } from "react";

const trustBadges = [
  { icon: Shield, label: "Curated by experts" },
  { icon: RefreshCw, label: "Cancel anytime" },
  { icon: Users, label: "Thousands of professionals" },
];

const MarketplaceHero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            The AI Operating System
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Get AI-powered systems at{" "}
            <span className="text-primary">ridiculously good value</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Sign up for system updates and get exclusive access to tools, workshops, and resources built for modern professionals.
          </p>

          {/* Email Capture Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-5 text-base rounded-xl border-2 border-border focus:border-primary"
              required
            />
            <Button type="submit" size="lg" className="h-14 px-8 font-semibold rounded-xl text-base">
              Get started
            </Button>
          </form>

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
