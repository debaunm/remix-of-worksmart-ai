import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Sparkles,
  RefreshCw,
  Calendar,
  CheckCircle2,
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
  insights: string[];
  focusAreas: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }[];
  weeklyQuote: string;
}

const mockBriefData: WeeklyBriefData = {
  weekOf: "January 27 - February 2, 2026",
  generatedAt: "Sunday, January 26",
  wins: [
    "Closed 2 new client deals",
    "Hit 300K total followers",
    "Launched newsletter rebrand",
  ],
  insights: [
    "AI content creation saves 5+ hours/week",
    "LinkedIn video outperforms static posts 3x",
  ],
  focusAreas: [
    {
      title: "Revenue Growth",
      description: "Follow up with new client onboarding",
      priority: "high",
    },
    {
      title: "Content Strategy",
      description: "Double down on LinkedIn video content",
      priority: "high",
    },
    {
      title: "Newsletter Optimization",
      description: "Monitor rebrand engagement metrics",
      priority: "medium",
    },
  ],
  weeklyQuote: "The goal isn't to be busy—it's to be effective.",
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
        {/* Wins & Insights */}
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

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-semibold text-sm">Key Insights</h4>
            </div>
            <ul className="space-y-2">
              {briefData.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{insight}</span>
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

        {/* Weekly Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-xl bg-secondary border border-border/50"
        >
          <p className="text-sm font-medium text-center italic text-foreground">
            "{briefData.weeklyQuote}"
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCEOBrief;
