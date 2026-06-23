"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates children to create a seamless loop.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  duration = 32,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 animate-marquee items-center gap-12 pr-12 [animation-duration:var(--marquee-duration)] group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
