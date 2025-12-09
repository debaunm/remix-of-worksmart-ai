import { useState } from "react";
import { ArrowLeft, Lightbulb, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

const IdeaToRevenue = () => {
  const [ideaText, setIdeaText] = useState("");
  const [skillset, setSkillset] = useState("");
  const [constraints, setConstraints] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("idea_to_revenue");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) {
      toast.error("Please describe your idea");
      return;
    }

    await execute({
      idea_text: ideaText,
      skillset,
      constraints,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
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

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Idea-to-Revenue Converter</h1>
            <p className="text-muted-foreground">Turn your idea into a structured product with pricing and launch plan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="ideaText">Your Idea *</Label>
            <Textarea
              id="ideaText"
              placeholder="Describe your idea in one or two sentences..."
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillset">Your Skills & Experience</Label>
            <Textarea
              id="skillset"
              placeholder="What skills, experience, or assets do you bring to this idea?"
              value={skillset}
              onChange={(e) => setSkillset(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="constraints">Constraints</Label>
            <Textarea
              id="constraints"
              placeholder="Any constraints? (time, money, tech, market limitations)"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building your product concept...
              </>
            ) : (
              "Convert Idea to Revenue"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Product Concept</h2>

            {data.offer_name && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{data.offer_name as string}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.JTBD && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Job to Be Done</h4>
                      <p className="text-muted-foreground">{data.JTBD as string}</p>
                    </div>
                  )}
                  {data.problem && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Problem</h4>
                      <p className="text-muted-foreground">{data.problem as string}</p>
                    </div>
                  )}
                  {data.promise && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Promise</h4>
                      <p className="text-muted-foreground">{data.promise as string}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {data.features && (data.features as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.features as string[]).map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.pricing && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Recommended Pricing</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.pricing as string, "pricing")}>
                    {copiedField === "pricing" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold text-primary">{data.pricing as string}</p>
                </CardContent>
              </Card>
            )}

            {data.launch_plan_3_days && (data.launch_plan_3_days as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">3-Day Micro-Launch Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(data.launch_plan_3_days as string[]).map((step: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold text-sm">
                          {i + 1}
                        </span>
                        <p className="text-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaToRevenue;
