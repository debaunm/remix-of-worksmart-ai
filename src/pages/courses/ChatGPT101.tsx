import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Users, 
  Play, 
  Star,
  BookOpen,
  Lightbulb,
  Sparkles,
  ArrowRight
} from "lucide-react";

const modules = [
  { title: "Getting Started with ChatGPT", lessons: 4, duration: "30 min" },
  { title: "The Art of Prompt Writing", lessons: 6, duration: "50 min" },
  { title: "Use Cases for Work & Life", lessons: 5, duration: "45 min" },
  { title: "Advanced Prompting Techniques", lessons: 5, duration: "40 min" },
  { title: "Building Your Prompt Library", lessons: 4, duration: "35 min" },
];

const outcomes = [
  "Write prompts that get exactly what you want",
  "Understand how ChatGPT thinks and responds",
  "Save hours on writing, research, and brainstorming",
  "Avoid common beginner mistakes",
  "Build a personal prompt library for daily use",
  "Apply AI to your specific work and life scenarios",
];

const ChatGPT101 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Start Here
              </Badge>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                ChatGPT 101
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Learn to write prompts that get results. Perfect for beginners looking to harness AI power for work and life.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>3.5 Hours of Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>24 Video Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>5,100+ Students</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 bg-blue-500 hover:bg-blue-600">
                  Enroll Now - $97
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

      {/* Perfect For */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For You If...</h2>
              <p className="text-muted-foreground">This session is designed for AI beginners ready to operate smarter</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: "New to AI", desc: "You've heard about ChatGPT but don't know where to start" },
                { icon: Lightbulb, title: "Frustrated User", desc: "You've tried it but can't get the results you want" },
                { icon: Sparkles, title: "Curious Learner", desc: "You want to understand AI before diving deeper" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center border-border/50">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-7 h-7 text-blue-500" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background"
                >
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Session Breakdown</h2>
              <p className="text-muted-foreground">5 actionable modules</p>
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
                  <Card className="border-border/50 hover:border-blue-500/30 transition-colors">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"Finally, I understand how to talk to AI! This session made everything click."</p>
                
                <div className="mb-8">
                  <div className="text-5xl font-bold text-foreground mb-2">$97</div>
                  <p className="text-muted-foreground">One-time payment • Lifetime access</p>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>24 easy-to-follow lessons</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-blue-500" />
                    <span>50+ ready-to-use prompt templates</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span>Perfect for complete beginners</span>
                  </div>
                </div>

                <Button size="lg" className="text-lg px-12 bg-blue-500 hover:bg-blue-600">
                  Start Operating Smarter
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

export default ChatGPT101;
