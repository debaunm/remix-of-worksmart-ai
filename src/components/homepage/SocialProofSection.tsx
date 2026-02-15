import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I went from laid off to $18K/month in consulting revenue in 4 months. WorkSmart didn't just give me a roadmap - they gave me a pricing strategy, a proposal template, and an advisor who told me to triple my rates. I did. It worked.",
    name: "[Member Name]",
    role: "Former Marketing Director → Brand Strategy Consultant",
    location: "Atlanta, GA",
  },
  {
    quote:
      "I was charging $75/hour and working 60 hours a week. After Master Your Revenue, I restructured into productized packages. Now I charge $5K/engagement, work 30 hours a week, and make more than I did at my corporate job.",
    name: "[Member Name]",
    role: "Operations Consultant",
    location: "Chicago, IL",
  },
  {
    quote:
      "The AI tool stack alone saved me 15 hours a week. But what really changed my business was Master Your Data - I finally understood which clients were actually profitable and which ones were draining me.",
    name: "[Member Name]",
    role: "Freelance Creative Director",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "I had the skills but no idea how to turn them into a real business. Module 1 rewired how I thought about myself - from contractor to CEO. That shift alone was worth the investment.",
    name: "[Member Name]",
    role: "Independent UX Consultant",
    location: "Austin, TX",
  },
  {
    quote:
      "The weekly advisor calls are like having a board of directors for my small business. Last month the CPA saved me $14K on my tax strategy. The program paid for itself in one call.",
    name: "[Member Name]",
    role: "Small Business Owner, 3 Employees",
    location: "Brooklyn, NY",
  },
  {
    quote:
      "I was stuck at $8K/month for over a year. WorkSmart helped me see that my pricing was the bottleneck, not my pipeline. I restructured my offers and hit $22K in month three.",
    name: "[Member Name]",
    role: "Business Strategy Consultant",
    location: "Washington, DC",
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
          What Members Are Building
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
                <p className="text-gold font-semibold text-sm">{t.name}</p>
                <p className="text-white/50 text-sm">
                  {t.role} · {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
