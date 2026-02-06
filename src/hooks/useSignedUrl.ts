import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to get a signed URL for a storage file
 * Used for private bucket access (e.g., community-images)
 */
export const useSignedUrl = (
  bucket: string,
  path: string | null | undefined,
  expiresIn: number = 3600 // 1 hour default
) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path) {
      setSignedUrl(null);
      return;
    }

    // Check if this is already a full URL (external link) vs a storage path
    if (path.startsWith("http://") || path.startsWith("https://")) {
      // For URLs that contain our Supabase storage, extract the path
      const storagePattern = `/storage/v1/object/public/${bucket}/`;
      if (path.includes(storagePattern)) {
        const storagePath = path.split(storagePattern)[1];
        if (storagePath) {
          fetchSignedUrl(storagePath);
          return;
        }
      }
      // External URL - use as is
      setSignedUrl(path);
      return;
    }

    fetchSignedUrl(path);

    async function fetchSignedUrl(filePath: string) {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: signError } = await supabase.storage
          .from(bucket)
          .createSignedUrl(filePath, expiresIn);

        if (signError) throw signError;
        setSignedUrl(data?.signedUrl || null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to get signed URL"));
        setSignedUrl(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [bucket, path, expiresIn]);

  return { signedUrl, isLoading, error };
};

/**
 * Get a signed URL directly (for one-off use)
 */
export const getSignedUrl = async (
  bucket: string,
  path: string,
  expiresIn: number = 3600
): Promise<string | null> => {
  // Check if it's already a full URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    const storagePattern = `/storage/v1/object/public/${bucket}/`;
    if (path.includes(storagePattern)) {
      const storagePath = path.split(storagePattern)[1];
      if (storagePath) {
        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(storagePath, expiresIn);
        return error ? null : data?.signedUrl || null;
      }
    }
    return path;
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  return error ? null : data?.signedUrl || null;
};
