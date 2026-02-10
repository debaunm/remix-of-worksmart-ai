import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Target, 
  Calendar,
  Share2,
  CheckCircle2,
  Clock,
  Briefcase,
  Users,
  Mail,
  FileText,
  Phone,
  BarChart3,
  PieChart,
  Rocket
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  quarterlyGoal: string;
  milestones: { text: string; completed: boolean }[];
  ceoTasks: string[];
  operatingTasks: string[];
  weeklyHours: number;
  ceoPercentage: number;
  connectedTools: string[];
}

const defaultTasks = [
  { id: "strategy", label: "Strategy & Vision", icon: Target, defaultCEO: true },
  { id: "content", label: "Content Creation", icon: FileText, defaultCEO: true },
  { id: "bizdev", label: "Business Development", icon: BarChart3, defaultCEO: true },
  { id: "client-calls", label: "Client Calls", icon: Phone, defaultCEO: false },
  { id: "admin", label: "Admin & Invoicing", icon: Mail, defaultCEO: false },
  { id: "team", label: "Team Management", icon: Users, defaultCEO: false },
];

const availableTools = [
  { id: "google-calendar", label: "Google Calendar", icon: Calendar, description: "Coming soon", comingSoon: true },
  { id: "linkedin", label: "LinkedIn", icon: Share2, description: "Track professional content", comingSoon: false },
  { id: "twitter", label: "X (Twitter)", icon: Share2, description: "Monitor social presence", comingSoon: false },
  { id: "instagram", label: "Instagram", icon: Share2, description: "Track visual content", comingSoon: false },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    quarterlyGoal: "",
    milestones: [
      { text: "", completed: false },
      { text: "", completed: false },
      { text: "", completed: false },
    ],
    ceoTasks: defaultTasks.filter(t => t.defaultCEO).map(t => t.id),
    operatingTasks: defaultTasks.filter(t => !t.defaultCEO).map(t => t.id),
    weeklyHours: 40,
    ceoPercentage: 50,
    connectedTools: [],
  });

  const totalSteps = 6; // 5 steps + success screen
  const progress = currentStep === 5 ? 100 : ((currentStep) / (totalSteps - 1)) * 100;

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleNext = async () => {
    if (currentStep < totalSteps - 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalSteps - 2) {
      // Save to database
      await saveOnboardingData();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveOnboardingData = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("user_onboarding")
        .upsert({
          user_id: user.id,
          quarterly_goal: data.quarterlyGoal,
          milestones: data.milestones,
          ceo_tasks: data.ceoTasks,
          operating_tasks: data.operatingTasks,
          weekly_hours: data.weeklyHours,
          ceo_percentage: data.ceoPercentage,
          connected_tools: data.connectedTools,
          onboarding_completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setShowConfetti(true);
      setCurrentStep(5); // Success screen
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateMilestone = (index: number, text: string) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => 
        i === index ? { ...m, text } : m
      ),
    }));
  };

  const toggleTask = (taskId: string) => {
    setData(prev => {
      const isCEO = prev.ceoTasks.includes(taskId);
      if (isCEO) {
        return {
          ...prev,
          ceoTasks: prev.ceoTasks.filter(t => t !== taskId),
          operatingTasks: [...prev.operatingTasks, taskId],
        };
      } else {
        return {
          ...prev,
          operatingTasks: prev.operatingTasks.filter(t => t !== taskId),
          ceoTasks: [...prev.ceoTasks, taskId],
        };
      }
    });
  };

  const toggleTool = (toolId: string) => {
    setData(prev => ({
      ...prev,
      connectedTools: prev.connectedTools.includes(toolId)
        ? prev.connectedTools.filter(t => t !== toolId)
        : [...prev.connectedTools, toolId],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Welcome step
      case 1:
        return data.quarterlyGoal.trim().length > 0;
      case 2:
        return true; // Task categorization always valid
      case 3:
        return true; // Sliders always valid
      case 4:
        return true; // Tools optional
      default:
        return true;
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  // Calculate pie chart segments
  const ceoHours = (data.weeklyHours * data.ceoPercentage) / 100;
  const operatingHours = data.weeklyHours - ceoHours;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['hsl(var(--primary))', 'hsl(var(--tier-executive))', 'hsl(var(--success-green))', 'hsl(var(--accent))'][Math.floor(Math.random() * 4)],
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ 
                y: window.innerHeight + 20, 
                opacity: 0,
                rotate: Math.random() * 360,
                x: (Math.random() - 0.5) * 200
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Header with Progress */}
      {currentStep < 5 && (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {totalSteps - 1}
              </span>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now
              </button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Welcome to WorkSmart
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                    Let's set up your CEO command center. We'll help you define your goals, 
                    categorize your work, and optimize your time.
                  </p>
                </div>
                <Button 
                  size="xl" 
                  onClick={handleNext}
                  className="gap-2 mt-4"
                >
                  Let's Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Step 1: Goal Setting */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Set Your Quarterly Goal
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    What's the one big thing you want to achieve this quarter?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {[
                      "Grow my business",
                      "Build multiple income streams",
                      "Scale as a solopreneur",
                      "Land more clients",
                      "Launch a new offer",
                      "Automate my workflows",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, quarterlyGoal: suggestion }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          data.quarterlyGoal === suggestion
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Card className="max-w-lg mx-auto">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="quarterly-goal" className="text-base font-medium">
                        Quarterly Goal
                      </Label>
                      <Input
                        id="quarterly-goal"
                        placeholder="e.g., Land 5 new freelance clients and hit $10K/month"
                        value={data.quarterlyGoal}
                        onChange={(e) => setData(prev => ({ ...prev, quarterlyGoal: e.target.value }))}
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-medium">
                        Key Milestones (3)
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Break down your goal into 3 measurable milestones
                      </p>
                      {data.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                            {index + 1}
                          </div>
                          <Input
                            placeholder={`Milestone ${index + 1}`}
                            value={milestone.text}
                            onChange={(e) => updateMilestone(index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Growth vs Day-to-Day Tasks */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Growth Work vs Day-to-Day
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Separate the work that <strong>grows</strong> your business from the work that <strong>runs</strong> it. 
                    Toggle each task to where it fits for you.
                  </p>
                </div>

                <Card className="max-w-lg mx-auto">
                  <CardContent className="p-6">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4 px-2">
                      <span className="text-primary">🚀 Growth Work</span>
                      <span>⚙️ Day-to-Day</span>
                    </div>
                    <div className="space-y-3">
                      {defaultTasks.map((task) => {
                        const Icon = task.icon;
                        const isCEO = data.ceoTasks.includes(task.id);
                        return (
                          <div 
                            key={task.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                              isCEO 
                                ? "bg-primary/5 border-primary/20" 
                                : "bg-muted/50 border-border"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-5 h-5 ${isCEO ? "text-primary" : "text-muted-foreground"}`} />
                              <span className={isCEO ? "font-medium text-foreground" : "text-muted-foreground"}>
                                {task.label}
                              </span>
                            </div>
                            <Switch
                              checked={isCEO}
                              onCheckedChange={() => toggleTask(task.id)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Time Goals */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Set Your Time Goals
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    How do you want to spend your work hours?
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-base font-medium">Weekly Hours</Label>
                          <span className="text-2xl font-bold text-primary">{data.weeklyHours}h</span>
                        </div>
                        <Slider
                          value={[data.weeklyHours]}
                          onValueChange={(value) => setData(prev => ({ ...prev, weeklyHours: value[0] }))}
                          min={10}
                          max={80}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>10h</span>
                          <span>80h</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-base font-medium">CEO Time %</Label>
                          <span className="text-2xl font-bold text-primary">{data.ceoPercentage}%</span>
                        </div>
                        <Slider
                          value={[data.ceoPercentage]}
                          onValueChange={(value) => setData(prev => ({ ...prev, ceoPercentage: value[0] }))}
                          min={10}
                          max={90}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>10% CEO</span>
                          <span>90% CEO</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pie Chart Visualization */}
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                          {/* CEO Portion */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="hsl(var(--primary))"
                            strokeWidth="20"
                            strokeDasharray={`${data.ceoPercentage * 2.51} ${251 - data.ceoPercentage * 2.51}`}
                          />
                          {/* Operating Portion */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="hsl(var(--muted))"
                            strokeWidth="20"
                            strokeDasharray={`${(100 - data.ceoPercentage) * 2.51} ${251 - (100 - data.ceoPercentage) * 2.51}`}
                            strokeDashoffset={`${-data.ceoPercentage * 2.51}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <PieChart className="w-6 h-6 text-muted-foreground mb-1" />
                          <span className="text-sm font-medium text-muted-foreground">Weekly Split</span>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 text-center">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span>CEO Work: <strong>{ceoHours.toFixed(0)}h</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-muted" />
                          <span>Operating: <strong>{operatingHours.toFixed(0)}h</strong></span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 4: Connect Tools */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Share2 className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Connect Your Tools
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Select the tools you'd like to integrate (you can always add more later)
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {availableTools.map((tool) => {
                    const Icon = tool.icon;
                    const isConnected = data.connectedTools.includes(tool.id);
                    return (
                      <button
                        key={tool.id}
                        onClick={() => !tool.comingSoon && toggleTool(tool.id)}
                        disabled={tool.comingSoon}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          tool.comingSoon
                            ? "border-border bg-muted/30 opacity-60 cursor-not-allowed"
                            : isConnected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            isConnected ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className={`font-medium block ${
                              isConnected ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {tool.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {tool.comingSoon ? "🔜 Coming soon" : tool.description}
                            </span>
                          </div>
                        </div>
                        {isConnected && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                            <CheckCircle2 className="w-3 h-3" />
                            Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Don't worry, you can skip this and connect tools later from your dashboard.
                </p>
              </div>
            )}

            {/* Step 5: Success Screen */}
            {currentStep === 5 && (
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-24 h-24 bg-success-green/20 rounded-full flex items-center justify-center mx-auto"
                >
                  <Rocket className="w-12 h-12 text-success-green" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    You're All Set! 🎉
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    Your CEO command center is ready. Let's start working smarter.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="max-w-md mx-auto">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-left">
                        <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0" />
                        <span className="text-muted-foreground">Quarterly goal set</span>
                      </div>
                      <div className="flex items-center gap-3 text-left">
                        <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0" />
                        <span className="text-muted-foreground">Task categories defined</span>
                      </div>
                      <div className="flex items-center gap-3 text-left">
                        <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0" />
                        <span className="text-muted-foreground">Time allocation planned ({data.ceoPercentage}% CEO time)</span>
                      </div>
                      {data.connectedTools.length > 0 && (
                        <div className="flex items-center gap-3 text-left">
                          <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0" />
                          <span className="text-muted-foreground">{data.connectedTools.length} tool(s) selected</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button 
                    size="xl" 
                    onClick={() => navigate("/dashboard")}
                    className="gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with Navigation */}
      {currentStep > 0 && currentStep < 5 && (
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
          <div className="container max-w-3xl mx-auto px-4 py-4 flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                "Saving..."
              ) : currentStep === 4 ? (
                <>
                  Complete Setup
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Onboarding;
