import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 section-greige relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Eyebrow */}
            <p className="font-mono text-sm uppercase tracking-widest text-primary mb-6">
              The Business Operating System for the New Self-Employed
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight">
              Build a business that hits $500K to $1M - whether you're a team of one or a team of five.
            </h1>

            {/* Subhead */}
            <p className="text-[17px] text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              WorkSmart gives solopreneurs, consultants, and small business owners the strategy, systems, AI tools, and expert advisors to build real revenue. Whether you just left a $150K corporate job and need to replace that income, or you're running a small team and trying to break through to $1M - this is the business infrastructure you've been operating without.
            </p>

            {/* CTA */}
            <Link to="/auth">
              <Button className="h-14 px-8 font-semibold rounded-full text-base gap-2 bg-primary hover:bg-primary/90 text-white">
                Start Building Your Business
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            {/* Social proof line */}
            <p className="text-sm text-muted-foreground mt-6">
              Join 1,000+ business owners who stopped winging it and started building real infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
