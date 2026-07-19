import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] });
  return NextResponse.json({ items });
}

export async function POST(request) {
  const data = await request.json().catch(() => ({}));

  if (!data.title || !data.description) {
    return NextResponse.json({ error: "Judul dan deskripsi wajib diisi" }, { status: 400 });
  }

  const item = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail || null,
      demoUrl: data.demoUrl || null,
      repoUrl: data.repoUrl || null,
      tags: data.tags || "",
      featured: !!data.featured,
      order: data.order ?? 0,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
