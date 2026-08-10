export default function TechBadge({ label }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-slate-300/90 backdrop-blur-xl">
      {label}
    </span>
  );
}
