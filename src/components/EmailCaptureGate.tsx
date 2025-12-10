import { useState } from "react";
import { Mail, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface EmailCaptureGateProps {
  toolName: string;
  onEmailSubmitted: (email: string) => void;
  children: React.ReactNode;
  hasSubmittedEmail: boolean;
}

const EmailCaptureGate = ({ 
  toolName, 
  onEmailSubmitted, 
  children, 
  hasSubmittedEmail 
}: EmailCaptureGateProps) => {
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
    
    // TODO: Integrate with ActiveCampaign
    // For now, just store in localStorage and proceed
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
      
      toast.success("You're all set! Enjoy your free tool.");
      onEmailSubmitted(email);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmittedEmail) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Unlock {toolName}</CardTitle>
            <CardDescription className="text-base mt-2">
              Get instant access to this free AI tool. Just enter your email below.
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
              {isSubmitting ? "Unlocking..." : "Get Free Access"}
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

export default EmailCaptureGate;
