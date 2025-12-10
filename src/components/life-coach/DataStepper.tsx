import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { level: 1, label: "Aware", description: "Data-Aware: You know data is important but lack a system to track it effectively." },
  { level: 2, label: "Informed", description: "Data-Informed: You start using tools (apps, journals) and begin looking for patterns in your life." },
  { level: 3, label: "Optimized", description: "Data-Optimized: You use data to run personal experiments and drive decisions to improve outcomes." },
  { level: 4, label: "Transformed", description: "Data-Transformed: Data is part of your DNA; you predictably invest your time and energy for maximum growth." },
];

const DataStepper = () => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const progressWidth = activeLevel ? `${((activeLevel - 1) / 3) * 100}%` : "0%";

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">Dare to Be Data-Driven</h3>
      <p className="text-center mt-2 mb-8 text-muted-foreground text-sm md:text-base">
        You can't fix what you don't measure. Data provides an objective reality check. Click on each step to learn about the four levels of data mastery.
      </p>

      <div className="w-full px-4">
        <div className="flex justify-between items-center relative">
          {/* Background line */}
          <div className="absolute top-4 left-0 w-full h-1 bg-muted rounded-full" />
          
          {/* Progress line */}
          <motion.div
            className="absolute top-4 left-0 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ duration: 0.3 }}
          />

          {steps.map((step) => {
            const isActive = activeLevel !== null && step.level <= activeLevel;
            return (
              <button
                key={step.level}
                onClick={() => setActiveLevel(step.level)}
                className="z-10 text-center flex flex-col items-center"
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-card border-2 border-muted text-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.level}
                </motion.div>
                <p className="text-xs md:text-sm mt-2 text-muted-foreground">{step.label}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-base md:text-lg p-4 rounded-md bg-muted min-h-[80px] flex items-center justify-center">
          {activeLevel ? (
            <p className="text-foreground">{steps[activeLevel - 1].description}</p>
          ) : (
            <span className="text-muted-foreground">Click a number to see the description.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataStepper;
