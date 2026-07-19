const stack = ["Next.js", "Prisma", "MySQL", "Tailwind CSS", "Cloudinary", "PHP / MySQL", "CorelDRAW", "Canva"];

export default function Marquee() {
  const items = [...stack, ...stack];
  return (
    <div className="relative z-10 overflow-hidden border-y border-border bg-bg-soft py-6">
      <div className="marquee-track flex w-max gap-14">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap font-display text-xl font-semibold text-ink-dim">
            {item} <span className="text-base text-yellow">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
