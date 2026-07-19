import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(request) {
  const data = await request.json().catch(() => ({}));

  if (!data.imageUrl || !data.caption) {
    return NextResponse.json({ error: "Gambar dan caption wajib diisi" }, { status: 400 });
  }

  const item = await prisma.galleryItem.create({
    data: {
      imageUrl: data.imageUrl,
      caption: data.caption,
      category: data.category || "design",
      order: data.order ?? 0,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
