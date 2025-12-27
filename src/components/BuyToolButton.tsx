import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BuyToolButtonProps {
  toolName: string;
  toolSlug?: string;
  className?: string;
}

const BuyToolButton = ({ toolName, toolSlug, className = "" }: BuyToolButtonProps) => {
  // For now, link directly to success page (would be checkout in production)
  const slug = toolSlug || toolName.toLowerCase().replace(/\s+/g, "-");
  
  return (
    <Link 
      to={`/purchase-success?tool=${encodeURIComponent(toolName)}&slug=${encodeURIComponent(slug)}`}
      className={className}
    >
      <Button 
        variant="outline" 
        className="gap-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <ShoppingCart className="w-4 h-4" />
        Buy This Tool – $14.99
      </Button>
    </Link>
  );
};

export default BuyToolButton;
