import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const data = await request.json().catch(() => ({}));
  delete data.id;

  const item = await prisma.project.update({ where: { id: params.id }, data });
  return NextResponse.json({ item });
}

export async function DELETE(_request, { params }) {
  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
