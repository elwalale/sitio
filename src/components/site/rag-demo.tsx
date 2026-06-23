"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Send,
  Loader2,
  FileText,
  Database,
  Check,
  RefreshCw,
  Quote,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "./section-heading";

type Stage = "idle" | "retrieving" | "generating" | "done" | "error";

type Source = {
  id: number;
  title: string;
  source: string;
  snippet: string;
  score: number;
};

const SUGGESTED = [
  "¿Cuál es el SLA garantizado?",
  "¿Cómo se protegen mis datos?",
  "¿Cuánto demora implementar RAG?",
  "¿Qué integraciones soportan?",
  "¿Cómo funciona el pricing?",
];

// Renderiza la respuesta reemplazando [n] por badges de citación clicables.
function AnswerWithCitations({
  text,
  sources,
}: {
  text: string;
  sources: Source[];
}) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[(\d+)\]$/);
        if (m) {
          const n = Number(m[1]);
          const src = sources[n - 1];
          if (!src) return part;
          return (
            <a
              key={i}
              href={`#src-${src.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`src-${src.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="mx-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-1 font-mono text-[10px] font-700 text-[oklch(0.08_0.02_280)] align-middle transition-transform hover:scale-110"
              title={src.title}
            >
              {n}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function RagDemo() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [displayed, setDisplayed] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef(false);
  const answerRef = useRef<HTMLDivElement>(null);

  // typewriter effect for the answer
  useEffect(() => {
    if (stage !== "done" || !answer) return;
    abortRef.current = false;
    setDisplayed("");
    let i = 0;
    const step = () => {
      if (abortRef.current) return;
      setDisplayed(answer.slice(0, i));
      if (i < answer.length) {
        i += 2;
        setTimeout(step, 12);
      } else {
        setDisplayed(answer);
      }
    };
    step();
    return () => {
      abortRef.current = true;
    };
  }, [stage, answer]);

  async function ask(q: string) {
    const trimmed = q.trim();
    if (!trimmed || trimmed.length < 3) return;
    setStage("retrieving");
    setAnswer("");
    setDisplayed("");
    setSources([]);
    setError("");

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error");

      // mostrar fuentes primero (stage retrieving -> reveal)
      setSources(data.sources ?? []);
      // pequeña pausa para que se vea la animación de recuperación
      await new Promise((r) => setTimeout(r, 700));
      setStage("generating");
      await new Promise((r) => setTimeout(r, 600));
      setAnswer(data.answer ?? "");
      setStage("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setStage("error");
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ask(query);
  }

  function reset() {
    setStage("idle");
    setAnswer("");
    setDisplayed("");
    setSources([]);
    setError("");
    setQuery("");
  }

  const busy = stage === "retrieving" || stage === "generating";

  return (
    <section id="demo" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-[oklch(0.82_0.16_195/0.1)] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Demo en vivo"
          title={
            <>
              Pregunta a nuestro <span className="text-gradient-cyan">RAG</span> en tiempo real
            </>
          }
          description="Escribe una pregunta sobre Agencia ICU. El sistema recuperará documentos de su base de conocimiento y generará una respuesta con citaciones trazables."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 overflow-hidden rounded-3xl glass-strong"
        >
          {/* Pipeline status bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3 sm:px-6">
            <PipelineStep
              icon={Search}
              label="Consulta"
              active={stage === "retrieving" || stage === "generating" || stage === "done"}
              done={stage === "generating" || stage === "done"}
            />
            <PipelineConnector active={stage === "generating" || stage === "done"} />
            <PipelineStep
              icon={Database}
              label="Recuperación"
              active={stage === "retrieving"}
              done={stage === "generating" || stage === "done"}
            />
            <PipelineConnector active={stage === "done"} />
            <PipelineStep
              icon={Sparkles}
              label="Generación"
              active={stage === "generating"}
              done={stage === "done"}
            />
            <div className="ml-auto hidden items-center gap-2 font-mono text-[11px] text-muted-foreground sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.19_160)] animate-pulse-glow" />
              {stage === "idle" && "listo"}
              {stage === "retrieving" && "buscando documentos…"}
              {stage === "generating" && "generando respuesta…"}
              {stage === "done" && "completado"}
              {stage === "error" && "error"}
            </div>
          </div>

          <div className="p-5 sm:p-7">
            {/* Input */}
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej: ¿Cuál es el SLA garantizado?"
                  disabled={busy}
                  className="h-12 rounded-xl border-white/10 bg-white/[0.03] pl-10 pr-4 text-base"
                  aria-label="Escribe tu pregunta"
                />
              </div>
              <button
                type="submit"
                disabled={busy || query.trim().length < 3}
                className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] px-6 text-sm font-semibold text-[oklch(0.08_0.02_280)] glow-cyan disabled:opacity-50"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Procesando
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Consultar
                  </>
                )}
              </button>
            </form>

            {/* Suggested questions */}
            {stage === "idle" && (
              <div className="mt-4">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Prueba una pregunta:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setQuery(s);
                        ask(s);
                      }}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-foreground/80 transition-all hover:border-[oklch(0.82_0.16_195/0.4)] hover:bg-white/[0.06] hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <div className="mt-6">
              <AnimatePresence mode="wait">
                {/* Retrieving state */}
                {stage === "retrieving" && (
                  <motion.div
                    key="retrieving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-[oklch(0.82_0.16_195)]" />
                    <span className="font-mono text-sm text-muted-foreground">
                      Recuperando documentos relevantes de la base vectorial…
                    </span>
                  </motion.div>
                )}

                {/* Generating state (sources already shown) */}
                {stage === "generating" && sources.length > 0 && (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <SourcesList sources={sources} />
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-[oklch(0.74_0.25_330/0.3)] bg-[oklch(0.74_0.25_330/0.05)] p-4">
                      <Loader2 className="h-5 w-5 animate-spin text-[oklch(0.74_0.25_330)]" />
                      <span className="font-mono text-sm text-muted-foreground">
                        Generando respuesta con el LLM sobre el contexto recuperado…
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Done state */}
                {stage === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {sources.length > 0 && <SourcesList sources={sources} />}

                    <div
                      ref={answerRef}
                      className="mt-4 rounded-xl border border-[oklch(0.82_0.16_195/0.3)] bg-[oklch(0.82_0.16_195/0.04)] p-5"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[oklch(0.82_0.16_195)]" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[oklch(0.82_0.16_195)]">
                          Respuesta
                        </span>
                        {displayed.length < answer.length && (
                          <span className="ml-1 inline-block h-3.5 w-1.5 animate-blink bg-[oklch(0.82_0.16_195)]" />
                        )}
                      </div>
                      <p className="text-[15px] leading-relaxed text-foreground/90">
                        <AnswerWithCitations
                          text={displayed || answer}
                          sources={sources}
                        />
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {sources.length > 0
                            ? `${sources.length} fuente(s) · basada en contexto`
                            : "sin fuentes"}
                        </span>
                        <button
                          onClick={reset}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Nueva consulta
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error */}
                {stage === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-[oklch(0.65_0.24_25/0.4)] bg-[oklch(0.65_0.24_25/0.06)] p-4 text-sm text-foreground/90"
                  >
                    <p className="font-semibold text-[oklch(0.75_0.22_25)]">
                      Algo salió mal
                    </p>
                    <p className="mt-1 text-muted-foreground">{error}</p>
                    <button
                      onClick={reset}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Reintentar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
          Demo funcional · base de conocimiento de 8 documentos · retrieval por relevancia + LLM
        </p>
      </div>
    </section>
  );
}

function PipelineStep({
  icon: Icon,
  label,
  active,
  done,
}: {
  icon: typeof Search;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={
          "flex h-7 w-7 items-center justify-center rounded-lg border transition-all " +
          (done
            ? "border-[oklch(0.82_0.19_160/0.5)] bg-[oklch(0.82_0.19_160/0.15)] text-[oklch(0.82_0.19_160)]"
            : active
              ? "border-[oklch(0.82_0.16_195/0.5)] bg-[oklch(0.82_0.16_195/0.12)] text-[oklch(0.82_0.16_195)] glow-cyan"
              : "border-white/10 bg-white/[0.02] text-muted-foreground")
        }
      >
        {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Icon className="h-4 w-4" />}
      </span>
      <span
        className={
          "hidden text-xs font-medium sm:inline " +
          (active || done ? "text-foreground" : "text-muted-foreground")
        }
      >
        {label}
      </span>
    </div>
  );
}

function PipelineConnector({ active }: { active: boolean }) {
  return (
    <div className="h-px w-6 sm:w-10">
      <div
        className={
          "h-full transition-all " +
          (active ? "bg-gradient-to-r from-[oklch(0.82_0.16_195)] to-[oklch(0.82_0.19_160)]" : "bg-white/10")
        }
      />
    </div>
  );
}

function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <FileText className="h-4 w-4 text-[oklch(0.74_0.25_330)]" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Fuentes recuperadas
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((s, i) => (
          <motion.div
            key={s.id}
            id={`src-${s.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-[oklch(0.82_0.16_195/0.3)] hover:bg-white/[0.04]"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[oklch(0.82_0.16_195)] to-[oklch(0.74_0.25_330)] font-mono text-[11px] font-700 text-[oklch(0.08_0.02_280)]">
                {i + 1}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                score {s.score}
              </span>
            </div>
            <h4 className="flex items-start gap-1 text-sm font-semibold leading-snug">
              <Quote className="mt-0.5 h-3 w-3 shrink-0 text-[oklch(0.82_0.16_195/0.5)]" />
              {s.title}
            </h4>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {s.source}
            </p>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {s.snippet}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
