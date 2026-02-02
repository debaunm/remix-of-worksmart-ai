import { format, subDays } from "date-fns";

export interface SocialPlatformData {
  platform: "instagram" | "linkedin" | "twitter" | "youtube" | "tiktok";
  displayName: string;
  handle: string;
  followers: number;
  followersChange: number;
  engagementRate: number;
  engagementChange: number;
  postsThisWeek: number;
  impressions: number;
  impressionsChange: number;
  topPost: {
    title: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface WeeklyMetric {
  date: string;
  followers: number;
  engagement: number;
  impressions: number;
}

export const mockSocialPlatforms: SocialPlatformData[] = [
  {
    platform: "linkedin",
    displayName: "LinkedIn",
    handle: "@morgandebaun",
    followers: 127500,
    followersChange: 2.4,
    engagementRate: 4.8,
    engagementChange: 0.3,
    postsThisWeek: 5,
    impressions: 892000,
    impressionsChange: 12.5,
    topPost: {
      title: "3 AI tools that 10x'd my productivity...",
      likes: 2847,
      comments: 234,
      shares: 156,
    },
  },
  {
    platform: "instagram",
    displayName: "Instagram",
    handle: "@morgandebaun",
    followers: 85200,
    followersChange: 1.8,
    engagementRate: 3.2,
    engagementChange: -0.2,
    postsThisWeek: 7,
    impressions: 456000,
    impressionsChange: 8.3,
    topPost: {
      title: "Behind the scenes of my morning routine",
      likes: 4521,
      comments: 189,
      shares: 67,
    },
  },
  {
    platform: "twitter",
    displayName: "X (Twitter)",
    handle: "@mikiahall",
    followers: 42300,
    followersChange: 3.1,
    engagementRate: 2.1,
    engagementChange: 0.5,
    postsThisWeek: 12,
    impressions: 234000,
    impressionsChange: 15.2,
    topPost: {
      title: "Thread: How I built a $1M business in 12 months",
      likes: 1893,
      comments: 156,
      shares: 423,
    },
  },
  {
    platform: "youtube",
    displayName: "YouTube",
    handle: "Morgan DeBaun",
    followers: 28400,
    followersChange: 4.2,
    engagementRate: 6.7,
    engagementChange: 1.2,
    postsThisWeek: 2,
    impressions: 178000,
    impressionsChange: 22.1,
    topPost: {
      title: "How to Use AI to Build Your Personal Brand",
      likes: 892,
      comments: 124,
      shares: 45,
    },
  },
  {
    platform: "tiktok",
    displayName: "TikTok",
    handle: "@morgandebaun",
    followers: 15800,
    followersChange: 8.5,
    engagementRate: 9.2,
    engagementChange: 2.1,
    postsThisWeek: 4,
    impressions: 567000,
    impressionsChange: 34.7,
    topPost: {
      title: "POV: You finally automated your content...",
      likes: 12400,
      comments: 567,
      shares: 1230,
    },
  },
];

// Generate mock weekly data for charts
export const generateWeeklyData = (): WeeklyMetric[] => {
  const data: WeeklyMetric[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, "MMM d"),
      followers: Math.floor(290000 + Math.random() * 10000),
      engagement: Math.floor(3000 + Math.random() * 2000),
      impressions: Math.floor(300000 + Math.random() * 100000),
    });
  }
  
  return data;
};

export const mockWeeklyData = generateWeeklyData();

// Aggregate stats
export const getAggregateStats = (platforms: SocialPlatformData[]) => {
  return {
    totalFollowers: platforms.reduce((sum, p) => sum + p.followers, 0),
    averageEngagement: platforms.reduce((sum, p) => sum + p.engagementRate, 0) / platforms.length,
    totalImpressions: platforms.reduce((sum, p) => sum + p.impressions, 0),
    totalPosts: platforms.reduce((sum, p) => sum + p.postsThisWeek, 0),
  };
};
