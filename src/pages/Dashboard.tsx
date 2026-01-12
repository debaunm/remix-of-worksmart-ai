import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Sparkles, 
  Wrench, 
  BookOpen, 
  TrendingUp,
  Clock,
  ArrowRight,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickActions = [
    {
      title: "AI Tools",
      description: "Access your AI-powered productivity tools",
      icon: Wrench,
      href: "/advisors",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Deep-Dive Sessions",
      description: "Continue your operator training",
      icon: BookOpen,
      href: "/sessions",
      color: "bg-emerald-500/10 text-emerald-500"
    },
    {
      title: "Money Systems",
      description: "Build wealth like a CFO",
      icon: TrendingUp,
      href: "/money-systems",
      color: "bg-amber-500/10 text-amber-500"
    },
    {
      title: "Work Systems",
      description: "Run your business like a CEO",
      icon: Settings,
      href: "/work-systems",
      color: "bg-blue-500/10 text-blue-500"
    }
  ];

  const recentTools = [
    { name: "Decision Helper", href: "/tools/decision-helper" },
    { name: "Weekly Plan Builder", href: "/tools/weekly-plan-builder" },
    { name: "Brand Voice Generator", href: "/tools/brand-voice-generator" },
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
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back{user.user_metadata?.display_name ? `, ${user.user_metadata.display_name}` : ''}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.title} to={action.href}>
                  <Card className="h-full hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Popular Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Popular Tools
                  </CardTitle>
                  <CardDescription>
                    Jump back into your most-used AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTools.map((tool) => (
                      <Link key={tool.name} to={tool.href}>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Wrench className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to="/advisors" className="block mt-4">
                    <Button variant="outline" className="w-full">
                      View All Tools
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-accent/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Plan</span>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upgrade to All Access for unlimited tools and systems.
                    </p>
                  </div>
                  
                  <Link to="/pricing" className="block">
                    <Button variant="hero" className="w-full">
                      Upgrade to All Access
                    </Button>
                  </Link>

                  <Link to="/settings" className="block">
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </Link>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
