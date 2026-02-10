import { motion } from "framer-motion";
import { Award, Building2, BookOpen } from "lucide-react";
import morganHeadshot from "@/assets/morgan-debaun.jpeg";

const credentials = [
  { icon: BookOpen, text: 'Author, "Rewrite Your Rules"' },
  { icon: Building2, text: "CEO, Blavity Inc. & AfroTech" },
  { icon: Award, text: "Forbes 30 Under 30" },
];

const AboutSection = () => {
  return (
    <section className="py-24 section-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="tag-pill mb-6 inline-block">Who We Are</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
              <img
                src={morganHeadshot}
                alt="Morgan DeBaun - Founder of WorkSmart"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built by Operators. Not Influencers.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                WorkSmart was founded by Morgan DeBaun, CEO of Blavity Inc., the media company behind AfroTech, Blavity News, and 21Ninety, reaching over 100 million people.
              </p>
              <p>
                After a decade of building companies, advising Fortune 500 brands, and being named to Forbes 30 Under 30, Morgan and her team created WorkSmart to solve a problem they kept seeing: talented professionals working harder than ever with no system underneath them.
              </p>
              <p className="font-medium text-foreground">
                WorkSmart is where that changes.
              </p>
            </div>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-3">
              {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <div key={index} className="badge-credential">
                    <Icon className="w-4 h-4 text-primary" />
                    {cred.text}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
