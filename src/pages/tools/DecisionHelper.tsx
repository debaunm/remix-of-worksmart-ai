import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, GitBranch, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";

interface Option {
  label: string;
  description: string;
  pros: string[];
  cons: string[];
  risks: string[];
}

interface Score {
  option_label: string;
  score_overall: number;
  notes: string;
}

interface DecisionResult {
  decision_statement: string;
  options: Option[];
  scores: Score[];
  recommendation: string;
  rationale: string;
  next_actions: string[];
}

const DecisionHelper = () => {
  const [decisionContext, setDecisionContext] = useState("");
  const [constraints, setConstraints] = useState("");
  const [stakeholders, setStakeholders] = useState("");
  const [timeline, setTimeline] = useState("");
  const { toast } = useToast();
  
  const { execute, isLoading, result } = useAIWorkflow<DecisionResult>("decision_helper");

  const handleProcess = async () => {
    if (!decisionContext.trim()) {
      toast({
        title: "Input required",
        description: "Please describe the decision you need help with.",
        variant: "destructive",
      });
      return;
    }

    await execute({
      decision_context: decisionContext,
      constraints,
      stakeholders,
      timeline,
    });
  };

  const getScoreForOption = (label: string) => {
    return result?.scores?.find(s => s.option_label === label)?.score_overall;
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
              <GitBranch className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Workflow</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Decision <span className="gradient-text">Helper</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn a messy decision into clear options, pros/cons, risks, and a recommended path forward.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            {/* Input Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-6">
              <div>
                <Label className="mb-3 block">What decision are you facing?</Label>
                <Textarea
                  value={decisionContext}
                  onChange={(e) => setDecisionContext(e.target.value)}
                  placeholder="Describe the decision you need to make. Include relevant background, what's at stake, and any options you're already considering..."
                  className="min-h-[160px] resize-none bg-secondary/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-2 block">Constraints</Label>
                  <Input
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="Time, budget, people..."
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Stakeholders</Label>
                  <Input
                    value={stakeholders}
                    onChange={(e) => setStakeholders(e.target.value)}
                    placeholder="Who is affected?"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Timeline</Label>
                  <Input
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="When must you decide?"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProcess} disabled={isLoading || !decisionContext.trim()} variant="hero" size="lg">
                  {isLoading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze Decision
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Decision Statement */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4">The Decision</h3>
                  <p className="text-lg">{result.decision_statement}</p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Your Options</h3>
                  {result.options?.map((option, i) => {
                    const score = getScoreForOption(option.label);
                    const isRecommended = result.recommendation === option.label;
                    
                    return (
                      <div 
                        key={i} 
                        className={`rounded-2xl border p-6 ${
                          isRecommended 
                            ? 'bg-primary/10 border-primary/30' 
                            : 'bg-card border-border/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-lg">{option.label}</h4>
                            {isRecommended && (
                              <Badge className="bg-primary text-primary-foreground">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Recommended
                              </Badge>
                            )}
                          </div>
                          {score && (
                            <div className="text-right">
                              <span className="text-2xl font-bold text-primary">{score}</span>
                              <span className="text-muted-foreground">/10</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{option.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-accent">
                              <ThumbsUp className="w-4 h-4" />
                              Pros
                            </div>
                            <ul className="space-y-1">
                              {option.pros?.map((pro, j) => (
                                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-accent">+</span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-destructive">
                              <ThumbsDown className="w-4 h-4" />
                              Cons
                            </div>
                            <ul className="space-y-1">
                              {option.cons?.map((con, j) => (
                                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-destructive">-</span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-yellow-500">
                              <AlertTriangle className="w-4 h-4" />
                              Risks
                            </div>
                            <ul className="space-y-1">
                              {option.risks?.map((risk, j) => (
                                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-yellow-500">!</span>
                                  {risk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Rationale */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4">Why This Recommendation?</h3>
                  <p className="text-muted-foreground">{result.rationale}</p>
                </div>

                {/* Next Actions */}
                {result.next_actions?.length > 0 && (
                  <div className="rounded-2xl bg-primary/10 border border-primary/30 p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-primary" />
                      Your First Moves
                    </h3>
                    <ol className="space-y-3">
                      {result.next_actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ol>
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

export default DecisionHelper;
