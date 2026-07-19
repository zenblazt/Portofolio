import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const profile = await prisma.profile.findUnique({ where: { id: "profile" } });
  return NextResponse.json({ item: profile });
}

export async function PUT(request) {
  const data = await request.json().catch(() => ({}));
  delete data.id;

  const profile = await prisma.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", bio: data.bio || "", ...data },
  });

  return NextResponse.json({ item: profile });
}
