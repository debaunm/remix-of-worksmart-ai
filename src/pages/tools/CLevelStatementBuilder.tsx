import { useState } from "react";
import { ArrowLeft, FileText, Loader2, Copy, Check, HelpCircle } from "lucide-react";
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

        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-3 rounded-xl bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">C-Level Statement Builder</h1>
              <p className="text-muted-foreground">Create polished board-ready executive statements</p>
            </div>
          </div>
          <BuyToolButton toolName="C-Level Statement Builder" />
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
              This tool creates polished, board-ready executive statements you can use for company-wide announcements, investor updates, crisis communications, or leadership presentations. Here's how to get the best results.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="purpose">
                <AccordionTrigger className="text-foreground font-medium">1. Statement Purpose</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Be specific about why you're communicating. The purpose shapes the tone, structure, and framing.</p>
                  <p className="font-medium text-foreground">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Quarterly performance update for investors</li>
                    <li>Organizational restructuring announcement</li>
                    <li>Product launch announcement to customers</li>
                    <li>Crisis response to media inquiry</li>
                    <li>Strategic pivot communication to board</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="audience">
                <AccordionTrigger className="text-foreground font-medium">2. Audience</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Different audiences require different language, detail levels, and framing. Be specific.</p>
                  <p className="font-medium text-foreground">Common audiences:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Board of Directors:</strong> Strategic, metrics-focused, governance-aware</li>
                    <li><strong>Investors:</strong> Growth-oriented, financial clarity, risk transparency</li>
                    <li><strong>Full Company:</strong> Inclusive, motivational, action-oriented</li>
                    <li><strong>Leadership Team:</strong> Tactical, decision-focused, accountabilities clear</li>
                    <li><strong>Customers:</strong> Value-focused, trust-building, forward-looking</li>
                    <li><strong>Media:</strong> Concise, quotable, narrative-driven</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="facts">
                <AccordionTrigger className="text-foreground font-medium">3. Key Facts</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>List the non-negotiable information that must be included. These are the facts your statement will be built around.</p>
                  <p className="font-medium text-foreground">Include:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Specific numbers and metrics (revenue, growth %, headcount)</li>
                    <li>Dates and timelines</li>
                    <li>Names and titles of key people involved</li>
                    <li>Decisions that have been made</li>
                    <li>Changes that are happening</li>
                  </ul>
                  <p className="italic">Tip: More facts = better statement. Don't hold back on details here.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="risks">
                <AccordionTrigger className="text-foreground font-medium">4. Risks & Sensitivities</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>What could go wrong? What topics need careful handling? This helps craft language that's honest but strategic.</p>
                  <p className="font-medium text-foreground">Consider:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Legal or compliance concerns</li>
                    <li>Morale impacts (layoffs, restructuring)</li>
                    <li>Competitive sensitivities</li>
                    <li>Media/PR landmines</li>
                    <li>Stakeholder concerns that need addressing</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="outcome">
                <AccordionTrigger className="text-foreground font-medium">5. Desired Outcome</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>What should your audience think, feel, or do after reading this? This shapes the call-to-action and emotional tone.</p>
                  <p className="font-medium text-foreground">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>"Feel confident in leadership's direction"</li>
                    <li>"Understand and support the restructuring"</li>
                    <li>"Approve the proposed budget"</li>
                    <li>"Trust that we're handling the crisis well"</li>
                    <li>"Get excited about the new product direction"</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="output">
                <AccordionTrigger className="text-foreground font-medium">6. What You'll Get</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>When you press Generate, you'll receive:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Full Statement:</strong> A polished, ready-to-deliver executive statement</li>
                    <li><strong>Key Messages:</strong> The 3-5 core points your statement conveys</li>
                    <li><strong>Talking Points:</strong> Supporting points for Q&A or follow-up conversations</li>
                    <li><strong>Delivery Guidance:</strong> Tips on tone, timing, and presentation</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="prompts">
                <AccordionTrigger className="text-foreground font-medium">Pro Tips for Better Output</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <p>Ask yourself these questions while filling out the form:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>What question will this statement raise that I should answer preemptively?</li>
                    <li>What's the one thing I absolutely cannot have misunderstood?</li>
                    <li>If this leaked to the press, what would the headline be?</li>
                    <li>What does success look like 24 hours after this goes out?</li>
                    <li>Who's the most skeptical person in my audience, and what do they need to hear?</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

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
