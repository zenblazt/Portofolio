"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Modal from "@/components/ui/Modal";

export default function GallerySection({ items }) {
  const [active, setActive] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <section id="gallery" className="relative z-10 py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mb-14 max-w-xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-pink">Galeri Desain</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Hasil kerja visual</h2>
          <p className="mt-3 text-ink-dim">Desain grafis dan tampilan produk digital. Klik untuk lihat lebih detail.</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <button
                onClick={() => setActive(item)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-bg/90 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-semibold text-ink">{item.caption}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} maxWidth="max-w-2xl">
        {active && (
          <div>
            <div className="relative mb-4 h-[60vh] max-h-[480px] w-full overflow-hidden rounded-xl">
              <Image src={active.imageUrl} alt={active.caption} fill className="object-contain bg-bg-soft" />
            </div>
            <p className="text-center font-semibold text-ink">{active.caption}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}
