import { motion } from "framer-motion";
import { ClipboardCheck, Phone, Crown, Database } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    label: "Week 1",
    title: "Your Business Diagnostic",
    description:
      "A diagnostic assessment tells you exactly where your business is and what to work on first. You get a custom roadmap from day one.",
  },
  {
    icon: Phone,
    label: "Every Week",
    title: "Live Advising + Implementation",
    description:
      "You're on a call with a WorkSmart Advisor who helps you implement - not just learn. Bring the real problem, leave with a next step.",
  },
  {
    icon: Crown,
    label: "Every Month",
    title: "CEO Circle with Morgan",
    description:
      "Morgan shares what's working across the member base - trends, strategies, and real numbers. Intimate enough for direct feedback on your business.",
  },
  {
    icon: Database,
    label: "Always On",
    title: "Community + Templates + The Vault",
    description:
      "The full WorkSmart ecosystem - template library, AI tool stack, member directory. Designed for someone with 2 hours a day, not 12.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 section-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14"
        >
          How It Works
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-3" aria-hidden="true" />
                  )}
                </div>

                <div className="pb-8">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    {step.label}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{step.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
