import { motion } from "framer-motion";
import { AlertCircle, Battery, TrendingDown, Clock, HelpCircle, Cpu } from "lucide-react";

const painPoints = [
  { icon: Battery, text: "You're exhausted but can't slow down" },
  { icon: TrendingDown, text: "You're successful on paper but feel like you're drowning" },
  { icon: HelpCircle, text: "You watch others seem to do it effortlessly while you question if you're cut out for this" },
  { icon: Clock, text: "You're so busy holding everything together that there's no time left for YOU" },
  { icon: Cpu, text: "You know AI is changing everything but don't know where to start" },
];

const ProblemSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
              <AlertCircle className="w-4 h-4" />
              The Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              You're Not Behind. The Rules Are Just Broken.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              You've done everything "right." The degrees. The promotions. The side hustle. The early mornings and late nights.
            </p>
            <p className="text-xl font-semibold text-foreground mt-4">And yet...</p>
          </div>

          {/* Pain points */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-destructive" />
                  </div>
                  <p className="text-foreground leading-relaxed">{point.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center bg-card rounded-2xl border border-border p-8"
          >
            <p className="text-lg text-muted-foreground mb-4">
              It shouldn't be this hard. The hustle culture playbook was written by someone else, for someone else's life.
            </p>
            <p className="text-xl font-semibold text-primary">
              It's time to rewrite the rules.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
