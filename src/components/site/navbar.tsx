"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Demo", href: "#demo" },
  { label: "Proceso", href: "#proceso" },
  { label: "Métricas", href: "#metricas" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] glow-cyan">
            <Zap className="h-5 w-5 text-[oklch(0.08_0.02_280)]" strokeWidth={2.5} />
            <span className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
          </span>
          <span className="font-display text-lg font-700 tracking-tight">
            Agencia<span className="text-gradient-cyan"> ICU</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/0 transition-colors hover:bg-white/5" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <MagneticButton
            onClick={() => (window.location.hash = "#contacto")}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-4 py-2 text-sm font-semibold text-[oklch(0.08_0.02_280)] glow-cyan"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Hablemos
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg glass lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-16 z-50 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-3">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contacto"
                    onClick={() => setOpen(false)}
                    className="mt-1 block rounded-lg bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-4 py-3 text-center text-sm font-semibold text-[oklch(0.08_0.02_280)]"
                  >
                    Hablemos →
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
