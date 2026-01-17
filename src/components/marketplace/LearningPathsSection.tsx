import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Briefcase, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const learningPaths = [
  {
    id: "money",
    title: "Money Systems",
    subtitle: "Master your finances",
    description: "Learn to build wealth, manage cash flow, and plan for early retirement with AI-powered tools and frameworks.",
    icon: DollarSign,
    link: "/money-systems",
    color: "emerald",
    features: ["Wealth tracking", "Budgeting", "Retirement planning"],
  },
  {
    id: "work",
    title: "Work Systems",
    subtitle: "Optimize your career",
    description: "Build your personal brand, create content systems, and level up your professional impact with AI assistance.",
    icon: Briefcase,
    link: "/work-systems",
    color: "primary",
    features: ["Content creation", "Brand building", "Productivity"],
  },
  {
    id: "tools",
    title: "AI Tools",
    subtitle: "Free to use",
    description: "Start with our collection of free AI-powered tools for decision-making, planning, and execution.",
    icon: Sparkles,
    link: "#all-tools",
    color: "accent",
    features: ["Life coaching", "Weekly planning", "Decision making"],
  },
];

const LearningPathsSection = () => {
  const handleScrollToTools = (e: React.MouseEvent, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      document.getElementById(link.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you want to master your money, optimize your work, or just explore—we have a path for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {learningPaths.map((path, index) => {
            const Icon = path.icon;
            const colorClasses = {
              emerald: {
                bg: "bg-emerald-500/10",
                text: "text-emerald-600",
                border: "hover:border-emerald-500/40",
                button: "bg-emerald-600 hover:bg-emerald-700",
              },
              primary: {
                bg: "bg-primary/10",
                text: "text-primary",
                border: "hover:border-primary/40",
                button: "bg-primary hover:bg-primary/90",
              },
              accent: {
                bg: "bg-accent/10",
                text: "text-accent",
                border: "hover:border-accent/40",
                button: "bg-accent hover:bg-accent/90",
              },
            };
            const colors = colorClasses[path.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-card rounded-2xl border border-border p-8 ${colors.border} hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>

                {/* Subtitle */}
                <span className={`text-sm font-medium ${colors.text} mb-1`}>
                  {path.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {path.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {path.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {path.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('/10', '')}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {path.link.startsWith("#") ? (
                  <Button
                    onClick={(e) => handleScrollToTools(e, path.link)}
                    className={`w-full ${colors.button} text-white`}
                  >
                    Explore Tools
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Link to={path.link} className="w-full">
                    <Button className={`w-full ${colors.button} text-white`}>
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningPathsSection;
