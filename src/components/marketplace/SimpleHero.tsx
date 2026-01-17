import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

const SimpleHero = () => {
  const scrollToPath = () => {
    document.getElementById("learning-paths")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Learn. Build. Execute.
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            AI-powered tools and systems for{" "}
            <span className="text-primary">modern professionals</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Master your money, optimize your work, and execute at a higher level with our curated collection of AI tools and learning systems.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={scrollToPath}
              size="lg"
              className="h-14 px-10 font-semibold rounded-xl text-base gap-2"
            >
              Find Your Path
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 font-semibold rounded-xl text-base"
              onClick={() => document.getElementById("all-tools")?.scrollIntoView({ behavior: "smooth" })}
            >
              Browse Free Tools
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-sm text-muted-foreground"
          >
            Trusted by thousands of professionals building smarter systems
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleHero;
