import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, Calculator, PiggyBank, LineChart, ArrowRight, CheckCircle, Star, Play, FileText, DollarSign, Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import { usePurchases } from "@/hooks/usePurchases";
const bundleIncludes = ["3-Part Video Workshop Series", "Wealth Code Assessment Tool", "Net Worth Tracking Dashboard", "FIRE Calculator & Projections", "Passive Income Strategy Guide", "Investment Portfolio Templates", "Monthly Budget Automation System", "Private Community Access"];
const sessions = [{
  number: "01",
  title: "Money Mindset Reset",
  description: "Uncover your money blocks and rewrite your wealth story. Learn to think like a wealthy person.",
  duration: "45 min"
}, {
  number: "02",
  title: "Build Your Wealth System",
  description: "Create automated money flows that grow your wealth while you sleep. Set up your financial infrastructure.",
  duration: "60 min"
}, {
  number: "03",
  title: "FIRE Path Planning",
  description: "Map your path to financial independence. Calculate your number and build your exit strategy.",
  duration: "50 min"
}];
const freeTools = [{
  icon: Calculator,
  name: "Early Retirement Calculator",
  href: "/tools/early-retirement-calculator",
  description: "Calculate your path to financial independence with our Coast FIRE calculator."
}, {
  icon: TrendingUp,
  name: "Freedom Number Calculator",
  href: "/tools/freedom-number-calculator",
  description: "Find out exactly when you can quit and make work optional."
}, {
  icon: LineChart,
  name: "Budget Builder Prompts",
  href: "/tools/budget-builder-prompts",
  description: "AI prompts to help you create and stick to a personalized budget."
}];
const MoneySystems = () => {
  const {
    checkout,
    isLoading
  } = useCheckout();
  const {
    hasMoneyAccess
  } = usePurchases();
  const handlePurchase = () => {
    checkout("money_systems");
  };
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Wallet className="w-4 h-4" />
              Wealth Building Sessions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Master Your Money with <span className="text-primary">Joy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Discover what it takes to have money freedom, passive income strategies, and how to design multiple income streams that work while you sleep.</p>
            <div className="inline-flex items-center gap-3 border border-border rounded-full px-6 py-3 bg-sidebar-primary text-muted-foreground">
              <DollarSign className="w-5 h-5 text-card opacity-0 bg-primary-foreground" />
              <span className="text-lg font-semibold text-primary-foreground">Money System $397<span className="text-primary">$397</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Session Bundle Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4">
                  <Star className="w-3 h-3" />
                  WEALTH CODE SESSIONS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  3-Part Video Workshop Series
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Go from financial anxiety to financial freedom with our comprehensive video workshop series. 
                  Each session builds on the last, giving you a complete wealth-building system.
                </p>
                
                {/* Sessions List */}
                <div className="space-y-4 mb-8">
                  {sessions.map((session, index) => <div key={index} className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
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
                    </div>)}
                </div>

                {hasMoneyAccess ? <Link to="/dashboard">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </Button>
                  </Link> : <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={handlePurchase} disabled={isLoading}>
                    {isLoading ? <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </> : <>
                        Get Wealth Code Sessions - $397
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>}
                  </Button>}
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
                      <p className="text-sm text-muted-foreground">Everything you need to build wealth</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {bundleIncludes.map((item, index) => <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>)}
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
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Try Our Free Money Tools
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Get a taste of what's possible with these free tools.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {freeTools.map((tool, index) => {
              const Icon = tool.icon;
              return <Link key={index} to={tool.href} className="group">
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
                  </Link>;
            })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Build Wealth on Your Terms?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands who've transformed their relationship with money using the Wealth Code framework.
            </p>
            {hasMoneyAccess ? <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Access Your Content
                </Button>
              </Link> : <Button variant="hero" size="lg" onClick={handlePurchase} disabled={isLoading}>
                {isLoading ? <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </> : <>
                    Get Started for $397
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>}
              </Button>}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default MoneySystems;