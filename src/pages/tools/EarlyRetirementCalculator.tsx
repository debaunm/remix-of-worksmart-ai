import { useState } from "react";
import { ArrowLeft, PiggyBank, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

const EarlyRetirementCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savingsRate, setSavingsRate] = useState("");
  const [currentInvestments, setCurrentInvestments] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [targetRetirementAge, setTargetRetirementAge] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("early_retirement_calculator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!income.trim() || !expenses.trim()) {
      toast.error("Please provide income and expenses");
      return;
    }

    await execute({
      income,
      expenses,
      savings_rate: savingsRate,
      current_investments: currentInvestments,
      current_age: currentAge,
      target_retirement_age: targetRetirementAge,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const data = result as Record<string, unknown> | null;
  const paths = data?.paths as Record<string, string[]> | undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <PiggyBank className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Early Retirement Calculator</h1>
            <p className="text-muted-foreground">Plan your path to financial independence</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income (before tax) *</Label>
              <Input
                id="income"
                placeholder="e.g., $150,000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expenses">Monthly Expenses *</Label>
              <Input
                id="expenses"
                placeholder="e.g., $6,000/month"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="savingsRate">Savings Rate (%)</Label>
              <Input
                id="savingsRate"
                placeholder="e.g., 30%"
                value={savingsRate}
                onChange={(e) => setSavingsRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentInvestments">Current Investments</Label>
              <Input
                id="currentInvestments"
                placeholder="e.g., $250,000"
                value={currentInvestments}
                onChange={(e) => setCurrentInvestments(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                placeholder="e.g., 35"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetRetirementAge">Target Retirement Age</Label>
              <Input
                id="targetRetirementAge"
                placeholder="e.g., 50"
                value={targetRetirementAge}
                onChange={(e) => setTargetRetirementAge(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Calculating your FIRE path...
              </>
            ) : (
              "Calculate Retirement Plan"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your FIRE Analysis</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">FIRE Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{String(data.fire_number)}</p>
                  <p className="text-sm text-muted-foreground mt-1">Target invested assets needed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{data.timeline as string}</p>
                  <p className="text-sm text-muted-foreground mt-1">Years to reach FIRE</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gap to Close</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{String(data.gap)}</p>
                  <p className="text-sm text-muted-foreground mt-1">Remaining to invest</p>
                </CardContent>
              </Card>
            </div>

            {paths && (
              <div className="grid gap-4 md:grid-cols-3">
                {(["aggressive", "moderate", "conservative"] as const).map((tier) => {
                  const pathItems = paths[tier];
                  if (!pathItems) return null;
                  return (
                    <Card key={tier}>
                      <CardHeader>
                        <CardTitle className="text-lg capitalize">{tier} Path</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pathItems.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="text-primary font-bold">•</span>
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {data.monthly_habits && (data.monthly_habits as string[]).length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Monthly Habits to Build</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.monthly_habits), "habits")}>
                    {copiedField === "habits" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.monthly_habits as string[]).map((habit: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{habit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Disclaimer: This is for educational purposes only and not financial advice. Consult a financial advisor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarlyRetirementCalculator;
