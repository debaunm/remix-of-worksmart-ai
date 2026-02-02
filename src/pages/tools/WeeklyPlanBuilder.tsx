import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Calendar, Zap, Coffee, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import BuyToolButton from "@/components/BuyToolButton";
import CalendarSidebar from "@/components/calendar/CalendarSidebar";

interface TimeBlock {
  time_window: string;
  label: string;
  goal_link: string | null;
  notes: string;
}

interface DayPlan {
  day: string;
  blocks: TimeBlock[];
}

interface WeeklyResult {
  weekly_plan: DayPlan[];
  priority_map: {
    must: string[];
    should: string[];
    could: string[];
  };
  automation_recommendations: string[];
  reset_ritual: string;
}

const WeeklyPlanBuilder = () => {
  const [goals, setGoals] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [constraints, setConstraints] = useState("");
  const [energyPatterns, setEnergyPatterns] = useState("");
  const { toast } = useToast();
  
  const { execute, isLoading, result } = useAIWorkflow<WeeklyResult>("weekly_plan_builder");

  const handleProcess = async () => {
    if (!goals.trim()) {
      toast({
        title: "Input required",
        description: "Please enter your goals for this week.",
        variant: "destructive",
      });
      return;
    }

    await execute({
      goals,
      responsibilities,
      constraints,
      energy_patterns: energyPatterns,
    });
  };

  const dayColors: Record<string, string> = {
    Monday: "border-l-blue-500",
    Tuesday: "border-l-purple-500",
    Wednesday: "border-l-green-500",
    Thursday: "border-l-orange-500",
    Friday: "border-l-pink-500",
    Saturday: "border-l-cyan-500",
    Sunday: "border-l-yellow-500",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-28 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Workflow</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Weekly Plan <span className="gradient-text">Builder</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn your goals and responsibilities into a realistic weekly plan with smart time blocks.
            </p>
            <div className="mt-6">
              <BuyToolButton toolName="Weekly Plan Builder" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            {/* Calendar Sidebar */}
            <CalendarSidebar />

            {/* Input Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-3 block">Goals for this week</Label>
                  <Textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="What do you want to accomplish this week? List your top priorities..."
                    className="min-h-[140px] resize-none bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-3 block">Responsibilities</Label>
                  <Textarea
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="Regular work duties, family commitments, recurring meetings..."
                    className="min-h-[140px] resize-none bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-3 block">Constraints</Label>
                  <Textarea
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="Hard commitments, childcare, travel, appointments..."
                    className="min-h-[100px] resize-none bg-secondary/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="mb-3 block">Energy Patterns</Label>
                  <Textarea
                    value={energyPatterns}
                    onChange={(e) => setEnergyPatterns(e.target.value)}
                    placeholder="When do you have most energy? When do you feel low? Morning person or night owl?"
                    className="min-h-[100px] resize-none bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProcess} disabled={isLoading || !goals.trim()} variant="hero" size="lg">
                  {isLoading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Building Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Build My Week
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Priority Map */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-card border border-border/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-destructive" />
                      <h4 className="font-semibold">Must Do</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.priority_map?.must?.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-destructive font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-card border border-border/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Should Do</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.priority_map?.should?.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-card border border-border/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-muted-foreground" />
                      <h4 className="font-semibold">Could Do</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.priority_map?.could?.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                          <span>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Weekly Plan */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Your Weekly Plan
                  </h3>
                  <div className="space-y-4">
                    {result.weekly_plan?.map((day, i) => (
                      <div key={i} className={`border-l-4 ${dayColors[day.day] || 'border-l-primary'} pl-4`}>
                        <h4 className="font-semibold mb-3">{day.day}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {day.blocks?.map((block, j) => (
                            <div key={j} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{block.time_window}</span>
                              </div>
                              <p className="font-medium text-sm">{block.label}</p>
                              {block.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{block.notes}</p>
                              )}
                              {block.goal_link && (
                                <Badge variant="outline" className="mt-2 text-xs">
                                  {block.goal_link}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automation Recommendations */}
                {result.automation_recommendations?.length > 0 && (
                  <div className="rounded-2xl bg-card border border-border/50 p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-accent" />
                      Save Time With AI
                    </h3>
                    <ul className="space-y-2">
                      {result.automation_recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="text-accent">→</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reset Ritual */}
                {result.reset_ritual && (
                  <div className="rounded-2xl bg-primary/10 border border-primary/30 p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-primary" />
                      End-of-Week Reset Ritual
                    </h3>
                    <p className="text-muted-foreground">{result.reset_ritual}</p>
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

export default WeeklyPlanBuilder;
