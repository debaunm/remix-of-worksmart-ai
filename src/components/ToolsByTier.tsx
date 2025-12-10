import { motion } from "framer-motion";
import { PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User, Presentation, TrendingUp, FileText, Sparkles, Utensils, PenTool, Lock, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTools, Tool, ToolTier } from "@/hooks/useTools";
import { Skeleton } from "@/components/ui/skeleton";
import { TierBadge, isPaidTier } from "@/components/TierBadge";

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

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const ToolCard = ({ tool, index }: ToolCardProps) => {
  const IconComponent = iconMap[tool.icon || "PenLine"] || PenLine;
  const isPaid = isPaidTier(tool.tier);
  const isExecutive = tool.tier === "paid_executive";

  const iconContainerClass = isExecutive
    ? "icon-container-executive"
    : isPaid
    ? "icon-container-pro"
    : "icon-container";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={tool.route || "#"} className="block h-full">
        <div className="h-full rounded-2xl bg-card border border-border p-6 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer group relative">
          {/* Lock overlay for paid tools */}
          {isPaid && (
            <div className="absolute top-4 right-4">
              <Lock className="w-4 h-4 text-muted-foreground/50" />
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={iconContainerClass}>
              <IconComponent className="w-6 h-6" />
            </div>
            <TierBadge tier={tool.tier} />
          </div>

          {/* Category */}
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {tool.category?.name || "General"}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold mt-2 mb-2 text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {tool.short_description || tool.description}
          </p>

          {/* CTA */}
          <div className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {isPaid ? (
              <span className="text-amber-600">Unlock with PRO →</span>
            ) : (
              <span className="text-primary">Try it free →</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ToolsByTier = () => {
  const { data: tools, isLoading } = useTools();

  const freeTools = tools?.filter(
    (tool) => tool.tier === "free_prompt" || tool.tier === "non_paid_personal"
  ) || [];

  const executiveTools = tools?.filter(
    (tool) => tool.tier === "paid_executive" || tool.tier === "paid_crossover"
  ) || [];

  const entrepreneurTools = tools?.filter(
    (tool) => tool.tier === "paid_entrepreneur" || tool.tier === "paid_crossover"
  ) || [];

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, index) => (
      <div key={index} className="rounded-2xl bg-card border border-border p-6">
        <Skeleton className="w-12 h-12 rounded-xl mb-4" />
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-16 w-full" />
      </div>
    ));

  return (
    <section id="all-tools" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Free Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Free Tools
              </h2>
              <p className="text-muted-foreground text-sm">
                Get started with our powerful free tools
              </p>
            </div>
            <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              FREE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? renderSkeletons(3)
              : freeTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
          </div>
        </motion.div>

        {/* Executive Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Executive Tools
              </h2>
              <p className="text-muted-foreground text-sm">
                AI-powered tools for leaders and executives
              </p>
            </div>
            <span className="ml-auto text-sm font-bold bg-amber-500/10 text-amber-600 px-4 py-2 rounded-full flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              $97
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? renderSkeletons(4)
              : executiveTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
          </div>
        </motion.div>

        {/* Entrepreneur Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10">
              <TrendingUp className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Entrepreneur Tools
              </h2>
              <p className="text-muted-foreground text-sm">
                Scale your business with AI-driven insights
              </p>
            </div>
            <span className="ml-auto text-sm font-bold bg-violet-500/10 text-violet-600 px-4 py-2 rounded-full flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              $97
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? renderSkeletons(4)
              : entrepreneurTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
          </div>
        </motion.div>

        {/* All Access Bundle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-amber-500/5 to-violet-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-amber-600" />
              <span className="text-2xl font-bold text-foreground">+</span>
              <TrendingUp className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              All Access Bundle
            </h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Get access to all Executive AND Entrepreneur tools. Save $74 compared to buying separately.
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-foreground">$120</span>
              <span className="text-muted-foreground line-through text-sm">$194</span>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-violet-500 text-white font-semibold hover:from-amber-600 hover:to-violet-600 transition-all shadow-lg">
              <Sparkles className="w-4 h-4" />
              Get All Access
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsByTier;
