import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Briefcase, TrendingUp, Zap, BarChart3, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const flagshipProducts = [
  {
    id: "money",
    title: "Wealth Dashboard",
    subtitle: "Money Systems",
    description: "Get complete visibility into your net worth, cash flow, and future projections. Stop guessing about your finances—start making data-driven decisions.",
    benefits: [
      "Track net worth growth over time",
      "Visualize cash flow patterns",
      "Project retirement timelines"
    ],
    icon: DollarSign,
    accentIcon: TrendingUp,
    link: "/products/wealth-dashboard",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-600"
  },
  {
    id: "work",
    title: "Work Smarter AI Tools",
    subtitle: "Work Systems",
    description: "Run your business and brand like a CEO with AI-powered planning, content creation, and productivity systems that scale with you.",
    benefits: [
      "Plan weeks like a strategist",
      "Create content systematically",
      "Make faster, better decisions"
    ],
    icon: Briefcase,
    accentIcon: Brain,
    link: "/work-systems",
    gradient: "from-primary/20 to-accent/20",
    iconBg: "bg-primary/20",
    iconColor: "text-primary"
  }
];

const FlagshipProducts = () => {
  return (
    <section id="flagship-systems" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Two Systems. One Smarter Life.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master your money and optimize your work with purpose-built AI tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {flagshipProducts.map((product, index) => {
            const Icon = product.icon;
            const AccentIcon = product.accentIcon;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-3xl border border-border p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${product.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${product.iconColor}`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {product.subtitle}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                        <div className={`w-5 h-5 rounded-full ${product.iconBg} flex items-center justify-center shrink-0`}>
                          <Zap className={`w-3 h-3 ${product.iconColor}`} />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Preview placeholder */}
                  <div className="relative mb-6 rounded-xl overflow-hidden bg-muted/50 border border-border aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                      <span className="text-xs text-muted-foreground">Preview coming soon</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={product.link}>
                    <Button className="w-full h-12 font-semibold group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlagshipProducts;