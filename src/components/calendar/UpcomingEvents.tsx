import { motion } from "framer-motion";
import { format, isToday, isTomorrow, differenceInMinutes } from "date-fns";
import { MapPin, Clock, CalendarX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent, getEventsGroupedByDay } from "./mockCalendarData";

interface UpcomingEventsProps {
  events: CalendarEvent[];
  maxDays?: number;
  compact?: boolean;
}

const calendarTypeColors: Record<string, string> = {
  work: "border-l-blue-500",
  personal: "border-l-green-500",
  focus: "border-l-purple-500",
};

const formatDuration = (start: Date, end: Date) => {
  const mins = differenceInMinutes(end, start);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
};

const getDayLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEEE, MMM d");
};

const UpcomingEvents = ({ events, maxDays = 7, compact = false }: UpcomingEventsProps) => {
  const groupedEvents = getEventsGroupedByDay(events);
  const sortedDates = Object.keys(groupedEvents).sort().slice(0, maxDays);

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <CalendarX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h4 className="font-semibold mb-1">No upcoming events</h4>
        <p className="text-sm text-muted-foreground">
          Your calendar is clear for the next {maxDays} days
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((dateStr, dayIndex) => (
        <motion.div
          key={dateStr}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dayIndex * 0.05 }}
        >
          <h4 className={`font-semibold mb-3 ${compact ? "text-sm" : "text-base"}`}>
            {getDayLabel(dateStr)}
          </h4>
          <div className="space-y-2">
            {groupedEvents[dateStr].map((event, eventIndex) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dayIndex * 0.05 + eventIndex * 0.02 }}
                className={`border-l-4 ${calendarTypeColors[event.calendarType]} bg-secondary/30 rounded-lg p-3 hover:bg-secondary/50 transition-colors`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                      </span>
                      <Badge variant="outline" className="text-xs py-0 px-1.5">
                        {formatDuration(event.start, event.end)}
                      </Badge>
                    </div>
                    <p className={`font-medium truncate ${compact ? "text-sm" : ""}`}>
                      {event.title}
                    </p>
                    {event.location && !compact && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
