import { motion } from "framer-motion";
import { PenLine, MessageSquare, Target, ClipboardList, Lightbulb, User } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: PenLine,
    name: "Write It Better",
    description: "Transform any message into clearer, shorter, or more confident versions instantly.",
    category: "Professional",
    link: "/tools/write-it-better",
    popular: true,
  },
  {
    icon: MessageSquare,
    name: "Fix My Content",
    description: "Generate 10 hooks, 3 platform-optimized captions, and a polished final version.",
    category: "Creators",
    link: "/tools/fix-my-content",
  },
  {
    icon: Target,
    name: "AI Decision Helper",
    description: "Structure any decision with pros, cons, and a clear recommended path.",
    category: "Productivity",
    link: "/tools/decision-helper",
    popular: true,
  },
  {
    icon: ClipboardList,
    name: "Meeting-to-Action",
    description: "Extract action items, assign owners, and draft follow-up emails automatically.",
    category: "Professional",
    link: "/tools/meeting-to-action",
  },
  {
    icon: Lightbulb,
    name: "Idea-to-Offer Converter",
    description: "Turn a rough business idea into a structured product with pricing and positioning.",
    category: "Founders",
    link: "/tools/idea-to-offer",
  },
  {
    icon: User,
    name: "Social Bio Builder",
    description: "Craft platform-optimized bios in professional, conversational, or bold styles.",
    category: "Creators",
    link: "/tools/social-bio-builder",
  },
];

const FeaturedTools = () => {
  return (
    <section id="features" className="py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold mb-4 block">Most Popular</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most-loved tools that save professionals hours every week.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={tool.link} className="block h-full">
                <div className="h-full rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    {tool.popular && (
                      <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {tool.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Try Now Link */}
                  <div className="mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Try it free →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
