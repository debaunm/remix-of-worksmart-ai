import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wallet, 
  TrendingUp, 
  Calculator, 
  PiggyBank, 
  LineChart,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const flagshipFeatures = [
  "Net worth tracking & visualization",
  "Cash flow projections",
  "Investment portfolio overview",
  "Goal-based savings tracking",
  "Retirement timeline calculator",
  "Monthly budget automation"
];

const upcomingTools = [
  { 
    icon: Calculator, 
    name: "Tax Optimization Calculator", 
    description: "Maximize deductions and minimize tax burden",
    status: "Coming Soon"
  },
  { 
    icon: LineChart, 
    name: "Investment Tracker", 
    description: "Monitor portfolio performance in real-time",
    status: "Coming Soon"
  },
  { 
    icon: PiggyBank, 
    name: "Emergency Fund Planner", 
    description: "Build your safety net strategically",
    status: "Coming Soon"
  }
];

const MoneySystems = () => {
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
              <Wallet className="w-4 h-4" />
              Financial Systems
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Build Wealth on <span className="text-primary">Autopilot</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your finances with AI-powered tools designed for busy professionals. 
              Track, plan, and grow your wealth with clarity and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flagship Product - Wealth Dashboard */}
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
                FLAGSHIP PRODUCT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wealth Dashboard
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your complete financial command center. See your entire financial picture at a glance—net worth, 
                cash flow, investments, and goals—all in one beautiful, actionable dashboard.
              </p>
              
              <ul className="space-y-3 mb-8">
                {flagshipFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/tools/early-retirement-calculator">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Try Free Calculator
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Get Full Access
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Wealth Dashboard Preview</p>
                  <p className="text-sm text-muted-foreground">Coming with full release</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Tools */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Available Money Tools
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Start building your financial foundation today with these ready-to-use tools.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/tools/early-retirement-calculator" className="group">
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Early Retirement Calculator
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Calculate your path to financial independence with our Coast FIRE calculator.
                  </p>
                </div>
              </Link>
              
              <Link to="/tools/budget-builder-prompts" className="group">
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Budget Builder Prompts
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI prompts to help you create and stick to a personalized budget.
                  </p>
                </div>
              </Link>
              
              <Link to="/tools/service-pricing-workbook" className="group">
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <PiggyBank className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Service Pricing Workbook
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Price your services confidently with data-driven calculations.
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Tools */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Coming Soon
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              More powerful money tools are on the way. Get early access by joining All Access.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div 
                    key={index}
                    className="p-6 rounded-2xl border border-dashed border-border bg-card/50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="inline-block px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground mb-2">
                      {tool.status}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Get instant access to all money tools plus our complete library of productivity systems.
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

export default MoneySystems;
