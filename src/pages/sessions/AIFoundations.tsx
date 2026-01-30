import { motion } from "framer-motion";
import { Clock, Play, CheckCircle, ArrowLeft, Brain, Sparkles, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const outcomes = [
  "Understand the core differences between ChatGPT, Claude, and Gemini",
  "Know which AI tool to use for specific tasks and workflows",
  "Avoid the most common prompting mistakes that waste time",
  "Build a personal AI toolkit strategy that fits your work style",
  "Create effective prompts that get better results on the first try",
  "Understand AI limitations so you know when NOT to use AI",
];

const sessionModules = [
  {
    title: "Understanding Modern AI",
    description: "How large language models actually work and why it matters for getting better results.",
    duration: "15 min",
    videoUrl: "https://player.vimeo.com/video/1160315732?badge=0&autopause=0&player_id=0&app_id=58479",
  },
  {
    title: "The AI Toolkit Breakdown",
    description: "Deep dive into ChatGPT, Claude, and Gemini—strengths, weaknesses, and optimal use cases.",
    duration: "20 min",
    videoUrl: "https://player.vimeo.com/video/1160316129?badge=0&autopause=0&player_id=0&app_id=58479",
  },
  {
    title: "Multi-Step Flows & AI Tech Stack",
    description: "Build automated workflows that run 24/7 and create systems that compound your productivity.",
    duration: "35 min",
    videoUrl: "https://player.vimeo.com/video/1160318487?badge=0&autopause=0&player_id=0&app_id=58479",
  },
  {
    title: "Content Creation & Brand Building",
    description: "Learn the exact workflow to ideate, create, design, edit, and distribute content that drives revenue.",
    duration: "45 min",
    videoUrl: "https://player.vimeo.com/video/1160318495?badge=0&autopause=0&player_id=0&app_id=58479",
  },
];

const AIFoundations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Navigation */}
      <div className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/sessions" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sessions
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Brain className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  <Play className="w-3 h-3 mr-1" /> On-Demand
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                AI Foundations Session: ChatGPT, Claude & Gemini
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Understand how modern AI tools actually work, when to use each one, and how to avoid the common mistakes that waste hours of your time.
              </p>

              <div className="flex items-center gap-6 mb-8 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  115 minutes
                </span>
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Beginner-Friendly
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Purchase Session — $49
                </Button>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Video Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-border">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center relative group cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="relative z-10 p-6 rounded-full bg-primary/90 group-hover:bg-primary transition-colors group-hover:scale-110 duration-300">
                    <Play className="w-12 h-12 text-primary-foreground fill-current" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80 text-sm">
                    <span>Preview available</span>
                    <span>2:30</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What You'll Walk Away With
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Session Breakdown */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Session Breakdown
              </h2>
            </div>
            
            <div className="space-y-4">
              {sessionModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-border hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {module.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {module.duration}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to master AI fundamentals?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop guessing which AI tool to use. Get the clarity you need to work smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Purchase Session — $49
              </Button>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIFoundations;
