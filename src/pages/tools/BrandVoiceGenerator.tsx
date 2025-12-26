import { useState } from "react";
import { ArrowLeft, Mic, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import BuyToolButton from "@/components/BuyToolButton";

const BrandVoiceGenerator = () => {
  const [writingSamples, setWritingSamples] = useState("");
  const [toneAdjectives, setToneAdjectives] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("brand_voice_generator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!writingSamples.trim()) {
      toast.error("Please provide writing samples");
      return;
    }

    await execute({
      writing_samples: writingSamples,
      tone_adjectives: toneAdjectives,
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
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Brand Voice Generator</h1>
              <p className="text-muted-foreground">Extract your unique voice and create reusable voice rules</p>
            </div>
          </div>
          <BuyToolButton toolName="Brand Voice Generator" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="writingSamples">Writing Samples *</Label>
            <Textarea
              id="writingSamples"
              placeholder="Paste 3-5 writing samples that feel most like your true voice..."
              value={writingSamples}
              onChange={(e) => setWritingSamples(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toneAdjectives">Tone Adjectives</Label>
            <Input
              id="toneAdjectives"
              placeholder="3-5 words that describe your ideal voice (e.g., bold, conversational)"
              value={toneAdjectives}
              onChange={(e) => setToneAdjectives(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing your voice...
              </>
            ) : (
              "Generate Brand Voice"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Brand Voice Profile</h2>

            {data.voice_profile && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Voice Profile</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.voice_profile), "profile")}>
                    {copiedField === "profile" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(data.voice_profile as Record<string, unknown>).tone && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Tone</h4>
                      <p className="text-muted-foreground">{(data.voice_profile as Record<string, unknown>).tone as string}</p>
                    </div>
                  )}
                  {(data.voice_profile as Record<string, unknown>).pacing && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Pacing</h4>
                      <p className="text-muted-foreground">{(data.voice_profile as Record<string, unknown>).pacing as string}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {data.voice_rules && (data.voice_rules as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Voice Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.voice_rules as string[]).map((rule: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{rule}</span>
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

export default BrandVoiceGenerator;
