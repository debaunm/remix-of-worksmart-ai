import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { letter: "D", title: "Define the Decision", placeholder: "What is the real decision you need to make? What's the root issue?" },
  { letter: "R", title: "Review the Data", placeholder: "What facts, figures, pros, and cons do you have? What are the macro trends?" },
  { letter: "I", title: "Imagine the Outcomes", placeholder: "Describe the best-case, worst-case, and neutral scenarios. What is the opportunity cost?" },
  { letter: "P", title: "Pick Your Path", placeholder: "Based on your analysis, what is your decision? Write it down to commit to it." },
];

const DRIPTrainer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, string>>({});

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const updateResponse = (index: number, value: string) => {
    setResponses((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">The Decisiveness Trainer (DRIP Method)</h3>
      <p className="text-center mt-2 mb-6 text-muted-foreground text-sm md:text-base">
        Stop analysis paralysis. Use the DRIP method to make confident, quick decisions. Walk through the steps for a decision you're facing right now.
      </p>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleStep(index)}
                className="w-full flex justify-between items-center p-4 bg-muted/50 hover:bg-muted transition-colors text-left"
              >
                <h4 className="font-bold text-base md:text-lg text-foreground">
                  <span className="text-primary">{step.letter}:</span> {step.title}
                </h4>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <Textarea
                        value={responses[index] || ""}
                        onChange={(e) => updateResponse(index, e.target.value)}
                        placeholder={step.placeholder}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DRIPTrainer;
