"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] } }),
};

const floatCards = [
  { tag: "E-commerce", tagColor: "text-pink bg-pink/10", title: "ZenStock.id", sub: "Platform jual-beli produk digital otomatis", rotate: -6 },
  { tag: "Gov-Tech", tagColor: "text-blue bg-blue/10", title: "Sistem Desa", sub: "Website resmi + AI content assistant", rotate: 4 },
  { tag: "Tooling", tagColor: "text-yellow bg-yellow/10", title: "CLI Manager", sub: "Git workflow otomatis", rotate: -3 },
];

export default function Hero({ profile }) {
  const name = profile?.name || "Catur Pamungkas";
  const tagline = profile?.tagline || "Dari rakit PC, sampai bangun aplikasi web.";
  const bioShort =
    profile?.bio ||
    "Lulusan SMK RPL dengan pengalaman di IT support dan desain grafis, kini membangun produk digital sendiri dari nol sampai live.";

  return (
    // py-based sizing so desktop never gets an oversized empty banner — height follows content, not the viewport.
    <header className="relative z-10 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-mint"
          >
            🟢 Terbuka untuk kerja & proyek baru
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl"
          >
            {tagline.split(",")[0]},
            <br />
            <span className="gradient-text">{tagline.split(",").slice(1).join(",").trim() || "sampai bangun aplikasi web."}</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" className="mt-6 max-w-lg text-base text-ink-dim md:text-lg">
            Halo, saya <strong className="text-ink">{name}</strong> — dikenal juga sebagai <strong className="text-ink">Zen</strong>. {bioShort}
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#projects" variant="primary">
              Lihat Proyek ↓
            </Button>
            <Button as="a" href="#contact" variant="ghost">
              Ngobrol Bareng
            </Button>
          </motion.div>
        </div>

        <div className="relative hidden h-[420px] sm:block">
          {floatCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: c.rotate }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, y: -6 }}
              className={`absolute w-[230px] rounded-2xl border border-border bg-card p-4 shadow-2xl ${
                i === 0 ? "left-2 top-2" : i === 1 ? "right-0 top-32" : "left-16 bottom-2"
              }`}
            >
              <span className={`mb-3 inline-block rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide ${c.tagColor}`}>
                {c.tag}
              </span>
              <div className="font-display text-lg font-semibold">{c.title}</div>
              <div className="text-sm text-ink-dim">{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
