import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Prompt {
  id: string;
  pack_id: string;
  title: string;
  prompt_text: string;
  use_case: string | null;
  display_order: number | null;
}

export interface PromptPack {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  display_order: number | null;
  prompts?: Prompt[];
}

export const usePromptPacks = () => {
  return useQuery({
    queryKey: ["prompt-packs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompt_packs")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      return data as PromptPack[];
    },
  });
};

export const usePromptPackWithPrompts = (slug: string) => {
  return useQuery({
    queryKey: ["prompt-pack", slug],
    queryFn: async () => {
      // Get the pack
      const { data: pack, error: packError } = await supabase
        .from("prompt_packs")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (packError) throw packError;
      if (!pack) return null;

      // Get the prompts for this pack
      const { data: prompts, error: promptsError } = await supabase
        .from("prompts")
        .select("*")
        .eq("pack_id", pack.id)
        .order("display_order");
      
      if (promptsError) throw promptsError;

      return { ...pack, prompts } as PromptPack;
    },
    enabled: !!slug,
  });
};

export const useAllPromptsGrouped = () => {
  return useQuery({
    queryKey: ["all-prompts-grouped"],
    queryFn: async () => {
      // Get all packs
      const { data: packs, error: packsError } = await supabase
        .from("prompt_packs")
        .select("*")
        .order("display_order");
      
      if (packsError) throw packsError;

      // Get all prompts
      const { data: prompts, error: promptsError } = await supabase
        .from("prompts")
        .select("*")
        .order("display_order");
      
      if (promptsError) throw promptsError;

      // Group prompts by pack
      const packsWithPrompts = packs.map(pack => ({
        ...pack,
        prompts: prompts.filter(p => p.pack_id === pack.id),
      }));

      return packsWithPrompts as PromptPack[];
    },
  });
};
