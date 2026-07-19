import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";

// In-memory brute-force guard: 5 attempts per 15 minutes per IP.
const attempts = new Map();
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const record = attempts.get(ip) || { count: 0, start: now };
  if (now - record.start > WINDOW_MS) {
    record.count = 0;
    record.start = now;
  }
  if (record.count >= LIMIT) {
    return NextResponse.json({ error: "Terlalu banyak percobaan login. Coba lagi dalam beberapa menit." }, { status: 429 });
  }

  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    record.count += 1;
    attempts.set(ip, record);
    return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
  }

  const valid = await verifyPassword(password, admin.password);
  if (!valid) {
    record.count += 1;
    attempts.set(ip, record);
    return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
  }

  attempts.delete(ip);
  const token = await signAdminToken({ id: admin.id, email: admin.email });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
