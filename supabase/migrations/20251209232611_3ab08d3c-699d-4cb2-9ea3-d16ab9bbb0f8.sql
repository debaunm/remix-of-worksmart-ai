-- Create enum for tool tiers
CREATE TYPE public.tool_tier AS ENUM (
  'free_prompt',
  'paid_executive',
  'paid_entrepreneur',
  'paid_crossover',
  'non_paid_personal'
);

-- Add tier column to tools table
ALTER TABLE public.tools 
ADD COLUMN tier public.tool_tier NOT NULL DEFAULT 'free_prompt';

-- Update tools with correct tier classifications based on master prompt

-- FREE PROMPTS (Taster Tools) - simple, single-step, fast
UPDATE public.tools SET tier = 'free_prompt' WHERE slug IN (
  'social-bio-builder',
  'fix-my-content',
  'write-it-better'
);

-- PAID EXECUTIVE TOOLS (Executive Leverage System)
UPDATE public.tools SET tier = 'paid_executive' WHERE slug IN (
  'c-level-statement-builder',
  'roles-and-responsibilities-creator',
  'budget-builder-prompts',
  'linkedin-audit-tool-exec',
  'decision-framework',
  'meeting-summarizer'
);

-- PAID ENTREPRENEUR / BUSINESS OWNER TOOLS
UPDATE public.tools SET tier = 'paid_entrepreneur' WHERE slug IN (
  'idea-to-revenue',
  'pitch-deck-reviewer',
  'pitch-deck-builder',
  'press-release-generator',
  'market-research-ai'
);

-- PAID CROSSOVER TOOLS (Serve Both Executives & Entrepreneurs)
UPDATE public.tools SET tier = 'paid_crossover' WHERE slug IN (
  'brand-voice-generator',
  'linkedin-21-day-content-plan'
);

-- NON-PAID PERSONAL TOOLS (not in paid tier)
UPDATE public.tools SET tier = 'non_paid_personal' WHERE slug IN (
  'early-retirement-calculator',
  'life-simplifier',
  'life-coach-ai',
  'meal-planner'
);