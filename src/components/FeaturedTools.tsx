import { motion } from "framer-motion";
import { 
  PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User,
  Presentation, TrendingUp, FileText, Sparkles, Utensils, PenTool
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedTools } from "@/hooks/useTools";
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

const FeaturedTools = () => {
  const { data: tools, isLoading } = useFeaturedTools();

  return (
    <section id="features" className="py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold mb-4 block">Most Popular</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most-loved tools that save professionals hours every week.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-2xl bg-card border border-border/50 p-6">
                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))
          ) : (
            tools?.map((tool, index) => {
              const IconComponent = iconMap[tool.icon || "PenLine"] || PenLine;
              
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={tool.route || "#"} className="block h-full">
                    <div className="h-full rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        {tool.badge && (
                          <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {tool.category?.name || "General"}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tool.short_description || tool.description}
                      </p>

                      {/* Try Now Link */}
                      <div className="mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Try it free →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
