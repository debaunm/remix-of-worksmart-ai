import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is WorkSmart for?",
    answer: "WorkSmart is built for ambitious professionals, typically mid-career, who want to build real wealth, master AI tools, and stop trading all their time for their success. Our members include managers, directors, VPs, founders, freelancers, and consultants across industries.",
  },
  {
    question: "Do I need to be technical to use the AI tools?",
    answer: "Not at all. The Work Systems course starts from zero and walks you through everything step by step. If you can use Google Docs, you can use our AI systems.",
  },
  {
    question: "What's the difference between buying a course and joining Pro?",
    answer: "The courses (Money Systems and Work Systems) are one-time purchases that give you lifetime access to the training and tools. Pro membership includes monthly live sessions, community access, accountability groups, and new tools and templates every month. It's the full operating system.",
  },
  {
    question: "Can I upgrade from a course to Pro later?",
    answer: "Yes. If you've already purchased Money Systems or Work Systems, contact our support team and we'll credit your purchase toward your Pro membership.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes. We offer a 30-day money-back guarantee on all products. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "How do the live sessions work?",
    answer: "Pro members get access to a monthly live strategy session where our team covers timely topics, answers questions, and provides direct feedback. Sessions are recorded and posted to the dashboard if you can't attend live.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 section-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-border px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
