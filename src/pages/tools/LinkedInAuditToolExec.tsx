import { useState } from "react";
import { ArrowLeft, Linkedin, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

const LinkedInAuditToolExec = () => {
  const [aboutSection, setAboutSection] = useState("");
  const [headline, setHeadline] = useState("");
  const [experience, setExperience] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [targetRoles, setTargetRoles] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("linkedin_audit_tool_exec");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutSection.trim() && !headline.trim()) {
      toast.error("Please provide your LinkedIn headline or About section");
      return;
    }

    await execute({
      about_section: aboutSection,
      headline,
      experience,
      career_goal: careerGoal,
      target_roles: targetRoles,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
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
            <Linkedin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">LinkedIn Audit Tool (Executive)</h1>
            <p className="text-muted-foreground">Optimize your LinkedIn for authority and strategic positioning</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="headline">Current Headline</Label>
            <Input
              id="headline"
              placeholder="Your current LinkedIn headline..."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutSection">About Section</Label>
            <Textarea
              id="aboutSection"
              placeholder="Paste your current LinkedIn About section..."
              value={aboutSection}
              onChange={(e) => setAboutSection(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Summary</Label>
            <Textarea
              id="experience"
              placeholder="Summarize your last 3-5 roles or paste your Experience entries..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="careerGoal">Career Goal</Label>
            <Input
              id="careerGoal"
              placeholder="What opportunities do you want LinkedIn to attract in the next 12-24 months?"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetRoles">Target Roles</Label>
            <Input
              id="targetRoles"
              placeholder="2-5 titles or role types you'd say 'yes' to"
              value={targetRoles}
              onChange={(e) => setTargetRoles(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Auditing your profile...
              </>
            ) : (
              "Audit My LinkedIn"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">LinkedIn Audit Results</h2>

            {data.audit_summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{data.audit_summary as string}</p>
                </CardContent>
              </Card>
            )}

            {data.rewritten_about && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Rewritten About Section</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.rewritten_about as string, "about")}>
                    {copiedField === "about" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">{data.rewritten_about as string}</p>
                </CardContent>
              </Card>
            )}

            {data.headline_options && (data.headline_options as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Headline Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(data.headline_options as string[]).map((option: string, i: number) => (
                      <li key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-foreground">{option}</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(option, `headline-${i}`)}>
                          {copiedField === `headline-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.authority_gaps && (data.authority_gaps as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Authority Gaps to Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.authority_gaps as string[]).map((gap: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-destructive font-bold">•</span>
                        <span className="text-foreground">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.content_plan_30_days && (data.content_plan_30_days as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">30-Day Content Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.content_plan_30_days as string[]).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInAuditToolExec;
