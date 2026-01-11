import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, FileSpreadsheet, Megaphone, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const flagshipItems = [
  {
    id: "wealth",
    type: "System",
    title: "Wealth Dashboard",
    subtitle: "Money Systems",
    description: "Complete visibility into your net worth, cash flow, and retirement projections.",
    icon: DollarSign,
    link: "/products/wealth-dashboard",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    id: "media",
    type: "System",
    title: "1-Person Media Company",
    subtitle: "Work Systems",
    description: "The spreadsheet that powers your personal brand—content calendar, revenue tracking, and audience growth.",
    icon: FileSpreadsheet,
    link: "/products/media-company-spreadsheet",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    borderHover: "hover:border-primary/30",
  },
  {
    id: "session",
    type: "Session",
    title: "AI Content Systems",
    subtitle: "Live Implementation",
    description: "60-minute hands-on session: build your AI content workflow from scratch.",
    icon: Megaphone,
    link: "/sessions/ai-content-systems",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-600",
    borderHover: "hover:border-orange-500/30",
  },
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
            Assets, Sessions, or Both
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy the tools you need, book a session to implement them, or get everything with All Access.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {flagshipItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative bg-card rounded-2xl border border-border p-6 ${item.borderHover} hover:shadow-lg transition-all duration-300`}
              >
                {/* Type Badge */}
                <Badge 
                  variant="outline" 
                  className={`absolute top-4 right-4 text-xs ${
                    item.type === "Session" 
                      ? "bg-orange-500/10 border-orange-500/20 text-orange-600" 
                      : "bg-primary/5 border-primary/20 text-primary"
                  }`}
                >
                  {item.type}
                </Badge>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                {/* Subtitle */}
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {item.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mt-1 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* CTA */}
                <Link to={item.link}>
                  <Button variant="outline" className="w-full group/btn">
                    {item.type === "Session" ? "Book Session" : "Explore"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* All Access callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              Want it all? <Link to="/pricing" className="font-semibold text-primary hover:underline">Get All Access</Link> and unlock every system + session.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlagshipProducts;