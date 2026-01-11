import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  CheckCircle, 
  Clock, 
  Users, 
  Play, 
  Star,
  Video,
  PenTool,
  DollarSign,
  TrendingUp,
  Share2,
  ArrowRight
} from "lucide-react";

const modules = [
  { title: "The Creator Economy Blueprint", lessons: 5, duration: "1 hr" },
  { title: "Content Engine Setup", lessons: 7, duration: "1.5 hrs" },
  { title: "AI-Powered Content Creation", lessons: 8, duration: "2 hrs" },
  { title: "Distribution & Growth Systems", lessons: 6, duration: "1.5 hrs" },
  { title: "Monetization Strategies", lessons: 5, duration: "1 hr" },
  { title: "Scaling as a Solo Creator", lessons: 4, duration: "45 min" },
];

const outcomes = [
  "Build a content machine that runs with minimal effort",
  "Create weeks of content in hours using AI",
  "Grow your audience across multiple platforms",
  "Monetize your expertise without a team",
  "Automate repurposing and distribution",
  "Position yourself as an authority in your niche",
];

const MediaCompany = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                For Creators
              </Badge>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                1 Person Media Company
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Build a content empire as a solo creator. Leverage AI to produce, distribute, and monetize at scale without a team.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>8+ Hours of Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>35 Video Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>1,800+ Students</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Enroll Now - $397
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

      {/* The Problem */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Creator's Dilemma</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                You have expertise worth sharing, but creating content consistently feels impossible when you're doing everything alone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Video, title: "Content Burnout", desc: "You can't keep up with the demand for fresh content" },
                { icon: Share2, title: "Platform Overwhelm", desc: "Managing multiple channels drains your energy" },
                { icon: DollarSign, title: "Revenue Ceiling", desc: "You're trading time for money without scale" },
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
                      <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-7 h-7 text-purple-500" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Build</h2>
              <p className="text-muted-foreground">Transform into a one-person media machine</p>
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
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
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
              <p className="text-muted-foreground">6 modules to build your media empire</p>
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
                  <Card className="border-border/50 hover:border-purple-500/30 transition-colors">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
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
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"I went from struggling to post once a week to publishing daily across 4 platforms."</p>
                
                <div className="mb-8">
                  <div className="text-5xl font-bold text-foreground mb-2">$397</div>
                  <p className="text-muted-foreground">One-time payment • Lifetime access</p>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <PenTool className="w-4 h-4 text-purple-500" />
                    <span>Complete content system templates</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span>AI automation workflows included</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    <span>Monetization strategy blueprints</span>
                  </div>
                </div>

                <Button size="lg" className="text-lg px-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Build Your Media Empire
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

export default MediaCompany;
