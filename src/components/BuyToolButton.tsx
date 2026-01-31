import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface BuyToolButtonProps {
  toolName: string;
  toolSlug?: string;
  className?: string;
}

const BuyToolButton = ({ toolName, toolSlug, className = "" }: BuyToolButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const slug = toolSlug || toolName.toLowerCase().replace(/\s+/g, "-");

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

      // Open Stripe checkout in new tab
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
