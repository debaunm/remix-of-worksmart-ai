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
  Zap
} from "lucide-react";

const ceoFeatures = [
  "Weekly planning templates",
  "Priority matrix system",
  "Energy-based scheduling",
  "Decision frameworks",
  "Delegation protocols",
  "Review & reflection cycles"
];

const mediaCompanyFeatures = [
  "Content calendar system",
  "Platform-specific strategies",
  "Repurposing workflows",
  "Audience growth tactics",
  "Monetization roadmap",
  "Brand voice guidelines"
];

const productivityTools = [
  { 
    icon: Calendar, 
    name: "Weekly Plan Builder", 
    href: "/tools/weekly-plan-builder",
    description: "Structure your week like a CEO with AI-powered planning"
  },
  { 
    icon: Target, 
    name: "Decision Helper", 
    href: "/tools/decision-helper",
    description: "Make confident decisions with structured frameworks"
  },
  { 
    icon: Clock, 
    name: "Meeting to Action Plan", 
    href: "/tools/meeting-to-action-plan",
    description: "Turn meetings into actionable next steps instantly"
  },
  { 
    icon: Zap, 
    name: "Life Simplifier", 
    href: "/tools/life-simplifier",
    description: "Cut the noise and focus on what matters most"
  }
];

const brandTools = [
  { 
    icon: Users, 
    name: "Brand Voice Generator", 
    href: "/tools/brand-voice-generator",
    description: "Define your unique brand personality and tone"
  },
  { 
    icon: Megaphone, 
    name: "LinkedIn 21-Day Plan", 
    href: "/tools/linkedin-21-day-content-plan",
    description: "Build authority on LinkedIn with a proven content system"
  },
  { 
    icon: Briefcase, 
    name: "Social Bio Builder", 
    href: "/tools/social-bio-builder",
    description: "Craft compelling bios that convert followers"
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
              <Briefcase className="w-4 h-4" />
              Operational Systems
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Work Smarter, <span className="text-primary">Not Harder</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven systems and AI tools to run your business like a CEO and 
              build your brand like a media company.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO Life Planner Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4">
                <Star className="w-3 h-3" />
                RUN YOUR BUSINESS LIKE A CEO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                CEO Life Planner
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Stop reacting to your day and start designing it. The CEO Life Planner gives you 
                the exact frameworks top executives use to maximize productivity and impact.
              </p>
              
              <ul className="space-y-3 mb-8">
                {ceoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products/ceo-life-planner">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/tools/weekly-plan-builder">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Try Weekly Planner
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">CEO Planning System</p>
                  <p className="text-sm text-muted-foreground">Structured for success</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Company Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 border border-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Megaphone className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Content Empire Blueprint</p>
                  <p className="text-sm text-muted-foreground">Build your audience</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4">
                <Star className="w-3 h-3" />
                RUN YOUR BRAND LIKE A MEDIA COMPANY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                1-Person Media Company
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                You don't need a team to build a powerful personal brand. Learn the systems 
                that solo creators use to produce consistent, high-quality content.
              </p>
              
              <ul className="space-y-3 mb-8">
                {mediaCompanyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products/media-company-spreadsheet">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/tools/linkedin-21-day-content-plan">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    LinkedIn Content Plan
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Productivity Tools Grid */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Productivity Tools
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              AI-powered tools to streamline your work and reclaim your time.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productivityTools.map((tool, index) => {
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

      {/* Brand Tools Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Brand Building Tools
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Build a memorable personal brand that attracts opportunities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {brandTools.map((tool, index) => {
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
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to transform how you work?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Get instant access to all productivity tools plus our complete library of money systems.
            </p>
            <Link to="/pricing">
              <Button variant="hero" size="lg">
                Get All Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkSystems;
