import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, MessageSquare, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const sessions = [
  {
    title: "AI Foundations",
    description: "Master the core AI skills that let you operate at 10x speed. Build your personal AI command center.",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-400",
    badge: "Start Here",
    href: "/sessions/ai-foundations",
  },
  {
    title: "AI Content Systems",
    description: "Build an AI-powered content machine. Create, repurpose, and distribute like a media company.",
    icon: User,
    color: "from-purple-500 to-pink-400",
    badge: "For Creators",
    href: "/sessions/ai-content-systems",
  },
  {
    title: "Automation Mastery",
    description: "Connect your tools and automate your workflows. Act as your own COO with systems that run 24/7.",
    icon: Zap,
    color: "from-primary to-emerald-400",
    badge: "Operations",
    href: "/sessions/automation-zapier",
  },
];

const SessionsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Operator-Level Training
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Deep-Dive Sessions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Focused sessions to master AI systems, build automation, and operate at a higher level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sessions.map((session, index) => {
            const Icon = session.icon;
            return (
              <motion.div
                key={session.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${session.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {session.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-4">
                      {session.description}
                    </p>
                    
                    <Link to={session.href}>
                      <Button 
                        variant="outline" 
                        className="w-full group/btn"
                      >
                        Explore Session
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SessionsSection;
