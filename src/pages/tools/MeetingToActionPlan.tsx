import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Check, Sparkles, ListChecks, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";

interface ActionItem {
  task: string;
  owner: string | null;
  due_date: string;
  priority: "high" | "medium" | "low";
}

interface MeetingResult {
  summary: string;
  key_decisions: string[];
  risks: string[];
  open_questions: string[];
  actions: ActionItem[];
  communication_snippet: string;
}

const MeetingToActionPlan = () => {
  const [meetingNotes, setMeetingNotes] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { execute, isLoading, result } = useAIWorkflow<MeetingResult>("meeting_to_action_plan");

  const handleProcess = async () => {
    if (!meetingNotes.trim()) {
      toast({
        title: "Input required",
        description: "Please enter your meeting notes.",
        variant: "destructive",
      });
      return;
    }

    await execute({
      meeting_notes: meetingNotes,
      team_members: teamMembers,
      deadlines,
    });
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
    setTimeout(() => setCopied(null), 2000);
  };

  const priorityColors = {
    high: "bg-destructive/20 text-destructive border-destructive/30",
    medium: "bg-primary/20 text-primary border-primary/30",
    low: "bg-muted text-muted-foreground border-border",
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
              <ListChecks className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Workflow</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meeting to <span className="gradient-text">Action Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert messy meeting notes into a structured summary, decisions, risks, and actionable task list.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            {/* Input Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-6">
              <div>
                <Label className="mb-3 block">Meeting Notes</Label>
                <Textarea
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  placeholder="Paste your meeting notes, transcript, or bullet points here..."
                  className="min-h-[200px] resize-none bg-secondary/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Team Members</Label>
                  <Input
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    placeholder="e.g., John (PM), Sarah (Dev), Mike (Design)"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Known Deadlines</Label>
                  <Input
                    value={deadlines}
                    onChange={(e) => setDeadlines(e.target.value)}
                    placeholder="e.g., Launch by March 15, Review next Friday"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProcess} disabled={isLoading || !meetingNotes.trim()} variant="hero" size="lg">
                  {isLoading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Action Plan
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Summary */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    Meeting Summary
                  </h3>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 whitespace-pre-wrap">
                    {result.summary}
                  </div>
                </div>

                {/* Key Decisions */}
                {result.key_decisions?.length > 0 && (
                  <div className="rounded-2xl bg-card border border-border/50 p-6">
                    <h3 className="font-semibold mb-4">Key Decisions</h3>
                    <ul className="space-y-2">
                      {result.key_decisions.map((decision, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Risks & Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.risks?.length > 0 && (
                    <div className="rounded-2xl bg-card border border-border/50 p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Risks
                      </h3>
                      <ul className="space-y-2">
                        {result.risks.map((risk, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-destructive">•</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.open_questions?.length > 0 && (
                    <div className="rounded-2xl bg-card border border-border/50 p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        Open Questions
                      </h3>
                      <ul className="space-y-2">
                        {result.open_questions.map((q, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">?</span>
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action Items */}
                {result.actions?.length > 0 && (
                  <div className="rounded-2xl bg-card border border-border/50 p-6">
                    <h3 className="font-semibold mb-4">Action Items</h3>
                    <div className="space-y-3">
                      {result.actions.map((action, i) => (
                        <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border/30 flex flex-col md:flex-row md:items-center gap-3">
                          <div className="flex-1">
                            <p className="font-medium">{action.task}</p>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              {action.owner && <span>Owner: {action.owner}</span>}
                              {action.due_date && <span>Due: {action.due_date}</span>}
                            </div>
                          </div>
                          <Badge className={priorityColors[action.priority]}>
                            {action.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Communication Snippet */}
                {result.communication_snippet && (
                  <div className="rounded-2xl bg-card border border-border/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Ready-to-Share Update</h3>
                      <Button onClick={() => handleCopy(result.communication_snippet, "snippet")} variant="outline" size="sm">
                        {copied === "snippet" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === "snippet" ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 whitespace-pre-wrap">
                      {result.communication_snippet}
                    </div>
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

export default MeetingToActionPlan;
