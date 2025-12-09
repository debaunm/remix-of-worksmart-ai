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

const ToolCategories = () => {
  const { data: categories, isLoading } = useCategoriesWithTools();

  return (
    <section id="tools" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground font-medium">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Banking Reimagined for the{" "}
            <span className="text-primary">Future You</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trust us to deliver cutting-edge innovation, transparency, and personalized service, all designed to help you achieve financial freedom.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-2xl bg-white border border-border p-8 shadow-card">
                <Skeleton className="w-12 h-12 rounded-xl mb-6" />
                <Skeleton className="h-8 w-48 mb-3" />
                <Skeleton className="h-16 w-full mb-6" />
                <div className="space-y-2 mb-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-32" />
                  ))}
                </div>
              </div>
            ))
          ) : (
            categories?.map((category, index) => {
              const IconComponent = iconMap[category.icon || "Rocket"] || Rocket;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl bg-white border border-border p-8 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300">
                    {/* Icon */}
                    <div className="icon-container mb-6">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Title & Count */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                      <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {category.tools?.length || 0} tools
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-6">{category.description}</p>

                    {/* Tools List */}
                    <div className="space-y-2 mb-6">
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
