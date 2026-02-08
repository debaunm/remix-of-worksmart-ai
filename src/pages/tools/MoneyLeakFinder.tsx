import { useState, useMemo } from "react";
import { ArrowLeft, AlertTriangle, Loader2, DollarSign, Sparkles, ChevronDown, Share2, CheckCircle2, XCircle, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultsEmailGate from "@/components/ResultsEmailGate";
import { useEmailGate } from "@/hooks/useEmailGate";

interface SpendingCategory {
  name: string;
  amount: number;
  benchmark: number; // as % of income
  isLeak: boolean;
  severity: "ok" | "warning" | "critical";
  actionPlan: string;
  potentialSavings: number;
}

interface LeakFinderResult {
  totalIncome: number;
  totalSpending: number;
  totalLeaks: number;
  potentialMonthlySavings: number;
  potentialAnnualSavings: number;
  potential10YearGrowth: number;
  categories: SpendingCategory[];
  overallHealth: "excellent" | "good" | "warning" | "critical";
  topRecommendation: string;
  savingsRate: number;
}

const CATEGORY_BENCHMARKS: Record<string, { benchmark: number; label: string; description: string }> = {
  housing: { benchmark: 0.28, label: "Housing", description: "Rent/mortgage, insurance, taxes, maintenance" },
  transportation: { benchmark: 0.15, label: "Transportation", description: "Car payment, gas, insurance, maintenance, transit" },
  food: { benchmark: 0.12, label: "Food & Dining", description: "Groceries, restaurants, coffee, delivery" },
  utilities: { benchmark: 0.05, label: "Utilities", description: "Electric, gas, water, internet, phone" },
  subscriptions: { benchmark: 0.03, label: "Subscriptions", description: "Streaming, apps, memberships, software" },
  shopping: { benchmark: 0.05, label: "Shopping", description: "Clothes, electronics, household items" },
  entertainment: { benchmark: 0.05, label: "Entertainment", description: "Events, hobbies, travel, experiences" },
  healthcare: { benchmark: 0.05, label: "Healthcare", description: "Insurance premiums, medications, copays" },
};

function analyzeSpending(
  monthlyIncome: number,
  spending: Record<string, number>
): LeakFinderResult {
  const categories: SpendingCategory[] = [];
  let totalLeaks = 0;
  let potentialSavings = 0;

  Object.entries(CATEGORY_BENCHMARKS).forEach(([key, { benchmark, label }]) => {
    const amount = spending[key] || 0;
    const benchmarkAmount = monthlyIncome * benchmark;
    const overagePercent = amount > 0 ? (amount - benchmarkAmount) / benchmarkAmount : 0;
    
    let severity: "ok" | "warning" | "critical" = "ok";
    let isLeak = false;
    let actionPlan = "";
    let savings = 0;

    if (amount > benchmarkAmount * 1.5) {
      severity = "critical";
      isLeak = true;
      savings = amount - benchmarkAmount;
      totalLeaks++;
    } else if (amount > benchmarkAmount * 1.2) {
      severity = "warning";
      isLeak = true;
      savings = amount - benchmarkAmount;
      totalLeaks++;
    }

    // Generate specific action plans
    switch (key) {
      case "housing":
        if (isLeak) {
          actionPlan = "Consider refinancing, getting a roommate, or downsizing. House hacking could eliminate this cost entirely.";
        } else {
          actionPlan = "Your housing costs are well-managed. Keep it this way as long as possible.";
        }
        break;
      case "transportation":
        if (isLeak) {
          actionPlan = "Consider a more affordable vehicle, carpooling, or public transit. Many wealthy people drive modest cars.";
        } else {
          actionPlan = "Good job keeping transportation reasonable. Avoid upgrading until necessary.";
        }
        break;
      case "food":
        if (isLeak) {
          actionPlan = "Meal prep, reduce delivery apps, and set a dining-out budget. This is often the #1 leak for busy professionals.";
        } else {
          actionPlan = "Nice work on food spending. Continue meal planning to maintain this.";
        }
        break;
      case "subscriptions":
        if (isLeak) {
          actionPlan = "Do a subscription audit NOW. Cancel anything you haven't used in 30 days. Most people pay for 5+ unused services.";
        } else {
          actionPlan = "Subscriptions under control. Set a calendar reminder to audit quarterly.";
        }
        break;
      case "shopping":
        if (isLeak) {
          actionPlan = "Implement a 48-hour rule for purchases over $50. Unsubscribe from retail emails. Use a wishlist instead of impulse buying.";
        } else {
          actionPlan = "Shopping is under control. Continue being intentional with purchases.";
        }
        break;
      case "entertainment":
        if (isLeak) {
          actionPlan = "Set a monthly entertainment budget and stick to it. Look for free alternatives and off-peak pricing.";
        } else {
          actionPlan = "Entertainment spending is healthy. Enjoy experiences guilt-free.";
        }
        break;
      default:
        if (isLeak) {
          actionPlan = `This category is running ${Math.round(overagePercent * 100)}% over budget. Review recent transactions and identify quick wins.`;
        } else {
          actionPlan = "This category is within healthy limits. Maintain your current habits.";
        }
    }

    potentialSavings += Math.max(0, savings);

    categories.push({
      name: label,
      amount,
      benchmark: benchmarkAmount,
      isLeak,
      severity,
      actionPlan,
      potentialSavings: Math.max(0, Math.round(savings)),
    });
  });

  // Sort by severity (critical first) then by amount
  categories.sort((a, b) => {
    const severityOrder = { critical: 0, warning: 1, ok: 2 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return b.amount - a.amount;
  });

  const totalSpending = Object.values(spending).reduce((a, b) => a + b, 0);
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - totalSpending) / monthlyIncome) * 100 : 0;
  
  // Calculate 10-year growth of potential savings (7% annual return)
  const annualSavings = potentialSavings * 12;
  const potential10YearGrowth = calculateFutureValue(potentialSavings, 0.07 / 12, 120);

  // Determine overall health
  let overallHealth: "excellent" | "good" | "warning" | "critical";
  if (totalLeaks === 0 && savingsRate >= 20) {
    overallHealth = "excellent";
  } else if (totalLeaks <= 1 && savingsRate >= 10) {
    overallHealth = "good";
  } else if (totalLeaks <= 3) {
    overallHealth = "warning";
  } else {
    overallHealth = "critical";
  }

  // Top recommendation
  const topLeak = categories.find(c => c.severity === "critical") || categories.find(c => c.severity === "warning");
  const topRecommendation = topLeak
    ? `Priority #1: Fix your ${topLeak.name.toLowerCase()} spending. You could recover $${topLeak.potentialSavings.toLocaleString()}/month by bringing it to healthy levels.`
    : "Your spending is well-optimized! Focus on increasing income or investment contributions.";

  return {
    totalIncome: monthlyIncome,
    totalSpending,
    totalLeaks,
    potentialMonthlySavings: Math.round(potentialSavings),
    potentialAnnualSavings: Math.round(annualSavings),
    potential10YearGrowth: Math.round(potential10YearGrowth),
    categories,
    overallHealth,
    topRecommendation,
    savingsRate,
  };
}

function calculateFutureValue(monthlyContribution: number, monthlyRate: number, months: number): number {
  let fv = 0;
  for (let i = 0; i < months; i++) {
    fv = (fv + monthlyContribution) * (1 + monthlyRate);
  }
  return fv;
}

const MoneyLeakFinder = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transportation, setTransportation] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [subscriptions, setSubscriptions] = useState("");
  const [shopping, setShopping] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [healthcare, setHealthcare] = useState("");
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
    
    const spending = {
      housing: parseFloat(housing) || 0,
      transportation: parseFloat(transportation) || 0,
      food: parseFloat(food) || 0,
      utilities: parseFloat(utilities) || 0,
      subscriptions: parseFloat(subscriptions) || 0,
      shopping: parseFloat(shopping) || 0,
      entertainment: parseFloat(entertainment) || 0,
      healthcare: parseFloat(healthcare) || 0,
    };

    return analyzeSpending(parseFloat(monthlyIncome) || 0, spending);
  }, [showResults, monthlyIncome, housing, transportation, food, utilities, subscriptions, shopping, entertainment, healthcare]);

  const validateInputs = (): boolean => {
    const income = parseFloat(monthlyIncome);
    if (!monthlyIncome || income < 1000) {
      toast.error("Please enter a valid monthly income (at least $1,000)");
      return false;
    }

    const totalSpending = [housing, transportation, food, utilities, subscriptions, shopping, entertainment, healthcare]
      .reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    if (totalSpending < 500) {
      toast.error("Please enter your spending in at least a few categories");
      return false;
    }

    return true;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowResults(true);
    setIsCalculating(false);
  };

  const handleShare = async () => {
    if (!results) return;
    const shareText = `I just found ${results.totalLeaks} money leaks costing me $${results.potentialMonthlySavings}/month! That's $${results.potential10YearGrowth.toLocaleString()} in 10 years. Find your leaks →`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Money Leaks",
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

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent": return "text-green-500";
      case "good": return "text-blue-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getHealthLabel = (health: string) => {
    switch (health) {
      case "excellent": return "Excellent";
      case "good": return "Good";
      case "warning": return "Needs Attention";
      case "critical": return "Critical";
      default: return "";
    }
  };

  const SpendingInput = ({ id, label, value, onChange, description }: { 
    id: string; 
    label: string; 
    value: string; 
    onChange: (val: string) => void;
    description: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
        <Input
          id={id}
          type="number"
          className="pl-7 h-10"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min="0"
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );

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
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Free Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your <span className="gradient-text">Money Leaks</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover where your money is quietly disappearing—and get a personalized action plan to fix them.
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
              <CardTitle className="text-2xl">Enter Your Monthly Spending</CardTitle>
              <CardDescription>Be honest—we're looking for leaks, not judging you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Monthly Income */}
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome" className="text-base font-semibold">
                    Monthly take-home income (after taxes)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      className="pl-8 h-12 text-lg"
                      placeholder="6,000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      min="1000"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm font-semibold mb-4">Where does your money go each month?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SpendingInput
                      id="housing"
                      label="Housing"
                      value={housing}
                      onChange={setHousing}
                      description="Rent, mortgage, insurance, property tax"
                    />
                    <SpendingInput
                      id="transportation"
                      label="Transportation"
                      value={transportation}
                      onChange={setTransportation}
                      description="Car, gas, insurance, Uber, transit"
                    />
                    <SpendingInput
                      id="food"
                      label="Food & Dining"
                      value={food}
                      onChange={setFood}
                      description="Groceries, restaurants, coffee, delivery"
                    />
                    <SpendingInput
                      id="utilities"
                      label="Utilities"
                      value={utilities}
                      onChange={setUtilities}
                      description="Electric, gas, water, internet, phone"
                    />
                  </div>
                </div>

                {/* Advanced spending categories */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent">
                      <span className="text-sm text-muted-foreground">More Categories (for better accuracy)</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SpendingInput
                        id="subscriptions"
                        label="Subscriptions"
                        value={subscriptions}
                        onChange={setSubscriptions}
                        description="Netflix, Spotify, gym, software, etc."
                      />
                      <SpendingInput
                        id="shopping"
                        label="Shopping"
                        value={shopping}
                        onChange={setShopping}
                        description="Clothes, electronics, Amazon"
                      />
                      <SpendingInput
                        id="entertainment"
                        label="Entertainment"
                        value={entertainment}
                        onChange={setEntertainment}
                        description="Events, hobbies, travel, experiences"
                      />
                      <SpendingInput
                        id="healthcare"
                        label="Healthcare"
                        value={healthcare}
                        onChange={setHealthcare}
                        description="Insurance, medications, copays"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button type="submit" disabled={isCalculating} className="w-full h-14 text-lg font-semibold" size="lg">
                  {isCalculating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Finding Your Leaks...
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-5 h-5 mr-2" />
                      Find My Money Leaks
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
              toolName="Money Leak Finder"
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
                {/* Summary Card */}
                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="pt-8 pb-10">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Money Leaks Found</p>
                      <div className="text-7xl md:text-8xl font-bold text-primary mb-4">
                        {results.totalLeaks}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <span className={`text-xl font-semibold ${getHealthColor(results.overallHealth)}`}>
                          {getHealthLabel(results.overallHealth)}
                        </span>
                      </div>
                      
                      {results.potentialMonthlySavings > 0 && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {formatCurrency(results.potentialMonthlySavings)}/month leaking
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Impact Numbers */}
                {results.potentialMonthlySavings > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-border/50">
                      <CardContent className="pt-6 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Monthly Savings Possible</p>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.potentialMonthlySavings)}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-border/50">
                      <CardContent className="pt-6 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Annual Impact</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(results.potentialAnnualSavings)}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-border/50">
                      <CardContent className="pt-6 text-center">
                        <p className="text-sm text-muted-foreground mb-1">10-Year Growth</p>
                        <p className="text-2xl font-bold text-green-500">{formatCurrency(results.potential10YearGrowth)}</p>
                        <p className="text-xs text-muted-foreground mt-1">If invested at 7%</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Priority Action */}
                <Card className="border-yellow-500/30 bg-yellow-500/5">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-lg leading-relaxed">{results.topRecommendation}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Breakdown */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Your Spending Breakdown</CardTitle>
                    <CardDescription>Compared to recommended benchmarks for your income</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.categories.filter(c => c.amount > 0).map((category) => (
                      <div key={category.name} className="p-4 rounded-lg bg-muted/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {category.severity === "ok" ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : category.severity === "warning" ? (
                              <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className="font-semibold">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(category.amount)}/mo</p>
                            <p className="text-xs text-muted-foreground">
                              Benchmark: {formatCurrency(category.benchmark)}
                            </p>
                          </div>
                        </div>
                        
                        {category.isLeak && (
                          <div className="pl-8">
                            <p className="text-sm text-red-500 font-medium">
                              +{formatCurrency(category.potentialSavings)} over budget
                            </p>
                          </div>
                        )}
                        
                        <div className="pl-8">
                          <p className="text-sm text-muted-foreground">{category.actionPlan}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Current Savings Rate */}
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Current Savings Rate</p>
                        <p className="text-3xl font-bold">{results.savingsRate.toFixed(1)}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Target for early retirement</p>
                        <p className="text-xl font-semibold text-primary">25%+</p>
                      </div>
                    </div>
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
            <h2 className="text-2xl font-bold mb-4">The Hidden Cost of Money Leaks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Small leaks don't feel expensive—but they compound against you. That $200/month subscription creep? It's costing you $41,000+ over 10 years when you factor in lost investment returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The Latte Factor", description: "$7/day on small purchases = $2,555/year = $37,000 over 10 years invested. It adds up." },
              { title: "Subscription Creep", description: "The average person pays for 6 subscriptions they forgot about. Do a 30-day audit." },
              { title: "Lifestyle Inflation", description: "When income rises, spending rises too. The wealthy get rich by NOT inflating their lifestyle." },
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

export default MoneyLeakFinder;
