import { motion } from "framer-motion";
import { Rocket, Compass, Heart } from "lucide-react";

const paths = [
  {
    icon: Rocket,
    accentColor: "var(--fire)",
    title: "I'm ready to build",
    description:
      "You're self-employed or running a small business - and you need the systems, the advisors, and the community to get to $500K-$1M.",
    cta: "See the WorkSmart Program ↓",
    href: "#offer-stack",
    external: false,
  },
  {
    icon: Compass,
    accentColor: "var(--kelly-green)",
    title: "I'm exploring",
    description:
      "You're thinking about going solo, want to grow a six-figure side income, or you're just not ready to go all-in yet. Start with the free community and see what others are building.",
    cta: "Join the Free Community →",
    href: "https://www.patreon.com/MorganDeBaun",
    external: true,
  },
  {
    icon: Heart,
    accentColor: "var(--sky)",
    title: "I'm here for Morgan",
    description:
      "You want the podcast, the book, and the perspective on wealth, AI, and the future of work.",
    cta: "Listen, Read, Follow →",
    href: "https://www.amazon.com/Rewrite-Your-Rules-Achieve-Freedom/dp/0593725050/",
    external: true,
  },
];

const ChoosePathSection = () => {
  return (
    <section className="py-20 section-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14"
        >
          Where are you right now?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: `hsl(${path.accentColor})` }}
                  aria-hidden="true"
                />
                <div className="p-7">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `hsl(${path.accentColor} / 0.1)` }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: `hsl(${path.accentColor})` }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{path.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
                    {path.description}
                  </p>
                  {path.external ? (
                    <a
                      href={path.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:underline"
                      style={{ color: `hsl(${path.accentColor})` }}
                    >
                      {path.cta}
                    </a>
                  ) : (
                    <a
                      href={path.href}
                      className="text-sm font-semibold hover:underline"
                      style={{ color: `hsl(${path.accentColor})` }}
                    >
                      {path.cta}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChoosePathSection;
