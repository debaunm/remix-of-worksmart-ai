import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User, Presentation, TrendingUp, FileText, Sparkles, Utensils, PenTool } from "lucide-react";
import { Tool } from "@/hooks/useTools";
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

interface ToolMarketplaceCardProps {
  tool: Tool;
  index: number;
  showCountdown?: boolean;
}

const getTierInfo = (tier: string) => {
  switch (tier) {
    case "free_prompt":
    case "non_paid_personal":
      return { label: "Free", className: "bg-tier-free/10 text-tier-free border-tier-free/20", price: null };
    case "paid_executive":
      return { label: "Executive", className: "bg-tier-executive/10 text-tier-executive border-tier-executive/20", price: "$97" };
    case "paid_entrepreneur":
      return { label: "Pro", className: "bg-tier-pro/10 text-tier-pro border-tier-pro/20", price: "$97" };
    case "paid_crossover":
      return { label: "All Access", className: "bg-primary/10 text-primary border-primary/20", price: "$120" };
    default:
      return { label: "Free", className: "bg-tier-free/10 text-tier-free border-tier-free/20", price: null };
  }
};

const ToolMarketplaceCard = ({ tool, index, showCountdown = false }: ToolMarketplaceCardProps) => {
  const IconComponent = iconMap[tool.icon || "PenLine"] || PenLine;
  const tierInfo = getTierInfo(tool.tier);
  const isFree = !tierInfo.price;

  // Mock rating data - in real app would come from database
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(50 + Math.random() * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="marketplace-card group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${tierInfo.className}`}>
          {tierInfo.label}
        </span>
      </div>

      {/* Category */}
      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {tool.category?.name || "General"}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-2">
        {tool.short_description || tool.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="rating-stars flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-current" : "fill-none opacity-30"}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      </div>

      {/* Countdown (if enabled) */}
      {showCountdown && (
        <div className="countdown-tag mb-4 self-start">
          <Clock className="w-3.5 h-3.5" />
          <span>Ends in 2d 14h</span>
        </div>
      )}

      {/* Price & CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <div className="flex items-baseline gap-2">
          {tierInfo.price ? (
            <>
              <span className="price-sale">{tierInfo.price}</span>
              <span className="price-original">$197</span>
            </>
          ) : (
            <span className="text-lg font-bold text-tier-free">Free</span>
          )}
        </div>
        <Link to={tool.route || "#"}>
          <Button size="sm" variant={isFree ? "default" : "outline"} className="font-medium">
            {isFree ? "Start free" : "View tool"}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ToolMarketplaceCard;
