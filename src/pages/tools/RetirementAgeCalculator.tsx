import { useState, useMemo } from "react";
import { ArrowLeft, Calendar, Loader2, TrendingUp, Target, Sparkles, ChevronDown, Share2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultsEmailGate from "@/components/ResultsEmailGate";
import { useEmailGate } from "@/hooks/useEmailGate";

interface RetirementResult {
  retirementAge: number;
  yearsUntilRetirement: number;
  projectedNestEgg: number;
  monthlyRetirementIncome: number;
  canRetireEarly: boolean;
  targetAge40Possible: boolean;
  targetAge50Possible: boolean;
  targetAge55Possible: boolean;
  additionalMonthlySavingsFor40: number;
  additionalMonthlySavingsFor50: number;
  recommendation: string;
  savingsRate: number;
}

function calculateRetirementAge(
  currentAge: number,
  currentSavings: number,
  monthlyContribution: number,
  monthlyExpenses: number,
  expectedReturn: number
): RetirementResult {
  const annualReturn = expectedReturn / 100;
  const monthlyReturn = annualReturn / 12;
  const withdrawalRate = 0.04; // 4% safe withdrawal rate
  const annualExpenses = monthlyExpenses * 12;
  const targetNestEgg = annualExpenses / withdrawalRate;

  // Calculate when they can retire with current savings rate
  let retirementAge = currentAge;
  let nestEgg = currentSavings;
  
  while (nestEgg < targetNestEgg && retirementAge < 100) {
    nestEgg = nestEgg * (1 + annualReturn) + monthlyContribution * 12;
    retirementAge++;
  }

  const yearsUntilRetirement = retirementAge - currentAge;
  const projectedNestEgg = nestEgg;
  const monthlyRetirementIncome = (projectedNestEgg * withdrawalRate) / 12;

  // Check if specific ages are achievable
  const checkAgeAchievable = (targetAge: number): boolean => {
    if (targetAge <= currentAge) return false;
    const yearsToTarget = targetAge - currentAge;
    let projected = currentSavings;
    for (let i = 0; i < yearsToTarget; i++) {
      projected = projected * (1 + annualReturn) + monthlyContribution * 12;
    }
    return projected >= targetNestEgg;
  };

  // Calculate additional savings needed for each target
  const calculateAdditionalSavings = (targetAge: number): number => {
    if (targetAge <= currentAge) return 0;
    const yearsToTarget = targetAge - currentAge;
    const monthsToTarget = yearsToTarget * 12;
    
    // Calculate future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsToTarget);
    const remainingNeeded = targetNestEgg - fvCurrentSavings;
    
    if (remainingNeeded <= 0) return 0;
    
    // PMT formula for required monthly contribution
    const pmt = remainingNeeded * monthlyReturn / (Math.pow(1 + monthlyReturn, monthsToTarget) - 1);
    const additionalNeeded = pmt - monthlyContribution;
    
    return Math.max(0, Math.round(additionalNeeded));
  };

  // Calculate savings rate
  const monthlyIncome = monthlyExpenses + monthlyContribution;
  const savingsRate = monthlyIncome > 0 ? (monthlyContribution / monthlyIncome) * 100 : 0;

  // Generate recommendation
  let recommendation = "";
  if (retirementAge <= 40) {
    recommendation = "🔥 FIRE achieved! At your current pace, you're on track for extreme early retirement. You're doing everything right—stay the course and enjoy the journey.";
  } else if (retirementAge <= 50) {
    recommendation = "🚀 Early retirement is well within reach! You're building wealth faster than 95% of people. Consider increasing contributions when possible to accelerate even further.";
  } else if (retirementAge <= 55) {
    recommendation = "💪 You're ahead of schedule! Most people can't retire until 65+. A modest increase in savings could push you into the 'retire at 50' club.";
  } else if (retirementAge <= 65) {
    recommendation = "📈 You're on a solid path to traditional retirement age. To retire earlier, focus on increasing income or reducing expenses—even small changes compound dramatically over time.";
  } else {
    recommendation = "⚠️ At your current rate, retirement may be delayed. The good news? Small changes now have huge impacts. Even $200 more per month could shave years off your timeline.";
  }

  return {
    retirementAge,
    yearsUntilRetirement,
    projectedNestEgg,
    monthlyRetirementIncome,
    canRetireEarly: retirementAge <= 55,
    targetAge40Possible: checkAgeAchievable(40),
    targetAge50Possible: checkAgeAchievable(50),
    targetAge55Possible: checkAgeAchievable(55),
    additionalMonthlySavingsFor40: calculateAdditionalSavings(40),
    additionalMonthlySavingsFor50: calculateAdditionalSavings(50),
    recommendation,
    savingsRate,
  };
}

const RetirementAgeCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [expectedReturn, setExpectedReturn] = useState(7);
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
    
    const age = parseInt(currentAge) || 30;
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;
    const expenses = parseFloat(monthlyExpenses) || 3000;

    return calculateRetirementAge(age, savings, contribution, expenses, expectedReturn);
  }, [showResults, currentAge, currentSavings, monthlyContribution, monthlyExpenses, expectedReturn]);

  const validateInputs = (): boolean => {
    const age = parseInt(currentAge);
    if (!currentAge || age < 18 || age > 70) {
      toast.error("Please enter a valid age between 18 and 70");
      return false;
    }

    const expenses = parseFloat(monthlyExpenses);
    if (!monthlyExpenses || expenses < 500) {
      toast.error("Monthly expenses should be at least $500");
      return false;
    }

    const contribution = parseFloat(monthlyContribution);
    if (monthlyContribution === "" || isNaN(contribution) || contribution < 0) {
      toast.error("Please enter your monthly investment amount (can be $0)");
      return false;
    }

    return true;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setShowResults(true);
    setIsCalculating(false);
  };

  const handleShare = async () => {
    if (!results) return;
    const shareText = `I just calculated my retirement age! At my current pace, I could retire at ${results.retirementAge}. Find out when YOU can retire →`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Retirement Age",
          text: shareText,
          url: window.location.href
        });
      } catch {
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        toast.success("Share text copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      toast.success("Share text copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-4xl">
        <Link to="/free-tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Free Tools
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Free Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            When Can I <span className="gradient-text">Actually Retire?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether that means 40, 50, or never working a 9-5 again—find out exactly when financial freedom is possible for you.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Calculate Your Retirement Age</CardTitle>
              <CardDescription>Enter your numbers to see when you can make work optional</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Current Age */}
                <div className="space-y-2">
                  <Label htmlFor="currentAge" className="text-base font-semibold">
                    How old are you?
                  </Label>
                  <Input
                    id="currentAge"
                    type="number"
                    className="h-12 text-lg"
                    placeholder="32"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    min="18"
                    max="70"
                  />
                </div>

                {/* Current Savings */}
                <div className="space-y-2">
                  <Label htmlFor="currentSavings" className="text-base font-semibold">
                    Total invested savings (retirement accounts, investments, etc.)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                      id="currentSavings"
                      type="number"
                      className="pl-8 h-12 text-lg"
                      placeholder="50,000"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution" className="text-base font-semibold">
                    How much do you invest each month?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Include 401(k), IRA, brokerage accounts, etc.
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      className="pl-8 h-12 text-lg"
                      placeholder="1,000"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>

                {/* Monthly Expenses */}
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses" className="text-base font-semibold">
                    Expected monthly expenses in retirement
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Your future lifestyle costs (housing, food, healthcare, fun)
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      className="pl-8 h-12 text-lg"
                      placeholder="4,000"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      min="500"
                    />
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
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        Expected annual investment return: {expectedReturn}%
                      </Label>
                      <Slider
                        value={[expectedReturn]}
                        onValueChange={(value) => setExpectedReturn(value[0])}
                        min={4}
                        max={12}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">7% is the historical stock market average (inflation-adjusted)</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button type="submit" disabled={isCalculating} className="w-full h-14 text-lg font-semibold" size="lg">
                  {isCalculating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Calculate My Retirement Age
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && results && (
            <ResultsEmailGate
              toolName="Retirement Age Calculator"
              onEmailSubmitted={handleEmailSubmitted}
              hasSubmittedEmail={hasSubmittedEmail}
              hasResults={showResults}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Main Result Card */}
                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
                  <CardContent className="pt-8 pb-10">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">You could retire at age</p>
                      <div className="text-7xl md:text-8xl font-bold text-primary mb-4">
                        {results.retirementAge}
                      </div>
                      <p className="text-xl text-muted-foreground mb-6">
                        That's <span className="font-semibold text-foreground">{results.yearsUntilRetirement} years</span> from now
                      </p>
                      
                      {/* Savings Rate Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-6">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          Your savings rate: <span className="text-primary">{results.savingsRate.toFixed(0)}%</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Retirement Milestones */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Early Retirement Milestones
                    </CardTitle>
                    <CardDescription>Can you hit these targets with your current pace?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { age: 40, possible: results.targetAge40Possible, additional: results.additionalMonthlySavingsFor40, label: "Extreme FIRE" },
                      { age: 50, possible: results.targetAge50Possible, additional: results.additionalMonthlySavingsFor50, label: "Early Retirement" },
                      { age: 55, possible: results.targetAge55Possible, additional: 0, label: "Very Early" },
                    ].map((milestone) => (
                      <div key={milestone.age} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          {milestone.possible ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
                          )}
                          <div>
                            <p className="font-semibold">Retire at {milestone.age}</p>
                            <p className="text-sm text-muted-foreground">{milestone.label}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {milestone.possible ? (
                            <span className="text-green-500 font-semibold">On Track ✓</span>
                          ) : milestone.additional > 0 && milestone.age > parseInt(currentAge) ? (
                            <span className="text-sm text-muted-foreground">
                              Need +{formatCurrency(milestone.additional)}/mo
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not achievable</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Projected Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-1">Projected Nest Egg</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(results.projectedNestEgg)}</p>
                      <p className="text-xs text-muted-foreground mt-2">At retirement age {results.retirementAge}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Retirement Income</p>
                      <p className="text-3xl font-bold text-foreground">{formatCurrency(results.monthlyRetirementIncome)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Based on 4% withdrawal rate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendation */}
                <Card className="border-border/50 bg-muted/30">
                  <CardContent className="pt-6 pb-6">
                    <p className="text-lg leading-relaxed">{results.recommendation}</p>
                  </CardContent>
                </Card>

                {/* Share Button */}
                <div className="flex justify-center">
                  <Button variant="outline" size="lg" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share My Results
                  </Button>
                </div>
              </motion.div>
            </ResultsEmailGate>
          )}
        </AnimatePresence>

        {/* Educational Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">The Power of Starting Early</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every year you delay investing costs you more than you think. The difference between starting at 25 vs 35 could mean retiring 10 years earlier—or having twice as much money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The 25% Rule", description: "If you save 25% of your income, you can typically retire in about 30 years. Save 50%? You could be done in 15." },
              { title: "Compound Magic", description: "Money doubles roughly every 10 years at 7% returns. The earlier you start, the more doublings you get." },
              { title: "Time > Money", description: "Someone who invests $500/mo starting at 25 will have more at 65 than someone investing $1000/mo starting at 35." },
            ].map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RetirementAgeCalculator;
