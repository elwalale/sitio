import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const company =
      typeof body?.company === "string" && body.company.trim()
        ? body.company.trim()
        : null;
    const goal =
      typeof body?.goal === "string" && body.goal.trim() ? body.goal.trim() : null;
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "El nombre es obligatorio." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "El email no es válido." },
        { status: 400 }
      );
    }
    if (!message || message.length < 5) {
      return NextResponse.json(
        { error: "Cuéntanos un poco más sobre tu proyecto." },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: { name, email, company, goal, message },
    });

    return NextResponse.json(
      { ok: true, id: lead.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json(
      { error: "No pudimos procesar tu solicitud." },
      { status: 500 }
    );
  }
}
