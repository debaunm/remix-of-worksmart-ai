import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToggleLike } from "@/hooks/useLikes";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  postId: string;
  likesCount: number;
  userHasLiked: boolean;
}

export const LikeButton = ({ postId, likesCount, userHasLiked }: LikeButtonProps) => {
  const { mutate: toggleLike, isPending } = useToggleLike();

  const handleClick = () => {
    toggleLike({ postId, isLiked: userHasLiked });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="gap-2 text-muted-foreground hover:text-primary"
    >
      <motion.div
        animate={userHasLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            userHasLiked && "fill-primary text-primary"
          )}
        />
      </motion.div>
      <span>{likesCount}</span>
    </Button>
  );
};
