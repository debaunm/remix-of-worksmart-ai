import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-24 section-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Better Systems. Better Results. Less Burnout.
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Join the professionals who stopped improvising and started building.
          </p>
          <Link to="/auth">
            <Button className="h-14 px-10 font-semibold rounded-lg text-lg gap-2 bg-primary hover:bg-primary/90 text-white">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
