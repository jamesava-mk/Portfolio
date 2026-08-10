export default function SectionShell({ id, headingId, children, className = '', containerClassName = 'mx-auto max-w-7xl px-6 lg:px-8' }) {
  return (
    <section id={id} aria-labelledby={headingId} className={`relative isolate overflow-hidden bg-[#05070c] py-24 text-white sm:py-28 lg:py-32 ${className}`.trim()}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_46%,rgba(255,255,255,0.03)_100%)]" />

      <div className={`relative ${containerClassName}`.trim()}>{children}</div>
    </section>
  );
}
