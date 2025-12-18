import { Check, X, Sparkles, Crown, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { name: "Social Bio Builder", free: true, executive: true, entrepreneur: true },
  { name: "Fix My Content (Lite)", free: true, executive: true, entrepreneur: true },
  { name: "Write It Better", free: true, executive: true, entrepreneur: true },
  { name: "Early Retirement Calculator", free: true, executive: true, entrepreneur: true },
  { name: "C-Level Statement Builder", free: false, executive: true, entrepreneur: false },
  { name: "Roles & Responsibilities Creator", free: false, executive: true, entrepreneur: false },
  { name: "Budget Builder Prompts", free: false, executive: true, entrepreneur: false },
  { name: "LinkedIn Audit Tool (Exec)", free: false, executive: true, entrepreneur: false },
  { name: "Decision Helper", free: false, executive: true, entrepreneur: false },
  { name: "Meeting → Action Plan", free: false, executive: true, entrepreneur: false },
  { name: "Weekly Plan Builder", free: false, executive: true, entrepreneur: false },
  { name: "Personal AI Assistant Setup", free: false, executive: true, entrepreneur: false },
  { name: "Idea-to-Revenue Converter", free: false, executive: false, entrepreneur: true },
  { name: "Pitch Deck Reviewer", free: false, executive: false, entrepreneur: true },
  { name: "Press Release Generator", free: false, executive: false, entrepreneur: true },
  { name: "Brand Voice Generator", free: false, executive: true, entrepreneur: true },
  { name: "21-Day LinkedIn Content Plan", free: false, executive: true, entrepreneur: true },
  { name: "Life Simplifier", free: false, executive: true, entrepreneur: true },
  { name: "Rewrite Message", free: false, executive: true, entrepreneur: true },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with essential AI tools",
    icon: Sparkles,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "4 Free AI Tools",
      "Basic output formatting",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Executive Suite",
    price: "$97",
    description: "Advanced tools for corporate leaders",
    icon: Crown,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    features: [
      "All Free Tools",
      "8 Executive-Only Tools",
      "4 Crossover Tools",
      "Priority support",
      "Structured frameworks",
    ],
    cta: "Get Executive Suite",
    popular: false,
  },
  {
    name: "Entrepreneur Suite",
    price: "$97",
    description: "Growth tools for founders & creators",
    icon: Briefcase,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    features: [
      "All Free Tools",
      "3 Entrepreneur-Only Tools",
      "4 Crossover Tools",
      "Priority support",
      "Revenue frameworks",
    ],
    cta: "Get Entrepreneur Suite",
    popular: false,
  },
  {
    name: "All Access Bundle",
    price: "$120",
    description: "Everything in one powerful package",
    icon: Zap,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "All Free Tools",
      "All Executive Tools",
      "All Entrepreneur Tools",
      "All Crossover Tools",
      "Priority support",
      "Lifetime updates",
    ],
    cta: "Get All Access",
    popular: true,
    savings: "Save $74",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the suite that matches your role. Pay once, use forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`relative h-full flex flex-col ${
                    tier.popular 
                      ? "border-primary shadow-lg shadow-primary/20" 
                      : "border-border"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        BEST VALUE
                      </span>
                    </div>
                  )}
                  {tier.savings && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {tier.savings}
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${tier.bgColor} flex items-center justify-center`}>
                      <tier.icon className={`w-6 h-6 ${tier.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.price !== "$0" && (
                        <span className="text-muted-foreground ml-1">one-time</span>
                      )}
                    </div>
                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Feature Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each tier
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Tool</TableHead>
                        <TableHead className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span>Free</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <Crown className="w-4 h-4 text-purple-500" />
                            <span>Executive</span>
                            <span className="text-xs text-muted-foreground">$97</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <Briefcase className="w-4 h-4 text-amber-500" />
                            <span>Entrepreneur</span>
                            <span className="text-xs text-muted-foreground">$97</span>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {features.map((feature) => (
                        <TableRow key={feature.name}>
                          <TableCell className="font-medium">{feature.name}</TableCell>
                          <TableCell className="text-center">
                            {feature.free ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {feature.executive ? (
                              <Check className="w-5 h-5 text-purple-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {feature.entrepreneur ? (
                              <Check className="w-5 h-5 text-amber-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Is this a one-time payment or subscription?",
                a: "One-time payment. Pay once, use forever with lifetime updates.",
              },
              {
                q: "What's included in the All Access Bundle?",
                a: "Everything! All Executive tools, all Entrepreneur tools, all Crossover tools, and all Free tools. It's the complete WorkSmart.ai toolkit.",
              },
              {
                q: "Can I upgrade later?",
                a: "Yes! If you start with one suite, you can upgrade to All Access anytime. We'll credit your previous purchase.",
              },
              {
                q: "Do I need any technical skills?",
                a: "Not at all. Each tool guides you through simple inputs and delivers professional, ready-to-use outputs.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work Smarter?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of professionals using AI to save hours every week.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="default">
                Get All Access - $120
              </Button>
              <Button size="lg" variant="outline">
                Try Free Tools First
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
