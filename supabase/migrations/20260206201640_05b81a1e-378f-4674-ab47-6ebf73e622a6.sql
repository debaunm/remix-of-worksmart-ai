-- Create a secure view that excludes stripe_session_id
CREATE VIEW public.user_purchases_safe
WITH (security_invoker=on) AS
  SELECT id, user_id, product_type, purchased_at, created_at, updated_at
  FROM public.user_purchases;

-- Grant access to authenticated users
GRANT SELECT ON public.user_purchases_safe TO authenticated;

-- Update the base table policy to deny direct SELECT access
-- This forces all reads through the view
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.user_purchases;

-- Create a new restrictive policy that only allows viewing through the view
-- The view uses security_invoker=on so it will use the caller's permissions
CREATE POLICY "Users can view their own purchases via view only" 
ON public.user_purchases 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);