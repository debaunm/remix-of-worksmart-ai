import { motion } from "framer-motion";
import { Rocket, Briefcase, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategoriesWithTools } from "@/hooks/useTools";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Briefcase,
  Heart,
};

const colorMap: Record<string, string> = {
  cyan: "from-primary to-blue-400",
  blue: "from-blue-500 to-blue-400",
  purple: "from-purple-400 to-pink-400",
};

const ToolCategories = () => {
  const { data: categories, isLoading } = useCategoriesWithTools();

  return (
    <section id="tools" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            50+ Tools for <span className="gradient-text">Every Need</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools organized by who you are and what you need to accomplish.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-3xl bg-card border border-border/50 p-8">
                <Skeleton className="w-14 h-14 rounded-2xl mb-6" />
                <Skeleton className="h-8 w-48 mb-3" />
                <Skeleton className="h-16 w-full mb-6" />
                <div className="space-y-2 mb-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-32" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : (
            categories?.map((category, index) => {
              const IconComponent = iconMap[category.icon || "Rocket"] || Rocket;
              const gradientColor = colorMap[category.color || "cyan"] || colorMap.cyan;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full rounded-3xl bg-card border border-border/50 p-8 hover:border-primary/50 transition-all duration-300">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center mb-6`}>
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>

                    {/* Title & Count */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {category.tools?.length || 0} tools
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">{category.description}</p>

                    {/* Tools List */}
                    <div className="space-y-2 mb-8">
                      {category.tools?.slice(0, 4).map((tool) => (
                        <div
                          key={tool.id}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {tool.name}
                        </div>
                      ))}
                      {(category.tools?.length || 0) > 4 && (
                        <div className="text-sm text-primary cursor-pointer hover:underline">
                          +{(category.tools?.length || 0) - 4} more tools
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      Explore Category
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolCategories;
