import { useLayoutEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjects } from '../lib/portfolioStore';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1800&q=85';

const FEATURED_COUNT = 3;

const HANG_POSITIONS_DESKTOP = [-30, 0, 30];
const HANG_POSITIONS_MOBILE = [-25, 0, 25];

const WIND = [
  {
    x: 1.8,
    rotation: -0.65,
    duration: 5.2,
    delay: 0,
  },
  {
    x: -1.2,
    rotation: 0.55,
    duration: 5.8,
    delay: 0.4,
  },
  {
    x: 1.4,
    rotation: -0.5,
    duration: 5.4,
    delay: 0.8,
  },
];

function GithubMark({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.43-2.69 5.4-5.25 5.68.41.35.77 1.04.77 2.1v3.1c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LiveMark({ small = false }) {
  return (
    <span
      className={`rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.45)] ${
        small ? 'h-[6px] w-[6px]' : 'h-[7px] w-[7px]'
      }`}
      aria-hidden="true"
    />
  );
}

function ProjectImage({
  project,
  className = '',
}) {
  return (
    <img
      src={
        project.heroImage ||
        project.gallery?.[0] ||
        FALLBACK_IMAGE
      }
      alt={`${project.title} project preview`}
      className={`h-full w-full object-cover ${className}`}
      draggable="false"
      decoding="async"
    />
  );
}

function WallPin() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[-19px] z-30 h-[56px] w-[56px] -translate-x-1/2"
      aria-hidden="true"
    >
      {/* Wall indentation */}
      <div className="absolute left-1/2 top-[15px] h-[24px] w-[24px] -translate-x-1/2 rounded-full bg-black/60 blur-[7px]" />

      {/* Hairline cracks */}
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 h-full w-full opacity-65"
      >
        <path
          d="M32 29 L25 20 L19 18 M32 29 L37 20 L44 16 M32 29 L31 18 L27 11 M32 30 L39 33 L48 31 M31 30 L23 34 L15 32"
          fill="none"
          stroke="rgba(255,255,255,0.17)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        <path
          d="M25 20 L23 14 M37 20 L39 13 M39 33 L43 39 M23 34 L20 40"
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </svg>

      {/* Nail shaft */}
      <div className="absolute left-1/2 top-[11px] h-[19px] w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/65 via-white/25 to-black/80 shadow-[0_3px_5px_rgba(0,0,0,0.8)]" />

      {/* Nail head */}
      <div className="absolute left-1/2 top-[8px] h-[10px] w-[18px] -translate-x-1/2 rounded-full border border-white/35 bg-gradient-to-b from-white/55 via-white/20 to-black/80 shadow-[0_2px_7px_rgba(0,0,0,0.85)]" />

      {/* Tiny highlight */}
      <div className="absolute left-[20px] top-[10px] h-[2px] w-[5px] rounded-full bg-white/50 blur-[0.5px]" />
    </div>
  );
}

function HangingProject({
  project,
  index,
  cardRef,
}) {
  const description =
    project.shortDescription ||
    project.description ||
    project.why ||
    project.problem ||
    'A digital product built to solve a real problem.';

  return (
    <article
      ref={cardRef}
      className="work-hanging absolute left-1/2 top-0 w-[clamp(220px,23vw,315px)] will-change-transform"
      data-index={index}
    >
      <WallPin />

      <div className="relative mt-[62px]">
        {/* Contact shadow */}
        <div className="absolute -inset-x-3 -bottom-4 top-2 rounded-[22px] bg-black/70 blur-[18px]" />

        <div className="relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#0b0b0b] shadow-[0_25px_70px_rgba(0,0,0,0.58)]">
          <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                0{index + 1} / 03
              </span>

              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
                <LiveMark small />
                LIVE
              </span>
            </div>

            <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
              {project.category || 'WEB / BUILD'}
            </p>

            <h3 className="max-w-[270px] text-[clamp(30px,3.4vw,48px)] font-black uppercase leading-[0.78] tracking-[-0.07em] text-white">
              {project.shortTitle || project.title}
            </h3>

            <p className="max-w-[270px] text-[10px] leading-[1.55] text-white/42">
              {description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/25">
                {project.year || '2026'}
              </span>

              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/28">
                SCROLL TO OPEN
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectPanel({
  project,
  index,
  panelRef,
}) {
  const description =
    project.description ||
    project.shortDescription ||
    project.why ||
    project.problem ||
    'A digital product built to solve a real problem.';

  const details = [
    project.problem
      ? ['Problem', project.problem]
      : null,
    project.changed
      ? ['Built', project.changed]
      : null,
    project.learned
      ? ['Takeaway', project.learned]
      : null,
    project.why
      ? ['Why', project.why]
      : null,
  ]
    .filter(Boolean)
    .slice(0, 3);

  return (
    <article
      ref={panelRef}
      className="work-panel pointer-events-none absolute left-1/2 top-1/2 w-[min(1080px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] border border-white/[0.11] bg-[#090909] opacity-0 shadow-[0_45px_140px_rgba(0,0,0,0.78)] will-change-transform sm:w-[min(1080px,calc(100vw-40px))]"
    >
      <div className="grid h-[min(76vh,650px)] grid-rows-[39%_61%] md:grid-cols-[0.92fr_1.08fr] md:grid-rows-none">
        {/* Project image */}
        <div className="relative min-h-0 overflow-hidden bg-[#050505]">
          <ProjectImage
            project={project}
            className="brightness-[0.54] saturate-[0.62] grayscale-[0.08]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/15 to-black/20 md:bg-gradient-to-r md:from-transparent md:via-black/0 md:to-[#090909]" />

          <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
            <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
              0{index + 1} / 03
            </span>

            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
              <LiveMark small />
              LIVE
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.17em] text-white/40">
              {project.category || 'WEB / BUILD'}
            </p>

            <h2 className="max-w-[550px] text-[clamp(38px,6vw,76px)] font-black uppercase leading-[0.78] tracking-[-0.08em] text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Information */}
        <div className="flex min-h-0 flex-col justify-between bg-[#090909] p-5 sm:p-7 md:p-8 lg:p-10">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/30">
                Selected work / {String(index + 1).padStart(2, '0')}
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                {project.year || '2026'}
              </span>
            </div>

            <p className="mt-5 max-w-[620px] text-[clamp(17px,2vw,25px)] font-semibold leading-[1.08] tracking-[-0.04em] text-white/88">
              {description}
            </p>

            {details.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-0"
                  >
                    <p className="mb-1.5 font-mono text-[7px] uppercase tracking-[0.16em] text-white/28">
                      {label}
                    </p>

                    <p className="line-clamp-4 text-[9px] leading-[1.5] text-white/43 sm:text-[10px]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {project.stack?.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 font-mono text-[7px] uppercase tracking-[0.16em] text-white/28">
                  Built with
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="font-mono text-[8px] uppercase tracking-[0.04em] text-white/45"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.08] pt-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-white/48 transition-colors hover:text-white"
                >
                  <GithubMark size={12} />
                  <span>Code</span>
                  <ArrowUpRight
                    size={10}
                    className="opacity-30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-white/48 transition-colors hover:text-white"
                >
                  <LiveMark />
                  <span>Live</span>
                  <ExternalLink
                    size={10}
                    className="opacity-30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MoreWork({ projects }) {
  if (!projects.length) {
    return null;
  }

  return (
    <section className="relative bg-black px-5 pb-28 pt-24 sm:px-8 sm:pb-32 lg:px-12">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-10 flex items-end justify-between border-b border-white/[0.08] pb-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
              The rest
            </p>

            <h2 className="mt-2 text-[clamp(38px,6vw,72px)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
              More work.
            </h2>
          </div>

          <p className="hidden max-w-[250px] text-right text-[10px] leading-[1.5] text-white/30 sm:block">
            Not everything needs the stage.
            These are the other things I
            shipped.
          </p>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {projects.map((project, index) => (
            <Link
              key={
                project.id ||
                project.slug ||
                index
              }
              to={`/work/${project.slug}`}
              className="group relative flex min-h-[86px] items-center gap-4 overflow-hidden rounded-[14px] px-2 py-5 transition-colors duration-300 hover:bg-white/[0.025] sm:min-h-[104px] sm:gap-6 sm:px-4"
            >
              <span className="w-8 shrink-0 font-mono text-[8px] tracking-[0.12em] text-white/20">
                {String(index + 4).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="truncate text-[clamp(22px,3vw,38px)] font-black uppercase leading-none tracking-[-0.055em] text-white transition-transform duration-500 group-hover:translate-x-1">
                    {project.shortTitle ||
                      project.title}
                  </h3>

                  <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.14em] text-white/30">
                    <LiveMark small />
                    LIVE
                  </span>
                </div>

                <p className="mt-2 max-w-[500px] truncate text-[9px] text-white/30">
                  {project.shortDescription ||
                    project.description ||
                    project.category ||
                    'Digital product'}
                </p>
              </div>

              <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-white/22 sm:block">
                {project.year || '2026'}
              </span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />

              {/* restrained hover image */}
              <div className="pointer-events-none absolute right-16 top-1/2 hidden h-[76px] w-[126px] -translate-y-1/2 overflow-hidden rounded-[12px] border border-white/[0.08] bg-black opacity-0 shadow-2xl transition-all duration-500 group-hover:right-20 group-hover:opacity-100 lg:block">
                <ProjectImage
                  project={project}
                  className="brightness-[0.5] saturate-[0.6] grayscale-[0.1]"
                />

                <div className="absolute inset-0 bg-black/25" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  const gameRef = useRef(null);
  const viewportRef = useRef(null);

  const hangingRefs = useRef([]);
  const panelRefs = useRef([]);

  const allProjects = useMemo(
    () => getProjects(),
    [],
  );

  const projects = useMemo(
    () =>
      allProjects.slice(
        0,
        FEATURED_COUNT,
      ),
    [allProjects],
  );

  const moreProjects = useMemo(
    () =>
      allProjects.slice(
        FEATURED_COUNT,
      ),
    [allProjects],
  );

  useLayoutEffect(() => {
    if (
      !gameRef.current ||
      !viewportRef.current ||
      !projects.length
    ) {
      return undefined;
    }

    const game = gameRef.current;
    const viewport = viewportRef.current;

    const context = gsap.context(() => {
      const hanging =
        hangingRefs.current.filter(Boolean);

      const panels =
        panelRefs.current.filter(Boolean);

      if (
        hanging.length !== projects.length ||
        panels.length !== projects.length
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduceMotion) {
        gsap.set(hanging, {
          clearProps: 'all',
        });

        gsap.set(panels, {
          clearProps: 'all',
          opacity: 1,
          pointerEvents: 'auto',
        });

        return;
      }

      const isMobile =
        window.innerWidth < 769;

      const positions = isMobile
        ? HANG_POSITIONS_MOBILE
        : HANG_POSITIONS_DESKTOP;

      const stackStep =
        window.innerHeight *
        (isMobile ? 0.82 : 0.72);

      const gameScroll =
        projects.length *
        (isMobile ? 135 : 122);

      game.style.minHeight = `${gameScroll}vh`;

      gsap.set(hanging, {
        force3D: true,
        transformOrigin: '50% 0%',
        willChange: 'transform, opacity',
        xPercent: -50,
        scale: 1,
        opacity: 1,
      });

      gsap.set(panels, {
        force3D: true,
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
        opacity: 0,
        pointerEvents: 'none',
        scale: 0.93,
        y: 0,
        rotation: 0,
        zIndex: 1,
      });

      hanging.forEach(
        (card, index) => {
          const position =
            positions[index];

          gsap.set(card, {
            left: `calc(50% + ${position}vw)`,
            top: 0,
            rotation:
              index === 0
                ? -1.15
                : index === 1
                  ? 0.75
                  : -0.9,
          });
        },
      );

      const windTweens =
        hanging.map(
          (card, index) => {
            const wind =
              WIND[index] || WIND[0];

            return gsap.to(card, {
              x: wind.x,
              rotation:
                (index === 0
                  ? -1.15
                  : index === 1
                    ? 0.75
                    : -0.9) +
                wind.rotation,
              duration: wind.duration,
              delay: wind.delay,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              paused: true,
              overwrite: false,
              force3D: true,
            });
          },
        );

      const timeline =
        gsap.timeline({
          defaults: {
            overwrite: false,
          },

          scrollTrigger: {
            trigger: game,
            start: 'top top',
            end: `+=${gameScroll}vh`,
            pin: viewport,
            pinSpacing: false,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,

            onEnter: () => {
              windTweens.forEach(
                (tween) => tween.play(),
              );
            },

            onEnterBack: () => {
              windTweens.forEach(
                (tween) => tween.play(),
              );
            },

            onLeave: () => {
              windTweens.forEach(
                (tween) => tween.pause(),
              );
            },

            onLeaveBack: () => {
              windTweens.forEach(
                (tween) => tween.pause(),
              );
            },
          },
        });

      const title =
        viewport.querySelector(
          '.work-game-title',
        );

      const hint =
        viewport.querySelector(
          '.work-game-hint',
        );

      const counter =
        viewport.querySelector(
          '.work-game-counter',
        );

      const wall =
        viewport.querySelector(
          '.work-wall',
        );

      timeline.to(
        title,
        {
          y: -18,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        0,
      );

      timeline.to(
        hint,
        {
          y: 12,
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        },
        0,
      );

      timeline.to(
        counter,
        {
          opacity: 0,
          duration: 0.15,
        },
        0,
      );

      projects.forEach(
        (project, index) => {
          const card =
            hanging[index];

          const panel =
            panels[index];

          const phase = 1.25;

          const start =
            index * phase + 0.14;

          const previousPanels =
            panels.slice(0, index);

          const remainingHanging =
            hanging.slice(index + 1);

          const xToCenter =
            -positions[index];

          /*
           * The important change:
           * the project does not "fly" randomly.
           * It first pulls away from the wall,
           * then comes toward the viewer,
           * then becomes the complete frame.
           */
          timeline.to(
            card,
            {
              y: 4,
              scale: 1.015,
              rotation:
                index % 2 === 0
                  ? -2.2
                  : 1.9,
              duration: 0.08,
              ease: 'power2.in',
            },
            start,
          );

          timeline.to(
            card,
            {
              x: isMobile
                ? xToCenter * 0.3
                : xToCenter * 0.38,
              y: isMobile
                ? '13vh'
                : '17vh',
              rotation:
                index % 2 === 0
                  ? 3
                  : -3,
              scale: isMobile
                ? 1.08
                : 1.14,
              duration: 0.15,
              ease: 'power2.in',
            },
            start + 0.08,
          );

          timeline.to(
            card,
            {
              x: xToCenter,
              y: isMobile
                ? '36vh'
                : '46vh',
              rotation:
                index % 2 === 0
                  ? -1.8
                  : 1.8,
              scale: isMobile
                ? 1.16
                : 1.3,
              duration: 0.27,
              ease: 'power3.in',
            },
            start + 0.23,
          );

          timeline.to(
            panel,
            {
              opacity: 1,
              pointerEvents: 'auto',
              scale: 1,
              y: 0,
              rotation: 0,
              zIndex: 20 + index,
              duration: 0.24,
              ease: 'power3.out',
            },
            start + 0.48,
          );

          timeline.to(
            card,
            {
              opacity: 0,
              scale: isMobile
                ? 1.22
                : 1.34,
              duration: 0.1,
              ease: 'power2.in',
            },
            start + 0.5,
          );

          if (
            previousPanels.length
          ) {
            previousPanels.forEach(
              (
                previousPanel,
                previousIndex,
              ) => {
                const target =
                  (index -
                    previousIndex) *
                  stackStep;

                timeline.to(
                  previousPanel,
                  {
                    y: target + 8,
                    scale: Math.max(
                      0.88,
                      1 -
                        (index -
                          previousIndex) *
                          0.035,
                    ),
                    opacity: Math.max(
                      0.72,
                      1 -
                        (index -
                          previousIndex) *
                          0.05,
                    ),
                    duration: 0.08,
                    ease: 'power2.in',
                  },
                  start + 0.54,
                );

                timeline.to(
                  previousPanel,
                  {
                    y: target,
                    duration: 0.1,
                    ease: 'power3.out',
                  },
                  start + 0.62,
                );
              },
            );
          }

          if (
            remainingHanging.length
          ) {
            timeline.to(
              remainingHanging,
              {
                y:
                  index % 2 === 0
                    ? -3
                    : 3,
                rotation:
                  index % 2 === 0
                    ? -1.2
                    : 1.2,
                duration: 0.08,
                stagger: 0.015,
                ease: 'power2.out',
              },
              start + 0.54,
            );

            timeline.to(
              remainingHanging,
              {
                y: 0,
                rotation: 0,
                duration: 0.12,
                stagger: 0.015,
                ease: 'power2.inOut',
              },
              start + 0.62,
            );
          }

          timeline.to(
            panel,
            {
              y: 0,
              duration: 0.4,
              ease: 'none',
            },
            start + 0.72,
          );
        },
      );

      const finalTime =
        projects.length *
          1.25 +
        0.14;

      panels.forEach(
        (panel, index) => {
          const finalY =
            (projects.length -
              1 -
              index) *
            stackStep;

          timeline.to(
            panel,
            {
              y: finalY,
              scale: 1,
              opacity: 1,
              zIndex: 30 + index,
              duration: 0.18,
              ease: 'power3.out',
            },
            finalTime,
          );
        },
      );

      timeline.to(
        wall,
        {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in',
        },
        finalTime,
      );

      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        windTweens.forEach(
          (tween) => tween.kill(),
        );
      };
    }, game);

    return () => {
      context.revert();
    };
  }, [projects]);

  if (!projects.length) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Work
        </p>

        <h1 className="mt-4 text-6xl font-black uppercase tracking-[-0.07em]">
          Nothing here yet.
        </h1>
      </main>
    );
  }

  return (
    <main className="overflow-x-clip bg-black text-white">
      {/* Intro */}
      <section className="relative flex min-h-[72vh] flex-col justify-between overflow-hidden bg-black px-5 pb-8 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1450px]">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
            Selected work / 2024—2026
          </p>

          <h1 className="mt-4 max-w-[1100px] text-[clamp(70px,13vw,180px)] font-black uppercase leading-[0.7] tracking-[-0.1em]">
            THE
            <br />
            WORK.
          </h1>
        </div>

        <div className="mx-auto flex w-full max-w-[1450px] items-end justify-between pt-4">
          <p className="max-w-[340px] text-sm font-medium leading-relaxed text-white/40">
            Three things I built,
            shipped and kept useful.
          </p>

          <ArrowDown
            size={17}
            strokeWidth={1.5}
            className="animate-bounce text-white/50"
          />
        </div>
      </section>

      {/* Pinned wall interaction */}
      <section
        ref={gameRef}
        className="relative overflow-visible bg-black"
      >
        <div
          ref={viewportRef}
          className="relative h-screen w-full overflow-visible bg-black"
        >
          {/* Studio wall */}
          <div
            className="work-wall pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#070707]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 45%, rgba(255,255,255,0.035), transparent 52%),
                radial-gradient(circle at 20% 25%, rgba(255,255,255,0.018), transparent 30%),
                radial-gradient(circle at 80% 75%, rgba(255,255,255,0.015), transparent 34%),
                linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
              `,
              backgroundSize:
                '100% 100%, 100% 100%, 100% 100%, 48px 48px, 48px 48px',
            }}
          >
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.12)_0.6px,transparent_0.6px)] [background-size:5px_5px]" />

            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-[100]">
            <div className="work-game-title absolute left-5 top-5 sm:left-8 sm:top-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                Work / pinned
              </p>
            </div>

            <div className="work-game-counter absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30 sm:right-8 sm:top-8">
              SELECTED / 03
            </div>
          </div>

          {/* Featured works */}
          {projects.map(
            (project, index) => (
              <HangingProject
                key={
                  project.id ||
                  project.slug ||
                  index
                }
                project={project}
                index={index}
                cardRef={(element) => {
                  hangingRefs.current[index] =
                    element;
                }}
              />
            ),
          )}

          {/* Expanded project frames */}
          {projects.map(
            (project, index) => (
              <ProjectPanel
                key={
                  project.id ||
                  project.slug ||
                  index
                }
                project={project}
                index={index}
                panelRef={(element) => {
                  panelRefs.current[index] =
                    element;
                }}
              />
            ),
          )}

          <div className="work-game-hint pointer-events-none absolute bottom-6 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
            Scroll to pull one from the wall
          </div>
        </div>
      </section>

      {/* Remaining work */}
      <MoreWork projects={moreProjects} />
    </main>
  );
}