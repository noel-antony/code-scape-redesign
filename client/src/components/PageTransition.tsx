import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <motion.div
        className="fixed inset-0 z-[100] bg-primary origin-left pointer-events-none"
        variants={{
          initial: { scaleX: 0 },
          animate: { scaleX: 0, transition: { duration: 0.4, ease: "easeInOut" } },
          exit: { scaleX: 1, transition: { duration: 0.4, ease: "easeInOut" } },
        }}
      />
      <motion.div
        variants={{
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
          exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
