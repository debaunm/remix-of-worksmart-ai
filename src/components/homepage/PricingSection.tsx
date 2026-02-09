import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Free Tools",
    price: "Free",
    description: "Our most popular AI tools",
    features: [
      "Freedom Number Calculator",
      "Weekly Plan Builder",
      "Meeting to Action Plan",
      "Brand Voice Generator",
    ],
    cta: "Get Free Access",
    ctaVariant: "outline" as const,
    link: "/free-tools",
    note: "Email required",
  },
  {
    name: "Money Systems",
    price: "$197",
    priceNote: "one-time",
    description: "The complete wealth-building framework",
    features: [
      "3-Part Video Workshop Series",
      "Wealth Dashboard Spreadsheet",
      "Coast FIRE Calculator",
      "Passive Income Vault",
      "Speaker & Brand Deal Pricing Formulas",
      "The Wealth Code Book (Ebook)",
      "Lifetime access & updates",
    ],
    cta: "Get Money Systems",
    ctaVariant: "primary" as const,
    link: "/money-systems",
  },
  {
    name: "Work Systems",
    price: "$197",
    priceNote: "one-time",
    description: "AI mastery, automation, and productivity",
    features: [
      "3-Part AI Mastery Course (6+ hours)",
      "Personal AI Assistant Setup Guide",
      "AI Prompt Library (50+ prompts)",
      "Automation with Zapier Session",
      "Tech Stack Recommendations",
      "Delegation Frameworks",
      "Lifetime access & updates",
    ],
    cta: "Get Work Systems",
    ctaVariant: "primary" as const,
    link: "/work-systems",
  },
  {
    name: "WorkSmart Pro",
    price: "$29.99",
    priceNote: "/month",
    description: "Full access + live coaching & community",
    features: [
      "Everything in Money Systems",
      "Everything in Work Systems",
      "Monthly live sessions with the WorkSmart team",
      "Private community access",
      "New tool drops and templates monthly",
      "Accountability groups and peer pods",
    ],
    cta: "Join Pro",
    ctaVariant: "primary" as const,
    link: "/pricing",
    highlighted: true,
    badge: "Most Popular",
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 section-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="tag-pill mb-6 inline-block">Plans</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose the Right Plan for Where You Are
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free. Go deeper when you're ready.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`pro-card flex flex-col h-full relative ${
                plan.highlighted ? "border-primary border-2 shadow-lg" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="tag-pill text-xs py-1 px-3">{plan.badge}</span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.priceNote && (
                    <span className="text-muted-foreground text-sm">{plan.priceNote}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={plan.link} className="block">
                <Button
                  className={`w-full font-semibold ${
                    plan.ctaVariant === "outline"
                      ? "border-foreground/20 text-foreground hover:bg-foreground/5"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                  variant={plan.ctaVariant === "outline" ? "outline" : "default"}
                >
                  {plan.cta}
                </Button>
              </Link>
              {plan.note && (
                <p className="text-xs text-muted-foreground text-center mt-2">{plan.note}</p>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          All plans include a 30-day money-back guarantee.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
