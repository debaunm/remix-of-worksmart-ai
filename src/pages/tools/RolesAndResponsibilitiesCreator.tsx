import { useState } from "react";
import { ArrowLeft, Users, Loader2, Copy, Check, Lightbulb, CheckCircle2, HelpCircle } from "lucide-react";
import BuyToolButton from "@/components/BuyToolButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RolesAndResponsibilitiesCreator = () => {
  const [roleName, setRoleName] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [projects, setProjects] = useState("");
  const [crossTeamPartners, setCrossTeamPartners] = useState("");
  const [successCriteria, setSuccessCriteria] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("roles_and_responsibilities_creator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim() || !responsibilities.trim()) {
      toast.error("Please provide the role name and responsibilities");
      return;
    }

    await execute({
      role_name: roleName,
      responsibilities,
      projects,
      cross_team_partners: crossTeamPartners,
      success_criteria: successCriteria,
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

        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Roles & Responsibilities Creator</h1>
              <p className="text-muted-foreground">Build RACI maps and role clarity documentation</p>
            </div>
          </div>
          <BuyToolButton toolName="Roles & Responsibilities Creator" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name *</Label>
            <Input
              id="roleName"
              placeholder="e.g., Head of Product, Marketing Manager, VP Engineering"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities *</Label>
            <Textarea
              id="responsibilities"
              placeholder="List 5-10 concrete tasks, decisions, or outcomes this role owns..."
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projects">Current Projects</Label>
            <Textarea
              id="projects"
              placeholder="Major projects or initiatives this role leads or supports..."
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crossTeamPartners">Cross-Team Partners</Label>
            <Input
              id="crossTeamPartners"
              placeholder="e.g., Sales, Product, Finance, Engineering"
              value={crossTeamPartners}
              onChange={(e) => setCrossTeamPartners(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="successCriteria">90-Day Success Criteria</Label>
            <Textarea
              id="successCriteria"
              placeholder="What would success look like for this role in 90 days?"
              value={successCriteria}
              onChange={(e) => setSuccessCriteria(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building role clarity...
              </>
            ) : (
              "Create Role Definition"
            )}
          </Button>
        </form>

        {/* Instructional Content */}
        <div className="mb-12 space-y-8">
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/30">
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg mb-2">How to Use This Tool</h3>
                <p className="text-muted-foreground">
                  This tool creates a clear, professional role definition you can use for hiring, performance reviews, onboarding, or team alignment. If you're not familiar with RACI or role clarity work, here's the simple breakdown.
                </p>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="role-name" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                  Start With the Role Name
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">This should match what you'd post on a job description or assign internally.</p>
                <p className="font-medium text-foreground mb-2">Examples:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Head of Product</li>
                  <li>• Marketing Manager</li>
                  <li>• Project Coordinator</li>
                  <li>• Executive Assistant</li>
                </ul>
                <p className="mt-3 text-sm italic">Pick the name that reflects the core responsibility, not the person currently doing the work.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="responsibilities" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                  Responsibilities
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">Think of this as the "non-negotiable list." These are the 5–10 things this role <em>owns</em>, not just things the person occasionally helps with.</p>
                <p className="font-medium text-foreground mb-2">A strong responsibility begins with a verb:</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Lead", "Manage", "Own", "Develop", "Execute", "Analyze", "Deliver"].map((verb) => (
                    <span key={verb} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">{verb}</span>
                  ))}
                </div>
                <p className="font-medium text-foreground mb-2">Example:</p>
                <p className="bg-card p-3 rounded-lg border border-border/50 italic">"Own the quarterly product roadmap and prioritize features across teams."</p>
                <p className="mt-3 text-sm">
                  <strong>Tip:</strong> If everything feels fuzzy, ask yourself: <em>What does success in this role look like on a normal Tuesday?</em> Include those tasks.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                  Current Projects
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">These are temporary or long-running initiatives the role is actively responsible for.</p>
                <p className="font-medium text-foreground mb-2">Examples:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Launching the Q2 marketing campaign</li>
                  <li>• Managing the website redesign</li>
                  <li>• Overseeing annual audit prep</li>
                  <li>• Building the internal AI agent system</li>
                </ul>
                <p className="mt-3 text-sm italic">This helps the final document show what the role is doing now, not just what it's supposed to do in theory.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="partners" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
                  Cross-Team Partners
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">No role exists alone. This section identifies who this person works with most and how often.</p>
                <p className="font-medium text-foreground mb-2">Examples:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Sales for campaign alignment</li>
                  <li>• Engineering for sprint planning</li>
                  <li>• Finance for budget tracking</li>
                  <li>• People Ops for hiring workflows</li>
                </ul>
                <p className="mt-3 text-sm italic">This reduces communication gaps and makes collaboration expectations clear.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="success" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">5</span>
                  90-Day Success Criteria
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">This is one of the most valuable sections. It outlines exactly what "good" looks like in the first 90 days.</p>
                <p className="font-medium text-foreground mb-2">These should be measurable outcomes or clear checkpoints:</p>
                <ul className="space-y-1 ml-4">
                  <li>• "Implement a weekly reporting dashboard."</li>
                  <li>• "Develop a Q1 hiring plan."</li>
                  <li>• "Identify and fix top 3 workflow bottlenecks."</li>
                </ul>
                <p className="mt-3 text-sm">
                  <strong>Tip:</strong> If you're stuck, think: <em>If this role started tomorrow, what would I want them to accomplish by the end of their first three months?</em>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="raci" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">6</span>
                  RACI (Optional Advanced Clarity)
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">RACI gives structure to decisions and responsibilities within projects:</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <p className="font-semibold text-foreground">R — Responsible</p>
                    <p className="text-sm">The doer</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <p className="font-semibold text-foreground">A — Accountable</p>
                    <p className="text-sm">The owner / final decision maker</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <p className="font-semibold text-foreground">C — Consulted</p>
                    <p className="text-sm">People whose input is required</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border border-border/50">
                    <p className="font-semibold text-foreground">I — Informed</p>
                    <p className="text-sm">People who need updates</p>
                  </div>
                </div>
                <p className="text-sm italic">You don't need to be an expert. The tool will help you clarify who fits where based on the information you provide.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="output" className="border border-border/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">7</span>
                  When You Press Generate
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-3">You'll get a polished, leadership-ready document you can:</p>
                <ul className="space-y-2">
                  {[
                    "Use for hiring",
                    "Share with your team",
                    "Handshake expectations with new employees",
                    "Improve performance reviews",
                    "Remove ambiguity that causes frustration or overload"
                  ].map((use, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm italic">The system transforms your notes into a clean role definition that feels like something from a top-tier consulting firm.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Better Output Prompts */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HelpCircle className="w-5 h-5 text-primary" />
                Want Even Better Output? Try These Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">These optional questions help sharpen your thinking. Add these into the relevant fields to get a really strong final RACI and role clarity doc:</p>
              <ul className="space-y-2">
                {[
                  "What decisions does this role make without approval?",
                  "What failures or bottlenecks happen when this role isn't clear?",
                  "What is the \"nightmare scenario\" you're avoiding with clarity?",
                  "What does your company need more of from this role next quarter?",
                  "What tasks is the CEO or founder still doing that belong here instead?"
                ].map((prompt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-foreground">{prompt}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Role Clarity Document</h2>

            {data.role_summary && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Role Summary</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.role_summary as string, "summary")}>
                    {copiedField === "summary" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{data.role_summary as string}</p>
                </CardContent>
              </Card>
            )}

            {data.success_criteria && (data.success_criteria as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.success_criteria as string[]).map((criteria: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span className="text-foreground">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.raci && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">RACI Matrix</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.raci), "raci")}>
                    {copiedField === "raci" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-foreground bg-muted p-4 rounded-lg overflow-x-auto">
                    {JSON.stringify(data.raci, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {data.gaps_identified && (data.gaps_identified as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gaps Identified</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.gaps_identified as string[]).map((gap: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-destructive font-bold">!</span>
                        <span className="text-foreground">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.alignment_actions && (data.alignment_actions as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alignment Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.alignment_actions as string[]).map((action: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{action}</span>
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

export default RolesAndResponsibilitiesCreator;
