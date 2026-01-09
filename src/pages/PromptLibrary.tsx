import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Lock, Mail, Users, Rocket, Sparkles, Compass, TrendingUp, ShoppingCart, Eye } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAllPromptsGrouped, PromptPack, Prompt } from "@/hooks/usePromptPacks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const PromptLibrary = () => {
  const { data: packs, isLoading } = useAllPromptsGrouped();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const isUnlocked = localStorage.getItem("prompt_library_unlocked") === "true";

  const getSelectedPack = () => packs?.find(p => p.id === selectedPackId);

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
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
              Copy & Paste AI Prompts
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Prompt Library
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Expert-crafted prompts for executives, founders, and high performers. 
              One-time purchase, lifetime access.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{packs?.reduce((acc, p) => acc + (p.prompts?.length || 0), 0) || 0} prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-primary" />
                <span>{packs?.length || 0} bundles</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pack Cards Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
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
              packs?.map((pack, index) => {
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
                        {/* Value Props */}
                        <div className="flex items-center justify-between text-sm border-t border-border/50 pt-4">
                          <span className="text-muted-foreground">
                            {promptCount} ready-to-use prompts
                          </span>
                          <span className="font-bold text-2xl text-foreground">
                            ${packPrice.toFixed(0)}
                          </span>
                        </div>
                        
                        {/* Action Buttons */}
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

export default PromptLibrary;
