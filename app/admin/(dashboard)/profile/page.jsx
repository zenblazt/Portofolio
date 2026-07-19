"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminProfilePage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => setForm(data.item || {}));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
    } catch {
      alert("Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  }

  if (!form) return <p className="text-sm text-ink-dim">Memuat...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="mb-1 font-display text-2xl font-bold">Profil</h1>
      <p className="mb-8 text-sm text-ink-dim">Data ini tampil di hero & footer halaman publik.</p>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-xs font-bold text-ink-dim">Foto Profil</label>
          <ImageUpload value={form.avatarUrl || ""} onChange={(url) => setForm({ ...form, avatarUrl: url })} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">Nama Lengkap</label>
          <input
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">Brand / Nama Panggung</label>
          <input
            value={form.brand || ""}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">Tagline (pakai koma buat baris ke-2)</label>
          <input
            value={form.tagline || ""}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">Bio Singkat</label>
          <textarea
            rows={4}
            value={form.bio || ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">Email</label>
          <input
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">GitHub URL</label>
          <input
            value={form.github || ""}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-ink-dim">LinkedIn URL</label>
          <input
            value={form.linkedin || ""}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 w-fit rounded-xl bg-gradient-to-r from-pink to-yellow px-6 py-3 text-sm font-bold text-[#1a0d13] disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        {saved && <p className="text-sm font-semibold text-mint">Tersimpan!</p>}
      </form>
    </div>
  );
}
