import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, TrendingUp, Heart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import morganPhoto from "@/assets/morgan-debaun-new.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const painPoints = [
  "You can't seem to escape the grind and keep getting stuck in the weeds, day after day.",
  "You know you need to delegate and hire but you feel nervous about wasting money or losing control.",
  "You neglect spending time building out the infrastructure of your business even though you know it will unlock more freedom.",
  "You're ready to hit the next revenue level but you're not sure exactly what to prioritize next.",
];

const pillars = [
  { title: "Master Yourself", number: "01" },
  { title: "Master Your Team", number: "02" },
  { title: "Master Your Data", number: "03" },
  { title: "Master Your Revenue", number: "04" },
  { title: "Master Your Growth", number: "05" },
];

const benefits = [
  "Access to an inclusive community where you connect with our CEOs, WorkSmart Advisors and daily access to coaches to help you problem-solve live.",
  "Access To Our Live Events: We can get a lot done from our pajamas at home, but there is just something about getting in a room full of high-level entrepreneurs that can unlock areas of growth you didn't even know existed.",
  "Weekly calls with WorkSmart Advisors including a monthly \"all hands\" with Morgan to answer your questions live.",
  "Vendor Discounts: Receive premium perks, discounts, credits to software, tools, and services.",
  "Video Library & Templates: Access to \"The vault,\" business owner-approved resources. Over 100 videos answering your top business questions, \"done for you\" templates and toolkits.",
  "Member Directory: An exclusive directory of WorkSmart members listed by stage, industry, expertise, and geography for instant connections. Deals are done in the DMs!",
];

const milestones = [
  { title: "Master Yourself", number: "Milestone One" },
  { title: "Master Your Team", number: "Milestone Two" },
  { title: "Master Your Data", number: "Milestone Three" },
  { title: "Master Your Revenue", number: "Milestone Four" },
  { title: "Master Your Growth", number: "Milestone Five" },
];

const bonuses = [
  "How to Run a Successful Meeting",
  "How to Know When It's Time for Investment",
  "The Four People Every Successful CEO Needs in Their Corner",
];

const membershipFit = [
  "Have at least $10k in consistent monthly revenue",
  "Are ready to master the mindset of a true CEO and transition from solopreneur/founder",
  "Feel your business revenue and growth has plateaued and want to jumpstart your growth but don't know what to prioritize next.",
  "You are ready to get out of the day to day weeds of your business and are ready to build a team around you (personal and professional)",
  "You want to learn how to accurately predict future business growth and direction and get over your nerves of taking a wrong step",
];


const faqs = [
  {
    q: "How long is my WorkSmart available?",
    a: "Once you enroll, you have ongoing access to the course materials and community for as long as your membership is active.",
  },
  {
    q: "How will each milestone be released?",
    a: "All milestones are available immediately upon enrollment so you can work at your own pace.",
  },
  {
    q: "Are there payment plans available?",
    a: "Yes! We offer flexible payment plans. Reach out to our team for details.",
  },
  {
    q: "What if I am unhappy with the course?",
    a: "There are no refunds, but you can cancel your membership anytime—no long-term commitment required.",
  },
  {
    q: "Will the WorkSmart membership work for my specific business?",
    a: "WorkSmart is designed for entrepreneurs across industries. The principles of mastering yourself, your team, your data, your revenue, and your growth are universal to all businesses.",
  },
];

const JOIN_URL = "https://www.patreon.com/MorganDeBaun";

const Accelerator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 section-greige relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Scale your business revenue, hire a team, and live a balanced life
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              WorkSmart is a program and community for established entrepreneurs who want to exponentially increase their revenue while still maintaining a sustainable lifestyle.
            </p>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-14 px-10 font-semibold rounded-full text-lg gap-2 bg-foreground hover:bg-foreground/90 text-white">
                JOIN NOW
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured In ─── */}
      <section className="py-8 border-y border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Featured In—</span>
            {["Forbes", "ESSENCE", "TechCrunch", "Inc.", "CNBC"].map((pub) => (
              <span key={pub} className="text-xl md:text-2xl font-extrabold text-foreground/70">{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Three Pillars ─── */}
      <section className="py-20 section-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Join a community", desc: "You're never left to do it all by yourself. Get instant access to a community of fellow CEOs." },
              { icon: TrendingUp, title: "Grow your business", desc: "You'll be equipped with the education and resources to increase your revenue." },
              { icon: Heart, title: "Live a healthy life", desc: "We'll provide you with guidance, accountability, and tools for a sustainable lifestyle." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: "hsl(var(--kelly-green) / 0.12)" }}>
                  <item.icon className="w-6 h-6 text-kelly-green" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pain Points ─── */}
      <section className="py-20 section-greige">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Does this sound like you?
            </h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-5">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 bg-card rounded-xl border border-border p-5"
              >
                <div className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "hsl(var(--fire) / 0.15)" }}>
                  <Check className="w-3.5 h-3.5" style={{ color: "hsl(var(--fire))" }} />
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-14 px-10 font-semibold rounded-full text-lg gap-2 bg-foreground hover:bg-foreground/90 text-white">
                JOIN NOW <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 5 Elements of Success ─── */}
      <section className="py-20 section-slate">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">5 Elements of Success</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              How WorkSmart helps you succeed—
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-5 rounded-xl border border-white/10 bg-white/5"
              >
                <span className="font-mono text-xs text-white/40">{p.number}</span>
                <h3 className="text-base font-bold text-white mt-2">{p.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="py-20 section-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Benefits</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
              Inside the membership
            </h2>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-12 px-8 font-semibold rounded-full gap-2 bg-foreground hover:bg-foreground/90 text-white mb-10">
                JOIN NOW <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 bg-card rounded-xl border border-border p-6"
              >
                <Check className="w-5 h-5 text-kelly-green shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Is WorkSmart Right for Me ─── */}
      <section className="py-20 section-greige">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Is WorkSmart+ right for me?
            </h2>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border-2 border-primary p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-foreground mb-1">WorkSmart+ Membership</h3>
              <p className="text-2xl font-extrabold text-foreground mt-2 mb-1">$297<span className="text-base font-normal text-muted-foreground">/month</span></p>
              <p className="text-sm text-muted-foreground mb-6">The right fit if you…</p>
              <div className="space-y-4 mb-8">
                {membershipFit.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-kelly-green shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-12 rounded-full font-semibold gap-2 bg-primary hover:bg-primary/90 text-white">
                  JOIN WORKSMART+ <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground text-center mt-4">No refunds · Cancel anytime</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Meet Morgan ─── */}
      <section className="py-20 section-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <img
                src={morganPhoto}
                alt="Morgan DeBaun, founder and CEO"
                className="w-full max-w-sm rounded-2xl grayscale object-cover aspect-[3/4]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Your Biz Advisor</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                Meet Morgan DeBaun
              </h2>
              <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  Some people call me their secret CRO (Chief Revenue Officer), but you can just think of me as your secret weapon to success in life and business.
                </p>
                <p>
                  I'm a midwest gal turned serial entrepreneur who has spent the past decade mastering the art of scalable success. As the Founder and CEO of Blavity Inc. and AfroTech. Owner of Shadow and Act, 21 Ninety, Travel Noire and CEO Spring Break. I'm intimately familiar with the tools, mindset, and methods needed by CEO's like you to scale their business, grow effective teams, all while living a balanced life.
                </p>
                <p>
                  At the end of the day, I'm all about growing a business and team that not only succeeds but leads.
                </p>
              </div>
              <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
                <Button className="h-12 px-8 font-semibold rounded-full gap-2 bg-foreground hover:bg-foreground/90 text-white">
                  JOIN WorkSmart+ NOW <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── The WorkSmart Method ─── */}
      <section className="py-20 section-slate">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              The WorkSmart Method
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Inside WorkSmart, you're getting my signature process to scale your business revenue on repeat.
            </p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/5"
              >
                <span className="font-mono text-xs text-white/40 uppercase whitespace-nowrap">{m.number}</span>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
              </motion.div>
            ))}
            {/* Bonuses */}
            <div className="pt-4">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Bonuses</p>
              {bonuses.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-lg"
                >
                  <Sparkles className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--gold))" }} />
                  <span className="text-sm text-white/80">{b}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 section-greige">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Still got questions?
            </h2>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground text-sm py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 section-slate">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to work smarter, not harder?
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              Join thousands of entrepreneurs who are scaling their businesses with the right systems, advisors, and community.
            </p>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-14 px-10 font-semibold rounded-full text-lg gap-2 bg-primary hover:bg-primary/90 text-white">
                JOIN NOW <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <p className="text-sm text-white/40 mt-6">
              $297/month · No refunds · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accelerator;
