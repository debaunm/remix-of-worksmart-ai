import { useState } from "react";
import { ArrowLeft, Copy, Check, Loader2, Rocket, Target, Users, DollarSign, TrendingUp, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PitchDeckResult {
  company_name: string;
  one_liner: string;
  slides: {
    slide_number: number;
    slide_title: string;
    duration_seconds: number;
    key_points: string[];
    speaker_notes: string;
    visual_suggestion: string;
  }[];
  narrative_arc: string;
  investor_hooks: string[];
  common_questions: { question: string; suggested_answer: string }[];
  deck_tips: string[];
}

const PitchDeckBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [traction, setTraction] = useState("");
  const [team, setTeam] = useState("");
  const [ask, setAsk] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow<PitchDeckResult>("pitch_deck_builder");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await execute({
      company_name: companyName,
      one_liner: oneLiner,
      problem,
      solution,
      target_market: targetMarket,
      business_model: businessModel,
      traction,
      team,
      ask,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatSlideContent = (slide: PitchDeckResult["slides"][0]) => {
    return `## Slide ${slide.slide_number}: ${slide.slide_title}
Duration: ${slide.duration_seconds}s

Key Points:
${slide.key_points.map((p) => `• ${p}`).join("\n")}

Speaker Notes:
${slide.speaker_notes}

Visual: ${slide.visual_suggestion}`;
  };

  const copyFullOutline = () => {
    if (!result) return;
    const fullOutline = `# ${result.company_name} Pitch Deck Outline

${result.one_liner}

---

${result.slides.map(formatSlideContent).join("\n\n---\n\n")}

---

## Narrative Arc
${result.narrative_arc}

## Investor Hooks
${result.investor_hooks.map((h) => `• ${h}`).join("\n")}

## Common Questions to Prepare For
${result.common_questions.map((q) => `Q: ${q.question}\nA: ${q.suggested_answer}`).join("\n\n")}

## Tips
${result.deck_tips.map((t) => `• ${t}`).join("\n")}`;
    copyToClipboard(fullOutline, "full");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/#all-tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pitch Deck Builder</h1>
              <p className="text-muted-foreground">Create a YC-style pitch deck outline in minutes</p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="how-to-use" className="border border-border rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:no-underline">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                How to use this tool effectively
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-3 pb-4">
              <p><strong>This tool creates a complete pitch deck outline</strong> following the YC/top-tier investor format. You'll get slide-by-slide guidance, speaker notes, and preparation for tough questions.</p>
              <p><strong>Be specific about your traction.</strong> Numbers matter. Instead of "growing fast," say "42% MoM growth, 1,200 active users."</p>
              <p><strong>Your ask should be clear.</strong> State the amount and what you'll use it for (e.g., "$1.5M to hire 3 engineers and reach $100K MRR").</p>
              <p><strong>Team matters.</strong> Highlight relevant experience, domain expertise, and why this team can win.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-primary" />
                Company Name
              </Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="one-liner">One-Liner (What you do)</Label>
              <Input
                id="one-liner"
                value={oneLiner}
                onChange={(e) => setOneLiner(e.target.value)}
                placeholder="We help X do Y by Z"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem" className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Problem
            </Label>
            <Textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="What's broken? Why does this problem matter? Who feels the pain most?"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="How do you solve this? What's your unique insight or approach?"
              rows={3}
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="target-market" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Target Market
              </Label>
              <Textarea
                id="target-market"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                placeholder="Who are your customers? TAM/SAM/SOM if known."
                rows={2}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-model" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Business Model
              </Label>
              <Textarea
                id="business-model"
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                placeholder="How do you make money? Pricing, unit economics if available."
                rows={2}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="traction" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Traction (be specific with numbers)
            </Label>
            <Textarea
              id="traction"
              value={traction}
              onChange={(e) => setTraction(e.target.value)}
              placeholder="Revenue, users, growth rate, key milestones, partnerships, waitlist size..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Textarea
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              placeholder="Founders' backgrounds, relevant experience, why this team wins."
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ask">The Ask (Funding Amount & Use of Funds)</Label>
            <Textarea
              id="ask"
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              placeholder="$X to achieve Y milestones (e.g., $1.5M for 18-month runway, hiring, and reaching $100K MRR)"
              rows={2}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building Your Deck Outline...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Build Pitch Deck Outline
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{result.company_name} Pitch Deck</h2>
              <Button variant="outline" size="sm" onClick={copyFullOutline}>
                {copiedField === "full" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Full Outline
              </Button>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-lg font-medium text-foreground">{result.one_liner}</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Slide-by-Slide Outline</h3>
              {result.slides?.map((slide, index) => (
                <Card key={index} className="border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {slide.slide_number}
                        </span>
                        {slide.slide_title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          ~{slide.duration_seconds}s
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(formatSlideContent(slide), `slide-${index}`)}
                        >
                          {copiedField === `slide-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Points</h4>
                      <ul className="space-y-1">
                        {slide.key_points?.map((point, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Speaker Notes</h4>
                      <p className="text-sm text-muted-foreground italic">{slide.speaker_notes}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Visual Suggestion</h4>
                      <p className="text-sm text-muted-foreground">{slide.visual_suggestion}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {result.narrative_arc && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Narrative Arc</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{result.narrative_arc}</p>
                </CardContent>
              </Card>
            )}

            {result.investor_hooks && result.investor_hooks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Investor Hooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.investor_hooks.map((hook, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">💡</span>
                        {hook}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {result.common_questions && result.common_questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prepare for These Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.common_questions.map((qa, i) => (
                    <div key={i} className="border-l-2 border-primary/30 pl-4">
                      <p className="font-medium text-foreground">{qa.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">{qa.suggested_answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {result.deck_tips && result.deck_tips.length > 0 && (
              <Card className="border-orange-500/20 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-lg">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.deck_tips.map((tip, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span>🎯</span>
                        {tip}
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

export default PitchDeckBuilder;
