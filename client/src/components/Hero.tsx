import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layout, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

function MagneticButton({ children, className, ...props }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * 0.2;
    const y = (clientY - centerY) * 0.2;
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  return (
    <Button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-transform duration-200 ease-out`}
      {...props}
    >
      {children}
    </Button>
  );
}

function NumberCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value);
  const ref = useRef(null);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const block1X = useTransform(scrollYProgress, [0, 0.5], [-200, 0]);
  const block1Y = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const block1Rotate = useTransform(scrollYProgress, [0, 0.5], [-15, 0]);

  const block2X = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const block2Y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const block2Rotate = useTransform(scrollYProgress, [0, 0.5], [15, 0]);

  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  const handleCTAClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00A3FF", "#ffffff"],
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-[150vh] pt-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

        {/* Assembly Animation */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              style={{ x: block1X, y: block1Y, rotate: block1Rotate }}
              className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rounded-lg bg-primary/5 flex items-center justify-center"
            >
              <Layout className="text-primary/40 w-12 h-12" />
            </motion.div>
            <motion.div
              style={{ x: block2X, y: block2Y, rotate: block2Rotate }}
              className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-white/20 rounded-lg bg-white/5 flex items-center justify-center"
            >
              <Code className="text-white/20 w-16 h-16" />
            </motion.div>
            <motion.svg className="absolute inset-0 w-full h-full">
              <motion.line
                x1="25%" y1="25%" x2="50%" y2="50%"
                stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                className="text-primary/20"
                style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 1]) }}
              />
              <motion.line
                x1="75%" y1="75%" x2="50%" y2="50%"
                stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                className="text-white/10"
                style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 1]) }}
              />
            </motion.svg>
          </div>
        )}

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-8 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Accepting New Projects
            </div>
            
            <div className="relative overflow-hidden mb-6">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto"
              >
                We build reliable digital products that scale
              </motion.h1>
            </div>

            <motion.div style={{ opacity, scale }}>
              <h2 className="text-3xl md:text-6xl font-bold text-primary mb-10">
                YOUR SUCCESS IS OUR MISSION
              </h2>
            </motion.div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              From complex cloud architectures to stunning user interfaces, Codescape is where creativity meets engineering precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <MagneticButton 
                  onClick={handleCTAClick}
                  size="lg" 
                  className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </MagneticButton>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5 transition-all">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left hover-elevate group"
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
