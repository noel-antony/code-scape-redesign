import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logoImg from "@assets/no-bg-icon_1771048731548.png";

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Cinematic intro: the CODESCAPE logo scales up from center until it
 * "becomes" the website behind it. The overlay then fades out.
 *
 * - App renders normally behind this fixed overlay
 * - Logo expands dramatically, acting as a visual portal
 * - After expansion, the entire overlay dissolves
 * - Runs only once per session (sessionStorage flag)
 * - Respects prefers-reduced-motion
 */
export function IntroReveal() {
  const shouldReduceMotion = useReducedMotion();

  // Only show on first visit this session
  const [hasPlayed, setHasPlayed] = useState(() => {
    if (typeof window === "undefined") return true;
    // Check sessionStorage — cleared when the tab/browser closes
    return sessionStorage.getItem("codescape-intro") === "1";
  });

  // Phase: "logo" → "reveal" → "done"
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Skip entirely if already played or reduced motion
    if (hasPlayed) {
      setPhase("done");
      return;
    }
    if (shouldReduceMotion) {
      setPhase("done");
      sessionStorage.setItem("codescape-intro", "1");
      setHasPlayed(true);
      return;
    }

    // After a brief hold, begin the reveal
    const revealTimer = setTimeout(() => setPhase("reveal"), 800);
    // After reveal animation completes, mark done
    const doneTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("codescape-intro", "1");
      setHasPlayed(true);
    }, 2400);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [hasPlayed, shouldReduceMotion]);

  // Lock scroll while intro plays
  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: "hsl(260 30% 5%)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease }}
      >
          {/* Radial glow behind logo */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, hsl(202 100% 50% / 0.12) 0%, transparent 70%)",
            }}
            animate={
              phase === "reveal"
                ? { scale: 8, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 1.4,
              ease,
            }}
          />

          {/* Logo — scales up dramatically to "become" the site */}
          <motion.div
            className="relative"
            initial={{ scale: 1, opacity: 1 }}
            animate={
              phase === "reveal"
                ? { scale: 35, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              scale: {
                duration: 1.4,
                ease,
              },
              opacity: {
                duration: 0.8,
                delay: 0.5,
                ease,
              },
            }}
          >
            {/* Initial entrance: fade + scale up from 0.7 */}
            <motion.img
              src={logoImg}
              alt=""
              className="w-24 h-24 md:w-32 md:h-32 object-contain select-none"
              draggable={false}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease,
              }}
            />
          </motion.div>

          {/* Subtle "CODESCAPE" text below logo, fades before expansion */}
          <motion.span
            className="absolute text-sm font-bold tracking-[0.3em] text-white/40 uppercase"
            style={{ bottom: "38%" }}
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === "reveal"
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: phase === "reveal" ? 0.3 : 0.5,
              delay: phase === "reveal" ? 0 : 0.4,
              ease,
            }}
          >
            CODESCAPE
          </motion.span>
        </motion.div>
    </AnimatePresence>
  );
}
