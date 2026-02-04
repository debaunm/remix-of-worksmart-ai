import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { CommunityPost } from "@/hooks/useCommunityPosts";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      if (!user?.id) throw new Error("Not authenticated");

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("community_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from("community_likes")
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        if (error) throw error;
      }

      return { postId, isLiked: !isLiked };
    },
    onMutate: async ({ postId, isLiked }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData<CommunityPost[]>(["community-posts"]);

      // Optimistically update
      queryClient.setQueryData<CommunityPost[]>(["community-posts"], (old) =>
        old?.map((post) =>
          post.id === postId
            ? {
                ...post,
                user_has_liked: !isLiked,
                likes_count: (post.likes_count || 0) + (isLiked ? -1 : 1),
              }
            : post
        )
      );

      return { previousPosts };
    },
    onError: (_, __, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(["community-posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
  });
};
