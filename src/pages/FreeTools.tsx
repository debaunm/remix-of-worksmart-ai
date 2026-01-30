import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Clock, Gift, ArrowRight, PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User, Presentation, TrendingUp, FileText, Utensils, PenTool } from "lucide-react";
import { useTools } from "@/hooks/useTools";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PenLine,
  PenTool,
  MessageSquare,
  Target,
  ClipboardList,
  Lightbulb,
  User,
  Presentation,
  TrendingUp,
  FileText,
  Sparkles,
  Utensils,
};

const benefits = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "No signup required. Get AI-powered insights in seconds.",
  },
  {
    icon: Clock,
    title: "Save Hours Weekly",
    description: "Automate tedious tasks and focus on what matters most.",
  },
  {
    icon: Gift,
    title: "100% Free Forever",
    description: "No credit card, no trial period. Just powerful tools.",
  },
];

const FreeTools = () => {
  const { data: tools, isLoading } = useTools();

  const freeTools = tools?.filter(
    (tool) => tool.tier === "free_prompt" || tool.tier === "non_paid_personal"
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-green/10 text-success-green text-sm font-semibold mb-6">
              <Gift className="w-4 h-4" />
              100% Free • No Signup Required
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Free AI Tools for{" "}
              <span className="text-primary">Busy Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Powerful AI-powered tools to help you think clearer, plan better, and execute faster. 
              Start using them right now—no account needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Tool
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each tool is designed to solve a specific problem. Pick one and get started in seconds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl border border-border p-6"
                  >
                    <Skeleton className="w-14 h-14 rounded-2xl mb-4" />
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-6 w-40 mb-3" />
                    <Skeleton className="h-12 w-full mb-4" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))
              : freeTools.map((tool, index) => {
                  const IconComponent = iconMap[tool.icon || "PenLine"] || PenLine;
                  return (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                          <IconComponent className="w-7 h-7 text-foreground" />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-success-green/10 text-success-green">
                          Free
                        </span>
                      </div>

                      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        {tool.category?.name || "General"}
                      </span>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {tool.name}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                        {tool.short_description || tool.description}
                      </p>

                      <Link to={tool.route || "#"} className="mt-auto">
                        <Button className="w-full group/btn">
                          Try it free
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>
                  );
                })}
          </div>

          {freeTools.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No free tools available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready for More Power?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlock our complete suite of premium AI tools designed for executives and entrepreneurs 
              who want to 10x their productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/work-systems">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Work Systems
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/money-systems">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Money Systems
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeTools;
