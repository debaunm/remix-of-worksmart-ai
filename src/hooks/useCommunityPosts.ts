import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type MediaType = "none" | "image" | "video";

export interface CommunityPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  media_url: string | null;
  media_type: MediaType;
  created_at: string;
  updated_at: string;
  author?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

export interface CreatePostInput {
  title: string;
  content: string;
  media_url?: string;
  media_type?: MediaType;
}

export const useCommunityPosts = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["community-posts"],
    queryFn: async () => {
      // Fetch posts
      const { data: posts, error: postsError } = await supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Fetch likes count for each post
      const { data: likesData } = await supabase
        .from("community_likes")
        .select("post_id");

      // Fetch comments count for each post
      const { data: commentsData } = await supabase
        .from("community_comments")
        .select("post_id");

      // Fetch user's likes
      const { data: userLikes } = user?.id
        ? await supabase
            .from("community_likes")
            .select("post_id")
            .eq("user_id", user.id)
        : { data: [] };

      // Fetch author profiles
      const authorIds = [...new Set(posts?.map((p) => p.author_id) || [])];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", authorIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);
      const likesCountMap = new Map<string, number>();
      const commentsCountMap = new Map<string, number>();
      const userLikesSet = new Set(userLikes?.map((l) => l.post_id) || []);

      likesData?.forEach((like) => {
        likesCountMap.set(like.post_id, (likesCountMap.get(like.post_id) || 0) + 1);
      });

      commentsData?.forEach((comment) => {
        commentsCountMap.set(comment.post_id, (commentsCountMap.get(comment.post_id) || 0) + 1);
      });

      return (posts || []).map((post) => ({
        ...post,
        media_type: post.media_type as MediaType,
        author: profileMap.get(post.author_id) || null,
        likes_count: likesCountMap.get(post.id) || 0,
        comments_count: commentsCountMap.get(post.id) || 0,
        user_has_liked: userLikesSet.has(post.id),
      })) as CommunityPost[];
    },
    enabled: !!user?.id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreatePostInput) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("community_posts")
        .insert({
          author_id: user.id,
          title: input.title,
          content: input.content,
          media_url: input.media_url || null,
          media_type: input.media_type || "none",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from("community_posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
  });
};
