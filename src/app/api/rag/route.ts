import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { retrieve, buildContext, type RetrievedDoc } from "@/lib/rag-knowledge";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `Eres el asistente de RAG de Agencia ICU. Respondes en español, de forma clara y concisa (máx 4-5 frases), EXCLUSIVAMENTE con la información del contexto proporcionado.

Reglas estrictas:
- Usa SOLO el contexto. Si la información no está en el contexto, responde: "No tengo información sobre eso en la base de conocimiento de Agencia ICU."
- Cita las fuentes usando el formato [n] donde n es el número del documento entre corchetes. Ejemplo: "El SLA es del 99.9% [1]."
- Puedes combinar varios documentos y citarlos: [1][3].
- No inventes datos, precios, ni porcentajes que no estén en el contexto.
- No menciones que eres un modelo de lenguaje ni que usas contexto.`;

type ResponseBody = {
  answer: string;
  sources: { id: number; title: string; source: string; snippet: string; score: number }[];
  query: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: "La consulta es muy corta." },
        { status: 400 }
      );
    }

    // 1) Recuperar documentos relevantes
    const docs: RetrievedDoc[] = retrieve(query, 3);

    if (docs.length === 0) {
      return NextResponse.json<ResponseBody>({
        answer:
          "No encontré documentos relevantes en la base de conocimiento de Agencia ICU para esa consulta. Intenta reformular tu pregunta.",
        sources: [],
        query,
      });
    }

    const context = buildContext(docs);

    // 2) Generar respuesta con el LLM
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Contexto de la base de conocimiento:\n\n${context}\n\n---\n\nPregunta del usuario: ${query}`,
        },
      ],
      thinking: { type: "disabled" },
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ??
      "No pude generar una respuesta en este momento.";

    // 3) Normalizar las fuentes para el cliente
    const sources = docs.map((d) => ({
      id: d.id,
      title: d.title,
      source: d.source,
      snippet: d.content.slice(0, 160) + (d.content.length > 160 ? "…" : ""),
      score: Math.round(d.score * 100) / 100,
    }));

    return NextResponse.json<ResponseBody>({ answer, sources, query });
  } catch (err) {
    console.error("[rag] error:", err);
    return NextResponse.json(
      { error: "No pude procesar la consulta en este momento." },
      { status: 500 }
    );
  }
}
