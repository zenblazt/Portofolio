import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const data = await request.json().catch(() => ({}));
  const item = await prisma.message.update({ where: { id: params.id }, data: { isRead: !!data.isRead } });
  return NextResponse.json({ item });
}

export async function DELETE(_request, { params }) {
  await prisma.message.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
