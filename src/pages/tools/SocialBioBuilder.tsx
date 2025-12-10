import { useState } from "react";
import { ArrowLeft, User, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import ResultsEmailGate from "@/components/ResultsEmailGate";
import { useEmailGate } from "@/hooks/useEmailGate";

const SocialBioBuilder = () => {
  const [role, setRole] = useState("");
  const [expertise, setExpertise] = useState("");
  const [achievements, setAchievements] = useState("");
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [desiredAction, setDesiredAction] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("social_bio_builder");
  const { hasSubmittedEmail, handleEmailSubmitted } = useEmailGate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      toast.error("Please enter your role");
      return;
    }

    await execute({
      role,
      expertise,
      achievements,
      personality_traits: personalityTraits,
      desired_action: desiredAction,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const data = result as Record<string, unknown> | null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Social Bio Builder</h1>
            <p className="text-muted-foreground">Create optimized bios for all your social platforms</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Your Role *</Label>
              <Input id="role" placeholder="e.g., Founder, Coach, Designer" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise">Expertise Area</Label>
              <Input id="expertise" placeholder="e.g., AI automation, personal branding" value={expertise} onChange={(e) => setExpertise(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements & Proof Points</Label>
            <Textarea id="achievements" placeholder="List 3-5 achievements..." value={achievements} onChange={(e) => setAchievements(e.target.value)} className="min-h-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personalityTraits">Personality Traits</Label>
              <Input id="personalityTraits" placeholder="3 words describing how you show up online" value={personalityTraits} onChange={(e) => setPersonalityTraits(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredAction">Desired Action</Label>
              <Input id="desiredAction" placeholder="What do you want people to do?" value={desiredAction} onChange={(e) => setDesiredAction(e.target.value)} />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Building your bios...</> : "Build My Bios"}
          </Button>
        </form>

        <ResultsEmailGate 
          toolName="Social Bio Builder" 
          onEmailSubmitted={handleEmailSubmitted}
          hasSubmittedEmail={hasSubmittedEmail}
          hasResults={!!data}
        >
          {data && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Your Platform Bios</h2>

              <div className="grid gap-4 md:grid-cols-2">
                {data.instagram_bio && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">📸 Instagram</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.instagram_bio as string, "instagram")}>
                        {copiedField === "instagram" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </CardHeader>
                    <CardContent><p className="text-foreground whitespace-pre-wrap">{data.instagram_bio as string}</p></CardContent>
                  </Card>
                )}
                {data.tiktok_bio && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">🎵 TikTok</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.tiktok_bio as string, "tiktok")}>
                        {copiedField === "tiktok" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </CardHeader>
                    <CardContent><p className="text-foreground whitespace-pre-wrap">{data.tiktok_bio as string}</p></CardContent>
                  </Card>
                )}
              </div>

              {data.linkedin_about && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">💼 LinkedIn About</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.linkedin_about as string, "linkedin")}>
                      {copiedField === "linkedin" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent><p className="text-foreground whitespace-pre-wrap">{data.linkedin_about as string}</p></CardContent>
                </Card>
              )}

              {data.website_about && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">🌐 Website About</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.website_about as string, "website")}>
                      {copiedField === "website" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent><p className="text-foreground whitespace-pre-wrap">{data.website_about as string}</p></CardContent>
                </Card>
              )}
            </div>
          )}
        </ResultsEmailGate>
      </div>
    </div>
  );
};

export default SocialBioBuilder;
