import { prisma } from "@/lib/prisma";
import BackgroundBlobs from "@/components/home/BackgroundBlobs";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import ProjectsSection from "@/components/home/ProjectsSection";
import GallerySection from "@/components/home/GallerySection";
import SkillsSection from "@/components/home/SkillsSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, projects, gallery, skills] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "profile" } }).catch(() => null),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] }).catch(() => []),
    prisma.galleryItem.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.skill.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);

  return (
    <>
      <BackgroundBlobs />
      <Navbar brand={profile?.brand || "ZenHub"} />
      <Hero profile={profile} />
      <Marquee />
      <ProjectsSection projects={projects} />
      <GallerySection items={gallery} />
      <SkillsSection skills={skills} />
      <ContactSection profile={profile} />
      <Footer brand={profile?.brand || "ZenHub"} />
    </>
  );
}
