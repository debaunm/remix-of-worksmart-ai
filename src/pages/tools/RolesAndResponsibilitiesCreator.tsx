import { useState } from "react";
import { ArrowLeft, Users, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

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

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Roles & Responsibilities Creator</h1>
            <p className="text-muted-foreground">Build RACI maps and role clarity documentation</p>
          </div>
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
