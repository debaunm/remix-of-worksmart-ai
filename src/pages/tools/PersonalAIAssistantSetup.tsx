import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, Check, Sparkles, Bot, CheckCircle2, XCircle, HelpCircle, FileText, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";

interface AssistantResult {
  assistant_system_prompt: string;
  assistant_profile: {
    role: string;
    specialties: string[];
    tone: string;
    format_preferences: string[];
  };
  working_rules: {
    always_do: string[];
    never_do: string[];
    ask_follow_ups_when: string[];
  };
  example_queries: string[];
  usage_guide: string;
}

const PersonalAIAssistantSetup = () => {
  const [role, setRole] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [goals, setGoals] = useState("");
  const [toolsUsed, setToolsUsed] = useState("");
  const [communicationStyle, setCommunicationStyle] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { execute, isLoading, result } = useAIWorkflow<AssistantResult>("personal_ai_assistant_setup");

  const handleProcess = async () => {
    if (!role.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your role.",
        variant: "destructive",
      });
      return;
    }

    await execute({
      role,
      responsibilities,
      goals,
      tools_used: toolsUsed,
      communication_style: communicationStyle,
    });
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
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
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Workflow</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Personal AI <span className="gradient-text">Assistant Setup</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate a custom system prompt that configures any AI assistant around your role, goals, and preferences.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            {/* Input Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Your Role</Label>
                  <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., VP of Product, Startup Founder, Freelance Designer"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Communication Style</Label>
                  <Input
                    value={communicationStyle}
                    onChange={(e) => setCommunicationStyle(e.target.value)}
                    placeholder="e.g., Short and direct, Detailed with examples, Casual"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Responsibilities</Label>
                <Textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  placeholder="What are your main responsibilities? What do you spend most of your time on?"
                  className="min-h-[100px] resize-none bg-secondary/50 border-border/50"
                />
              </div>

              <div>
                <Label className="mb-3 block">Top Goals (next 3-6 months)</Label>
                <Textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="What are you trying to achieve? What outcomes matter most?"
                  className="min-h-[100px] resize-none bg-secondary/50 border-border/50"
                />
              </div>

              <div>
                <Label className="mb-3 block">Tools You Use Daily</Label>
                <Textarea
                  value={toolsUsed}
                  onChange={(e) => setToolsUsed(e.target.value)}
                  placeholder="e.g., Gmail, Slack, Notion, Google Docs, Figma, Linear..."
                  className="min-h-[80px] resize-none bg-secondary/50 border-border/50"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProcess} disabled={isLoading || !role.trim()} variant="hero" size="lg">
                  {isLoading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate My Assistant
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* System Prompt */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Your System Prompt
                    </h3>
                    <Button onClick={() => handleCopy(result.assistant_system_prompt, "prompt")} variant="outline" size="sm">
                      {copied === "prompt" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied === "prompt" ? "Copied!" : "Copy Prompt"}
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 max-h-[300px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{result.assistant_system_prompt}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Paste this prompt into ChatGPT, Claude, Gemini, or any AI assistant to configure it for your needs.
                  </p>
                </div>

                {/* Assistant Profile */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4">Assistant Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Role</p>
                      <p className="font-medium">{result.assistant_profile?.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tone</p>
                      <p className="font-medium">{result.assistant_profile?.tone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Specialties</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.assistant_profile?.specialties?.map((s, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Output Formats</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.assistant_profile?.format_preferences?.map((f, i) => (
                          <span key={i} className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-full">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Rules */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-card border border-border/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold">Always Do</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.working_rules?.always_do?.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-accent">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-card border border-border/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-destructive" />
                      <h4 className="font-semibold">Never Do</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.working_rules?.never_do?.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-destructive">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-card border border-border/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Ask Follow-ups When</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.working_rules?.ask_follow_ups_when?.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary">?</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Example Queries */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Example Queries to Try
                  </h3>
                  <div className="space-y-2">
                    {result.example_queries?.map((query, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30 group">
                        <span className="text-sm">{query}</span>
                        <Button
                          onClick={() => handleCopy(query, `query-${i}`)}
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copied === `query-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage Guide */}
                {result.usage_guide && (
                  <div className="rounded-2xl bg-primary/10 border border-primary/30 p-6">
                    <h3 className="font-semibold mb-3">Getting the Most Out of Your Assistant</h3>
                    <p className="text-muted-foreground">{result.usage_guide}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PersonalAIAssistantSetup;
