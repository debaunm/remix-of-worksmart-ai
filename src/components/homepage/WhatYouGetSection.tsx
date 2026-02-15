import { motion } from "framer-motion";
import { Phone, BookOpen, Cpu, Users } from "lucide-react";

const features = [
  {
    icon: Phone,
    borderColor: "var(--kelly-green)",
    title: "Live Advising Calls",
    description:
      "Weekly group calls with WorkSmart Advisors - a CPA, an HR strategist, a legal advisor, a revenue coach, and an operations lead. Bring your actual problem. Leave with an actual answer. Not theory. Not \"it depends.\" A next step you can execute this week.",
    extra:
      "Plus monthly CEO Circle calls with Morgan where she breaks down what's working right now - across the entire member base - so you're always building with current data, not last year's playbook.",
  },
  {
    icon: BookOpen,
    borderColor: "var(--gold)",
    title: "The WorkSmart OS: 5 Modules",
    description:
      "A structured, milestone-based curriculum that takes you from \"I have a skill\" to \"I have a business that runs.\" Not a video library you never open. A system you progress through, with checkpoints, templates, and accountability built in.",
    extra:
      "Each module maps to a stage of business maturity - so whether you're pre-revenue or scaling past $20K/month, you're working on the right thing at the right time.",
  },
  {
    icon: Cpu,
    borderColor: "var(--sky)",
    title: "Templates + AI Tool Stack",
    description:
      "Over 100 templates - proposals, pricing calculators, client onboarding flows, SOPs, financial trackers - that you customize, not create from scratch. Plus a curated AI tool stack showing you exactly which tools to use for what, updated quarterly as the landscape shifts.",
    extra:
      "We don't teach you \"how to use ChatGPT.\" We teach you how to think like a CEO and deploy AI as your operations team.",
  },
  {
    icon: Users,
    borderColor: "var(--fire)",
    title: "The Community",
    description:
      "A private network of business owners, consultants, and entrepreneurs who are actually doing the work. Not a Facebook group full of motivational quotes. A place where someone posts \"How do I price a $50K consulting engagement?\" and gets three responses from people who've done it.",
    extra:
      "Members are listed by stage, industry, expertise, and geography - so you can find a fractional CFO in Atlanta or a brand strategist in LA in seconds.",
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            What You Get Inside WorkSmart
          </h2>
          <p className="text-lg text-muted-foreground">
            The business operating system for lean companies doing serious revenue.
          </p>
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
                className="bg-card rounded-2xl border border-border p-7"
                style={{ borderLeftWidth: "4px", borderLeftColor: `hsl(${f.borderColor})` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `hsl(${f.borderColor} / 0.1)` }}
                >
                  <Icon className="w-5 h-5" style={{ color: `hsl(${f.borderColor})` }} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-3">{f.description}</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{f.extra}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
