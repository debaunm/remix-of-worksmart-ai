import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const pillars = [
  { name: "Money", description: "Financial freedom & resources", color: "bg-amber-100", textColor: "text-amber-700" },
  { name: "Stability", description: "Feeling safe, secure, & grounded", color: "bg-emerald-100", textColor: "text-emerald-700" },
  { name: "Freedom", description: "Autonomy, creativity, & independence", color: "bg-sky-100", textColor: "text-sky-700" },
  { name: "Relationships", description: "Meaningful connections", color: "bg-rose-100", textColor: "text-rose-600" },
  { name: "Passions", description: "Hobbies & interests that bring joy", color: "bg-amber-100", textColor: "text-amber-700" },
  { name: "Wellness", description: "Physical & mental well-being", color: "bg-emerald-100", textColor: "text-emerald-700" },
];

const PillarsSelector = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const togglePillar = (name: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(name)) {
      newSelected.delete(name);
    } else if (newSelected.size < 3) {
      newSelected.add(name);
    }
    setSelected(newSelected);
  };

  const reset = () => setSelected(new Set());

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">Vision Builder: The Six Pillars</h3>
      <p className="text-center mt-2 mb-6 text-muted-foreground text-sm md:text-base">
        You can't have it all at once, but you can have what matters most. In any "season" of life, you can only maximize 1-3 pillars. Click to select your focus for right now.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {pillars.map((pillar) => {
          const isSelected = selected.has(pillar.name);
          return (
            <motion.button
              key={pillar.name}
              onClick={() => togglePillar(pillar.name)}
              className={`p-4 md:p-6 rounded-lg text-center transition-all border-2 ${pillar.color} ${
                isSelected ? "border-primary shadow-lg scale-[1.02]" : "border-transparent"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className={`text-base md:text-lg font-bold ${pillar.textColor}`}>{pillar.name}</h4>
              <p className={`text-xs md:text-sm ${pillar.textColor} opacity-80`}>{pillar.description}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="text-center text-base md:text-lg p-4 rounded-md bg-muted w-full min-h-[60px] flex items-center justify-center">
          {selected.size === 0 ? (
            <span className="text-muted-foreground">Select up to 3 pillars to see your seasonal focus.</span>
          ) : (
            <span>Your focus: <strong className="text-foreground">{[...selected].join(", ")}</strong></span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={reset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <span className="text-sm text-muted-foreground">{selected.size}/3 selected</span>
        </div>
      </div>
    </div>
  );
};

export default PillarsSelector;
