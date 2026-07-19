import { NextResponse } from "next/server";
import { uploadImageBuffer } from "@/lib/cloudinary";

const MAX_SIZE_MB = 5;
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];

export async function POST(request) {
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }
  if (!file.type?.startsWith("image/")) {
    return NextResponse.json({ error: "File harus berupa gambar" }, { status: 400 });
  }
  const ext = file.name?.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json({ error: "Format file tidak didukung. Pakai JPG, PNG, WEBP, atau GIF." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: `Ukuran gambar maksimal ${MAX_SIZE_MB}MB` }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImageBuffer(buffer, "zenhub");
    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error("Upload gagal:", err);
    return NextResponse.json({ error: "Upload ke Cloudinary gagal" }, { status: 500 });
  }
}
