import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <section className="py-24 section-slate relative overflow-hidden">
      {/* Gold burst accent */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-[0.15]"
        style={{
          background: `radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
            The rules of work changed. Nobody sent a memo.
          </h2>
          <p className="text-[17px] md:text-lg text-white/70 leading-relaxed mb-6">
            Millions of professionals are becoming self-employed - not because they planned to, but because the economy decided for them. AI is replacing roles faster than companies can restructure. Layoffs aren't temporary anymore. And the people who built careers inside companies are now trying to build businesses from scratch, alone, with no playbook.
          </p>
          <p className="text-[17px] md:text-lg text-white/70 leading-relaxed mb-8">
            Some of them watched 200 hours of YouTube. Read the books. Took the free masterclass. They still haven't launched. That's not an information problem. That's an implementation problem.
          </p>
          <p className="text-lg md:text-xl font-semibold" style={{ color: "hsl(var(--gold))" }}>
            WorkSmart was built for this exact moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
