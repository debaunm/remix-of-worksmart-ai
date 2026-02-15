import { motion } from "framer-motion";

const ReframeSection = () => {
  return (
    <section className="py-24 section-greige">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">
            You don't need more information. You need a system.
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed mb-6">
            The difference between someone who "knows what to do" and someone who's actually making money is implementation. It's having the right template in front of you when you're pricing a proposal at midnight. It's getting on a call with an advisor who's already solved the exact problem you're stuck on. It's being in a room where everyone is building - not just talking about building.
          </p>
          <p className="text-[17px] text-muted-foreground leading-relaxed mb-10">
            That's what WorkSmart is. Not a course you watch and forget. A business operating system you install and run.
          </p>

          {/* Callout block */}
          <div className="border-l-4 border-kelly-green bg-greige rounded-xl pl-6 pr-6 py-6">
            <p className="text-lg text-foreground font-medium leading-relaxed mb-4">
              Think of it this way: you're not an employee who uses AI. You're a CEO whose first hire is AI.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              WorkSmart teaches you to run your business like a CEO - and use AI to operate at 10x your headcount. Every framework, template, and system is built for lean businesses doing big revenue, because that's the reality of building a company in 2026. Whether you're solo or managing a small team, you need infrastructure that scales without bloating your payroll.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReframeSection;
