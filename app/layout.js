import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export async function generateMetadata() {
  const profile = await prisma.profile.findUnique({ where: { id: "profile" } }).catch(() => null);
  const name = profile?.name || "Catur Pamungkas";
  const brand = profile?.brand || "ZenHub";
  const tagline = profile?.tagline || "Dari rakit PC, sampai bangun aplikasi web.";

  return {
    title: `${brand} — ${name}`,
    description: tagline,
    openGraph: {
      title: `${brand} — ${name}`,
      description: tagline,
      type: "website",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${sora.variable} ${spaceGrotesk.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
