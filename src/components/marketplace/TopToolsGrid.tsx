import { motion } from "framer-motion";
import { useTools } from "@/hooks/useTools";
import ToolMarketplaceCard from "./ToolMarketplaceCard";
import { Skeleton } from "@/components/ui/skeleton";

interface TopToolsGridProps {
  category?: string;
  limit?: number;
  title?: string;
  subtitle?: string;
}

const TopToolsGrid = ({ 
  category = "all", 
  limit = 9, 
  title = "Top Tools",
  subtitle = "Our most popular AI-powered tools for thinking, planning, creating, and executing."
}: TopToolsGridProps) => {
  const { data: tools, isLoading } = useTools();

  const filteredTools = tools?.filter((tool) => {
    if (category === "all") return true;
    const categoryMap: Record<string, string[]> = {
      brand: ["Brand", "LinkedIn", "Bio", "Content", "Write", "Press", "Fix My Content"],
      life: ["Life Coach", "Life Simplifier", "Decision"],
      money: ["Budget", "Service Pricing", "Early Retirement", "Idea-to-Revenue"],
      productivity: ["Meeting", "Pitch", "Roles", "C-Level", "Weekly"],
      courses: [],
      new: [],
    };
    const keywords = categoryMap[category] || [];
    return keywords.some(keyword => tool.name.includes(keyword));
  }).slice(0, limit) || [];

  const renderSkeletons = () =>
    Array.from({ length: limit }).map((_, index) => (
      <div key={index} className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-start justify-between mb-5">
          <Skeleton className="w-14 h-14 rounded-2xl" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-10 w-full mb-5" />
        <Skeleton className="h-4 w-24 mb-5" />
        <div className="flex justify-between pt-5 border-t border-border">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    ));

  return (
    <section id="all-tools" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? renderSkeletons()
            : filteredTools.map((tool, index) => (
                <ToolMarketplaceCard key={tool.id} tool={tool} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TopToolsGrid;
