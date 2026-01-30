import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Lock, Mail, Users, Rocket, Sparkles, Compass, TrendingUp, Eye } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAllPromptsGrouped, PromptPack, Prompt } from "@/hooks/usePromptPacks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

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
  // Filter out Content Creation - only available with Media Company course
  const filteredPacks = packs?.filter(p => p.slug !== "content-creation");
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const getSelectedPack = () => filteredPacks?.find(p => p.id === selectedPackId);

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
              Included with Your Purchase
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Prompt Library
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Expert-crafted prompts for executives, founders, and high performers. 
              Access these prompts through your course or system purchase.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{filteredPacks?.reduce((acc, p) => acc + (p.prompts?.length || 0), 0) || 0} prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>{filteredPacks?.length || 0} bundles</span>
              </div>
            </div>

            {/* Access CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  Access in Dashboard
                </Button>
              </Link>
              <Link to="/work-systems">
                <Button variant="outline" size="lg">
                  View Work Systems
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pack Cards Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Available Prompt Bundles</h2>
            <p className="text-muted-foreground">
              Preview what's included with your purchase
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
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
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Included
                          </Badge>
                        </div>
                        
                        {/* Action Button */}
                        <Button
                          variant="outline"
                          onClick={() => handlePreviewClick(pack.id)}
                          className="w-full"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Prompts
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* How to Access Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">How to Access Your Prompts</h2>
          <p className="text-muted-foreground mb-8">
            Prompt bundles are included with your system or course purchase
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <h3 className="font-semibold mb-2">Purchase a System</h3>
              <p className="text-sm text-muted-foreground">
                Get Work Systems, Money Systems, or the Media Company course
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <h3 className="font-semibold mb-2">Access Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Log in and go to your dashboard to see included prompts
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <h3 className="font-semibold mb-2">Copy & Use</h3>
              <p className="text-sm text-muted-foreground">
                Click any prompt to copy it and paste into your AI tool
              </p>
            </Card>
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
                        {selectedPack.prompts?.length || 0} prompts • Preview only
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
                                {prompt.prompt_text.slice(0, 100) + "..."}
                              </p>
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex items-end justify-center pb-1">
                                <Lock className="h-3 w-3 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="pt-4 border-t border-border/50">
                  <Link to="/work-systems" className="block">
                    <Button className="w-full" size="lg">
                      Get Full Access
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Included with Work Systems, Money Systems, or Media Company course
                  </p>
                </div>
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
