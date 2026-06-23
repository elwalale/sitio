"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, HeartPulse, Building2, Factory, GraduationCap, Briefcase, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

type Solution = {
  id: string;
  icon: LucideIcon;
  industry: string;
  title: string;
  description: string;
  outcomes: string[];
  accent: string;
};

const SOLUTIONS: Solution[] = [
  {
    id: "retail",
    icon: ShoppingBag,
    industry: "Retail & E-commerce",
    title: "Comercio que vende solo",
    description:
      "Agentes que gestionan inventario, responden consultas de catálogo y recuperan carritos abandonados de forma personalizada.",
    outcomes: ["+32% conversión", "-40% tiempo de atención", "Inventario en tiempo real"],
    accent: "from-[oklch(0.82_0.16_195)] to-[oklch(0.66_0.26_295)]",
  },
  {
    id: "health",
    icon: HeartPulse,
    industry: "Salud",
    title: "Atención clínica asistida",
    description:
      "Triaje conversacional, agendamiento automatizado y resúmenes clínicos generados por IA para profesionales.",
    outcomes: ["-55% no-shows", "Triaje 24/7", "Expedientes en segundos"],
    accent: "from-[oklch(0.74_0.25_330)] to-[oklch(0.82_0.16_195)]",
  },
  {
    id: "finance",
    icon: Building2,
    industry: "Finanzas & Banca",
    title: "Backoffice autónomo",
    description:
      "Procesamiento de documentos, detección de fraude y reportes regulatorios generados automáticamente.",
    outcomes: ["-70% costo operativo", "Compliance automático", "Fraude en ms"],
    accent: "from-[oklch(0.66_0.26_295)] to-[oklch(0.74_0.25_330)]",
  },
  {
    id: "manufacturing",
    icon: Factory,
    industry: "Manufactura",
    title: "Planta predictiva",
    description:
      "Mantenimiento predictivo, control de calidad por visión y programación de producción optimizada por IA.",
    outcomes: ["-28% paradas no planificadas", "Calidad 99.2%", "OEE +18%"],
    accent: "from-[oklch(0.82_0.19_160)] to-[oklch(0.82_0.16_195)]",
  },
  {
    id: "education",
    icon: GraduationCap,
    industry: "Educación",
    title: "Aprendizaje personalizado",
    description:
      "Tutores adaptativos que ajustan contenido al ritmo del estudiante y asistentes para docentes.",
    outcomes: ["+45% retención", "Feedback inmediato", "Carga docente -35%"],
    accent: "from-[oklch(0.82_0.17_85)] to-[oklch(0.74_0.25_330)]",
  },
  {
    id: "b2b",
    icon: Briefcase,
    industry: "Servicios B2B",
    title: "Operaciones sin fricción",
    description:
      "Generación de propuestas, onboarding de clientes y CRM enriquecido con datos en cada interacción.",
    outcomes: ["-60% tiempo propuesta", "Pipeline en vivo", "Onboarding self-service"],
    accent: "from-[oklch(0.82_0.16_195)] to-[oklch(0.82_0.19_160)]",
  },
];

export function Solutions() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === active)!;

  return (
    <section id="soluciones" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Soluciones"
          title={
            <>
              IA aplicada a <span className="text-gradient-cyan">tu industria</span>
            </>
          }
          description="Casos de uso reales con impacto medible. Selecciona un sector para ver cómo lo resolveríamos."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Industry selector */}
          <div className="flex flex-col gap-2">
            {SOLUTIONS.map((s) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300",
                    isActive
                      ? "border-[oklch(0.82_0.16_195/0.4)] bg-white/[0.06] glow-cyan"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
                      isActive
                        ? `bg-gradient-to-br ${s.accent}`
                        : "glass group-hover:bg-white/10"
                    )}
                  >
                    <s.icon
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-[oklch(0.08_0.02_280)]" : "text-[oklch(0.82_0.16_195)]"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.industry}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl glass-strong p-7 sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[oklch(0.82_0.16_195/0.12)] blur-[90px]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col"
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${current.accent}`}>
                  <current.icon className="h-7 w-7 text-[oklch(0.08_0.02_280)]" strokeWidth={1.8} />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[oklch(0.82_0.16_195)]">
                  {current.industry}
                </span>
                <h3 className="mt-2 font-display text-2xl font-700 tracking-tight sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {current.description}
                </p>

                <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-3">
                  {current.outcomes.map((o, i) => (
                    <motion.div
                      key={o}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <span className="font-display text-base font-700 text-gradient-fuchsia">
                        {o}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
