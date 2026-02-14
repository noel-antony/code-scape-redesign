import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const cases = [
  {
    title: "Fintech Dashboard Scale-up",
    client: "Nova Finance",
    category: "Web App",
    description: "Rebuilding a legacy financial dashboard to handle 5TB of daily transactions with sub-second latency.",
    stats: ["-95% Query Time", "5TB Daily Data", "Real-time"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "AI-Powered Medical Diagnosis",
    client: "MedTech Solutions",
    category: "AI Integration",
    description: "Integrating computer vision models to assist radiologists in detecting early signs of anomalies.",
    stats: ["99.8% Accuracy", "HIPAA Compliant", "Mobile First"],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Global E-commerce Migration",
    client: "StyleHouse",
    category: "Cloud Migration",
    description: "Migrating a monolithic Magento store to a headless Shopify Plus architecture with Next.js frontend.",
    stats: ["+40% Conversion", "0.8s Load Time", "Global CDN"],
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export default function CaseStudies() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Selected Works</h1>
          <p className="text-xl text-muted-foreground">
            A showcase of technical challenges we've solved for our partners.
          </p>
        </div>

        <div className="space-y-20">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Image Side (Abstract) */}
              <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 relative overflow-hidden order-last md:order-first`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex gap-4">
                    {item.stats.map((stat, j) => (
                      <div key={j} className="bg-background/80 backdrop-blur text-xs font-mono px-3 py-1 rounded-full border border-white/10">
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div>
                <div className="text-primary font-mono text-sm mb-4 uppercase tracking-wider">{item.category} — {item.client}</div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {item.description}
                </p>
                <Link href={`/case-studies/${i}`}>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                    View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
