import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePodcastFeed } from "@/hooks/usePodcastFeed";

const Podcast = () => {
  const { episodes, channelImage, loading, error } = usePodcastFeed();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  const handlePlay = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--sky))" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono text-sm uppercase tracking-widest mb-6" style={{ color: "hsl(var(--slate-bg))" }}>
                The WorkSmart Podcast
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: "hsl(var(--slate-bg))" }}>
                Real strategy for business owners doing it their way. No fluff. No hype.
              </h1>
              <p className="text-[17px] leading-relaxed mb-10 max-w-xl" style={{ color: "hsl(var(--slate-bg) / 0.75)" }}>
                Morgan DeBaun breaks down the business strategy, AI tools, and mindset shifts that actually move the needle - for solopreneurs, small business owners, and anyone building a lean company on the path to $1M. New episodes weekly.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://podcasts.apple.com/us/podcast/the-journey-with-morgan-debaun/id1687058364" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-foreground hover:bg-foreground/90 text-white gap-2">
                    Apple Podcasts <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://open.spotify.com/show/71KTbQcRlSRPaWM5IlXkBf" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-foreground hover:bg-foreground/90 text-white gap-2">
                    Spotify <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.youtube.com/@MorganDeBaun" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full border-foreground/30 text-foreground gap-2">
                    YouTube <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center"
            >
              {channelImage ? (
                <img
                  src={channelImage}
                  alt="The Journey with Morgan DeBaun podcast cover"
                  className="w-full max-w-sm rounded-2xl shadow-lg"
                />
              ) : (
                <div className="w-full max-w-sm aspect-square rounded-2xl bg-white/20 flex items-center justify-center">
                  <span className="text-6xl">🎙️</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-24 section-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Episodes - 2/3 width */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-10">
                Latest Episodes
              </h2>

              {loading && (
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-muted rounded-2xl h-32" />
                  ))}
                </div>
              )}

              {error && (
                <p className="text-muted-foreground">Unable to load episodes. Please try again later.</p>
              )}

              <div className="space-y-5">
                {episodes.map((ep, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Play button */}
                      <button
                        onClick={() => handlePlay(i)}
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 hover:bg-primary/20 transition-colors"
                        aria-label={playingIndex === i ? `Pause ${ep.title}` : `Play ${ep.title}`}
                      >
                        {playingIndex === i ? (
                          <Pause className="w-5 h-5 text-primary" />
                        ) : (
                          <Play className="w-5 h-5 text-primary ml-0.5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-1">
                          <h3 className="text-[16px] font-bold text-foreground leading-snug line-clamp-2">
                            {ep.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{formatDate(ep.pubDate)}</span>
                          {ep.duration && (
                            <>
                              <span>·</span>
                              <span>{ep.duration}</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {ep.description}
                        </p>
                      </div>
                    </div>

                    {/* Inline audio player when playing */}
                    {playingIndex === i && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <audio
                          src={ep.audioUrl}
                          controls
                          autoPlay
                          className="w-full h-10"
                          onEnded={() => setPlayingIndex(null)}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Newsletter signup */}
                <div className="bg-card border border-border rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Get smarter every week
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    Weekly insights on business, AI, and the future of work. Free. No spam.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90 text-white">
                      Subscribe
                    </Button>
                  </form>
                </div>

                {/* Community CTA */}
                <div className="bg-card border border-border rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Join the Community
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    Connect with business owners who are building alongside you. Free to join.
                  </p>
                  <a href="https://www.patreon.com/MorganDeBaun" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full rounded-full gap-2">
                      Join Free on Patreon <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
