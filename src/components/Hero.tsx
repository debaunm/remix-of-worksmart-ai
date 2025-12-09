import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Zap, Clock } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden">
      {/* Dark Hero Section */}
      <div className="dark-section dark-gradient-bg grid-pattern pt-32 pb-24 bg-secondary-foreground">
        <div className="container mx-auto px-6 relative z-10 bg-secondary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-white/70">50+ Free AI Tools - No Login Required</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-balance text-white">
              AI-powered work tools{" "}
              <span className="text-primary">made easy.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto text-balance">
              We help professionals and teams work smarter with AI tools that save hours, sharpen thinking, and upgrade results.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button variant="hero" size="xl">
                Explore Free Tools
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="xl">
                <Play className="w-4 h-4" />
                Watch Tutorial
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} className="flex flex-wrap items-center justify-center gap-8 text-white/50">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">No login required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm">Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">Save 10+ hours/week</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Tool Cards Preview */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.5
        }} className="mt-20 relative">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{
              name: "Write It Better",
              desc: "Polish any message instantly",
              icon: "✍️"
            }, {
              name: "AI Decision Helper",
              desc: "Make smarter choices fast",
              icon: "🎯"
            }, {
              name: "Meeting-to-Action",
              desc: "Turn notes into tasks",
              icon: "📋"
            }].map((tool, i) => <motion.div key={tool.name} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.6 + i * 0.1
            }} whileHover={{
              y: -5,
              scale: 1.02
            }} className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer group hover:border-primary/30 transition-colors">
                  <div className="text-3xl mb-3 text-zinc-50">{tool.icon}</div>
                  <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-white/50">{tool.desc}</p>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Clients/Partners Section - Light */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-muted-foreground text-sm font-medium mb-8">
            Trusted by 4,000+ professionals already working smarter
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {["Ephemeral", "Wildcrafted", "Codecraft_", "Convergence", "ContrastAI"].map(company => <span key={company} className="text-foreground font-semibold text-lg">
                {company}
              </span>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;