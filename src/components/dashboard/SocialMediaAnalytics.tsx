import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MessageCircle,
  Heart,
  Share2,
  BarChart3,
  Linkedin,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  mockSocialPlatforms, 
  mockWeeklyData,
  getAggregateStats,
  SocialPlatformData 
} from "./mockSocialData";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: BarChart3, // Using BarChart3 as TikTok proxy
};

const platformColors: Record<string, string> = {
  linkedin: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  instagram: "bg-pink-500/10 text-pink-500 border-pink-500/30",
  twitter: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  youtube: "bg-red-500/10 text-red-500 border-red-500/30",
  tiktok: "bg-violet-500/10 text-violet-500 border-violet-500/30",
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const PlatformCard = ({ platform }: { platform: SocialPlatformData }) => {
  const Icon = platformIcons[platform.platform];
  const colorClass = platformColors[platform.platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-sm">{platform.displayName}</p>
            <p className="text-xs text-muted-foreground">{platform.handle}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {platform.postsThisWeek} posts
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Followers</p>
          <p className="font-semibold">{formatNumber(platform.followers)}</p>
          <div className={`flex items-center gap-1 text-xs ${platform.followersChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {platform.followersChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(platform.followersChange)}%
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Engagement</p>
          <p className="font-semibold">{platform.engagementRate}%</p>
          <div className={`flex items-center gap-1 text-xs ${platform.engagementChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {platform.engagementChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(platform.engagementChange)}%
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Impressions</p>
          <p className="font-semibold">{formatNumber(platform.impressions)}</p>
          <div className={`flex items-center gap-1 text-xs ${platform.impressionsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {platform.impressionsChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(platform.impressionsChange)}%
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground mb-1">Top Performing Post</p>
        <p className="text-sm font-medium line-clamp-1 mb-2">{platform.topPost.title}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" /> {formatNumber(platform.topPost.likes)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> {platform.topPost.comments}
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-3 h-3" /> {platform.topPost.shares}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SocialMediaAnalytics = () => {
  const aggregateStats = getAggregateStats(mockSocialPlatforms);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Social Media Analytics
        </CardTitle>
        <CardDescription>
          Track your audience growth and engagement across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Followers</span>
            </div>
            <p className="text-2xl font-bold">{formatNumber(aggregateStats.totalFollowers)}</p>
          </div>
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Avg. Engagement</span>
            </div>
            <p className="text-2xl font-bold">{aggregateStats.averageEngagement.toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Impressions</span>
            </div>
            <p className="text-2xl font-bold">{formatNumber(aggregateStats.totalImpressions)}</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Posts This Week</span>
            </div>
            <p className="text-2xl font-bold">{aggregateStats.totalPosts}</p>
          </div>
        </div>

        {/* Weekly Growth Chart */}
        <div className="p-4 rounded-xl bg-card border border-border/50">
          <h4 className="font-semibold text-sm mb-4">Weekly Growth Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => formatNumber(value)}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.1)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Cards */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Platform Breakdown</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSocialPlatforms.map((platform) => (
              <PlatformCard key={platform.platform} platform={platform} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaAnalytics;
