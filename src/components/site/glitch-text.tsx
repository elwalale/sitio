"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cyberpunk-style glitch text with layered RGB offsets.
 */
export function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 220);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn("relative inline-block", className)}
      data-glitch={glitching ? "on" : "off"}
    >
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 text-[oklch(0.82_0.16_195)] opacity-70 mix-blend-screen"
        style={{
          clipPath: glitching
            ? "polygon(0 0, 100% 0, 100% 33%, 0 33%)"
            : "inset(0 0 100% 0)",
          transform: glitching ? "translateX(-2px)" : "none",
          transition: "clip-path 0.12s steps(2)",
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 text-[oklch(0.74_0.25_330)] opacity-70 mix-blend-screen"
        style={{
          clipPath: glitching
            ? "polygon(0 67%, 100% 67%, 100% 100%, 0 100%)"
            : "inset(100% 0 0 0)",
          transform: glitching ? "translateX(2px)" : "none",
          transition: "clip-path 0.12s steps(2)",
        }}
      >
        {text}
      </span>
    </span>
  );
}
