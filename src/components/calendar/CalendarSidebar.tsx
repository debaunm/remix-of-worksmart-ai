import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";
import CalendarConnection from "./CalendarConnection";
import UpcomingEvents from "./UpcomingEvents";

const CalendarSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isConnected, isLoading, events, connect, disconnect } = useGoogleCalendar();

  // Filter to show only today and tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    const todayStr = today.toDateString();
    const tomorrowStr = tomorrow.toDateString();
    return eventDate.toDateString() === todayStr || eventDate.toDateString() === tomorrowStr;
  });

  return (
    <div className="rounded-2xl bg-card border border-border/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto hover:bg-transparent"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold">Your Calendar</span>
              {isConnected && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
            </div>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pb-4 space-y-4"
            >
              {!isConnected ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect your calendar to see existing commitments while planning
                  </p>
                  <Button onClick={connect} disabled={isLoading} size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Connect Calendar
                  </Button>
                </div>
              ) : (
                <>
                  <UpcomingEvents events={filteredEvents} maxDays={2} compact />
                  
                  <Link
                    to="/calendar"
                    className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                  >
                    View Full Calendar
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CalendarSidebar;
