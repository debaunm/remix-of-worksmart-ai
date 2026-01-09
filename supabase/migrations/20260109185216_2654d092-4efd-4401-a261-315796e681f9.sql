-- Add price column to prompt_packs table
ALTER TABLE public.prompt_packs 
ADD COLUMN price DECIMAL(10,2) DEFAULT 14.99;

-- Update existing pack prices
UPDATE public.prompt_packs SET price = 14.99 WHERE slug = 'executive-emails';
UPDATE public.prompt_packs SET price = 14.99 WHERE slug = 'meeting-mastery';

-- Insert new Passive Income Strategist pack
INSERT INTO public.prompt_packs (name, slug, description, icon, category, display_order, price)
VALUES (
  'Passive Income Strategist', 
  'passive-income', 
  'Build wealth through smart passive income streams and investment strategies', 
  'TrendingUp', 
  'entrepreneur', 
  6, 
  14.99
);