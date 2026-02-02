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
  }[];
  weeklyQuote: string;
  quoteAuthor: string;
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
      title: "Finalize Q1 Strategy",
      description: "Complete quarterly planning and goal-setting",
    },
    {
      title: "Record 3 Podcast Episodes",
      description: "Batch record for next month's content",
    },
    {
      title: "Delegate Invoicing to VA",
      description: "Hand off recurring admin tasks",
    },
  ],
  weeklyQuote: "The goal isn't to be busy. It's to be effective.",
  quoteAuthor: "Morgan DeBaun",
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
          {/* Wins - Kelly Green */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-[hsl(var(--success-green))]/5 border border-[hsl(var(--success-green))]/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--success-green))]/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--success-green))]" />
              </div>
              <h4 className="font-semibold text-sm">This Week's Wins</h4>
            </div>
            <ul className="space-y-2">
              {briefData.wins.map((win, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success-green))] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{win}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Insights - Gold */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-[hsl(var(--tier-executive))]/5 border border-[hsl(var(--tier-executive))]/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--tier-executive))]/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-[hsl(var(--tier-executive))]" />
              </div>
              <h4 className="font-semibold text-sm">Key Insights</h4>
            </div>
            <ul className="space-y-2">
              {briefData.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-[hsl(var(--tier-executive))] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Focus Areas - Fire/Coral (Primary) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">This Week's Focus</h4>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {briefData.focusAreas.map((area, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <p className="font-medium text-sm text-foreground">{area.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-xl bg-[hsl(var(--dark-bg))] border border-[hsl(var(--dark-border))]"
        >
          <p className="text-base font-medium text-center italic text-white/90 mb-2">
            "{briefData.weeklyQuote}"
          </p>
          <p className="text-xs text-center text-white/60">
            — {briefData.quoteAuthor}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCEOBrief;
