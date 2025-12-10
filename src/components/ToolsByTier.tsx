import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User, Presentation, TrendingUp, FileText, Sparkles, Utensils, PenTool, Lock, Zap, Crown, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useTools, Tool } from "@/hooks/useTools";
import { Skeleton } from "@/components/ui/skeleton";
import { TierBadge, isPaidTier } from "@/components/TierBadge";
import { Button } from "@/components/ui/button";

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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link to={tool.route || "#"} className="block h-full">
        <div className="h-full rounded-2xl bg-card border border-border p-6 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer group relative">
          {isPaid && (
            <div className="absolute top-4 right-4">
              <Lock className="w-4 h-4 text-muted-foreground/50" />
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className={iconContainerClass}>
              <IconComponent className="w-6 h-6" />
            </div>
            <TierBadge tier={tool.tier} />
          </div>

          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {tool.category?.name || "General"}
          </span>

          <h3 className="text-lg font-bold mt-2 mb-2 text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {tool.short_description || tool.description}
          </p>

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

type TabKey = "executive" | "free" | "entrepreneur" | "all";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }>; price?: string }[] = [
  { key: "executive", label: "Executive Suite", icon: Crown, price: "$97" },
  { key: "free", label: "Free Tools", icon: Zap },
  { key: "entrepreneur", label: "Entrepreneur Suite", icon: Briefcase, price: "$97" },
  { key: "all", label: "All Access", icon: Sparkles, price: "$120" },
];

const ToolsByTier = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("executive");
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

  const allTools = tools || [];

  const getToolsForTab = (tab: TabKey): Tool[] => {
    switch (tab) {
      case "free":
        return freeTools;
      case "executive":
        return executiveTools;
      case "entrepreneur":
        return entrepreneurTools;
      case "all":
        return allTools;
      default:
        return [];
    }
  };

  const currentTools = getToolsForTab(activeTab);

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
    <section id="all-tools" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore All Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse by suite or explore our entire collection of AI-powered productivity tools.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-muted/50 rounded-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                  {tab.price && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {tab.price}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tab Description */}
            <div className="text-center mb-8">
              {activeTab === "executive" && (
                <p className="text-muted-foreground">
                  <Crown className="inline w-4 h-4 mr-1 text-purple-500" />
                  Advanced frameworks for corporate leaders and executives
                </p>
              )}
              {activeTab === "free" && (
                <p className="text-muted-foreground">
                  <Zap className="inline w-4 h-4 mr-1 text-primary" />
                  Get started with our powerful free tools - no payment required
                </p>
              )}
              {activeTab === "entrepreneur" && (
                <p className="text-muted-foreground">
                  <Briefcase className="inline w-4 h-4 mr-1 text-amber-500" />
                  Growth-focused tools for founders and business owners
                </p>
              )}
              {activeTab === "all" && (
                <p className="text-muted-foreground">
                  <Sparkles className="inline w-4 h-4 mr-1 text-primary" />
                  Complete access to all {allTools.length} tools - save $74 with the bundle
                </p>
              )}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {isLoading
                ? renderSkeletons(8)
                : currentTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
            </div>

            {/* CTA for paid tabs */}
            {activeTab !== "free" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-12"
              >
                <Link to="/pricing">
                  <Button size="lg" className="gap-2">
                    {activeTab === "all" ? (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Get All Access - $120
                      </>
                    ) : activeTab === "executive" ? (
                      <>
                        <Crown className="w-4 h-4" />
                        Get Executive Suite - $97
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4" />
                        Get Entrepreneur Suite - $97
                      </>
                    )}
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ToolsByTier;
