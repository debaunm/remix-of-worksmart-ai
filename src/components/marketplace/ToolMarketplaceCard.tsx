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
      return { label: "Free", className: "bg-success-green/10 text-success-green", price: null, suitePrice: null };
    case "paid_executive":
      return { label: "$14.99", className: "bg-primary/10 text-primary", price: "$14.99", suitePrice: "$97" };
    case "paid_entrepreneur":
      return { label: "$14.99", className: "bg-primary/10 text-primary", price: "$14.99", suitePrice: "$97" };
    case "paid_crossover":
      return { label: "$14.99", className: "bg-primary/10 text-primary", price: "$14.99", suitePrice: "$120" };
    default:
      return { label: "Free", className: "bg-success-green/10 text-success-green", price: null, suitePrice: null };
  }
};

const ToolMarketplaceCard = ({ tool, index, showCountdown = false }: ToolMarketplaceCardProps) => {
  const IconComponent = iconMap[tool.icon || "PenLine"] || PenLine;
  const tierInfo = getTierInfo(tool.tier);
  const isFree = !tierInfo.price;

  // Mock rating data
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(50 + Math.random() * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <IconComponent className="w-7 h-7 text-foreground" />
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tierInfo.className}`}>
          {tierInfo.label}
        </span>
      </div>

      {/* Category */}
      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        {tool.category?.name || "General"}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow line-clamp-2">
        {tool.short_description || tool.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-current" : "fill-none opacity-30"}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      </div>

      {/* Countdown */}
      {showCountdown && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning-orange/10 text-warning-orange text-xs font-semibold mb-5 self-start">
          <Clock className="w-3.5 h-3.5" />
          <span>Ends in 2d 14h</span>
        </div>
      )}

      {/* Price & CTA */}
      <div className="flex items-center justify-between mt-auto pt-5 border-t border-border">
        <div className="flex flex-col">
          {tierInfo.price ? (
            <>
              <span className="text-xl font-bold text-foreground">{tierInfo.price}</span>
              <span className="text-xs text-muted-foreground">or {tierInfo.suitePrice} suite</span>
            </>
          ) : (
            <span className="text-xl font-bold text-success-green">Free</span>
          )}
        </div>
        <Link to={tool.route || "#"}>
          <Button 
            size="sm" 
            variant={isFree ? "default" : "outline"} 
            className="font-medium rounded-lg"
          >
            {isFree ? "Start free" : "View tool"}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ToolMarketplaceCard;
