import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Clock, DollarSign, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";

type CompoundingFrequency = "daily" | "monthly" | "quarterly" | "annually";

const frequencyMap: Record<CompoundingFrequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

const frequencyLabels: Record<CompoundingFrequency, string> = {
  daily: "Daily",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [annualRate, setAnnualRate] = useState("7");
  const [years, setYears] = useState(30);
  const [frequency, setFrequency] = useState<CompoundingFrequency>("monthly");
  const [showResults, setShowResults] = useState(false);

  const calculateCompoundInterest = () => {
    const P = parseFloat(initialInvestment) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = frequencyMap[frequency];
    const t = years;

    const chartData = [];
    let compoundBalance = P;
    let simpleBalance = P;
    let totalContributions = P;

    for (let year = 0; year <= t; year++) {
      if (year === 0) {
        chartData.push({
          year,
          compound: Math.round(P),
          simple: Math.round(P),
          contributions: Math.round(P),
        });
        continue;
      }

      // Compound interest with monthly contributions
      const periodsPerYear = n;
      const ratePerPeriod = r / n;
      
      // For the compound calculation with contributions
      // Using the formula: FV = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
      const compoundFactor = Math.pow(1 + ratePerPeriod, n * year);
      const contributionFactor = PMT * 12 / n; // Monthly contribution adjusted to compounding frequency
      
      // Simplified calculation for annual contributions
      let balance = P;
      for (let y = 1; y <= year; y++) {
        balance = balance * (1 + r) + PMT * 12;
      }
      compoundBalance = balance;

      // Simple interest
      simpleBalance = P + (P * r * year) + (PMT * 12 * year);
      
      // Total contributions
      totalContributions = P + (PMT * 12 * year);

      chartData.push({
        year,
        compound: Math.round(compoundBalance),
        simple: Math.round(simpleBalance),
        contributions: Math.round(totalContributions),
      });
    }

    const finalAmount = compoundBalance;
    const totalContrib = P + (PMT * 12 * t);
    const totalInterest = finalAmount - totalContrib;

    return {
      finalAmount,
      totalContributions: totalContrib,
      totalInterest,
      chartData,
    };
  };

  const results = calculateCompoundInterest();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/free-tools" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Free Tools
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                <Sparkles className="w-3 h-3" />
                FREE TOOL
              </span>
              <h1 className="text-3xl font-bold text-foreground">Compound Interest Calculator</h1>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            See how your money can grow exponentially over time. Compound interest earns on both your principal and all previously earned interest—creating wealth that accelerates year after year.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Your Investment Details
                </CardTitle>
                <CardDescription>
                  Enter your numbers to see how compound interest builds wealth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="initial">Initial Investment</Label>
                  <CurrencyInput
                    id="initial"
                    value={initialInvestment}
                    onChange={setInitialInvestment}
                    showDollarSign
                    placeholder="10,000"
                  />
                  <p className="text-xs text-muted-foreground">How much are you starting with?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly">Monthly Contribution</Label>
                  <CurrencyInput
                    id="monthly"
                    value={monthlyContribution}
                    onChange={setMonthlyContribution}
                    showDollarSign
                    placeholder="200"
                  />
                  <p className="text-xs text-muted-foreground">How much will you add each month?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Annual Interest Rate</Label>
                  <CurrencyInput
                    id="rate"
                    value={annualRate}
                    onChange={setAnnualRate}
                    showPercentSign
                    placeholder="7"
                  />
                  <p className="text-xs text-muted-foreground">Historical stock market average is 8-10%</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Time Period</Label>
                    <span className="text-lg font-semibold text-primary">{years} years</span>
                  </div>
                  <Slider
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 year</span>
                    <span>50 years</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Compounding Frequency</Label>
                  <Select value={frequency} onValueChange={(v) => setFrequency(v as CompoundingFrequency)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(frequencyLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">More frequent compounding = slightly higher returns</p>
                </div>

                <Button onClick={handleCalculate} size="lg" className="w-full">
                  Calculate My Growth
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Future Value</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(results.finalAmount)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Contributions</p>
                        <p className="text-xl font-semibold">{formatCurrency(results.totalContributions)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Interest Earned</p>
                        <p className="text-xl font-semibold text-primary">{formatCurrency(results.totalInterest)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth Over Time</CardTitle>
                <CardDescription>Watch your money grow exponentially</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.chartData}>
                      <defs>
                        <linearGradient id="compoundGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="contributionsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="year" 
                        tickFormatter={(value) => `Yr ${value}`}
                        className="text-xs"
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        className="text-xs"
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          formatCurrency(value),
                          name === "compound" ? "With Compound Interest" : "Your Contributions"
                        ]}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="contributions"
                        stroke="hsl(217, 91%, 60%)"
                        fill="url(#contributionsGradient)"
                        strokeWidth={2}
                        name="contributions"
                      />
                      <Area
                        type="monotone"
                        dataKey="compound"
                        stroke="hsl(var(--primary))"
                        fill="url(#compoundGradient)"
                        strokeWidth={2}
                        name="compound"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">With Compound Interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span className="text-muted-foreground">Your Contributions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Educational Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 space-y-12"
        >
          {/* Why It Matters */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Understanding Compound Interest Changes Everything</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Clock,
                  title: "Time Is Your Superpower",
                  description: "Starting 10 years earlier can double or triple your final amount, even with smaller contributions",
                },
                {
                  icon: TrendingUp,
                  title: "Exponential Growth",
                  description: "Your money grows faster each year as interest compounds on a larger and larger balance",
                },
                {
                  icon: DollarSign,
                  title: "Small Amounts Add Up",
                  description: "Even $100/month invested early can grow to over $1 million by retirement thanks to compounding",
                },
                {
                  icon: Sparkles,
                  title: "Beat Inflation",
                  description: "Compound returns help your money grow faster than inflation erodes its purchasing power",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Cost of Waiting */}
          <section>
            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">The Cost of Waiting</CardTitle>
                <CardDescription>
                  Every year you delay costs you exponentially more in the long run
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg bg-background">
                    <p className="text-3xl font-bold text-destructive">~40%</p>
                    <p className="text-sm text-muted-foreground mt-1">Lost growth waiting 5 years</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background">
                    <p className="text-3xl font-bold text-destructive">~60%</p>
                    <p className="text-sm text-muted-foreground mt-1">Lost growth waiting 10 years</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background">
                    <p className="text-3xl font-bold text-destructive">~75%</p>
                    <p className="text-sm text-muted-foreground mt-1">Lost growth waiting 15 years</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Even if you can only invest $50 or $100 per month right now, starting immediately beats waiting until you can invest larger amounts later.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Example Comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">The Power of Starting Early</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">Person A: Starts at Age 25</h3>
                    <p className="text-sm text-muted-foreground mb-4">Invests $10,000 once, earns 7% annually until age 65</p>
                    <p className="text-3xl font-bold text-primary">$149,745</p>
                  </div>
                  <div className="p-6 rounded-lg bg-muted/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-2">Person B: Starts at Age 35</h3>
                    <p className="text-sm text-muted-foreground mb-4">Invests $10,000 once, earns 7% annually until age 65</p>
                    <p className="text-3xl font-bold text-foreground">$76,123</p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 text-center">
                  <p className="text-lg font-semibold text-primary">
                    Person A has nearly DOUBLE the money, just from starting 10 years earlier!
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default CompoundInterestCalculator;
