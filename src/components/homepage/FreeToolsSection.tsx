import { motion } from "framer-motion";
import { Calculator, CalendarDays, Mic, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: Calculator,
    name: "Freedom Number Calculator",
    description: "Find out exactly when you can make work optional",
  },
  {
    icon: CalendarDays,
    name: "Weekly Plan Builder",
    description: "Structure your week like a CEO with AI-powered planning",
  },
  {
    icon: Mic,
    name: "Brand Voice Generator",
    description: "Define your unique voice for consistent messaging",
  },
  {
    icon: FileText,
    name: "Meeting to Action Plan",
    description: "Turn messy notes into clear action items instantly",
  },
];

const FreeToolsSection = () => {
  return (
    <section className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="tag-pill mb-6 inline-block">Try It Free</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start With Our AI-Powered Tools - No Cost
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore the tools our members use every day. Sign up to get free, instant access.
          </p>

          {/* CTA button */}
          <Link to="/auth">
            <Button 
              className="h-14 px-8 font-semibold rounded-lg text-base gap-2 bg-primary hover:bg-primary/90 text-white mb-16"
            >
              Get Free Access
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Tool preview cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="pro-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreeToolsSection;
