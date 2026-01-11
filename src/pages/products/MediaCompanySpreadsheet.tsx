import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Clock,
  Calendar,
  Repeat,
  TrendingUp,
  Video,
  FileSpreadsheet,
  Copy,
  Lock,
  Lightbulb,
  Share2
} from "lucide-react";

const problemPoints = [
  "Posting inconsistently because you don't have a content plan",
  "Spending hours creating content with little engagement",
  "No system for repurposing content across platforms",
  "Feeling like you need a team to build a real personal brand",
  "Starting from scratch every time instead of having a repeatable process"
];

const benefits = [
  {
    icon: Calendar,
    title: "Content Calendar System",
    description: "Plan weeks of content in minutes with strategic posting schedules"
  },
  {
    icon: Repeat,
    title: "Repurposing Workflows",
    description: "Turn one piece of content into 10+ posts across platforms"
  },
  {
    icon: Lightbulb,
    title: "Idea Generation Engine",
    description: "Never run out of content ideas with proven frameworks"
  },
  {
    icon: Share2,
    title: "Platform-Specific Strategies",
    description: "Optimized approaches for LinkedIn, Twitter, YouTube, and more"
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Monitor your audience growth and engagement over time"
  },
  {
    icon: Video,
    title: "Batch Production System",
    description: "Create a month of content in a single focused session"
  }
];

const features = [
  "90-day content calendar with strategic themes",
  "Content pillar planning framework",
  "Platform-by-platform posting schedule",
  "Repurposing matrix (1 → 10+ pieces)",
  "Engagement tracking dashboard",
  "Hashtag strategy by platform",
  "Collaboration tracker for partnerships",
  "Monetization roadmap and revenue tracking"
];

const testimonials = [
  {
    quote: "I went from posting randomly to a consistent system. My LinkedIn following grew from 2K to 15K in 6 months using this spreadsheet.",
    author: "Michael C.",
    role: "Executive Coach",
    metric: "+13K followers in 6 months"
  },
  {
    quote: "The repurposing workflow alone saved me 10+ hours a week. I now create once and distribute everywhere automatically.",
    author: "Sarah J.",
    role: "Consultant & Speaker",
    metric: "10+ hours/week saved"
  },
  {
    quote: "Finally a system that treats content creation like a business. I've landed 3 new clients directly from my content since using this.",
    author: "Alex P.",
    role: "Freelance Designer",
    metric: "3 clients from content"
  }
];

const deliverySteps = [
  { icon: FileSpreadsheet, text: "Receive instant access to the Google Sheet template" },
  { icon: Copy, text: "Click 'Make a copy' to add it to your Google Drive" },
  { icon: Lock, text: "Your copy is 100% private and fully editable" }
];

const contentPillars = [
  { name: "Educational", description: "Teach your audience something valuable", color: "bg-blue-500/20 text-blue-500" },
  { name: "Personal Story", description: "Share authentic experiences and lessons", color: "bg-purple-500/20 text-purple-500" },
  { name: "Behind the Scenes", description: "Show your process and daily work", color: "bg-green-500/20 text-green-500" },
  { name: "Industry Insights", description: "Commentary on trends and news", color: "bg-orange-500/20 text-orange-500" }
];

const MediaCompanySpreadsheet = () => {
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
                Creator's #1 Content System
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                1-Person Media Company Spreadsheet
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Build a powerful personal brand without a team. The complete content planning, 
                creation, and distribution system used by top solo creators.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="hero" size="lg">
                  Get the Spreadsheet — $49
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link to="/sessions">
                  <Button variant="outline" size="lg">
                    Explore Sessions
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>4,200+ creators</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Plan 90 days in 2 hours</span>
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
                      <span className="text-xs text-muted-foreground ml-2">Content Calendar.gsheet</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-3 text-[8px] text-muted-foreground text-center">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="font-medium">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 flex-1">
                      {[...Array(28)].map((_, i) => (
                        <div key={i} className={`rounded p-1 text-[8px] ${
                          i % 7 === 0 ? 'bg-blue-500/20' :
                          i % 7 === 2 ? 'bg-purple-500/20' :
                          i % 7 === 4 ? 'bg-green-500/20' :
                          'bg-muted/30'
                        }`}>
                          {i % 7 === 0 && <span className="text-blue-500">📝</span>}
                          {i % 7 === 2 && <span className="text-purple-500">🎥</span>}
                          {i % 7 === 4 && <span className="text-green-500">📊</span>}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">This month:</span>
                        <span className="font-medium text-foreground">24 posts scheduled</span>
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
              Why Most Personal Brands Fail
            </h2>
            <p className="text-lg text-muted-foreground">
              It's not talent—it's the lack of a repeatable system.
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

      {/* Content Pillars */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Content Pillar System
            </h2>
            <p className="text-lg text-muted-foreground">
              Never wonder "what should I post?" again
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {contentPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-3 ${pillar.color}`}>
                  {pillar.name}
                </div>
                <p className="text-muted-foreground">{pillar.description}</p>
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
              Run Your Brand Like a Media Company
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Systems that scale your content without scaling your time
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
              What's Inside the Spreadsheet
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
              It's a Google Sheet—access it anywhere, customize everything, no subscription.
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
          
          <div className="mt-12 p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center">
            <p className="text-foreground">
              <strong>Pairs perfectly with the free course</strong> — Get strategic context and 
              implementation guidance with the 1-Person Media Company course.
            </p>
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
              Creators Love This System
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
              Start Building Your Media Empire
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join 4,200+ solo creators who've systematized their content. 
              One-time purchase, lifetime access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg">
                Buy Now — $49
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

export default MediaCompanySpreadsheet;
