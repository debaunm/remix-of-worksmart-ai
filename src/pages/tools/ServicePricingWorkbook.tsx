import { useState, useMemo } from "react";
import { ArrowLeft, DollarSign, Clock, Target, TrendingUp, FileText, Info, Plus, Trash2, Copy, Check, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// Types
interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const ServicePricingWorkbook = () => {
  // Cost Calculator State
  const [monthlyExpenses, setMonthlyExpenses] = useState<Expense[]>([
    { id: "1", name: "Software & Tools", amount: 200 },
    { id: "2", name: "Marketing", amount: 500 },
    { id: "3", name: "Professional Services", amount: 300 },
    { id: "4", name: "Insurance", amount: 150 },
    { id: "5", name: "Education", amount: 100 },
  ]);
  const [contractorCosts, setContractorCosts] = useState<Expense[]>([]);
  const [desiredSalary, setDesiredSalary] = useState("80000");
  const [taxRate, setTaxRate] = useState([30]);
  const [profitMargin, setProfitMargin] = useState([20]);

  // Hourly Rate Calculator State
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [billablePercent, setBillablePercent] = useState([60]);

  // Value-Based Pricing State
  const [clientRevenue, setClientRevenue] = useState("100000");
  const [clientSavings, setClientSavings] = useState("25000");
  const [lifetimeYears, setLifetimeYears] = useState("3");
  const [valueCapturePercent, setValueCapturePercent] = useState([15]);

  // Profit Calculator State
  const [projectPrice, setProjectPrice] = useState("5000");
  const [ownerHours, setOwnerHours] = useState("20");
  const [contractorHours, setContractorHours] = useState("10");
  const [contractorRate, setContractorRate] = useState("50");
  const [softwareCosts, setSoftwareCosts] = useState("100");
  const [otherCosts, setOtherCosts] = useState("0");
  const [projectsPerMonth, setProjectsPerMonth] = useState("2");

  // Quote Generator State
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [quoteDate, setQuoteDate] = useState(new Date().toISOString().split("T")[0]);
  const [validityDays, setValidityDays] = useState("30");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, rate: 0 },
  ]);
  const [discount, setDiscount] = useState("0");
  const [paymentTerms, setPaymentTerms] = useState("50-50");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [copied, setCopied] = useState(false);

  // Cost Calculator Calculations
  const totalMonthlyOverhead = useMemo(() => 
    monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0) + 
    contractorCosts.reduce((sum, exp) => sum + exp.amount, 0),
    [monthlyExpenses, contractorCosts]
  );
  
  const annualOverhead = totalMonthlyOverhead * 12;
  const annualSalary = parseFloat(desiredSalary) || 0;
  const taxSetAside = annualSalary * (taxRate[0] / 100);
  const profitTarget = annualSalary * (profitMargin[0] / 100);
  const totalAnnualRevenue = annualOverhead + annualSalary + taxSetAside + profitTarget;

  // Hourly Rate Calculations
  const totalWorkingHours = useMemo(() => {
    const weeks = parseFloat(weeksPerYear) || 0;
    const days = parseFloat(daysPerWeek) || 0;
    const hours = parseFloat(hoursPerDay) || 0;
    return weeks * days * hours;
  }, [weeksPerYear, daysPerWeek, hoursPerDay]);

  const billableHours = totalWorkingHours * (billablePercent[0] / 100);
  const minimumHourlyRate = billableHours > 0 ? (annualOverhead + annualSalary) / billableHours : 0;
  const targetHourlyRate = billableHours > 0 ? totalAnnualRevenue / billableHours : 0;

  // Value-Based Pricing Calculations
  const clientTotalValue = useMemo(() => {
    const revenue = parseFloat(clientRevenue) || 0;
    const savings = parseFloat(clientSavings) || 0;
    const years = parseFloat(lifetimeYears) || 1;
    return (revenue + savings) * years;
  }, [clientRevenue, clientSavings, lifetimeYears]);

  const valuedBasedPrice = clientTotalValue * (valueCapturePercent[0] / 100);

  // Profit Calculator Calculations
  const projectCosts = useMemo(() => {
    const ownerCost = (parseFloat(ownerHours) || 0) * targetHourlyRate;
    const contractorCost = (parseFloat(contractorHours) || 0) * (parseFloat(contractorRate) || 0);
    const software = parseFloat(softwareCosts) || 0;
    const other = parseFloat(otherCosts) || 0;
    return ownerCost + contractorCost + software + other;
  }, [ownerHours, contractorHours, contractorRate, softwareCosts, otherCosts, targetHourlyRate]);

  const projectRevenue = parseFloat(projectPrice) || 0;
  const grossProfit = projectRevenue - projectCosts;
  const grossMargin = projectRevenue > 0 ? (grossProfit / projectRevenue) * 100 : 0;
  const effectiveHourlyRate = (parseFloat(ownerHours) || 0) > 0 ? grossProfit / (parseFloat(ownerHours) || 1) : 0;
  const monthlyProjects = parseFloat(projectsPerMonth) || 0;
  const annualRevenue = projectRevenue * monthlyProjects * 12;
  const annualProfit = grossProfit * monthlyProjects * 12;

  // Quote Calculations
  const quoteSubtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const discountAmount = quoteSubtotal * (parseFloat(discount) / 100);
  const quoteTotal = quoteSubtotal - discountAmount;

  const paymentSchedule = useMemo(() => {
    switch (paymentTerms) {
      case "100-upfront": return [{ label: "Due on signing", amount: quoteTotal }];
      case "50-50": return [
        { label: "Due on signing (50%)", amount: quoteTotal * 0.5 },
        { label: "Due on completion (50%)", amount: quoteTotal * 0.5 },
      ];
      case "thirds": return [
        { label: "Due on signing (33%)", amount: quoteTotal / 3 },
        { label: "Due at midpoint (33%)", amount: quoteTotal / 3 },
        { label: "Due on completion (34%)", amount: quoteTotal / 3 },
      ];
      default: return [{ label: "Due on completion", amount: quoteTotal }];
    }
  }, [paymentTerms, quoteTotal]);

  // Helpers
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  const addExpense = (list: Expense[], setList: React.Dispatch<React.SetStateAction<Expense[]>>) => {
    setList([...list, { id: Date.now().toString(), name: "", amount: 0 }]);
  };

  const updateExpense = (list: Expense[], setList: React.Dispatch<React.SetStateAction<Expense[]>>, id: string, field: "name" | "amount", value: string | number) => {
    setList(list.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExpense = (list: Expense[], setList: React.Dispatch<React.SetStateAction<Expense[]>>, id: string) => {
    setList(list.filter(exp => exp.id !== id));
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now().toString(), description: "", quantity: 1, rate: 0 }]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const copyQuote = () => {
    const quoteText = `
QUOTE FOR: ${clientName}
PROJECT: ${projectName}
DATE: ${quoteDate}
VALID FOR: ${validityDays} days

SERVICES:
${lineItems.map(item => `- ${item.description}: ${item.quantity} x ${formatCurrency(item.rate)} = ${formatCurrency(item.quantity * item.rate)}`).join("\n")}

SUBTOTAL: ${formatCurrency(quoteSubtotal)}
${parseFloat(discount) > 0 ? `DISCOUNT (${discount}%): -${formatCurrency(discountAmount)}` : ""}
TOTAL: ${formatCurrency(quoteTotal)}

PAYMENT SCHEDULE:
${paymentSchedule.map(p => `- ${p.label}: ${formatCurrency(p.amount)}`).join("\n")}

${quoteNotes ? `NOTES:\n${quoteNotes}` : ""}
    `.trim();

    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    toast.success("Quote copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

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
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Service Pricing Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Service Pricing <span className="gradient-text">Workbook</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop guessing on pricing. Calculate your true costs, set profitable rates, and create professional quotes.
          </p>
        </motion.div>

        {/* Dashboard Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Minimum Hourly Rate</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(minimumHourlyRate)}</p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Target Hourly Rate</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(targetHourlyRate)}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Annual Revenue Goal</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalAnnualRevenue)}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Target Profit Margin</p>
              <p className="text-2xl font-bold text-foreground">{profitMargin[0]}%</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="costs" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="costs" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Costs</span>
              </TabsTrigger>
              <TabsTrigger value="hourly" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Hourly</span>
              </TabsTrigger>
              <TabsTrigger value="value" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Value</span>
              </TabsTrigger>
              <TabsTrigger value="profit" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Profit</span>
              </TabsTrigger>
              <TabsTrigger value="quote" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Quote</span>
              </TabsTrigger>
            </TabsList>

            {/* Cost Calculator Tab */}
            <TabsContent value="costs">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Business Expenses</CardTitle>
                    <CardDescription>Enter your recurring monthly costs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {monthlyExpenses.map((expense) => (
                      <div key={expense.id} className="flex gap-3">
                        <Input
                          placeholder="Expense name"
                          value={expense.name}
                          onChange={(e) => updateExpense(monthlyExpenses, setMonthlyExpenses, expense.id, "name", e.target.value)}
                          className="flex-1"
                        />
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            placeholder="0"
                            className="pl-7"
                            value={expense.amount || ""}
                            onChange={(e) => updateExpense(monthlyExpenses, setMonthlyExpenses, expense.id, "amount", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeExpense(monthlyExpenses, setMonthlyExpenses, expense.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addExpense(monthlyExpenses, setMonthlyExpenses)} className="w-full">
                      <Plus className="w-4 h-4 mr-2" /> Add Expense
                    </Button>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Contractor / Team Costs</h4>
                      {contractorCosts.map((expense) => (
                        <div key={expense.id} className="flex gap-3 mb-3">
                          <Input
                            placeholder="Contractor name"
                            value={expense.name}
                            onChange={(e) => updateExpense(contractorCosts, setContractorCosts, expense.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <div className="relative w-32">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              type="number"
                              placeholder="0"
                              className="pl-7"
                              value={expense.amount || ""}
                              onChange={(e) => updateExpense(contractorCosts, setContractorCosts, expense.id, "amount", parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeExpense(contractorCosts, setContractorCosts, expense.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => addExpense(contractorCosts, setContractorCosts)} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Contractor
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Income & Tax Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Desired Annual Salary</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            className="pl-7"
                            value={desiredSalary}
                            onChange={(e) => setDesiredSalary(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Tax Rate Estimate</Label>
                          <span className="text-sm text-muted-foreground">{taxRate[0]}%</span>
                        </div>
                        <Slider value={taxRate} onValueChange={setTaxRate} min={15} max={45} step={1} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Target Profit Margin</Label>
                          <span className="text-sm text-muted-foreground">{profitMargin[0]}%</span>
                        </div>
                        <Slider value={profitMargin} onValueChange={setProfitMargin} min={0} max={50} step={1} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Cost Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Overhead</span>
                        <span className="font-medium">{formatCurrency(totalMonthlyOverhead)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Overhead</span>
                        <span className="font-medium">{formatCurrency(annualOverhead)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax Set-Aside</span>
                        <span className="font-medium">{formatCurrency(taxSetAside)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Profit Target</span>
                        <span className="font-medium">{formatCurrency(profitTarget)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t text-lg">
                        <span className="font-semibold">Total Annual Revenue Need</span>
                        <span className="font-bold text-primary">{formatCurrency(totalAnnualRevenue)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Hourly Rate Calculator Tab */}
            <TabsContent value="hourly">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Working Time</CardTitle>
                    <CardDescription>Define your available working hours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Weeks/Year</Label>
                        <Input
                          type="number"
                          value={weeksPerYear}
                          onChange={(e) => setWeeksPerYear(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Days/Week</Label>
                        <Input
                          type="number"
                          value={daysPerWeek}
                          onChange={(e) => setDaysPerWeek(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Hours/Day</Label>
                        <Input
                          type="number"
                          value={hoursPerDay}
                          onChange={(e) => setHoursPerDay(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Billable Hours Percentage</Label>
                        <span className="text-sm text-muted-foreground">{billablePercent[0]}%</span>
                      </div>
                      <Slider value={billablePercent} onValueChange={setBillablePercent} min={30} max={90} step={5} />
                      <p className="text-xs text-muted-foreground">Most consultants bill 50-70% of their time</p>
                    </div>

                    <Card className="bg-secondary/30">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-3xl font-bold">{totalWorkingHours.toFixed(0)}</p>
                            <p className="text-sm text-muted-foreground">Total Hours/Year</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-primary">{billableHours.toFixed(0)}</p>
                            <p className="text-sm text-muted-foreground">Billable Hours</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-primary/5 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Your Hourly Rates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-background border">
                        <p className="text-sm text-muted-foreground">Minimum Hourly Rate (Break-even)</p>
                        <p className="text-3xl font-bold">{formatCurrency(minimumHourlyRate)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <p className="text-sm text-muted-foreground">Target Hourly Rate (With Profit)</p>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(targetHourlyRate)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Rate Conversion Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>Hourly</span>
                          <span className="font-medium">{formatCurrency(targetHourlyRate)}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>Daily (8 hrs)</span>
                          <span className="font-medium">{formatCurrency(targetHourlyRate * 8)}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>Weekly (40 hrs)</span>
                          <span className="font-medium">{formatCurrency(targetHourlyRate * 40)}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>Monthly</span>
                          <span className="font-medium">{formatCurrency(totalAnnualRevenue / 12)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Projects Needed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>At $5,000/project</span>
                          <span className="font-medium">{Math.ceil(totalAnnualRevenue / 5000)} projects/year</span>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>At $10,000/project</span>
                          <span className="font-medium">{Math.ceil(totalAnnualRevenue / 10000)} projects/year</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Value-Based Pricing Tab */}
            <TabsContent value="value">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Value Analysis</CardTitle>
                    <CardDescription>Calculate pricing based on the value you deliver</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-secondary/30 border flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Value-based pricing ties your fee to outcomes, not hours. Price based on what your work is worth to the client.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Client's Potential Revenue from Project</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          className="pl-7"
                          value={clientRevenue}
                          onChange={(e) => setClientRevenue(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">How much new revenue will your work generate?</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Annual Cost Savings for Client</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          className="pl-7"
                          value={clientSavings}
                          onChange={(e) => setClientSavings(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Lifetime Value Period (Years)</Label>
                      <Input
                        type="number"
                        value={lifetimeYears}
                        onChange={(e) => setLifetimeYears(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Value Capture Percentage</Label>
                        <span className="text-sm text-muted-foreground">{valueCapturePercent[0]}%</span>
                      </div>
                      <Slider value={valueCapturePercent} onValueChange={setValueCapturePercent} min={5} max={40} step={1} />
                      <p className="text-xs text-muted-foreground">Typical range: 10-25% of value delivered</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-primary/5 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Value-Based Price</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-background border">
                        <p className="text-sm text-muted-foreground">Total Client Value Created</p>
                        <p className="text-3xl font-bold">{formatCurrency(clientTotalValue)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <p className="text-sm text-muted-foreground">Your Value-Based Price</p>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(valuedBasedPrice)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background border">
                        <p className="text-sm text-muted-foreground">Effective Hourly Rate (at {ownerHours}hrs)</p>
                        <p className="text-2xl font-bold">{formatCurrency(valuedBasedPrice / (parseFloat(ownerHours) || 1))}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Compare Pricing Models</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>Time-Based ({ownerHours}hrs @ target rate)</span>
                          <span className="font-medium">{formatCurrency(targetHourlyRate * (parseFloat(ownerHours) || 0))}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-primary/10 border border-primary/30">
                          <span>Value-Based Price</span>
                          <span className="font-bold text-primary">{formatCurrency(valuedBasedPrice)}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded bg-secondary/30">
                          <span>Difference</span>
                          <span className="font-medium text-green-600">
                            +{formatCurrency(valuedBasedPrice - (targetHourlyRate * (parseFloat(ownerHours) || 0)))}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Profit Calculator Tab */}
            <TabsContent value="profit">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>Model your project profitability</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Project Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          className="pl-7"
                          value={projectPrice}
                          onChange={(e) => setProjectPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Your Hours on Project</Label>
                        <Input
                          type="number"
                          value={ownerHours}
                          onChange={(e) => setOwnerHours(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Contractor Hours</Label>
                        <Input
                          type="number"
                          value={contractorHours}
                          onChange={(e) => setContractorHours(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Contractor Hourly Rate</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          className="pl-7"
                          value={contractorRate}
                          onChange={(e) => setContractorRate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Software/Tools Cost</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            className="pl-7"
                            value={softwareCosts}
                            onChange={(e) => setSoftwareCosts(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Other Direct Costs</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            className="pl-7"
                            value={otherCosts}
                            onChange={(e) => setOtherCosts(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Projects Per Month</Label>
                      <Input
                        type="number"
                        value={projectsPerMonth}
                        onChange={(e) => setProjectsPerMonth(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className={grossMargin >= 30 ? "bg-green-500/5 border-green-500/30" : grossMargin >= 15 ? "bg-yellow-500/5 border-yellow-500/30" : "bg-red-500/5 border-red-500/30"}>
                    <CardHeader>
                      <CardTitle>Profitability Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-background border">
                          <p className="text-sm text-muted-foreground">Gross Profit</p>
                          <p className="text-2xl font-bold">{formatCurrency(grossProfit)}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background border">
                          <p className="text-sm text-muted-foreground">Gross Margin</p>
                          <p className={`text-2xl font-bold ${grossMargin >= 30 ? "text-green-600" : grossMargin >= 15 ? "text-yellow-600" : "text-red-600"}`}>
                            {grossMargin.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <p className="text-sm text-muted-foreground">Effective Hourly Rate</p>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(effectiveHourlyRate)}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {effectiveHourlyRate >= targetHourlyRate ? "✓ Above target rate" : "⚠ Below target rate"}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-secondary/30 border text-sm">
                        {grossMargin >= 40 ? (
                          <p className="text-green-600 font-medium">🎯 Excellent margin! This project is highly profitable.</p>
                        ) : grossMargin >= 25 ? (
                          <p className="text-green-600">✓ Good margin. You're pricing well for this work.</p>
                        ) : grossMargin >= 15 ? (
                          <p className="text-yellow-600">⚠ Acceptable margin, but consider raising your price.</p>
                        ) : (
                          <p className="text-red-600">⚠ Low margin. Consider raising price or reducing costs.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Annual Projections</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between p-3 rounded bg-secondary/30">
                        <span>Projects Per Year</span>
                        <span className="font-medium">{monthlyProjects * 12}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-secondary/30">
                        <span>Annual Revenue</span>
                        <span className="font-medium">{formatCurrency(annualRevenue)}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-primary/10 border border-primary/30">
                        <span>Annual Profit</span>
                        <span className="font-bold text-primary">{formatCurrency(annualProfit)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Quote Generator Tab */}
            <TabsContent value="quote">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Quote Details</CardTitle>
                    <CardDescription>Create a professional client quote</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Client Name/Company</Label>
                        <Input
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Acme Corp"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="Website Redesign"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Quote Date</Label>
                        <Input
                          type="date"
                          value={quoteDate}
                          onChange={(e) => setQuoteDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Valid For (Days)</Label>
                        <Input
                          type="number"
                          value={validityDays}
                          onChange={(e) => setValidityDays(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Line Items</Label>
                      {lineItems.map((item, index) => (
                        <div key={item.id} className="flex gap-2">
                          <Input
                            placeholder="Service description"
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity || ""}
                            onChange={(e) => updateLineItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                          <div className="relative w-28">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                            <Input
                              type="number"
                              placeholder="Rate"
                              value={item.rate || ""}
                              onChange={(e) => updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                              className="pl-6"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLineItem(item.id)}
                            disabled={lineItems.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={addLineItem} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Line Item
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Discount (%)</Label>
                        <Input
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Terms</Label>
                        <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100-upfront">100% Upfront</SelectItem>
                            <SelectItem value="50-50">50/50 Split</SelectItem>
                            <SelectItem value="thirds">Thirds</SelectItem>
                            <SelectItem value="completion">On Completion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notes/Terms</Label>
                      <Textarea
                        value={quoteNotes}
                        onChange={(e) => setQuoteNotes(e.target.value)}
                        placeholder="Additional terms, scope clarifications, etc."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Quote Preview</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={copyQuote}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-6 rounded-lg bg-background border">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start border-b pb-4">
                            <div>
                              <p className="font-bold text-lg">QUOTE</p>
                              <p className="text-sm text-muted-foreground">For: {clientName || "[Client Name]"}</p>
                              <p className="text-sm text-muted-foreground">Project: {projectName || "[Project Name]"}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">Date: {quoteDate}</p>
                              <p className="text-sm text-muted-foreground">Valid for {validityDays} days</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {lineItems.map((item) => (
                              <div key={item.id} className="flex justify-between py-2 border-b">
                                <div>
                                  <p className="font-medium">{item.description || "[Service]"}</p>
                                  <p className="text-sm text-muted-foreground">{item.quantity} x {formatCurrency(item.rate)}</p>
                                </div>
                                <p className="font-medium">{formatCurrency(item.quantity * item.rate)}</p>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2 pt-4">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>{formatCurrency(quoteSubtotal)}</span>
                            </div>
                            {parseFloat(discount) > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Discount ({discount}%)</span>
                                <span>-{formatCurrency(discountAmount)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                              <span>Total</span>
                              <span className="text-primary">{formatCurrency(quoteTotal)}</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <p className="font-medium mb-2">Payment Schedule</p>
                            {paymentSchedule.map((payment, i) => (
                              <div key={i} className="flex justify-between text-sm py-1">
                                <span className="text-muted-foreground">{payment.label}</span>
                                <span>{formatCurrency(payment.amount)}</span>
                              </div>
                            ))}
                          </div>

                          {quoteNotes && (
                            <div className="pt-4 border-t">
                              <p className="font-medium mb-2">Notes</p>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quoteNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Golden Rules Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Golden Rules of Service Pricing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Know Your Numbers", desc: "Track every expense. Your true cost is higher than you think." },
              { title: "Price for Profit", desc: "Revenue minus costs equals profit. Always build in a margin." },
              { title: "Value Over Time", desc: "Clients pay for outcomes, not hours. Price based on results." },
              { title: "Raise Strategically", desc: "Increase rates with each new client. Grandfather existing ones." },
            ].map((rule, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <p className="text-xs text-muted-foreground text-center mt-12">
          This tool is for educational purposes. Consult a financial advisor for professional pricing guidance.
        </p>
      </main>
    </div>
  );
};

export default ServicePricingWorkbook;
