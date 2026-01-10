import { motion } from "framer-motion";
import { Sparkles, Heart, DollarSign, Zap, GraduationCap, Star, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "brand", label: "Brand", icon: Sparkles },
  { id: "life", label: "Life", icon: Heart },
  { id: "money", label: "Money", icon: DollarSign },
  { id: "productivity", label: "Productivity", icon: Zap },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "prompts", label: "Prompt Library", icon: MessageSquareText, isLink: true, href: "/prompts" },
];

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-4 border-b border-border bg-background sticky top-[72px] z-40"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryChange("all")}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
              activeCategory === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground/30"
            }`}
          >
            All Tools
          </button>
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            if ('isLink' in category && category.isLink) {
              return (
                <button
                  key={category.id}
                  onClick={() => navigate(category.href)}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            }
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:border-foreground/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryNav;
