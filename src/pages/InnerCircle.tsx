import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inclusions = [
  "Everything in the Accelerator",
  "Direct access to Morgan via private Slack",
  "Quarterly 1-on-1 strategy sessions",
  "1 private live event per year with Morgan (intimate, high-touch, in-person)",
  "Your AfroTech conference ticket included",
  "CEO Spring Break retreat invitation",
  "Curated peer mastermind (monthly)",
  "First access to all new WorkSmart products and partnerships",
];

const InnerCircle = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    businessName: "",
    businessType: "",
    teamSize: "",
    annualRevenue: "",
    yearsInBusiness: "",
    helpWith: "",
    referralSource: "",
    anythingElse: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.businessName || !form.businessType || !form.teamSize || !form.annualRevenue || !form.yearsInBusiness || !form.helpWith || !form.referralSource) {
      toast({ title: "Please fill out all required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-inner-circle`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify(form),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }
      setSubmitted(true);
      toast({ title: "Application submitted", description: "We'll review your application within 5 business days." });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Something went wrong';
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] mb-6" style={{ color: "hsl(var(--gold))" }}>
              Application Only · 50 Members Max
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: "hsl(var(--slate-bg))" }}>
              The room where it happens.
            </h1>
            <p className="text-[17px] leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-4">
              The WorkSmart Inner Circle is a curated group of 50 business owners doing $500K+/year who want direct access to Morgan, quarterly strategy sessions, 1 private live event per year with Morgan, their AfroTech conference ticket, exclusive retreats, and a peer network that operates at their level.
            </p>
            <p className="text-[17px] leading-relaxed font-medium max-w-2xl mx-auto" style={{ color: "hsl(var(--slate-bg))" }}>
              If you're at the point where one strategic conversation could be worth $50K in revenue, this is where you belong.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider line with gold accent */}
      <div className="flex justify-center">
        <div className="w-16 h-[2px] rounded-full" style={{ backgroundColor: "hsl(var(--gold))" }} />
      </div>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center" style={{ color: "hsl(var(--slate-bg))" }}>
            What's Included
          </h2>
          <ul className="space-y-4">
            {inclusions.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--gold) / 0.15)" }}>
                  <Check className="w-3 h-3" style={{ color: "hsl(var(--gold))" }} />
                </span>
                <span className="text-[16px] text-muted-foreground leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20" style={{ backgroundColor: "hsl(var(--slate-bg))" }}>
        <div className="container mx-auto px-6 max-w-2xl">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "hsl(var(--gold) / 0.2)" }}>
                <Check className="w-8 h-8" style={{ color: "hsl(var(--gold))" }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Application Received</h3>
              <p className="text-white/60 max-w-md mx-auto">
                Applications are reviewed within 5 business days. Acceptance is based on fit, not first-come-first-served. We'll be in touch.
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 text-center">Apply Now</h2>
              <p className="text-white/50 text-sm text-center mb-10">
                Applications reviewed within 5 business days. Acceptance is based on fit, not first-come-first-served.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Full Name *</label>
                    <Input value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30" placeholder="Jane Smith" required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30" placeholder="jane@company.com" required />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Business Name *</label>
                  <Input value={form.businessName} onChange={(e) => handleChange("businessName", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30" placeholder="Your business name" required />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Business Type *</label>
                    <Select value={form.businessType} onValueChange={(v) => handleChange("businessType", v)}>
                      <SelectTrigger className="bg-white/10 border-white/10 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="coaching">Coaching</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="agency">Agency</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Team Size *</label>
                    <Select value={form.teamSize} onValueChange={(v) => handleChange("teamSize", v)}>
                      <SelectTrigger className="bg-white/10 border-white/10 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="just-me">Just me</SelectItem>
                        <SelectItem value="2-3">2-3</SelectItem>
                        <SelectItem value="4-5">4-5</SelectItem>
                        <SelectItem value="6-10">6-10</SelectItem>
                        <SelectItem value="10+">10+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Current Annual Revenue *</label>
                    <Select value={form.annualRevenue} onValueChange={(v) => handleChange("annualRevenue", v)}>
                      <SelectTrigger className="bg-white/10 border-white/10 text-white">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="100-250k">$100-250K</SelectItem>
                        <SelectItem value="250-500k">$250-500K</SelectItem>
                        <SelectItem value="500k-1m">$500K-1M</SelectItem>
                        <SelectItem value="1m+">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Years in Business *</label>
                    <Input value={form.yearsInBusiness} onChange={(e) => handleChange("yearsInBusiness", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30" placeholder="e.g. 5 years" required />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">What's the #1 thing you want help with? *</label>
                  <Textarea value={form.helpWith} onChange={(e) => handleChange("helpWith", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30 min-h-[100px]" placeholder="Tell us about your biggest challenge or goal..." required />
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">How did you hear about WorkSmart? *</label>
                  <Input value={form.referralSource} onChange={(e) => handleChange("referralSource", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30" placeholder="e.g. Instagram, a friend, AfroTech..." required />
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 mb-1.5 block">Anything else we should know? (optional)</label>
                  <Textarea value={form.anythingElse} onChange={(e) => handleChange("anythingElse", e.target.value)} className="bg-white/10 border-white/10 text-white placeholder:text-white/30 min-h-[80px]" placeholder="Optional" />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto rounded-full px-10 py-6 text-[15px] font-semibold gap-2"
                    style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--slate-bg))" }}
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnerCircle;
