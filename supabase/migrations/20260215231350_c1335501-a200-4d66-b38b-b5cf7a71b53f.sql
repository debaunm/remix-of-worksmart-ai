
-- Create inner_circle_applications table
CREATE TABLE public.inner_circle_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT,
  team_size TEXT,
  annual_revenue TEXT,
  years_in_business TEXT,
  help_with TEXT,
  referral_source TEXT,
  anything_else TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inner_circle_applications ENABLE ROW LEVEL SECURITY;

-- Public INSERT (no auth required for application form)
CREATE POLICY "Anyone can submit an application"
ON public.inner_circle_applications
FOR INSERT
WITH CHECK (true);

-- Admins can view all applications
CREATE POLICY "Admins can view applications"
ON public.inner_circle_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update applications (e.g. change status)
CREATE POLICY "Admins can update applications"
ON public.inner_circle_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete applications
CREATE POLICY "Admins can delete applications"
ON public.inner_circle_applications
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
