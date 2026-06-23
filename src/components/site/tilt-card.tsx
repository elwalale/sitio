"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Card with a 3D tilt that follows the cursor and a glare highlight.
 */
export function TiltCard({
  children,
  className,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -12;
    const ry = (px - 0.5) * 12;
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`);
    setGlarePos({ x: px * 100, y: py * 100, o: 0.35 });
  };

  const handleLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)");
    setGlarePos((g) => ({ ...g, o: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: glarePos.o,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.6), transparent 55%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
