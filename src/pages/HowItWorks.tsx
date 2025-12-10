import { motion } from "framer-motion";
import { CheckCircle, Zap, Target, TrendingUp, ArrowRight, Sparkles, Clock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Choose Your Tool",
    description: "Browse our curated collection of AI-powered tools designed for executives, entrepreneurs, and professionals.",
    icon: Target,
  },
  {
    number: "02",
    title: "Input Your Context",
    description: "Provide the specific details about your situation, goals, or content. Our tools are designed to understand your unique needs.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Get AI-Powered Results",
    description: "Receive structured, actionable outputs crafted by advanced AI models trained on best practices and proven frameworks.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Apply & Succeed",
    description: "Use the personalized recommendations, content, and strategies to accelerate your professional success.",
    icon: TrendingUp,
  },
];

const benefits = [
  {
    title: "Save 10+ Hours Weekly",
    description: "Automate time-consuming tasks like content creation, decision analysis, and strategic planning.",
    icon: Clock,
  },
  {
    title: "Expert-Level Output",
    description: "Get results that rival expensive consultants, powered by AI trained on proven business frameworks.",
    icon: CheckCircle,
  },
  {
    title: "Instant Results",
    description: "No waiting for consultants or agencies. Get professional-grade deliverables in seconds.",
    icon: Zap,
  },
];

const testimonials = [
  {
    quote: "The C-Level Statement Builder helped me nail my board presentation. What usually takes me a week took 10 minutes.",
    author: "Sarah K.",
    role: "VP of Operations",
  },
  {
    quote: "I've tried dozens of AI tools. WorkSmart.ai is the only one that actually understands what executives need.",
    author: "Michael R.",
    role: "CEO, Tech Startup",
  },
  {
    quote: "The Brand Voice Generator captured my personality perfectly. Now all my content sounds authentically me.",
    author: "Jessica L.",
    role: "Founder & Creator",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Productivity
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Work Smarter, Not Harder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade AI tools that deliver executive-level results in seconds. 
              No learning curve. No complexity. Just results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-colors">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Professionals Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for busy executives and entrepreneurs who need results, not complexity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <p className="text-foreground italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Work Smarter?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already saving hours every week with WorkSmart.ai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#all-tools">
                <Button size="lg" variant="hero" className="text-lg px-8">
                  Try Free Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
