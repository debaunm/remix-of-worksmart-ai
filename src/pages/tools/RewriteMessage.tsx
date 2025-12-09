import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Check, Sparkles, PenLine, Lightbulb, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";

interface RewriteResult {
  rewrite: string;
  summary_version: string;
  tone_used: string;
  improvements_made: string[];
  decision_rights: string;
  connector_payload?: {
    gmail_draft?: {
      to: string | null;
      subject: string;
      body: string;
    };
  };
  validation_check: {
    clarity: boolean;
    tone_alignment: boolean;
    actionability: boolean;
  };
}

const RewriteMessage = () => {
  const [rawText, setRawText] = useState("");
  const [audience, setAudience] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("professional");
  const [urgency, setUrgency] = useState("normal");
  const [copied, setCopied] = useState<"rewrite" | "summary" | null>(null);
  const { toast } = useToast();
  
  const { execute, isLoading, result } = useAIWorkflow<RewriteResult>("rewrite_message");

  const handleProcess = async () => {
    if (!rawText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to rewrite.",
        variant: "destructive",
      });
      return;
    }

    await execute({
      raw_text: rawText,
      audience,
      purpose,
      tone,
      urgency,
    });
  };

  const handleCopy = async (type: "rewrite" | "summary") => {
    const text = type === "rewrite" ? result?.rewrite : result?.summary_version;
    if (!text) return;
    
    await navigator.clipboard.writeText(text);
    setCopied(type);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-28 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
              <PenLine className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Workflow</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rewrite <span className="gradient-text">Message</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform any draft into a clearer, more confident, and effective message while preserving your intent.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            {/* Input Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-6">
              <div>
                <Label className="mb-3 block">Your message or draft</Label>
                <Textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste your email, Slack message, memo, or any text you want to improve..."
                  className="min-h-[180px] resize-none bg-secondary/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Audience</Label>
                  <Input
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., Executive team, Client, Direct reports"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Purpose</Label>
                  <Input
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g., Request approval, Share update, Delegate task"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">Urgency</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProcess} disabled={isLoading || !rawText.trim()} variant="hero" size="lg">
                  {isLoading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Rewriting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Rewrite Message
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Main Rewrite */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Rewritten Message</h3>
                    </div>
                    <Button onClick={() => handleCopy("rewrite")} variant="outline" size="sm">
                      {copied === "rewrite" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === "rewrite" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 whitespace-pre-wrap">
                    {result.rewrite}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">Tone: {result.tone_used}</p>
                </div>

                {/* Summary Version */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Summary (for Slack/SMS)</h3>
                    <Button onClick={() => handleCopy("summary")} variant="outline" size="sm">
                      {copied === "summary" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === "summary" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                    {result.summary_version}
                  </div>
                </div>

                {/* Improvements Made */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold">Improvements Made</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.improvements_made?.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                  {result.decision_rights && (
                    <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm"><strong>Decision Rights:</strong> {result.decision_rights}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RewriteMessage;
