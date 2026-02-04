import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface FocusArea {
  title: string;
  description: string;
}

export interface WeeklyFocusData {
  id: string;
  author_id: string;
  week_start: string;
  focus_areas: FocusArea[];
  weekly_quote: string | null;
  quote_author: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateWeeklyFocusInput {
  week_start: string;
  focus_areas: FocusArea[];
  weekly_quote?: string;
  quote_author?: string;
}

// Get the current week's focus (most recent where week_start <= today)
export const useCurrentWeeklyFocus = () => {
  return useQuery({
    queryKey: ["weekly-focus", "current"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      
      const { data, error } = await supabase
        .from("weekly_focus")
        .select("*")
        .lte("week_start", today)
        .order("week_start", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) return null;
      
      // Parse focus_areas from JSONB
      return {
        ...data,
        focus_areas: (data.focus_areas as unknown as FocusArea[]) || [],
      } as WeeklyFocusData;
    },
  });
};

// Create a new weekly focus
export const useCreateWeeklyFocus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateWeeklyFocusInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Check if a record exists for this week
      const { data: existing } = await supabase
        .from("weekly_focus")
        .select("id")
        .eq("week_start", input.week_start)
        .maybeSingle();

      const focusAreasJson = input.focus_areas as unknown as Json;

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from("weekly_focus")
          .update({
            focus_areas: focusAreasJson,
            weekly_quote: input.weekly_quote || null,
            quote_author: input.quote_author || null,
          })
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from("weekly_focus")
          .insert({
            author_id: user.id,
            week_start: input.week_start,
            focus_areas: focusAreasJson,
            weekly_quote: input.weekly_quote || null,
            quote_author: input.quote_author || null,
          })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekly-focus"] });
    },
  });
};
