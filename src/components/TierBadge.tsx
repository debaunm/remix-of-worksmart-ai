import { Lock, Sparkles, Crown } from "lucide-react";
import { ToolTier } from "@/hooks/useTools";
import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: ToolTier;
  className?: string;
  showIcon?: boolean;
}

const tierConfig: Record<ToolTier, {
  label: string;
  variant: "free" | "pro" | "executive" | "personal";
  icon: React.ComponentType<{ className?: string }>;
}> = {
  free_prompt: {
    label: "FREE",
    variant: "free",
    icon: Sparkles,
  },
  paid_executive: {
    label: "PRO",
    variant: "executive",
    icon: Crown,
  },
  paid_entrepreneur: {
    label: "PRO",
    variant: "pro",
    icon: Lock,
  },
  paid_crossover: {
    label: "PRO",
    variant: "pro",
    icon: Lock,
  },
  non_paid_personal: {
    label: "FREE",
    variant: "personal",
    icon: Sparkles,
  },
};

const variantStyles: Record<string, string> = {
  free: "bg-primary/10 text-primary border-primary/20",
  pro: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  executive: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  personal: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export const TierBadge = ({ tier, className, showIcon = true }: TierBadgeProps) => {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
        variantStyles[config.variant],
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
};

export const isPaidTier = (tier: ToolTier): boolean => {
  return tier === "paid_executive" || tier === "paid_entrepreneur" || tier === "paid_crossover";
};

export default TierBadge;
