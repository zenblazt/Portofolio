export default function Footer({ brand }) {
  return (
    <footer className="relative z-10 border-t border-border py-10 text-center text-sm text-ink-dim">
      © {new Date().getFullYear()} {brand}. Dibangun dengan proses yang jujur, satu vibe check di satu waktu.
    </footer>
  );
}
