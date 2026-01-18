import { motion } from "framer-motion";
import { Award, Building2, Users } from "lucide-react";
import morganHeadshot from "@/assets/morgan-debaun.jpeg";
const credentials = [{
  icon: Award,
  text: 'Author of "Rewrite Your Rules"'
}, {
  icon: Building2,
  text: "CEO of Blavity Inc. & AfroTech"
}, {
  icon: Users,
  text: "Forbes 30 Under 30"
}];
const GuideSection = () => {
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Image */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="md:col-span-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-lg">
                <img src={morganHeadshot} alt="Morgan DeBaun - CEO of Blavity Inc. & AfroTech" className="w-full h-full object-cover object-center" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="md:col-span-3">
              <span className="text-sm font-medium text-primary mb-2 block">Your Guide</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Hi, I'm Morgan DeBaun.
              </h2>
              <p className="text-lg font-medium text-foreground mb-4">I built Blavity Inc. from scratch and learned these lessons the hard way.</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  I've been the overwhelmed founder questioning if I was cut out for this. I've watched peers seemingly raise rounds effortlessly while I felt trapped doing admin work. I've had moments where there was simply no more time to squeeze out of the day.
                </p>
                <p>
                  Then I discovered: you don't have to brute-force your way through. There's a smarter way.
                </p>
                <p>
                  After advising 10,000+ professionals and building a media empire, I created WorkSmart to share the frameworks, systems, and mindset shifts that changed everything for me.
                </p>
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-3">
                {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return <div key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-foreground">
                      <Icon className="w-4 h-4 text-primary" />
                      {cred.text}
                    </div>;
              })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default GuideSection;