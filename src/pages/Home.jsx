import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Compass,
  GitBranch,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const FALLBACK_STATS = {
  contributions: 0,
  repositories: 0,
  currentStreak: 0,
  longestStreak: 0,
  languages: [],
  contributionDays: [],
};

let githubStatsPromise;

function loadGithubStats() {
  if (!githubStatsPromise) {
    githubStatsPromise = fetch('/api/github-stats')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }

        return res.json();
      })
      .then((data) => ({
        contributions: data.contributions ?? 0,
        repositories: data.repositories ?? 0,
        currentStreak: data.currentStreak ?? 0,
        longestStreak: data.longestStreak ?? 0,
        languages: data.languages ?? [],
        contributionDays: data.contributionDays ?? [],
      }))
      .catch(() => FALLBACK_STATS);
  }

  return githubStatsPromise;
}

/* ---------------------------------------------------------
   GITHUB
--------------------------------------------------------- */

function useGithubStats() {
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    let mounted = true;

    loadGithubStats().then((nextStats) => {
      if (mounted) {
        setStats(nextStats);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return stats;
}

/* ---------------------------------------------------------
   BACKGROUND
--------------------------------------------------------- */

function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#08090a]">
      <motion.div
        animate={{
          x: ["-18%", "12%", "-8%", "-18%"],
          y: ["-12%", "10%", "24%", "-12%"],
          scale: [1, 1.3, 0.95, 1],
          opacity: [0.025, 0.055, 0.035, 0.025],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[15%] -top-[25%] h-[85vh] w-[80vw] rounded-full bg-white blur-[170px]"
      />

      <motion.div
        animate={{
          x: ["18%", "-12%", "4%", "18%"],
          y: ["18%", "-5%", "-18%", "18%"],
          scale: [1.1, 0.92, 1.22, 1.1],
          opacity: [0.015, 0.04, 0.025, 0.015],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[25%] -right-[20%] h-[75vh] w-[70vw] rounded-full bg-white blur-[180px]"
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.8) 0.7px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.15)_55%,#050506_100%)]" />
    </div>
  );
}

/* ---------------------------------------------------------
   HERO PORTRAIT
--------------------------------------------------------- */

function HeroPortrait() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#08090a]">
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.025,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
      >
        <img
          src="/potrait1.png"
          alt="James"
          className="absolute left-1/2 top-[51%] h-[96%] w-full min-w-[1000px] -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-[0.22] grayscale-[0.3] contrast-[0.82] brightness-[0.82] mix-blend-luminosity sm:min-w-[1100px]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#08090a] via-transparent to-[#08090a]/70" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/65 via-transparent to-[#08090a]" />

        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#08090a] via-[#08090a]/70 to-transparent" />

        <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#08090a] to-transparent" />
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------
   HERO TYPEWRITER
--------------------------------------------------------- */

function useAlternatingTypewriter() {
  const sides = {
    right: "the me that builds",
    left: "the me that lives",
  };

  const [side, setSide] = useState("right");
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const target = sides[side];

    let delay = 115;

    if (phase === "typing") {
      delay = text.length === target.length ? 2200 : 115;
    }

    if (phase === "deleting") {
      delay = 72;
    }

    const timeout = setTimeout(() => {
      if (phase === "typing") {
        if (text.length < target.length) {
          setText(target.slice(0, text.length + 1));
        } else {
          setPhase("deleting");
        }

        return;
      }

      if (phase === "deleting") {
        if (text.length > 0) {
          setText(target.slice(0, text.length - 1));
        } else {
          setSide((current) =>
            current === "right" ? "left" : "right",
          );

          setPhase("typing");
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [side, text, phase]);

  return {
    side,
    text,
  };
}

function HeroTypewriter() {
  const { side, text } = useAlternatingTypewriter();

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <motion.div
        animate={{
          opacity: side === "left" ? 1 : 0,
          x: side === "left" ? 0 : -10,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="absolute left-5 top-[43%] sm:left-6 md:left-10"
      >
        <div className="relative">
          <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium leading-none tracking-[0.04em] text-white/45 sm:text-[12px] md:text-[15px]">
            {side === "left" ? text : ""}

            {side === "left" && (
              <span className="ml-2 inline-block h-[12px] w-px translate-y-[2px] animate-pulse bg-white/60 sm:h-[13px]" />
            )}
          </p>

          <motion.div
            animate={{
              scaleX: side === "left" ? 1 : 0,
              opacity: side === "left" ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="absolute -bottom-3 left-0 h-px w-full origin-left bg-gradient-to-r from-white/40 to-transparent"
          />
        </div>
      </motion.div>

      <motion.div
        animate={{
          opacity: side === "right" ? 1 : 0,
          x: side === "right" ? 0 : 10,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="absolute right-5 top-[43%] text-right sm:right-6 md:right-10"
      >
        <div className="relative">
          <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-medium leading-none tracking-[0.04em] text-white/45 sm:text-[12px] md:text-[15px]">
            {side === "right" ? text : ""}

            {side === "right" && (
              <span className="ml-2 inline-block h-[12px] w-px translate-y-[2px] animate-pulse bg-white/60 sm:h-[13px]" />
            )}
          </p>

          <motion.div
            animate={{
              scaleX: side === "right" ? 1 : 0,
              opacity: side === "right" ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="absolute -bottom-3 right-0 h-px w-full origin-right bg-gradient-to-l from-white/40 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------
   SELECTED WORK
--------------------------------------------------------- */

function SelectedWork() {
  const projects = [
    {
      number: "01",
      title: "BeUnique Wears",
      type: "E-commerce / Experience",
      description:
        "A fashion storefront built around a darker, more editorial shopping experience.",
      position:
        "left-[2%] top-[7%] w-[90%] md:left-[7%] md:top-[5%] md:w-[61%]",
      rotation: -2,
    },
    {
      number: "02",
      title: "Lala",
      type: "Product / Platform",
      description:
        "A product platform exploring how useful software can solve everyday problems simply.",
      position:
        "right-[1%] top-[38%] w-[84%] md:right-[4%] md:top-[29%] md:w-[48%]",
      rotation: 3,
    },
    {
      number: "03",
      title: "Kora",
      type: "Product / Experience",
      description:
        "A product concept shaped around creating a thoughtful digital experience from the ground up.",
      position:
        "left-[8%] bottom-[5%] w-[82%] md:left-[13%] md:bottom-[5%] md:w-[41%]",
      rotation: -4,
    },
  ];

  return (
    <section className="relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-transparent via-[#08090a]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-16 md:px-10 md:pb-36 md:pt-20">
        <div className="relative z-10 flex justify-end">
          <Link
            to="/work"
            className="group mb-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30 transition hover:text-white"
          >
            View works

            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative mt-7 h-[600px] overflow-hidden sm:mt-8 sm:h-[670px] md:h-[760px]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-white" />
          </div>

          {projects.map((project, index) => (
            <Link
              key={project.number}
              to="/work"
              className={`group absolute ${project.position}`}
            >
              <motion.article
                initial={{
                  opacity: 0,
                  y: 35,
                  rotate: project.rotation,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -10,
                  rotate: 0,
                }}
                className="relative overflow-hidden border border-white/[0.08] bg-[#090b0f]/90 shadow-2xl shadow-black/30 transition-[border-color,box-shadow] duration-500 group-hover:border-white/20"
              >
                <div className="relative overflow-hidden px-4 py-5 sm:px-5 sm:py-6 md:px-7 md:py-8">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-[60px]" />
                  </div>

                  <div className="relative flex min-w-0 items-center gap-2 sm:gap-3">
                    <span className="shrink-0 text-[8px] uppercase tracking-[0.2em] text-white/40">
                      {project.number}
                    </span>

                    <span className="h-px w-5 shrink-0 bg-white/15 sm:w-7" />

                    <span className="min-w-0 truncate text-[7px] uppercase tracking-[0.16em] text-white/25 sm:text-[8px] sm:tracking-[0.2em]">
                      {project.type}
                    </span>
                  </div>

                  <div className="relative mt-12 sm:mt-16 md:mt-20">
                    <h3 className="max-w-[88%] text-[clamp(1.75rem,8vw,4.5rem)] font-light leading-[0.88] tracking-[-0.065em] text-white/90 sm:text-[clamp(2rem,6vw,4.5rem)]">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-[11px] leading-5 text-white/35 sm:mt-5 sm:text-xs sm:leading-6 md:text-sm">
                      {project.description}
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-white/35 transition-colors group-hover:text-white/70 sm:mt-7">
                      View work

                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.2}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <Link
          to="/work"
          className="group mt-7 flex w-fit items-center gap-3 pb-2 text-[9px] uppercase tracking-[0.22em] text-white/30 transition hover:text-white sm:hidden"
        >
          View works

          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   JOURNEY BRIDGE
--------------------------------------------------------- */

const JOURNEY_LINES = [
  "I started with curiosity more than a clear plan.",
  "Computers became a way to turn questions into things I could actually make.",
  "A lot of those things broke. Some worked. Most taught me something.",
  "Somewhere along the way, I started caring more about what was worth building.",
  "I am still learning, still building, and still figuring out where this goes.",
];

function JourneyRevealLine({
  line,
  index,
  total,
  progress,
}) {
  const start = (index / total) * 0.55;
  const end = Math.min(1, start + 0.36);

  const opacity = useTransform(
    progress,
    [start, end],
    [0.12, 1],
  );

  const blur = useTransform(
    progress,
    [start, end],
    [4, 0],
  );

  const filter = useTransform(
    blur,
    (value) => `blur(${value}px)`,
  );

  const y = useTransform(
    progress,
    [start, end],
    [4, 0],
  );

  return (
    <motion.p
      style={{
        opacity,
        filter,
        y,
      }}
      className="mb-4 text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.65] tracking-[-0.02em] text-white/70 will-change-transform md:mb-5 md:leading-[1.7]"
    >
      {line}
    </motion.p>
  );
}

function JourneyStory() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "end 70%"],
  });

  return (
    <div
      ref={containerRef}
      className="mt-9 sm:mt-10 md:mt-12"
    >
      <div className="max-w-3xl">
        {JOURNEY_LINES.map((line, index) => (
          <JourneyRevealLine
            key={`${line}-${index}`}
            line={line}
            index={index}
            total={JOURNEY_LINES.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function JourneyBridge() {
  return (
    <section className="relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 md:px-10 md:py-36">
        <div className="relative">
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-white/[0.025] blur-[110px]" />

          <div className="relative">
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
              04 / Still figuring it out
            </p>

            <JourneyStory />

            <div className="mt-9 sm:mt-10">
              <Link
                to="/journey"
                className="group inline-flex w-fit items-center gap-3 pb-2 text-[9px] uppercase tracking-[0.24em] text-white/40 transition hover:text-white"
              >
                Take the journey

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   GITHUB
--------------------------------------------------------- */

function GithubActivity() {
  const stats = useGithubStats();

  const recentDays = stats.contributionDays.slice(-35);

  const maxContribution = Math.max(
    ...recentDays.map(
      (day) => day.contributionCount,
    ),
    1,
  );

  const totalRecentContributions = recentDays.reduce(
    (total, day) =>
      total + day.contributionCount,
    0,
  );

  return (
    <section className="relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 md:px-10 md:py-36">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
            <div className="flex items-center gap-3">
              <GitBranch
                size={15}
                strokeWidth={1.2}
                className="text-white/30"
              />

              <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
                05 / Open source trail
              </p>
            </div>

            <h2 className="mt-5 text-[clamp(3.5rem,16vw,9rem)] font-medium leading-[0.78] tracking-[-0.09em] sm:mt-6">
              {stats.contributions}
            </h2>

            <div className="mt-6 flex items-center gap-3 sm:mt-7">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />

              <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                contributions
              </p>
            </div>

            <p className="mt-7 max-w-sm text-sm leading-6 text-white/30 sm:mt-8">
              The public version of me messing around,
              learning things and occasionally getting
              something right.
            </p>

            <a
              href="https://github.com/jamesava-mk"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-3 pb-2 text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white sm:mt-8"
            >
              github / jamesava-mk

              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2">
              <div className="min-h-[125px] border-b border-r border-white/10 p-4 sm:min-h-[150px] sm:p-5 md:p-7">
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/20 sm:text-[9px] sm:tracking-[0.2em]">
                  repositories
                </p>

                <p className="mt-8 text-3xl font-medium tracking-[-0.07em] sm:mt-10 sm:text-4xl md:text-6xl">
                  {stats.repositories}
                </p>
              </div>

              <div className="min-h-[125px] border-b border-white/10 p-4 sm:min-h-[150px] sm:p-5 md:p-7">
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/20 sm:text-[9px] sm:tracking-[0.2em]">
                  current streak
                </p>

                <p className="mt-8 text-3xl font-medium tracking-[-0.07em] sm:mt-10 sm:text-4xl md:text-6xl">
                  {stats.currentStreak}

                  <span className="ml-1 text-[10px] font-normal tracking-normal text-white/25 sm:ml-2 sm:text-sm">
                    days
                  </span>
                </p>
              </div>

              <div className="min-h-[125px] border-b border-r border-white/10 p-4 sm:min-h-[150px] sm:p-5 md:p-7">
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/20 sm:text-[9px] sm:tracking-[0.2em]">
                  longest streak
                </p>

                <p className="mt-8 text-3xl font-medium tracking-[-0.07em] sm:mt-10 sm:text-4xl md:text-6xl">
                  {stats.longestStreak}

                  <span className="ml-1 text-[10px] font-normal tracking-normal text-white/25 sm:ml-2 sm:text-sm">
                    days
                  </span>
                </p>
              </div>

              <div className="min-h-[125px] border-b border-white/10 p-4 sm:min-h-[150px] sm:p-5 md:p-7">
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/20 sm:text-[9px] sm:tracking-[0.2em]">
                  last 35 days
                </p>

                <p className="mt-8 text-3xl font-medium tracking-[-0.07em] sm:mt-10 sm:text-4xl md:text-6xl">
                  {totalRecentContributions}
                </p>
              </div>
            </div>

            <div className="mt-7 bg-white/[0.012] p-4 sm:mt-8 sm:p-5 md:p-7">
              <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
                <div className="min-w-0">
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/20 sm:text-[9px] sm:tracking-[0.22em]">
                    activity / recent 35 days
                  </p>

                  <p className="mt-2 max-w-xs text-[11px] leading-5 text-white/25 sm:text-xs">
                    Not a heatmap. Just a little pulse of what
                    has actually been happening.
                  </p>
                </div>

                <span className="hidden shrink-0 text-[8px] uppercase tracking-[0.18em] text-white/15 sm:block">
                  {recentDays.length} days
                </span>
              </div>

              <div className="flex h-28 items-end gap-[3px] sm:h-32 sm:gap-1 md:h-40">
                {recentDays.map((day, index) => {
                  const height =
                    day.contributionCount === 0
                      ? 4
                      : Math.max(
                          10,
                          (day.contributionCount /
                            maxContribution) *
                            100,
                        );

                  return (
                    <motion.div
                      key={day.date}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      whileInView={{
                        height: `${height}%`,
                        opacity:
                          day.contributionCount === 0
                            ? 0.16
                            : 0.35 +
                              (day.contributionCount /
                                maxContribution) *
                                0.65,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.018,
                        ease: "easeOut",
                      }}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                      className="min-w-0 flex-1 rounded-t-[2px] bg-white"
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex justify-between gap-4 pt-4 text-[7px] uppercase tracking-[0.14em] text-white/15 sm:mt-5 sm:text-[8px] sm:tracking-[0.18em]">
                <span className="truncate">
                  {recentDays[0]?.date || "—"}
                </span>

                <span className="truncate text-right">
                  {recentDays[recentDays.length - 1]?.date ||
                    "—"}
                </span>
              </div>
            </div>

            {stats.languages.length > 0 && (
              <div className="mt-7 sm:mt-8">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/20 sm:text-[9px] sm:tracking-[0.22em]">
                    things I keep opening
                  </p>

                  <span className="hidden text-[8px] uppercase tracking-[0.18em] text-white/15 xs:block sm:block">
                    primary languages
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {stats.languages.map(
                    (language, index) => (
                      <span
                        key={language}
                        className={`border px-3 py-2 text-[8px] uppercase tracking-[0.14em] sm:text-[9px] sm:tracking-[0.16em] ${
                          index === 0
                            ? "border-white/20 bg-white/[0.05] text-white/55"
                            : "border-white/10 bg-white/[0.02] text-white/25"
                        }`}
                      >
                        {language}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   FOOTER
--------------------------------------------------------- */

function Footer() {
  const iconClass =
    "group relative flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/[0.015] text-white/30 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white";

  return (
    <footer className="relative z-10 px-5 pb-6 pt-8 sm:px-6 sm:pb-7 sm:pt-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium tracking-[-0.035em]"
          >
            &lt;JAMES /&gt;
          </Link>

          <span className="text-right text-[8px] uppercase tracking-[0.18em] text-white/25 sm:text-[9px] sm:tracking-[0.22em]">
            Lagos · Nigeria
          </span>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/25 sm:text-[10px] sm:tracking-[0.24em]">
              have something in mind?
            </p>

            <Link
              to="/contact"
              className="group mt-3 inline-flex max-w-full items-center gap-2 text-xl font-medium tracking-[-0.055em] transition-colors hover:text-white/70 sm:gap-3 sm:text-2xl md:text-4xl"
            >
              <span>start a conversation</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.2}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-[20px]"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/jamesava-mk"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className={iconClass}
            >
              <FaGithub size={17} />
            </a>

            <a
              href="https://www.linkedin.com/in/mkegh-avalumun-77aa9b384"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className={iconClass}
            >
              <FaLinkedinIn size={16} />
            </a>

            <Link
              to="/work"
              aria-label="Work"
              title="Work"
              className={iconClass}
            >
              <BriefcaseBusiness
                size={16}
                strokeWidth={1.3}
              />
            </Link>

            <Link
              to="/journey"
              aria-label="Journey"
              title="Journey"
              className={iconClass}
            >
              <Compass
                size={16}
                strokeWidth={1.3}
              />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 pt-5 sm:mt-10">
          <div className="flex min-w-0 items-center gap-3">
            <GitBranch
              size={12}
              strokeWidth={1.2}
              className="shrink-0 text-white/20"
            />

            <span className="truncate text-[8px] uppercase tracking-[0.15em] text-white/20 sm:text-[9px] sm:tracking-[0.18em]">
              built by James
            </span>
          </div>

          <span className="shrink-0 text-[8px] uppercase tracking-[0.15em] text-white/20 sm:text-[9px] sm:tracking-[0.18em]">
            © {new Date().getFullYear()} James
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------
   HOME
--------------------------------------------------------- */

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#08090a] text-white">
      <BackgroundGrid />

      <div className="relative z-10">
        {/* HERO */}

        <section className="relative flex min-h-[100svh] items-center overflow-hidden sm:min-h-screen">
          <HeroPortrait />
          <HeroTypewriter />

          <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between px-5 pb-6 pt-20 sm:px-6 sm:pb-7 sm:pt-24 md:min-h-screen md:px-10 md:pt-28">
            <div className="flex items-start justify-between gap-5">
              <Link
                to="/"
                className="shrink-0 text-sm font-medium tracking-[-0.035em] text-white/85"
              >
                &lt;JAMES /&gt;
              </Link>

              <div className="max-w-[42%] text-right text-[8px] uppercase leading-4 tracking-[0.16em] text-white/35 sm:max-w-none sm:text-[10px] sm:tracking-[0.2em]">
                Lagos · Nigeria
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.25,
              }}
              className="mt-auto pb-12 pt-28 sm:pb-16 sm:pt-32"
            >
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/45 sm:text-[10px] sm:tracking-[0.28em]">
                Computer Science · Product Builder
              </p>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent to-[#08090a] sm:h-40" />
        </section>

        {/* SELECTED WORK */}

        <SelectedWork />

        {/* JOURNEY */}

        <JourneyBridge />

        {/* GITHUB */}

        <GithubActivity />

        {/* FOOTER */}

        <Footer />
      </div>
    </main>
  );
}