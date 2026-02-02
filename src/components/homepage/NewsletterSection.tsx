import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thanks for subscribing! Check your inbox.");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Mail className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">The WorkSmart Newsletter</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Weekly Insights on AI, Money & Career Growth
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join 15,000+ ambitious professionals who get our best strategies, tools, 
            and frameworks delivered straight to their inbox every week.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={isLoading}
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-semibold whitespace-nowrap"
            >
              {isLoading ? "Subscribing..." : (
                <>
                  Subscribe Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Trust Text */}
          <p className="text-sm text-white/50">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
