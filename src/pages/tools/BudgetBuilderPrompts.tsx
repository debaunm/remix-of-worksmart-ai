import { useState } from "react";
import { ArrowLeft, Calculator, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

const BudgetBuilderPrompts = () => {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [goals, setGoals] = useState("");
  const [constraints, setConstraints] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("budget_builder_prompts");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revenue.trim() || !expenses.trim()) {
      toast.error("Please provide revenue and expenses information");
      return;
    }

    await execute({
      revenue,
      expenses,
      headcount,
      goals,
      constraints,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const data = result as Record<string, unknown> | null;
  const scenarios = data?.scenarios as Record<string, Record<string, unknown>> | undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Budget Builder Prompts</h1>
            <p className="text-muted-foreground">Create budgets with low, medium, and high scenarios</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="revenue">Revenue *</Label>
            <Input
              id="revenue"
              placeholder="e.g., $500,000 annual or $40,000/month"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expenses">Major Expenses *</Label>
            <Textarea
              id="expenses"
              placeholder="List recurring expenses: rent, payroll, software, marketing, etc."
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headcount">Headcount & Payroll</Label>
            <Input
              id="headcount"
              placeholder="e.g., 8 people, ~$35,000/month total payroll"
              value={headcount}
              onChange={(e) => setHeadcount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Financial Goals</Label>
            <Textarea
              id="goals"
              placeholder="e.g., maximize runway, hit 20% margin, support growth..."
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="constraints">Constraints</Label>
            <Input
              id="constraints"
              placeholder="e.g., minimum headcount of 5, can't cut marketing below $5k"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building budget scenarios...
              </>
            ) : (
              "Build Budget"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Budget Analysis</h2>

            {data.baseline_budget && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Baseline Budget</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.baseline_budget), "baseline")}>
                    {copiedField === "baseline" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(data.baseline_budget as Record<string, unknown>).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border pb-2">
                        <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="text-foreground font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {scenarios && (
              <div className="grid gap-4 md:grid-cols-3">
                {["low", "medium", "high"].map((tier) => {
                  const scenario = scenarios[tier];
                  if (!scenario) return null;
                  return (
                    <Card key={tier}>
                      <CardHeader>
                        <CardTitle className="text-lg capitalize">{tier} Scenario</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{scenario.description as string}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Expenses</span>
                            <span className="font-medium">{String(scenario.total_expenses)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Net Result</span>
                            <span className="font-medium">{String(scenario.net_result)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Margin</span>
                            <span className="font-medium">{String(scenario.margin_percentage)}</span>
                          </div>
                        </div>
                        {scenario.notes && (
                          <p className="text-xs text-muted-foreground border-t border-border pt-2">{scenario.notes as string}</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {data.summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{data.summary as string}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetBuilderPrompts;
