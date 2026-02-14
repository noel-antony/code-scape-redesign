import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Client Logos Strip */}
      <section className="py-12 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-mono text-muted-foreground mb-8 uppercase tracking-widest">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
             {/* Placeholders for logos - using text for now to be safe, but styled like logos */}
             {['Acme Corp', 'GlobalTech', 'Nebula', 'FoxRun', 'Circle'].map((logo) => (
               <div key={logo} className="text-2xl font-bold font-display">{logo}</div>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-primary font-mono mb-4">CASE STUDY</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Revolutionizing FinTech Data Visualization</h2>
              <p className="text-lg text-muted-foreground mb-8">
                How we helped a Series B startup process 5TB of daily transactions into real-time actionable dashboards, reducing query times by 95%.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['Real-time WebSocket Data Stream', 'Custom WebGL Charting Engine', 'Role-Based Access Control'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/case-studies/fintech-dashboard">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
                  Read Full Case Study
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-card shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
              {/* Abstract representation of a dashboard */}
              <div className="w-full h-full bg-grid-pattern p-8 flex flex-col gap-4">
                 <div className="w-1/3 h-8 bg-white/10 rounded" />
                 <div className="flex gap-4 h-32">
                    <div className="flex-1 bg-white/5 rounded border border-white/5" />
                    <div className="flex-1 bg-white/5 rounded border border-white/5" />
                    <div className="flex-1 bg-white/5 rounded border border-white/5" />
                 </div>
                 <div className="flex-1 bg-white/5 rounded border border-white/5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-primary/5 clip-path-slant" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your vision?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how we can engineer a solution that meets your business goals.
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg shadow-primary/25">
              Get in Touch <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
