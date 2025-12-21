import { motion } from "framer-motion";
import { Lightbulb, Calendar, PenTool, Zap, GraduationCap, Star, Clock } from "lucide-react";

const categories = [
  { id: "think", label: "Think", icon: Lightbulb },
  { id: "plan", label: "Plan", icon: Calendar },
  { id: "create", label: "Create", icon: PenTool },
  { id: "execute", label: "Execute", icon: Zap },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "new", label: "New arrivals", icon: Star },
  { id: "ending", label: "Ending soon", icon: Clock },
];

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-4 border-b border-border bg-background sticky top-16 z-40"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryChange("all")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Tools
          </button>
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
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
