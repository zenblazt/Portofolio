"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#projects", label: "Proyek" },
  { href: "#gallery", label: "Galeri" },
  { href: "#skills", label: "Skill" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar({ brand }) {
  const [open, setOpen] = useState(false);

  function handleNavClick(e, href) {
    e.preventDefault();
    const id = href.replace("#", "");
    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    if (open) {
      // Wait for the mobile menu's collapse animation to finish before scrolling,
      // otherwise the shrinking layout races with the scroll and cancels it.
      setOpen(false);
      setTimeout(scrollToTarget, 320);
    } else {
      scrollToTarget();
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-pink to-yellow shadow-[0_0_12px_#FF3D81]" />
          {brand}
        </a>

        <div className="hidden gap-8 text-sm font-semibold md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="text-ink-dim transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden rounded-xl bg-gradient-to-r from-pink to-yellow px-5 py-2 text-sm font-bold text-[#1a0d13] md:inline-block"
        >
          Hubungi
        </a>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-dim hover:bg-card hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
