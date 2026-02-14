import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { LogoMarquee } from "@/components/LogoMarquee";
import fintechImg from "@assets/fintech.jpg";

const clientLogos = ['Acme Corp', 'GlobalTech', 'Nebula', 'FoxRun', 'Circle', 'Vertex', 'Oxide'];

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Client Logos Strip */}
      <section className="py-6 border-y border-white/5 bg-surface-2">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-mono text-muted-foreground mb-8 uppercase tracking-widest">Trusted by industry leaders</p>
          <LogoMarquee logos={clientLogos} />
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-24 bg-surface-1 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="text-primary font-mono mb-4">CASE STUDY</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Revolutionizing FinTech Data Visualization</h2>
              <p className="text-lg text-muted-foreground mb-6">
                How we helped a Series B startup process 5TB of daily transactions into real-time dashboards.
              </p>
              
              <ul className="space-y-4 mb-6">
                {['Real-time WebSocket Data Stream', 'Custom WebGL Charting Engine', 'Role-Based Access Control'].map((item) => (
                  <li key={item} className="flex items-center gap-3 group/item cursor-default transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                    <span className="text-muted-foreground transition-all duration-300 origin-left group-hover/item:text-white group-hover/item:scale-105">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Metadata row */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-mono mb-8">
                <div><span className="text-muted-foreground/60">Industry</span> <span className="text-muted-foreground ml-2">Financial Services</span></div>
                <div><span className="text-muted-foreground/60">Team</span> <span className="text-muted-foreground ml-2">6 engineers</span></div>
                <div><span className="text-muted-foreground/60">Duration</span> <span className="text-muted-foreground ml-2">14 weeks</span></div>
                <div><span className="text-muted-foreground/60">Stack</span> <span className="text-muted-foreground ml-2">React, Go, PostgreSQL</span></div>
              </div>

              <Link href="/case-studies/fintech-dashboard">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
                  Read Full Case Study
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-card shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
              <img src={fintechImg} alt="Fintech dashboard visualization" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-surface-2">
        <div className="absolute inset-0 bg-primary/5 clip-path-slant" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your vision?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how we can engineer a solution that meets your business goals.
          </p>
          <Link href="/contact">
            <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
              <Button size="lg" className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
                Get in Touch <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </>
  );
}
