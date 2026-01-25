import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Clock, CheckCircle, ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Download {
  title: string;
  url: string;
}

export interface SessionData {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl?: string;
  learnings?: string[];
  downloads?: Download[];
}

interface ExpandableSessionCardProps {
  session: SessionData;
  locked: boolean;
  defaultOpen?: boolean;
}

const ExpandableSessionCard = ({ session, locked, defaultOpen = false }: ExpandableSessionCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (locked) {
    return (
      <div className="p-4 rounded-xl border border-border bg-muted/50">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{session.duration}</span>
            </div>
            <h4 className="font-medium text-muted-foreground mb-1">{session.title}</h4>
            <p className="text-sm text-muted-foreground">{session.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn(
        "rounded-xl border transition-all",
        isOpen ? "border-primary/50 bg-card" : "border-border bg-card hover:border-primary/30"
      )}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 text-left">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </span>
                </div>
                <h4 className="font-medium text-foreground mb-1">{session.title}</h4>
                <p className="text-sm text-muted-foreground">{session.description}</p>
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform shrink-0 mt-1",
                isOpen && "rotate-180"
              )} />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            {/* Video Embed */}
            {session.videoUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={session.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={session.title}
                />
              </div>
            )}

            {/* What You'll Learn */}
            {session.learnings && session.learnings.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">What You'll Learn</h5>
                <ul className="space-y-1.5">
                  {session.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources */}
            {session.downloads && session.downloads.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Resources</h5>
                <div className="space-y-2">
                  {session.downloads.map((download, index) => (
                    <a
                      key={index}
                      href={download.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {download.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default ExpandableSessionCard;
