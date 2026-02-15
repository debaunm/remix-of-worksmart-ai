import { motion } from "framer-motion";
import { Phone, BookOpen, Cpu, Users } from "lucide-react";

const features = [
  {
    icon: Phone,
    borderColor: "var(--kelly-green)",
    title: "Live Advising Calls",
    description:
      "Weekly group calls with WorkSmart Advisors - a CPA, HR strategist, legal advisor, revenue coach, and operations lead. Bring your actual problem. Leave with an actual answer.",
  },
  {
    icon: BookOpen,
    borderColor: "var(--gold)",
    title: "The WorkSmart OS: 5 Modules",
    description:
      "A structured, milestone-based curriculum from \"I have a skill\" to \"I have a business that runs.\" Not a video library. A system you progress through.",
  },
  {
    icon: Cpu,
    borderColor: "var(--sky)",
    title: "Templates + AI Tool Stack",
    description:
      "100+ templates - proposals, pricing calculators, SOPs, financial trackers. Plus a curated AI tool stack updated quarterly.",
  },
  {
    icon: Users,
    borderColor: "var(--fire)",
    title: "The Community",
    description:
      "A private network of business owners who are actually doing the work. Not motivational quotes. Real answers from people at your stage.",
  },
];

const WhatYouGetSection = () => {
  return (
    <section className="py-24 section-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            The business operating system for lean companies doing serious revenue.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-7 hover:shadow-card-hover transition-all duration-300"
                style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${f.borderColor})` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `hsl(${f.borderColor} / 0.1)` }}
                >
                  <Icon className="w-5 h-5" style={{ color: `hsl(${f.borderColor})` }} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
