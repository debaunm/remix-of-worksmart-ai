import { useState } from "react";
import { ArrowLeft, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import BuyToolButton from "@/components/BuyToolButton";

interface MicroAutomation {
  name: string;
  description: string;
  impact_level?: string;
  effort_level?: string;
  steps?: string[];
}

const LifeSimplifier = () => {
  const [situation, setSituation] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("life_simplifier");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) {
      toast.error("Please describe what's causing friction in your life");
      return;
    }

    await execute({
      situation,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const data = result as Record<string, unknown> | null;

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
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Life Simplifier</h1>
              <p className="text-muted-foreground">Get 3-5 high-leverage micro-automations to reduce daily friction</p>
            </div>
          </div>
          <BuyToolButton toolName="Life Simplifier" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="situation">What's causing friction in your life? *</Label>
            <Textarea
              id="situation"
              placeholder="Describe the area where you feel overwhelmed or stuck (work, home, kids, money, logistics)..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Finding simplifications...
              </>
            ) : (
              "Simplify My Life"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Life Simplification Plan</h2>

            {data.category && (
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                Category: {data.category as string}
              </div>
            )}

            {data.top_friction_points && (data.top_friction_points as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Friction Points Identified</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.top_friction_points as string[]).map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.recommended_micro_automations && (data.recommended_micro_automations as MicroAutomation[]).length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Recommended Micro-Automations</h3>
                {(data.recommended_micro_automations as MicroAutomation[]).map((automation, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{automation.name}</CardTitle>
                        {(automation.impact_level || automation.effort_level) && (
                          <div className="flex gap-2 mt-2">
                            {automation.impact_level && (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                                Impact: {automation.impact_level}
                              </span>
                            )}
                            {automation.effort_level && (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                Effort: {automation.effort_level}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(automation), `auto-${i}`)}>
                        {copiedField === `auto-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-foreground">{automation.description}</p>
                      {automation.steps && automation.steps.length > 0 && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Steps:</h4>
                          <ol className="space-y-1 list-decimal list-inside">
                            {automation.steps.map((step, j) => (
                              <li key={j} className="text-muted-foreground">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {data.one_click_actions && (data.one_click_actions as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">One-Click Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.one_click_actions as string[]).map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span className="text-foreground">{typeof action === "object" ? JSON.stringify(action) : action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeSimplifier;
