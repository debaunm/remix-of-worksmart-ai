import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Milestone {
  text: string;
  completed: boolean;
}

export const QuarterlyGoal = () => {
  const { user } = useAuth();

  const { data: onboarding } = useQuery({
    queryKey: ["onboarding", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_onboarding")
        .select("quarterly_goal, milestones")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!onboarding?.quarterly_goal) return null;

  const milestones = (onboarding.milestones as unknown as Milestone[] | null) ?? [];
  const activeMilestones = milestones.filter((m) => m.text?.trim());

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Quarterly Goal
          </CardTitle>
          <Link to="/onboarding">
            <Button variant="ghost" size="sm" className="text-xs">
              Edit
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="font-medium text-foreground">{onboarding.quarterly_goal}</p>
        {activeMilestones.length > 0 && (
          <div className="space-y-2">
            {activeMilestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className={`w-4 h-4 shrink-0 ${m.completed ? "text-primary" : "text-muted-foreground/40"}`} />
                <span className={m.completed ? "line-through" : ""}>{m.text}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
