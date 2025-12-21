import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 md:p-12"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 grid-pattern" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Automate your workflow with Worksmart OS
                </h3>
                <p className="text-white/80 text-lg">
                  Get all tools, courses, and updates for one simple price. Save $74.
                </p>
              </div>
            </div>
            <Link to="/pricing">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 flex-shrink-0"
              >
                Upgrade to Pro
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
