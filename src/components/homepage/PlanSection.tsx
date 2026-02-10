import { motion } from "framer-motion";
import { Target, RefreshCw, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Clarify Your Vision",
    description: "Define your priorities using the Six Pillars framework - Money, Stability, Freedom, Relationships, Passions, and Wellness - so you're building toward what YOU actually want.",
  },
  {
    number: "02",
    icon: RefreshCw,
    title: "Rewrite Your Rules",
    description: "Identify which rules are serving you and which ones to throw out. Replace hustle culture with strategic systems, delegation, and true Work-Life Integration.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Accelerate Your Growth",
    description: "Use data-driven sprints. Leverage AI and automation to work smarter, not harder.",
  },
];

const PlanSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-2 block">The Method</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The WorkSmart Method: 3 Steps to a Life You Don't Need to Escape
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-border -translate-y-1/2 z-0" />
                )}
                
                <div className="relative bg-card rounded-2xl border border-border p-8 h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
