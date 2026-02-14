import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/** Inline SVG icon paths — small technical/engineering glyphs */
const ICON_PATHS = [
  // Terminal / CLI
  "M4 17l6-5-6-5M12 19h8",
  // Code brackets
  "M16 18l6-6-6-6M8 6l-6 6 6 6",
  // Git branch
  "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9",
  // Database / cylinder
  "M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3ZM3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3",
  // Cloud
  "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
  // CPU / chip
  "M5 5h14v14H5ZM9 9h6v6H9ZM2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3",
  // Shield / security
  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  // Signal / API
  "M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4",
  // Layers
  "M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  // Zap / lightning
  "M13 2L3 14h9l-1 8 10-12h-9l1-8Z",
  // Settings / gear
  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  // Network / globe
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  // Repeat: Terminal (smaller, different position)
  "M4 17l6-5-6-5M12 19h8",
  // Repeat: Code brackets
  "M16 18l6-6-6-6M8 6l-6 6 6 6",
  // Repeat: CPU
  "M5 5h14v14H5ZM9 9h6v6H9ZM2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3",
  // Repeat: Git branch
  "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9",
];

interface IconConfig {
  path: string;
  /** Starting position as % of container (0–100) */
  x: number;
  y: number;
  /** Icon size in px */
  size: number;
  /** Base opacity */
  opacity: number;
  /** Idle drift amplitude */
  driftX: number;
  driftY: number;
  /** Drift duration (seconds) */
  driftDuration: number;
}

/** Deterministic pseudo-random seeded by index */
function seeded(i: number, offset: number): number {
  return ((Math.sin(i * 9301 + offset * 49297) * 49297) % 1 + 1) % 1;
}

function generateIcons(): IconConfig[] {
  const count = ICON_PATHS.length; // 16 icons
  return ICON_PATHS.map((path, i) => {
    // Distribute in 4 columns: far-left, left-center, right-center, far-right
    const col = i % 4;
    const xBands = [3, 22, 68, 82]; // band start %
    const xWidths = [14, 14, 14, 14]; // band width %
    return {
      path,
      x: xBands[col] + seeded(i, 1) * xWidths[col],
      y: 5 + seeded(i, 3) * 85,        // 5–90%
      size: 22 + seeded(i, 4) * 12,     // 22–34px
      opacity: 0.35 + seeded(i, 5) * 0.2, // 0.35–0.55
      driftX: 5 + seeded(i, 6) * 10,    // ±5–15px
      driftY: 4 + seeded(i, 7) * 8,     // ±4–12px
      driftDuration: 5 + seeded(i, 8) * 5, // 5–10s
    };
  });
}

interface FloatingIconsProps {
  scrollYProgress: MotionValue<number>;
}

function FloatingIcon({
  config,
  scrollYProgress,
  reducedMotion,
}: {
  config: IconConfig;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  // Convergence: icon drifts toward center during 0.35 → 0.65
  const centerX = 50;
  const centerY = 50;

  const convergeX = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [0, (centerX - config.x) * 0.7]
  );
  const convergeY = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [0, (centerY - config.y) * 0.7]
  );
  const convergeScale = useTransform(scrollYProgress, [0.35, 0.65], [1, 0.6]);
  const convergeOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55, 0.65],
    [1, 0.5, 0]
  );

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        x: reducedMotion ? 0 : convergeX,
        y: reducedMotion ? 0 : convergeY,
        scale: reducedMotion ? 1 : convergeScale,
        opacity: reducedMotion ? config.opacity * 0.5 : convergeOpacity,
      }}
    >
      {/* Idle floating drift — framer-motion animate loop */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={config.size}
        height={config.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        style={{ opacity: config.opacity }}
        {...(!reducedMotion && {
          animate: {
            x: [0, config.driftX, 0, -config.driftX, 0],
            y: [0, -config.driftY, 0, config.driftY, 0],
          },
          transition: {
            duration: config.driftDuration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop" as const,
          },
        })}
      >
        <path d={config.path} />
      </motion.svg>
    </motion.div>
  );
}

export function FloatingIcons({ scrollYProgress }: FloatingIconsProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const icons = useMemo(() => generateIcons(), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {icons.map((config, i) => (
        <FloatingIcon
          key={i}
          config={config}
          scrollYProgress={scrollYProgress}
          reducedMotion={shouldReduceMotion}
        />
      ))}
    </div>
  );
}
