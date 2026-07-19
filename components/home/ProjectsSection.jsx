"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { normalizeUrl } from "@/lib/utils";

const glowColors = ["bg-pink", "bg-blue", "bg-mint", "bg-yellow"];

export default function ProjectsSection({ projects }) {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="relative z-10 py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mb-14 max-w-xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-pink">Proyek Pilihan</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Sesuatu yang sudah dibangun & di-deploy</h2>
          <p className="mt-3 text-ink-dim">Bukan sekadar mockup — dikerjakan nyata dan terus dikembangkan.</p>
        </Reveal>

        {!projects || projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-ink-dim">
            Belum ada proyek ditambahkan. Kelola lewat halaman admin.
          </p>
        ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <button
                onClick={() => setActive(p)}
                className="group relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-card/60 p-8 text-left transition-colors hover:border-pink"
              >
                <span className={`absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-[60px] transition-opacity group-hover:opacity-40 ${glowColors[i % glowColors.length]}`} />
                {p.thumbnail ? (
                  <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl">
                    <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="mb-5 flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-border text-sm font-semibold text-ink-dim/50">
                    Belum ada gambar
                  </div>
                )}
                <span className="mb-4 block text-xs font-semibold text-ink-dim">{p.featured ? "Featured" : `Proyek`}</span>
                <h3 className="mb-2 font-display text-xl font-bold">{p.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-ink-dim">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.split(",").filter(Boolean).slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[0.7rem] font-bold text-ink-dim">
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink transition-transform group-hover:translate-x-1">
                  Lihat detail →
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} maxWidth="max-w-xl">
        {active && (
          <div>
            {active.thumbnail && (
              <div className="relative mb-5 h-52 w-full overflow-hidden rounded-xl">
                <Image src={active.thumbnail} alt={active.title} fill className="object-cover" />
              </div>
            )}
            <h3 className="mb-2 font-display text-2xl font-bold">{active.title}</h3>
            <p className="mb-5 text-ink-dim">{active.description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {active.tags.split(",").filter(Boolean).map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-ink-dim">
                  {t.trim()}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {active.demoUrl && (
                <Button as="a" href={normalizeUrl(active.demoUrl)} target="_blank" rel="noopener noreferrer" variant="primary">
                  Buka Demo ↗
                </Button>
              )}
              {active.repoUrl && (
                <Button as="a" href={normalizeUrl(active.repoUrl)} target="_blank" rel="noopener noreferrer" variant="ghost">
                  Lihat Repo
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
