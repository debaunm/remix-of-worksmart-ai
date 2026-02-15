import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Episode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  image: string;
}

function extractText(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(regex);
  return match ? match[1] : "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const feedUrl = "https://feeds.libsyn.com/472383/rss";
    const response = await fetch(feedUrl);
    const xml = await response.text();

    // Extract channel-level image
    const channelImage = extractAttr(xml, "itunes:image", "href") || "";

    // Split into items
    const items = xml.split("<item>").slice(1);
    const episodes: Episode[] = items.slice(0, 20).map((item) => {
      const title = extractText(item, "title");
      // Get description - prefer itunes:summary, fall back to description
      let description = extractText(item, "itunes:summary");
      if (!description) {
        description = extractText(item, "description");
      }
      // Strip HTML tags for clean text
      description = description.replace(/<[^>]*>/g, "").trim();
      // Truncate to ~200 chars
      if (description.length > 250) {
        description = description.substring(0, 247) + "...";
      }

      const pubDate = extractText(item, "pubDate");
      const audioUrl = extractAttr(item, "enclosure", "url");
      const duration = extractText(item, "itunes:duration");
      const image = extractAttr(item, "itunes:image", "href") || channelImage;

      return { title, description, pubDate, audioUrl, duration, image };
    });

    return new Response(JSON.stringify({ episodes, channelImage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
