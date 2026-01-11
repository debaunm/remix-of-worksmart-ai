import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Clock,
  Eye,
  PieChart,
  BarChart3,
  Wallet,
  FileSpreadsheet,
  Copy,
  Lock,
  Zap
} from "lucide-react";

const problemPoints = [
  "Scattered finances across multiple apps and accounts",
  "No clear picture of your actual net worth",
  "Spending hours manually updating spreadsheets",
  "Missing the bigger picture while tracking small expenses",
  "No visibility into your path to financial independence"
];

const benefits = [
  {
    icon: Eye,
    title: "Full Financial Visibility",
    description: "See your complete net worth, assets, and liabilities in one dashboard"
  },
  {
    icon: PieChart,
    title: "Cash Flow at a Glance",
    description: "Understand exactly where your money goes each month"
  },
  {
    icon: BarChart3,
    title: "Future Projections",
    description: "Model different scenarios to see your path to financial freedom"
  },
  {
    icon: TrendingUp,
    title: "Investment Tracking",
    description: "Monitor portfolio performance without logging into multiple accounts"
  },
  {
    icon: Wallet,
    title: "Goal-Based Savings",
    description: "Track progress toward specific financial milestones"
  },
  {
    icon: Zap,
    title: "Automated Insights",
    description: "Built-in formulas highlight trends and opportunities automatically"
  }
];

const features = [
  "Net Worth Tracker with asset/liability breakdown",
  "Monthly cash flow summary with category breakdown",
  "Investment portfolio overview tab",
  "Retirement projection calculator",
  "Emergency fund progress tracker",
  "Debt payoff timeline",
  "Annual financial review template",
  "Goal tracking with visual progress bars"
];

const testimonials = [
  {
    quote: "I finally understand where my money actually goes. This dashboard saved me 3 hours a month and helped me find $400 in subscriptions I forgot about.",
    author: "Marcus T.",
    role: "Senior Product Manager",
    metric: "Saved $4,800/year"
  },
  {
    quote: "As someone who earns well but always felt behind, this gave me the clarity I needed. I can now see my path to early retirement.",
    author: "Jennifer L.",
    role: "Director of Marketing",
    metric: "On track for FIRE at 52"
  },
  {
    quote: "The net worth tracking alone is worth it. I update it in 10 minutes each month and have complete visibility into my finances.",
    author: "David K.",
    role: "Software Engineer",
    metric: "10 min/month to update"
  }
];

const deliverySteps = [
  { icon: FileSpreadsheet, text: "Receive instant access to the Google Sheet template" },
  { icon: Copy, text: "Click 'Make a copy' to add it to your Google Drive" },
  { icon: Lock, text: "Your copy is 100% private and fully editable" }
];

const WealthDashboard = () => {
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
                #1 Personal Finance Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                The Wealth Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Stop guessing where your money goes. Get complete visibility into your net worth, 
                cash flow, and future projections—all in one beautiful, easy-to-use Google Sheet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="hero" size="lg">
                  Get the Dashboard — $29
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link to="/tools/early-retirement-calculator">
                  <Button variant="outline" size="lg">
                    Try Free Calculator
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2,400+ users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Instant access</span>
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
                      <span className="text-xs text-muted-foreground ml-2">Wealth Dashboard.gsheet</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground mb-1">Net Worth</p>
                        <p className="text-sm font-bold text-primary">$342,500</p>
                        <p className="text-[10px] text-green-500">+8.2% YTD</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground mb-1">Monthly Savings</p>
                        <p className="text-sm font-bold text-foreground">$3,200</p>
                        <p className="text-[10px] text-muted-foreground">42% of income</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground mb-1">FIRE Date</p>
                        <p className="text-sm font-bold text-foreground">2038</p>
                        <p className="text-[10px] text-muted-foreground">14 years</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-muted/30 rounded-lg p-3 flex-1">
                      <div className="h-full flex items-end gap-1">
                        {[40, 55, 45, 60, 75, 85, 90, 78, 95].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-primary/60 rounded-t"
                            style={{ height: `${h}%` }}
                          />
                        ))}
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
              The Problem with Traditional Finance Tracking
            </h2>
            <p className="text-lg text-muted-foreground">
              Most high earners rely on fragmented apps and never see the full picture.
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

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need in One Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for professionals who want clarity without complexity
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
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
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
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              What's Inside the Dashboard
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Instant Access, Fully Yours
            </h2>
            <p className="text-lg text-muted-foreground">
              It's a Google Sheet—no apps to download, no subscriptions, no hidden formulas.
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
              <strong>100% editable</strong> — customize formulas, add your own tabs, make it truly yours. 
              No locked cells, no premium features held back.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              What Our Users Say
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get the Wealth Dashboard Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join 2,400+ professionals who've taken control of their finances. 
              One-time purchase, lifetime access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg">
                Buy Now — $29
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

export default WealthDashboard;
