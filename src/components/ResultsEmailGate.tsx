import { useState } from "react";
import { Mail, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ResultsEmailGateProps {
  toolName: string;
  onEmailSubmitted: (email: string) => void;
  children: React.ReactNode;
  hasSubmittedEmail: boolean;
  hasResults: boolean;
}

const ResultsEmailGate = ({ 
  toolName, 
  onEmailSubmitted, 
  children, 
  hasSubmittedEmail,
  hasResults
}: ResultsEmailGateProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [agreedToMarketing, setAgreedToMarketing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const storedEmails = JSON.parse(localStorage.getItem("worksmart_emails") || "[]");
      storedEmails.push({
        email,
        firstName,
        toolName,
        agreedToMarketing,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("worksmart_emails", JSON.stringify(storedEmails));
      localStorage.setItem("worksmart_user_email", email);
      
      toast.success("You're all set! Here are your results.");
      onEmailSubmitted(email);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user already submitted email, show results
  if (hasSubmittedEmail) {
    return <>{children}</>;
  }

  // If no results yet, don't show anything
  if (!hasResults) {
    return null;
  }

  // Results are ready but email not submitted - show gate
  return (
    <div className="py-8 relative">
      {/* Blurred preview of results behind the gate */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blur-md opacity-40 select-none" aria-hidden="true">
          {children}
        </div>
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </div>

      {/* Email capture card */}
      <Card className="relative z-10 w-full max-w-md mx-auto border-primary/20 shadow-xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Your Results Are Ready!</CardTitle>
            <CardDescription className="text-base mt-2">
              Enter your email to unlock your personalized {toolName} results.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name (optional)</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="marketing"
                checked={agreedToMarketing}
                onCheckedChange={(checked) => setAgreedToMarketing(checked as boolean)}
              />
              <Label 
                htmlFor="marketing" 
                className="text-sm text-muted-foreground cursor-pointer leading-tight"
              >
                Send me weekly AI tips & exclusive tool updates
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-4" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Unlocking..." : "Get My Results"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <Lock className="w-3 h-3" />
              <span>No spam. Unsubscribe anytime.</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsEmailGate;
