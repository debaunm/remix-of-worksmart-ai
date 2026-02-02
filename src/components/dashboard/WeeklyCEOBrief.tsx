import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  TrendingUp, 
  TrendingDown,
  Target, 
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Brain
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface WeeklyBriefData {
  weekOf: string;
  generatedAt: string;
  wins: string[];
  challenges: string[];
  focusAreas: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }[];
  keyInsight: string;
  weeklyQuestion: string;
  suggestedActions: string[];
}

const mockBriefData: WeeklyBriefData = {
  weekOf: "January 27 - February 2, 2026",
  generatedAt: "Sunday, January 26",
  wins: [
    "Completed 3 client deliverables ahead of schedule",
    "LinkedIn engagement up 45% from content consistency",
    "Closed new retainer worth $5k/month",
  ],
  challenges: [
    "Missed 2 workout sessions this week",
    "Email backlog reached 150+ unread",
    "Delayed product launch prep by 3 days",
  ],
  focusAreas: [
    {
      title: "Revenue Pipeline",
      description: "Follow up with 3 warm leads from networking event",
      priority: "high",
    },
    {
      title: "Content Batching",
      description: "Record 4 videos for next month's content calendar",
      priority: "high",
    },
    {
      title: "Team Delegation",
      description: "Hand off admin tasks to new VA",
      priority: "medium",
    },
  ],
  keyInsight: "Your highest-revenue weeks correlate with mornings blocked for deep work. Consider protecting 8-11 AM as non-negotiable creative time.",
  weeklyQuestion: "What's the ONE thing that, if completed this week, would make everything else easier or unnecessary?",
  suggestedActions: [
    "Block 3 hours for Q1 planning session",
    "Schedule follow-up calls with warm leads",
    "Review and batch-process email backlog",
    "Set up automation for recurring admin tasks",
  ],
};

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  low: "bg-muted text-muted-foreground border-border",
};

const WeeklyCEOBrief = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [briefData] = useState<WeeklyBriefData>(mockBriefData);

  const handleRegenerate = () => {
    setIsLoading(true);
    // Simulate regeneration
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (isLoading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="w-48 h-6" />
            </div>
            <Skeleton className="w-24 h-9" />
          </div>
          <Skeleton className="w-64 h-4 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Weekly CEO Brief
              <Badge variant="outline" className="ml-2 text-xs font-normal">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Generated
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="w-3 h-3" />
              Week of {briefData.weekOf}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRegenerate}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wins & Challenges */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Wins */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-accent/5 border border-accent/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <h4 className="font-semibold text-sm">This Week's Wins</h4>
            </div>
            <ul className="space-y-2">
              {briefData.wins.map((win, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{win}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <h4 className="font-semibold text-sm">Areas to Address</h4>
            </div>
            <ul className="space-y-2">
              {briefData.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-card border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">Priority Focus Areas</h4>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {briefData.focusAreas.map((area, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${priorityColors[area.priority]}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${priorityColors[area.priority]}`}
                  >
                    {area.priority}
                  </Badge>
                </div>
                <p className="font-medium text-sm mb-1">{area.title}</p>
                <p className="text-xs text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Key Insight</h4>
              <p className="text-sm text-muted-foreground">{briefData.keyInsight}</p>
            </div>
          </div>
        </motion.div>

        {/* Weekly Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl bg-secondary border border-border/50"
        >
          <p className="text-sm font-medium text-center italic text-foreground">
            "{briefData.weeklyQuestion}"
          </p>
        </motion.div>

        {/* Suggested Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Suggested Actions for This Week
          </h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {briefData.suggestedActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCEOBrief;
