-- Create weekly_focus table to store admin-published weekly focus content
CREATE TABLE public.weekly_focus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL,
  week_start DATE NOT NULL,
  focus_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  weekly_quote TEXT,
  quote_author TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to ensure only one focus per week
CREATE UNIQUE INDEX idx_weekly_focus_week_start ON public.weekly_focus(week_start);

-- Enable Row Level Security
ALTER TABLE public.weekly_focus ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone authenticated can read weekly focus
CREATE POLICY "Anyone authenticated can view weekly focus"
ON public.weekly_focus
FOR SELECT
USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert weekly focus"
ON public.weekly_focus
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update
CREATE POLICY "Admins can update weekly focus"
ON public.weekly_focus
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete weekly focus"
ON public.weekly_focus
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_weekly_focus_updated_at
  BEFORE UPDATE ON public.weekly_focus
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();