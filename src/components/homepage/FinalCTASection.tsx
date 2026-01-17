import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Rewrite Your Rules?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            You don't have to figure this out alone. Join thousands of ambitious people who are building lives that are successful AND fulfilling.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link to="/auth">
              <Button
                size="lg"
                className="h-16 px-12 font-semibold rounded-xl text-lg gap-2"
              >
                Join WorkSmart
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Start your transformation today
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
