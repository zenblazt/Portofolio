import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projectCount, galleryCount, skillCount, unreadCount, totalMessages] = await Promise.all([
    prisma.project.count(),
    prisma.galleryItem.count(),
    prisma.skill.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.message.count(),
  ]);

  const cards = [
    { label: "Proyek", value: projectCount, icon: "🗂️", color: "text-pink" },
    { label: "Item Galeri", value: galleryCount, icon: "🎨", color: "text-blue" },
    { label: "Skill", value: skillCount, icon: "⚡", color: "text-yellow" },
    { label: "Pesan Belum Dibaca", value: unreadCount, icon: "✉️", color: "text-mint" },
    { label: "Total Pesan", value: totalMessages, icon: "📬", color: "text-ink" },
  ];

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold">Dashboard</h1>
      <p className="mb-8 text-sm text-ink-dim">Ringkasan konten portfolio kamu.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
            <div className={`mb-2 text-2xl ${c.color}`}>{c.icon}</div>
            <div className="font-display text-2xl font-bold">{c.value}</div>
            <div className="text-xs text-ink-dim">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
