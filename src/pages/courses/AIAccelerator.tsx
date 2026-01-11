import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  CheckCircle, 
  Clock, 
  Users, 
  Play, 
  Star,
  Zap,
  Target,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const modules = [
  { title: "Foundation: AI Mindset Shift", lessons: 5, duration: "45 min" },
  { title: "Prompt Engineering Mastery", lessons: 8, duration: "1.5 hrs" },
  { title: "Workflow Automation Secrets", lessons: 6, duration: "1 hr" },
  { title: "AI Tools Stack Selection", lessons: 4, duration: "40 min" },
  { title: "Advanced Productivity Systems", lessons: 7, duration: "1.5 hrs" },
  { title: "Scaling Your AI Operations", lessons: 5, duration: "1 hr" },
];

const outcomes = [
  "10x your productivity with AI-powered workflows",
  "Master prompt engineering for any use case",
  "Build automated systems that work while you sleep",
  "Choose the right AI tools for your specific needs",
  "Create repeatable templates for common tasks",
  "Stay ahead of AI trends and updates",
];

const AIAccelerator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                Most Popular Session
              </Badge>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                AI Accelerator
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Master AI tools and workflows to 10x your productivity. From basics to advanced automation strategies that transform how you work.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>6+ Hours of Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>35 Video Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>2,400+ Students</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" className="text-lg px-8">
                  Enroll Now - $297
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                  Watch Preview
                  <Play className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
              <p className="text-muted-foreground">Transform your workflow with these powerful outcomes</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Session Breakdown</h2>
              <p className="text-muted-foreground">6 comprehensive modules to master AI productivity</p>
            </motion.div>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.lessons} lessons</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{module.duration}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"This session completely transformed how I operate. I've automated 80% of my repetitive tasks."</p>
                
                <div className="mb-8">
                  <div className="text-5xl font-bold text-foreground mb-2">$297</div>
                  <p className="text-muted-foreground">One-time payment • Lifetime access</p>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Instant access to all 35 lessons</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-primary" />
                    <span>Downloadable templates & resources</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span>Free updates as AI evolves</span>
                  </div>
                </div>

                <Button size="lg" variant="hero" className="text-lg px-12">
                  Enroll Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAccelerator;
