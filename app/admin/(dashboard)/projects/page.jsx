"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import ImageUpload from "@/components/admin/ImageUpload";

const empty = { title: "", description: "", thumbnail: "", demoUrl: "", repoUrl: "", tags: "", featured: false, order: 0 };

export default function AdminProjectsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
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
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects";
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
      alert("Gagal menyimpan proyek");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus proyek ini?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Proyek</h1>
          <p className="text-sm text-ink-dim">Kelola proyek yang tampil di halaman publik.</p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-xl bg-gradient-to-r from-pink to-yellow px-5 py-2.5 text-sm font-bold text-[#1a0d13]"
        >
          + Tambah Proyek
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink-dim">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-dim">Belum ada proyek. Klik "Tambah Proyek" untuk mulai.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card p-4">
              {item.thumbnail ? (
                <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg">
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="mb-3 flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-xs text-ink-dim">
                  Belum ada gambar
                </div>
              )}
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-bold">{item.title}</h3>
                {item.featured && <span className="rounded-full bg-yellow/20 px-2 py-0.5 text-[0.65rem] font-bold text-yellow">Featured</span>}
              </div>
              <p className="mb-3 line-clamp-2 text-xs text-ink-dim">{item.description}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:border-mint">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-pink hover:border-pink">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="max-w-lg">
        <h2 className="mb-4 font-display text-xl font-bold">{editingId ? "Edit Proyek" : "Tambah Proyek"}</h2>
        <form onSubmit={handleSave} className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
          <ImageUpload value={form.thumbnail} onChange={(url) => setForm({ ...form, thumbnail: url })} />
          <input
            required
            placeholder="Judul proyek"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <textarea
            required
            rows={3}
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <input
            placeholder="Tags, pisahkan koma (Next.js, Prisma, ...)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <input
            placeholder="URL Demo (opsional)"
            value={form.demoUrl || ""}
            onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <input
            placeholder="URL Repo (opsional)"
            value={form.repoUrl || ""}
            onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Tandai sebagai Featured
          </label>
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
