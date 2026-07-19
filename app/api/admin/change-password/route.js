import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword, verifyAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json().catch(() => ({}));

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Password lama dan baru wajib diisi" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Password baru minimal 8 karakter" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { id: payload.id } });
  if (!admin) {
    return NextResponse.json({ error: "Admin tidak ditemukan" }, { status: 404 });
  }

  const valid = await verifyPassword(currentPassword, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "Password lama salah" }, { status: 401 });
  }

  const hashed = await hashPassword(newPassword);
  await prisma.admin.update({ where: { id: admin.id }, data: { password: hashed } });

  return NextResponse.json({ ok: true });
}
