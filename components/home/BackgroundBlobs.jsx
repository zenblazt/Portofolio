export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-pink/35 blur-[90px] animate-drift" />
      <div
        className="absolute top-1/3 -right-36 h-[420px] w-[420px] rounded-full bg-blue/35 blur-[90px] animate-drift"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute -bottom-24 left-1/5 h-[380px] w-[380px] rounded-full bg-mint/35 blur-[90px] animate-drift"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}
