import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams();
  const toolName = searchParams.get("tool") || "Your Tool";
  const toolSlug = searchParams.get("slug") || "";
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Store the purchased tool in localStorage to unlock it
    if (toolSlug) {
      const purchasedTools = JSON.parse(localStorage.getItem("purchasedTools") || "[]");
      if (!purchasedTools.includes(toolSlug)) {
        purchasedTools.push(toolSlug);
        localStorage.setItem("purchasedTools", JSON.stringify(purchasedTools));
      }
      setIsUnlocked(true);
    }
  }, [toolSlug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your purchase was successful
            </p>
          </div>

          <Card className="bg-card border-border mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Tool Unlocked</span>
              </div>
              
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {toolName}
              </h2>
              <p className="text-muted-foreground mb-6">
                You now have lifetime access to this tool. Start using it right away!
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">What's included:</strong>
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>✓ Lifetime access to {toolName}</li>
                  <li>✓ All future updates included</li>
                  <li>✓ No recurring fees</li>
                </ul>
              </div>

              {toolSlug && (
                <Link to={`/tools/${toolSlug}`}>
                  <Button className="w-full gap-2" size="lg">
                    Start Using {toolName}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost">
                  Explore More Tools
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchaseSuccess;
