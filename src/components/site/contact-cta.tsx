"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ParticleField } from "./particle-field";

const GOALS = [
  "Automatizar soporte",
  "Agentes de ventas",
  "Procesamiento de datos",
  "Chatbot / voz",
  "Otro",
];

export function ContactCTA() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [goal, setGoal] = useState(GOALS[0]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      goal,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast.success("Solicitud enviada. Te contactaremos en menos de 24h.");
      form.reset();
    } catch {
      toast.error("No pudimos enviar el mensaje. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacto" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <ParticleField density={0.00006} />
          <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[oklch(0.82_0.16_195/0.16)] blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[oklch(0.74_0.25_330/0.16)] blur-[100px]" />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: pitch */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.82_0.16_195)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.16_195)]" />
                Hablemos
              </span>
              <h2 className="mt-5 font-display text-3xl font-800 leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                ¿Listo para <span className="text-gradient-cyan">automatizar</span> lo que te frena?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Agenda una auditoría gratuita de 30 minutos. Identificamos hasta 3 oportunidades
                de automatización con IA y te entregamos un plan accionable.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  { icon: Clock, text: "Respuesta en menos de 24 horas hábiles" },
                  { icon: ShieldCheck, text: "Tus datos se manejan bajo NDA" },
                  { icon: Sparkles, text: "Sin compromiso: solo claridad" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-foreground/90">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg glass">
                      <Icon className="h-4 w-4 text-[oklch(0.82_0.16_195)]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {done ? (
                <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-2xl glass p-8 text-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.19_160)] to-[oklch(0.82_0.16_195)] glow-cyan"
                  >
                    <CheckCircle2 className="h-8 w-8 text-[oklch(0.08_0.02_280)]" />
                  </motion.span>
                  <h3 className="mt-5 font-display text-xl font-700">¡Mensaje recibido!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Gracias por escribirnos. Te contactaremos muy pronto.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setDone(false)}
                    className="mt-5 text-muted-foreground"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-2xl glass p-6 sm:p-7"
                  aria-label="Formulario de contacto"
                >
                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Nombre">
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Tu nombre"
                          className="h-11 bg-white/[0.03]"
                        />
                      </Field>
                      <Field label="Email">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@empresa.com"
                          className="h-11 bg-white/[0.03]"
                        />
                      </Field>
                    </div>
                    <Field label="Empresa">
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nombre de tu empresa"
                        className="h-11 bg-white/[0.03]"
                      />
                    </Field>
                    <Field label="¿Qué te gustaría automatizar?">
                      <div className="flex flex-wrap gap-2">
                        {GOALS.map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setGoal(g)}
                            className={
                              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all " +
                              (goal === g
                                ? "border-[oklch(0.82_0.16_195/0.5)] bg-[oklch(0.82_0.16_195/0.12)] text-foreground"
                                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05]")
                            }
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </Field>
                    <Field label="Cuéntanos más">
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Describe brevemente tu proceso o desafío..."
                        className="bg-white/[0.03]"
                      />
                    </Field>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="group relative h-12 overflow-hidden rounded-xl bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] text-sm font-semibold text-[oklch(0.08_0.02_280)] glow-cyan"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar solicitud
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
