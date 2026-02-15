import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "The accelerator helped me make meaningful progress in several areas. It expanded my understanding of how to leverage AI more effectively and gave me clarity on how to begin developing my thought leadership and personal brand. Just three months later, I can confidently say I'm one of the most AI-fluent team members at my company - and among the top few in a non-technical role.",
    name: "Elisa Cuellar",
    role: "Senior Manager of Talent Experience and Culture",
  },
  {
    quote:
      "My AI fluency completely changed. One of the main reasons I joined was to force myself into conversations about AI so I could understand the language. This class helped me quickly get acclimated and prepared me for upcoming meetings I wouldn't have been ready for otherwise.",
    name: "Sharma Graham",
    role: "Co-Founder, M.A.D.E. To Lead",
  },
  {
    quote:
      "It helped open my eyes to all the tools available for automation and helping streamline your work and personal life. I loved this class! I learned a lot about different AI tools and what's possible with each one. I want to dive further in!",
    name: "Debbie",
    role: "Data Analytics Team Lead",
  },
  {
    quote:
      "It's a fast-paced, hands-on intensive that demystifies AI - covering what it is and how to apply top tools to real-world use cases. The program is equally valuable for entrepreneurs and corporate leaders looking to integrate AI into their work and everyday life.",
    name: "Elisa Cuellar",
    role: "Senior Manager of Talent Experience and Culture",
  },
  {
    quote:
      "This is for people who are ready to start the integration and have capacity to build out these new systems - not just learn it. You have to actually try it and see what works and what doesn't.",
    name: "Kalyanna Williams",
    role: "Founder",
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-24 section-slate">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-white text-center mb-14"
        >
          What Members Are Saying
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-7"
            >
              <blockquote className="text-white/90 text-[15px] italic leading-relaxed mb-5">
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-sm" style={{ color: "hsl(var(--gold))" }}>{t.name}</p>
                <p className="text-white/50 text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
