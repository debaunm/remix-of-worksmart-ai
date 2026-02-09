import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The AI mastery course paid for itself in the first week. I built an automation that handles my entire client onboarding process — something that used to take me 5 hours a week. Now it takes zero.",
    name: "Keisha M.",
    title: "Freelance Consultant, Houston",
    result: "Saved 5+ hrs/week",
  },
  {
    quote: "I'd been meaning to 'figure out my finances' for years. The Wealth Dashboard made it dead simple. I can finally see my net worth, my savings rate, and my FIRE number in one place. I've saved $14K more this year than last year just by following the system.",
    name: "Terrence J.",
    title: "Product Manager, Brooklyn",
    result: "+$14K in savings",
  },
  {
    quote: "I used the Speaker Pricing Formula and the Brand Voice Generator before pitching myself for a conference. I landed a $5,000 speaking fee — my first paid speaking gig ever. WorkSmart gave me the confidence and the framework.",
    name: "Aisha L.",
    title: "VP of Operations, Chicago",
    result: "First $5K speaking fee",
  },
];

const ResultsSection = () => {
  return (
    <section className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="tag-pill mb-6 inline-block">Results</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What Our Members Are Building
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pro-card flex flex-col h-full"
            >
              <blockquote className="text-foreground leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground mb-3">{testimonial.title}</p>
                <span className="badge-result">{testimonial.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
