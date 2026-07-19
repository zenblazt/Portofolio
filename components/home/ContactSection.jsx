"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", content: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative z-10 py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-pink/10 to-blue/10 p-8 sm:p-14">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="mb-3 font-display text-3xl font-bold sm:text-4xl">
                Punya ide proyek? <span className="gradient-text">Mari ngobrol.</span>
              </h2>
              <p className="mb-8 text-ink-dim">Kirim pesan langsung dari sini — masuk ke inbox, bakal aku balas.</p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-4">
              <input
                required
                placeholder="Nama kamu"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm outline-none placeholder:text-ink-dim focus:border-pink"
              />
              <input
                required
                type="email"
                placeholder="Email kamu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm outline-none placeholder:text-ink-dim focus:border-pink"
              />
              <textarea
                required
                rows={4}
                placeholder="Ceritakan proyek atau ide kamu..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm outline-none placeholder:text-ink-dim focus:border-pink"
              />
              <Button type="submit" variant="primary" disabled={status === "sending"} className="justify-center">
                {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
              </Button>

              {status === "sent" && <p className="text-center text-sm font-semibold text-mint">Pesan terkirim! Makasih udah mampir 🎉</p>}
              {status === "error" && <p className="text-center text-sm font-semibold text-pink">Gagal kirim, coba lagi sebentar ya.</p>}
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-ink-dim hover:text-ink">
                  {profile.email}
                </a>
              )}
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ink-dim hover:text-ink">
                  GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ink-dim hover:text-ink">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
