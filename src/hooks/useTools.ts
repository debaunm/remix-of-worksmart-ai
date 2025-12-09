import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ToolTier = 
  | 'free_prompt' 
  | 'paid_executive' 
  | 'paid_entrepreneur' 
  | 'paid_crossover' 
  | 'non_paid_personal';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  icon: string | null;
  route: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  badge: string | null;
  display_order: number | null;
  category_id: string | null;
  tier: ToolTier;
  category?: ToolCategory;
}

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  display_order: number | null;
}

export const useTools = () => {
  return useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select(`
          *,
          category:tool_categories(*)
        `)
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      return data as Tool[];
    },
  });
};

export const useFeaturedTools = () => {
  return useQuery({
    queryKey: ["featured-tools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select(`
          *,
          category:tool_categories(*)
        `)
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("display_order");

      if (error) throw error;
      return data as Tool[];
    },
  });
};

export const useToolCategories = () => {
  return useQuery({
    queryKey: ["tool-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tool_categories")
        .select("*")
        .order("display_order");

      if (error) throw error;
      return data as ToolCategory[];
    },
  });
};

export const useCategoriesWithTools = () => {
  return useQuery({
    queryKey: ["categories-with-tools"],
    queryFn: async () => {
      const { data: categories, error: catError } = await supabase
        .from("tool_categories")
        .select("*")
        .order("display_order");

      if (catError) throw catError;

      const { data: tools, error: toolsError } = await supabase
        .from("tools")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (toolsError) throw toolsError;

      return (categories as ToolCategory[]).map((category) => ({
        ...category,
        tools: (tools as Tool[]).filter((tool) => tool.category_id === category.id),
      }));
    },
  });
};
