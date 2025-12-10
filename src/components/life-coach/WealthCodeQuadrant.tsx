import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quadrants = [
  {
    title: "High Joy, Low Cost",
    position: "top-left",
    color: "bg-emerald-200/50",
    hoverColor: "bg-emerald-600",
    textColor: "text-emerald-700",
    advice: "Maximize these. Examples: walking in nature, borrowing library books, calling a friend, trying a new recipe, listening to a podcast.",
  },
  {
    title: "High Joy, High Cost",
    position: "top-right",
    color: "bg-emerald-300/50",
    hoverColor: "bg-emerald-600",
    textColor: "text-emerald-800",
    advice: "Prioritize and save for these. Examples: international travel, concert tickets, taking a class, hiring a house cleaner.",
  },
  {
    title: "Low Joy, Low Cost",
    position: "bottom-left",
    color: "bg-rose-200/50",
    hoverColor: "bg-rose-500",
    textColor: "text-rose-600",
    advice: "Eliminate these. Examples: doomscrolling on social media, arguing in comment sections, watching TV you don't enjoy.",
  },
  {
    title: "Low Joy, High Cost",
    position: "bottom-right",
    color: "bg-rose-300/50",
    hoverColor: "bg-rose-500",
    textColor: "text-rose-700",
    advice: "Reduce or delegate these. Examples: a long commute in a personal car, paying for unused subscriptions, expensive but unhealthy takeout.",
  },
];

const WealthCodeQuadrant = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">Your Wealth Code: Rich vs. Wealthy</h3>
      <p className="text-center mt-2 mb-6 text-muted-foreground text-sm md:text-base">
        A "rich" mindset chases accumulation. A "wealthy" mindset uses money as a tool to buy back your most valuable currency: time. Hover over the quadrants to see how to categorize your activities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {quadrants.map((q, i) => (
          <div
            key={i}
            className={`relative p-6 md:p-8 rounded-lg ${q.color} cursor-pointer overflow-hidden min-h-[100px]`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h4 className={`font-bold text-base md:text-lg ${q.textColor} relative z-10`}>{q.title}</h4>
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 ${q.hoverColor} p-4 flex items-center justify-center text-white text-sm md:text-base`}
                >
                  <p className="text-center">{q.advice}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WealthCodeQuadrant;
