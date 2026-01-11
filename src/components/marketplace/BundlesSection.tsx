import { motion } from "framer-motion";
import { Package, Crown, Briefcase, Sparkles, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const bundles = [
  {
    id: "executive",
    name: "Executive Suite",
    icon: Crown,
    description: "Advanced frameworks for corporate leaders",
    tools: ["C-Level Statement Builder", "Meeting to Action Plan", "Roles & Responsibilities Creator", "Pitch Deck Reviewer"],
    price: "$97",
    originalPrice: "$197",
    iconBg: "bg-tier-executive/10",
    iconColor: "text-tier-executive",
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur Suite",
    icon: Briefcase,
    description: "Growth-focused tools for founders",
    tools: ["LinkedIn 21-Day Content Plan", "Service Pricing Workbook", "Brand Voice Generator", "Idea to Revenue"],
    price: "$97",
    originalPrice: "$197",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "all-access",
    name: "All Access Bundle",
    icon: Sparkles,
    description: "Everything Worksmart has to offer",
    tools: ["All Executive Tools", "All Entrepreneur Tools", "All Systems", "Priority Support"],
    price: "$197",
    originalPrice: "$297",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    featured: true,
  },
];

const BundlesSection = () => {
  return (
    <section className="py-20 section-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            Save more with bundles
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            AI Tool Bundles
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Get complementary tools packaged together at a fraction of the cost.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((bundle, index) => {
            const Icon = bundle.icon;
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative bg-card rounded-2xl border p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300 ${
                  bundle.featured ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                {bundle.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${bundle.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${bundle.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{bundle.name}</h3>
                    <p className="text-sm text-muted-foreground">{bundle.description}</p>
                  </div>
                </div>

                {/* Included tools */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {bundle.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-5 h-5 rounded-full bg-success-green/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success-green" />
                      </div>
                      {tool}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-5 border-t border-border">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-foreground">{bundle.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{bundle.originalPrice}</span>
                    <span className="text-sm font-medium text-primary">One-time</span>
                  </div>
                  <Link to="/pricing">
                    <Button 
                      className="w-full gap-2 rounded-xl h-12" 
                      variant={bundle.featured ? "default" : "outline"}
                    >
                      View bundle
                      <ArrowRight className="w-4 h-4" />
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

export default BundlesSection;
