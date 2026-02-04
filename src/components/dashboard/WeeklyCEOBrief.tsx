import { motion } from "framer-motion";
import { 
  Target, 
  Sparkles,
  RefreshCw,
  Calendar,
  Brain
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentWeeklyFocus } from "@/hooks/useWeeklyFocus";
import { format, parseISO, addDays } from "date-fns";

const WeeklyCEOBrief = () => {
  const { data: weeklyFocus, isLoading, refetch, isRefetching } = useCurrentWeeklyFocus();

  const formatWeekRange = (weekStart: string) => {
    const start = parseISO(weekStart);
    const end = addDays(start, 6);
    return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`;
  };

  if (isLoading) {
    return (
      <Card className="h-full">
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
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  if (!weeklyFocus) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Weekly CEO Brief
          </CardTitle>
          <CardDescription>No weekly focus has been set yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Check back soon for your weekly focus and priorities.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Weekly CEO Brief
              <Badge variant="outline" className="ml-2 text-xs font-normal">
                <Sparkles className="w-3 h-3 mr-1" />
                Updated
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="w-3 h-3" />
              Week of {formatWeekRange(weeklyFocus.week_start)}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Focus Areas */}
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
            {weeklyFocus.focus_areas.map((area, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <p className="font-medium text-sm text-foreground">{area.title}</p>
                {area.description && (
                  <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Quote */}
        {weeklyFocus.weekly_quote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-xl bg-[hsl(var(--dark-bg))] border border-[hsl(var(--dark-border))]"
          >
            <p className="text-base font-medium text-center italic text-white/90 mb-2">
              "{weeklyFocus.weekly_quote}"
            </p>
            {weeklyFocus.quote_author && (
              <p className="text-xs text-center text-white/60">
                — {weeklyFocus.quote_author}
              </p>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyCEOBrief;
