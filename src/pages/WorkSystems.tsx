import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Calendar, 
  Users, 
  Megaphone,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Clock,
  Zap,
  Play,
  FileText,
  Cpu,
  Sparkles
} from "lucide-react";

const bundleIncludes = [
  "3-Part AI Mastery Video Series",
  "Personal AI Assistant Setup Guide",
  "Automation Workflow Templates",
  "ChatGPT Prompt Library (50+ Prompts)",
  "Tech Stack Recommendations",
  "Weekly Planning System",
  "Delegation Frameworks",
  "Private Community Access"
];

const sessions = [
  {
    number: "01",
    title: "AI Foundations & Mindset",
    description: "Learn to think about AI differently. Understand what AI can (and can't) do and how to leverage it strategically.",
    duration: "50 min"
  },
  {
    number: "02", 
    title: "Build Your AI Systems",
    description: "Set up your personal AI assistant and create workflows that save you 10+ hours per week.",
    duration: "65 min"
  },
  {
    number: "03",
    title: "Automation & Scaling",
    description: "Connect your tools, automate repetitive tasks, and build systems that compound over time.",
    duration: "55 min"
  }
];

const freeTools = [
  { 
    icon: Calendar, 
    name: "Weekly Plan Builder", 
    href: "/tools/weekly-plan-builder",
    description: "Structure your week like a CEO with AI-powered planning."
  },
  { 
    icon: Target, 
    name: "Decision Helper", 
    href: "/tools/decision-helper",
    description: "Make confident decisions with structured frameworks."
  },
  { 
    icon: Users, 
    name: "Social Bio Builder", 
    href: "/tools/social-bio-builder",
    description: "Craft compelling bios that convert followers."
  }
];

const WorkSystems = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              AI & Productivity Sessions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              10x Your Productivity with <span className="text-primary">AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Stop falling behind on technology. Learn to think about AI differently, build systems that compound, 
              and automate the work that drains you.
            </p>
            <div className="inline-flex items-center gap-3 bg-accent/50 border border-border rounded-full px-6 py-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Complete Bundle: <span className="text-primary">$397</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Session Bundle Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4">
                  <Star className="w-3 h-3" />
                  AI MASTERY SESSIONS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  3-Part AI Mastery Course
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Go from AI-curious to AI-powered with our comprehensive video workshop series. 
                  Build the systems that let you work smarter, not harder.
                </p>
                
                {/* Sessions List */}
                <div className="space-y-4 mb-8">
                  {sessions.map((session, index) => (
                    <div 
                      key={index}
                      className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Play className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-primary">SESSION {session.number}</span>
                            <span className="text-xs text-muted-foreground">{session.duration}</span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">{session.title}</h3>
                          <p className="text-sm text-muted-foreground">{session.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Get AI Mastery Sessions - $397
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* What's Included */}
              <div className="lg:sticky lg:top-32">
                <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">What's Included</h3>
                      <p className="text-sm text-muted-foreground">Everything you need to master AI</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {bundleIncludes.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">One-Time Investment</span>
                      <span className="text-2xl font-bold text-primary">$397</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Lifetime access • Instant download • Updates included</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Try Our Free Productivity Tools
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Get a taste of what's possible with these free tools.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {freeTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Link key={index} to={tool.href} className="group">
                    <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Master AI & Work Smarter?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands who've transformed their productivity with AI-powered systems.
            </p>
            <Button variant="hero" size="lg">
              Get Started for $397
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkSystems;