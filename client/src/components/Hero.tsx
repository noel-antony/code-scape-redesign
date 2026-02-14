import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layout, Smartphone } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      {/* Floating Elements Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          animate={{ opacity: 0.1, y: 0, rotate: 10 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-10 w-64 h-64 border border-primary rounded-xl"
        />
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 0.1, x: 0, rotate: -5 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/3 right-10 w-96 h-64 border border-white rounded-xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-8 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Accepting New Projects for Q4
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Your Success Is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Our Mission</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We build reliable digital products that scale. From complex cloud architectures to stunning user interfaces, Codescape is where creativity meets engineering precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5">
                Explore Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Services Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            { icon: Layout, title: "Web Development", desc: "Performance-first React applications tailored for scale." },
            { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform experiences that users love." },
            { icon: Code, title: "Cloud Architecture", desc: "Robust backend systems built on AWS and Google Cloud." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
