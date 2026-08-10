import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Config — separated from the component body so content (roles, links, copy)
// can be edited or swapped for props without touching any animation logic.
// ---------------------------------------------------------------------------
const ROLES = [
  "Frontend Developer",
  "AI Builder",
  "Problem Solver",
 
];

const SOCIAL_LINKS = [
  { 
    label: "GitHub", 
    href: "https://github.com/jamesava-mk", 
    icon: FaGithub 
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/mkegh-avalumun-77aa9b384/", 
    icon: FaLinkedin 
  },
  { 
    label: "Email", 
    href: "mailto:avalumunmk2007@gmail.com", 
    icon: Mail 
  },
];

const TYPING_SPEED_MS = 65; // ms per character while typing
const DELETING_SPEED_MS = 35; // ms per character while deleting (faster feels snappier)
const HOLD_MS = 1400; // pause once a word is fully typed, before deleting

// ---------------------------------------------------------------------------
// useTypewriter — a small custom hook that cycles through `words`, typing
// and deleting each one. Pulled out of the component so the render function
// only deals with *what to show*, not the timing/state-machine logic.
// ---------------------------------------------------------------------------
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Decide how long to wait before the *next* character change, and
    // whether that change is typing forward or deleting backward.
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentWord.slice(0, text.length + 1);
          setText(next);
          // Fully typed → pause, then start deleting.
          if (next === currentWord) {
            setTimeout(() => setIsDeleting(true), HOLD_MS);
          }
        } else {
          const next = currentWord.slice(0, text.length - 1);
          setText(next);
          // Fully deleted → move to the next word and type again.
          if (next === "") {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting ? DELETING_SPEED_MS : TYPING_SPEED_MS
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

// ---------------------------------------------------------------------------
// Static particle field — generated once with useMemo (not on every render)
// so the "very subtle background particles" don't jump around or re-roll
// their random positions every time the component re-renders.
// ---------------------------------------------------------------------------
function useParticles(count = 28) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 5,
      })),
    [count]
  );
}

/**
 * Hero
 *
 * Landing hero section: greeting + name, large role heading, animated
 * typewriter subtitle, short intro, CTA buttons, and social links on the
 * left; a large portrait with animated gradient blobs, a grid overlay,
 * floating shapes, and mouse-driven parallax on the right.
 *
 * Self-contained — no props required. Swap `portraitSrc` or lift ROLES/
 * SOCIAL_LINKS to props if this needs to be reused with different content.
 */
export default function Hero({ portraitSrc = "/portrait.jpg" }) {
  const typedRole = useTypewriter(ROLES);
  const particles = useParticles();

  // -------------------------------------------------------------------
  // Mouse parallax: raw motion values updated on pointer move, then
  // smoothed with useSpring so the blobs/shapes glide rather than snap
  // to the cursor. useTransform maps that single spring value into
  // different pixel ranges per layer, giving each layer a different
  // "depth" (further layers move less, nearer ones move more).
  // -------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const blobX = useTransform(springX, [-1, 1], [-24, 24]);
  const blobY = useTransform(springY, [-1, 1], [-24, 24]);
  const shapeX = useTransform(springX, [-1, 1], [-40, 40]);
  const shapeY = useTransform(springY, [-1, 1], [-40, 40]);
  const portraitX = useTransform(springX, [-1, 1], [-10, 10]);
  const portraitY = useTransform(springY, [-1, 1], [-10, 10]);

  const rightPanelRef = useRef(null);

  // Normalize cursor position to a -1..1 range relative to the right
  // panel's own center, rather than the whole viewport — keeps the
  // parallax effect meaningful even on wide screens.
  const handlePointerMove = useCallback(
    (e) => {
      const el = rightPanelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(relX * 2);
      mouseY.set(relY * 2);
    },
    [mouseX, mouseY]
  );

  // Recenter the parallax when the cursor leaves the panel, so shapes
  // drift back to rest instead of freezing at their last offset.
  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Shared entrance-animation settings for the left-column content.
  // Centralized here so every child uses identical easing/duration and
  // only the delay staggers — keeps the sequence visually consistent.
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0e] text-white"
    >
      {/* ---------------- Background layer ---------------- */}
      {/* Animated gradient wash: two large radial glows drift slowly via
          Tailwind's arbitrary keyframe-driven animation classes defined in
          the Tailwind config (see notes below the component). */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-indigo-600/20 blur-[120px] animate-[drift_18s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/10 blur-[120px] animate-[drift_22s_ease-in-out_infinite_reverse]" />

        {/* Subtle particle field — small dots, low opacity, slow drift.
            "Subtle" is enforced via low opacity + small size, not just by
            reducing count, so it reads as texture rather than confetti. */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-16 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* =================== LEFT: content =================== */}
        <div className="order-2 lg:order-1">
          <motion.p
            {...fadeUp(0)}
            className="text-sm font-medium tracking-wide text-indigo-400"
          >
            Hi, I&apos;m James.
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Computer Science Student
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              &amp; Software Engineer
            </span>
          </motion.h1>

          {/* Typewriter line — fixed height (h-8) reserves space up front
              so the layout doesn't jump as the string grows/shrinks and a
              blinking caret span is appended after the live text. */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-5 h-8 font-mono text-lg text-gray-300 sm:text-xl"
          >
            {typedRole}
            <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-indigo-400 align-middle h-5" />
          </motion.div>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 max-w-md text-base leading-relaxed text-gray-400"
          >
            I build fast, thoughtful software — from polished interfaces to
            the systems underneath them. Currently exploring the edge of web
            engineering and applied AI.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
             className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition-transform duration-200 hover:scale-[1.02]"
            >
              View Projects
              <ArrowRight
                size={16}
                className="text-slate-950 transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-10 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="rounded-full border border-white/10 p-2.5 text-gray-400 transition-colors hover:border-white/25 hover:text-white"
>
                <Icon size={18} strokeWidth={1.75} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* =================== RIGHT: portrait + effects =================== */}
        <div
          ref={rightPanelRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="order-1 flex items-center justify-center lg:order-2"
        >
          <div className="relative h-[22rem] w-[22rem] sm:h-[26rem] sm:w-[26rem] lg:h-[30rem] lg:w-[30rem]">
            {/* Gradient blobs — sit behind everything else in this stack,
                drift on their own via CSS animation, and additionally
                shift with cursor parallax (further "back" = smaller
                parallax range, set in the useTransform calls above). */}
            <motion.div
              style={{ x: blobX, y: blobY }}
              className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-[90px] animate-[drift_14s_ease-in-out_infinite]"
            />
            <motion.div
              style={{ x: blobX, y: blobY }}
              className="absolute -bottom-10 -right-6 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-[90px] animate-[drift_16s_ease-in-out_infinite_reverse]"
            />

            {/* Grid overlay — a faint dot/line grid behind the portrait,
                purely decorative, reinforcing the "engineered" Linear/
                Vercel aesthetic. Implemented as a repeating background
                gradient so it needs no extra markup. */}
            <div
              className="absolute inset-0 rounded-[2rem] opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Floating geometric shapes — small accent shapes that orbit
                gently and react to parallax slightly more than the blobs
                (they're the "foreground" layer, so they get more travel). */}
            <motion.div
              style={{ x: shapeX, y: shapeY }}
              className="absolute -top-6 right-6 h-12 w-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              style={{ x: shapeX, y: shapeY }}
              className="absolute bottom-4 -left-8 h-8 w-8 rounded-full border border-indigo-400/40 bg-indigo-400/10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              style={{ x: shapeX, y: shapeY }}
              className="absolute top-1/2 -right-10 h-6 w-6 rotate-45 border border-fuchsia-400/40 bg-fuchsia-400/10"
              animate={{ rotate: [45, 60, 45] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Portrait — entrance animation runs once (scale/opacity),
                and a much smaller parallax offset than the shapes behind
                it, since it's the visual anchor and shouldn't wander far. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: portraitX, y: portraitY }}
              className="absolute inset-6 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl shadow-indigo-950/50"
            >
              <img
                src={portraitSrc}
                alt="Portrait of James"
                className="h-full w-full object-cover"
                // Graceful fallback: if no portrait asset exists yet at the
                // given path, fall back to a flat gradient panel instead of
                // a broken-image icon, so the section still looks intentional.
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.style.background =
                    "linear-gradient(135deg, #312e81, #4c1d95)";
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
