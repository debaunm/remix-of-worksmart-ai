import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-24 section-slate relative overflow-hidden">
      {/* Burst accent */}
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-15"
        style={{
          background: `radial-gradient(circle, hsl(var(--fire)) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            You already have the skills. Now build the business they deserve.
          </h2>
          <p className="text-[17px] text-white/60 mb-4 leading-relaxed">
            The economy isn't going back to the way it was. Whether you're replacing a six-figure salary or scaling a small team past $500K - the question isn't whether you can do the work. It's whether you have the infrastructure to turn that work into real, sustainable revenue.
          </p>
          <p className="text-lg text-white/80 font-medium mb-10">
            WorkSmart is the system. The advisors. The community. The operating system for your next chapter.
          </p>
          <Link to="/auth">
            <Button className="h-14 px-10 font-semibold rounded-lg text-lg gap-2 bg-primary hover:bg-primary/90 text-white">
              Start Building Your Business
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-sm text-white/40 mt-6">
            30-day money-back guarantee · Cancel anytime · Join 1,000+ business owners
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
