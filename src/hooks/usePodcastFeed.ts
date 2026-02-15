import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Episode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  image: string;
}

export function usePodcastFeed() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [channelImage, setChannelImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("podcast-feed");
        if (fnError) throw fnError;
        setEpisodes(data.episodes || []);
        setChannelImage(data.channelImage || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  return { episodes, channelImage, loading, error };
}
