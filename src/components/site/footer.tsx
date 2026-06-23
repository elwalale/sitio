"use client";

import { Zap, Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Servicios",
    links: [
      { label: "Agentes autónomos", href: "#servicios" },
      { label: "Automatización", href: "#servicios" },
      { label: "Modelos a medida", href: "#servicios" },
      { label: "Analítica predictiva", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Proceso", href: "#proceso" },
      { label: "Métricas", href: "#metricas" },
      { label: "Soluciones", href: "#soluciones" },
      { label: "Testimonios", href: "#testimonios" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "Agenda auditoría", href: "#contacto" },
      { label: "hola@agenciaicu.ai", href: "#contacto" },
      { label: "Santiago, Chile", href: "#contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[oklch(0.08_0.012_280)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.16_195/0.5)] to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] glow-cyan">
                <Zap className="h-5 w-5 text-[oklch(0.08_0.02_280)]" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-700 tracking-tight">
                Agencia<span className="text-gradient-cyan"> ICU</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Construimos sistemas de automatización con IA que liberan a tu equipo de lo
              repetitivo y escalan lo que importa.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg glass transition-colors hover:bg-white/10 hover:text-[oklch(0.82_0.16_195)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-[oklch(0.82_0.16_195)]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Agencia ICU · Automatización con IA
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Diseñado en Santiago, Chile <span className="text-[oklch(0.82_0.16_195)]">●</span>{" "}
            Sistema operativo
          </p>
        </div>
      </div>
    </footer>
  );
}
