import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Clock,
  Target,
  Zap,
  Brain,
  BarChart3,
  FileSpreadsheet,
  Copy,
  Lock,
  RefreshCw,
  ListChecks
} from "lucide-react";

const problemPoints = [
  "Constantly reacting to urgent tasks instead of important ones",
  "Starting each week without a clear plan or priorities",
  "Feeling busy but not actually making progress on goals",
  "No system for deciding what to delegate vs. do yourself",
  "Ending weeks exhausted without knowing what you accomplished"
];

const benefits = [
  {
    icon: Target,
    title: "Priority-First Planning",
    description: "Start each week knowing exactly what matters most and why"
  },
  {
    icon: Zap,
    title: "Energy-Based Scheduling",
    description: "Match your most important work to your peak performance hours"
  },
  {
    icon: Brain,
    title: "Decision Frameworks",
    description: "Stop overthinking with proven frameworks for every decision type"
  },
  {
    icon: ListChecks,
    title: "Delegation Protocols",
    description: "Know exactly what to hand off and how to do it effectively"
  },
  {
    icon: RefreshCw,
    title: "Weekly Review System",
    description: "Reflect, learn, and continuously improve your productivity"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visual dashboards showing your wins and patterns over time"
  }
];

const features = [
  "Weekly planning template with priority matrix",
  "Daily time-blocking schedule",
  "Energy tracking and optimization guide",
  "Eisenhower Matrix for task prioritization",
  "Meeting audit checklist",
  "Delegation decision tree",
  "Quarterly goal review template",
  "Annual reflection and planning guide"
];

const testimonials = [
  {
    quote: "I went from working 60-hour weeks feeling overwhelmed to 45-hour weeks feeling in control. This system changed how I think about my time.",
    author: "Rachel M.",
    role: "VP of Operations",
    metric: "15 hours/week saved"
  },
  {
    quote: "The weekly planning ritual takes 30 minutes but saves me hours of reactive decision-making. I finally feel like a CEO of my own life.",
    author: "James W.",
    role: "Founder & CEO",
    metric: "10x clarity in priorities"
  },
  {
    quote: "I've tried every productivity system out there. This one actually stuck because it's flexible enough for real life but structured enough to work.",
    author: "Priya S.",
    role: "Senior Consultant",
    metric: "Using it for 8 months straight"
  }
];

const deliverySteps = [
  { icon: FileSpreadsheet, text: "Receive instant access to the Google Sheet template" },
  { icon: Copy, text: "Click 'Make a copy' to add it to your Google Drive" },
  { icon: Lock, text: "Your copy is 100% private and fully editable" }
];

const weeklyRitual = [
  { step: "Review", description: "Look back at last week's wins and lessons (5 min)" },
  { step: "Prioritize", description: "Identify your top 3 outcomes for the week (5 min)" },
  { step: "Block", description: "Schedule deep work and meetings strategically (10 min)" },
  { step: "Delegate", description: "Identify tasks to hand off or eliminate (5 min)" },
  { step: "Prepare", description: "Set up tomorrow's MIT (Most Important Task) (5 min)" }
];

const CEOLifePlanner = () => {
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
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Top-Rated Productivity System
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                The CEO Life Planner
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Stop reacting to your day. Start designing it. The exact frameworks top executives 
                use to maximize productivity, make better decisions, and reclaim their time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="hero" size="lg">
                  Get the Planner — $39
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link to="/tools/weekly-plan-builder">
                  <Button variant="outline" size="lg">
                    Try Free Weekly Planner
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>3,100+ users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>30 min/week to maintain</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-primary/20 overflow-hidden">
                <div className="absolute inset-0 p-6">
                  <div className="bg-card rounded-lg border border-border p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="text-xs text-muted-foreground ml-2">CEO Life Planner.gsheet</span>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">This Week's Focus</p>
                      <p className="text-sm font-bold text-foreground">Launch Q2 Marketing Campaign</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-primary/10 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">Must Do</p>
                        <p className="text-lg font-bold text-primary">3</p>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">Should Do</p>
                        <p className="text-lg font-bold text-foreground">5</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">Could Do</p>
                        <p className="text-lg font-bold text-muted-foreground">8</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center">
                          <span className="text-[8px] text-primary-foreground">✓</span>
                        </div>
                        <span className="text-xs text-foreground">Review campaign metrics</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <div className="w-4 h-4 rounded border-2 border-primary" />
                        <span className="text-xs text-foreground">Finalize ad creative</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <div className="w-4 h-4 rounded border-2 border-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Team sync meeting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Most Productivity Systems Fail
            </h2>
            <p className="text-lg text-muted-foreground">
              You're not lazy. You're lacking a system designed for how executives actually work.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {problemPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
              >
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✕</span>
                </div>
                <p className="text-foreground">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Ritual Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The 30-Minute Weekly Ritual
            </h2>
            <p className="text-lg text-muted-foreground">
              This simple ritual transforms how you approach your week
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {weeklyRitual.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{item.step}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Work Like a CEO
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Frameworks and systems used by the world's top performers
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              What's Inside the Planner
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It's Delivered */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Instant Access, Fully Yours
            </h2>
            <p className="text-lg text-muted-foreground">
              It's a Google Sheet—works on any device, syncs automatically, no app needed.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {deliverySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-4">
                    {index + 1}
                  </div>
                  <p className="text-foreground">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Trusted by High Performers
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary font-medium mt-2">{testimonial.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Running Your Life Like a CEO
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join 3,100+ professionals who've transformed their productivity. 
              One-time purchase, lifetime access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg">
                Buy Now — $39
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  Get All Access Bundle
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              30-day money-back guarantee • Instant delivery • Lifetime updates
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CEOLifePlanner;
