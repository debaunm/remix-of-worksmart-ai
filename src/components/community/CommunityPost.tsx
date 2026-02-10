import { format, formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { useUserRole } from "@/hooks/useUserRole";
import { useDeletePost, type CommunityPost as CommunityPostType } from "@/hooks/useCommunityPosts";
import { useToast } from "@/hooks/use-toast";
import { useSignedUrl } from "@/hooks/useSignedUrl";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunityPostProps {
  post: CommunityPostType;
}

export const CommunityPost = ({ post }: CommunityPostProps) => {
  const { isAdmin } = useUserRole();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { toast } = useToast();
  
  // Get signed URL for private bucket images
  const { signedUrl, isLoading: isLoadingImage } = useSignedUrl(
    "community-images",
    post.media_type === "image" ? post.media_url : null
  );

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    deletePost(post.id, {
      onSuccess: () => {
        toast({
          title: "Post deleted",
          description: "The post has been removed.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to delete post",
          variant: "destructive",
        });
      },
    });
  };

  const renderMedia = () => {
    if (post.media_type === "none" || !post.media_url) return null;

    if (post.media_type === "image") {
      if (isLoadingImage) {
        return (
          <div className="mt-4 rounded-lg overflow-hidden">
            <Skeleton className="w-full h-64" />
          </div>
        );
      }

      if (!signedUrl) return null;

      return (
        <div className="mt-4 rounded-lg overflow-hidden">
          <img 
            src={signedUrl} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      );
    }

    if (post.media_type === "video") {
      const videoUrl = post.media_url;
      let embedUrl: string | null = null;

      try {
        const url = new URL(videoUrl);
        const hostname = url.hostname.toLowerCase();

        if (hostname === "www.youtube.com" || hostname === "youtube.com") {
          const videoId = url.searchParams.get("v");
          if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (hostname === "youtu.be") {
          const videoId = url.pathname.slice(1).split("/")[0];
          if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (hostname === "www.vimeo.com" || hostname === "vimeo.com") {
          const videoId = url.pathname.slice(1).split("/")[0];
          if (videoId && /^\d+$/.test(videoId)) embedUrl = `https://player.vimeo.com/video/${videoId}`;
        } else if (hostname === "player.vimeo.com") {
          embedUrl = videoUrl;
        }
      } catch {
        // Invalid URL — don't embed
      }

      if (!embedUrl) return null;

      return (
        <div className="mt-4 rounded-lg overflow-hidden aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {post.author?.display_name?.[0]?.toUpperCase() || "M"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {post.author?.display_name || "Morgan DeBaun"}
                </p>
                <p 
                  className="text-xs text-muted-foreground" 
                  title={format(new Date(post.created_at), "PPpp")}
                >
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            {isAdmin && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
          <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
          {renderMedia()}
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-border flex gap-4">
          <LikeButton 
            postId={post.id} 
            likesCount={post.likes_count || 0} 
            userHasLiked={post.user_has_liked || false} 
          />
          <CommentSection 
            postId={post.id} 
            commentsCount={post.comments_count || 0} 
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
