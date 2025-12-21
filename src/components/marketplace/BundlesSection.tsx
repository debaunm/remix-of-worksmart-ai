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
    color: "tier-pro",
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur Suite",
    icon: Briefcase,
    description: "Growth-focused tools for founders",
    tools: ["LinkedIn 21-Day Content Plan", "Service Pricing Workbook", "Brand Voice Generator", "Idea to Revenue"],
    price: "$97",
    originalPrice: "$197",
    color: "tier-executive",
  },
  {
    id: "all-access",
    name: "All Access Bundle",
    icon: Sparkles,
    description: "Everything Worksmart has to offer",
    tools: ["All Executive Tools", "All Entrepreneur Tools", "All Courses", "Priority Support"],
    price: "$120",
    originalPrice: "$297",
    color: "primary",
    featured: true,
  },
];

const BundlesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            Save more with bundles
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            AI Tool Bundles
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
                className={`marketplace-card flex flex-col h-full ${
                  bundle.featured ? "ring-2 ring-primary" : ""
                }`}
              >
                {bundle.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${bundle.color}/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${bundle.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{bundle.name}</h3>
                    <p className="text-sm text-muted-foreground">{bundle.description}</p>
                  </div>
                </div>

                {/* Included tools */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {bundle.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-foreground">{bundle.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{bundle.originalPrice}</span>
                    <span className="text-sm font-medium text-primary">One-time</span>
                  </div>
                  <Link to="/pricing">
                    <Button 
                      className="w-full gap-2" 
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
