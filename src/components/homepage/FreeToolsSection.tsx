import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User, Presentation, TrendingUp, FileText, Sparkles, Utensils, PenTool } from "lucide-react";
import { useTools } from "@/hooks/useTools";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

const FreeToolsSection = () => {
  const { data: tools, isLoading } = useTools();

  const freeTools = tools?.filter(
    (tool) => tool.tier === "free_prompt" || tool.tier === "non_paid_personal"
  ) || [];

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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            100% Free • No Signup Required
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start with Our Free AI Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-powered tools to help you think clearer, plan better, and execute faster—no account needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <Skeleton className="w-10 h-10 rounded-xl mb-3" />
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-10 w-full mb-3" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              ))
            : freeTools.slice(0, 8).map((tool, index) => {
                const IconComponent = iconMap[tool.icon || "PenLine"] || PenLine;
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all duration-300 group flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {tool.name}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-2">
                      {tool.short_description || tool.description}
                    </p>

                    <Link to={tool.route || "#"} className="mt-auto">
                      <Button size="sm" variant="outline" className="w-full group/btn">
                        Try free
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
        </div>

        {freeTools.length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link to="/free-tools">
              <Button variant="outline" size="lg">
                View all free tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FreeToolsSection;
