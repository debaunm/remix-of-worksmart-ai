import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type WorkflowId = 
  | "rewrite_message" 
  | "meeting_to_action_plan" 
  | "decision_helper" 
  | "weekly_plan_builder" 
  | "personal_ai_assistant_setup"
  | "fix_my_content"
  | "idea_to_revenue"
  | "brand_voice_generator"
  | "social_bio_builder"
  | "c_level_statement_builder"
  | "roles_and_responsibilities_creator"
  | "budget_builder_prompts"
  | "linkedin_audit_tool_exec"
  | "early_retirement_calculator"
  | "press_release_generator"
  | "pitch_deck_reviewer"
  | "pitch_deck_builder"
  | "life_simplifier"
  | "linkedin_21_day_exec_content";

export const useAIWorkflow = <T = unknown>(workflowId: WorkflowId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const execute = async (inputs: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ai-workflow", {
        body: { workflow_id: workflowId, inputs },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setResult(data.result as T);
      return data.result as T;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { execute, isLoading, result, error, reset };
};
