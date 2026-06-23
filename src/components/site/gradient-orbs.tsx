"use client";

/**
 * Floating, blurred gradient orbs used as ambient lighting.
 * Purely decorative.
 */
export function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.82_0.16_195/0.18)] blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.74_0.25_330/0.16)] blur-[130px] animate-float-medium" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.66_0.26_295/0.16)] blur-[120px] animate-float-slow" />
    </div>
  );
}
