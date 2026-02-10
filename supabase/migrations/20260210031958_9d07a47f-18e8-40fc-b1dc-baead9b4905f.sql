-- Remove the client-side INSERT policy on user_purchases
-- Purchases are already created server-side via the stripe-webhook edge function using the service role key
DROP POLICY IF EXISTS "Users can insert their own purchases" ON public.user_purchases;