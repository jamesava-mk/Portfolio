import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getProject, getProjects } from '../lib/portfolioStore';

const storySections = [
  {
    key: 'problem',
    number: '02',
    label: 'THE PROBLEM',
    field: 'problem',
  },
  {
    key: 'why',
    number: '03',
    label: 'WHY I BUILT IT',
    field: 'why',
  },
  {
    key: 'tried',
    number: '04',
    label: 'FIRST BUILD',
    field: 'tried',
  },
  {
    key: 'changed',
    number: '05',
    label: 'THE DECISION',
    field: 'changed',
  },
  {
    key: 'broke',
    number: '06',
    label: 'WHAT BROKE',
    field: 'broke',
  },
  {
    key: 'learned',
    number: '07',
    label: 'WHAT I LEARNED',
    field: 'learned',
  },
];

export default function Project() {
  const { slug } = useParams();

  const project = getProject(slug);
  const projects = getProjects();

  if (!project) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-[#08090b] px-5 text-[#f2f0eb]">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            404 / Project not found
          </p>

          <h1 className="mt-5 text-5xl tracking-[-0.06em]">
            Nothing here yet.
          </h1>

          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-2 text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to archive
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug
  );

  const previousProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : null;

  const nextProject =
    currentIndex >= 0 &&
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  const stages =
    project.stages?.length > 0
      ? project.stages
      : ['IDEA', 'BUILD', 'BREAK', 'REFINE', 'SHIP'];

  return (
    <div className="bg-[#08090b] text-[#f2f0eb]">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1500px] px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pb-16 lg:pt-40">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/30 transition hover:text-white"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to archive
          </Link>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/30">
                <span>{project.category}</span>

                <span className="h-px w-5 bg-white/15" />

                <span>{project.year}</span>

                <span className="h-px w-5 bg-white/15" />

                <span>{project.status}</span>
              </div>

              <h1 className="mt-7 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.78] tracking-[-0.08em]">
                {project.title}
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white/60 transition hover:border-white/40 hover:text-white"
                >
                  Live project
                  <ExternalLink size={13} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white/60 transition hover:border-white/40 hover:text-white"
                >
                  GitHub
                  <span
                    aria-hidden="true"
                    className="text-[11px] leading-none"
                  >
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden bg-[#111214]"
        >
          <div className="aspect-[16/9] sm:aspect-[2/1]">
            {project.heroImage ? (
              <img
                src={project.heroImage}
                alt={`${project.title} project`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.25em] text-white/20">
                No project image
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[8px] uppercase tracking-[0.2em] text-white/45 sm:bottom-6 sm:left-6 sm:right-6">
            <span>
              {project.shortTitle || project.title}
            </span>

            <span>
              Project / {project.year}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Project map */}
      <section className="border-y border-white/10 bg-[#0c0d0f]">
        <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                01 / Project map
              </p>

              <p className="mt-3 max-w-[180px] text-xs leading-6 text-white/35">
                The route this project took from the first question to where
                it is now.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-[14px] hidden h-px bg-white/10 sm:block" />

              <div
                className="relative grid gap-y-8"
                style={{
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(120px, 1fr))',
                }}
              >
                {stages.map((stage, index) => (
                  <div
                    key={`${stage}-${index}`}
                    className="relative flex items-start gap-3"
                  >
                    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 bg-[#0c0d0f] text-[8px] text-white/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="pt-2 text-[8px] uppercase tracking-[0.16em] text-white/35">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="border-b border-white/10 py-24 sm:py-28 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[.28fr_1fr]">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                02 / The story
              </p>
            </div>

            <div>
              <p className="max-w-5xl text-3xl leading-[1.15] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div>
          {storySections.map((section, index) => {
            const content = project[section.field];

            if (!content) {
              return null;
            }

            return (
              <motion.article
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: '-10% 0px',
                }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(index * 0.04, 0.2),
                }}
                className="grid gap-8 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[.28fr_1fr] lg:gap-12"
              >
                <div className="flex gap-4">
                  <span className="text-[9px] tracking-[0.2em] text-white/20">
                    {section.number}
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                    {section.label}
                  </span>
                </div>

                <div className="max-w-3xl">
                  <p className="text-xl leading-8 tracking-[-0.02em] text-white/75 sm:text-2xl sm:leading-9">
                    {content}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Tools */}
      <section className="border-b border-white/10 bg-[#0c0d0f]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.28fr_1fr] lg:px-12 lg:py-28">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
              08 / Tools
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {(project.stack || []).map((tool) => (
                <span
                  key={tool}
                  className="border border-white/10 px-4 py-2 text-[9px] uppercase tracking-[0.16em] text-white/40"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                09 / Artifacts
              </p>

              <h2 className="mt-3 text-3xl tracking-[-0.04em] sm:text-5xl">
                Inside the build.
              </h2>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/20 sm:block">
              {project.gallery.length} images
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {project.gallery.map((image, index) => (
              <motion.div
                key={`${image}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`overflow-hidden bg-[#111214] ${
                  index % 3 === 0
                    ? 'sm:col-span-2'
                    : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} artifact ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Project navigation */}
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1500px] sm:grid-cols-2">
          {previousProject ? (
            <Link
              to={`/work/${previousProject.slug}`}
              className="group border-b border-white/10 px-5 py-14 transition hover:bg-white/[0.02] sm:border-b-0 sm:border-r sm:px-8 lg:px-12 lg:py-20"
            >
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/25">
                <ArrowLeft size={13} />
                Previous project
              </div>

              <div className="mt-8">
                <p className="text-3xl tracking-[-0.05em] transition-transform group-hover:translate-x-1 sm:text-4xl">
                  {previousProject.title}
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-white/25">
                  {previousProject.category}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              to={`/work/${nextProject.slug}`}
              className="group px-5 py-14 text-right transition hover:bg-white/[0.02] sm:px-8 lg:px-12 lg:py-20"
            >
              <div className="flex items-center justify-end gap-2 text-[9px] uppercase tracking-[0.22em] text-white/25">
                Next project
                <ArrowRight size={13} />
              </div>

              <div className="mt-8">
                <p className="text-3xl tracking-[-0.05em] transition-transform group-hover:-translate-x-1 sm:text-4xl">
                  {nextProject.title}
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-white/25">
                  {nextProject.category}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              to="/work"
              className="group px-5 py-14 text-right transition hover:bg-white/[0.02] sm:px-8 lg:px-12 lg:py-20"
            >
              <div className="flex items-center justify-end gap-2 text-[9px] uppercase tracking-[0.22em] text-white/25">
                Back to archive
                <ArrowUpRight size={13} />
              </div>

              <p className="mt-8 text-3xl tracking-[-0.05em] sm:text-4xl">
                All work
              </p>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}