import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Morgan's Picks
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
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
              className="bg-card rounded-2xl border border-border p-6 flex flex-col h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              {/* Quote */}
              <div className="relative mb-6 flex-grow">
                <p className="text-foreground text-lg leading-relaxed">
                  "{pick.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  M
                </div>
                <div>
                  <p className="font-semibold text-foreground">{pick.author}</p>
                  <p className="text-sm text-muted-foreground">{pick.role}</p>
                </div>
              </div>

              {/* Tool info */}
              <div className="pt-5 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{pick.name}</h3>
                    <p className="text-sm text-muted-foreground">{pick.tagline}</p>
                  </div>
                  <Link to={pick.route}>
                    <Button size="sm" variant="outline" className="gap-1 rounded-lg">
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
