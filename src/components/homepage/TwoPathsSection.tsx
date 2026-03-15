import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Cpu, Check } from "lucide-react";
import { Link } from "react-router-dom";

const paths = [
  {
    id: "wealth",
    title: "Wealth Builders",
    subtitle: "For those ready to build financial freedom",
    description: "Master your money with joy, not deprivation. Learn FIRE principles, passive income strategies, and how to design multiple income streams that work while you sleep.",
    icon: DollarSign,
    link: "/money-systems",
    color: "emerald",
    offerings: [
      { label: "Speaking & Brand Deal Calculators", price: "Free" },
      { label: "Wealthy Life Dashboard + Workshop", price: "$97.99" },
      { label: "Wealth Code Sessions (3-Part Series)", price: "$397" },
    ],
    cta: "Start Building Wealth",
  },
  {
    id: "tech",
    title: "Tech & Tools",
    subtitle: "For those ready to 10x their productivity with AI",
    description: "Stop falling behind on technology. Learn to think about AI differently, build systems that compound, and automate the work that drains you.",
    icon: Cpu,
    link: "/work-systems",
    color: "primary",
    offerings: [
      { label: "Vibe Coding Guide & AI Workspace Sessions", price: "Free" },
      { label: "AI Mastery Course + Tech Stack Mastery", price: "$397" },
    ],
    cta: "Master AI & Automation",
  },
];

const TwoPathsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Choose Your Path
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {paths.map((path, index) => {
            const Icon = path.icon;
            const isEmerald = path.color === "emerald";
            
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:shadow-xl transition-all duration-300 ${
                  isEmerald ? "hover:border-emerald-500/40" : "hover:border-primary/40"
                }`}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    isEmerald ? "bg-emerald-500/10" : "bg-primary/10"
                  }`}>
                    <Icon className={`w-7 h-7 ${isEmerald ? "text-emerald-600" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{path.title}</h3>
                    <p className={`text-sm font-medium ${isEmerald ? "text-emerald-600" : "text-primary"}`}>
                      {path.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {path.description}
                </p>

                {/* Offerings */}
                <div className="space-y-3 mb-8">
                  {path.offerings.map((offering, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                        isEmerald ? "text-emerald-600" : "text-primary"
                      }`} />
                      <div className="flex-1">
                        <span className="text-foreground">{offering.label}</span>
                        <span className={`ml-2 text-sm font-medium ${
                          offering.price === "Free" 
                            ? (isEmerald ? "text-emerald-600" : "text-primary")
                            : "text-muted-foreground"
                        }`}>
                          {offering.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to={path.link}>
                  <Button className={`w-full text-white ${
                    isEmerald 
                      ? "bg-emerald-600 hover:bg-emerald-700" 
                      : "bg-primary hover:bg-primary/90"
                  }`}>
                    {path.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TwoPathsSection;
