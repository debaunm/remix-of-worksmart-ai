-- Create tool categories table
CREATE TABLE public.tool_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tools table
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.tool_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  route TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  badge TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Public read access policies (tools are public content)
CREATE POLICY "Anyone can view categories" 
ON public.tool_categories FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view active tools" 
ON public.tools FOR SELECT 
USING (is_active = true);

-- Create indexes for performance
CREATE INDEX idx_tools_category ON public.tools(category_id);
CREATE INDEX idx_tools_featured ON public.tools(is_featured) WHERE is_featured = true;
CREATE INDEX idx_tools_slug ON public.tools(slug);
CREATE INDEX idx_categories_slug ON public.tool_categories(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_tool_categories_updated_at
  BEFORE UPDATE ON public.tool_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON public.tools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();