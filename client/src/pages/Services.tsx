import { motion } from "framer-motion";
import { Code, Globe, Server, Smartphone, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FocusHoverGroup } from "@/components/FocusHoverGroup";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    desc: "Scalable, high-performance web apps built with React, Next.js, and modern tools.",
    tags: ["React", "TypeScript", "Node.js"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Native-quality experiences for iOS and Android using React Native and Flutter.",
    tags: ["iOS", "Android", "React Native"]
  },
  {
    icon: Server,
    title: "Cloud Infrastructure",
    desc: "Serverless architectures, containerization, and DevOps automation.",
    tags: ["AWS", "Docker", "Kubernetes"]
  },
  {
    icon: Cpu,
    title: "AI Integration",
    desc: "Leveraging LLMs and machine learning to build intelligent features.",
    tags: ["OpenAI", "Python", "TensorFlow"]
  },
  {
    icon: Code,
    title: "Legacy Modernization",
    desc: "Refactoring and migrating outdated systems to modern tech stacks.",
    tags: ["Migration", "Architecture", "Consulting"]
  },
  {
    icon: ShieldCheck,
    title: "Security Audits",
    desc: "Comprehensive security assessments and implementation of best practices.",
    tags: ["Pen Testing", "Compliance", "Auth"]
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            End-to-end engineering to build, launch, and scale digital products.
          </p>
        </div>

        <FocusHoverGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true }}
              className="group relative bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 min-h-[48px]">{service.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={`/services/${service.title.toLowerCase().replace(' ', '-')}`}>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5">
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </motion.div>
          ))}
        </FocusHoverGroup>
      </div>

      {/* Process CTA */}
      <section className="py-24 md:py-32 mt-16 md:mt-24 relative overflow-hidden" style={{ background: "linear-gradient(to right, rgba(0,163,255,0.08) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,163,255,0.08) 100%)" }}>
        {/* Animated glow accents */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -left-20 w-64 h-[120%] rounded-full bg-primary/12 blur-[100px]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -right-20 w-64 h-[120%] rounded-full bg-primary/12 blur-[100px]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          {/* Process steps */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14">
            {["Discovery", "Architecture", "Build", "Launch"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">{i + 1}</span>
                <span className="text-lg font-medium text-muted-foreground">{step}</span>
              </motion.div>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How We Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Each phase is structured for clarity and measurable outcomes.
          </motion.p>
          <Link href="/contact">
            <motion.div
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="inline-block relative group"
            >
              <motion.div
                className="absolute -inset-1 rounded-xl bg-primary/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Button size="lg" className="relative h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                Start a Conversation <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
}
