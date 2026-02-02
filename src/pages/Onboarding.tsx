import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Target, 
  Briefcase, 
  DollarSign,
  Brain,
  CheckCircle2
} from "lucide-react";

interface OnboardingData {
  name: string;
  role: string;
  goals: string[];
  interests: string[];
}

const goals = [
  { id: "financial-freedom", label: "Achieve Financial Freedom", icon: DollarSign },
  { id: "scale-business", label: "Scale My Business", icon: Briefcase },
  { id: "work-smarter", label: "Work Smarter with AI", icon: Brain },
  { id: "build-wealth", label: "Build Long-term Wealth", icon: Target },
];

const interests = [
  { id: "ai-tools", label: "AI Tools & Automation" },
  { id: "investing", label: "Investing & Wealth Building" },
  { id: "leadership", label: "Leadership & Management" },
  { id: "productivity", label: "Productivity Systems" },
  { id: "content-creation", label: "Content Creation" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    role: "",
    goals: [],
    interests: [],
  });

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem("onboarding_complete", "true");
      localStorage.setItem("onboarding_data", JSON.stringify(data));
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleGoal = (goalId: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const toggleInterest = (interestId: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Welcome step
      case 1:
        return data.name.trim().length > 0;
      case 2:
        return data.goals.length > 0;
      case 3:
        return data.interests.length > 0;
      default:
        return true;
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Progress */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

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
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Welcome to WorkSmart
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    Let's personalize your experience so you can get the most out of our AI-powered tools and resources.
                  </p>
                </div>
                <Card className="max-w-md mx-auto">
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Access personalized AI tools</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Get tailored recommendations</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Track your progress</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold text-foreground">
                    Tell us about yourself
                  </h1>
                  <p className="text-muted-foreground">
                    This helps us customize your experience.
                  </p>
                </div>
                <Card className="max-w-md mx-auto">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">What should we call you?</Label>
                      <Input
                        id="name"
                        placeholder="Your first name"
                        value={data.name}
                        onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">What best describes your role?</Label>
                      <Input
                        id="role"
                        placeholder="e.g., Entrepreneur, Executive, Creator"
                        value={data.role}
                        onChange={(e) => setData(prev => ({ ...prev, role: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold text-foreground">
                    What are your main goals?
                  </h1>
                  <p className="text-muted-foreground">
                    Select all that apply. We'll help you get there.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {goals.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = data.goals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`font-medium ${
                            isSelected ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {goal.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold text-foreground">
                    What topics interest you?
                  </h1>
                  <p className="text-muted-foreground">
                    Pick at least one to personalize your dashboard.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                  {interests.map((interest) => {
                    const isSelected = data.interests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`px-4 py-2 rounded-full border-2 transition-all font-medium ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50 bg-card text-muted-foreground"
                        }`}
                      >
                        {interest.label}
                      </button>
                    );
                  })}
                </div>
                
                {data.name && (
                  <div className="text-center pt-4">
                    <p className="text-muted-foreground">
                      Looking good, <span className="text-foreground font-medium">{data.name}</span>! You're almost ready.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with Navigation */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {currentStep === totalSteps - 1 ? "Get Started" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
