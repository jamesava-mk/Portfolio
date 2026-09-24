import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Code2,
  MousePointer2,
  Sparkles,
  Wrench,
} from 'lucide-react';
import gsap from 'gsap';
import JourneyGlobe from '../components/journey/JourneyGlobe';

const CHAPTERS = [
  {
    year: '2024',
    eyebrow: 'THE START',
    label: 'NUTM',
    title: 'I came to NUTM knowing I liked maths.',
    story:
      'Computer Science gave that curiosity somewhere to go. I started with questions, then code, then the slightly addictive feeling of making something work and knowing why it worked.',
    location: 'LAGOS',
    coordinates: '06°27′N · 03°23′E',
    evidence: [
      'Mathematics → Computer Science',
      'First programs → first real debugging',
      'Curiosity → making things',
    ],
    moments: [
      {
        label: 'THE QUESTION',
        text: 'I wanted to understand what was actually happening behind the screen, not just learn what to type.',
        icon: MousePointer2,
      },
      {
        label: 'THE FIRST CODE',
        text: 'The early code was messy. Understanding why it broke became more interesting than getting it right immediately.',
        icon: Code2,
      },
      {
        label: 'THE HOOK',
        text: 'The turning point was simple: I could have an idea, write something, and watch the computer respond.',
        icon: Sparkles,
      },
    ],
  },
  {
    year: '2025',
    eyebrow: 'GETTING MY HANDS DIRTY',
    label: 'BUILDING',
    title: 'Learning started making more sense once I had things to break.',
    story:
      'I moved from following examples to building my own. That meant bugs, rewrites, confusing errors and plenty of moments where the clean solution was nowhere in sight.',
    location: 'BUILDING',
    coordinates: '06°31′N · 03°22′E',
    evidence: [
      'HTML · CSS · JavaScript',
      'React · Python · Java',
      'Build → break → debug → rebuild',
    ],
    moments: [
      {
        label: 'BREAK IT',
        text: 'A feature that looked like twenty minutes could turn into an entire evening once the real problem showed up.',
        icon: Wrench,
      },
      {
        label: 'FIX IT',
        text: 'Errors stopped feeling like a signal to give up. They became clues: read them, isolate the problem, try again.',
        icon: Code2,
      },
      {
        label: 'BUILD AGAIN',
        text: 'Each project left behind something useful — a better instinct, a new tool, or a mistake I knew not to repeat.',
        icon: Circle,
      },
    ],
  },
  {
    year: '2025',
    eyebrow: 'MAKING THINGS REAL',
    label: 'BEUNIQUE + LALA',
    title: 'Then I started caring about what happened after the code worked.',
    story:
      'BeUnique made me think about experience. Lala made me think about problems. Together they pushed me toward building things for people, not just things that happened to run.',
    location: 'PRODUCTS',
    coordinates: '06°27′N · 03°24′E',
    evidence: [
      'BeUnique Wears → commerce + experience',
      'Lala → tools + real problems',
      'Interface → usefulness → iteration',
    ],
    moments: [
      {
        label: 'BEUNIQUE',
        text: 'A store needs more than products and buttons. I started thinking about how someone moves through it, what they notice, and what gets in their way.',
        icon: Sparkles,
      },
      {
        label: 'LALA',
        text: 'I became more interested in finding a useful problem first, then figuring out the smallest thing worth building around it.',
        icon: MousePointer2,
      },
      {
        label: 'THE SHIFT',
        text: 'The code still mattered. It just stopped being the whole point. The person on the other side mattered too.',
        icon: Wrench,
      },
    ],
  },
  {
    year: '2026',
    eyebrow: 'STILL BUILDING',
    label: 'WHERE I AM',
    title: 'Now I care more about what I can make useful.',
    story:
      'That means learning across the stack when the problem demands it — interfaces, APIs, backend systems, AI and automation. I am still figuring things out, but I am much clearer about why I build.',
    location: 'LAGOS',
    coordinates: '06°27′N · 03°23′E',
    evidence: [
      'Frontend → interfaces people can use',
      'Backend → systems behind them',
      'AI + automation → less repetitive work',
    ],
    moments: [
      {
        label: 'REACT',
        text: 'I like taking an idea from something in my head to something I can actually click, test, improve and ship.',
        icon: Code2,
      },
      {
        label: 'AI',
        text: 'AI became another tool in the box — useful when it makes the work faster or opens a better way to solve the problem.',
        icon: Sparkles,
      },
      {
        label: 'USEFUL',
        text: 'The question has become simpler: who is this for, what does it solve, and is there a reason for it to exist?',
        icon: Circle,
      },
    ],
  },
];

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export default function Journey() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeMoment, setActiveMoment] = useState(0);
  const [globeHovered, setGlobeHovered] = useState(false);
  const [globeBusy, setGlobeBusy] = useState(false);

  const globeZoneRef = useRef(null);
  const globeVisualRef = useRef(null);
  const storyRef = useRef(null);
  const yearRef = useRef(null);
  const labelRef = useRef(null);
  const momentsRef = useRef(null);
  const progressRef = useRef(null);

  const wheelBufferRef = useRef(0);
  const wheelResetRef = useRef(null);

  const chapterRef = useRef(0);
  const transitionRef = useRef(false);
  const rotationRef = useRef(0);

  const chapter = CHAPTERS[activeChapter];

  const globeItems = useMemo(
    () =>
      CHAPTERS.map((item) => ({
        period: item.year,
        label: item.label,
      })),
    [],
  );

  useEffect(() => {
    const visual = globeVisualRef.current;

    if (!visual) return undefined;

    const globe = visual.querySelector(
      '.journey-globe-rotation',
    );
    const orbit = visual.querySelector(
      '.journey-transition-orbit',
    );
    const markers = gsap.utils.toArray(
      visual.querySelectorAll('.journey-location-marker'),
    );
    const routes = gsap.utils.toArray(
      visual.querySelectorAll('.journey-route-segment'),
    );

    if (!globe) return undefined;

    gsap.set(globe, {
      rotation: 0,
      transformOrigin: '50% 50%',
      transformPerspective: 900,
    });

    gsap.set(markers, {
      opacity: 0.15,
      scale: 0.82,
      transformOrigin: 'center center',
    });

    if (markers[0]) {
      gsap.set(markers[0], {
        opacity: 1,
        scale: 1,
      });
    }

    gsap.set(routes, {
      opacity: 0,
      strokeDashoffset: 500,
    });

    if (progressRef.current) {
      gsap.set(progressRef.current, {
        width: `${(1 / CHAPTERS.length) * 100}%`,
      });
    }

    return undefined;
  }, []);

  useEffect(() => {
    const visual = globeVisualRef.current;

    if (!visual) return undefined;

    const globe = visual.querySelector(
      '.journey-globe-rotation',
    );
    const orbit = visual.querySelector(
      '.journey-transition-orbit',
    );

    if (!globe) return undefined;

    if (globeHovered) {
      gsap.to(visual, {
        scale: 1.025,
        duration: 0.42,
        ease: 'power3.out',
      });

      gsap.to(globe, {
        filter:
          'drop-shadow(0 0 18px rgba(255,255,255,0.08))',
        duration: 0.35,
        ease: 'power2.out',
      });

      if (orbit) {
        gsap.to(orbit, {
          scale: 1.02,
          borderColor: 'rgba(255,255,255,0.08)',
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    } else {
      gsap.to(visual, {
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      });

      gsap.to(globe, {
        filter: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });

      if (orbit) {
        gsap.to(orbit, {
          scale: 1,
          borderColor: 'rgba(255,255,255,0.035)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }

    return undefined;
  }, [globeHovered]);

  const changeChapter = (nextIndex) => {
    if (transitionRef.current) return;

    const current = chapterRef.current;
    const next = clamp(
      nextIndex,
      0,
      CHAPTERS.length - 1,
    );

    if (next === current) return;

    const direction = next > current ? 1 : -1;
    const visual = globeVisualRef.current;

    if (!visual) return;

    const globe = visual.querySelector(
      '.journey-globe-rotation',
    );
    const orbit = visual.querySelector(
      '.journey-transition-orbit',
    );
    const markers = gsap.utils.toArray(
      visual.querySelectorAll('.journey-location-marker'),
    );
    const routes = gsap.utils.toArray(
      visual.querySelectorAll('.journey-route-segment'),
    );
    const signal = visual.querySelector(
      '.journey-moving-signal',
    );
    const signalGlow = visual.querySelector(
      '.journey-moving-signal-glow',
    );

    if (!globe) return;

    transitionRef.current = true;
    setGlobeBusy(true);

    chapterRef.current = next;
    setActiveMoment(0);
    setActiveChapter(next);

    gsap.killTweensOf([
      globe,
      orbit,
      markers,
      routes,
      signal,
      signalGlow,
      storyRef.current,
      yearRef.current,
      labelRef.current,
      progressRef.current,
    ]);

    const targetRotation =
      rotationRef.current + direction * 68;

    const timeline = gsap.timeline({
      defaults: {
        overwrite: 'auto',
      },
      onComplete: () => {
        rotationRef.current = targetRotation;
        transitionRef.current = false;
        setGlobeBusy(false);
      },
    });

    timeline
      .to(
        storyRef.current,
        {
          opacity: 0,
          y: direction > 0 ? -12 : 12,
          duration: 0.16,
          ease: 'power2.in',
        },
        0,
      )
      .to(
        [yearRef.current, labelRef.current],
        {
          opacity: 0,
          y: direction > 0 ? -7 : 7,
          duration: 0.14,
          ease: 'power2.in',
        },
        0,
      )
      .to(
        globe,
        {
          rotation: targetRotation,
          duration: 0.78,
          ease: 'power3.inOut',
          onUpdate: () => {
            rotationRef.current = Number(
              gsap.getProperty(globe, 'rotation'),
            );
          },
        },
        0,
      )
      .to(
        orbit,
        {
          rotation: `+=${direction * 82}`,
          scale: globeHovered ? 1.035 : 1.02,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0,
      )
      .to(
        orbit,
        {
          scale: globeHovered ? 1.02 : 1,
          duration: 0.28,
          ease: 'power2.out',
        },
        0.5,
      )
      .to(
        markers,
        {
          opacity: 0.15,
          scale: 0.82,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.05,
      )
      .to(
        markers[next],
        {
          opacity: 1,
          scale: 1,
          duration: 0.36,
          ease: 'back.out(1.5)',
        },
        0.43,
      );

    routes.forEach((route, index) => {
      const relevant =
        index === next - 1 || index === next;

      timeline.to(
        route,
        {
          opacity: relevant ? 1 : 0,
          strokeDashoffset: relevant ? 0 : 500,
          duration: relevant ? 0.42 : 0.18,
          ease: 'power2.out',
        },
        relevant ? 0.32 : 0.05,
      );
    });

    if (signal && signalGlow) {
      timeline.to(
        [signal, signalGlow],
        {
          x: direction * 34,
          y: next % 2 === 0 ? -8 : 8,
          duration: 0.46,
          ease: 'power2.inOut',
        },
        0.24,
      );
    }

    timeline
      .to(
        yearRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          ease: 'power2.out',
        },
        0.5,
      )
      .to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: 'power2.out',
        },
        0.52,
      )
      .to(
        storyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          ease: 'power3.out',
        },
        0.51,
      );

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((next + 1) / CHAPTERS.length) * 100}%`,
        duration: 0.62,
        ease: 'power3.out',
      });
    }
  };

  useEffect(() => {
    const zone = globeZoneRef.current;

    if (!zone) return undefined;

    const handleWheel = (event) => {
      if (!globeHovered) return;

      event.preventDefault();
      event.stopPropagation();

      if (transitionRef.current) return;

      wheelBufferRef.current += event.deltaY;

      window.clearTimeout(wheelResetRef.current);

      wheelResetRef.current = window.setTimeout(() => {
        wheelBufferRef.current = 0;
      }, 180);

      const threshold = 65;

      if (Math.abs(wheelBufferRef.current) < threshold) {
        return;
      }

      const direction =
        wheelBufferRef.current > 0 ? 1 : -1;

      wheelBufferRef.current = 0;

      const next = chapterRef.current + direction;

      if (
        next < 0 ||
        next >= CHAPTERS.length
      ) {
        return;
      }

      changeChapter(next);
    };

    zone.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      zone.removeEventListener('wheel', handleWheel);
      window.clearTimeout(wheelResetRef.current);
    };
  }, [globeHovered]);

  const goPrevious = () => {
    changeChapter(chapterRef.current - 1);
  };

  const goNext = () => {
    changeChapter(chapterRef.current + 1);
  };

  const selectMoment = (index) => {
    if (index === activeMoment) return;

    setActiveMoment(index);

    const card = momentsRef.current?.querySelector(
      `[data-moment="${index}"]`,
    );

    if (card) {
      gsap.fromTo(
        card,
        {
          opacity: 0.35,
          y: 7,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
      );
    }
  };

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#08090a] text-white"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.025),transparent_31%),radial-gradient(circle_at_8%_70%,rgba(255,255,255,0.018),transparent_28%)]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(circle at center, black, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black, transparent 72%)',
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Header */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1500px] items-start justify-between gap-4 px-4 pt-6 sm:gap-6 sm:px-6 sm:pt-7 md:px-8 md:pt-9">
        <div className="min-w-0 max-w-[72%]">
          <div className="mb-2 flex items-center gap-2 text-[8px] uppercase tracking-[0.25em] text-white/30 sm:text-[9px] sm:tracking-[0.28em]">
            <span className="h-px w-4 shrink-0 bg-white/20 sm:w-5" />
            My journey
          </div>

          <p className="text-[10px] leading-relaxed text-white/40 sm:text-[11px]">
            Not really a résumé.
            <br />
            More like how I got here.
          </p>
        </div>

        <div className="flex max-w-[35%] shrink-0 items-center justify-end gap-2 pt-0.5 text-right text-[7px] uppercase leading-4 tracking-[0.16em] text-white/20 sm:max-w-none sm:text-[8px] sm:tracking-[0.25em]">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
              globeHovered
                ? 'animate-pulse bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.35)]'
                : 'bg-white/20'
            }`}
          />

          <span className="hidden sm:inline">
            {globeHovered
              ? globeBusy
                ? 'travelling'
                : 'globe active'
              : '2024 — 2026'}
          </span>
        </div>
      </div>

      {/* Main journey */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 pb-8 pt-5 sm:gap-12 sm:px-6 sm:pb-10 sm:pt-7 md:gap-14 md:px-8 md:pb-12 md:pt-8 lg:grid lg:min-h-[720px] lg:grid-cols-[0.8fr_1.2fr_0.8fr] lg:items-center lg:gap-6 lg:pb-10 lg:pt-0">
        {/* LEFT — Story */}
        <div className="order-2 flex items-center lg:order-1">
          <div
            ref={storyRef}
            className="mx-auto w-full max-w-[430px]"
          >
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] uppercase tracking-[0.2em] text-white/30 sm:mb-5 sm:text-[9px] sm:tracking-[0.25em]">
              <span>
                0{activeChapter + 1} / 0{CHAPTERS.length}
              </span>

              <span className="hidden h-px w-8 bg-white/10 sm:block" />

              <span>{chapter.eyebrow}</span>
            </div>

            <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-white/35 sm:mb-4 sm:text-[10px] sm:tracking-[0.25em]">
              {chapter.label}
            </p>

            <h2 className="max-w-[430px] text-[clamp(2rem,8vw,3.65rem)] font-light leading-[0.98] tracking-[-0.045em] text-white sm:leading-[0.99]">
              {chapter.title}
            </h2>

            <p className="mt-5 max-w-[400px] text-[12px] leading-[1.75] text-white/45 sm:mt-6 sm:text-[13px] sm:leading-6 md:text-sm">
              {chapter.story}
            </p>

            {/* Evidence — showing the progression instead of adding another paragraph */}
            <div className="mt-6 grid max-w-[410px] gap-1.5 sm:mt-7">
              {chapter.evidence.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 py-1.5"
                >
                  <span className="text-[7px] tabular-nums text-white/15">
                    0{index + 1}
                  </span>

                  <span className="h-px w-5 shrink-0 bg-white/10" />

                  <span className="text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[8px] uppercase tracking-[0.18em] text-white/25 sm:mt-7 sm:text-[9px] sm:tracking-[0.2em]">
              <span>{chapter.location}</span>
              <span className="h-px w-5 bg-white/10" />
              <span>{chapter.coordinates}</span>
            </div>

            <div className="mt-7 flex items-center gap-2 sm:mt-8">
              <button
                type="button"
                onClick={goPrevious}
                disabled={
                  activeChapter === 0 || globeBusy
                }
                aria-label="Previous journey chapter"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-white/35 transition hover:border-white/20 hover:bg-white/[0.035] hover:text-white disabled:pointer-events-none disabled:opacity-20"
              >
                <ChevronLeft size={14} />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={
                  activeChapter === CHAPTERS.length - 1 ||
                  globeBusy
                }
                aria-label="Next journey chapter"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-white/35 transition hover:border-white/20 hover:bg-white/[0.035] hover:text-white disabled:pointer-events-none disabled:opacity-20"
              >
                <ChevronRight size={14} />
              </button>

              <span className="ml-1 text-[7px] uppercase tracking-[0.16em] text-white/20 sm:ml-2 sm:text-[8px] sm:tracking-[0.22em]">
                <span className="sm:hidden">use arrows</span>
                <span className="hidden sm:inline">
                  or spin the globe
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* CENTER — Globe */}
        <div
          ref={globeZoneRef}
          className="order-1 relative mx-auto flex h-[min(78vw,315px)] w-full max-w-[650px] items-center justify-center sm:h-[380px] md:h-[440px] lg:order-2 lg:h-[560px]"
        >
          <div
            ref={globeVisualRef}
            className="relative h-full w-full transform-gpu"
          >
            <JourneyGlobe
              items={globeItems}
              onHoverChange={setGlobeHovered}
            />

            {/* Centre year */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span
                ref={yearRef}
                className="text-[clamp(3rem,14vw,6.5rem)] font-extralight leading-none tracking-[-0.08em] text-white/[0.075] sm:text-[clamp(3.5rem,10vw,6.5rem)]"
              >
                {chapter.year}
              </span>

              <span
                ref={labelRef}
                className="mt-1 text-[7px] uppercase tracking-[0.3em] text-white/25 sm:text-[8px] sm:tracking-[0.38em]"
              >
                {chapter.location}
              </span>
            </div>

            {/* Instruction */}
            <div className="pointer-events-none absolute bottom-[3%] left-1/2 w-full -translate-x-1/2 px-3 text-center">
              <div
                className={`flex items-center justify-center gap-2 text-[7px] uppercase tracking-[0.2em] transition-all duration-500 sm:text-[8px] sm:tracking-[0.3em] ${
                  globeHovered
                    ? 'translate-y-0 text-white/50'
                    : 'translate-y-1 text-white/25'
                }`}
              >
                <MousePointer2
                  size={11}
                  strokeWidth={1.15}
                />

                <span className="sm:hidden">
                  Use the arrows
                </span>

                <span className="hidden sm:inline">
                  {globeHovered
                    ? 'Scroll to travel'
                    : 'Hover the globe'}
                </span>
              </div>

              <p
                className={`mt-2 text-[8px] transition-all duration-500 sm:text-[9px] ${
                  globeHovered
                    ? 'text-white/25'
                    : 'text-white/15'
                }`}
              >
                <span className="sm:hidden">
                  Choose a chapter to move through the journey
                </span>

                <span className="hidden sm:inline">
                  {globeHovered
                    ? 'The globe moves with you'
                    : 'Spin to see the journey'}
                </span>
              </p>
            </div>

            {/* Hover focus ring */}
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 sm:h-[77%] sm:w-[77%] ${
                globeHovered
                  ? 'scale-100 border-white/[0.07] opacity-100'
                  : 'scale-[0.96] border-white/[0.02] opacity-0'
              }`}
            />
          </div>
        </div>

        {/* RIGHT — Moments */}
        <div className="order-3 flex items-center pb-0 lg:pl-2 lg:pb-0">
          <div className="mx-auto w-full max-w-[390px]">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px] sm:tracking-[0.25em]">
                  Open the chapter
                </p>

                <p className="mt-1 text-[10px] text-white/40 sm:text-[11px]">
                  Things that changed how I build
                </p>
              </div>

              <span className="text-[8px] text-white/20 sm:text-[9px]">
                0{activeMoment + 1}
              </span>
            </div>

            <div
              ref={momentsRef}
              className="space-y-2"
            >
              {chapter.moments.map((moment, index) => {
                const Icon = moment.icon;
                const active = index === activeMoment;

                return (
                  <button
                    key={moment.label}
                    type="button"
                    data-moment={index}
                    onClick={() => selectMoment(index)}
                    className={`group w-full overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 sm:p-3.5 ${
                      active
                        ? 'border-white/[0.14] bg-white/[0.055]'
                        : 'border-white/[0.05] bg-white/[0.018] hover:border-white/[0.1] hover:bg-white/[0.035]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                          active
                            ? 'border-white/15 bg-white/[0.08] text-white/70'
                            : 'border-white/[0.06] text-white/25'
                        }`}
                      >
                        <Icon
                          size={12}
                          strokeWidth={1.4}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`text-[8px] uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em] ${
                              active
                                ? 'text-white/65'
                                : 'text-white/30'
                            }`}
                          >
                            {moment.label}
                          </span>

                          <ChevronRight
                            size={11}
                            className={`shrink-0 transition-all duration-300 ${
                              active
                                ? 'text-white/50'
                                : 'text-white/15 group-hover:translate-x-0.5'
                            }`}
                          />
                        </div>

                        <div
                          className={`grid transition-all duration-300 ${
                            active
                              ? 'mt-2 grid-rows-[1fr]'
                              : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="max-w-[300px] text-[10px] leading-[1.7] text-white/40 sm:text-[11px] sm:leading-5">
                              {moment.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <button
                type="button"
                disabled={activeMoment === 0}
                onClick={() =>
                  selectMoment(
                    Math.max(0, activeMoment - 1),
                  )
                }
                className="flex items-center gap-2 text-[7px] uppercase tracking-[0.18em] text-white/25 transition hover:text-white/60 disabled:opacity-20 sm:text-[8px] sm:tracking-[0.2em]"
              >
                <ChevronLeft size={11} />
                Back
              </button>

              <div className="flex gap-1">
                {chapter.moments.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Open moment ${index + 1}`}
                    onClick={() => selectMoment(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeMoment
                        ? 'w-5 bg-white/55'
                        : 'w-1 bg-white/15'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={
                  activeMoment ===
                  chapter.moments.length - 1
                }
                onClick={() =>
                  selectMoment(
                    Math.min(
                      chapter.moments.length - 1,
                      activeMoment + 1,
                    ),
                  )
                }
                className="flex items-center gap-2 text-[7px] uppercase tracking-[0.18em] text-white/25 transition hover:text-white/60 disabled:opacity-20 sm:text-[8px] sm:tracking-[0.2em]"
              >
                Next
                <ChevronRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-20 mx-auto flex w-full max-w-[900px] items-center justify-center px-4 pb-5 sm:px-6 md:px-8 md:pb-6">
        <div className="flex w-full max-w-[700px] items-center">
          {CHAPTERS.map((item, index) => {
            const active = index === activeChapter;
            const passed = index <= activeChapter;

            return (
              <div
                key={`${item.year}-${item.label}`}
                className="flex min-w-0 flex-1 items-center"
              >
                <button
                  type="button"
                  onClick={() => changeChapter(index)}
                  disabled={globeBusy}
                  className="group flex shrink-0 items-center gap-2 disabled:pointer-events-none"
                  aria-label={`Go to ${item.year} ${item.label}`}
                >
                  <span
                    className={`relative block h-2 w-2 rounded-full border transition-all duration-300 ${
                      active
                        ? 'border-white bg-white shadow-[0_0_14px_rgba(255,255,255,.4)]'
                        : passed
                          ? 'border-white/30 bg-white/20'
                          : 'border-white/15 bg-black group-hover:border-white/35'
                    }`}
                  />

                  <span
                    className={`hidden text-[8px] uppercase tracking-[0.2em] transition-colors sm:block ${
                      active
                        ? 'text-white/50'
                        : 'text-white/20'
                    }`}
                  >
                    {item.year}
                  </span>
                </button>

                {index < CHAPTERS.length - 1 && (
                  <span
                    className={`mx-1.5 h-px min-w-2 flex-1 transition-colors duration-500 sm:mx-3 sm:min-w-3 ${
                      index < activeChapter
                        ? 'bg-white/20'
                        : 'bg-white/[0.06]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="relative z-20 px-4 pb-8 sm:px-6 md:px-8 md:pb-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-3 flex items-center justify-between gap-4 text-[7px] uppercase tracking-[0.16em] text-white/20 sm:text-[8px] sm:tracking-[0.25em]">
            <span className="min-w-0 truncate">
              {chapter.year} · {chapter.label}
            </span>

            <span className="shrink-0 text-right">
              <span className="sm:hidden">
                {globeHovered
                  ? 'active'
                  : 'scroll'}
              </span>

              <span className="hidden sm:inline">
                {globeHovered
                  ? 'globe interaction active'
                  : 'normal page scroll'}
              </span>
            </span>
          </div>

          <div className="relative h-px w-full overflow-hidden bg-white/[0.06]">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 bg-white/25"
              style={{
                width: `${((activeChapter + 1) / CHAPTERS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Continuation — no footer, no hard boundary */}
      <div className="relative z-10 overflow-hidden px-4 pb-28 pt-16 sm:px-6 sm:pb-32 sm:pt-20 md:px-8 md:pb-40 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-white/[0.006] to-transparent" />

        <div className="relative mx-auto w-full max-w-[1100px]">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <div>
              <p className="mb-4 text-[8px] uppercase tracking-[0.26em] text-white/25 sm:text-[9px] sm:tracking-[0.3em]">
                2026 · currently
              </p>

              <h3 className="max-w-[760px] text-[clamp(2.2rem,8vw,5rem)] font-light leading-[0.95] tracking-[-0.05em] text-white">
                Still figuring it out.
                <br />
                Still shipping anyway.
              </h3>

              <p className="mt-5 max-w-[520px] text-[12px] leading-[1.75] text-white/35 sm:mt-6 sm:text-sm sm:leading-6">
                I do not need to know exactly what I will
                build next. I need a useful problem, enough
                curiosity to start, and the patience to keep
                improving what I make.
              </p>
            </div>

            <Link
              to="/work"
              className="group inline-flex w-fit items-center gap-3 border-b border-white/15 pb-2 text-[9px] uppercase tracking-[0.22em] text-white/55 transition hover:border-white/40 hover:text-white sm:text-[10px] sm:tracking-[0.25em]"
            >
              See what I built

              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
          </div>

          {/* Small proof strip — gives the ending something tangible to leave behind */}
          <div className="mt-16 grid grid-cols-2 border-y border-white/[0.06] sm:grid-cols-4">
            {[
              ['01', 'BUILD', 'from idea to interface'],
              ['02', 'DEBUG', 'from error to understanding'],
              ['03', 'SHIP', 'from project to something real'],
              ['04', 'LEARN', 'from one build to the next'],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-white/[0.06] px-3 py-5 first:border-l-0 sm:border-l sm:px-5 sm:py-6"
              >
                <span className="text-[7px] tracking-[0.2em] text-white/15">
                  {number}
                </span>

                <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-white/45">
                  {title}
                </p>

                <p className="mt-1.5 max-w-[150px] text-[9px] leading-4 text-white/25">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}