

# Embed Money Systems Videos Directly on Dashboard

## Overview
Replace the current "Watch" button + separate ContentViewer page flow with expandable video cards directly on the Dashboard. Users click a session to expand and watch the video inline without navigating away.

## User Experience

### Before (Current)
1. User sees session card on Dashboard
2. Clicks "Watch" button
3. Navigates to `/content/money-systems/{session-id}`
4. Watches video with sidebar resources

### After (New)
1. User sees session card on Dashboard
2. Clicks session card to expand it
3. Video appears inline with resources below
4. Can collapse and switch between sessions easily

## Visual Layout

```text
+--------------------------------------------------+
| Training Sessions                                |
+--------------------------------------------------+
| ▼ Session 1: Rich vs Wealthy Mindset    [10 min] |
| +----------------------------------------------+ |
| |                                              | |
| |           [VIDEO EMBED - 16:9]               | |
| |                                              | |
| +----------------------------------------------+ |
| What You'll Learn:                               |
| ✓ The mindset shift from "rich" to "wealthy"   |
| ✓ Money by design principles                   |
|                                                  |
| Resources:                                       |
| 📄 Wealthy Life Budget & Dashboard [Open ↗]    |
+--------------------------------------------------+
| ▶ Session 2: Build Your Wealth System  [10 min] |
|   Create automated money flows...                |
+--------------------------------------------------+
| ▶ Session 3: Optimize Your Income      [10 min] |
|   Identify how to use your skills...             |
+--------------------------------------------------+
```

## What Will Be Modified

### Dashboard.tsx Changes
1. Add video URLs to the `moneySessions` array (matching ContentViewer data)
2. Add learnings and downloads to each session object
3. Replace the `SessionCard` component with an expandable `ExpandableSessionCard` component
4. Use Radix Accordion or Collapsible for the expand/collapse behavior
5. Embed video iframe when expanded
6. Show learnings list and resource download links below video

### ContentViewer Remains
Keep ContentViewer for Work Systems (longer videos with more detailed content) - or we can apply the same pattern there later if desired.

## Technical Details

### New Session Data Structure
Each session will include:
- `id`, `title`, `duration`, `description` (existing)
- `videoUrl` - embed URL for the video
- `learnings` - array of bullet points
- `downloads` - array of resource links

### Components Used
- `Collapsible` from Radix UI (already installed)
- `iframe` for video embed (responsive 16:9 aspect ratio)
- Existing `CheckCircle`, `Download` icons from lucide-react

### Responsive Behavior
- On mobile: Full-width accordion cards
- On desktop: Cards in the 2-column layout within the existing grid

## Files to Modify
- `src/pages/Dashboard.tsx` - Primary changes to add expandable video cards

## Optional: Remove Money Systems from ContentViewer
If you want to fully consolidate, we can remove the money-systems routes from ContentViewer. However, keeping it provides a fallback if you ever want a dedicated page view.

