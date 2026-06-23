"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";

const STATS = [
  { value: 120, suffix: "+", label: "Procesos automatizados", decimals: 0 },
  { value: 3.4, suffix: "M", prefix: "$", label: "Ahorro anual generado", decimals: 1 },
  { value: 87, suffix: "%", label: "Tareas manuales eliminadas", decimals: 0 },
  { value: 24, suffix: "/7", label: "Operación autónoma", decimals: 0 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Stats() {
  return (
    <section id="metricas" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12"
        >
          {/* decorative grid */}
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[oklch(0.82_0.16_195/0.15)] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[oklch(0.74_0.25_330/0.15)] blur-[100px]" />

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center lg:text-left">
                <div className="font-display text-4xl font-800 tracking-tight text-gradient-cyan sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
