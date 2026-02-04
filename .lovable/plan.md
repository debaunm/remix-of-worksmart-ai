
# Community Feed Feature

Build a Patreon-style community updates feed where you (as admin) can post updates that appear on member dashboards, with members able to comment and engage.

## Overview

This feature creates a central hub for community updates with:
- **Admin-only posting** - Only you can create new posts
- **Member comments** - All logged-in users can comment on posts
- **Likes/reactions** - Members can like posts and comments
- **Rich content** - Posts support text, images, and video embeds
- **Dashboard integration** - Latest updates appear prominently on user dashboards

## Database Design

### New Tables

**community_posts** - Stores your updates
- `id`, `author_id` (your user id), `title`, `content`, `media_url`, `media_type` (image/video/none), `created_at`, `updated_at`
- RLS: Anyone authenticated can read, only admin can insert/update/delete

**community_comments** - User comments on posts
- `id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`
- RLS: Anyone authenticated can read, users can create their own comments

**community_likes** - Likes on posts
- `id`, `post_id`, `user_id`, `created_at`
- Unique constraint on (post_id, user_id) to prevent duplicate likes
- RLS: Anyone authenticated can read/insert/delete their own likes

**user_roles** - Admin role management (security best practice)
- `id`, `user_id`, `role` (enum: admin, user)
- Separate table prevents privilege escalation
- Security definer function `has_role()` for RLS checks

### Database Diagram

```text
+------------------+       +--------------------+
|  community_posts |       | community_comments |
+------------------+       +--------------------+
| id (PK)          |<------| post_id (FK)       |
| author_id        |       | user_id            |
| title            |       | content            |
| content          |       | created_at         |
| media_url        |       | updated_at         |
| media_type       +----+  +--------------------+
| created_at       |    |
| updated_at       |    |  +------------------+
+------------------+    +--| community_likes  |
                           +------------------+
                           | post_id (FK)     |
                           | user_id          |
                           | created_at       |
                           +------------------+

+------------------+
|   user_roles     |
+------------------+
| id (PK)          |
| user_id          |
| role (enum)      |
+------------------+
```

## UI Components

### 1. Community Feed Page (`/community`)
A dedicated page for the full feed:
- Hero section with community branding
- Post creation form (visible only to admin)
- Scrollable feed of posts with:
  - Author avatar and name
  - Post timestamp (relative: "2 hours ago")
  - Post content with rich text rendering
  - Media display (images/video embeds)
  - Like button with count
  - Comment count and expandable comment section
  - Individual comments with user avatars

### 2. Dashboard Widget
Add a "Latest from Morgan" section to the Dashboard:
- Shows 2-3 most recent posts as cards
- Preview of content with "Read more" link
- Like and comment counts
- "View All Updates" link to `/community`

### 3. Post Components
- **CommunityPost** - Full post display with comments
- **PostCard** - Compact preview for dashboard
- **CommentSection** - Expandable comments list
- **CommentInput** - Text area for new comments
- **LikeButton** - Animated heart with count

## User Experience Flow

1. **Viewing posts**: Members see feed on dashboard and can click through to `/community`
2. **Engaging**: Click like button (instant optimistic update), expand comments to read/reply
3. **Commenting**: Type in comment box, submit with Enter or button
4. **Admin posting**: You see a composer at top of feed, can add text/images/video URLs

## Technical Details

### Components to Create
- `src/pages/Community.tsx` - Main community feed page
- `src/components/community/CommunityFeed.tsx` - Feed container
- `src/components/community/CommunityPost.tsx` - Single post display
- `src/components/community/PostComposer.tsx` - Admin post creation
- `src/components/community/CommentSection.tsx` - Comments list and input
- `src/components/community/LikeButton.tsx` - Like interaction
- `src/components/dashboard/LatestUpdates.tsx` - Dashboard widget

### Hooks to Create
- `src/hooks/useCommunityPosts.ts` - Fetch posts with React Query
- `src/hooks/useCommunityComments.ts` - Fetch/create comments
- `src/hooks/useLikes.ts` - Handle like toggle with optimistic updates
- `src/hooks/useUserRole.ts` - Check if current user is admin

### Admin Role Setup
You'll need to add your user ID to the `user_roles` table as an admin after the migration runs. This can be done through the Cloud View > Run SQL feature.

### Styling
Following existing brand colors:
- Coral/salmon primary for actions
- Warm cream backgrounds
- Dark teal/green accents
- Cards with subtle borders and shadows

## File Changes Summary

| File | Change |
|------|--------|
| Database migration | Create 4 new tables + RLS policies + role function |
| `src/App.tsx` | Add `/community` route |
| `src/pages/Community.tsx` | New - full feed page |
| `src/pages/Dashboard.tsx` | Add LatestUpdates widget |
| `src/components/community/*` | New - 6 components |
| `src/components/dashboard/LatestUpdates.tsx` | New - dashboard widget |
| `src/hooks/useCommunity*.ts` | New - 4 hooks |
| `src/components/Navbar.tsx` | Add Community link |

## Post-Implementation Steps

1. After migration runs, add your user ID to `user_roles` table with 'admin' role
2. Test creating a post as admin
3. Test commenting and liking as a regular user
4. Verify non-admins cannot access the post composer
