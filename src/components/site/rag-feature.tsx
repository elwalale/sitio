"use client";

import { motion } from "framer-motion";
import {
  FileStack,
  Boxes,
  Database,
  Sparkles,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type PipeNode = {
  icon: LucideIcon;
  label: string;
  sub: string;
  accent: string;
};

const PIPELINE: PipeNode[] = [
  {
    icon: FileStack,
    label: "Tus documentos",
    sub: "PDFs, Notion, Drive, wikis",
    accent: "from-[oklch(0.82_0.16_195)] to-[oklch(0.66_0.26_295)]",
  },
  {
    icon: Boxes,
    label: "Embeddings",
    sub: "Vectorización semántica",
    accent: "from-[oklch(0.66_0.26_295)] to-[oklch(0.74_0.25_330)]",
  },
  {
    icon: Database,
    label: "Base vectorial",
    sub: "Búsqueda en milisegundos",
    accent: "from-[oklch(0.74_0.25_330)] to-[oklch(0.82_0.16_195)]",
  },
  {
    icon: Sparkles,
    label: "LLM + contexto",
    sub: "Respuestas con citaciones",
    accent: "from-[oklch(0.82_0.19_160)] to-[oklch(0.82_0.16_195)]",
  },
];

const FEATURES = [
  "Respuestas 100% basadas en tu conocimiento privado",
  "Citaciones trazables a la fuente original",
  "Seguridad: on-premise o nube privada",
  "Actualización incremental de la base sin reentrenar",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function RagFeature() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-8 overflow-hidden rounded-3xl glass-strong p-6 sm:p-8 lg:p-10"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[oklch(0.82_0.16_195/0.16)] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[oklch(0.74_0.25_330/0.16)] blur-[100px]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Left: copy */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-3 py-1 font-mono text-[11px] font-600 uppercase tracking-wider text-[oklch(0.08_0.02_280)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.08_0.02_280)] animate-pulse-glow" />
              Nuevo
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Servicio destacado
            </span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-800 leading-tight tracking-tight sm:text-4xl">
            RAG <span className="text-gradient-cyan">Empresarial</span>
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Conectamos tus documentos privados a un modelo de lenguaje. Tu equipo obtiene
            respuestas precisas, con citas y sin alucinaciones, operando sobre el conocimiento
            real de tu empresa.
          </p>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-7 grid gap-3 sm:grid-cols-2"
          >
            {FEATURES.map((f) => (
              <motion.li
                key={f}
                variants={item}
                className="flex items-start gap-2.5 text-sm text-foreground/90"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.19_160)] to-[oklch(0.82_0.16_195)]">
                  <Check className="h-3 w-3 text-[oklch(0.08_0.02_280)]" strokeWidth={3} />
                </span>
                {f}
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {["RAG", "Embeddings", "Vector DB", "Privado", "Citaciones"].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href="#contacto"
            className="group mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-5 py-2.5 text-sm font-semibold text-[oklch(0.08_0.02_280)] glow-cyan"
          >
            Implementar RAG en tu empresa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Right: animated pipeline diagram */}
        <div className="relative flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Pipeline en vivo
          </span>
          <div className="relative">
            {/* vertical connector line */}
            <div className="pointer-events-none absolute bottom-3 left-[1.4rem] top-3 w-px bg-gradient-to-b from-[oklch(0.82_0.16_195/0.5)] via-[oklch(0.74_0.25_330/0.4)] to-[oklch(0.82_0.19_160/0.5)]" />
            {/* travelling pulse */}
            <motion.span
              className="pointer-events-none absolute left-[1.4rem] h-2 w-2 -translate-x-1/2 rounded-full bg-[oklch(0.82_0.16_195)] glow-cyan"
              animate={{ top: ["3%", "97%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-col gap-3"
            >
              {PIPELINE.map((node, i) => (
                <motion.li
                  key={node.label}
                  variants={item}
                  className="relative flex items-center gap-4"
                >
                  <span
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${node.accent}`}
                  >
                    <node.icon className="h-5 w-5 text-[oklch(0.08_0.02_280)]" strokeWidth={2} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{node.label}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{node.sub}</span>
                  </div>
                  {i === PIPELINE.length - 1 && (
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="ml-auto h-2 w-2 rounded-full bg-[oklch(0.82_0.19_160)]"
                    />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* output bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-5 flex items-start gap-2 rounded-xl border border-[oklch(0.82_0.19_160/0.3)] bg-[oklch(0.82_0.19_160/0.06)] p-3"
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.82_0.19_160)]" />
            <p className="text-xs leading-relaxed text-foreground/90">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Output ·
              </span>{" "}
              «Según el contrato de servicio v3 (p. 4), el SLA es 99.9%.»
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
