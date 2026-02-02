

# Calendar Sync Dashboard UI (Mock Data Preview)

## Overview

This plan creates a complete Calendar Sync Dashboard UI with mock data so you can preview the design before adding Google Calendar credentials. The feature will appear in two locations as originally planned.

---

## What Gets Built

### 1. Dedicated Calendar Page (`/calendar`)

A new page with:
- Connection status banner showing "Connected to Google Calendar" (mock state)
- 7-day event timeline grouped by date
- Event cards showing:
  - Time (with duration indicator)
  - Event title
  - Location (if any)
  - Calendar color coding
- Disconnect button (non-functional, just UI)
- Empty state design for when no events exist
- Toggle to switch between "Connected" and "Not Connected" views (for design preview)

### 2. Weekly Plan Builder Calendar Sidebar

A collapsible panel inside the Weekly Plan Builder showing:
- "Your Calendar" header with connection status
- Today's and tomorrow's events
- Helps visualize conflicts when planning
- "Connect Calendar" button (when not connected)

---

## Mock Data

Realistic calendar events for the next 7 days:

| Day | Events |
|-----|--------|
| Today | "Team Standup" 9:00 AM, "Client Call - Acme Corp" 2:00 PM, "Deep Work Block" 4:00 PM |
| Tomorrow | "Weekly Review" 10:00 AM, "Lunch with Sarah" 12:30 PM |
| Day 3 | "Board Meeting" 9:00 AM (3 hrs), "Investor Pitch Prep" 3:00 PM |
| Day 4 | "Content Recording" 11:00 AM, "Podcast Interview" 2:00 PM |
| Day 5 | "Team All-Hands" 10:00 AM, "1:1 with Designer" 4:00 PM |
| Day 6 | "Focus Time" 9:00 AM (blocked), "Gym" 5:00 PM |
| Day 7 | "Family Brunch" 10:00 AM |

---

## UI Components

### CalendarConnection Component
- Shows connection status with green checkmark or gray disconnected icon
- "Connect Google Calendar" button with Google logo
- "Disconnect" option when connected
- Animated transition between states

### UpcomingEvents Component
- Groups events by day with date headers
- Each event shows:
  - Color-coded left border (based on calendar)
  - Time range and duration badge
  - Title in semibold
  - Location with map pin icon (optional)
- Smooth scroll for long lists
- "No events" empty state

### CalendarPage Component
- Hero section with calendar icon
- Toggle switch to preview connected vs disconnected states
- Full 7-day view with all mock events
- Responsive: stacks on mobile, multi-column on desktop

### CalendarSidebar (for Weekly Plan Builder)
- Collapsible panel using existing Collapsible component
- Shows today + tomorrow only (compact view)
- "View Full Calendar" link to `/calendar` page

---

## Design Tokens

Following existing patterns:
- Cards: `bg-card border border-border/50 rounded-2xl`
- Headers: `font-semibold` with icon
- Colors: Primary coral for accents, warm background
- Motion: Framer Motion for enter animations
- Calendar colors:
  - Work events: Blue border
  - Personal: Green border
  - Focus blocks: Purple border

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Calendar.tsx` | Main calendar page |
| `src/components/calendar/CalendarConnection.tsx` | Connection status & button |
| `src/components/calendar/UpcomingEvents.tsx` | Event list component |
| `src/components/calendar/CalendarSidebar.tsx` | Compact sidebar for tools |
| `src/components/calendar/mockCalendarData.ts` | Mock event data |
| `src/hooks/useGoogleCalendar.ts` | Hook (returns mock data for now) |

## Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/calendar` route |
| `src/pages/tools/WeeklyPlanBuilder.tsx` | Add CalendarSidebar |
| `src/components/Navbar.tsx` | Add Calendar link (optional) |

---

## Future-Proofing

The mock data hook will have the same interface as the real implementation:

```typescript
const { 
  isConnected,      // boolean
  isLoading,        // boolean
  events,           // CalendarEvent[]
  connect,          // () => void
  disconnect,       // () => void
  refetch           // () => void
} = useGoogleCalendar();
```

When you add real credentials later, only the hook internals change - all UI components stay the same.

---

## Preview Mode Toggle

A special toggle on the Calendar page lets you switch between:
- **Connected view**: Shows mock events
- **Disconnected view**: Shows "Connect your calendar" CTA

This helps you review both states of the design.

