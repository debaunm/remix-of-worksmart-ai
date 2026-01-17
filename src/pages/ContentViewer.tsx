import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/usePurchases";
import { 
  ArrowLeft,
  Play,
  Download,
  FileText,
  Clock,
  CheckCircle,
  Lock,
  Video,
  BookOpen
} from "lucide-react";

// Content data structure
interface ContentItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  fullDescription: string;
  videoUrl: string;
  downloads: { name: string; url: string; type: string }[];
  learnings: string[];
}

interface ContentData {
  [key: string]: {
    systemType: 'money_systems' | 'work_systems';
    content: ContentItem[];
  };
}

const contentData: ContentData = {
  'money-systems': {
    systemType: 'money_systems',
    content: [
      {
        id: 'understanding-financial-picture',
        title: 'Understanding Your Financial Picture',
        duration: '45 min',
        description: 'Learn to read and interpret your complete financial dashboard',
        fullDescription: `In this comprehensive session, you'll learn how to take a complete inventory of your financial life. We cover everything from organizing your accounts, understanding your cash flow patterns, to identifying the key metrics that matter for your wealth-building journey.

You'll walk away with a clear understanding of where you stand financially and a framework for tracking your progress over time.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        downloads: [
          { name: 'Financial Picture Worksheet', url: '#', type: 'PDF' },
          { name: 'Account Inventory Template', url: '#', type: 'Excel' },
        ],
        learnings: [
          'How to organize all your financial accounts in one place',
          'Understanding your true cash flow (income vs. expenses)',
          'Key metrics to track for wealth building',
          'Setting up your personal financial dashboard',
        ],
      },
      {
        id: 'wealth-tracking-system',
        title: 'Building Your Wealth Tracking System',
        duration: '60 min',
        description: 'Set up automated tracking for net worth, cash flow, and goals',
        fullDescription: `This session dives deep into building a sustainable system for tracking your wealth. You'll learn how to set up automated tracking that takes minutes per month instead of hours.

We'll cover the tools and techniques that make wealth tracking effortless, including how to connect your accounts, set up alerts, and create visualizations that keep you motivated.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        downloads: [
          { name: 'Wealth Tracking Setup Guide', url: '#', type: 'PDF' },
          { name: 'Net Worth Calculator Spreadsheet', url: '#', type: 'Excel' },
          { name: 'Monthly Check-in Template', url: '#', type: 'PDF' },
        ],
        learnings: [
          'Setting up automated account connections',
          'Creating a net worth tracking system',
          'Building monthly financial check-in rituals',
          'Visualization techniques for motivation',
        ],
      },
      {
        id: 'investment-portfolio-strategy',
        title: 'Investment Portfolio Strategy',
        duration: '55 min',
        description: 'Create a diversified portfolio aligned with your timeline',
        fullDescription: `Learn the fundamentals of building an investment portfolio that matches your goals, risk tolerance, and timeline. This session covers asset allocation, diversification strategies, and how to think about investments for the long term.

Whether you're just starting or looking to optimize your existing portfolio, this session provides actionable frameworks you can implement immediately.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        downloads: [
          { name: 'Portfolio Allocation Guide', url: '#', type: 'PDF' },
          { name: 'Risk Tolerance Assessment', url: '#', type: 'PDF' },
          { name: 'Investment Checklist', url: '#', type: 'PDF' },
        ],
        learnings: [
          'Understanding asset allocation principles',
          'How to diversify across asset classes',
          'Matching investments to your timeline',
          'Rebalancing strategies and frequency',
        ],
      },
    ],
  },
  'work-systems': {
    systemType: 'work_systems',
    content: [
      {
        id: 'ceo-weekly-planning',
        title: 'CEO Weekly Planning System',
        duration: '50 min',
        description: 'Structure your week for maximum impact and energy',
        fullDescription: `Discover how top executives structure their weeks for maximum impact. This session reveals the weekly planning system that helps you focus on what matters most while protecting your energy.

You'll learn how to batch similar tasks, protect deep work time, and create a rhythm that sustains high performance without burnout.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        downloads: [
          { name: 'CEO Weekly Planning Template', url: '#', type: 'PDF' },
          { name: 'Time Blocking Guide', url: '#', type: 'PDF' },
          { name: 'Weekly Review Checklist', url: '#', type: 'PDF' },
        ],
        learnings: [
          'The CEO weekly planning framework',
          'How to protect your deep work time',
          'Energy management throughout the week',
          'Weekly review and adjustment process',
        ],
      },
      {
        id: 'decision-frameworks',
        title: 'Decision Frameworks for Leaders',
        duration: '45 min',
        description: 'Make confident decisions with proven executive frameworks',
        fullDescription: `Learn the decision-making frameworks used by successful executives. This session covers how to evaluate options, manage decision fatigue, and make confident choices even with incomplete information.

You'll develop a personal decision-making toolkit that you can apply to everything from daily choices to major life decisions.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        downloads: [
          { name: 'Decision Matrix Template', url: '#', type: 'PDF' },
          { name: 'Reversible vs Irreversible Decisions Guide', url: '#', type: 'PDF' },
        ],
        learnings: [
          'The 10-10-10 decision framework',
          'How to identify reversible decisions',
          'Managing decision fatigue',
          'Building confidence in your choices',
        ],
      },
      {
        id: 'content-engine',
        title: 'Building Your Content Engine',
        duration: '65 min',
        description: 'Create a repeatable system for consistent content creation',
        fullDescription: `Build a content creation system that produces consistent, high-quality content without the stress. This session covers ideation, batching, repurposing, and scheduling strategies that save hours every week.

You'll leave with a complete content workflow you can implement immediately for any platform.`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        downloads: [
          { name: 'Content Calendar Template', url: '#', type: 'Excel' },
          { name: 'Content Repurposing Guide', url: '#', type: 'PDF' },
          { name: 'Batch Creation Workflow', url: '#', type: 'PDF' },
          { name: 'Platform-Specific Checklists', url: '#', type: 'PDF' },
        ],
        learnings: [
          'Content batching strategies',
          'Repurposing content across platforms',
          'Building a content calendar system',
          'Automating content distribution',
        ],
      },
    ],
  },
};

const ContentViewer = () => {
  const { systemId, contentId } = useParams<{ systemId: string; contentId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { hasMoneyAccess, hasWorkAccess, isLoading: purchasesLoading } = usePurchases();

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

  const systemData = systemId ? contentData[systemId] : null;
  
  if (!systemData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold">Content not found</h1>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasAccess = systemData.systemType === 'money_systems' ? hasMoneyAccess : hasWorkAccess;
  const content = systemData.content.find(c => c.id === contentId);

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold">Session not found</h1>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="container mx-auto max-w-3xl text-center py-20">
            <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">This content is locked</h1>
            <p className="text-muted-foreground mb-8">
              Purchase {systemData.systemType === 'money_systems' ? 'Money Systems' : 'Work Systems'} to unlock this content.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={systemData.systemType === 'money_systems' ? '/money-systems' : '/work-systems'}>
                <Button size="lg">Unlock Now</Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentIndex = systemData.content.findIndex(c => c.id === contentId);
  const prevContent = currentIndex > 0 ? systemData.content[currentIndex - 1] : null;
  const nextContent = currentIndex < systemData.content.length - 1 ? systemData.content[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Navigation */}
      <div className="pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Video & Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={content.videoUrl}
                      title={content.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </Card>
              </motion.div>

              {/* Title & Meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {content.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    {systemData.systemType === 'money_systems' ? 'Money Systems' : 'Work Systems'}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {content.title}
                </h1>
              </motion.div>

              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="w-5 h-5 text-primary" />
                      About This Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {content.fullDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      What You'll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {content.learnings.map((learning, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-between items-center pt-4"
              >
                {prevContent ? (
                  <Link to={`/content/${systemId}/${prevContent.id}`}>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous: {prevContent.title}
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                {nextContent && (
                  <Link to={`/content/${systemId}/${nextContent.id}`}>
                    <Button className="flex items-center gap-2">
                      Next: {nextContent.title}
                      <Play className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Sidebar - Downloads & Other Sessions */}
            <div className="space-y-6">
              {/* Downloads */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Download className="w-5 h-5 text-primary" />
                      Downloads & Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {content.downloads.map((download, index) => (
                      <a
                        key={index}
                        href={download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {download.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {download.type}
                          </p>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Other Sessions in this System */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Other Sessions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {systemData.content
                      .filter(c => c.id !== contentId)
                      .map((item, index) => (
                        <Link
                          key={index}
                          to={`/content/${systemId}/${item.id}`}
                          className="block"
                        >
                          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all">
                            <Play className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.duration}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContentViewer;
