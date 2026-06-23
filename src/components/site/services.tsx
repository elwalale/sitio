"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  BrainCircuit,
  MessageSquareCode,
  Database,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import { RagFeature } from "./rag-feature";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  accent: string;
};

const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "Agentes Autónomos",
    description:
      "Asistentes de IA que toman decisiones, ejecutan tareas y se comunican con tus herramientas sin supervisión humana.",
    tags: ["RAG", "Tool use", "Multi-agente"],
    accent: "from-[oklch(0.82_0.16_195)] to-[oklch(0.66_0.26_295)]",
  },
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description:
      "Conectamos tus apps (CRM, ERP, correo, facturación) en flujos que se disparan solos según eventos reales.",
    tags: ["n8n", "Make", "APIs"],
    accent: "from-[oklch(0.74_0.25_330)] to-[oklch(0.82_0.16_195)]",
  },
  {
    icon: BrainCircuit,
    title: "Modelos a Medida",
    description:
      "Fine-tuning y RAG sobre tus datos privados para respuestas precisas y alineadas a tu industria.",
    tags: ["Fine-tuning", "Embeddings", "Privado"],
    accent: "from-[oklch(0.66_0.26_295)] to-[oklch(0.74_0.25_330)]",
  },
  {
    icon: MessageSquareCode,
    title: "Chatbots & Voice AI",
    description:
      "Asistentes conversacionales para web, WhatsApp y voz que atienden, califican y derivan leads 24/7.",
    tags: ["WhatsApp", "Web", "Voz"],
    accent: "from-[oklch(0.82_0.19_160)] to-[oklch(0.82_0.16_195)]",
  },
  {
    icon: Database,
    title: "Integración de Datos",
    description:
      "Unificamos y limpiamos tus fuentes de datos para que la IA opere sobre información confiable.",
    tags: ["ETL", "Pipelines", "Calidad"],
    accent: "from-[oklch(0.82_0.17_85)] to-[oklch(0.74_0.25_330)]",
  },
  {
    icon: LineChart,
    title: "Analítica Predictiva",
    description:
      "Modelos que anticipan demanda, churn y oportunidades para que decidas con ventaja.",
    tags: ["Forecast", "Churn", "Dashboard"],
    accent: "from-[oklch(0.82_0.16_195)] to-[oklch(0.82_0.19_160)]",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Services() {
  return (
    <section id="servicios" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Servicios"
          title={
            <>
              Capabilities que <span className="text-gradient-cyan">multiplican</span> tu operación
            </>
          }
          description="De la idea al despliegue. Diseñamos, construimos y operamos sistemas de IA adaptados a los objetivos de tu empresa."
        />

        <RagFeature />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={item}>
              <TiltCard className="group h-full rounded-2xl glass p-6 transition-colors hover:bg-white/[0.06]">
                <div className="flex h-full flex-col">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.accent}`}
                  >
                    <service.icon className="h-6 w-6 text-[oklch(0.08_0.02_280)]" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-xl font-700 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
