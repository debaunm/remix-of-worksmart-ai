import { useState } from "react";
import { ArrowLeft, Calendar, Loader2, Copy, Check, ChevronDown, ChevronUp, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIWorkflow } from "@/hooks/useAIWorkflow";
import { toast } from "sonner";

interface DayContent {
  day_number: number;
  suggested_week_label: string;
  weekday_suggestion: string;
  content_archetype: string;
  hook: string;
  content_type: string;
  angle: string;
  detailed_structure: string[] | string;
  CTA: string;
  suggested_character_count_range: string;
  offer_integration_note?: string;
}

interface WeekOverview {
  week_number: number;
  week_label: string;
  focus_description: string;
  primary_objectives: string[];
}

const LinkedIn21DayContentPlan = () => {
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [themes, setThemes] = useState("");
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { execute, isLoading, result } = useAIWorkflow("linkedin_21_day_exec_content");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim() || !audience.trim() || !offer.trim()) {
      toast.error("Please fill in Industry, Audience, and Offer");
      return;
    }

    await execute({
      industry,
      audience,
      offer,
      themes,
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleDay = (dayNumber: number) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const data = result as Record<string, unknown> | null;

  const getArchetypeColor = (archetype: string) => {
    const colors: Record<string, string> = {
      "Controversial Take": "bg-red-100 text-red-700",
      "Educational": "bg-blue-100 text-blue-700",
      "Personal Story": "bg-purple-100 text-purple-700",
      "How-to / Framework": "bg-green-100 text-green-700",
      "Win / Social Proof": "bg-amber-100 text-amber-700",
      "Engagement": "bg-pink-100 text-pink-700",
      "Reflection": "bg-indigo-100 text-indigo-700",
    };
    return colors[archetype] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-foreground">21-Day LinkedIn Content Architect</h1>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </Badge>
            </div>
            <p className="text-muted-foreground">Generate a strategic 21-day LinkedIn content plan for executives</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry / Niche *</Label>
              <Input
                id="industry"
                placeholder="e.g., Career coaching for tech professionals"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience *</Label>
              <Input
                id="audience"
                placeholder="e.g., Mid-level tech employees wanting leadership roles"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="offer">Your Paid Offer *</Label>
            <Input
              id="offer"
              placeholder="e.g., 90-day leadership acceleration program"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="themes">Content Themes (3-6, comma-separated)</Label>
            <Textarea
              id="themes"
              placeholder="e.g., Leadership skills, Career transitions, Executive presence, Negotiation tactics"
              value={themes}
              onChange={(e) => setThemes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating your 21-day plan...
              </>
            ) : (
              "Generate 21-Day Content Plan"
            )}
          </Button>
        </form>

        {data && (
          <div className="space-y-6">
            {data.plan_title && (
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">{data.plan_title as string}</h2>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(data, null, 2), "full")}>
                  {copiedField === "full" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Export All
                </Button>
              </div>
            )}

            {/* Weekly Overview */}
            {data.weekly_overview && (data.weekly_overview as WeekOverview[]).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(data.weekly_overview as WeekOverview[]).map((week) => (
                  <Card key={week.week_number} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{week.week_label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{week.focus_description}</p>
                      {week.primary_objectives && (
                        <ul className="text-xs space-y-1">
                          {week.primary_objectives.map((obj, i) => (
                            <li key={i} className="text-muted-foreground">• {obj}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Mix Summary */}
            {data.mix_summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Mix Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(data.mix_summary as Record<string, unknown>).map(([key, value]) => {
                      if (key === "hook_patterns_used") return null;
                      return (
                        <div key={key} className="px-3 py-2 bg-muted rounded-lg text-center">
                          <div className="text-lg font-bold text-foreground">{String(value)}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, " ")}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily Content */}
            {data.days && (data.days as DayContent[]).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">21-Day Content Calendar</h3>
                {(data.days as DayContent[]).map((day) => (
                  <Card key={day.day_number} className="overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleDay(day.day_number)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {day.day_number}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-foreground">{day.weekday_suggestion}</span>
                              <Badge variant="outline" className={getArchetypeColor(day.content_archetype)}>
                                {day.content_archetype}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {day.content_type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{day.hook}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(JSON.stringify(day, null, 2), `day-${day.day_number}`);
                            }}
                          >
                            {copiedField === `day-${day.day_number}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          {expandedDays.includes(day.day_number) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedDays.includes(day.day_number) && (
                      <CardContent className="pt-0 border-t bg-muted/30">
                        <div className="space-y-4 pt-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Hook</h4>
                            <p className="text-foreground bg-background p-3 rounded-lg border italic">"{day.hook}"</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Angle</h4>
                            <p className="text-muted-foreground">{day.angle}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-foreground mb-1">Structure</h4>
                            {Array.isArray(day.detailed_structure) ? (
                              <ul className="space-y-1">
                                {day.detailed_structure.map((item, i) => (
                                  <li key={i} className="text-muted-foreground">• {item}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground whitespace-pre-wrap">{day.detailed_structure}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-foreground mb-1">CTA</h4>
                              <p className="text-muted-foreground">{day.CTA}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-1">Character Count</h4>
                              <p className="text-muted-foreground">{day.suggested_character_count_range}</p>
                            </div>
                          </div>

                          {day.offer_integration_note && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <h4 className="font-medium text-amber-800 mb-1">Offer Integration</h4>
                              <p className="text-amber-700 text-sm">{day.offer_integration_note}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedIn21DayContentPlan;
