import { useState, useMemo } from "react";
import { ArrowLeft, DollarSign, Loader2, TrendingUp, Target, Sparkles, ChevronDown, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultsEmailGate from "@/components/ResultsEmailGate";
import { useEmailGate } from "@/hooks/useEmailGate";

// Tax brackets for 2024 (single filer, simplified for monthly calculation)
function calculateEffectiveTaxRate(annualIncome: number): number {
  // Federal tax brackets 2024
  const brackets = [{
    limit: 11600,
    rate: 0.10
  }, {
    limit: 47150,
    rate: 0.12
  }, {
    limit: 100525,
    rate: 0.22
  }, {
    limit: 191950,
    rate: 0.24
  }, {
    limit: 243725,
    rate: 0.32
  }, {
    limit: 609350,
    rate: 0.35
  }, {
    limit: Infinity,
    rate: 0.37
  }];
  let tax = 0;
  let previousLimit = 0;
  for (const bracket of brackets) {
    if (annualIncome <= previousLimit) break;
    const taxableInBracket = Math.min(annualIncome - previousLimit, bracket.limit - previousLimit);
    tax += taxableInBracket * bracket.rate;
    previousLimit = bracket.limit;
  }

  // Add estimated self-employment tax (15.3% on 92.35% of income, up to SS limit)
  const selfEmploymentRate = 0.153 * 0.9235;
  const ssTaxableLimit = 168600; // 2024 SS wage base
  const selfEmploymentTax = Math.min(annualIncome, ssTaxableLimit) * selfEmploymentRate;

  // Add state tax estimate (using average of ~5%)
  const stateTax = annualIncome * 0.05;
  const totalTax = tax + selfEmploymentTax + stateTax;
  return annualIncome > 0 ? totalTax / annualIncome : 0;
}

// Business reinvestment buffer for growth
const REINVESTMENT_BUFFER = 0.08; // 8%

// Calculation functions based on spec
function calculateFreedomNumber(monthlyExpenses: number): {
  grossMonthly: number;
  netMonthly: number;
  taxRate: number;
  taxAmount: number;
  reinvestmentAmount: number;
} {
  // Monthly expenses = net needed after taxes and reinvestment
  // Gross = Net / (1 - taxRate - reinvestmentBuffer)

  // First, estimate annual income to get tax rate
  const annualNet = monthlyExpenses * 12;

  // Iteratively solve for gross (since tax rate depends on gross)
  let grossAnnual = annualNet / (1 - 0.25 - REINVESTMENT_BUFFER); // Initial estimate with 25% tax

  for (let i = 0; i < 10; i++) {
    const taxRate = calculateEffectiveTaxRate(grossAnnual);
    const newGross = annualNet / (1 - taxRate - REINVESTMENT_BUFFER);
    if (Math.abs(newGross - grossAnnual) < 1) break;
    grossAnnual = newGross;
  }
  const taxRate = calculateEffectiveTaxRate(grossAnnual);
  const taxAmount = grossAnnual * taxRate / 12;
  const reinvestmentAmount = grossAnnual * REINVESTMENT_BUFFER / 12;
  return {
    grossMonthly: Math.round(grossAnnual / 12),
    netMonthly: monthlyExpenses,
    taxRate: taxRate,
    taxAmount: Math.round(taxAmount),
    reinvestmentAmount: Math.round(reinvestmentAmount)
  };
}
function calculateGap(freedomNumber: number, currentPassiveIncome: number): number {
  return Math.max(0, freedomNumber - currentPassiveIncome);
}
function calculateProgress(currentPassiveIncome: number, freedomNumber: number): number {
  if (freedomNumber === 0) return 0;
  return Math.min(100, currentPassiveIncome / freedomNumber * 100);
}
function calculateTimeToFreedom(gap: number, monthlySavings: number, annualReturn: number): {
  months: number;
  years: number;
  remainingMonths: number;
} | null {
  if (monthlySavings <= 0 || gap <= 0) return null;
  const monthlyReturn = annualReturn / 100 / 12;
  const targetAmount = gap * 12 * 25; // 4% withdrawal rate assumption

  let months = 0;
  let accumulated = 0;
  while (accumulated < targetAmount && months < 600) {
    accumulated = accumulated * (1 + monthlyReturn) + monthlySavings;
    months++;
  }
  return {
    months: months,
    years: Math.floor(months / 12),
    remainingMonths: months % 12
  };
}
function getProgressMilestone(progressPercent: number): {
  level: string;
  label: string;
  description: string;
} {
  if (progressPercent >= 100) return {
    level: 'freedom',
    label: 'OPTIONS',
    description: 'Work becomes optional'
  };
  if (progressPercent >= 75) return {
    level: 'almost',
    label: 'Almost There',
    description: 'Could take a pay cut'
  };
  if (progressPercent >= 50) return {
    level: 'breathing',
    label: 'Breathing Room',
    description: 'Major flexibility'
  };
  if (progressPercent >= 25) return {
    level: 'safety',
    label: 'Safety Net',
    description: 'Can survive 1 week/month without job'
  };
  return {
    level: 'starting',
    label: 'Just Starting',
    description: 'Beginning your journey'
  };
}
function getInterpretation(gap: number, freedomNumber: number, progressPercent: number): string {
  const gapPercent = gap / freedomNumber * 100;
  const gapFormatted = gap.toLocaleString();
  const freedomFormatted = freedomNumber.toLocaleString();
  if (gap <= 0) {
    return "🎉 You've done it. Your passive income covers your expenses. Work is now OPTIONAL. The question isn't 'Can I quit?' but 'What do I WANT to do?' Welcome to freedom.";
  }
  if (gapPercent < 25) {
    return `You're so close! Just $${gapFormatted} more per month and you have complete financial options. This is the home stretch. Don't stop now.`;
  }
  if (gapPercent < 50) {
    return `You're making serious progress. You have real breathing room. Stay focused—the compound effect is working in your favor.`;
  }
  if (gapPercent < 75) {
    return `You've started building! You're ${Math.round(progressPercent)}% of the way to freedom. Your next milestone is reaching more passive income. Consider adding a second income stream to accelerate.`;
  }
  return `You're at the beginning of your journey—and that's exactly where every wealthy person started. Your Freedom Number is $${freedomFormatted}/month. Focus on ONE income stream that can generate a few hundred dollars per month as your first step. Small wins compound into freedom.`;
}
function getProgressColor(progressPercent: number): string {
  if (progressPercent >= 76) return "bg-primary";
  if (progressPercent >= 51) return "bg-primary/80";
  if (progressPercent >= 26) return "bg-primary/60";
  return "bg-primary/40";
}
const FreedomNumberCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [currentPassiveIncome, setCurrentPassiveIncome] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { hasSubmittedEmail, handleEmailSubmitted } = useEmailGate();
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  const results = useMemo(() => {
    if (!showResults) return null;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const passive = parseFloat(currentPassiveIncome) || 0;
    const savings = parseFloat(monthlySavings) || 0;
    const returnRate = parseFloat(expectedReturn) || 7;
    const freedomCalc = calculateFreedomNumber(expenses);
    const gap = calculateGap(freedomCalc.grossMonthly, passive);
    const progress = calculateProgress(passive, freedomCalc.grossMonthly);
    const milestone = getProgressMilestone(progress);
    const interpretation = getInterpretation(gap, freedomCalc.grossMonthly, progress);
    const timeConservative = calculateTimeToFreedom(gap, savings, 4);
    const timeModerate = calculateTimeToFreedom(gap, savings, returnRate);
    const timeAggressive = calculateTimeToFreedom(gap, savings, 10);
    return {
      freedomCalc,
      gap,
      progress,
      milestone,
      interpretation,
      timeConservative,
      timeModerate,
      timeAggressive
    };
  }, [showResults, monthlyExpenses, currentPassiveIncome, monthlySavings, expectedReturn]);
  const validateInputs = (): boolean => {
    const expenses = parseFloat(monthlyExpenses);
    if (!monthlyExpenses || expenses < 1000) {
      toast.error("Monthly expenses should be at least $1,000");
      return false;
    }
    if (expenses > 50000) {
      toast.error("Please enter a realistic monthly expense amount");
      return false;
    }
    const passive = parseFloat(currentPassiveIncome);
    if (currentPassiveIncome === "" || isNaN(passive)) {
      toast.error("Please enter your current passive income (enter 0 if none)");
      return false;
    }
    if (passive > 100000) {
      toast.error("If you're making $100K+ in passive income, you probably don't need this calculator! 🎉");
      return false;
    }
    const savings = parseFloat(monthlySavings);
    if (savings > 20000) {
      toast.error("That's an impressive savings rate! Please double-check this number.");
      return false;
    }
    return true;
  };
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsCalculating(true);

    // Simulate calculation delay for animation
    await new Promise(resolve => setTimeout(resolve, 800));
    setShowResults(true);
    setIsCalculating(false);
  };
  const handleShare = async () => {
    if (!results) return;
    const shareText = `I just calculated my Freedom Number—I need ${formatCurrency(results.freedomCalc.grossMonthly)}/month in passive income to make work optional. I'm currently ${Math.round(results.progress)}% of the way there. Calculate yours →`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Freedom Number",
          text: shareText,
          url: window.location.href
        });
      } catch {
        // User cancelled or share failed
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        toast.success("Share text copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      toast.success("Share text copied to clipboard!");
    }
  };
  const milestones = [{
    percent: 25,
    label: "Safety Net"
  }, {
    percent: 50,
    label: "Breathing Room"
  }, {
    percent: 75,
    label: "Almost There"
  }, {
    percent: 100,
    label: "OPTIONS"
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-4xl">
        <Link to="/money-systems" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Money Systems
        </Link>

        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Freedom Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            When Can I <span className="gradient-text">Quit and make my side hustle my main hustle?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Know exactly how much passive income you need to make working at a 9-5 optional. Calculate your Freedom Number in 60 seconds.</p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }}>
          <Card className="border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Calculate Your Freedom Number</CardTitle>
              <CardDescription>Enter your numbers to see your path to financial freedom</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Monthly Expenses */}
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses" className="text-base font-semibold">
                    What are your monthly living expenses?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Include rent/mortgage, food, insurance, utilities, subscriptions, etc.
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input id="monthlyExpenses" type="number" className="pl-8 h-12 text-lg" placeholder="5,000" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)} min="1000" max="50000" />
                  </div>
                  <p className="text-xs text-muted-foreground">Be honest! This is the minimum you need to cover your life.</p>
                </div>

                {/* Current Passive Income */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassiveIncome" className="text-base font-semibold">
                    How much passive/side income do you currently have?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Income that comes in whether you work your main job or not
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input id="currentPassiveIncome" type="number" className="pl-8 h-12 text-lg" placeholder="0" value={currentPassiveIncome} onChange={e => setCurrentPassiveIncome(e.target.value)} min="0" max="100000" />
                  </div>
                  <p className="text-xs text-muted-foreground">Don't worry if this is $0—that's where most people start!</p>
                </div>

                {/* Monthly Savings */}
                <div className="space-y-2">
                  <Label htmlFor="monthlySavings" className="text-base font-semibold">
                    How much can you invest monthly toward building income streams?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This helps us estimate your timeline
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input id="monthlySavings" type="number" className="pl-8 h-12 text-lg" placeholder="500" value={monthlySavings} onChange={e => setMonthlySavings(e.target.value)} min="0" max="20000" />
                  </div>
                </div>

                {/* Advanced Options */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent">
                      <span className="text-sm text-muted-foreground">Advanced Options</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="expectedReturn" className="text-base font-semibold">
                        Expected annual return on investments
                      </Label>
                      <div className="flex gap-2">
                        {[4, 6, 7, 8, 10, 12].map(rate => <Button key={rate} type="button" variant={expectedReturn === String(rate) ? "default" : "outline"} size="sm" onClick={() => setExpectedReturn(String(rate))}>
                            {rate}%
                          </Button>)}
                      </div>
                      <p className="text-xs text-muted-foreground">7% is the historical stock market average</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button type="submit" disabled={isCalculating} className="w-full h-14 text-lg font-semibold" size="lg">
                  {isCalculating ? <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Calculating...
                    </> : <>
                      <Target className="w-5 h-5 mr-2" />
                      Calculate My Freedom Number
                    </>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && results && (
            <ResultsEmailGate
              toolName="Freedom Number Calculator"
              onEmailSubmitted={handleEmailSubmitted}
              hasSubmittedEmail={hasSubmittedEmail}
              hasResults={true}
            >
              <motion.div initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} transition={{
                duration: 0.5
              }} className="space-y-6">
              {/* Primary Results */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Your Freedom Number
                    </p>
                    <motion.p initial={{
                  scale: 0.5,
                  opacity: 0
                }} animate={{
                  scale: 1,
                  opacity: 1
                }} transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200
                }} className="text-5xl md:text-6xl font-bold text-primary">
                      {formatCurrency(results.freedomCalc.grossMonthly)}<span className="text-2xl text-muted-foreground">/month</span>
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Gross passive income needed (including taxes & reinvestment)
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/30 border border-border mb-8">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Your Expenses</p>
                      <p className="text-lg font-semibold text-foreground">{formatCurrency(results.freedomCalc.netMonthly)}</p>
                    </div>
                    <div className="text-center border-l border-r border-border">
                      <p className="text-xs text-muted-foreground mb-1">Taxes (~{Math.round(results.freedomCalc.taxRate * 100)}%)</p>
                      <p className="text-lg font-semibold text-destructive">{formatCurrency(results.freedomCalc.taxAmount)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Reinvestment (15%)</p>
                      <p className="text-lg font-semibold text-primary">{formatCurrency(results.freedomCalc.reinvestmentAmount)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* The Gap */}
                    <div className="p-6 rounded-xl bg-card border border-border">
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        The Gap You're Closing
                      </p>
                      <p className={`text-3xl font-bold ${results.gap > 0 ? 'text-destructive' : 'text-primary'}`}>
                        {results.gap > 0 ? formatCurrency(results.gap) : '🎉 Achieved!'}
                        {results.gap > 0 && <span className="text-lg text-muted-foreground">/month</span>}
                      </p>
                      {results.gap > 0 && <p className="text-sm text-muted-foreground mt-1">
                          You need {formatCurrency(results.gap)} more per month in passive income
                        </p>}
                    </div>

                    {/* Progress */}
                    <div className="p-6 rounded-xl bg-card border border-border">
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Your Freedom Progress
                      </p>
                      <div className="flex items-end gap-2 mb-3">
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} className="text-3xl font-bold text-foreground">
                          {Math.round(results.progress)}%
                        </motion.span>
                        <span className="text-sm text-muted-foreground pb-1">
                          {results.milestone.label}
                        </span>
                      </div>
                      <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
                        <motion.div initial={{
                      width: 0
                    }} animate={{
                      width: `${results.progress}%`
                    }} transition={{
                      duration: 1,
                      delay: 0.3,
                      ease: "easeOut"
                    }} className={`h-full rounded-full ${getProgressColor(results.progress)}`} />
                      </div>
                    </div>
                  </div>

                  {/* Time to Freedom */}
                  {results.timeModerate && <div className="p-6 rounded-xl bg-card border border-border mb-8">
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Estimated Time to Freedom
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {results.timeConservative && <div>
                            <p className="text-sm text-muted-foreground mb-1">Conservative (4%)</p>
                            <p className="text-xl font-bold text-foreground">
                              {results.timeConservative.years}y {results.timeConservative.remainingMonths}m
                            </p>
                          </div>}
                        <div className="border-l border-r border-border px-4">
                          <p className="text-sm text-muted-foreground mb-1">Moderate ({expectedReturn}%)</p>
                          <p className="text-xl font-bold text-primary">
                            {results.timeModerate.years}y {results.timeModerate.remainingMonths}m
                          </p>
                        </div>
                        {results.timeAggressive && <div>
                            <p className="text-sm text-muted-foreground mb-1">Aggressive (10%)</p>
                            <p className="text-xl font-bold text-foreground">
                              {results.timeAggressive.years}y {results.timeAggressive.remainingMonths}m
                            </p>
                          </div>}
                      </div>
                    </div>}

                  {/* Interpretation */}
                  <div className="p-6 rounded-xl bg-accent/30 border border-border">
                    <p className="text-foreground leading-relaxed">{results.interpretation}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Milestone Timeline */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Your Freedom Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 right-0 top-4 h-1 bg-secondary rounded-full" />
                    <motion.div initial={{
                  width: 0
                }} animate={{
                  width: `${Math.min(results.progress, 100)}%`
                }} transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeOut"
                }} className={`absolute left-0 top-4 h-1 rounded-full ${getProgressColor(results.progress)}`} />
                    
                    {/* Milestones */}
                    <div className="flex justify-between relative">
                      {milestones.map((milestone, index) => {
                    const isAchieved = results.progress >= milestone.percent;
                    return <div key={milestone.percent} className="flex flex-col items-center">
                            <motion.div initial={{
                        scale: 0
                      }} animate={{
                        scale: 1
                      }} transition={{
                        delay: 0.3 + index * 0.1
                      }} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isAchieved ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-background border-border text-muted-foreground'}`}>
                              {milestone.percent}
                            </motion.div>
                            <p className={`text-xs mt-2 text-center max-w-[80px] ${isAchieved ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                              {milestone.label}
                            </p>
                          </div>;
                  })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share & CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Your Freedom Number
                </Button>
                <Link to="/money-systems" className="flex-1">
                  <Button variant="hero" className="w-full">
                    Learn How to Close the Gap →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </ResultsEmailGate>
          )}
        </AnimatePresence>

        {/* Educational Content */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold text-center">Understanding Your Freedom Number</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">What is a Freedom Number?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Your Freedom Number is the monthly passive income that covers your essential living expenses. When your passive income equals your expenses, working a 9-5 becomes a choice, not a requirement.<strong className="text-foreground">choice</strong>, not a requirement.</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Why Focus on Passive Income?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Unlike traditional retirement planning that requires saving 25x your expenses, building passive income streams lets you achieve financial freedom faster by creating money that works while you sleep and escape your 9-5<strong className="text-foreground">faster</strong> by creating money that works while you sleep.</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">The 25% Safety Net</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Once your passive income hits 25% of your expenses, you have a real safety net. You could survive one week per month without your job. This is when <strong className="text-foreground">options</strong> start appearing.</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Building Income Streams</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>The fastest path to freedom isn't saving more—it's building <strong className="text-foreground">multiple income streams</strong>. Dividends, rental income, online businesses, royalties—each stream gets you closer to your number.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>;
};
export default FreedomNumberCalculator;