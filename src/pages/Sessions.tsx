import { motion } from "framer-motion";
import { Clock, Play, Users, ArrowRight, Zap, Brain, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface Session {
  title: string;
  description: string;
  duration: string;
  format: "Live" | "On-Demand";
  price: string;
  icon: React.ReactNode;
  slug: string;
  complementarySystem?: {
    name: string;
    link: string;
  };
}

interface SessionCategory {
  title: string;
  icon: React.ReactNode;
  sessions: Session[];
}

const sessionCategories: SessionCategory[] = [
  {
    title: "AI Foundations",
    icon: <Brain className="w-6 h-6" />,
    sessions: [
      {
        title: "AI Foundations Session: ChatGPT, Claude & Gemini",
        description: "Understand how modern AI tools actually work, when to use each one, and how to avoid common mistakes.",
        duration: "60 minutes",
        format: "On-Demand",
        price: "$49",
        icon: <Brain className="w-5 h-5" />,
        slug: "ai-foundations",
      },
    ],
  },
  {
    title: "AI for Execution",
    icon: <Megaphone className="w-6 h-6" />,
    sessions: [
      {
        title: "AI Content Systems Session",
        description: "Build a repeatable content engine using AI that sounds just like you and grows your personal and professional brand—without having to be chronically online.",
        duration: "60 minutes",
        format: "On-Demand",
        price: "$79",
        icon: <Megaphone className="w-5 h-5" />,
        slug: "ai-content-systems",
        complementarySystem: {
          name: "Work Smart Suite",
          link: "/work-systems",
        },
      },
    ],
  },
  {
    title: "Automation",
    icon: <Zap className="w-6 h-6" />,
    sessions: [
      {
        title: "Automation with Zapier Session",
        description: "Learn how to automate repetitive workflows and connect your tools without writing code.",
        duration: "60 minutes",
        format: "On-Demand",
        price: "$49",
        icon: <Zap className="w-5 h-5" />,
        slug: "automation-zapier",
        complementarySystem: {
          name: "Work Smart Suite",
          link: "/work-systems",
        },
      },
    ],
  },
];

const SessionCard = ({ session }: { session: Session }) => (
  <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          {session.icon}
        </div>
        <Badge 
          variant={session.format === "Live" ? "default" : "secondary"}
          className="shrink-0"
        >
          {session.format === "Live" ? (
            <><Users className="w-3 h-3 mr-1" /> Live</>
          ) : (
            <><Play className="w-3 h-3 mr-1" /> On-Demand</>
          )}
        </Badge>
      </div>
      <h3 className="text-xl font-semibold text-foreground mt-4 group-hover:text-primary transition-colors">
        {session.title}
      </h3>
    </CardHeader>
    <CardContent className="flex-1">
      <p className="text-muted-foreground leading-relaxed">
        {session.description}
      </p>
      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {session.duration}
        </span>
      </div>
      
      {/* Cross-selling section */}
      <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
            Included with All Access
          </Badge>
        </div>
        {session.complementarySystem && (
          <Link 
            to={session.complementarySystem.link}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            Complementary system: <span className="underline underline-offset-2">{session.complementarySystem.name}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </CardContent>
    <CardFooter className="pt-4 border-t border-border flex items-center justify-between">
      <span className="text-2xl font-bold text-foreground">{session.price}</span>
      <Link to={`/sessions/${session.slug}`}>
        <Button className="group/btn">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const Sessions = () => {
  const scrollToSessions = () => {
    document.getElementById("sessions-list")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm">
              Live & On-Demand Sessions
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Practical AI sessions for operators who want{" "}
              <span className="text-primary">results, not theory</span>.
            </h1>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
              Live & on-demand implementation experiences for operators.
            </p>
            <p className="text-base text-muted-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              60-minute sessions designed to help you build, automate, and execute with AI across work and content—separate from your systems, but built to complement them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToSessions} className="text-lg px-8">
                View Sessions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Included with All Access
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sessions List */}
      <section id="sessions-list" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          {sessionCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {category.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={session.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: sessionIndex * 0.1 }}
                  >
                    <SessionCard session={session} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get all sessions with All Access
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlock every session, tool, and system with a single pass. No subscriptions, lifetime access.
            </p>
            <Link to="/pricing">
              <Button size="lg" className="text-lg px-8">
                View All Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sessions;
