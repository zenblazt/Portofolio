"use client";

import Reveal from "@/components/ui/Reveal";

export default function SkillsSection({ skills }) {
  const grouped = (skills || []).reduce((acc, s) => {
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

        {!skills || skills.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-ink-dim">
            Belum ada skill ditambahkan. Kelola lewat halaman admin.
          </p>
        ) : (
        Object.entries(grouped).map(([category, catSkills]) => (
          <div key={category} className="mb-10 last:mb-0">
            <h3 className="mb-4 text-sm font-bold text-ink-dim">{category}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {catSkills.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-card p-5 text-center transition-transform hover:-translate-y-1 hover:border-mint">
                    <div className="mb-2 text-2xl">{s.emoji}</div>
                    <div className="text-sm font-bold">{s.name}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))
        )}
      </div>
    </section>
  );
}
