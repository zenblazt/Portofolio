"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-bg text-ink">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-display font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-pink to-yellow" />
          ZenHub Admin
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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
      </aside>

      <div className="flex-1">
        <div className="flex h-16 items-center justify-between border-b border-border px-6 md:hidden">
          <span className="font-display font-bold">ZenHub Admin</span>
          <button onClick={handleLogout} className="text-sm font-semibold text-pink">
            Keluar
          </button>
        </div>
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
