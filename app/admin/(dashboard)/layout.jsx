"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/projects", label: "Proyek", icon: "🗂️" },
  { href: "/admin/gallery", label: "Galeri", icon: "🎨" },
  { href: "/admin/skills", label: "Skill", icon: "⚡" },
  { href: "/admin/messages", label: "Pesan", icon: "✉️" },
  { href: "/admin/profile", label: "Profil", icon: "👤" },
];

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const NavLinks = ({ onNavigate }) => (
    <nav className="flex flex-col gap-1 p-4">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-gradient-to-r from-pink/20 to-yellow/20 text-ink" : "text-ink-dim hover:bg-white/5 hover:text-ink"
            }`}
          >
            <span>{item.icon}</span> {item.label}
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink-dim hover:bg-white/5 hover:text-pink"
      >
        🚪 Keluar
      </button>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-bg text-ink">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-display font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-pink to-yellow" />
          ZenHub Admin
        </div>
        <NavLinks />
      </aside>

      <div className="flex-1">
        <div className="flex h-16 items-center justify-between border-b border-border px-6 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg"
          >
            ☰
          </button>
          <span className="font-display font-bold">ZenHub Admin</span>
          <button onClick={handleLogout} className="text-sm font-semibold text-pink">
            Keluar
          </button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="w-64 border-r border-border bg-card">
              <div className="flex h-16 items-center justify-between border-b border-border px-4 font-display font-bold">
                ZenHub Admin
                <button onClick={() => setMobileOpen(false)} aria-label="Tutup menu" className="text-lg">
                  ✕
                </button>
              </div>
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="flex-1 bg-bg/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
