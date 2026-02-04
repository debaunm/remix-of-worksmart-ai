import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useCommunityComments, useCreateComment, useDeleteComment } from "@/hooks/useCommunityComments";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentSectionProps {
  postId: string;
  commentsCount: number;
}

export const CommentSection = ({ postId, commentsCount }: CommentSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  const { data: comments, isLoading } = useCommunityComments(postId);
  const { mutate: createComment, isPending: isCreating } = useCreateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    createComment(
      { postId, content: newComment.trim() },
      {
        onSuccess: () => setNewComment(""),
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
          <MessageCircle className="w-4 h-4" />
          <span>{commentsCount} {commentsCount === 1 ? "comment" : "comments"}</span>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-4 space-y-4">
        {/* Comment input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment..."
              className="min-h-[40px] resize-none"
              rows={1}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!newComment.trim() || isCreating}
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Comments list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : comments?.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.author?.avatar_url || undefined} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {comment.author?.display_name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {comment.author?.display_name || "Member"}
                    </span>
                    <span className="text-xs text-muted-foreground" title={format(new Date(comment.created_at), "PPp")}>
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                    {comment.user_id === user?.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteComment({ commentId: comment.id, postId })}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
