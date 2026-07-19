"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";

const empty = { name: "", category: "webdev", emoji: "⚡", order: 0 };
const categories = [
  { value: "hardware", label: "IT & Hardware" },
  { value: "design", label: "Desain & Office" },
  { value: "webdev", label: "Web & Produk Digital" },
];

export default function AdminSkillsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/skills");
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
      const url = editingId ? `/api/admin/skills/${editingId}` : "/api/admin/skills";
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
      alert("Gagal menyimpan skill");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus skill ini?")) return;
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Skill</h1>
          <p className="text-sm text-ink-dim">Kelola daftar keahlian yang tampil di halaman publik.</p>
        </div>
        <button onClick={openAdd} className="rounded-xl bg-gradient-to-r from-pink to-yellow px-5 py-2.5 text-sm font-bold text-[#1a0d13]">
          + Tambah Skill
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink-dim">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-dim">Belum ada skill.</p>
      ) : (
        categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.value);
          if (catItems.length === 0) return null;
          return (
            <div key={cat.value} className="mb-8">
              <h3 className="mb-3 text-sm font-bold text-ink-dim">{cat.label}</h3>
              <div className="flex flex-wrap gap-3">
                {catItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
                    <span>{item.emoji}</span>
                    <span className="text-sm font-semibold">{item.name}</span>
                    <button onClick={() => openEdit(item)} className="ml-2 text-xs text-ink-dim hover:text-mint">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs text-ink-dim hover:text-pink">
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="max-w-sm">
        <h2 className="mb-4 font-display text-xl font-bold">{editingId ? "Edit Skill" : "Tambah Skill"}</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            placeholder="Emoji (misal ⚡)"
            value={form.emoji}
            onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <input
            required
            placeholder="Nama skill"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
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
