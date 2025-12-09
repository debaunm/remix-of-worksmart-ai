import { useState } from "react";
import { ArrowLeft, Newspaper, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

const PressReleaseGenerator = () => {
  const [announcement, setAnnouncement] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [executiveName, setExecutiveName] = useState("");
  const [executiveTitle, setExecutiveTitle] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("press_release_generator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.trim()) {
      toast.error("Please describe your announcement");
      return;
    }

    await execute({
      announcement,
      company_name: companyName,
      executive_name: executiveName,
      executive_title: executiveTitle,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const data = result as Record<string, unknown> | null;
  const pressRelease = data?.press_release as Record<string, unknown> | undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Newspaper className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Press Release Generator</h1>
            <p className="text-muted-foreground">Create newsroom-ready press releases with media outreach strategy</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="announcement">Announcement Description *</Label>
            <Textarea
              id="announcement"
              placeholder="Describe your announcement (launch, funding, partnership, milestone, hire, event)..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="executiveName">Executive Name</Label>
              <Input
                id="executiveName"
                placeholder="Name for quote attribution"
                value={executiveName}
                onChange={(e) => setExecutiveName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="executiveTitle">Executive Title</Label>
            <Input
              id="executiveTitle"
              placeholder="CEO, Founder, COO, etc."
              value={executiveTitle}
              onChange={(e) => setExecutiveTitle(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating press release...
              </>
            ) : (
              "Generate Press Release"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Press Release Package</h2>

            {pressRelease && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Press Release</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(pressRelease), "release")}>
                    {copiedField === "release" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pressRelease.headline && (
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{pressRelease.headline as string}</h3>
                      {pressRelease.subheadline && (
                        <p className="text-lg text-muted-foreground italic">{pressRelease.subheadline as string}</p>
                      )}
                    </div>
                  )}
                  {pressRelease.lead_paragraph && (
                    <p className="text-foreground font-medium">{pressRelease.lead_paragraph as string}</p>
                  )}
                  {pressRelease.body_paragraphs && (pressRelease.body_paragraphs as string[]).map((para, i) => (
                    <p key={i} className="text-foreground">{para}</p>
                  ))}
                  {pressRelease.quote_section && (pressRelease.quote_section as string[]).map((quote, i) => (
                    <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      {quote}
                    </blockquote>
                  ))}
                  {pressRelease.call_to_action && (
                    <p className="font-medium text-primary">{pressRelease.call_to_action as string}</p>
                  )}
                  {pressRelease.boilerplate && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">{pressRelease.boilerplate as string}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {data.media_list && (data.media_list as string[]).length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Suggested Media Outlets</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(data.media_list), "media")}>
                    {copiedField === "media" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.media_list as string[]).map((outlet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span className="text-foreground">{typeof outlet === "object" ? JSON.stringify(outlet) : outlet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.outreach_strategy && (data.outreach_strategy as string[]).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Outreach Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(data.outreach_strategy as string[]).map((tactic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-foreground">{typeof tactic === "object" ? JSON.stringify(tactic) : tactic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {data.pitch_email && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Pitch Email Template</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(data.pitch_email as string, "pitch")}>
                    {copiedField === "pitch" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-foreground font-sans">{data.pitch_email as string}</pre>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PressReleaseGenerator;
