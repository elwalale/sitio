"use client";

import { motion } from "framer-motion";
import { Search, PencilRuler, Rocket, Infinity as InfinityIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Auditamos tus procesos y detectamos dónde la IA genera mayor retorno. Entregas: mapa de oportunidades y ROI estimado.",
    duration: "1 semana",
  },
  {
    n: "02",
    icon: PencilRuler,
    title: "Diseño & Build",
    description:
      "Prototipamos el agente o flujo, lo integramos con tus herramientas y lo validamos con datos reales de tu negocio.",
    duration: "2-4 semanas",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Despliegue",
    description:
      "Lanzamos a producción con monitoreo, observabilidad y guardrails. Tu equipo aprende a operarlo en paralelo.",
    duration: "1 semana",
  },
  {
    n: "04",
    icon: InfinityIcon,
    title: "Optimización continua",
    description:
      "Medimos resultados, reentrenamos y escalamos el sistema a nuevas áreas de la empresa de forma iterativa.",
    duration: "ongoing",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* subtle grid backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Proceso"
          title={
            <>
              De idea a <span className="text-gradient-fuchsia">producción</span> en 4 pasos
            </>
          }
          description="Una metodología probada para implementar IA sin fricción ni sorpresas."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.16_195/0.4)] to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                {/* node */}
                <div className="relative z-10 mb-6 flex items-center gap-3 lg:flex-col lg:items-start">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl glass-strong transition-all duration-300 group-hover:glow-cyan">
                    <step.icon className="h-7 w-7 text-[oklch(0.82_0.16_195)]" strokeWidth={1.8} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] font-mono text-[10px] font-700 text-[oklch(0.08_0.02_280)]">
                      {step.n}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl glass p-5 transition-colors duration-300 group-hover:bg-white/[0.06]">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-display text-lg font-700 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[oklch(0.82_0.16_195)]">
                    <span className="h-1 w-1 rounded-full bg-[oklch(0.82_0.16_195)]" />
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
