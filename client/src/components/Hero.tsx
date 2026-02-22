import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layout, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { useRef, useState } from "react";
import { FloatingIcons } from "@/components/FloatingIcons";

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
      buttonRef.current.style.transition = 'transform 0.15s ease-out';
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(0px, 0px)`;
      buttonRef.current.style.transition = 'transform 0.3s ease-out';
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
      <Button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${className} will-change-transform`}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

/** Word-by-word staggered fade-up headline */
function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.06,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Scroll timeline (section is 380vh) ──────────────────────────────

  // Intro content fades out quickly — no dead scroll
  const introOpacity = useTransform(scrollYProgress, [0.05, 0.18], [1, 0]);

  // Service cards swoop in immediately after intro fades
  const cardsOpacity = useTransform(scrollYProgress, [0.16, 0.30], [0, 1]);
  // Left card — from left
  const cardLeftX = useTransform(scrollYProgress, [0.16, 0.30], [-120, 0]);
  const cardLeftY = useTransform(scrollYProgress, [0.16, 0.30], [40, 0]);
  // Center card — from below
  const cardCenterY = useTransform(scrollYProgress, [0.16, 0.30], [120, 0]);
  // Right card — from right
  const cardRightX = useTransform(scrollYProgress, [0.16, 0.30], [120, 0]);
  const cardRightY = useTransform(scrollYProgress, [0.16, 0.30], [40, 0]);

  // "YOUR SUCCESS IS OUR MISSION" — appears mid-way through card plateau
  const successOpacity = useTransform(scrollYProgress, [0.45, 0.56], [0, 1]);
  const successY = useTransform(scrollYProgress, [0.45, 0.56], [60, 0]);
  const successScale = useTransform(scrollYProgress, [0.45, 0.56], [0.9, 1]);

  // Headline fades only near the very end
  const headlineOpacity = useTransform(scrollYProgress, [0.84, 0.94], [1, 0]);

  // Track which state is active for pointer-events
  const [showCards, setShowCards] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowCards(v >= 0.16);
  });

  return (
    <section ref={containerRef} className="relative min-h-[260vh] md:min-h-[380vh] pt-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
        {/* Radial depth glow behind hero */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0,163,255,0.18), transparent 60%)',
        }} />

        {/* Floating engineering icons — converge toward center on scroll */}
        <FloatingIcons scrollYProgress={scrollYProgress} />

        {/* Content container — headline + switchable layers */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col items-center justify-start pt-[18vh]">
          {/* Persistent headline — fades out only AFTER cards finish appearing */}
          <motion.div
            style={{ opacity: headlineOpacity }}
            className="text-center mb-8 pointer-events-none will-change-[opacity]"
          >
            <AnimatedHeadline
              text="We build reliable digital products that scale."
              className="text-4xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto"
            />
          </motion.div>

          {/* Switchable area below the headline */}
          <div className="relative flex-1 w-full">
            {/* Intro content (badge, tagline, paragraph, buttons) — fades out first */}
            <motion.div
              style={{ opacity: introOpacity, pointerEvents: showCards ? 'none' : 'auto' }}
              className="absolute inset-0 flex flex-col items-center text-center pt-0 will-change-[opacity]"
            >
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
                  Accepting New Projects
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                From complex cloud architectures to stunning user interfaces, Codescape is where creativity meets technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <MagneticButton 
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
                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/70">
                  <span className="flex items-center gap-1.5"><span className="text-primary">✔</span> Usually respond within 24 hours</span>
                  <span className="flex items-center gap-1.5"><span className="text-primary">✔</span> Free technical consultation</span>
                  <span className="flex items-center gap-1.5"><span className="text-primary">✔</span> No vendor lock-in</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Service cards — swoop in from different directions */}
            <motion.div
              style={{ opacity: cardsOpacity, pointerEvents: showCards ? 'auto' : 'none' }}
              className="absolute inset-0 flex flex-col items-center justify-start pt-4 will-change-[opacity,transform]"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
                {[
                  { icon: Layout, title: "Web Development", desc: "Performance-first React applications tailored for scale.", x: cardLeftX, y: cardLeftY },
                  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform experiences that users love.", x: undefined, y: cardCenterY },
                  { icon: Code, title: "Cloud Architecture", desc: "Robust backend systems built on AWS and Google Cloud.", x: cardRightX, y: cardRightY },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    style={{ x: item.x ?? 0, y: item.y }}
                    className="p-6 rounded-2xl bg-surface-1 border border-white/5 text-left hover-elevate group cursor-default will-change-transform"
                  >
                    <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 ease-out">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <motion.h2
                style={{ opacity: successOpacity, y: successY, scale: successScale }}
                className="text-2xl md:text-5xl font-bold text-primary mt-16 text-center will-change-transform"
              >
                YOUR SUCCESS IS OUR MISSION
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
