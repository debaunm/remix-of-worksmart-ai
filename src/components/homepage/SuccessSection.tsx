import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
const successPoints = ["You have clarity on what actually matters to you", "You've reclaimed your time by delegating and automating the tasks that drain you", "You're making strategic decisions aligned with YOUR vision, not someone else's", "Your weeks include what fills you up, not just what empties you", "You're earning more while working smarter, not harder", "AI and systems are working FOR you, not replacing you", "You feel like the CEO of your own life"];
const SuccessSection = () => {
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              The Transformation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Imagine This...
            </h2>
          </div>

          {/* Success points */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {successPoints.map((point, index) => <motion.div key={index} initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: index * 0.08
          }} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground leading-relaxed">{point}</p>
              </motion.div>)}
          </div>

          {/* Transformation summary */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-6">The Transformation:</h3>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-left md:text-right">
                <p className="text-muted-foreground">From: overwhelmed, working hard, and trapped in someone else's definition of success...<span className="font-medium text-foreground">From:</span> overwhelmed, running on fumes, and trapped in someone else's definition of success...
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground">To: clear, strategic, energized, and building a life that's successful AND fulfilling...on your own terms.<span className="font-medium text-foreground">To:</span> clear, strategic, energized, and building a life that's successful AND fulfilling, on your own terms.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default SuccessSection;