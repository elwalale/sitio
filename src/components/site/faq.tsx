"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

const FAQS = [
  {
    q: "¿Cuánto demora implementar una solución de IA?",
    a: "Depende del alcance. Una prueba piloto con un agente o flujo automatizado toma entre 2 y 4 semanas. Un sistema RAG empresarial completo o un modelo a medida puede tomar de 4 a 8 semanas. Siempre entregamos un cronograma detallado tras la auditoría inicial.",
  },
  {
    q: "¿Mis datos están seguros con Agencia ICU?",
    a: "Sí. Trabajamos bajo NDA, cifrado en tránsito y reposo, y ofrecemos despliegue on-premise o en nube privada (AWS, GCP, Azure). Para sectores regulados implementamos controles de acceso por rol y auditoría completa. Nunca usamos tus datos para entrenar modelos de terceros.",
  },
  {
    q: "¿Qué es RAG y por qué lo necesito?",
    a: "RAG (Retrieval-Augmented Generation) conecta tus documentos privados a un modelo de lenguaje. En vez de inventar respuestas, el modelo busca primero en tu base de conocimiento y responde con citaciones trazables. Lo necesitas si quieres IA que hable con precisión sobre tu negocio, sin alucinaciones.",
  },
  {
    q: "¿Necesito conocimientos técnicos para usar las soluciones?",
    a: "No. Diseñamos interfaces intuitivas y damos capacitación a tu equipo. Tú defines los objetivos y nosotros construimos, desplegamos y operamos. Además, dejamos documentación y soporte para que tu empresa sea autónoma cuando lo desee.",
  },
  {
    q: "¿Se integra con las herramientas que ya usamos?",
    a: "En la gran mayoría de los casos, sí. Conectamos CRM (HubSpot, Salesforce), ERPs, Notion, Google Workspace, Microsoft 365, WhatsApp, Slack, correos y prácticamente cualquier sistema con API. Si tu herramienta no tiene API, evaluamos alternativas de integración.",
  },
  {
    q: "¿Cómo se determina el precio?",
    a: "Cotizamos según alcance, complejidad y costo de infraestructura. Ofrecemos modalidades de proyecto llave en mano, retainer mensual para operación continua, o híbrido. La auditoría inicial es gratuita y entrega un estimado de ROI antes de cualquier compromiso.",
  },
  {
    q: "¿Qué pasa si la IA comete un error?",
    a: "Todo sistema incluye guardrails: validación de salida, revisión humana para decisiones críticas, monitoreo en tiempo real y logs auditables. Definimos métricas de calidad y umbrales de escalamiento. Si algo falla, el sistema avisa en vez de propagar el error.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={
                <>
                  Preguntas <span className="text-gradient-cyan">frecuentes</span>
                </>
              }
              description="Todo lo que necesitas saber antes de empezar. ¿No encuentras tu duda? Escríbenos."
            />

            <motion.a
              href="#contacto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group mt-7 inline-flex items-center gap-3 rounded-2xl glass p-4 transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)]">
                <MessageCircleQuestion className="h-5 w-5 text-[oklch(0.08_0.02_280)]" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold">¿Tienes otra duda?</span>
                <span className="text-xs text-muted-foreground">
                  Chatea con nuestro equipo →
                </span>
              </span>
            </motion.a>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <HelpCircle className="h-5 w-5 shrink-0 text-[oklch(0.82_0.16_195)]" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">94%</span> de quienes hacen la
                auditoría gratuita avanzan a implementación.
              </p>
            </div>
          </div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl glass p-2 sm:p-4"
          >
            <Accordion type="single" collapsible defaultValue="faq-0" className="flex flex-col">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="group overflow-hidden rounded-xl border border-white/5 bg-white/[0.01] px-4 transition-colors data-[state=open]:border-[oklch(0.82_0.16_195/0.3)] data-[state=open]:bg-white/[0.03] sm:px-5 [&:not(:first-child)]:mt-2"
                >
                  <AccordionTrigger className="items-center py-5 text-base font-semibold no-underline hover:no-underline">
                    <span className="flex items-center gap-3 pr-2">
                      <span className="font-mono text-xs text-[oklch(0.82_0.16_195)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-left">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    <div className="pl-7">{faq.a}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
