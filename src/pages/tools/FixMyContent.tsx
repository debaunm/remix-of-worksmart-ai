import { useState } from "react";
import { ArrowLeft, FileText, Loader2, Copy, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";
import ResultsEmailGate from "@/components/ResultsEmailGate";
import { useEmailGate } from "@/hooks/useEmailGate";

const FixMyContent = () => {
  const [rawContent, setRawContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [tonePreference, setTonePreference] = useState("");
  const [profileUrls, setProfileUrls] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("fix_my_content");
  const { hasSubmittedEmail, handleEmailSubmitted } = useEmailGate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawContent.trim()) {
      toast.error("Please enter your content");
      return;
    }
    if (!platform) {
      toast.error("Please select a platform");
      return;
    }

    await execute({
      raw_content: rawContent,
      platform,
      tone_preference: tonePreference,
      profile_urls: profileUrls,
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
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
              <Sparkles className="w-3 h-3" />
              FREE TOOL
            </span>
            <h1 className="text-3xl font-bold text-foreground">Fix My Content</h1>
            <p className="text-muted-foreground">Transform rough content into polished, platform-optimized posts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="rawContent">Your Raw Content *</Label>
            <Textarea
              id="rawContent"
              placeholder="Paste your rough draft, idea, or content here..."
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform *</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">X (Twitter)</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone Preference</Label>
              <Select value={tonePreference} onValueChange={setTonePreference}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                  <SelectItem value="relatable">Relatable</SelectItem>
                  <SelectItem value="aspirational">Aspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileUrls">Profile URLs (optional)</Label>
            <Textarea
              id="profileUrls"
              placeholder="Share your social profile URLs so the AI can analyze your current tone and style..."
              value={profileUrls}
              onChange={(e) => setProfileUrls(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Fixing your content...
              </>
            ) : (
              "Fix My Content"
            )}
          </Button>
        </form>

        <ResultsEmailGate
          toolName="Fix My Content"
          onEmailSubmitted={handleEmailSubmitted}
          hasSubmittedEmail={hasSubmittedEmail}
          hasResults={!!data}
        >
          {data && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Your Polished Content</h2>

              {data.improved_version && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Improved Version</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(data.improved_version as string, "improved")}
                    >
                      {copiedField === "improved" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{data.improved_version as string}</p>
                  </CardContent>
                </Card>
              )}

              {data.hook_options && (data.hook_options as string[]).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hook Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(data.hook_options as string[]).map((hook: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <span>{hook}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {data.variants && (
                <div className="grid gap-4 md:grid-cols-3">
                  {(data.variants as Record<string, string>).direct && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Direct</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard((data.variants as Record<string, string>).direct, "direct")}>
                          {copiedField === "direct" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{(data.variants as Record<string, string>).direct}</p>
                      </CardContent>
                    </Card>
                  )}
                  {(data.variants as Record<string, string>).story && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Story-Based</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard((data.variants as Record<string, string>).story, "story")}>
                          {copiedField === "story" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{(data.variants as Record<string, string>).story}</p>
                      </CardContent>
                    </Card>
                  )}
                  {(data.variants as Record<string, string>).educational && (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Educational</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard((data.variants as Record<string, string>).educational, "educational")}>
                          {copiedField === "educational" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{(data.variants as Record<string, string>).educational}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {data.angle_buckets && (data.angle_buckets as string[]).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Angle Buckets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(data.angle_buckets as string[]).map((angle: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{angle}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {data.cta_options && (data.cta_options as string[]).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CTA Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {(data.cta_options as string[]).map((cta: string, i: number) => (
                        <li key={i} className="text-muted-foreground">• {cta}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </ResultsEmailGate>
      </div>
    </div>
  );
};

export default FixMyContent;
