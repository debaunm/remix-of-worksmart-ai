-- Make the community-images bucket private
UPDATE storage.buckets SET public = false WHERE id = 'community-images';

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Anyone can view community images" ON storage.objects;

-- Create policy for authenticated users only
CREATE POLICY "Authenticated users can view community images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'community-images');