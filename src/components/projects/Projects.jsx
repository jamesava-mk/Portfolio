import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import SectionHeading from '../ui/SectionHeading';
import { projects, projectsContent } from '../../data/projects';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const firstRow = projects.filter((_, index) => index % 2 === 0);
  const secondRow = projects.filter((_, index) => index % 2 !== 0);

  const rowOne = firstRow.length > 0 ? firstRow : projects;
  const rowTwo = secondRow.length > 0 ? secondRow : projects;

  const renderMarqueeRow = (items, direction = 'left') => {
    const repeatedItems = [...items, ...items];

    return (
      <div className="group relative overflow-hidden">
        <div
          className={`flex w-max gap-6 ${
            shouldReduceMotion
              ? ''
              : direction === 'left'
                ? 'animate-projects-left'
                : 'animate-projects-right'
          } group-hover:[animation-play-state:paused]`}
        >
          {repeatedItems.map((project, index) => (
            <div
              key={`${project.title}-${direction}-${index}`}
              className="w-[82vw] max-w-[390px] shrink-0 sm:w-[390px]"
            >
              <ProjectCard
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow={projectsContent.eyebrow}
              title={projectsContent.heading}
              description={projectsContent.intro}
            />
          </div>

          {projects.length > 0 && (
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
            >
              {projectsContent.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </motion.div>

        {projects.length > 0 ? (
          <div className="relative mt-12 space-y-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-24" />

            {renderMarqueeRow(rowOne, 'left')}
            {renderMarqueeRow(rowTwo, 'right')}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/6 p-8 text-center shadow-[0_25px_90px_rgba(2,8,23,0.35)] backdrop-blur-2xl sm:p-10">
            <h3 className="text-2xl font-semibold text-white">
              {projectsContent.emptyTitle}
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300/90">
              {projectsContent.emptyDescription}
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
            >
              {projectsContent.cta}
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}