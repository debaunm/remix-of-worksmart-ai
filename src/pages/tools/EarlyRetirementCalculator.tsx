import { useState, useMemo } from "react";
import { ArrowLeft, PiggyBank, Loader2, Copy, Check, TrendingUp, Target, Shield, Zap, AlertCircle } from "lucide-react";
import BuyToolButton from "@/components/BuyToolButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CoastFIREChart from "@/components/CoastFIREChart";

const EarlyRetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState("35");
  const [retirementAge, setRetirementAge] = useState("61");
  const [annualSpending, setAnnualSpending] = useState("60000");
  const [currentAssets, setCurrentAssets] = useState("75000");
  const [monthlyContributions, setMonthlyContributions] = useState("0");
  const [retirementIncome, setRetirementIncome] = useState("0");
  const [growthRate, setGrowthRate] = useState("10");
  const [inflationRate, setInflationRate] = useState("3");
  const [withdrawalRate, setWithdrawalRate] = useState("4");
  const [investmentFees, setInvestmentFees] = useState("0.5");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("early_retirement_calculator");

  const validateInputs = () => {
    const age = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    
    if (age >= 100 || retirement >= 100) {
      toast.error("Please choose ages of 100 or less");
      return false;
    }
    if (age >= retirement) {
      toast.error("Current age must be less than retirement age");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    await execute({
      current_age: currentAge,
      retirement_age: retirementAge,
      annual_spending: annualSpending,
      current_assets: currentAssets,
      monthly_contributions: monthlyContributions,
      retirement_income: retirementIncome,
      growth_rate: growthRate,
      inflation_rate: inflationRate,
      withdrawal_rate: withdrawalRate,
      investment_fees: investmentFees,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const data = result as Record<string, unknown> | null;
  const paths = data?.paths as Record<string, unknown[]> | undefined;

  // Parse FIRE number for chart
  const parsedFireNumber = useMemo(() => {
    if (!data?.fire_number) return 0;
    const fireStr = String(data.fire_number).replace(/[$,]/g, '');
    return parseFloat(fireStr) || 0;
  }, [data]);

  const showChart = data && parsedFireNumber > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
            <PiggyBank className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Coast FIRE Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your <span className="gradient-text">Financial Freedom</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get clear on the number that lets your investments carry you to retirement without grinding forever.
          </p>
          <div className="mt-6">
            <BuyToolButton toolName="Early Retirement Calculator" />
          </div>
        </motion.div>

        {/* Calculator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Calculator Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Coast FIRE Calculator</CardTitle>
              <CardDescription>Enter your numbers to see your path</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Must be less than 100</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retirementAge">Retirement Age</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Most people use 61</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="annualSpending">Annual Spending</Label>
                    <CurrencyInput
                      id="annualSpending"
                      showDollarSign
                      value={annualSpending}
                      onChange={setAnnualSpending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentAssets">Current Invested Assets</Label>
                    <CurrencyInput
                      id="currentAssets"
                      showDollarSign
                      value={currentAssets}
                      onChange={setCurrentAssets}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyContributions">Monthly Contributions</Label>
                    <CurrencyInput
                      id="monthlyContributions"
                      showDollarSign
                      value={monthlyContributions}
                      onChange={setMonthlyContributions}
                    />
                    <p className="text-xs text-muted-foreground">Use $0 to check if you're already at Coast</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retirementIncome">Part-Time Retirement Income</Label>
                    <CurrencyInput
                      id="retirementIncome"
                      showDollarSign
                      value={retirementIncome}
                      onChange={setRetirementIncome}
                    />
                    <p className="text-xs text-muted-foreground">Annual income you expect in retirement</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="growthRate">Investment Growth Rate</Label>
                    <div className="relative">
                      <Input
                        id="growthRate"
                        type="number"
                        step="0.1"
                        className="pr-7"
                        value={growthRate}
                        onChange={(e) => setGrowthRate(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">10% is historical average</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inflationRate">Inflation Rate</Label>
                    <div className="relative">
                      <Input
                        id="inflationRate"
                        type="number"
                        step="0.1"
                        className="pr-7"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawalRate">Safe Withdrawal Rate</Label>
                    <div className="relative">
                      <Input
                        id="withdrawalRate"
                        type="number"
                        step="0.1"
                        className="pr-7"
                        value={withdrawalRate}
                        onChange={(e) => setWithdrawalRate(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">4% is commonly used</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investmentFees">Investment Fees</Label>
                    <div className="relative">
                      <Input
                        id="investmentFees"
                        type="number"
                        step="0.01"
                        className="pr-7"
                        value={investmentFees}
                        onChange={(e) => setInvestmentFees(e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Results</CardTitle>
              </CardHeader>
              <CardContent>
                {!data ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your numbers and click Calculate to see your Coast FIRE analysis</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      {/* Coast FIRE Number - What you need TODAY */}
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Coast FIRE Number</p>
                        <p className="text-3xl font-bold text-primary">{String(data.coast_fire_number || data.fire_number)}</p>
                        <p className="text-xs text-muted-foreground mt-1">What you need TODAY to coast to retirement</p>
                      </div>
                      
                      {/* Status indicator */}
                      {data.already_coasting !== undefined && (
                        <div className={`p-4 rounded-xl border ${data.already_coasting ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <p className={`text-xl font-bold ${data.already_coasting ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {data.already_coasting ? '🎉 You\'re Coasting!' : '📈 Keep Building'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {data.already_coasting 
                              ? 'Your investments can carry you to retirement!' 
                              : 'You have a gap to close before reaching Coast FIRE'}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-card border border-border/50">
                          <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                          <p className="text-2xl font-bold text-foreground">{data.timeline as string}</p>
                          <p className="text-xs text-muted-foreground">Years to Coast FIRE</p>
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-border/50">
                          <p className="text-sm text-muted-foreground mb-1">Gap to Close</p>
                          <p className="text-2xl font-bold text-foreground">{String(data.gap)}</p>
                          <p className="text-xs text-muted-foreground">Remaining to invest</p>
                        </div>
                      </div>
                      
                      {/* FIRE Number */}
                      <div className="p-4 rounded-xl bg-card border border-border/50">
                        <p className="text-sm text-muted-foreground mb-1">FIRE Number</p>
                        <p className="text-xl font-bold text-foreground">{String(data.fire_number)}</p>
                        <p className="text-xs text-muted-foreground">Portfolio needed at retirement</p>
                      </div>
                      
                      {/* Required vs Available Withdrawal */}
                      <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3">
                        <p className="text-sm font-medium text-foreground">Withdrawal Breakdown</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Required Withdrawal</p>
                            <p className="text-lg font-bold text-foreground">{String(data.required_withdrawal || 'N/A')}</p>
                            <p className="text-xs text-muted-foreground">What you need from portfolio</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Available Withdrawal</p>
                            <p className="text-lg font-bold text-foreground">{String(data.available_withdrawal || 'N/A')}</p>
                            <p className="text-xs text-muted-foreground">{withdrawalRate}% of projected assets</p>
                          </div>
                        </div>
                        
                        {/* Surplus indicator */}
                        {data.surplus && (
                          <div className={`p-3 rounded-lg border ${
                            String(data.surplus).startsWith('+') 
                              ? 'bg-emerald-500/10 border-emerald-500/30' 
                              : 'bg-amber-500/10 border-amber-500/30'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {String(data.surplus).startsWith('+') ? '✓ Surplus/Buffer' : '⚠ Shortfall'}
                              </span>
                              <span className={`text-lg font-bold ${
                                String(data.surplus).startsWith('+') ? 'text-emerald-500' : 'text-amber-500'
                              }`}>
                                {String(data.surplus)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {String(data.surplus).startsWith('+') 
                                ? 'Extra cushion beyond your spending needs' 
                                : 'You may need to adjust spending or savings'}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Total Retirement Income Summary */}
                      {parseFloat(retirementIncome) > 0 && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                          <p className="text-sm text-muted-foreground mb-2">Retirement Income Sources</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Available withdrawal ({withdrawalRate}%):</span>
                              <span className="font-medium">{String(data.available_withdrawal || 'N/A')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Part-time income:</span>
                              <span className="font-medium">${parseInt(retirementIncome).toLocaleString()}/year</span>
                            </div>
                            <div className="flex justify-between border-t border-border/50 pt-1 mt-1">
                              <span className="font-medium">Total available:</span>
                              <span className="font-bold text-emerald-500">{String(data.projected_retirement_income)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Annual spending:</span>
                              <span className="font-medium">${parseInt(annualSpending).toLocaleString()}/year</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {paths && (
                      <div className="space-y-3">
                        <h3 className="font-semibold">Your Paths</h3>
                        {(["aggressive", "moderate", "conservative"] as const).map((tier) => {
                          const pathItems = paths[tier];
                          if (!pathItems) return null;
                          return (
                            <div key={tier} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                              <p className="text-sm font-medium capitalize mb-2">{tier} Path</p>
                              <ul className="space-y-1">
                                {pathItems.map((item: unknown, i: number) => {
                                  const itemText = typeof item === 'string' 
                                    ? item 
                                    : typeof item === 'object' && item !== null
                                      ? (item as Record<string, unknown>).description || JSON.stringify(item)
                                      : String(item);
                                  return (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="text-primary">•</span>
                                      <span>{String(itemText)}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {data.monthly_habits && Array.isArray(data.monthly_habits) && (data.monthly_habits as unknown[]).length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Monthly Habits to Build</h3>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.monthly_habits), "habits")}>
                            {copiedField === "habits" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <ul className="space-y-2">
                          {(data.monthly_habits as unknown[]).map((habit: unknown, i: number) => {
                            const habitText = typeof habit === 'string' 
                              ? habit 
                              : typeof habit === 'object' && habit !== null
                                ? (habit as Record<string, unknown>).description || JSON.stringify(habit)
                                : String(habit);
                            return (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-primary font-bold">{i + 1}.</span>
                                <span className="text-foreground">{String(habitText)}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Portfolio Growth Chart */}
            {showChart && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CoastFIREChart
                  currentAge={parseInt(currentAge)}
                  retirementAge={parseInt(retirementAge)}
                  currentAssets={parseFloat(currentAssets)}
                  monthlyContributions={parseFloat(monthlyContributions)}
                  growthRate={parseFloat(growthRate)}
                  inflationRate={parseFloat(inflationRate)}
                  investmentFees={parseFloat(investmentFees)}
                  fireNumber={parsedFireNumber}
                  annualSpending={parseFloat(annualSpending)}
                  withdrawalRate={parseFloat(withdrawalRate)}
                  retirementIncome={parseFloat(retirementIncome)}
                />
              </motion.div>
            )}
            
            <p className="text-xs text-muted-foreground text-center">
              Disclaimer: This is for educational purposes only and not financial advice. Consult a financial advisor.
            </p>
          </div>
        </motion.div>

        {/* Educational Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          {/* What is Coast FIRE */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Coast FIRE Calculator: Your Path to Financial Independence 2024</h2>
            <p className="text-muted-foreground text-lg mb-6">
              If you're trying to figure out when you can stop stressing about retirement savings, this calculator gives you a realistic, data-backed view of your Coast FIRE number. Coast FIRE isn't about extreme frugality. It's about getting your money invested early and letting compounding do the work.
            </p>

            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  What is Coast FIRE?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Coast FIRE is a strategy where you save aggressively early in your career, then let your portfolio grow on its own while you shift into a lifestyle that actually feels sustainable. Once you hit your Coast number, you don't have to keep feeding retirement accounts for the math to work.
                </p>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Key Benefits of Coast FIRE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Know exactly when you can stop contributing to retirement",
                    "Use compound growth to your advantage",
                    "Create flexibility in your career",
                    "Build toward financial independence without sacrificing your quality of life",
                    "Make a smarter long-term plan instead of guessing"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Coast FIRE vs Traditional FIRE */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How Coast FIRE Differs from Traditional FIRE</h2>
            <p className="text-muted-foreground mb-6">
              Traditional FIRE often demands saving half (or more) of your income. Coast FIRE is more balanced. Once your investments can grow to your retirement target without new contributions, you get your time and energy back. This approach allows you to:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Decrease your savings rate after hitting your Coast number",
                "Cover your lifestyle while your money grows",
                "Make career decisions based on meaning, not pressure",
                "Protect your work-life balance",
                "Let compounding do the heavy lifting"
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/30 border border-border/30">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How Coast FIRE Works */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How Coast FIRE Works</h2>
            <p className="text-muted-foreground mb-6">
              The foundation is compound interest. Money invested early has decades to multiply. A 30-year-old with $200k invested today could easily reach $1M by 65 without adding a dollar, assuming conservative returns. The curve accelerates over time, which is why early savings matter so much.
            </p>
            <p className="text-muted-foreground mb-8">
              Our calculator handles the math for you, so you can focus on the decisions.
            </p>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Key Components of Coast FIRE Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Your Coast number depends on:</p>
                <ul className="space-y-2">
                  {[
                    "Your current and target retirement age",
                    "Your expected retirement lifestyle",
                    "Where you live and your healthcare needs",
                    "Your existing investments",
                    "Your projected spending",
                    "Inflation",
                    "Realistic return assumptions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  Get these inputs right and your path becomes predictable instead of guesswork.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Benefits and Challenges */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Benefits and Challenges of Coast FIRE</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Coast FIRE removes the mental weight of aggressive saving. Once you hit your number, life opens up. People often report:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Lower financial stress",
                      "More freedom to choose work they actually enjoy",
                      "Better balance day to day",
                      "A healthier long-term plan than traditional FIRE"
                    ].map((adv, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    Potential Drawbacks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    It does require front-loaded savings and long-term discipline. Markets can move against you, and life changes can shift your targets. If you're planning decades ahead, you'll need to revisit assumptions regularly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Strategies */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Strategies to Reach Coast FIRE</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Investment Approaches</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most people follow a diversified, low-fee index fund strategy. Real estate or REITs can add another layer. The goal is steady, long-term growth with minimal drag.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Ways to Accelerate Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Max out tax-advantaged accounts early",
                      "Build multiple income streams",
                      "Level up high-value skills",
                      "Keep a solid emergency fund",
                      "Rebalance regularly"
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-lg">Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Assuming unrealistic returns",
                    "Underestimating future expenses",
                    "Ignoring life changes like kids, relocation, or health needs"
                  ].map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Next Steps */}
          <section className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Run your numbers.",
                    "Create a plan based on reality, not vibes.",
                    "Adjust yearly.",
                    "Stay flexible as your life and goals evolve."
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-foreground font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default EarlyRetirementCalculator;
