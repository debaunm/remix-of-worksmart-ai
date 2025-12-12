-- Create prompt_packs table for grouping prompts
CREATE TABLE public.prompt_packs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  category TEXT, -- 'executive', 'entrepreneur', 'life'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prompts table for individual prompts within packs
CREATE TABLE public.prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pack_id UUID REFERENCES public.prompt_packs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  use_case TEXT, -- brief description of when to use
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prompt_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Anyone can view active prompt packs (for browsing)
CREATE POLICY "Anyone can view active prompt packs" 
ON public.prompt_packs 
FOR SELECT 
USING (is_active = true);

-- Anyone can view active prompts (text visible, but copy requires email)
CREATE POLICY "Anyone can view active prompts" 
ON public.prompts 
FOR SELECT 
USING (is_active = true);

-- Add triggers for updated_at
CREATE TRIGGER update_prompt_packs_updated_at
BEFORE UPDATE ON public.prompt_packs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at
BEFORE UPDATE ON public.prompts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();