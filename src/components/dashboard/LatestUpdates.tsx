import { Link } from "react-router-dom";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { formatDistanceToNow } from "date-fns";

export const LatestUpdates = () => {
  const { data: posts, isLoading, error } = useCommunityPosts();

  // Show only the 3 most recent posts
  const recentPosts = posts?.slice(0, 3) || [];

  if (error) {
    return null; // Silently hide widget if there's an error
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-primary">💬</span>
            Community Updates
          </CardTitle>
          <Link to="/community">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Go to Community
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : recentPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No updates yet. Check back soon!
          </p>
        ) : (
          recentPosts.map((post) => (
            <Link 
              key={post.id} 
              to="/community"
              className="block group"
            >
              <div className="flex gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.author?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {post.author?.display_name?.[0]?.toUpperCase() || "M"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
};
