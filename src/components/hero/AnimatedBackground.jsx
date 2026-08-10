import React, { useMemo } from "react";

// ---------------------------------------------------------------------------
// Config — default blob colors and counts live here so the component works
// with zero props out of the box, but every visual knob is still exposed as
// a prop for reuse in sections that want a different palette or density
// (e.g. a muted version behind a footer vs. a bolder one behind the hero).
// ---------------------------------------------------------------------------
const DEFAULT_BLOBS = [
  { color: "bg-indigo-600/20", size: "h-[32rem] w-[32rem]", position: "-top-40 -left-40", duration: 18, reverse: false },
  { color: "bg-fuchsia-600/10", size: "h-[32rem] w-[32rem]", position: "-bottom-40 -right-20", duration: 22, reverse: true },
];

/**
 * AnimatedBackground
 *
 * A self-contained, purely decorative backdrop: animated gradient blobs,
 * a tiny floating-particle field, a faint structural grid, and a noise
 * texture layered on top for a dark, premium, non-flat feel.
 *
 * Designed to be dropped behind any section as an absolutely-positioned
 * fill layer — the section itself stays responsible for its own content,
 * z-index stacking, and `position: relative`.
 *
 * Usage:
 *   <section className="relative">
 *     <AnimatedBackground />
 *     <div className="relative z-10"> ...actual content... </div>
 *   </section>
 *
 * Everything here is `pointer-events-none` and `aria-hidden`, since it's
 * decoration only and must never intercept clicks or be read by screen
 * readers.
 */
export default function AnimatedBackground({
  blobs = DEFAULT_BLOBS,
  particleCount = 28,
  showGrid = true,
  showNoise = true,
  gridSize = 28,
  className = "",
}) {
  // Particle positions/timings are randomized but generated once via
  // useMemo — without this, any parent re-render (e.g. the Hero updating
  // its typewriter text every ~65ms) would re-roll every particle's
  // position and the field would visibly flicker instead of drifting.
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 5,
      })),
    [particleCount]
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* ---------------- Base dark gradient wash ---------------- */}
      {/* A subtle top-to-bottom gradient (rather than a flat fill) is what
          reads as "premium" instead of "just a dark background" — it gives
          the eye a very gentle sense of depth even before anything animates. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e] via-[#0a0a0f] to-[#0a0a0e]" />

      {/* ---------------- Moving blurred blobs ---------------- */}
      {/* Large, heavily-blurred, low-opacity color fields. Blur is what
          turns a plain circle into a soft "glow" instead of a visible
          shape; low opacity keeps multiple blobs from ever fighting for
          attention or blowing out contrast with foreground text. */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[120px] ${blob.color} ${blob.size} ${blob.position}`}
          style={{
            animation: `abg-drift ${blob.duration}s ease-in-out infinite ${
              blob.reverse ? "reverse" : "normal"
            }`,
          }}
        />
      ))}

      {/* ---------------- Subtle structural grid ---------------- */}
      {/* Built as a CSS background-image (repeating line gradient) rather
          than dozens of absolutely-positioned <div> lines — one element,
          no extra DOM weight, and trivially resizable via `gridSize`.
          Faded out toward the edges with a radial mask so it reads as
          atmosphere rather than a hard-edged overlay. */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: `${gridSize}px ${gridSize}px`,
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />
      )}

      {/* ---------------- Tiny floating particles ---------------- */}
      {/* Kept genuinely small (1-3px) and low-opacity so they register as
          texture/atmosphere, not as visible "confetti" competing with
          foreground content. */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `abg-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* ---------------- Noise texture ---------------- */}
      {/* A film-grain layer is what separates a "dark background" from a
          "dark, premium background" — flat dark gradients look cheap and
          banding-prone; a faint noise layer breaks that up the way real
          product sites (Linear, Vercel) do. Generated inline as an SVG
          <feTurbulence> filter encoded as a data URI, so no external
          image asset is required and the component stays a single file. */}
      {showNoise && (
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      {/* ---------------- Keyframes ---------------- */}
      {/* Scoped as a local <style> tag rather than requiring edits to the
          consumer's tailwind.config.js — this keeps the component fully
          drop-in/reusable across projects with zero external setup. */}
      <style>{`
        @keyframes abg-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes abg-float {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-12px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
