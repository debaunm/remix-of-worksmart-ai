import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play, Check, Star } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden">
      {/* Dark Hero Section */}
      <div className="dark-section dark-gradient-bg pt-32 pb-24">
        <div className="container mx-auto px-6 relative z-10">
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
          }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <span className="text-primary">✦</span>
              <span className="text-sm font-medium text-primary">
                50+ Free AI Tools · No Login Required
              </span>
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
          }} className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
              Stop wasting hours on
              <br />
              busywork.{" "}
              <span className="text-primary">Let AI do it.</span>
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
          }} className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Join 10,000+ professionals using WorkSmart.ai to automate tasks,
              make faster decisions, and create better content — all for free.
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
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button variant="hero" size="xl" className="px-8">
                Start Using Free Tools
                <ArrowUpRight className="w-5 h-5" />
              </Button>
              <a href="/pricing">
                <Button variant="outline" size="xl" className="bg-white hover:bg-white/90 border-0 px-8 text-yellow-600">
                  Explore Paid Suites
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
              </a>
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
          }} className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/70 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm">Free forever tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm">Results in 60 seconds</span>
              </div>
            </motion.div>

            {/* Rating & Trust */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.5
          }} className="flex flex-wrap items-center justify-center gap-6 text-white/50">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-sm">4.9/5 from 2,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Trusted by Blavity, AfroTech & more</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;