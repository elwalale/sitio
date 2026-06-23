"use client";

import { Star, Quote } from "lucide-react";
import { Marquee } from "./marquee";
import { SectionHeading } from "./section-heading";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ICU automatizó nuestro soporte con un agente que resuelve el 78% de los tickets solo. Redujimos costos sin perder calidad.",
    name: "María José Ferrer",
    role: "COO",
    company: "Nexus Labs",
    initials: "MF",
    accent: "from-[oklch(0.82_0.16_195)] to-[oklch(0.66_0.26_295)]",
  },
  {
    quote:
      "El flujo de onboarding que diseñaron nos ahorra 30 horas semanales. El equipo por fin deja de hacer tareas repetitivas.",
    name: "Diego Aravena",
    role: "Head of Ops",
    company: "Vértice Co.",
    initials: "DA",
    accent: "from-[oklch(0.74_0.25_330)] to-[oklch(0.82_0.16_195)]",
  },
  {
    quote:
      "Implementaron un modelo a medida sobre nuestros datos. La precisión superó todo lo que probamos antes.",
    name: "Camila Rojas",
    role: "CTO",
    company: "Quantum HQ",
    initials: "CR",
    accent: "from-[oklch(0.66_0.26_295)] to-[oklch(0.74_0.25_330)]",
  },
  {
    quote:
      "De la idea al despliegue en tres semanas. Profesionales, rápidos y obsesionados con el resultado.",
    name: "Tomás Beltrán",
    role: "CEO",
    company: "Órbita",
    initials: "TB",
    accent: "from-[oklch(0.82_0.19_160)] to-[oklch(0.82_0.16_195)]",
  },
  {
    quote:
      "Nuestro chatbot de voz atiende leads de madrugada y los agenda solos. Subimos conversión un 32%.",
    name: "Valentina Soto",
    role: "CMO",
    company: "Neura Bank",
    initials: "VS",
    accent: "from-[oklch(0.82_0.17_85)] to-[oklch(0.74_0.25_330)]",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex w-[20rem] shrink-0 flex-col gap-4 rounded-2xl glass p-6 sm:w-[24rem]">
      <div className="flex items-center justify-between">
        <Quote className="h-7 w-7 text-[oklch(0.82_0.16_195/0.6)]" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.82_0.17_85)] text-[oklch(0.82_0.17_85)]" />
          ))}
        </div>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} font-display text-sm font-700 text-[oklch(0.08_0.02_280)]`}
        >
          {t.initials}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{t.name}</span>
          <span className="text-xs text-muted-foreground">
            {t.role} · {t.company}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonios" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonios"
          title={
            <>
              Resultados que <span className="text-gradient-fuchsia">hablan solos</span>
            </>
          }
          description="Lo que dicen los equipos que ya operan con IA construida por Agencia ICU."
        />
      </div>

      <div className="relative mt-14">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <Marquee duration={40} className="py-2">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </Marquee>
        <Marquee duration={40} reverse className="mt-5 py-2">
          {[...TESTIMONIALS].reverse().map((t, i) => (
            <TestimonialCard key={`${t.name}-rev-${i}`} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
