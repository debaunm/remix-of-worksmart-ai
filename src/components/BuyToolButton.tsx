import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BuyToolButtonProps {
  toolName: string;
  className?: string;
}

const BuyToolButton = ({ toolName, className = "" }: BuyToolButtonProps) => {
  return (
    <Link 
      to={`/pricing?tool=${encodeURIComponent(toolName)}`}
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
