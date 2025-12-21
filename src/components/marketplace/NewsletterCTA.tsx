import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail } from "lucide-react";
import { useState } from "react";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
  };

  return (
    <section className="py-24 section-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Playful message */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8">
            <Heart className="w-4 h-4 text-primary" />
            Made it all the way down here? Respect.
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get the best deals, first.
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Join 10,000+ professionals getting insider perks, product updates, and exclusive discounts delivered to their inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-11 pr-4 text-base rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                required
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 font-semibold rounded-xl">
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-white/40 mt-6">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
