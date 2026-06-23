"use client";

import { Marquee } from "./marquee";

const PARTNERS = [
  "NEXUS LABS",
  "VÉRTICE CO.",
  "QUANTUM HQ",
  "ORBITA",
  "NEURA BANK",
  "HELIX AI",
  "CUMBRE DATA",
  "VECTOR 9",
];

export function TrustedBy() {
  return (
    <section className="relative border-y border-white/5 py-10">
      <div className="mx-auto mb-6 max-w-6xl px-4">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Empresas que automatizan con nosotros
        </p>
      </div>
      <Marquee duration={36} className="opacity-70">
        {PARTNERS.map((p, i) => (
          <div
            key={`${p}-${i}`}
            className="flex shrink-0 items-center gap-2 font-display text-lg font-600 tracking-wide text-muted-foreground"
          >
            <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)]" />
            {p}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
