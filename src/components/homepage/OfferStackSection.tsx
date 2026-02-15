import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "WorkSmart Community",
    price: "Free",
    period: "",
    bestFor: "People exploring self-employment, building a six-figure side income, or not ready to invest yet",
    features: [
      "Community discussions",
      "Weekly insights",
      "Member connections",
    ],
    cta: "Join Free",
    href: "https://www.patreon.com/MorganDeBaun",
    external: true,
    highlighted: false,
  },
  {
    name: "WorkSmart Essentials",
    price: "$29",
    period: "/mo",
    bestFor: "Self-starters who want tools and resources but prefer to implement independently",
    features: [
      "Template library (100+)",
      "The Vault (100+ videos)",
      "AI tool stack",
      "Member directory",
      "Weekly newsletter",
    ],
    cta: "Get Essentials",
    href: "https://www.patreon.com/MorganDeBaun",
    external: true,
    highlighted: false,
  },
  {
    name: "WorkSmart Accelerator",
    price: "$297",
    period: "/mo",
    badge: "Most Popular",
    bestFor: "Business owners and consultants targeting $250K-$1M who need real infrastructure and expert guidance",
    features: [
      "Everything in Essentials",
      "AI Mastery Course (full)",
      "Weekly live advising calls (CPA, HR, Legal, Revenue, Ops)",
      "Monthly CEO Circle with Morgan",
      "Full 5-module curriculum with milestone tracking",
      "Priority community access",
    ],
    cta: "Join Accelerator",
    href: "https://www.patreon.com/MorganDeBaun",
    external: true,
    highlighted: true,
  },
];

const extras = [
  {
    name: "WorkSmart Inner Circle",
    price: "$5,000/yr",
    description:
      "Direct access to Morgan, quarterly strategy sessions, 1 private live event per year with Morgan, your AfroTech conference ticket included, exclusive retreats (CEO Spring Break), curated peer network. Capped at 50 members.",
    bestFor: "Established business owners doing $500K+/year who want to scale to $1M+",
    cta: "Apply for Inner Circle",
    href: "/apply",
    external: false,
  },
  {
    name: "Wealth Builder Blueprint",
    price: "$497 one-time",
    description:
      "Self-paced course on building multiple income streams: identify your 3-5 revenue sources, build out your personal wealth plan, and grow a profitable side business alongside your main income. Templates, financial models, income stream playbooks. No community access.",
    bestFor: "People who want to build wealth through multiple income streams - whether employed, side-hustling, or already self-employed",
    cta: "Start Building",
    href: "/money-systems",
    external: false,
  },
];

const OfferStackSection = () => {
  return (
    <section id="offer-stack" className="py-24 section-greige scroll-mt-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Choose Your Path
          </h2>
        </motion.div>

        {/* Main 3-tier grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-card rounded-2xl border p-7 flex flex-col ${
                tier.highlighted
                  ? "border-primary shadow-lg scale-[1.02]"
                  : "border-border"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full" style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--slate-bg))" }}>
                  {tier.badge}
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-foreground">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground text-sm">{tier.period}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{tier.bestFor}</p>
              <div className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-kelly-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              {tier.external ? (
                <a href={tier.href} target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full rounded-full ${
                      tier.highlighted
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "bg-foreground hover:bg-foreground/90 text-white"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              ) : (
                <Link to={tier.href}>
                  <Button className="w-full rounded-full bg-foreground hover:bg-foreground/90 text-white">
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Extra tiers */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {extras.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-7"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-lg font-bold text-foreground">{ex.name}</h3>
                <span className="font-mono text-sm font-bold text-primary">{ex.price}</span>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
                {ex.description}
              </p>
              <p className="text-xs text-muted-foreground mb-5">Best for: {ex.bestFor}</p>
              {ex.external ? (
                <a href={ex.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 rounded-full">
                    {ex.cta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              ) : (
                <Link to={ex.href}>
                  <Button variant="outline" className="gap-2 rounded-full">
                    {ex.cta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferStackSection;
