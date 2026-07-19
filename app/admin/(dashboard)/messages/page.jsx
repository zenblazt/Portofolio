"use client";

import { useEffect, useState } from "react";

export default function AdminMessagesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(item) {
    await fetch(`/api/admin/messages/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !item.isRead }),
    });
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Hapus pesan ini?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold">Pesan Masuk</h1>
      <p className="mb-8 text-sm text-ink-dim">Pesan dari form kontak halaman publik.</p>

      {loading ? (
        <p className="text-sm text-ink-dim">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-dim">Belum ada pesan masuk.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((m) => (
            <div key={m.id} className={`rounded-2xl border p-5 ${m.isRead ? "border-border bg-card" : "border-pink/40 bg-pink/5"}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold">{m.name}</span>{" "}
                  <span className="text-xs text-ink-dim">— {m.email}</span>
                  {!m.isRead && <span className="ml-2 rounded-full bg-pink/20 px-2 py-0.5 text-[0.65rem] font-bold text-pink">Baru</span>}
                </div>
                <span className="text-xs text-ink-dim">{new Date(m.createdAt).toLocaleString("id-ID")}</span>
              </div>
              <p className="mb-3 text-sm text-ink-dim">{m.content}</p>
              <div className="flex gap-2">
                <button onClick={() => toggleRead(m)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:border-mint">
                  {m.isRead ? "Tandai Belum Dibaca" : "Tandai Dibaca"}
                </button>
                <a
                  href={`mailto:${m.email}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:border-blue"
                >
                  Balas via Email
                </a>
                <button onClick={() => handleDelete(m.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-pink hover:border-pink">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
