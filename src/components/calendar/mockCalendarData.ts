import { addDays, format, setHours, setMinutes } from "date-fns";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  calendarType: "work" | "personal" | "focus";
}

const today = new Date();
const setTime = (date: Date, hours: number, minutes: number = 0) =>
  setMinutes(setHours(date, hours), minutes);

export const mockCalendarEvents: CalendarEvent[] = [
  // Today
  {
    id: "1",
    title: "Team Standup",
    start: setTime(today, 9, 0),
    end: setTime(today, 9, 30),
    calendarType: "work",
  },
  {
    id: "2",
    title: "Client Call - Acme Corp",
    start: setTime(today, 14, 0),
    end: setTime(today, 15, 0),
    location: "Zoom",
    calendarType: "work",
  },
  {
    id: "3",
    title: "Deep Work Block",
    start: setTime(today, 16, 0),
    end: setTime(today, 18, 0),
    calendarType: "focus",
  },
  // Tomorrow
  {
    id: "4",
    title: "Weekly Review",
    start: setTime(addDays(today, 1), 10, 0),
    end: setTime(addDays(today, 1), 11, 0),
    calendarType: "work",
  },
  {
    id: "5",
    title: "Lunch with Sarah",
    start: setTime(addDays(today, 1), 12, 30),
    end: setTime(addDays(today, 1), 13, 30),
    location: "Café Milano",
    calendarType: "personal",
  },
  // Day 3
  {
    id: "6",
    title: "Board Meeting",
    start: setTime(addDays(today, 2), 9, 0),
    end: setTime(addDays(today, 2), 12, 0),
    location: "Conference Room A",
    calendarType: "work",
  },
  {
    id: "7",
    title: "Investor Pitch Prep",
    start: setTime(addDays(today, 2), 15, 0),
    end: setTime(addDays(today, 2), 16, 30),
    calendarType: "work",
  },
  // Day 4
  {
    id: "8",
    title: "Content Recording",
    start: setTime(addDays(today, 3), 11, 0),
    end: setTime(addDays(today, 3), 12, 30),
    location: "Studio",
    calendarType: "work",
  },
  {
    id: "9",
    title: "Podcast Interview",
    start: setTime(addDays(today, 3), 14, 0),
    end: setTime(addDays(today, 3), 15, 0),
    location: "Remote",
    calendarType: "work",
  },
  // Day 5
  {
    id: "10",
    title: "Team All-Hands",
    start: setTime(addDays(today, 4), 10, 0),
    end: setTime(addDays(today, 4), 11, 0),
    location: "Main Hall",
    calendarType: "work",
  },
  {
    id: "11",
    title: "1:1 with Designer",
    start: setTime(addDays(today, 4), 16, 0),
    end: setTime(addDays(today, 4), 16, 30),
    calendarType: "work",
  },
  // Day 6
  {
    id: "12",
    title: "Focus Time",
    start: setTime(addDays(today, 5), 9, 0),
    end: setTime(addDays(today, 5), 12, 0),
    calendarType: "focus",
  },
  {
    id: "13",
    title: "Gym",
    start: setTime(addDays(today, 5), 17, 0),
    end: setTime(addDays(today, 5), 18, 0),
    calendarType: "personal",
  },
  // Day 7
  {
    id: "14",
    title: "Family Brunch",
    start: setTime(addDays(today, 6), 10, 0),
    end: setTime(addDays(today, 6), 12, 0),
    location: "Home",
    calendarType: "personal",
  },
];

export const getEventsForDay = (date: Date, events: CalendarEvent[]) => {
  const dateStr = format(date, "yyyy-MM-dd");
  return events.filter((event) => format(event.start, "yyyy-MM-dd") === dateStr);
};

export const getEventsGroupedByDay = (events: CalendarEvent[]) => {
  const grouped: Record<string, CalendarEvent[]> = {};
  
  events.forEach((event) => {
    const dateKey = format(event.start, "yyyy-MM-dd");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(event);
  });

  // Sort events within each day by start time
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => a.start.getTime() - b.start.getTime());
  });

  return grouped;
};
