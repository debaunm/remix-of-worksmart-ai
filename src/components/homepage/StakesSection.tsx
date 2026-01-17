import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const StakesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Warning badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Stakes
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            What Happens If Nothing Changes?
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              The cycle continues. More burnout. More sacrifice. More years passing while you're still one step behind.
            </p>
            <p>
              You keep trading your health, relationships, and passions for a career that never feels "enough."
            </p>
            <p>
              Meanwhile, AI transforms how work gets done—and you fall further behind.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 p-6 rounded-xl bg-amber-500/5 border border-amber-500/20"
          >
            <p className="text-xl font-semibold text-foreground">
              The cost of inaction isn't just time. It's everything that matters most.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StakesSection;
