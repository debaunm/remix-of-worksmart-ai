import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
  };

  return (
    <section className="py-20 section-green">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Not ready yet? Stay close.
          </h2>
          <p className="text-white/90 text-[17px] mb-10 leading-relaxed">
            Weekly insights on business, AI, and the future of work. Free. No spam. Unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-11 pr-4 text-base rounded-xl bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:border-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="h-14 px-8 font-semibold rounded-full bg-foreground hover:bg-foreground/90 text-white"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-white/60 mt-6">
            Join 10,000+ readers. Free. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
