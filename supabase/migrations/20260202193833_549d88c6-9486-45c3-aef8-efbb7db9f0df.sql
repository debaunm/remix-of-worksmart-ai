-- Create user_onboarding table to store onboarding data
CREATE TABLE public.user_onboarding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  quarterly_goal TEXT,
  milestones JSONB DEFAULT '[]'::jsonb,
  ceo_tasks JSONB DEFAULT '[]'::jsonb,
  operating_tasks JSONB DEFAULT '[]'::jsonb,
  weekly_hours INTEGER DEFAULT 40,
  ceo_percentage INTEGER DEFAULT 50,
  connected_tools JSONB DEFAULT '[]'::jsonb,
  onboarding_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own onboarding data" 
ON public.user_onboarding 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding data" 
ON public.user_onboarding 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data" 
ON public.user_onboarding 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_onboarding_updated_at
BEFORE UPDATE ON public.user_onboarding
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();