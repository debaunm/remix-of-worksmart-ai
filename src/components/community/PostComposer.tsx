import { useState, useRef } from "react";
import { Image, Video, Send, X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useCreatePost, type MediaType } from "@/hooks/useCommunityPosts";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

export const PostComposer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("none");
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createPost, isPending } = useCreatePost();
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setMediaType("image");
    setShowMediaInput(true);

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      // Simulate progress for UX (Supabase doesn't provide upload progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("community-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      clearInterval(progressInterval);

      if (error) throw error;

      // Store just the file path - signed URLs will be generated when displaying
      setMediaUrl(data.path);
      setUploadProgress(100);
      
      toast({
        title: "Image uploaded",
        description: "Your image is ready to be included in the post.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
      setMediaType("none");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const clearMedia = () => {
    setShowMediaInput(false);
    setMediaUrl("");
    setMediaType("none");
    setPreviewUrl(null);
    setUploadProgress(0);
  };

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
          clearMedia();
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

  const handleVideoSelect = () => {
    setMediaType("video");
    setShowMediaInput(true);
    setPreviewUrl(null);
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

          {/* Image preview */}
          {previewUrl && mediaType === "image" && (
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img 
                src={previewUrl} 
                alt="Upload preview" 
                className="w-full max-h-64 object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <Progress value={uploadProgress} className="w-32" />
                </div>
              )}
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearMedia}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Video URL input */}
          {showMediaInput && mediaType === "video" && (
            <div className="flex gap-2">
              <Input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Video embed URL (YouTube, Vimeo)..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearMedia}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant={mediaType === "image" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Upload Image
              </Button>
              <Button
                type="button"
                variant={mediaType === "video" ? "secondary" : "ghost"}
                size="sm"
                onClick={handleVideoSelect}
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </Button>
            </div>

            <Button 
              type="submit" 
              disabled={!title.trim() || !content.trim() || isPending || isUploading}
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
