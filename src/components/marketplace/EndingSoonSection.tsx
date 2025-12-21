import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTools } from "@/hooks/useTools";
import ToolMarketplaceCard from "./ToolMarketplaceCard";

const EndingSoonSection = () => {
  const { data: tools } = useTools();
  
  // Get a few tools to show as "ending soon" - in real app would have expiry dates
  const endingSoonTools = tools?.slice(0, 4) || [];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-warning-orange" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ending Soon
              </h2>
            </div>
            <p className="text-muted-foreground">
              Limited-time offers expiring this week. Don't miss out!
            </p>
          </div>
          <Link to="/#all-tools">
            <Button variant="ghost" className="gap-2 hidden sm:flex">
              View all deals
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-6 min-w-max">
            {endingSoonTools.map((tool, index) => (
              <div key={tool.id} className="w-80 flex-shrink-0">
                <ToolMarketplaceCard tool={tool} index={index} showCountdown />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndingSoonSection;
