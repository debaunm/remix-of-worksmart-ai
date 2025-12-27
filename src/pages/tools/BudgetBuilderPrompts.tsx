import { useState } from "react";
import { ArrowLeft, Calculator, Loader2, Copy, Check, HelpCircle } from "lucide-react";
import BuyToolButton from "@/components/BuyToolButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-3 rounded-xl bg-primary/10">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Budget Builder Prompts</h1>
              <p className="text-muted-foreground">Create budgets with low, medium, and high scenarios</p>
            </div>
          </div>
          <BuyToolButton toolName="Budget Builder Prompts" />
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

        {/* Instructional Content */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              How to Use This Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This tool creates professional budget scenarios with low, medium, and high projections. Whether you're planning for a board meeting, investor pitch, or internal strategy session, here's how to get the most useful output.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="revenue">
                <AccordionTrigger className="text-foreground font-medium">1. Revenue</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Enter your current or projected revenue. Be specific about the time period.</p>
                  <p className="font-medium text-foreground">Good examples:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>$500,000 annual revenue</li>
                    <li>$42,000/month recurring</li>
                    <li>$1.2M ARR with 15% YoY growth</li>
                    <li>Projected $800K next fiscal year</li>
                  </ul>
                  <p className="italic">Tip: Include growth trends if relevant (e.g., "growing 8% month-over-month").</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="expenses">
                <AccordionTrigger className="text-foreground font-medium">2. Major Expenses</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>List your significant recurring costs. The more detail, the better the scenario modeling.</p>
                  <p className="font-medium text-foreground">Categories to consider:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Payroll:</strong> Salaries, benefits, contractors</li>
                    <li><strong>Operations:</strong> Rent, utilities, insurance</li>
                    <li><strong>Software:</strong> SaaS subscriptions, tools, infrastructure</li>
                    <li><strong>Marketing:</strong> Ads, content, events</li>
                    <li><strong>Professional Services:</strong> Legal, accounting, consulting</li>
                    <li><strong>Equipment:</strong> Hardware, supplies</li>
                  </ul>
                  <p className="italic">Format tip: "Payroll: $28K/mo, Rent: $5K/mo, Marketing: $8K/mo, Software: $3K/mo"</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="headcount">
                <AccordionTrigger className="text-foreground font-medium">3. Headcount & Payroll</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Describe your team size and compensation structure. This helps model hiring scenarios.</p>
                  <p className="font-medium text-foreground">Include:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Current headcount (FTEs and contractors)</li>
                    <li>Total monthly payroll cost</li>
                    <li>Planned hires or reductions</li>
                    <li>Average salary ranges if relevant</li>
                  </ul>
                  <p className="font-medium text-foreground">Example:</p>
                  <p>"12 FTEs + 3 contractors, $85K/month total payroll. Planning to hire 2 engineers in Q2."</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="goals">
                <AccordionTrigger className="text-foreground font-medium">4. Financial Goals</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>What are you optimizing for? Different goals lead to different budget recommendations.</p>
                  <p className="font-medium text-foreground">Common goals:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Maximize runway:</strong> Extend cash to survive longer</li>
                    <li><strong>Hit profitability:</strong> Break even or achieve positive margins</li>
                    <li><strong>Support growth:</strong> Invest in scaling revenue</li>
                    <li><strong>Prepare for fundraise:</strong> Optimize metrics for investors</li>
                    <li><strong>Reduce burn:</strong> Cut expenses strategically</li>
                  </ul>
                  <p className="font-medium text-foreground">Example:</p>
                  <p>"Hit 20% net margin while maintaining 10% monthly growth"</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="constraints">
                <AccordionTrigger className="text-foreground font-medium">5. Constraints</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>What limitations must the budget respect? These are the non-negotiables.</p>
                  <p className="font-medium text-foreground">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Minimum headcount requirements</li>
                    <li>Contractual obligations (e.g., 12-month lease)</li>
                    <li>Marketing minimums for growth targets</li>
                    <li>Compliance or regulatory costs</li>
                    <li>Board-mandated spending limits</li>
                  </ul>
                  <p className="italic">Example: "Can't reduce engineering below 5 people. Marketing must stay above $5K for lead gen."</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="output">
                <AccordionTrigger className="text-foreground font-medium">6. What You'll Get</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>When you press Generate, you'll receive:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Baseline Budget:</strong> Your current state organized clearly</li>
                    <li><strong>Low Scenario:</strong> Conservative/cost-cutting version</li>
                    <li><strong>Medium Scenario:</strong> Balanced approach</li>
                    <li><strong>High Scenario:</strong> Growth-focused/investment version</li>
                    <li><strong>Executive Summary:</strong> Key insights and recommendations</li>
                  </ul>
                  <p>Each scenario includes expense totals, net results, margins, and strategic notes.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="prompts">
                <AccordionTrigger className="text-foreground font-medium">Pro Tips for Better Output</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Ask yourself these questions while filling out the form:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>What's my current monthly burn rate?</li>
                    <li>How many months of runway do I have?</li>
                    <li>Which expenses are fixed vs. variable?</li>
                    <li>What would I cut first in a downturn?</li>
                    <li>What investment would have the highest ROI?</li>
                    <li>What does my board or investors expect to see?</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

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
