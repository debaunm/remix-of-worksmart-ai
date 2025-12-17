import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, MessageSquare, User, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "AI Accelerator",
    description: "Master AI tools and workflows to 10x your productivity. From basics to advanced automation strategies.",
    icon: Rocket,
    color: "from-primary to-emerald-400",
    badge: "Most Popular",
  },
  {
    title: "ChatGPT 101",
    description: "Learn to write prompts that get results. Perfect for beginners looking to harness AI power.",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-400",
    badge: "Beginner Friendly",
  },
  {
    title: "1 Person Media Company",
    description: "Build a content empire as a solo creator. Leverage AI to produce, distribute, and monetize at scale.",
    icon: User,
    color: "from-purple-500 to-pink-400",
    badge: "For Creators",
  },
];

const CoursesSection = () => {
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
            Level Up Your Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Courses & Workshops
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep-dive training to master AI tools, build systems, and transform how you work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {course.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-4">
                      {course.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
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

export default CoursesSection;
