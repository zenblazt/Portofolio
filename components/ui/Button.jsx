const base =
  "inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-gradient-to-r from-pink to-yellow text-[#1a0d13] hover:shadow-[0_14px_30px_-10px_rgba(255,61,129,0.55)]",
  ghost: "bg-transparent text-ink border border-border hover:border-mint",
  outline: "bg-transparent text-ink-dim border border-border hover:text-ink hover:border-pink",
};

export default function Button({ variant = "primary", className = "", as: Comp = "button", ...props }) {
  return <Comp className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
