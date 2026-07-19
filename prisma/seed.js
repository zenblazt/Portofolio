const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: { email: "admin@zenhub.id" },
    update: {},
    create: { email: "admin@zenhub.id", password: hashedPassword, name: "Zen" },
  });

  await prisma.profile.upsert({
    where: { id: "profile" },
    update: {},
    create: {
      id: "profile",
      name: "Catur Pamungkas",
      brand: "ZenHub",
      tagline: "Dari rakit PC, sampai bangun aplikasi web.",
      bio: "Lulusan SMK RPL dengan pengalaman di IT support dan desain grafis, kini membangun produk digital sendiri dari nol sampai live.",
      email: "hello@example.com",
    },
  });

  const skillData = [
    { name: "Perakitan PC", category: "IT & Hardware", emoji: "🔧", order: 1 },
    { name: "Troubleshooting Hardware", category: "IT & Hardware", emoji: "🛠️", order: 2 },
    { name: "Instalasi OS", category: "IT & Hardware", emoji: "💽", order: 3 },
    { name: "Jaringan Dasar", category: "IT & Hardware", emoji: "🌐", order: 4 },
    { name: "CorelDRAW", category: "Desain & Office", emoji: "✏️", order: 1 },
    { name: "Canva", category: "Desain & Office", emoji: "🖼️", order: 2 },
    { name: "Microsoft Office", category: "Desain & Office", emoji: "📊", order: 3 },
    { name: "Next.js", category: "Web & Produk Digital", emoji: "⚡", order: 1 },
    { name: "Prisma / MySQL", category: "Web & Produk Digital", emoji: "🗄️", order: 2 },
    { name: "Tailwind CSS", category: "Web & Produk Digital", emoji: "🎨", order: 3 },
  ];

  for (const s of skillData) {
    const existing = await prisma.skill.findFirst({ where: { name: s.name } });
    if (!existing) await prisma.skill.create({ data: s });
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.create({
      data: {
        title: "ZenStock.id",
        description: "Platform jual-beli produk digital (akun game, lisensi software, voucher top-up) dengan pengiriman kode otomatis.",
        tags: "Next.js,Prisma,Midtrans,Cloudinary",
        featured: true,
        order: 1,
      },
    });
  }

  console.log("Seed selesai. Login admin: admin@zenhub.id / admin123 — ganti password setelah login pertama.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
