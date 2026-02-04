-- Create storage bucket for community images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('community-images', 'community-images', true);

-- Allow authenticated users to upload images (admins only based on RLS)
CREATE POLICY "Admins can upload community images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'community-images' 
  AND has_role(auth.uid(), 'admin')
);

-- Allow anyone to view community images (public bucket)
CREATE POLICY "Anyone can view community images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'community-images');

-- Allow admins to delete their uploaded images
CREATE POLICY "Admins can delete community images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'community-images' 
  AND has_role(auth.uid(), 'admin')
);