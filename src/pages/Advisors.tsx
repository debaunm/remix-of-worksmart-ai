import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Globe } from "lucide-react";

const advisors = [
  {
    name: "Morgan DeBaun",
    role: "Founder & CEO",
    bio: "Entrepreneur and tech executive with experience building and scaling innovative companies. Passionate about empowering professionals with AI-powered tools.",
    image: "/placeholder.svg",
    linkedin: "#",
    twitter: "#",
    website: "#",
  },
  {
    name: "Kate McDonald",
    role: "Advisor",
    bio: "Strategic advisor with deep expertise in business growth and professional development. Dedicated to helping executives and entrepreneurs achieve their goals.",
    image: "/placeholder.svg",
    linkedin: "#",
    twitter: "#",
    website: "#",
  },
  {
    name: "Jeff Nelson",
    role: "Advisor",
    bio: "Seasoned professional with extensive experience in technology and innovation. Committed to driving impactful solutions for modern professionals.",
    image: "/placeholder.svg",
    linkedin: "#",
    twitter: "#",
    website: "#",
  },
];

const Advisors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Meet Our Advisors
            </h1>
            <p className="text-xl text-muted-foreground">
              The experts behind Worksmart Advisor, dedicated to helping you work smarter with AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advisors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-muted">
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-foreground">
                      {advisor.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {advisor.role}
                    </p>
                    <p className="text-muted-foreground text-sm mb-6">
                      {advisor.bio}
                    </p>
                    <div className="flex justify-center gap-4">
                      <a
                        href={advisor.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={advisor.twitter}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href={advisor.website}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Advisors;