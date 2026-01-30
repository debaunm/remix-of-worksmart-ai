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
        id: 'rich-vs-wealthy-mindset',
        title: 'Rich vs Wealthy Money Mindset Reset',
        duration: '10 min',
        description: 'Design your money goals intentionally, not with a restrictive budget',
        fullDescription: `This session is about shifting your mindset from "rich" to "wealthy" — understanding the difference between chasing income and building lasting financial freedom.

You'll learn to design your money goals intentionally rather than following a restrictive budget. We focus on identifying what truly matters to you financially and creating a money philosophy that guides all your decisions.`,
        videoUrl: 'https://www.youtube.com/embed/placeholder',
        downloads: [
          { name: 'Wealthy Life Budget & Dashboard', url: 'https://docs.google.com/spreadsheets/d/1TbIBClAKLkeixJALoXaWsLDKrZSsUNvEwPx98eG5eg8/copy', type: 'Spreadsheet' },
        ],
        learnings: [
          'The mindset shift from "rich" to "wealthy"',
          'Money by design principles for intentional goal-setting',
          'How to identify your true financial priorities',
          'Creating a money philosophy that guides your decisions',
        ],
      },
      {
        id: 'build-wealth-system',
        title: 'Build Your Wealth System',
        duration: '10 min',
        description: 'Create automated money flows and financial infrastructure',
        fullDescription: `In this session, you'll learn how to create automated money flows that work for you 24/7. We cover building the financial infrastructure that supports passive wealth growth.

You'll discover automation strategies that eliminate the need for constant money management, allowing your wealth to grow systematically while you focus on what matters most.`,
        videoUrl: 'https://www.youtube.com/embed/placeholder',
        downloads: [
          { name: 'Wealthy Life Budget & Dashboard', url: 'https://docs.google.com/spreadsheets/d/1TbIBClAKLkeixJALoXaWsLDKrZSsUNvEwPx98eG5eg8/copy', type: 'Spreadsheet' },
          { name: 'The Passive Income Vault', url: 'https://docs.google.com/spreadsheets/d/1Bb_nYSgkiZMf-Bp1PA7Z-sP2dJWeqt0P-dEAs2PdYnM/copy', type: 'Spreadsheet' },
        ],
        learnings: [
          'Automation strategies for hands-off money management',
          'Building wealth infrastructure that works while you sleep',
          'Setting up passive growth systems',
          'Creating money flows that compound automatically',
        ],
      },
      {
        id: 'optimize-income-streams',
        title: 'Optimize Your Income Streams',
        duration: '10 min',
        description: 'Use skills and positioning to accelerate your wealth strategy',
        fullDescription: `This session focuses on optimizing your income potential through strategic skill positioning. You'll learn how to leverage what you already know to accelerate your wealth-building journey.

We cover income optimization techniques, skill positioning strategies, and how to create multiple income streams that align with your wealth goals.`,
        videoUrl: 'https://www.youtube.com/embed/placeholder',
        downloads: [
          { name: 'The Passive Income Vault', url: 'https://docs.google.com/spreadsheets/d/1Bb_nYSgkiZMf-Bp1PA7Z-sP2dJWeqt0P-dEAs2PdYnM/copy', type: 'Spreadsheet' },
        ],
        learnings: [
          'Income optimization techniques for faster growth',
          'Strategic skill positioning in your market',
          'Creating multiple aligned income streams',
          'Wealth acceleration through leverage',
        ],
      },
    ],
  },
  'work-systems': {
    systemType: 'work_systems',
    content: [
      {
        id: 'understanding-modern-ai',
        title: 'Understanding Modern AI',
        duration: '15 min',
        description: 'How large language models actually work and why it matters for getting better results.',
        fullDescription: `This session covers how large language models actually work and why understanding this matters for getting better results in your daily work.

You'll learn the fundamentals of modern AI systems and how to leverage this knowledge to improve your interactions with AI tools.`,
        videoUrl: 'https://player.vimeo.com/video/1160315732?badge=0&autopause=0&player_id=0&app_id=58479',
        downloads: [
          { name: 'Module 1 Slides', url: '#', type: 'PDF' },
        ],
        learnings: [
          'How large language models actually work',
          'Why understanding AI matters for better results',
          'The fundamentals of modern AI systems',
          'Practical applications for your workflow',
        ],
      },
      {
        id: 'ai-toolkit-breakdown',
        title: 'The AI Toolkit Breakdown',
        duration: '20 min',
        description: 'Deep dive into ChatGPT, Claude, and Gemini—strengths, weaknesses, and optimal use cases.',
        fullDescription: `A comprehensive comparison of the major AI tools available today. You'll learn when to use ChatGPT vs Claude vs Gemini for different tasks.

This session helps you build a strategic toolkit approach rather than using AI randomly.`,
        videoUrl: 'https://player.vimeo.com/video/1160316129?badge=0&autopause=0&player_id=0&app_id=58479',
        downloads: [
          { name: 'Module 2 Slides', url: '#', type: 'PDF' },
        ],
        learnings: [
          'ChatGPT vs Claude vs Gemini comparison',
          'Strengths and weaknesses of each AI tool',
          'Optimal use cases for each platform',
          'Building your personal AI toolkit',
        ],
      },
      {
        id: 'multi-step-flows-tech-stack',
        title: 'Multi-Step Flows & AI Tech Stack',
        duration: '35 min',
        description: 'Build automated workflows that run 24/7 and create systems that compound your productivity.',
        fullDescription: `Learn to build automated multi-step workflows using AI. This session covers creating your AI tech stack and automation strategies.

You'll discover how to create systems that compound your productivity and run 24/7.`,
        videoUrl: 'https://player.vimeo.com/video/1160318487?badge=0&autopause=0&player_id=0&app_id=58479',
        downloads: [
          { name: 'Module 3 Slides', url: '#', type: 'PDF' },
        ],
        learnings: [
          'Building multi-step AI workflows',
          'Creating your AI tech stack',
          'Automation strategies for productivity',
          'Systems that compound your output',
        ],
      },
      {
        id: 'content-creation-brand-building',
        title: 'Content Creation & Brand Building',
        duration: '45 min',
        description: 'Learn the exact workflow to ideate, create, design, edit, and distribute content that drives revenue.',
        fullDescription: `This is your complete content operation system. Learn the exact workflow to ideate, create, design, edit, and distribute content that drives revenue—not just engagement.

Master the full pipeline from writing to visuals to distribution.`,
        videoUrl: 'https://player.vimeo.com/video/1160318495?badge=0&autopause=0&player_id=0&app_id=58479',
        downloads: [
          { name: 'Module 4 Slides', url: '#', type: 'PDF' },
        ],
        learnings: [
          'The content-to-product pipeline',
          'AI voice calibration for authentic outputs',
          'Omnichannel distribution strategy',
          'Revenue-focused content creation',
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
