import { motion } from "framer-motion";

const logos = [
  { name: "Forbes", text: "Forbes" },
  { name: "Inc.", text: "Inc." },
  { name: "Essence", text: "ESSENCE" },
  { name: "SXSW", text: "SXSW" },
  { name: "AfroTech", text: "AfroTech" },
];

const SocialProofBar = () => {
  return (
    <section className="py-12 section-white border-y border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.span
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="text-xl md:text-2xl font-bold text-foreground/30 tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {logo.text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
