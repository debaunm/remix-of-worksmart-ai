import { useState } from "react";
import { Image, Video, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useCreatePost, type MediaType } from "@/hooks/useCommunityPosts";
import { useToast } from "@/hooks/use-toast";

export const PostComposer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("none");
  const [showMediaInput, setShowMediaInput] = useState(false);
  const { mutate: createPost, isPending } = useCreatePost();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createPost(
      {
        title: title.trim(),
        content: content.trim(),
        media_url: mediaUrl.trim() || undefined,
        media_type: mediaUrl.trim() ? mediaType : "none",
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          setMediaUrl("");
          setMediaType("none");
          setShowMediaInput(false);
          toast({
            title: "Post published!",
            description: "Your update has been shared with the community.",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to create post",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleMediaTypeSelect = (type: MediaType) => {
    setMediaType(type);
    setShowMediaInput(true);
  };

  return (
    <Card className="border-primary/20 bg-card">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="text-lg font-medium"
          />
          
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an update with your community..."
            className="min-h-[120px] resize-none"
          />

          {showMediaInput && (
            <div className="flex gap-2">
              <Input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder={mediaType === "image" ? "Image URL..." : "Video embed URL (YouTube, Vimeo)..."}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowMediaInput(false);
                  setMediaUrl("");
                  setMediaType("none");
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={mediaType === "image" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleMediaTypeSelect("image")}
              >
                <Image className="w-4 h-4 mr-2" />
                Image
              </Button>
              <Button
                type="button"
                variant={mediaType === "video" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleMediaTypeSelect("video")}
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </Button>
            </div>

            <Button 
              type="submit" 
              disabled={!title.trim() || !content.trim() || isPending}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
