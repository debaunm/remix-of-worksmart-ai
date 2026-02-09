import { motion } from "framer-motion";
import { Battery, TrendingDown, Clock, Puzzle } from "lucide-react";

const painPoints = [
  {
    icon: Battery,
    text: "You're exhausted but can't afford to slow down",
  },
  {
    icon: TrendingDown,
    text: "You're successful on paper but not building real wealth",
  },
  {
    icon: Clock,
    text: "You know AI matters but don't have time to figure it out",
  },
  {
    icon: Puzzle,
    text: "You've tried apps and courses — none of them stuck",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 section-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="tag-pill mb-6 inline-block">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 max-w-4xl mx-auto leading-tight">
            The Old Career Playbook Is Broken. You Already Know It.
          </h2>
          <div className="max-w-2xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              You've done everything the traditional path asked — the degrees, the promotions, the late nights. But the gap between how hard you work and how far ahead you actually get keeps widening.
            </p>
            <p>
              AI is reshaping every industry. Wealth-building advice still feels like it was written for someone else. And the tools that are supposed to help? Most of them create more noise, not less.
            </p>
            <p className="font-medium text-foreground">
              WorkSmart was built to close that gap.
            </p>
          </div>
        </motion.div>

        {/* Pain point cards - 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="pro-card flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium leading-snug">{point.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
