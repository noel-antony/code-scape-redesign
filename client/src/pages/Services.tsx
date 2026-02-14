import { motion } from "framer-motion";
import { Code, Globe, Server, Smartphone, Cpu, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            We provide end-to-end engineering services to help you build, launch, and scale digital products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
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
        </div>
      </div>
    </div>
  );
}
