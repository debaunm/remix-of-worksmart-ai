import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "You just became self-employed - by choice or by circumstance - and you need to replace a $100K-$200K salary, which means building a business that does $250K+ in revenue. You need a plan, not a playlist.",
  "You're running a small business (1-5 people) and stuck below $500K. You're working too many hours, your team isn't operating efficiently, and you know there's a smarter way to grow - you just can't see it from inside the business.",
  "You're a consultant, coach, or service provider who has the skills but not the business infrastructure - the pricing, the systems, the pipeline, the operations - to break through to $500K-$1M.",
  "You're still employed but planning your exit - watching the layoffs, building on the side, and you want a runway plan that accounts for the real math: you need 2-3x your salary in gross revenue to maintain your lifestyle.",
];

const notForYou = [
  "You're looking for a get-rich-quick scheme. WorkSmart is for people willing to build a real business. If you want passive income from day one with no effort, this isn't the place.",
  "You want someone to do it for you. We give you the system, the advisors, and the community. You still have to show up and do the work.",
  "You're not ready to invest in your business. This is a professional tool, not a free resource. If you're not at a stage where investing in infrastructure makes sense, start with the podcast - it's free and it's excellent.",
];

const WhoItsForSection = () => {
  return (
    <section className="py-24 section-greige">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14"
        >
          Who WorkSmart Is For (and Not For)
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For You */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-7"
            style={{ borderTopWidth: "4px", borderTopColor: `hsl(var(--fire))` }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">This Is for You If:</h3>
            <div className="space-y-5">
              {forYou.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-kelly-green shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Not For You */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-7"
            style={{ borderTopWidth: "4px", borderTopColor: `hsl(var(--muted-foreground))` }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">This Is NOT for You If:</h3>
            <div className="space-y-5">
              {notForYou.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
