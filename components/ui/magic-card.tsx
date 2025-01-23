"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, motion } from "motion/react";
import { MouseEvent, PropsWithChildren, useEffect, useRef } from "react";

interface MagicCardProps extends PropsWithChildren {
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export const MagicCard = ({
  className,
  children,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.2,
}: MagicCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const centerX = useSpring(mouseX, {
    stiffness: 200,
    damping: 15
  });
  const centerY = useSpring(mouseY, {
    stiffness: 200,
    damping: 15
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at ${centerX}px ${centerY}px, ${gradientColor}, transparent ${gradientOpacity})`
        }}
      />
      {children}
    </div>
  );
}; 