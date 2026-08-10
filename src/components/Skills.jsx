import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Brain,
  Database,
  GitBranch,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Content — kept as data, not JSX, so adding/reordering skills is a matter
// of editing this array rather than touching any layout or animation code.
// Each category gets one icon; each skill within it gets a name + level
// (0-100) that drives its progress bar's fill.
// ---------------------------------------------------------------------------
const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "TypeScript", level: 80 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 82 },
      { name: "REST APIs", level: 85 },
      { name: "PostgreSQL", level: 74 },
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    icon: Brain,
    skills: [
      { name: "LLM Integration", level: 78 },
      { name: "Prompt Engineering", level: 88 },
      { name: "Python", level: 80 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: GitBranch,
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 65 },
      { name: "CI/CD", level: 70 },
    ],
  },
];

// Entrance animation variants, shared by every card. Defined once outside
// the component so the same object reference is reused across renders
// instead of being rebuilt every time.
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Progress-bar fill variants. `custom` (the skill's level) is passed in
// per-instance from the JSX below, so this one variant object drives every
// bar's distinct width.
const barVariants = {
  hidden: { width: "0%" },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 1, delay: 0.3, ease: "easeOut" },
  }),
};

/**
 * Skills
 *
 * A responsive grid of animated skill-category cards. Each card lists an
 * icon, a category label, and its skills as labeled progress bars. Cards
 * animate in on scroll, and glow softly on hover via pure CSS (no JS
 * mouse-tracking) to signal interactivity.
 *
 * No inline `style` attributes are used for layout/appearance — all static
 * styling is Tailwind classes. The one place a numeric value drives a
 * visual property is the progress bar width, which is intentionally
 * animated through Framer Motion's `animate`/`variants` API rather than a
 * hand-written `style={{ width: ... }}`, since the width must be dynamic
 * per skill and Tailwind has no utility class for an arbitrary runtime
 * percentage.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Skills &amp; Tools
          </h2>
          <p className="mt-3 text-sm text-gray-400 sm:text-base">
            Technologies I work with regularly.
          </p>
        </motion.div>

        {/* Responsive grid: 1 column on mobile, 2 on tablets, 4 on desktop —
            keeps each card wide enough to read comfortably at every size
            rather than shrinking down into a cramped 4-column grid on
            small screens. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * SkillCard — one category's icon, label, and list of progress bars.
 * Split out from `Skills` so the per-card entrance animation (staggered
 * by `index`) and the hover-glow markup stay easy to read in isolation.
 */
function SkillCard({ category, index }) {
  const { label, icon: Icon, skills } = category;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
    >
      {/* Hover glow — a blurred, absolutely-positioned gradient layer that
          fades in via `group-hover:opacity-100`. This is plain Tailwind
          state-variant styling (no JS mouse tracking, no inline style),
          which is enough for a soft ambient glow reacting to hover. */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card content sits above the glow layer via relative + z-10. */}
      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300 transition-colors duration-300 group-hover:text-indigo-200">
            <Icon size={20} strokeWidth={1.75} />
          </span>
          <h3 className="text-base font-semibold text-white">{label}</h3>
        </div>

        <ul className="flex flex-col gap-4">
          {skills.map((skill) => (
            <li key={skill.name}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-gray-300">{skill.name}</span>
                <span className="text-gray-500">{skill.level}%</span>
              </div>

              {/* Track */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                {/* Fill — animated width via Framer Motion variants (see
                    component doc comment above for why this is the one
                    exception to "no inline styles"). */}
                <motion.div
                  custom={skill.level}
                  variants={barVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  className="h-full rounded-full bg-indigo-400"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
