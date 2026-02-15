import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const modules = [
  {
    number: "01",
    title: "Master Yourself - Identity + CEO Mindset",
    outcome: "You stop operating like a freelancer and start thinking like a business owner.",
    description:
      "This is where most programs skip and most people get stuck. Going from \"I'm a laid-off marketing director\" to \"I run a consultancy\" isn't a skills problem - it's an identity problem. This module rebuilds how you see yourself, how you structure your time, and how you make decisions. Because every operational problem downstream starts here.",
  },
  {
    number: "02",
    title: "Master Your Team - Delegation + Systems",
    outcome: "You stop doing everything yourself and start building systems that work without you.",
    description:
      "Whether you're solo and using AI as your team, or you have 2-5 employees and need to get more from everyone - this module is about building the systems that let a lean business operate like a company 10x its size. You'll learn how to delegate to AI, when to hire (and when not to), how to onboard and manage contractors, and how to build an operations layer that doesn't depend on you being involved in everything.",
  },
  {
    number: "03",
    title: "Master Your Data - Data + Decision-Making",
    outcome: "You make business decisions based on math, not gut feelings.",
    description:
      "Most business owners under $1M don't know their actual profit margin, their client acquisition cost, or which revenue stream is actually making them money. This module gives you the dashboards, the trackers, and the frameworks to run your business on data. Because math removes guilt - and replaces it with clarity.",
  },
  {
    number: "04",
    title: "Master Your Revenue - Sales + Pricing + Recurring Revenue",
    outcome: "Your revenue becomes repeatable and predictable, not random and stressful.",
    description:
      "You'll learn the four types of revenue (one-time, recurring, productized, passive), how to price without undercharging, and how to build a pipeline so you're never starting from zero. This is where members go from \"I landed a client\" to \"I have a business model.\"",
  },
  {
    number: "05",
    title: "Master Your Growth - Growth + Leverage",
    outcome: "You grow revenue without proportionally growing your hours.",
    description:
      "This is the cornerstone of WorkSmart - Morgan's exact process for exponential growth applied to lean businesses. You'll learn how to package your expertise into offers that scale, how to create leverage through content and partnerships, and how to build a business that grows without proportionally growing your headcount or your hours. This is how you go from $20K/month to $80K/month with a team of five or fewer.",
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 section-greige">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14"
        >
          The 5 Modules
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {modules.map((m, i) => (
              <motion.div
                key={m.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <AccordionItem
                  value={m.number}
                  className="bg-card border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-sm font-bold text-primary mt-0.5">
                        {m.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 pb-6">
                    <p className="text-primary font-semibold text-sm mb-3">
                      The outcome: {m.outcome}
                    </p>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">
                      {m.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
