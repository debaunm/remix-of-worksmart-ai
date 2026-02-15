import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "I have a business or side hustle doing $5-10K a month. Is this for me?",
    a: "This is exactly who WorkSmart is built for. You've proven you can make money - now you need the systems, strategy, and advisors to scale it past $20K, $50K, even $100K/month without working twice as hard. The Accelerator gives you the full operating system plus weekly advisor calls with a CPA, revenue coach, and ops strategist. You'll stop guessing and start building with a plan.",
  },
  {
    q: "How is this different from every other business coaching program?",
    a: "Two things. First, WorkSmart isn't coaching - it's infrastructure. We don't motivate you. We give you the systems, templates, and advisors so you can build a real business with real operations. Second, our advisor team isn't one guru with a course. It's a CPA, an HR strategist, a legal advisor, a revenue coach, and an operations lead - the same team a funded startup would have, available to you weekly.",
  },
  {
    q: "I just got laid off. Is this the right time to join?",
    a: "This is exactly the right time. If you're transitioning from corporate to self-employment, the Wealth Builder Blueprint ($497) helps you map out your income streams and build a plan immediately - including how to turn your corporate skills into a revenue source. If you're further along, the Accelerator gives you the full system plus weekly advisor calls so you're not building blind.",
  },
  {
    q: "I don't have a business idea yet. Can I still join?",
    a: "Yes - start with the free community or the Wealth Builder Blueprint. The course walks you through auditing your skills, identifying your best income opportunities, and building a wealth plan that works for your situation. Most people don't need a \"business idea\" - they need to package what they already know into something someone will pay for. That's exactly what we help you do.",
  },
  {
    q: "What if I'm already making money but I'm stuck?",
    a: "The Accelerator is built for you. Module 3 (Master Your Data) and Module 4 (Master Your Revenue) are specifically designed for business owners who have revenue but can't figure out how to grow it without working more hours. The advisor calls are where this gets real - you'll bring your specific bottleneck and get a specific answer, not generic advice.",
  },
  {
    q: "What's the refund policy?",
    a: "Complete Modules 1 and 2 within your first 30 days. If you've done the work and genuinely feel WorkSmart isn't for you, email us and we'll refund you - no interrogation. We only ask that you actually engage with the system before deciding. We're that confident it works.",
  },
  {
    q: "Do I need to know about AI to join?",
    a: "No. We don't teach you how to be an AI expert. We teach you how to run a business - and show you where AI makes that easier. Think of AI as a tool in your toolkit, not a subject you need to master. If you can use Google, you can use the AI tools we recommend.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 section-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left font-semibold text-foreground text-[16px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
