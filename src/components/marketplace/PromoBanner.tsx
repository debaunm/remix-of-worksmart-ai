import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
          className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-14"
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                Automate your workflow with Worksmart OS
              </h3>
              <p className="text-primary-foreground/80 text-lg max-w-xl">
                Get all tools, courses, and updates for one simple price. Save $74.
              </p>
            </div>
            <Link to="/pricing">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 font-semibold gap-2 flex-shrink-0 rounded-xl h-14 px-8"
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
