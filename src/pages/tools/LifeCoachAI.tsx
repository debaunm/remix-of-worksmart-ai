import { ArrowLeft, RotateCcw, MessageCircle, BookOpen, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BuyToolButton from "@/components/BuyToolButton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LifeCoachChat from "@/components/life-coach/LifeCoachChat";
import PillarsSelector from "@/components/life-coach/PillarsSelector";
import WealthCodeQuadrant from "@/components/life-coach/WealthCodeQuadrant";
import DataStepper from "@/components/life-coach/DataStepper";
import CEOTaskSorter from "@/components/life-coach/CEOTaskSorter";
import StepChangeGoal from "@/components/life-coach/StepChangeGoal";
import BalanceStrategies from "@/components/life-coach/BalanceStrategies";
import DRIPTrainer from "@/components/life-coach/DRIPTrainer";

const LifeCoachAI = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center py-8 md:py-12 mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-foreground"
          >
            Become the CEO of Your Life.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground"
          >
            This interactive playbook translates the core principles of "Rewrite Your Rules" into action. 
            Move beyond theory and start designing a life that's successful on the outside and deeply fulfilling on the inside.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <BuyToolButton toolName="Life Coach AI" />
          </motion.div>
        </section>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="advisor" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="advisor" className="flex items-center gap-2 text-xs md:text-sm">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">AI Advisor</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="part1" className="flex items-center gap-2 text-xs md:text-sm">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Master Yourself</span>
              <span className="sm:hidden">Self</span>
            </TabsTrigger>
            <TabsTrigger value="part2" className="flex items-center gap-2 text-xs md:text-sm">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Master Methods</span>
              <span className="sm:hidden">Methods</span>
            </TabsTrigger>
            <TabsTrigger value="part3" className="flex items-center gap-2 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Master Growth</span>
              <span className="sm:hidden">Growth</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Advisor Tab */}
          <TabsContent value="advisor" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-primary">Your Personal Guide</h2>
              <p className="mt-2 text-2xl md:text-3xl font-bold text-foreground">Rewrite Your Rules Advisor</p>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Chat with your AI life coach to identify hidden rules creating stress and rewrite them into healthier patterns using the Rewrite Your Rules framework.
              </p>
            </div>
            <LifeCoachChat />
          </TabsContent>

          {/* Part 1: Master Yourself */}
          <TabsContent value="part1" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-primary">Part 1</h2>
              <p className="mt-2 text-2xl md:text-3xl font-bold text-foreground">Master Yourself</p>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                This section is about redefining what success looks like for you. Before you can build your ideal life, 
                you must create the blueprint. We'll uncover the values that give you the most energy and design your personal code for wealth.
              </p>
            </div>
            <PillarsSelector />
            <WealthCodeQuadrant />
          </TabsContent>

          {/* Part 2: Master Your Methods */}
          <TabsContent value="part2" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-primary">Part 2</h2>
              <p className="mt-2 text-2xl md:text-3xl font-bold text-foreground">Master Your Methods</p>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                You've laid the foundation, now it's time to build upon it with practical frameworks. 
                This section provides the tools to get objective about your life, manage your energy like a CEO, and achieve your goals systematically.
              </p>
            </div>
            <DataStepper />
            <CEOTaskSorter />
            <StepChangeGoal />
          </TabsContent>

          {/* Part 3: Master Your Growth */}
          <TabsContent value="part3" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-primary">Part 3</h2>
              <p className="mt-2 text-2xl md:text-3xl font-bold text-foreground">Master Your Growth</p>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                This isn't about finding a magic "balance" that doesn't exist. It's about building a resilient, 
                flexible system for life. Learn how to pace yourself, make confident decisions, and manage the psychology of growth.
              </p>
            </div>
            <BalanceStrategies />
            <DRIPTrainer />

            {/* Next Steps */}
            <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">Your CEO Action Plan</h3>
              <ul className="space-y-4 text-base max-w-2xl mx-auto text-muted-foreground">
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-primary">➔</span>
                  <div>
                    <strong className="font-bold text-foreground">Revisit & Realign:</strong> Every few months, or after a major life event, 
                    return to this playbook. Re-evaluate your pillars and goals. Is your vision still aligned with who you are today?
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-primary">➔</span>
                  <div>
                    <strong className="font-bold text-foreground">Embrace the Cycle:</strong> The process of mastering yourself, your methods, 
                    and your growth is continuous. Don't be afraid to hit reset when a new season of life calls for a new set of rules.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-primary">➔</span>
                  <div>
                    <strong className="font-bold text-foreground">Stay Decisive:</strong> Continue to practice confident decision-making. 
                    Trust the frameworks and, most importantly, trust your ability to lead your own life.
                  </div>
                </li>
              </ul>

              <div className="mt-10 rounded-lg p-6 md:p-8 text-center bg-primary/10 border border-primary/20">
                <h4 className="text-xl md:text-2xl font-bold text-primary">Join the Conversation & Share Your Story</h4>
                <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
                  If this playbook and the principles from "Rewrite Your Rules" have made an impact on your journey, 
                  consider sharing your experience. Your review helps other ambitious individuals find the tools they need.
                </p>
                <a
                  href="https://www.amazon.com/Rewrite-Your-Rules-Achieve-Freedom/dp/0593725050/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block"
                >
                  <Button size="lg" className="font-bold">
                    Leave a Review on Amazon
                  </Button>
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LifeCoachAI;
