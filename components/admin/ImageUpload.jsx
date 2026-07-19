"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload gagal");
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl border border-border">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-bg/80 text-xs"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="mb-3 flex h-36 w-full items-center justify-center rounded-xl border border-dashed border-border text-sm text-ink-dim">
          {uploading ? "Mengunggah..." : "Belum ada gambar"}
        </div>
      )}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-ink-dim hover:border-pink hover:text-ink">
        📤 {value ? "Ganti Gambar" : "Upload Gambar"}
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
      </label>
      {error && <p className="mt-2 text-xs font-semibold text-pink">{error}</p>}
    </div>
  );
}
