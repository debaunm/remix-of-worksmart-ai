import { Check, DollarSign, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCheckout } from "@/hooks/useCheckout";
import { usePurchases } from "@/hooks/usePurchases";

const systems = [
  {
    id: "money_systems",
    name: "Money Systems",
    price: "$397",
    description: "Master your money and build lasting wealth",
    icon: DollarSign,
    iconColor: "text-success-green",
    bgColor: "bg-success-green/10",
    route: "/money-systems",
    features: [
      "3-Part Video Workshop Series",
      "Wealth Dashboard Spreadsheet",
      "Coast FIRE Calculator",
      "Freedom Number Calculator",
      "Lifetime access & updates",
    ],
  },
  {
    id: "work_systems",
    name: "Work Systems",
    price: "$397",
    description: "10x your productivity with AI-powered workflows",
    icon: Briefcase,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    route: "/work-systems",
    features: [
      "AI Mastery Course (6+ hours)",
      "AI Content Systems Session",
      "Automation with Zapier Session",
      "Premium AI Tools Access",
      "Lifetime access & updates",
    ],
  },
];

const faqs = [
  {
    q: "Is this a one-time payment or subscription?",
    a: "One-time payment. Pay once, access forever with lifetime updates included.",
  },
  {
    q: "What's the difference between Money Systems and Work Systems?",
    a: "Money Systems focuses on personal finance, wealth building, and achieving financial freedom. Work Systems focuses on AI productivity, automation, and growing your career or business.",
  },
  {
    q: "Can I buy both systems?",
    a: "Absolutely! Many of our customers get both to master their money AND their productivity. Each system is purchased separately.",
  },
  {
    q: "Do I get access immediately?",
    a: "Yes! After purchase, you'll get instant access to all courses, tools, and resources in your dashboard.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
  },
];

const Pricing = () => {
  const { checkout, isLoading } = useCheckout();
  const { hasMoneyAccess, hasWorkAccess } = usePurchases();

  const handlePurchase = (productType: string) => {
    checkout(productType as "money_systems" | "work_systems");
  };

  const hasAccess = (systemId: string) => {
    if (systemId === "money_systems") return hasMoneyAccess;
    if (systemId === "work_systems") return hasWorkAccess;
    return false;
  };

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
              Choose Your{" "}
              <span className="gradient-text">System</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses and tools to transform your finances or supercharge your productivity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {systems.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="relative h-full flex flex-col border-border hover:border-primary/50 transition-colors">
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${system.bgColor} flex items-center justify-center`}>
                      <system.icon className={`w-8 h-8 ${system.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl">{system.name}</CardTitle>
                    <CardDescription className="text-base">{system.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-center mb-6">
                      <span className="text-5xl font-bold">{system.price}</span>
                      <span className="text-muted-foreground ml-2">one-time</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {system.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-success-green/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-success-green" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {hasAccess(system.id) ? (
                      <Link to="/dashboard">
                        <Button className="w-full gap-2" variant="outline">
                          Go to Dashboard
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full gap-2" 
                        variant="hero"
                        onClick={() => handlePurchase(system.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : `Get ${system.name}`}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
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

          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands who have mastered their money and productivity with our proven systems.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/money-systems">
                <Button size="lg" variant="outline" className="gap-2">
                  <DollarSign className="w-5 h-5" />
                  Explore Money Systems
                </Button>
              </Link>
              <Link to="/work-systems">
                <Button size="lg" variant="outline" className="gap-2">
                  <Briefcase className="w-5 h-5" />
                  Explore Work Systems
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

export default Pricing;
