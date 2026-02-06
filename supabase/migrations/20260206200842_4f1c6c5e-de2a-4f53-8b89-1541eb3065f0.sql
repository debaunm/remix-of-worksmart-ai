-- Drop the restrictive SELECT policy on profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create a new policy allowing all authenticated users to view profiles
-- This is needed for community features to show author names/avatars
CREATE POLICY "Authenticated users can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Note: INSERT and UPDATE policies remain restricted to own profile only