import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const staffPicks = [
  {
    name: "Life Coach AI",
    tagline: "Your personal AI advisor for life decisions",
    route: "/tools/life-coach-ai",
    quote: "This tool has helped me make clearer decisions about my career path. Absolutely essential.",
    author: "Morgan",
    role: "Worksmart Founder",
    tier: "free",
  },
  {
    name: "Weekly Plan Builder",
    tagline: "Turn chaos into a structured week",
    route: "/tools/weekly-plan-builder",
    quote: "I use this every Sunday to plan my week. It's become a non-negotiable part of my routine.",
    author: "Morgan",
    role: "Worksmart Founder",
    tier: "free",
  },
  {
    name: "LinkedIn 21-Day Content Plan",
    tagline: "Never run out of content ideas",
    route: "/tools/linkedin-21-day-content-plan",
    quote: "If you're building a personal brand on LinkedIn, this tool will save you hours every week.",
    author: "Morgan",
    role: "Worksmart Founder",
    tier: "pro",
  },
];

const StaffPicksSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-tier-executive fill-tier-executive" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Morgan's Picks
              </h2>
            </div>
            <p className="text-muted-foreground">
              Hand-selected tools that I personally use every week.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staffPicks.map((pick, index) => (
            <motion.div
              key={pick.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="marketplace-card flex flex-col h-full"
            >
              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-1" />
                <p className="text-foreground italic pl-6">
                  "{pick.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold text-foreground">{pick.author}</p>
                  <p className="text-sm text-muted-foreground">{pick.role}</p>
                </div>
              </div>

              {/* Tool info */}
              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{pick.name}</h3>
                    <p className="text-sm text-muted-foreground">{pick.tagline}</p>
                  </div>
                  <Link to={pick.route}>
                    <Button size="sm" variant="outline" className="gap-1">
                      Try it
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffPicksSection;
