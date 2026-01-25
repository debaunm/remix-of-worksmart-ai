
# Update ContentViewer with New Money Systems Content

## Overview
Synchronize the ContentViewer page with the updated Money Systems sessions from the Dashboard. When users click "Watch" on a session, they will be taken to the correct content with matching titles, descriptions, and learnings.

## What Will Be Updated

### Session 01: Rich vs Wealthy Money Mindset Reset
- **ID**: `rich-vs-wealthy-mindset`
- **Duration**: 10 min
- **Description**: Focused on designing your money goals intentionally rather than following a restrictive budget
- **Key learnings**: Mindset shift from "rich" to "wealthy", money by design principles, goal identification

### Session 02: Build Your Wealth System
- **ID**: `build-wealth-system`
- **Duration**: 10 min
- **Description**: Creating automated money flows and financial infrastructure
- **Key learnings**: Automation strategies, wealth-building infrastructure, passive growth systems

### Session 03: Optimize Your Income Streams
- **ID**: `optimize-income-streams`
- **Duration**: 10 min
- **Description**: Using skills and positioning to accelerate income and wealth strategy
- **Key learnings**: Income optimization, skill positioning, wealth acceleration

## Downloads & Resources
Each session will include relevant downloadable resources linked to the spreadsheet tools:
- Wealthy Life Budget & Dashboard spreadsheet link
- The Passive Income Vault spreadsheet link
- Pricing formula spreadsheets where relevant

## Technical Details

### File to Modify
`src/pages/ContentViewer.tsx`

### Changes Required
1. Replace the `money-systems` content array (lines 42-108) with three new session objects
2. Update all IDs to match Dashboard: `rich-vs-wealthy-mindset`, `build-wealth-system`, `optimize-income-streams`
3. Update titles, descriptions, durations (10 min each), and learnings
4. Add the real spreadsheet URLs to the downloads array
5. Keep video URL as placeholder until you provide actual video links

### Placeholder Note
Video URLs will use placeholder embeds until you provide actual Loom, YouTube, or Vimeo links for each session.
