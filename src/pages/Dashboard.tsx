import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/usePurchases";
import { usePromptPackWithPrompts, Prompt } from "@/hooks/usePromptPacks";
import { 
  User, 
  Play,
  TrendingUp,
  Briefcase,
  Clock,
  ArrowRight,
  Settings,
  Lock,
  CheckCircle,
  Video,
  FileText,
  Wrench,
  Sparkles,
  Copy,
  Check
} from "lucide-react";
import ExpandableSessionCard, { SessionData } from "@/components/dashboard/ExpandableSessionCard";
import SocialMediaAnalytics from "@/components/dashboard/SocialMediaAnalytics";
import WeeklyCEOBrief from "@/components/dashboard/WeeklyCEOBrief";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { hasMoneyAccess, hasWorkAccess, hasMediaCompanyAccess, hasBothAccess, isLoading: purchasesLoading } = usePurchases();
  const { data: contentCreationPack } = usePromptPackWithPrompts("content-creation");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading || purchasesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const moneySessions: SessionData[] = [
    {
      id: "wealth-introduction",
      title: "Wealth Introduction",
      duration: "10 min",
      description: "Identify your goals and how you want to spend your money by design not a budget.",
      videoUrl: "https://player.vimeo.com/video/1160318721",
      learnings: [
        "The mindset shift from 'rich' to 'wealthy'",
        "How to design your money goals intentionally",
        "Why budgets fail and what to do instead",
      ],
      downloads: [
        { title: "Wealthy Life Budget & Dashboard", url: "https://docs.google.com/spreadsheets/d/1pRoVM2qe16wUiL4AlX85x6gLDBK1DLjs/copy" },
      ],
    },
    {
      id: "explore-your-options",
      title: "Explore Your Options",
      duration: "7 min",
      description: "Discover the different paths to building wealth and find the one that fits your lifestyle.",
      videoUrl: "https://player.vimeo.com/video/1160318713",
      learnings: [
        "Understanding different wealth-building strategies",
        "Identifying opportunities that match your skills",
        "Evaluating risk vs reward for each option",
      ],
      downloads: [
        { title: "The Passive Income Vault", url: "https://docs.google.com/spreadsheets/d/1I2cZZZoBQ29XX_kPfMATAwDIv9GyLAEE/copy" },
      ],
    },
    {
      id: "choose-your-stream",
      title: "Choose Your Stream",
      duration: "10 min",
      description: "Select and set up your primary income stream based on your unique positioning.",
      videoUrl: "https://player.vimeo.com/video/1160318757",
      learnings: [
        "How to identify your unique income opportunities",
        "Positioning yourself for higher earnings",
        "Strategies to accelerate your wealth building",
      ],
      downloads: [
        { title: "Speaker Pricing Formula", url: "https://docs.google.com/spreadsheets/d/1tGodvWyDjglJ-FhUxa4Mrw7iwsq7pEfU/copy" },
        { title: "Brand Deal Pricing Formula", url: "https://docs.google.com/spreadsheets/d/1Vfp-fkNuOW9rSX1YzBN_ZAxC0iJqzK7M/copy" },
        { title: "Services Pricing Formula", url: "https://docs.google.com/spreadsheets/d/1-l60Sl1zhq8PfjbV6OKfxvqCblq_1YjK/copy" },
      ],
    },
    {
      id: "what-to-do-with-cash-flow",
      title: "What to Do with Cash Flow",
      duration: "6 min",
      description: "Learn how to manage and allocate your income for maximum wealth growth.",
      videoUrl: "https://player.vimeo.com/video/1160318745",
      learnings: [
        "How to automate your money flows",
        "Setting up your financial infrastructure",
        "Creating systems that build wealth passively",
      ],
      downloads: [
        { title: "Wealthy Life Budget & Dashboard", url: "https://docs.google.com/spreadsheets/d/1pRoVM2qe16wUiL4AlX85x6gLDBK1DLjs/copy" },
      ],
    },
  ];

  const workSessions: SessionData[] = [
    {
      id: "understanding-modern-ai",
      title: "Understanding Modern AI",
      duration: "15 min",
      description: "How large language models actually work and why it matters for getting better results.",
      videoUrl: "https://player.vimeo.com/video/1160315732?badge=0&autopause=0&player_id=0&app_id=58479",
      learnings: [
        "How large language models actually work",
        "Why understanding AI matters for better results",
        "The fundamentals of modern AI systems",
      ],
      downloads: [
        { title: "Module 1 Slides", url: "#" },
      ],
    },
    {
      id: "ai-toolkit-breakdown",
      title: "The AI Toolkit Breakdown",
      duration: "20 min",
      description: "Deep dive into ChatGPT, Claude, and Gemini—strengths, weaknesses, and optimal use cases.",
      videoUrl: "https://player.vimeo.com/video/1160316129?badge=0&autopause=0&player_id=0&app_id=58479",
      learnings: [
        "ChatGPT vs Claude vs Gemini comparison",
        "Strengths and weaknesses of each AI tool",
        "Optimal use cases for each platform",
      ],
      downloads: [
        { title: "Module 2 Slides", url: "#" },
      ],
    },
    {
      id: "multi-step-flows-tech-stack",
      title: "Multi-Step Flows & AI Tech Stack",
      duration: "35 min",
      description: "Build automated workflows that run 24/7 and create systems that compound your productivity.",
      videoUrl: "https://player.vimeo.com/video/1160318487?badge=0&autopause=0&player_id=0&app_id=58479",
      learnings: [
        "Building multi-step AI workflows",
        "Creating your AI tech stack",
        "Automation strategies for productivity",
      ],
      downloads: [
        { title: "Module 3 Slides", url: "#" },
      ],
    },
    {
      id: "content-creation-brand-building",
      title: "Content Creation & Brand Building",
      duration: "45 min",
      description: "Learn the exact workflow to ideate, create, design, edit, and distribute content that drives revenue.",
      videoUrl: "https://player.vimeo.com/video/1160318495?badge=0&autopause=0&player_id=0&app_id=58479",
      learnings: [
        "The content-to-product pipeline",
        "AI voice calibration for authentic outputs",
        "Omnichannel distribution strategy",
      ],
      downloads: [
        { title: "Module 4 Slides", url: "#" },
      ],
    },
  ];

  const moneyTools = [
    { name: "Wealthy Life Budget & Dashboard", href: "https://docs.google.com/spreadsheets/d/1pRoVM2qe16wUiL4AlX85x6gLDBK1DLjs/copy", external: true, icon: TrendingUp },
    { name: "The Passive Income Vault", href: "https://docs.google.com/spreadsheets/d/1I2cZZZoBQ29XX_kPfMATAwDIv9GyLAEE/copy", external: true, icon: FileText },
    { name: "Speaker Pricing Formula", href: "https://docs.google.com/spreadsheets/d/1tGodvWyDjglJ-FhUxa4Mrw7iwsq7pEfU/copy", external: true, icon: FileText },
    { name: "Brand Deal Pricing Formula", href: "https://docs.google.com/spreadsheets/d/1Vfp-fkNuOW9rSX1YzBN_ZAxC0iJqzK7M/copy", external: true, icon: FileText },
    { name: "Services Pricing Formula", href: "https://docs.google.com/spreadsheets/d/1-l60Sl1zhq8PfjbV6OKfxvqCblq_1YjK/copy", external: true, icon: FileText },
  ];

  const workTools = [
    { name: "Weekly Plan Builder", href: "/tools/weekly-plan-builder", icon: Wrench },
    { name: "Brand Voice Generator", href: "/tools/brand-voice-generator", icon: Wrench },
    { name: "LinkedIn 21-Day Plan", href: "/tools/linkedin-21-day-content-plan", icon: Wrench },
  ];
  const copyPromptToClipboard = async (prompt: Prompt) => {
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
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back{user.user_metadata?.display_name ? `, ${user.user_metadata.display_name}` : ''}
                  </h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Link to="/onboarding">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Setup Wizard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Daily Priorities - CEO Brief + Social Analytics Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <WeeklyCEOBrief />
            <SocialMediaAnalytics />
          </div>

          {/* Training Content */}
          <Tabs defaultValue={hasMediaCompanyAccess ? "media" : hasWorkAccess ? "work" : "money"} className="w-full">
            <TabsList className="grid w-full max-w-lg grid-cols-3 mb-8">
              <TabsTrigger value="work" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work
                {!hasWorkAccess && <Lock className="w-3 h-3" />}
              </TabsTrigger>
              <TabsTrigger value="money" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Money
                {!hasMoneyAccess && <Lock className="w-3 h-3" />}
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Media Co
                {!hasMediaCompanyAccess && <Lock className="w-3 h-3" />}
              </TabsTrigger>
            </TabsList>

            {/* Work Systems Tab */}
            <TabsContent value="work">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Sessions */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-primary" />
                        Training Sessions
                      </CardTitle>
                      <CardDescription>
                        {hasWorkAccess 
                          ? "Watch these sessions to master your work systems"
                          : "Unlock these sessions by purchasing Work Systems"
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {workSessions.map((session, index) => (
                        <ExpandableSessionCard key={index} session={session} locked={false} />
                      ))}
                      {!hasWorkAccess && (
                        <Link to="/work-systems" className="block mt-4">
                          <Button variant="hero" className="w-full">
                            Unlock Work Systems
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Tools */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" />
                        Your Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {workTools.map((tool, index) => (
                        <Link key={index} to={hasWorkAccess ? tool.href : "#"}>
                          <div className={`flex items-center gap-3 p-3 rounded-lg border border-border ${hasWorkAccess ? 'hover:border-primary/50 hover:bg-accent/50' : 'opacity-50'} transition-all`}>
                            {hasWorkAccess ? (
                              <CheckCircle className="w-4 h-4 text-primary" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className={`text-sm ${hasWorkAccess ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {tool.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Money Systems Tab */}
            <TabsContent value="money">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Sessions */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-primary" />
                        Training Sessions
                      </CardTitle>
                      <CardDescription>
                        {hasMoneyAccess 
                          ? "Watch these sessions to master your money systems"
                          : "Unlock these sessions by purchasing Money Systems"
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {moneySessions.map((session, index) => (
                        <ExpandableSessionCard key={index} session={session} locked={false} />
                      ))}
                      {!hasMoneyAccess && (
                        <Link to="/money-systems" className="block mt-4">
                          <Button variant="hero" className="w-full">
                            Unlock Money Systems
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Tools */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" />
                        Your Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {moneyTools.map((tool, index) => {
                        const content = (
                          <div className={`flex items-center gap-3 p-3 rounded-lg border border-border ${hasMoneyAccess ? 'hover:border-primary/50 hover:bg-accent/50' : 'opacity-50'} transition-all`}>
                            {hasMoneyAccess ? (
                              <CheckCircle className="w-4 h-4 text-primary" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className={`text-sm ${hasMoneyAccess ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {tool.name}
                            </span>
                          </div>
                        );
                        
                        if (tool.external) {
                          return (
                            <a key={index} href={hasMoneyAccess ? tool.href : "#"} target="_blank" rel="noopener noreferrer">
                              {content}
                            </a>
                          );
                        }
                        return (
                          <Link key={index} to={hasMoneyAccess ? tool.href : "#"}>
                            {content}
                          </Link>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Media Company Tab */}
            <TabsContent value="media">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Content Creation Prompts */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Content Creation Prompts
                      </CardTitle>
                      <CardDescription>
                        {hasMediaCompanyAccess 
                          ? "Copy and paste these prompts to create compelling content"
                          : "Unlock these prompts by purchasing the Media Company course"
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {contentCreationPack?.prompts?.map((prompt) => (
                        <div 
                          key={prompt.id}
                          className={`p-4 rounded-lg border border-border ${hasMediaCompanyAccess ? 'hover:border-primary/50' : 'opacity-50'} transition-all`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1">{prompt.title}</h4>
                              {prompt.use_case && (
                                <p className="text-xs text-muted-foreground mb-2">{prompt.use_case}</p>
                              )}
                              {hasMediaCompanyAccess ? (
                                <p className="text-xs text-foreground/80 font-mono bg-muted/50 p-2 rounded border border-border/30 line-clamp-3">
                                  {prompt.prompt_text}
                                </p>
                              ) : (
                                <div className="relative">
                                  <p className="text-xs text-foreground/80 font-mono bg-muted/50 p-2 rounded border border-border/30 line-clamp-2 blur-sm">
                                    {prompt.prompt_text.slice(0, 100)}...
                                  </p>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                </div>
                              )}
                            </div>
                            {hasMediaCompanyAccess && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyPromptToClipboard(prompt)}
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
                      {!hasMediaCompanyAccess && (
                        <Link to="/courses/media-company" className="block mt-4">
                          <Button variant="hero" className="w-full">
                            Unlock Media Company Course
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Course Info */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-primary" />
                        Course Access
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className={`flex items-center gap-3 p-3 rounded-lg border border-border ${hasMediaCompanyAccess ? 'hover:border-primary/50 hover:bg-accent/50' : 'opacity-50'} transition-all`}>
                        {hasMediaCompanyAccess ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${hasMediaCompanyAccess ? 'text-foreground' : 'text-muted-foreground'}`}>
                          1 Person Media Company Course
                        </span>
                      </div>
                      <div className={`flex items-center gap-3 p-3 rounded-lg border border-border ${hasMediaCompanyAccess ? 'hover:border-primary/50 hover:bg-accent/50' : 'opacity-50'} transition-all`}>
                        {hasMediaCompanyAccess ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${hasMediaCompanyAccess ? 'text-foreground' : 'text-muted-foreground'}`}>
                          Content Creation Prompts ({contentCreationPack?.prompts?.length || 0})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Account Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="max-w-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <Badge variant="secondary">
                    {hasBothAccess && hasMediaCompanyAccess ? 'Full Access' :
                     hasMediaCompanyAccess ? 'Media Company' :
                     hasBothAccess ? 'Both Systems' : 
                     hasMoneyAccess ? 'Money Systems' : 
                     hasWorkAccess ? 'Work Systems' : 'Free'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <Link to="/settings" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
