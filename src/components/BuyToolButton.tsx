import { useState } from "react";
import { ShoppingCart, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/usePurchases";
import { useToast } from "@/hooks/use-toast";

interface BuyToolButtonProps {
  toolName: string;
  toolSlug?: string;
  className?: string;
}

const BuyToolButton = ({ toolName, toolSlug, className = "" }: BuyToolButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { purchases } = usePurchases();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const slug = toolSlug || toolName.toLowerCase().replace(/\s+/g, "-");
  
  // Check if user owns this specific tool
  const ownsThisTool = purchases?.some(p => p.product_type === `tool:${slug}`) ?? false;

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to purchase this tool.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productType: "tool",
          toolName,
          toolSlug: slug,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No checkout URL returned");

      window.open(data.url, "_blank");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Failed to start checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show owned badge if user has purchased this tool
  if (ownsThisTool) {
    return (
      <Badge 
        className={`gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 ${className}`}
      >
        <CheckCircle className="w-4 h-4" />
        You Own This Tool
      </Badge>
    );
  }
  
  return (
    <Button 
      onClick={handlePurchase}
      disabled={isLoading}
      variant="outline" 
      className={`gap-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <ShoppingCart className="w-4 h-4" />
      )}
      {isLoading ? "Loading..." : "Buy This Tool – $14.99"}
    </Button>
  );
};

export default BuyToolButton;
