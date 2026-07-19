import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple in-memory rate limit per IP (resets on server restart) — good enough
// for a low-traffic portfolio contact form without adding a Redis dependency.
const hits = new Map();
const LIMIT = 5;
const WINDOW_MS = 60 * 1000;

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const record = hits.get(ip) || { count: 0, start: now };
  if (now - record.start > WINDOW_MS) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  hits.set(ip, record);
  if (record.count > LIMIT) {
    return NextResponse.json({ error: "Terlalu banyak percobaan, coba lagi sebentar." }, { status: 429 });
  }

  const { name, email, content } = await request.json().catch(() => ({}));

  if (!name || !email || !content) {
    return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
  }
  if (name.length > 100 || email.length > 150 || content.length > 3000) {
    return NextResponse.json({ error: "Input terlalu panjang" }, { status: 400 });
  }

  await prisma.message.create({ data: { name, email, content } });

  return NextResponse.json({ ok: true });
}
