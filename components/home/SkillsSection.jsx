"use client";

import Reveal from "@/components/ui/Reveal";

const categoryLabels = {
  hardware: "🖥️ IT & Hardware",
  design: "🎨 Desain & Office",
  webdev: "💻 Web & Produk Digital",
};

export default function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative z-10 py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mb-14 max-w-xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-pink">Keahlian</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Bukan cuma satu jalur</h2>
          <p className="mt-3 text-ink-dim">Dari urusan hardware sampai bikin aplikasi web.</p>
        </Reveal>

        {Object.entries(categoryLabels).map(([key, label]) =>
          grouped[key] ? (
            <div key={key} className="mb-10 last:mb-0">
              <h3 className="mb-4 text-sm font-bold text-ink-dim">{label}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {grouped[key].map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.05}>
                    <div className="rounded-2xl border border-border bg-card p-5 text-center transition-transform hover:-translate-y-1 hover:border-mint">
                      <div className="mb-2 text-2xl">{s.emoji}</div>
                      <div className="text-sm font-bold">{s.name}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}
