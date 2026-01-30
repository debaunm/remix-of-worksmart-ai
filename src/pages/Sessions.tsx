import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Play, Users, ArrowRight, Zap, Brain, Megaphone, Copy, Check, Lock, Mail, Rocket, Sparkles, Compass, TrendingUp, ShoppingCart, Eye } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useAllPromptsGrouped, Prompt } from "@/hooks/usePromptPacks";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Session {
  title: string;
  description: string;
  duration: string;
  format: "Live" | "On-Demand";
  price: string;
  icon: React.ReactNode;
  slug: string;
  complementarySystem?: {
    name: string;
    link: string;
  };
}

interface SessionCategory {
  title: string;
  icon: React.ReactNode;
  sessions: Session[];
}

const sessionCategories: SessionCategory[] = [
  {
    title: "AI Essentials",
    icon: <Brain className="w-6 h-6" />,
    sessions: [
      {
        title: "AI Agent 101",
        description: "Master the fundamentals of AI agents—how they work, when to use them, and how to leverage them to automate tasks and boost your productivity.",
        duration: "60 minutes",
        format: "On-Demand",
        price: "$49",
        icon: <Brain className="w-5 h-5" />,
        slug: "ai-agent-101",
      },
      {
        title: "Lovable 101",
        description: "Learn how to build web applications with Lovable—from idea to deployed product. No coding experience required.",
        duration: "60 minutes",
        format: "On-Demand",
        price: "$49",
        icon: <Rocket className="w-5 h-5" />,
        slug: "lovable-101",
      },
    ],
  },
];

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Users,
  Rocket,
  Sparkles,
  Compass,
  TrendingUp,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  executive: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  entrepreneur: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  life: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
};

const SessionCard = ({ session }: { session: Session }) => (
  <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          {session.icon}
        </div>
        <Badge 
          variant={session.format === "Live" ? "default" : "secondary"}
          className="shrink-0"
        >
          {session.format === "Live" ? (
            <><Users className="w-3 h-3 mr-1" /> Live</>
          ) : (
            <><Play className="w-3 h-3 mr-1" /> On-Demand</>
          )}
        </Badge>
      </div>
      <h3 className="text-xl font-semibold text-foreground mt-4 group-hover:text-primary transition-colors">
        {session.title}
      </h3>
    </CardHeader>
    <CardContent className="flex-1">
      <p className="text-muted-foreground leading-relaxed">
        {session.description}
      </p>
      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {session.duration}
        </span>
      </div>
      
      {session.complementarySystem && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <Link 
            to={session.complementarySystem.link}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            Complementary system: <span className="underline underline-offset-2">{session.complementarySystem.name}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </CardContent>
    <CardFooter className="pt-4 border-t border-border flex items-center justify-between">
      <span className="text-2xl font-bold text-foreground">{session.price}</span>
      <Link to={`/sessions/${session.slug}`}>
        <Button className="group/btn">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const Sessions = () => {
  const { data: packs, isLoading: packsLoading } = useAllPromptsGrouped();
  // Filter out Content Creation - only available with Media Company course
  const filteredPacks = packs?.filter(p => p.slug !== "content-creation");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const isUnlocked = localStorage.getItem("prompt_library_unlocked") === "true";

  const getSelectedPack = () => filteredPacks?.find(p => p.id === selectedPackId);

  const handleBuyClick = (packId: string) => {
    setSelectedPackId(packId);
    setEmailDialogOpen(true);
  };

  const handlePreviewClick = (packId: string) => {
    setSelectedPackId(packId);
    setPreviewDialogOpen(true);
  };

  const copyToClipboard = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
      setCopiedId(prompt.id);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      });
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await supabase.functions.invoke("add-activecampaign-contact", {
        body: {
          email: email.trim(),
          toolName: "Prompt Library",
          agreedToMarketing: true,
        },
      });

      localStorage.setItem("prompt_library_unlocked", "true");
      setEmailDialogOpen(false);

      toast({
        title: "Unlocked!",
        description: "You now have access to all prompts",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      localStorage.setItem("prompt_library_unlocked", "true");
      setEmailDialogOpen(false);
    } finally {
      setIsSubmitting(false);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm">
              On Demand Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Practical resources for operators who want{" "}
              <span className="text-primary">results, not theory</span>.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Sessions and prompt bundles designed to help you build, automate, and execute with AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="sessions" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="sessions" className="text-base">
                <Play className="w-4 h-4 mr-2" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="prompts" className="text-base">
                <Sparkles className="w-4 h-4 mr-2" />
                Prompt Library
              </TabsTrigger>
            </TabsList>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessionCategories.flatMap((category) =>
                  category.sessions.map((session, sessionIndex) => (
                    <motion.div
                      key={session.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: sessionIndex * 0.1 }}
                    >
                      <SessionCard session={session} />
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Prompt Library Tab */}
            <TabsContent value="prompts" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packsLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="border-border/50">
                      <CardHeader>
                        <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full mt-2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  filteredPacks?.map((pack, index) => {
                    const Icon = iconMap[pack.icon || "Sparkles"] || Sparkles;
                    const colors = categoryColors[pack.category || "life"] || categoryColors.life;
                    const packPrice = pack.price || 14.99;
                    const promptCount = pack.prompts?.length || 0;
                    
                    return (
                      <motion.div
                        key={pack.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className={`h-full flex flex-col border-2 ${colors.border} hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`p-3 rounded-xl ${colors.bg}`}>
                                <Icon className={`h-6 w-6 ${colors.text}`} />
                              </div>
                              <Badge variant="outline" className={`${colors.bg} ${colors.text} border-transparent`}>
                                {pack.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                              {pack.name}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2">
                              {pack.description}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="pt-0 mt-auto space-y-4">
                            <div className="flex items-center justify-between text-sm border-t border-border/50 pt-4">
                              <span className="text-muted-foreground">
                                {promptCount} ready-to-use prompts
                              </span>
                              <span className="font-bold text-2xl text-foreground">
                                ${packPrice.toFixed(0)}
                              </span>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreviewClick(pack.id)}
                                className="flex-1"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                              {isUnlocked ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePreviewClick(pack.id)}
                                  className="flex-1"
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  View All
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => handleBuyClick(pack.id)}
                                  className="flex-1 bg-primary hover:bg-primary/90"
                                >
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Buy Now
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to level up your execution?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Each resource is designed to give you actionable skills you can apply immediately.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh]">
          {(() => {
            const selectedPack = getSelectedPack();
            if (!selectedPack) return null;
            
            const Icon = iconMap[selectedPack.icon || "Sparkles"] || Sparkles;
            const colors = categoryColors[selectedPack.category || "life"] || categoryColors.life;
            const packPrice = selectedPack.price || 14.99;
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <DialogTitle>{selectedPack.name}</DialogTitle>
                      <DialogDescription className="mt-1">
                        {selectedPack.prompts?.length || 0} prompts • ${packPrice.toFixed(2)}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <ScrollArea className="max-h-[50vh] pr-4">
                  <div className="space-y-3">
                    {selectedPack.prompts?.map((prompt, idx) => (
                      <div
                        key={prompt.id}
                        className="border border-border/50 rounded-lg p-4 bg-muted/20"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                #{idx + 1}
                              </span>
                              <h4 className="font-semibold text-sm">{prompt.title}</h4>
                            </div>
                            {prompt.use_case && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {prompt.use_case}
                              </p>
                            )}
                            <div className="relative">
                              <p className="text-xs text-foreground/80 font-mono bg-background/50 p-2 rounded border border-border/30 line-clamp-3">
                                {isUnlocked 
                                  ? prompt.prompt_text 
                                  : prompt.prompt_text.slice(0, 80) + "..."}
                              </p>
                              {!isUnlocked && (
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex items-end justify-center pb-1">
                                  <Lock className="h-3 w-3 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                          {isUnlocked && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(prompt)}
                              className="shrink-0 h-8 w-8 p-0"
                            >
                              {copiedId === prompt.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {!isUnlocked && (
                  <div className="pt-4 border-t border-border/50">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        setPreviewDialogOpen(false);
                        setEmailDialogOpen(true);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Unlock All for ${packPrice.toFixed(2)}
                    </Button>
                  </div>
                )}
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Purchase Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {(() => {
            const selectedPack = getSelectedPack();
            const packPrice = selectedPack?.price || 14.99;
            const Icon = iconMap[selectedPack?.icon || "Sparkles"] || Sparkles;
            
            return (
              <>
                <DialogHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <DialogTitle className="text-xl">
                    {selectedPack?.name || "Prompt Bundle"}
                  </DialogTitle>
                  <DialogDescription className="space-y-2">
                    <span className="block">
                      {selectedPack?.prompts?.length || 0} expert-crafted prompts
                    </span>
                    <span className="block text-3xl font-bold text-foreground">
                      ${packPrice.toFixed(2)}
                    </span>
                    <span className="block text-xs">
                      One-time payment • Lifetime access
                    </span>
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4 mt-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="text-center"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? "Processing..." : "Complete Purchase"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                    <Lock className="h-3 w-3" />
                    Secure payment via Stripe
                  </p>
                </form>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Sessions;
