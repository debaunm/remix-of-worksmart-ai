import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Lock, Mail, Users, Rocket, Sparkles, Compass, ChevronDown } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Users,
  Rocket,
  Sparkles,
  Compass,
};

const categoryColors: Record<string, string> = {
  executive: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  entrepreneur: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  life: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const PromptLibrary = () => {
  const { data: packs, isLoading } = useAllPromptsGrouped();
  const [unlockedEmails, setUnlockedEmails] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("prompt_library_emails");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [pendingPromptId, setPendingPromptId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPacks, setExpandedPacks] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const isUnlocked = localStorage.getItem("prompt_library_unlocked") === "true";

  const handleCopyClick = (prompt: Prompt) => {
    if (isUnlocked) {
      copyToClipboard(prompt);
    } else {
      setPendingPromptId(prompt.id);
      setEmailDialogOpen(true);
    }
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
      // Send to ActiveCampaign
      await supabase.functions.invoke("add-activecampaign-contact", {
        body: {
          email: email.trim(),
          toolName: "Prompt Library",
          agreedToMarketing: true,
        },
      });

      // Mark as unlocked
      localStorage.setItem("prompt_library_unlocked", "true");
      setEmailDialogOpen(false);
      
      // Copy the pending prompt
      if (pendingPromptId) {
        const prompt = packs
          ?.flatMap(p => p.prompts || [])
          .find(p => p.id === pendingPromptId);
        if (prompt) {
          copyToClipboard(prompt);
        }
      }

      toast({
        title: "Unlocked!",
        description: "You now have access to all prompts",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      // Still unlock locally even if API fails
      localStorage.setItem("prompt_library_unlocked", "true");
      setEmailDialogOpen(false);
    } finally {
      setIsSubmitting(false);
      setEmail("");
      setPendingPromptId(null);
    }
  };

  const togglePack = (packId: string) => {
    setExpandedPacks(prev => {
      const next = new Set(prev);
      if (next.has(packId)) {
        next.delete(packId);
      } else {
        next.add(packId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Free Resource
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prompt Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Copy-paste prompts for executives, founders, and life optimization. 
              Enter your email once to unlock unlimited access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Prompt Packs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardHeader>
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-96 mt-2" />
                </CardHeader>
              </Card>
            ))
          ) : (
            packs?.map((pack, index) => {
              const Icon = iconMap[pack.icon || "Sparkles"] || Sparkles;
              const isExpanded = expandedPacks.has(pack.id);
              
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible open={isExpanded} onOpenChange={() => togglePack(pack.id)}>
                    <Card className="border-border/50 overflow-hidden">
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-xl bg-primary/10">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <CardTitle className="text-xl">{pack.name}</CardTitle>
                                  <Badge 
                                    variant="outline" 
                                    className={categoryColors[pack.category || "life"]}
                                  >
                                    {pack.category}
                                  </Badge>
                                </div>
                                <CardDescription className="text-base">
                                  {pack.description}
                                </CardDescription>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {pack.prompts?.length || 0} prompts
                                </p>
                              </div>
                            </div>
                            <ChevronDown 
                              className={`h-5 w-5 text-muted-foreground transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`} 
                            />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0 space-y-4">
                          <AnimatePresence>
                            {pack.prompts?.map((prompt, promptIndex) => (
                              <motion.div
                                key={prompt.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: promptIndex * 0.05 }}
                                className="border border-border/50 rounded-lg p-4 bg-muted/20"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold mb-1">{prompt.title}</h4>
                                    {prompt.use_case && (
                                      <p className="text-sm text-muted-foreground mb-3">
                                        Use for: {prompt.use_case}
                                      </p>
                                    )}
                                    <div className="relative">
                                      <p className="text-sm text-foreground/80 font-mono bg-background/50 p-3 rounded border border-border/30">
                                        {isUnlocked 
                                          ? prompt.prompt_text 
                                          : prompt.prompt_text.slice(0, 100) + "..."}
                                      </p>
                                      {!isUnlocked && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent flex items-end justify-center pb-2">
                                          <Lock className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant={isUnlocked ? "outline" : "default"}
                                    onClick={() => handleCopyClick(prompt)}
                                    className="shrink-0"
                                  >
                                    {copiedId === prompt.id ? (
                                      <>
                                        <Check className="h-4 w-4 mr-1" />
                                        Copied
                                      </>
                                    ) : isUnlocked ? (
                                      <>
                                        <Copy className="h-4 w-4 mr-1" />
                                        Copy
                                      </>
                                    ) : (
                                      <>
                                        <Lock className="h-4 w-4 mr-1" />
                                        Unlock
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Unlock All Prompts
            </DialogTitle>
            <DialogDescription>
              Enter your email to get instant access to our entire prompt library. 
              No spam, just useful AI resources.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !email.trim()}
            >
              {isSubmitting ? "Unlocking..." : "Unlock & Copy Prompt"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PromptLibrary;
