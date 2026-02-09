import { motion } from "framer-motion";

const InlineTestimonial = () => {
  return (
    <section className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground italic leading-relaxed mb-8">
            "I was working 60-hour weeks and had nothing to show for it financially. Within 3 months of using the Money Systems framework, I automated my savings, started investing consistently, and finally have a plan I actually trust."
          </blockquote>
          <footer className="text-muted-foreground">
            <span className="font-semibold text-foreground">— Danielle R.</span>
            <span className="mx-2">·</span>
            <span>Senior Marketing Manager, Atlanta</span>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default InlineTestimonial;
