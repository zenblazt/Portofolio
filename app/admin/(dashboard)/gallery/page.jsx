"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import ImageUpload from "@/components/admin/ImageUpload";

const empty = { imageUrl: "", caption: "", category: "design", order: 0 };

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setForm(empty);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(item) {
    setForm({ ...empty, ...item });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.imageUrl) {
      alert("Upload gambar dulu");
      return;
    }
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setModalOpen(false);
      load();
    } catch {
      alert("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus item galeri ini?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Galeri Desain</h1>
          <p className="text-sm text-ink-dim">Kelola gambar hasil karya yang tampil di halaman publik.</p>
        </div>
        <button onClick={openAdd} className="rounded-xl bg-gradient-to-r from-pink to-yellow px-5 py-2.5 text-sm font-bold text-[#1a0d13]">
          + Tambah Gambar
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink-dim">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-dim">Belum ada item galeri.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative h-32 w-full">
                <Image src={item.imageUrl} alt={item.caption} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="mb-2 truncate text-xs font-semibold">{item.caption}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="rounded-lg border border-border px-2.5 py-1 text-[0.7rem] font-semibold hover:border-mint">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg border border-border px-2.5 py-1 text-[0.7rem] font-semibold text-pink hover:border-pink">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="max-w-md">
        <h2 className="mb-4 font-display text-xl font-bold">{editingId ? "Edit Gambar" : "Tambah Gambar"}</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} />
          <input
            required
            placeholder="Caption"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          >
            <option value="design">Desain Grafis</option>
            <option value="web">Tampilan Web</option>
          </select>
          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-xl bg-gradient-to-r from-pink to-yellow px-6 py-3 text-sm font-bold text-[#1a0d13] disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
