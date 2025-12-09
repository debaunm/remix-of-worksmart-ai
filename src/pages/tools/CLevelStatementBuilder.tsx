import { useState } from "react";
import { ArrowLeft, FileText, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

const CLevelStatementBuilder = () => {
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [keyFacts, setKeyFacts] = useState("");
  const [risks, setRisks] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("c_level_statement_builder");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim() || !keyFacts.trim()) {
      toast.error("Please provide the statement purpose and key facts");
      return;
    }

    await execute({
      purpose,
      audience,
      key_facts: keyFacts,
      risks,
      desired_outcome: desiredOutcome,
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

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">C-Level Statement Builder</h1>
            <p className="text-muted-foreground">Create polished board-ready executive statements</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="purpose">Statement Purpose *</Label>
            <Input
              id="purpose"
              placeholder="e.g., performance update, change announcement, strategy shift, crisis communication"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Audience</Label>
            <Input
              id="audience"
              placeholder="e.g., full company, leadership team, board, investors, customers"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyFacts">Key Facts *</Label>
            <Textarea
              id="keyFacts"
              placeholder="List the non-negotiable facts, metrics, or events that must be included..."
              value={keyFacts}
              onChange={(e) => setKeyFacts(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="risks">Risks & Sensitivities</Label>
            <Textarea
              id="risks"
              placeholder="Any risks, concerns, or sensitive topics to handle carefully..."
              value={risks}
              onChange={(e) => setRisks(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desiredOutcome">Desired Outcome</Label>
            <Input
              id="desiredOutcome"
              placeholder="What should people think, feel, or do after reading this?"
              value={desiredOutcome}
              onChange={(e) => setDesiredOutcome(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Crafting your statement...
              </>
            ) : (
              "Build Statement"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Executive Statement</h2>

            {data.statement && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Full Statement</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.statement as string, "statement")}>
                    {copiedField === "statement" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">{data.statement as string}</p>
                </CardContent>
              </Card>
            )}

            {data.key_messages && (data.key_messages as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.key_messages as string[]).map((msg: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-foreground">{msg}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.talking_points && (data.talking_points as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Talking Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.talking_points as string[]).map((point: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.delivery_guidance && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Delivery Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{data.delivery_guidance as string}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CLevelStatementBuilder;
