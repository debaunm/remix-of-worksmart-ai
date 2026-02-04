import { useState } from "react";
import { Target, Plus, X, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateWeeklyFocus, type FocusArea } from "@/hooks/useWeeklyFocus";
import { useToast } from "@/hooks/use-toast";
import { format, startOfWeek, addDays } from "date-fns";

export const WeeklyFocusComposer = () => {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([
    { title: "", description: "" },
  ]);
  const [weeklyQuote, setWeeklyQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const { mutate: createFocus, isPending } = useCreateWeeklyFocus();
  const { toast } = useToast();

  // Get next Monday as default week start
  const getNextMonday = () => {
    const today = new Date();
    const nextMonday = startOfWeek(addDays(today, 7), { weekStartsOn: 1 });
    return format(nextMonday, "yyyy-MM-dd");
  };

  const [weekStart, setWeekStart] = useState(getNextMonday());

  const addFocusArea = () => {
    if (focusAreas.length < 5) {
      setFocusAreas([...focusAreas, { title: "", description: "" }]);
    }
  };

  const removeFocusArea = (index: number) => {
    if (focusAreas.length > 1) {
      setFocusAreas(focusAreas.filter((_, i) => i !== index));
    }
  };

  const updateFocusArea = (index: number, field: keyof FocusArea, value: string) => {
    const updated = [...focusAreas];
    updated[index] = { ...updated[index], [field]: value };
    setFocusAreas(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validFocusAreas = focusAreas.filter(area => area.title.trim());
    if (validFocusAreas.length === 0) {
      toast({
        title: "At least one focus area required",
        description: "Add a title for at least one focus area.",
        variant: "destructive",
      });
      return;
    }

    createFocus(
      {
        week_start: weekStart,
        focus_areas: validFocusAreas,
        weekly_quote: weeklyQuote.trim() || undefined,
        quote_author: quoteAuthor.trim() || undefined,
      },
      {
        onSuccess: () => {
          setFocusAreas([{ title: "", description: "" }]);
          setWeeklyQuote("");
          setQuoteAuthor("");
          setWeekStart(getNextMonday());
          toast({
            title: "Weekly Focus published!",
            description: "Your community will see this on their dashboards.",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to publish weekly focus",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-primary" />
          Set Weekly Focus
          <Badge variant="outline" className="ml-2 text-xs font-normal">
            For Dashboard
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Week Selection */}
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">Week starting:</label>
            <Input
              type="date"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
              className="w-auto"
            />
          </div>

          {/* Focus Areas */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Focus Areas (up to 5)</label>
            {focusAreas.map((area, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    value={area.title}
                    onChange={(e) => updateFocusArea(index, "title", e.target.value)}
                    placeholder={`Focus ${index + 1} title...`}
                    className="font-medium"
                  />
                  <Input
                    value={area.description}
                    onChange={(e) => updateFocusArea(index, "description", e.target.value)}
                    placeholder="Brief description (optional)"
                    className="text-sm"
                  />
                </div>
                {focusAreas.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFocusArea(index)}
                    className="mt-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {focusAreas.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFocusArea}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Focus Area
              </Button>
            )}
          </div>

          {/* Weekly Quote */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Weekly Quote (optional)</label>
            <Textarea
              value={weeklyQuote}
              onChange={(e) => setWeeklyQuote(e.target.value)}
              placeholder="An inspiring quote for the week..."
              className="min-h-[60px] resize-none"
            />
            <Input
              value={quoteAuthor}
              onChange={(e) => setQuoteAuthor(e.target.value)}
              placeholder="Quote author..."
              className="text-sm"
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full gap-2"
          >
            <Send className="w-4 h-4" />
            Publish Weekly Focus
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
