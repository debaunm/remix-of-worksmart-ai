import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { useUserRole } from "@/hooks/useUserRole";
import { PostComposer } from "./PostComposer";
import { CommunityPost } from "./CommunityPost";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const CommunityFeed = () => {
  const { data: posts, isLoading, error } = useCommunityPosts();
  const { isAdmin } = useUserRole();

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">Failed to load posts. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin composer */}
      {isAdmin && <PostComposer />}

      {/* Posts list */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {isAdmin 
                ? "No posts yet. Create your first update above!"
                : "No updates yet. Check back soon!"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {posts?.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
