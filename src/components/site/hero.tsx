"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play, Cpu, Workflow, Bot } from "lucide-react";
import { ParticleField } from "./particle-field";
import { GradientOrbs } from "./gradient-orbs";
import { GlitchText } from "./glitch-text";
import { MagneticButton } from "./magnetic-button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <GradientOrbs />
      <ParticleField />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Rotating ring decoration */}
      <div className="pointer-events-none absolute right-[-10%] top-1/2 hidden -translate-y-1/2 opacity-30 lg:block">
        <div className="relative h-[36rem] w-[36rem]">
          <div className="absolute inset-0 rounded-full border border-[oklch(0.82_0.16_195/0.3)] animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-dashed border-[oklch(0.74_0.25_330/0.25)] [animation:spin-slow_36s_linear_infinite_reverse]" />
          <div className="absolute inset-20 rounded-full border border-[oklch(0.66_0.26_295/0.2)] animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.16_195/0.2)] to-[oklch(0.74_0.25_330/0.2)] backdrop-blur-sm">
              <Cpu className="h-16 w-16 text-[oklch(0.82_0.16_195)] animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.82_0.17_195)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.82_0.16_195)]" />
              </span>
              <span className="font-mono text-muted-foreground">
                Sistema en línea · IA generativa activa
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-800 leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block text-foreground">Automatiza tu</span>
            <span className="block text-gradient-cyan">empresa con IA</span>
            <span className="block">
              <GlitchText text="sin límites." className="font-display text-gradient-fuchsia" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            En <span className="font-semibold text-foreground">Agencia ICU</span> diseñamos
            agentes autónomos y flujos inteligentes que trabajan 24/7. Convertimos procesos
            manuales en operaciones que escalan solas.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={() => (window.location.hash = "#contacto")}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-6 py-3 text-sm font-semibold text-[oklch(0.08_0.02_280)] glow-cyan"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Agenda una auditoría con IA
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
            </MagneticButton>

            <MagneticButton
              onClick={() => (window.location.hash = "#proceso")}
              className="group flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
            >
              <Play className="h-4 w-4 text-[oklch(0.82_0.16_195)]" />
              Ver cómo funciona
            </MagneticButton>
          </motion.div>

          {/* Mini feature row */}
          <motion.div
            variants={item}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {[
              { icon: Bot, label: "Agentes autónomos" },
              { icon: Workflow, label: "Flujos sin código" },
              { icon: Cpu, label: "Modelos a medida" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg glass">
                  <Icon className="h-4 w-4 text-[oklch(0.82_0.16_195)]" />
                </span>
                <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            scroll
          </span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <motion.span
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-[oklch(0.82_0.16_195)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
