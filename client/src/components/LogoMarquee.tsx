import { useRef } from "react";

interface LogoMarqueeProps {
  logos: string[];
}

/**
 * Continuous horizontal marquee of logos with edge fade mask.
 * CSS-only animation, no heavy libraries.
 * Pauses on hover.
 */
export function LogoMarquee({ logos }: LogoMarqueeProps) {
  // Double the list for seamless loop
  const items = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden marquee-container">
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex items-center gap-16 md:gap-24 whitespace-nowrap">
        {items.map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className="text-2xl font-bold text-muted-foreground/60 select-none shrink-0 transition-all duration-300 hover:text-white hover:text-3xl hover:scale-110 cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
