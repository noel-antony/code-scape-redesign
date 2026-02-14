import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Staggered pixel-column dissolve transition.
 * On exit, columns of a dark overlay stagger in from edges → center.
 * On enter, they stagger back out from center → edges.
 * Content cross-fades with a subtle scale shift underneath.
 */
const COLUMNS = 6;

function TransitionColumns() {
  return (
    <div className="fixed inset-0 z-[60] flex pointer-events-none">
      {Array.from({ length: COLUMNS }).map((_, i) => {
        // Stagger from edges inward: 0,5 → 1,4 → 2,3
        const center = (COLUMNS - 1) / 2;
        const distFromCenter = Math.abs(i - center);
        const maxDist = center;
        // Edges fire first (delay 0), center fires last
        const stagger = (maxDist - distFromCenter) * 0.04;

        return (
          <motion.div
            key={i}
            className="flex-1 h-full"
            style={{
              background: `linear-gradient(180deg, hsl(220 30% 4%) 0%, hsl(218 35% 7%) 50%, hsl(220 30% 4%) 100%)`,
            }}
            variants={{
              initial: { scaleY: 1 },
              animate: {
                scaleY: 0,
                transition: { duration: 0.4, delay: 0.1 + stagger, ease },
              },
              exit: {
                scaleY: 1,
                transition: { duration: 0.35, delay: stagger, ease },
              },
            }}
          />
        );
      })}
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Column dissolve overlay */}
      <TransitionColumns />

      {/* Content: scale down + fade out on exit, scale up + fade in on enter */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
          animate: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.4, delay: 0.3, ease },
          },
          exit: {
            opacity: 0,
            scale: 0.97,
            filter: "blur(4px)",
            transition: { duration: 0.2, ease },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
