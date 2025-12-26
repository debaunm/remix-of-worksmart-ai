import { useState } from "react";
import { ArrowLeft, Presentation, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import BuyToolButton from "@/components/BuyToolButton";

const PitchDeckReviewer = () => {
  const [deckContent, setDeckContent] = useState("");
  const [stage, setStage] = useState("");
  const [industry, setIndustry] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("pitch_deck_reviewer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckContent.trim()) {
      toast.error("Please provide your pitch deck content");
      return;
    }

    await execute({
      deck_content: deckContent,
      stage,
      industry,
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
              <Presentation className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pitch Deck Reviewer</h1>
              <p className="text-muted-foreground">Get YC & 500 Startups-style feedback on your startup pitch</p>
            </div>
          </div>
          <BuyToolButton toolName="Pitch Deck Reviewer" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="deckContent">Pitch Deck Content *</Label>
            <Textarea
              id="deckContent"
              placeholder="Paste your pitch deck text, slide content, or outline here..."
              value={deckContent}
              onChange={(e) => setDeckContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">Funding Stage</Label>
              <Input
                id="stage"
                placeholder="Pre-seed, Seed, Series A, etc."
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Fintech, SaaS, Healthcare, etc."
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Reviewing your deck...
              </>
            ) : (
              "Review My Pitch Deck"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Pitch Deck Review</h2>

            {data.overall_score !== undefined && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-primary">{data.overall_score as number}</div>
                    <div className="text-muted-foreground">/100</div>
                  </div>
                  {data.investor_style_summary && (
                    <p className="mt-4 text-foreground">{data.investor_style_summary as string}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {data.strengths && (data.strengths as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.strengths as string[]).map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.weaknesses && (data.weaknesses as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Weaknesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.weaknesses as string[]).map((weakness, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span className="text-foreground">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.yc_scorecard && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">YC Scorecard</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.yc_scorecard), "yc")}>
                    {copiedField === "yc" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(data.yc_scorecard as Record<string, unknown>).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</div>
                        <div className="text-lg font-semibold text-foreground">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {data.five_hundred_scorecard && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">500 Startups Scorecard</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.five_hundred_scorecard), "500")}>
                    {copiedField === "500" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(data.five_hundred_scorecard as Record<string, unknown>).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</div>
                        <div className="text-lg font-semibold text-foreground">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {data.missing_elements && (data.missing_elements as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Missing Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.missing_elements as string[]).map((element, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">!</span>
                        <span className="text-foreground">{element}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.recommended_improvements && (data.recommended_improvements as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.recommended_improvements as string[]).map((improvement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{improvement}</span>
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

export default PitchDeckReviewer;
