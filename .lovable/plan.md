

# Google Calendar Integration Plan

## Overview

This plan adds a **View Upcoming Events** feature that lets users connect their Google Calendar and see what's coming up. The integration will appear in two places:
1. A dedicated Calendar page (new route: `/calendar`)
2. Inside the Weekly Plan Builder tool as a helpful context panel

---

## How It Works

When users connect their Google Calendar:
1. They click "Connect Google Calendar" 
2. Google's OAuth flow opens in a popup
3. After approval, their upcoming events display automatically
4. Events sync each time they visit the calendar page or Weekly Plan Builder

---

## What You'll Get

### 1. Calendar Page (`/calendar`)
- Clean list of upcoming events for the next 7 days
- Event details: title, date/time, location (if any)
- Easy-to-scan timeline view grouped by day
- Disconnect button to remove calendar access

### 2. Weekly Plan Builder Enhancement
- "Import from Calendar" sidebar showing existing commitments
- Helps users see conflicts when planning their week
- Optional: auto-populate the "Constraints" field with existing meetings

---

## Technical Implementation

### Step 1: Database Setup
Create a table to store Google Calendar tokens securely:

```text
+---------------------------+
|  user_calendar_tokens     |
+---------------------------+
| id (uuid)                 |
| user_id (text)            |
| provider (text)           |
| access_token (text)       |
| refresh_token (text)      |
| token_expires_at (timestamptz) |
| created_at (timestamptz)  |
| updated_at (timestamptz)  |
+---------------------------+
```

Row Level Security ensures users can only access their own tokens.

### Step 2: Backend Functions

**google-calendar-auth** - Handles the OAuth flow:
- Generates authorization URL
- Exchanges auth code for tokens
- Stores tokens in database
- Returns success/failure

**google-calendar-events** - Fetches events:
- Retrieves stored tokens for the user
- Refreshes expired tokens automatically
- Calls Google Calendar API
- Returns formatted event list

### Step 3: Frontend Components

**CalendarConnection** - Connection button component:
- Shows "Connect" or "Connected" state
- Handles OAuth popup flow
- Manages connection status

**UpcomingEvents** - Event display component:
- Groups events by day
- Shows time, title, location
- Loading and empty states

**CalendarPage** - Dedicated page at `/calendar`:
- Connection management
- Full 7-day event view
- Disconnect option

### Step 4: Weekly Plan Builder Integration
- Add collapsible "Your Calendar" sidebar
- Show today's and tomorrow's events
- Help users see conflicts before planning

---

## User Experience Flow

```text
User visits Calendar page
         |
         v
  [Not Connected?] ---> Show "Connect Google Calendar" button
         |                         |
         |                         v
         |               User clicks, OAuth popup opens
         |                         |
         |                         v
         |               User approves in Google
         |                         |
         v                         v
  [Connected!] <------- Tokens saved, popup closes
         |
         v
   Fetch & display upcoming events
         |
         v
   Show 7-day event timeline
```

---

## Required Google Cloud Setup

Before this works, you'll need to set up a Google Cloud project:

1. Create a project at console.cloud.google.com
2. Enable the Google Calendar API
3. Configure OAuth consent screen
4. Create OAuth 2.0 credentials (Web application)
5. Add redirect URI pointing to your domain
6. Add the Client ID and Client Secret as secrets

The system will need these secrets:
- `GOOGLE_CALENDAR_CLIENT_ID`
- `GOOGLE_CALENDAR_CLIENT_SECRET`

---

## Files to Create/Modify

| Action | File | Purpose |
|--------|------|---------|
| Create | `supabase/functions/google-calendar-auth/index.ts` | OAuth flow handling |
| Create | `supabase/functions/google-calendar-events/index.ts` | Fetch calendar events |
| Create | `src/pages/Calendar.tsx` | Dedicated calendar page |
| Create | `src/components/calendar/CalendarConnection.tsx` | Connect/disconnect button |
| Create | `src/components/calendar/UpcomingEvents.tsx` | Event display list |
| Create | `src/hooks/useGoogleCalendar.ts` | Calendar data hook |
| Modify | `src/pages/tools/WeeklyPlanBuilder.tsx` | Add calendar sidebar |
| Modify | `src/App.tsx` | Add `/calendar` route |
| Modify | `supabase/config.toml` | Register new functions |

---

## Security Considerations

- Tokens are stored server-side only (never exposed to browser)
- Row Level Security restricts access to own tokens
- Refresh tokens allow long-term access without re-auth
- Users can disconnect anytime, which deletes tokens

---

## Scope Notes

This implementation focuses on **viewing events only**. It does not:
- Create new calendar events
- Modify existing events  
- Sync task deadlines to calendar

These features could be added in a future iteration.

