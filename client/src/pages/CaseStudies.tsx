import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import projects1 from "@assets/projects1.png";
import projects2 from "@assets/projects2.png";
import projects3 from "@assets/projects3.png";

const cases = [
  {
    title: "Fintech Dashboard Scale-up",
    client: "Nova Finance",
    category: "Web App",
    description: "Rebuilding a legacy financial dashboard to handle 5TB of daily transactions with sub-second latency.",
    stats: ["-95% Query Time", "5TB Daily Data", "Real-time"],
    color: "from-blue-500/20 to-cyan-500/20",
    image: projects1,
    meta: { industry: "Financial Services", team: "6 engineers", duration: "14 weeks", stack: "React, Go, PostgreSQL, AWS" }
  },
  {
    title: "AI-Powered Medical Diagnosis",
    client: "MedTech Solutions",
    category: "AI Integration",
    description: "Integrating computer vision models to assist radiologists in detecting early signs of anomalies.",
    stats: ["99.8% Accuracy", "HIPAA Compliant", "Mobile First"],
    color: "from-emerald-500/20 to-teal-500/20",
    image: projects2,
    meta: { industry: "Healthcare", team: "4 engineers", duration: "10 weeks", stack: "Python, TensorFlow, React Native" }
  },
  {
    title: "Global E-commerce Migration",
    client: "StyleHouse",
    category: "Cloud Migration",
    description: "Migrating a monolithic Magento store to a headless Shopify Plus architecture with Next.js frontend.",
    stats: ["+40% Conversion", "0.8s Load Time", "Global CDN"],
    color: "from-blue-500/20 to-indigo-500/20",
    image: projects3,
    meta: { industry: "E-commerce", team: "5 engineers", duration: "12 weeks", stack: "Next.js, Shopify Plus, Vercel" }
  }
];

export default function CaseStudies() {
  return (
    <div className="pt-24 pb-24 md:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >Selected Works</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
            className="text-xl text-muted-foreground"
          >
            Technical challenges we've solved for our partners — with measurable results.
          </motion.p>
        </div>

        <div className="space-y-20">
          {cases.map((item, i) => (
            <div
              key={i}
              className="group grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 relative overflow-hidden order-last md:order-first`}
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute bottom-8 left-8 right-8 z-10"
                >
                  <div className="flex gap-4">
                    {item.stats.map((stat, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + j * 0.08 }}
                        className="bg-background/80 backdrop-blur text-xs font-mono px-3 py-1 rounded-full border border-white/10"
                      >
                        {stat}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Content Side */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                  className="text-primary font-mono text-sm mb-4 uppercase tracking-wider"
                >{item.category} — {item.client}</motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                  className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors"
                >{item.title}</motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                  className="text-lg text-muted-foreground mb-6 leading-relaxed"
                >
                  {item.description}
                </motion.p>
                {/* Metadata row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-mono mb-8"
                >
                  <div><span className="text-muted-foreground/60">Industry</span> <span className="text-muted-foreground ml-2">{item.meta.industry}</span></div>
                  <div><span className="text-muted-foreground/60">Team</span> <span className="text-muted-foreground ml-2">{item.meta.team}</span></div>
                  <div><span className="text-muted-foreground/60">Duration</span> <span className="text-muted-foreground ml-2">{item.meta.duration}</span></div>
                  <div><span className="text-muted-foreground/60">Stack</span> <span className="text-muted-foreground ml-2">{item.meta.stack}</span></div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Link href={`/case-studies/${i}`}>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
