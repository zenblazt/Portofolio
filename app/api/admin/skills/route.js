import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(request) {
  const data = await request.json().catch(() => ({}));

  if (!data.name || !data.category) {
    return NextResponse.json({ error: "Nama dan kategori wajib diisi" }, { status: 400 });
  }

  const item = await prisma.skill.create({
    data: {
      name: data.name,
      category: data.category,
      emoji: data.emoji || "⚡",
      order: data.order ?? 0,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
