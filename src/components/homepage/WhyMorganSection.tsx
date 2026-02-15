import { motion } from "framer-motion";
import morganPhoto from "@/assets/morgan-debaun.jpeg";

const WhyMorganSection = () => {
  return (
    <section className="py-24 section-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">
          {/* Copy - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">
              Why Morgan Built This
            </h2>
            <div className="space-y-5 text-[16px] text-muted-foreground leading-relaxed">
              <p>
                I built Blavity Inc. into the largest digital media company for Black culture - reaching 100 million people a month across AfroTech, Shadow and Act, 21Ninety, and Travel Noire. Forbes 30 Under 30. Inc. 5000. The whole highlight reel.
              </p>
              <p>
                But here's what the highlight reel doesn't show: the years I spent figuring out basic business infrastructure by trial and error. Pricing. Hiring. Revenue models. Operations. Nobody taught me any of it. I learned it the expensive way.
              </p>
              <p>
                I built WorkSmart because the most talented people I know - the ones getting laid off from big companies, the ones leaving to start their own thing, the ones who have incredible skills but no business system - shouldn't have to learn it the expensive way too.
              </p>
              <p>
                The economy is shifting underneath everyone's feet right now. AI is accelerating it. And the people being pushed into self-employment deserve more than a YouTube playlist and a prayer. They deserve real infrastructure. Real advisors. A real system.
              </p>
              <p className="text-foreground font-semibold text-lg">
                That's WorkSmart.
              </p>
            </div>

            {/* Credential bar */}
            <p className="mt-8 font-mono text-xs text-muted-foreground uppercase tracking-wider leading-relaxed">
              CEO, Blavity Inc. & AfroTech · Forbes 30 Under 30 · Angel Investor · Best-Selling Author, Rewrite Your Rules · Inc. 5000 · Advisor to Pepsi Co., American Airlines, Disney
            </p>
          </motion.div>

          {/* Photo - Right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative flex justify-center"
          >
            {/* Fire burst behind photo */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, hsl(var(--fire)) 0%, transparent 70%)`,
                right: "-60px",
                top: "-30px",
              }}
              aria-hidden="true"
            />
            <img
              src={morganPhoto}
              alt="Morgan DeBaun, CEO and founder"
              className="relative z-10 w-full max-w-sm rounded-2xl grayscale object-cover aspect-[3/4]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyMorganSection;
