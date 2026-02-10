import { motion } from "framer-motion";
import { DollarSign, Cpu, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const systems = [
  {
    number: "01",
    icon: DollarSign,
    title: "Money Systems",
    subtitle: "Master your money and build lasting wealth",
    description: "A structured approach to building wealth that fits how you actually live. Budgeting tools, FIRE calculators, passive income frameworks, and pricing formulas for your skills, all in one dashboard. No jargon. No shame. Just a clear financial plan.",
    link: "/money-systems",
    linkText: "Explore Money Systems",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Work Systems",
    subtitle: "10x your productivity with AI",
    description: "AI isn't optional anymore. It's infrastructure. Our 6-hour mastery course, 50+ prompt library, and automation workshops help you reclaim 10+ hours per week and build workflows that compound over time.",
    link: "/work-systems",
    linkText: "Explore Work Systems",
  },
  {
    number: "03",
    icon: Users,
    title: "Community & Accountability",
    subtitle: "Stay consistent with real support",
    description: "Monthly live strategy sessions, peer accountability groups, and direct access to our advisory team. WorkSmart isn't a course you forget about. It's a system you use every week.",
    link: "https://www.patreon.com/MorganDeBaun",
    linkText: "Join the Community",
    external: true,
  },
];

const HowItWorksSection = () => {
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
          <span className="tag-pill mb-6 inline-block">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Three Systems. One Integrated Platform.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine AI-powered productivity tools, proven wealth-building frameworks, and structured accountability into one system so you can stop piecing it together yourself.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="pro-card flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/30">{system.number}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{system.title}</h3>
                <p className="text-sm font-medium text-primary mb-4">{system.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{system.description}</p>
                {system.external ? (
                  <a 
                    href={system.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    {system.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link 
                    to={system.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    {system.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
