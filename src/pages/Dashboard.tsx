import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/usePurchases";
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
  Wrench
} from "lucide-react";
import ExpandableSessionCard, { SessionData } from "@/components/dashboard/ExpandableSessionCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { hasMoneyAccess, hasWorkAccess, hasBothAccess, isLoading: purchasesLoading } = usePurchases();

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
      id: "rich-vs-wealthy-mindset",
      title: "Rich vs Wealthy Money Mindset Reset",
      duration: "10 min",
      description: "Identify your goals and how you want to spend your money by design not a budget.",
      videoUrl: "https://www.youtube.com/embed/placeholder",
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
      id: "build-wealth-system",
      title: "Build Your Wealth System",
      duration: "10 min",
      description: "Create automated money flows that grow your wealth while you sleep. Set up your financial infrastructure.",
      videoUrl: "https://www.youtube.com/embed/placeholder",
      learnings: [
        "How to automate your money flows",
        "Setting up your financial infrastructure",
        "Creating systems that build wealth passively",
      ],
      downloads: [
        { title: "Wealthy Life Budget & Dashboard", url: "https://docs.google.com/spreadsheets/d/1pRoVM2qe16wUiL4AlX85x6gLDBK1DLjs/copy" },
        { title: "The Passive Income Vault", url: "https://docs.google.com/spreadsheets/d/1I2cZZZoBQ29XX_kPfMATAwDIv9GyLAEE/copy" },
      ],
    },
    {
      id: "optimize-income-streams",
      title: "Optimize Your Income Streams",
      duration: "10 min",
      description: "Identify how to use your skills and unique positioning to drive more income to accelerate your wealth strategy.",
      videoUrl: "https://www.youtube.com/embed/placeholder",
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
  ];

  const workSessions: SessionData[] = [
    {
      id: "ceo-weekly-planning",
      title: "CEO Weekly Planning System",
      duration: "50 min",
      description: "Structure your week for maximum impact and energy",
      videoUrl: "https://www.youtube.com/embed/placeholder",
      learnings: [
        "How to structure your week like a CEO",
        "Energy management for peak performance",
        "Prioritization frameworks that work",
      ],
      downloads: [],
    },
    {
      id: "decision-frameworks",
      title: "Decision Frameworks for Leaders",
      duration: "45 min",
      description: "Make confident decisions with proven executive frameworks",
      videoUrl: "https://www.youtube.com/embed/placeholder",
      learnings: [
        "Proven executive decision-making frameworks",
        "How to make confident choices under pressure",
        "Avoiding decision fatigue",
      ],
      downloads: [],
    },
    {
      id: "content-engine",
      title: "Building Your Content Engine",
      duration: "65 min",
      description: "Create a repeatable system for consistent content creation",
      videoUrl: "https://www.youtube.com/embed/placeholder",
      learnings: [
        "Creating a repeatable content system",
        "Batch creation strategies",
        "Building consistency without burnout",
      ],
      downloads: [],
    },
  ];

  const moneyTools = [
    { name: "Wealthy Life Budget & Dashboard", href: "https://docs.google.com/spreadsheets/d/1pRoVM2qe16wUiL4AlX85x6gLDBK1DLjs/copy", external: true, icon: TrendingUp },
    { name: "The Passive Income Vault", href: "https://docs.google.com/spreadsheets/d/1I2cZZZoBQ29XX_kPfMATAwDIv9GyLAEE/copy", external: true, icon: FileText },
    { name: "Speaker Pricing Formula", href: "https://docs.google.com/spreadsheets/d/1tGodvWyDjglJ-FhUxa4Mrw7iwsq7pEfU/copy", external: true, icon: FileText },
    { name: "Brand Deal Pricing Formula", href: "https://docs.google.com/spreadsheets/d/1Vfp-fkNuOW9rSX1YzBN_ZAxC0iJqzK7M/copy", external: true, icon: FileText },
    { name: "Services Pricing Formula", href: "https://docs.google.com/spreadsheets/d/1-l60Sl1zhq8PfjbV6OKfxvqCblq_1YjK/copy", external: true, icon: FileText },
    { name: "Shopmy Tutorial", href: "#", external: true, icon: Video },
  ];

  const workTools = [
    { name: "Weekly Plan Builder", href: "/tools/weekly-plan-builder", icon: Wrench },
    { name: "Decision Helper", href: "/tools/decision-helper", icon: Wrench },
    { name: "Brand Voice Generator", href: "/tools/brand-voice-generator", icon: Wrench },
    { name: "LinkedIn 21-Day Plan", href: "/tools/linkedin-21-day-content-plan", icon: Wrench },
  ];


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
          </motion.div>

          {/* Main Content */}
          <Tabs defaultValue={hasWorkAccess ? "work" : "money"} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="work" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work Systems
                {!hasWorkAccess && <Lock className="w-3 h-3" />}
              </TabsTrigger>
              <TabsTrigger value="money" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Money Systems
                {!hasMoneyAccess && <Lock className="w-3 h-3" />}
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
                        <ExpandableSessionCard key={index} session={session} locked={!hasWorkAccess} />
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
                        <ExpandableSessionCard key={index} session={session} locked={!hasMoneyAccess} />
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
                    {hasBothAccess ? 'Full Access' : 
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
