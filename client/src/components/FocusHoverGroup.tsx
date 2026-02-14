import { useState, Children, cloneElement, isValidElement, ReactNode, ReactElement } from "react";

interface FocusHoverGroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a group of sibling elements.
 * On hover: hovered child scales to 1.04, siblings shrink to 0.98 with 0.7 opacity.
 * Returns smoothly on mouse leave.
 */
export function FocusHoverGroup({ children, className = "" }: FocusHoverGroupProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={className}>
      {items.map((child, i) => {
        const isHovered = hoveredIndex === i;
        const hasSiblingHovered = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: isHovered
                ? "scale(1.04)"
                : hasSiblingHovered
                ? "scale(0.98)"
                : "scale(1)",
              opacity: hasSiblingHovered ? 0.7 : 1,
              transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.3s ease-out",
              willChange: hoveredIndex !== null ? "transform, opacity" : "auto",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
